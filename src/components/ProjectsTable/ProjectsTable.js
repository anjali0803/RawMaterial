import React from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import "./index.css";

export default class ProjectsTable extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      isLoading: false,
    };
    this.projectIdTemplate = this.projectIdTemplate.bind(this);
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this);
  }
  projectIdTemplate(rowData) {

    return <a onClick={() => this.props.onProjectIdClick(rowData)} >{rowData['ProjectID']}</a>
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
  render() {
    const projectTableColList = this.props.projectTableColList;
    const selected = this.state.selected;
    var projectList = this.props.projectList;
    const actions = [
      { label: "Approve All Selected", value: 1 },
      { label: "Reject All Selected", value: 0 }
    ];
    const footer = (
      <Dropdown
        options={actions}
        onChange={e => this.handleClickAllSelected(e.value)}
        placeholder="Select Action"
        disabled={selected.length == 0}
      />
    );
    return (
      <div>
        <DataTable
          value={projectList}
          footer={footer}
          paginator={true}
          paginatorPosition={"top"}
          rows={10}
          selection={this.state.selected}
          onSelectionChange={e => this.setState({ selected: e.value })}
        >
          <Column selectionMode="multiple" style={{ width: '3em' }} />
          <Column header={<i className="pi pi-refresh"></i>} style={{ width: '3em' }} />
          {projectTableColList.map((el, index) => {
            const field = el.field;
            const header = el.header;

            //console.log(header.toLowerCase().replace(/ /g, ''))

            if (header.toLowerCase().replace(/ /g, '') == 'projectid') {
              //console.log(el);
              return <Column
                id={`table-${index}`}
                header={el.header}
                filter={true}
                sortable={true}
                filterMatchMode="startsWith"
                body={this.projectIdTemplate}
              />
            }
            else
              return (
                <Column
                  field={el.field}
                  header={el.header}
                  filter={true}
                  sortable={true}
                  filterMatchMode="startsWith"

                />
              );
          })}
        </DataTable>
      </div>
    );
  }
}
