import React from "react";
// import TableComponent from '../Table/TableComponent';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "./index.css";
import Axios from "axios";
import { setDataList } from "../../actions/dataActions";
import { connect } from "react-redux";

class PendingRequests extends React.Component {
  constructor() {
    super();

    this.approveTemplate = this.approveTemplate.bind(this);
    this.rejectTemplate = this.rejectTemplate.bind(this);
  }

  handleClick(rowData, action) {
    if (action) {
      console.log(rowData.username, " is Approved");
    } else {
      console.log(rowData.username, " is Rejected");
    }
  }

  approveTemplate(rowData, column) {
    return (
        <Button
          label="Approve"
          onClick={() => this.handleClick(rowData, true)}
        />
    );
  }

  rejectTemplate(rowData, column) {
    return (
        <Button
          label="Reject"
          onClick={() => this.handleClick(rowData, false)}
        />
    );
  }

  render() {
    const colList = [
      { field: "username", header: "Name" },
      { field: this.approveTemplate, header: "" },
      { field: this.rejectTemplate, header: "" }
    ];

    const userList = this.props.userList.filter(function(item){return(item.role == 'requested')})

    return (
      <div>
        <DataTable
          value={userList}
          paginator={true}
          paginatorPosition={"top"}
          rows={10}
        >
          {colList.map(el => {
            return (
              <Column
                field={el.field}
                header={el.header}
                filter={false}
                filterMatchMode="startsWith"
              />
            );
          })}
        </DataTable>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataList: state.dataList,
  colList: state.colList,
  userList: state.userList
});

export default connect(mapStateToProps)(PendingRequests);
