import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import {
  setUserList
} from "../../actions/loginActions";
import "./index.css";
import axios from "axios";
import { connect } from "react-redux";
import { authenticationUrl } from '../../constant';
import LoadingScreen from "./LoadingScreen/loadingScreen";

class PendingRequests extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      isLoading: false,
      userList: []
    };

    this.approveTemplate = this.approveTemplate.bind(this);
    this.rejectTemplate = this.rejectTemplate.bind(this);
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this);
  }

  async getUserList() {
    this.setState({ isLoading: true });
    const userList = await axios.get(
      `${authenticationUrl}/api/alluser`
    );
    this.props.setUserList(userList.data);
    this.setState({ selected: [], isLoading: false, userList: userList.data.data })
  }

  componentDidMount() {
    this.getUserList();
  }

  async handleClick(rowData, action) {
    let userList = [];
    userList.push(rowData.username);
    if (action) {
      await axios.put(
        `${authenticationUrl}/api/approveuser`,
        {
          username: rowData.username
        }
      );
    } else {
      await axios.put(
        `${authenticationUrl}api/removeuser`,
        {
          username: rowData.username
        }
      );
    }
    this.getUserList();
  }

  handleClickAllSelected(action) {
    if (action) {
      this.state.selected.forEach(async user => {
        userList.push(user.username);
        await axios.post(
          `${authenticationUrl}/api/approveuser`,
          {
            username: user.username
          }
        );
      });
    } else {
      this.state.selected.forEach(async user => {
        userList.push(user.username);
        await axios.post(
          `${authenticationUrl}/api/removeuser`,
          {
            username: user.username
          }
        );
      });
    }
    this.getUserList();
  }

  approveTemplate(rowData, column) {
    const enable =
      (JSON.stringify(this.state.selected[0]) === JSON.stringify(rowData)) && this.state.selected.length === 1;
    return (
      <Button
        label="Approve"
        onClick={() => this.handleClick(rowData, true)}
        disabled={!enable}
      />
    );
  }

  rejectTemplate(rowData, column) {
    const enable =
    (JSON.stringify(this.state.selected[0]) === JSON.stringify(rowData)) && this.state.selected.length === 1;
    return (
      <Button
        label="Reject"
        onClick={() => this.handleClick(rowData, false)}
        disabled={!enable}
      />
    );
  }

  render() {
    const actions = [
      { label: "Approve All Selected", value: 1 },
      { label: "Reject All Selected", value: 0 }
    ];

    const colList = [
      {
        field: "username",
        header: (
          <Dropdown
            options={actions}
            onChange={e => this.handleClickAllSelected(e.value)}
            placeholder="Select Action"
            disabled={this.state.selected.length <= 1}
          />
        )
      },
      { body: this.approveTemplate },
      { body: this.rejectTemplate }
    ];
    let userList = [];
    this.state.userList.forEach(user => {
      if(!user.is_approved){
        userList.push({username:  user.username});
      }
    });
    
    return !this.state.isLoading ? (
      <div>
        <DataTable
          className="hidden-header"
          value={userList}
          paginator={true}
          paginatorPosition={"top"}
          rows={10}
          selection={this.state.selected}
          onSelectionChange={e => this.setState({ selected: e.value })}
        >
          <Column selectionMode="multiple" style={{width:'3em'}} />
          {colList.map(el => {
            return (
              <Column
                key={el.header}
                field={el.field}
                header={el.header}
                body={el.body}
                filter={false}
                filterMatchMode="startsWith"
              />
            );
          })}
        </DataTable>
      </div>
    ) : (
      <LoadingScreen />
    );
  }
}

const mapStateToProps = state => ({
  userList: state.userList
});

const mapDispatchToProps = dispatch => ({
  setUserList: userList => dispatch(setUserList(userList))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingRequests);
