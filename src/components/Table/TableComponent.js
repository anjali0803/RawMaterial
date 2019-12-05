import React from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {InputText} from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import isEqual from 'lodash.isequal';
import "./index.css";
import { throws } from "assert";

export default class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    let temp = {};
    this.props.colList.forEach(obj => {
      temp[obj['field']] = ''
    })
    this.setState({item: temp}, () =>{
      console.log(this.state.item);
    });

    this.state = {
      selected: [],
      isLoading: false,
      displayDialog: false,
      newItem: false,
      item: {
        ...temp,
      },
    };

    this.documentIdTemplate = this.documentIdTemplate.bind(this);
    this.cellEditor = this.cellEditor.bind(this);
    this.inputTextEditor = this.inputTextEditor.bind(this);
    this.onEditorValueChange = this.onEditorValueChange.bind(this);
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this);
    this.addNew = this.addNew.bind(this);
    this.renderDialogModal = this.renderDialogModal.bind(this);
    this.updateProperty = this.updateProperty.bind(this);
    this.save = this.save.bind(this);
    this.delete = this.delete.bind(this);
  }

  documentIdTemplate(rowData) {
    return <a onClick={() => this.props.onDocumentIdClick(rowData)} >{rowData['DocID']}</a>
  }
  handleClickAllSelected(action) {
    const data = this.state.selected;
    if(action === 'deleteRow'){
      this.delete(data);
    }else{
      this.props.handleClickAllSelected(action, data);
    }
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
  updateProperty(property, value) {
    let item = this.state.item;
    item[property] = value;
    this.setState({item: item});
  }
  addNew() {
    let temp = {};
    this.props.colList.forEach(obj => {
      // const temp
      temp[obj['field']] = ''
      this.setState({
        item: {...temp}
      })
    })
    this.setState({
      tableData: this.props.dataList
    })
    // this.setState({item: temp}, () =>{
    //   console.log(this.state.item);
    // });

    this.state.newItem = true;
    this.setState({
        displayDialog: true
    });
  }

  renderDialogModal(colList){
    const modal = colList.map(column => {
      return ( this.state.newItem && 
        <>
          <div className="p-col-4" style={{padding:'.75em'}}><label>{column['header']}</label></div>
          <div className="p-col-8" style={{padding:'.5em'}}>
              <InputText id={column['field']} onChange={(e) => {this.updateProperty(`${column['field']}`, e.target.value)}} value={this.state.item[column['field']]}/>
          </div>
        </>
      )
    });
    return modal;
  }

  save(){
    let items = this.state.tableData;
    if(this.state.newItem)
        items.push(this.state.item);

    this.setState({tableData:items, selectedItem:null, item: null, displayDialog:false, newItem: false});
  }

  delete(data){
    let tableData = this.props.dataList;
    for(let i=0; i< data.length; i++){
      for(let j=0;j<this.props.dataList.length;j++){
        if(isEqual(tableData[j], data[i])){
          tableData.splice(j,1);
          continue;
        }
      }
    }
    this.setState({
      tableData: tableData,
      selectedItem: null,
      item: null,
      displayDialog: false,
      newItem: false
    });
  }

  render() {
    const colList = this.props.colList;
    const selected = this.state.selected;
    var dataList = this.props.dataList;
    const actions = this.props.actionsLabel;
    
    const dialogModal = this.renderDialogModal(colList);

    const footer = (
      <div className="p-clearfix" style={{width:'100%'}}>
        <Dropdown
          options={actions}
          onChange={e => this.handleClickAllSelected(e.value)}
          placeholder="Select Action"
          disabled={selected.length == 0}
        />
        <Button style={{float:'right'}} label="Add" icon="pi pi-plus" onClick={this.addNew}/>
      </div>
    );
    const dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Delete" icon="pi pi-times" onClick={this.delete}/>
      <Button label="Save" icon="pi pi-check" onClick={this.save}/>
    </div>;
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
        <Dialog visible={this.state.displayDialog} width="300px" header="New Item Details" modal={true} footer={dialogFooter} onHide={() => this.setState({displayDialog: false})}>
          {
              this.state.newItem && 
              
              <div className="p-grid p-fluid">
                {dialogModal}
              </div>
          }
        </Dialog>
      </div>
    );
  }
}
