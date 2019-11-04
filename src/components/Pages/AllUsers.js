import React from "react";
// import TableComponent from '../Table/TableComponent';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";
import "./index.css";
import Axios from "axios";
import { setDataList } from "../../actions/dataActions";
import { connect } from "react-redux";

const ClickDropdownTemplate = () => {
  return (
    <div>
      <Button label="Select" />
    </div>
  );
};

class AllUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: []
    };

    this.adminTemplate = this.adminTemplate.bind(this);
    this.removeTemplate = this.removeTemplate.bind(this);
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this);
  }

  handleClick(rowData, action) {
    if (action) {
      console.log(rowData.username, " is made admin");
    } else {
      console.log(rowData.username, " is removed from user");
    }
  }

  handleClickAllSelected(action) {
    const data = this.state.selected
    console.log(action)
    if (action) {
      console.log(data, " is made admin");
    } else {
      console.log(data, " is removed from user");
    }
  }

  adminTemplate(rowData, column) {
    const enable = this.state.selected.includes(rowData) && this.state.selected.length === 1
    return (
      <Button
        label="Admin"
        onClick={() => this.handleClick(rowData, true)}
        disabled={!enable}
      />
    );
  }

  removeTemplate(rowData, column) {
    const enable = this.state.selected.includes(rowData) && this.state.selected.length === 1
    return (
      <Button
        label="Remove"
        onClick={() => this.handleClick(rowData, false)}
        disabled={!enable}
      />
    );
  }

  render() {
    const actions = [
      { label: "Make All Selected admin", value: 1 },
      { label: "Remove All Selected users", value: 0 }
    ];

    const colList = [
      {
        field: "username",
        header: (
          <Dropdown
            options={actions}
            onChange={(e) => this.handleClickAllSelected(e.value)}
            placeholder="Select Action"
            disabled={this.state.selected.length <= 1}
          />
        )
      },
      { body: this.adminTemplate },
      { body: this.removeTemplate }
    ];

    const userList = this.props.userList.filter(function(item) {
      return item.role == "requested";
    });

    return (
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
    );
  }
}

const mapStateToProps = state => ({
  dataList: state.dataList,
  colList: state.colList,
  userList: state.userList
});

export default connect(mapStateToProps)(AllUsers);
