import React from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {InputText} from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import "./index.css";
import { throws } from "assert";

export default class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      isLoading: false,
    };
    this.documentIdTemplate = this.documentIdTemplate.bind(this);
    this.cellEditor = this.cellEditor.bind(this);
    this.inputTextEditor = this.inputTextEditor.bind(this);
    this.onEditorValueChange = this.onEditorValueChange.bind(this);
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this);
  }

  documentIdTemplate(rowData) {
    return <a onClick={() => this.props.onDocumentIdClick(rowData)} >{rowData['DocID']}</a>
  }
  handleClickAllSelected(action) {
    const data = this.state.selected;
    this.props.handleClickAllSelected(action, data);
    // this.getUserList();
  }
  cellEditor(props){
    // console.log(props);
    return this.inputTextEditor(props, props.field);
  }
  inputTextEditor( props, field ) {
    return <InputText type="text" value={props.rowData[field]} onBlur={(e) => console.log(props.rowData[field])} onChange={(e) => this.onEditorValueChange(e.target.value, props)} />;
  }
  onEditorValueChange(value, props) {
    let tempDummyObj = [...props.value];
    tempDummyObj[props.rowIndex][props.field] = value;
    this.setState({
      tableData : tempDummyObj
    });
  }

  render() {
    const colList = this.props.colList;
    const selected = this.state.selected;
    var dataList = this.props.dataList;
    const actions = this.props.actionsLabel;
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
          value={this.state.tableData || dataList}
          footer={footer}
          paginator={true}
          paginatorPosition={"top"}
          rows={10}
          selection={this.state.selected}
          onSelectionChange={e => this.setState({ selected: e.value })}
          editable={true}
          rowClassName={this.props.rowClassName ? (rowData) => this.props.rowClassName(rowData) : () => { }}
        >
          <Column selectionMode="multiple" style={{ width: '3em' }} />
          <Column header={<i onClick={this.props.onRefresh} className="pi pi-refresh"></i>} style={{ width: '3em' }} />
          {colList.map((el, index) => {
            const field = el.field;
            const header = el.header;
            let columnProps = {
              id : el.header,
              header: el.header,
              filter: true,
              sortable: true,
              filterMatchMode:'startsWith',
            }
            //console.log(header.toLowerCase().replace(/ /g, ''))

            if (header.toLowerCase().replace(/ /g, '') == 'documentid') {
              //console.log(el);
              return <Column
                id={`table-${index}`}
                {...columnProps}
                body={this.documentIdTemplate}
              />
            }
            else{
              if(this.props.editable){
                columnProps = {
                  ...columnProps,
                  editor: this.cellEditor
                }
              }
              return (
                <Column
                  field={el.field}
                  {...columnProps}
                />
              );
            }
          })}
        </DataTable>
      </div>
    );
  }
}
