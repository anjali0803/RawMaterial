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
import { backendUrl } from '../../constant';
import LoadingScreen from "./LoadingScreen/loadingScreen";

class PendingRequests extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      isLoading: false
    };

    this.approveTemplate = this.approveTemplate.bind(this);
    this.rejectTemplate = this.rejectTemplate.bind(this);
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this);
  }

  async getUserList() {
    this.setState({ isLoading: true });
    const userList = await axios.get(
      `${backendUrl}/dashboard/users`
    );
    this.props.setUserList(userList.data);
    this.setState({ selected: [], isLoading: false })
  }

  componentDidMount() {
    this.getUserList();
  }

  async handleClick(rowData, action) {
    let userList = [];
    userList.push(rowData.username);
    if (action) {
      await axios.post(
        `${backendUrl}/dashboard/approve_user`,
        {
          username_list: userList
        }
      );
    } else {
      await axios.post(
        `${backendUrl}/dashboard/reject_user`,
        {
          username_list: userList
        }
      );
    }
    this.getUserList();
  }

  async handleClickAllSelected(action) {
    let userList = [];
    this.state.selected.forEach(user => {
      userList.push(user.username);
    });
    if (action) {
      await axios.post(
        `${backendUrl}/dashboard/approve_user`,
        {
          username_list: userList
        }
      );
    } else {
      await axios.post(
        `${backendUrl}/dashboard/reject_user`,
        {
          username_list: userList
        }
      );
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
    this.props.userList.forEach(element => {
      if(!element.is_approved){
        userList.push({username:  element.user.username});
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
