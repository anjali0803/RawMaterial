import React from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import "./index.css";

export default class TableComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      isLoading: false,
    };
    this.documentIdTemplate = this.documentIdTemplate.bind(this);

    this.handleClickAllSelected = this.handleClickAllSelected.bind(this);
  }
  documentIdTemplate(rowData) {
    console.log(this.props);
    return <a onClick={this.props.onDocumentIdClick} >{rowData['documentId']}</a>
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
    const colList = this.props.colList;
    const selected = this.state.selected;
    var dataList = this.props.dataList;
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
          value={dataList}
          footer={footer}
          paginator={true}
          paginatorPosition={"top"}
          rows={10}
          selection={this.state.selected}
          onSelectionChange={e => this.setState({ selected: e.value })}
        >
        <Column selectionMode="multiple" style={{width:'3em'}}/>
        <Column header={<i class="pi pi-refresh"></i>} style={{width:'3em'}}/>
          {colList.map(el => {
            const field = el.field;
            const header = el.header;
            console.log(header.toLowerCase().replace(/ /g, ''))
            if (header.toLowerCase().replace(/ /g, '') == 'documentid') {
              console.log(el);
              return <Column

                header={el.header}
                filter={true}
                sortable={true}
                filterMatchMode="startsWith"
                body={this.documentIdTemplate}
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
