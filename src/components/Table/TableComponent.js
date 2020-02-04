import React from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {InputTextarea} from 'primereact/inputtextarea';
import {InputText} from 'primereact/inputtext';
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import isEqual from 'lodash.isequal';
import "./index.css";
import { throws } from "assert";
import Axios from "axios";
import { backendUrl } from "../../constant";
import { Col, Row, Badge } from 'reactstrap';
import ReactTable from "react-table";
import checkboxHOC from "react-table/lib/hoc/selectTable";
// import { isEqual } from 'lodash-es';
const ReactTableWrapper = checkboxHOC(ReactTable);

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
      displayWorkDescriptionForm: false,
      workItemDescription: '',
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
    this.tabulate = this.tabulate.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.isSelected = this.isSelected.bind(this);
    this.actionTemplate = this.actionTemplate.bind(this);
    this.renderWorkDescriptionModal = this.renderWorkDescriptionModal.bind(this);
    this.updateWorkDescription = this.updateWorkDescription.bind(this);
    this.saveWorkDescription = this.saveWorkDescription.bind(this);
  }

  documentIdTemplate(rowData) {
    return <a onClick={() => this.props.onDocumentIdClick(rowData)} style={{cursor: 'pointer'}}>{rowData['DocID']}</a>
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
    return <InputTextarea value={props.rowData[field]} onBlur={(e) => console.log(props.rowData[field])} onChange={(e) => this.onEditorValueChange(e.target.value, props)}  rows={3} cols={5}/>;
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

    this.setState({tableData:items, selected:[], item: null, displayDialog:false, newItem: false});
  }

  delete(){
    const data = this.state.selected;
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
      selected: [],
      item: null,
      displayDialog: false,
      newItem: false
    });
  }

  async tabulate(){ 
    this.state.selected.forEach(async element => {
      let tabulateRes = await Axios.post(
        `${backendUrl}/dashboard/tabulate`,
        {
          docID: element['DocID'],
          fileType: element['FileType'],
          projectID: this.props.projectID
        }
      )
    })
  }

  toggleSelection(key, shift, row) {
    let selected = [...this.state.selected];
    const keyIndex = selected.indexOf(key.replace('select-', ''));
    if (keyIndex >= 0) {
      selected = [
        ...selected.slice(0, keyIndex),
        ...selected.slice(keyIndex + 1)
      ];
    } else {
      selected.push(key.replace('select-', ''));
    }
    this.setState({ selected });
  };

  toggleAll() {
    const selectAll = this.state.selectAll ? false : true;
    const selected = [];
    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      currentRecords.forEach(item => {
        selected.push(item._original._id);
      });
    }
    this.setState({ selectAll, selected });
  };

  isSelected(key) {
    return this.state.selected.includes(key);
  };


  filterRows(rows, columns, searchQuery = '') {
    const filteredRows = [];
    if (searchQuery === null || searchQuery === '') {
      return rows;
    }
    rows.forEach(row => {
      columns.some(column => {
        if (row[column.field] !== undefined && row[column.field] !== null) {
          const rowValue = String(row[column.field]).toLowerCase();
          if (rowValue.length >= searchQuery.length && rowValue.indexOf(searchQuery.toLowerCase()) >= 0) {
            filteredRows.push(row);
            return true;
          }
        }
        return false;
      });
    });
    return filteredRows;
  }
  renderWorkDescriptionModal(){
    return (
      <>
          <div className="p-col-4" style={{padding:'.75em'}}><label> Work Description</label></div>
          <div className="p-col-8" style={{padding:'.5em'}}>
              <InputText id="workDescription" onChange={(e) => {this.updateWorkDescription(e.target.value)}} value={this.state.workItemDescription}/>
          </div>
      </>
    )
  }
  updateWorkDescription(value){
    this.setState({
      workItemDescription: value
    })
  }

  saveWorkDescription(){
    this.setState({
      displayWorkDescriptionForm: false
    })
  }
  actionTemplate(props){
    const deleteRow = s => {
      console.log(props);
      const newTableData =(this.state.tableData || this.props.dataList).filter(row => {
        if(!isEqual(row, props)){
          return row;
        }
      });
      this.setState({
        tableData: newTableData
      })
    }

    const acceptRow = x => {
      this.setState({
        displayWorkDescriptionForm : true
      })
      const s = (this.state.tableData || this.props.dataList).indexOf(x)
      console.log(s);
      return this.state.tableData.indexOf(x);
    }

    return this.props.editable && (<>
        <i class="material-icons" onClick={deleteRow}>
          delete_outline
        </i>
        { this.props.acceptButton ? <i class="material-icons" onClick={acceptRow}>
          check
        </i> : ''}
        {this.props.rejectButton ? <i class="material-icons">
          close
        </i> : ''}
      </>);
  }
  render() {
    console.log('props', this.props);
    console.log('state', this.state);
    let { colList, dataList } = this.props;
    const { selected, selectAll } = this.state;
    const actions = this.props.actionsLabel;
    
    const dialogModal = this.renderDialogModal(colList);
    const workDescriptionModal = this.renderWorkDescriptionModal();
    const footer = (this.props.editable || this.props.footer) && (
      <div className="p-clearfix tableFooter" style={{width:'100%'}}>
        {/* <Dropdown
          options={actions}
          onChange={e => this.handleClickAllSelected(e.value)}
          placeholder="Select Action"
          disabled={selected.length == 0}
        /> */}
        {!this.props.footer ? <Button style={{float:'right', margin: '5px'}} label="Add" icon="pi pi-plus" onClick={this.addNew}/> : ''}
        {/* {!this.props.footer ? <Button style={{float:'right', margin: '5px'}} label="Delete" icon="pi pi-times" onClick={this.delete}/> : ''} */}
        {this.props.tabulate ? <Button style={{float:'right', margin: '5px'}} label="Tabulate" icon="pi pi-plus" onClick={this.tabulate}/> : ''}
      </div>
    );
    const dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Save" icon="pi pi-check" onClick={this.save}/>
    </div>;

    const workDescriptionFormFooter = <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Save" icon="pi pi-check" onClick={this.saveWorkDescription}/>
    </div>;

    dataList = dataList || [];
    return (
      <div xs={12} className="tableContainer">
        {/* {this.props.editable || this.props.footer ? <Col className="ReactTableHeader">
          <div className="dropdownAction">
            <Dropdown
              options={actions}
              onChange={e => this.handleClickAllSelected(e.value)}
              placeholder="Select Action"
              disabled={selected.length == 0}
            />
          </div>
          <div>
            {!this.props.footer ? <Button style={{float:'right', margin: '5px'}} label="Delete" icon="pi pi-times" onClick={this.delete}/> : ''}
            {!this.props.footer ? <Button style={{float:'right', margin: '5px'}} label="Add" icon="pi pi-plus" onClick={this.addNew}/> : ''}
            {this.props.tabulate ? <Button style={{float:'right', margin: '5px'}} label="Tabulate" icon="pi pi-plus" onClick={this.tabulate}/> : ''}
          </div>
        </Col> : null } */}
        {/* <ReactTableWrapper
          ref={r => (this.checkboxTable = r)}
          filterable
          columns={colList.map((col) => Object.assign(
            {},
            { Header: col.header, accessor: col.field, width: col.width, filterMethod: (filter, row) => row[filter.id].toLowerCase().includes(filter.value.toLowerCase()),  ...col }))}
          defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}     
          data={dataList && dataList.length > 0 && dataList != 'null' ? dataList.map((item, index) => {
            const _id = item.id || item.ProjectID || index.toString();
            console.log('_id', _id);
            const { ProjectStatus = '', Status = '' } = item;
            return {
              _id,
              ...item,
              Status:<Badge color={['closed','completed'].includes(Status.toLowerCase()) ? 'success': 'warning'}>{Status}</Badge>,
              ProjectStatus:<Badge color={['closed','completed'].includes(ProjectStatus.toLowerCase()) ? 'success': 'warning'}>{ProjectStatus}</Badge>,
            };
          }) : []}
          getTrProps={(state, record) => {
            return {
              onClick: () => this.props.onDocumentIdClick(record.original),
            }
          }}
          pageSize={dataList && dataList.length > 0 ? 8 : 0}
          showPageJump={false}
          resizable={false}
          showPageSizeOptions={false}
          previousText={"Back"}
          pageText={""}
          {...this}
          selectAll={selectAll}
        />*/}
        <DataTable
          value={dataList || this.state.tableData}
          footer={footer}
          paginator={true}
          paginatorPosition={"bottom"}

          rows={10}
          scrollable={true}
          editable={true}
          autoLayout={true}
          resizableColumns={true}
          rowClassName={this.props.rowClassName ? (rowData) => this.props.rowClassName(rowData) : () => { }}
        >
          <Column body={this.actionTemplate} style={{textAlign:'center', width: '4em'}}/>
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
                style={{width:'200px'}}
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
                  style={{width:'200px'}}
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
        <Dialog visible={this.state.displayWorkDescriptionForm} width="600px" header="Work Description" modal={true} footer={workDescriptionFormFooter} onHide={() => this.setState({displayWorkDescriptionForm: false})}>
          {
              <div className="p-grid p-fluid">
                {workDescriptionModal}
              </div>
          }
        </Dialog>
      </div>
    );
  }
}
