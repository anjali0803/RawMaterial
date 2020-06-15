import React from 'react'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/nova-light/theme.css'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { InputTextarea } from 'primereact/inputtextarea'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import isEqual from 'lodash.isequal'
import './index.css'
import { throws } from 'assert'
import Axios from 'axios'
import { backendUrl } from '../../constant'
import { Col, Row, Badge } from 'reactstrap'
import ReactTable from 'react-table'
import checkboxHOC from 'react-table/lib/hoc/selectTable'
// import { isEqual } from 'lodash-es';
const ReactTableWrapper = checkboxHOC(ReactTable)

export default class TableComponent extends React.Component {
  constructor (props) {
    super(props)
    const temp = {}
    this.props.colList.forEach(obj => {
      temp[obj.field] = ''
    })
    this.setState({ item: temp }, () => {
      console.log(this.state.item)
    })

    this.state = {
      selected: [],
      isLoading: false,
      displayDialog: false,
      expandedRows: null,
      displayWorkDescriptionForm: false,
      workItemDescription: '',
      newItem: false,
      item: {
        ...temp
      },
      expandedRows: null
    }

    this.documentIdTemplate = this.documentIdTemplate.bind(this)
    this.cellEditor = this.cellEditor.bind(this)
    this.inputTextEditor = this.inputTextEditor.bind(this)
    this.onEditorValueChange = this.onEditorValueChange.bind(this)
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this)
    this.addNew = this.addNew.bind(this)
    this.renderDialogModal = this.renderDialogModal.bind(this)
    this.updateProperty = this.updateProperty.bind(this)
    this.save = this.save.bind(this)
    this.delete = this.delete.bind(this)
    this.tabulate = this.tabulate.bind(this)
    this.toggleSelection = this.toggleSelection.bind(this)
    this.toggleAll = this.toggleAll.bind(this)
    this.isSelected = this.isSelected.bind(this)
    this.actionTemplate = this.actionTemplate.bind(this)
    this.renderWorkDescriptionModal = this.renderWorkDescriptionModal.bind(this)
    this.updateWorkDescription = this.updateWorkDescription.bind(this)
    this.saveWorkDescription = this.saveWorkDescription.bind(this)
    this.displayAcceptanceForm = this.displayAcceptanceForm.bind(this)
  }

  documentIdTemplate (rowData) {
    return <a onClick={() => this.props.onDocumentIdClick(rowData)} style={{ cursor: 'pointer' }}>{rowData.DocID}</a>
  }

  handleClickAllSelected (action) {
    const data = this.state.selected
    this.props.handleClickAllSelected(action, data)
    // this.getUserList();
  }

  cellEditor (props) {
    return this.inputTextEditor(props, props.field)
  }

  inputTextEditor (props, field) {
    if( props.rowData[field] === undefined){
      return <InputTextarea value={props.rowData[field]} onBlur={(e) => console.log(props.rowData[field])} onChange={(e) => this.onEditorValueChange(e.target.value, props)} rows={1} cols={30}/>
    }
    if(props.rowData[field].toString().length < 10){
      return <InputTextarea value={props.rowData[field]} onBlur={(e) => console.log(props.rowData[field])} onChange={(e) => this.onEditorValueChange(e.target.value, props)} rows={2} cols={30}/>
    } else if (props.rowData[field].toString().length < 100) {
      return <InputTextarea value={props.rowData[field]} onBlur={(e) => console.log(props.rowData[field])} onChange={(e) => this.onEditorValueChange(e.target.value, props)} rows={4} cols={30}/>
    } else if (props.rowData[field].toString().length < 500) {
      return <InputTextarea value={props.rowData[field]} onBlur={(e) => console.log(props.rowData[field])} onChange={(e) => this.onEditorValueChange(e.target.value, props)} rows={7} cols={30}/>
    } else {
      return <InputTextarea value={props.rowData[field]} onBlur={(e) => console.log(props.rowData[field])} onChange={(e) => this.onEditorValueChange(e.target.value, props)} rows={12} cols={30}/>
    }
  }

  onEditorValueChange (value, props) {
    const tempDummyObj = [...props.value]
    tempDummyObj[props.rowIndex][props.field] = value
    this.setState({
      tableData: tempDummyObj
    })
  }

  updateProperty (property, value) {
    const item = this.state.item
    item[property] = value
    this.setState({ item: item })
  }

  addNew () {
    const temp = {}
    this.props.colList.forEach(obj => {
      // const temp
      temp[obj.field] = ''
      this.setState({
        item: { ...temp }
      })
    })
    this.setState({
      tableData: this.props.dataList
    })
    // this.setState({item: temp}, () =>{
    //   console.log(this.state.item);
    // });

    this.state.newItem = true
    this.setState({
      displayDialog: true
    })
  }

  renderDialogModal (colList) {
    const modal = colList.map((column, i) => {
      return (this.state.newItem &&
        <>
          <div className="p-col-4" style={{ padding: '.75em' }}><label>{column.header}</label></div>
          <div className="p-col-8" style={{ padding: '.5em' }}>
            <InputText id={column.field} onChange={(e) => { this.updateProperty(`${column.field}`, e.target.value) }} value={this.state.item[column.field]}/>
          </div>
        </>
      )
    })

    const addKeyIntoFeatureList = () => {
      let values = this.state.item.value || {};
      values[this.state.item.key] = this.state.item.v;
      this.setState({
        item: {
          ...this.state.item,
          value: values,
          key: '',
          v: ''
        }
      })
    }

    const addFeature = () => {
      return (
        <>
          <h6>Add new key-value pair:</h6>
          <div className="p-col-4" style={{ padding: '.5em' }}>
            <input placeholder=" Key" className="dialog-box-input-field" id={'key'} onChange={(e) => { this.updateProperty(`key`, e.target.value) }} value={this.state.item['key']}/>
            <input placeholder=" Value" className="dialog-box-input-field" id={'v'} onChange={(e) => { this.updateProperty(`v`, e.target.value) }} value={this.state.item['v']}/>
            <Button style={{ float: 'right', height: '35px', width: '100px' }} label="Add" icon="pi pi-plus" onClick={addKeyIntoFeatureList}/>
          </div>
        </>
      );
    }

    const renderFeatureList = () => {
      
    }
    return (
      <>
        {modal}
        {addFeature()}
        {
          (Object.keys(this.state.item.value || {})).map(key => (
            <p> {key} | {this.state.item.value[key]}</p>
            ))
        }
      </>
    )
  }

  save () {
    const items = this.state.tableData
    if (this.state.newItem) { items.push(this.state.item) }

    this.setState({ tableData: items, selected: [], displayDialog: false,item: {key: '', v: ''}, newItem: false })
  }

  delete () {
    const data = this.state.selected
    const tableData = this.props.dataList
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < this.props.dataList.length; j++) {
        if (isEqual(tableData[j], data[i])) {
          tableData.splice(j, 1)
          continue
        }
      }
    }
    this.setState({
      tableData: tableData,
      selected: [],
      item: null,
      displayDialog: false,
      newItem: false
    })
  }

  async tabulate () {
    this.state.selected.forEach(async element => {
      const tabulateRes = await Axios.post(
        `${backendUrl}/dashboard/tabulate`,
        {
          docID: element.DocID,
          fileType: element.FileType,
          projectID: this.props.projectID
        }
      )
    })
  }

  toggleSelection (key, shift, row) {
    let selected = [...this.state.selected]
    const keyIndex = selected.indexOf(key.replace('select-', ''))
    if (keyIndex >= 0) {
      selected = [
        ...selected.slice(0, keyIndex),
        ...selected.slice(keyIndex + 1)
      ]
    } else {
      selected.push(key.replace('select-', ''))
    }
    this.setState({ selected })
  };

  toggleAll () {
    const selectAll = !this.state.selectAll
    const selected = []
    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance()
      const currentRecords = wrappedInstance.getResolvedState().sortedData
      currentRecords.forEach(item => {
        selected.push(item._original._id)
      })
    }
    this.setState({ selectAll, selected })
  };

  isSelected (key) {
    return this.state.selected.includes(key)
  };

  filterRows (rows, columns, searchQuery = '') {
    const filteredRows = []
    if (searchQuery === null || searchQuery === '') {
      return rows
    }
    rows.forEach(row => {
      columns.some(column => {
        if (row[column.field] !== undefined && row[column.field] !== null) {
          const rowValue = String(row[column.field]).toLowerCase()
          if (rowValue.length >= searchQuery.length && rowValue.indexOf(searchQuery.toLowerCase()) >= 0) {
            filteredRows.push(row)
            return true
          }
        }
        return false
      })
    })
    return filteredRows
  }

  renderWorkDescriptionModal () {
    return (
      <>
        <h1>Somethign</h1>
      </>
    )
  }

  updateWorkDescription (value) {
    this.setState({
      workItemDescription: value
    })
  }

  saveWorkDescription () {
    this.setState({
      displayWorkDescriptionForm: false
    })
  }

  displayAcceptanceForm (e) {
    this.setState({
      displayWorkDescriptionForm: true
    })
    e.stopPropogation()
  }

  actionTemplate (props) {
    const deleteRow = async s => {
      this.setState({
        isLoading: true
      })

      await Axios.delete(
        `http://rmp-product-lb-756577841.us-east-1.elb.amazonaws.com/rawmaterial/deleterawmaterial`,
        {
          data: { 
            id_list: [
              props.id
            ]
          }
        }

      ).then(res => {
        let newTableData = this.props.dataList;
        let flag;
        this.props.dataList.forEach((row, key) => {
          if (isEqual(row, props)) {
            flag = key
          }
        })
        newTableData.splice(flag, 1)
        this.setState({
          isLoading: false,
          tableData: newTableData
        })
      }).catch(err => {

      })
    }

    const acceptRow = x => {
      this.setState({
        displayWorkDescriptionForm: true
      })
      const s = (this.state.tableData || this.props.dataList).indexOf(x)
      console.log(s)
      return this.state.tableData.indexOf(x)
    }

    return this.props.editable && (<>
      <i className="material-icons" onClick={deleteRow}>
          delete_outline
      </i>
      { this.props.acceptButton ? <i className="material-icons" onClick={acceptRow}>
          check
      </i> : ''}
      { this.props.rejectButton ? <i className="material-icons">
          close
      </i> : ''}
    </>)
  }

  render () {
    let { colList, dataList } = this.props
    const { selected, selectAll } = this.state
    const actions = this.props.actionsLabel
    const acceptanceColumn = ['acceptancecriteriaapi', 'acceptancecriteriaextracted', 'acceptancecriteriatable']
    const dialogModal = this.renderDialogModal(colList)
    const workDescriptionModal = this.renderWorkDescriptionModal()
    const footer = (this.props.editable || this.props.footer) && (
      <div className="p-clearfix tableFooter" style={{ width: '100%' }}>
        {!this.props.footer ? <Button style={{ float: 'right', margin: '5px' }} label="Add" icon="pi pi-plus" onClick={this.addNew}/> : ''}
        {this.props.tabulate ? <Button style={{ float: 'right', margin: '5px' }} label="Tabulate" icon="pi pi-plus" onClick={this.tabulate}/> : ''}
      </div>
    )
    const dialogFooter = <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Save" icon="pi pi-check" onClick={this.save}/>
    </div>

    const workDescriptionFormFooter = <div className="ui-dialog-buttonpane p-clearfix">
      <Button label="Save" icon="pi pi-check" onClick={this.saveWorkDescription}/>
    </div>

    dataList = dataList || []
    return (
      <div xs={12} className="tableContainer">
        <DataTable
          style={this.props.style}
          value={this.state.tableData || dataList}
          footer={footer}
          paginator={true}
          paginatorPosition={'bottom'}
          rows={this.props.rows ? this.props.rows : 5}
          scrollable={true}
          scrollHeight={`${window.innerHeight * 0.65}px`}
          editable={this.props.editable}
          autoLayout={this.props.notResizeable ? false : true}
          resizableColumns={true}
          rowClassName={this.props.rowClassName ? (rowData) => this.props.rowClassName(rowData) : () => { }}
          expandedRows={this.state.expandedRows}
          onRowToggle={(e) => this.setState({expandedRows:e.data})}
          rowExpansionTemplate={this.props.rowExpansionTemplate}
        >
          {this.props.rowExpansionTemplate && <Column expander={true} style={{width: '4em'}} />}
          {this.props.actionItemNotNeeded != true && <Column body={this.actionTemplate} style={{ textAlign: 'center', width: '4em' }}/>}
          {colList.map((el, index) => {
            const field = el.field
            const header = el.header
            let columnProps = {
              id: el.header,
              header: el.header,
              filter: true,
              filterMatchMode: 'startsWith'
            }
            // console.log(header.toLowerCase().replace(/ /g, ''))
            if (this.props.editable) {
              columnProps = {
                ...columnProps,
                editor: this.cellEditor
              }
            }
            return (
              <Column
                field={el.field}
                {...columnProps}
                style={{ width: '200px' }}
              />
            )
          })}
        </DataTable>
        <Dialog visible={this.state.displayDialog} width="300px" header="New Item Details" modal={true} footer={dialogFooter} onHide={() => this.setState({ displayDialog: false })}>
          {
            this.state.newItem &&

              <div className="p-grid p-fluid editFormModal overflow-auto">
                {dialogModal}
              </div>
          }
        </Dialog>
      </div>
    )
  }
}
