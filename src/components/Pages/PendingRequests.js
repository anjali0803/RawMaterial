import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { ProgressSpinner } from "primereact/progressspinner";
import "./index.css";
import axios from "axios";
import { setUserList } from "../../actions/loginActions";
import { connect } from "react-redux";

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
      "http://5dbdaeb405a6f30014bcaee3.mockapi.io/users"
    );
    this.props.setUserList(userList.data);
    this.setState({isLoading: false})
  }

  componentDidMount() {
    this.getUserList();
  }

  handleClick(rowData, action) {
    if (action) {
      console.log(rowData.username, " is Approved");
    } else {
      console.log(rowData.username, " is Rejected");
    }
    this.getUserList();
  }

  handleClickAllSelected(action) {
    const data = this.state.selected;
    if (action) {
      console.log(data, " is Approved");
    } else {
      console.log(data, " is Rejected");
    }
    this.getUserList();
  }

  approveTemplate(rowData, column) {
    const enable =
      this.state.selected.includes(rowData) && this.state.selected.length === 1;
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
      this.state.selected.includes(rowData) && this.state.selected.length === 1;
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

    const userList = this.props.userList.filter(function(item) {
      return item.role == "requested";
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
          <Column selectionMode="multiple" />
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
      <div className="spinner-container">
        <ProgressSpinner
          style={{ width: "40%", height: "40%"}}
          strokeWidth="1"
          animationDuration="1s"
        ></ProgressSpinner>
      </div>
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
