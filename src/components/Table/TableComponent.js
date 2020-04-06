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
import Autocomplete from 'react-autocomplete'
import checkboxHOC from 'react-table/lib/hoc/selectTable'
import { head } from 'lodash-es'
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
      displayWorkDescriptionForm: false,
      displayRejectWorkDescriptionForm: false,
      workItemDescription: '',
      newItem: false,
      item: {
        ...temp
      },
      selectedCommentSheetRow: {},
      wdOptions: []
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
    this.filterOptionsMultiple = this.filterOptionsMultiple.bind(this)
    this.rejectWorkDescription = this.rejectWorkDescription.bind(this)
    this.statusTemplate = this.statusTemplate.bind(this)
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
    // console.log(props);
    return this.inputTextEditor(props, props.field)
  }

  inputTextEditor (props, field) {
    return <InputTextarea value={props.rowData[field]} onBlur={(e) => console.log(props.rowData[field])} onChange={(e) => this.onEditorValueChange(e.target.value, props)} rows={10} cols={30}/>
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

    this.state.newItem = true
    this.setState({
      displayDialog: true
    })
  }

  renderDialogModal (colList) {
    const modal = colList.map(column => {
      return (this.state.newItem &&
        <>
          <div className="p-col-4" style={{ padding: '.75em' }}><label>{column.header}</label></div>
          <div className="p-col-8" style={{ padding: '.5em' }}>
            <InputText id={column.field} onChange={(e) => { this.updateProperty(`${column.field}`, e.target.value) }} value={this.state.item[column.field]}/>
          </div>
        </>
      )
    })
    return modal
  }

  save () {
    const items = this.state.tableData
    if (this.state.newItem) { items.push(this.state.item) }

    this.setState({ tableData: items, selected: [], item: null, displayDialog: false, newItem: false })
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

  filterOptionsMultiple (value) {
    setTimeout(() => {
      const results = this.props.wdOptions.filter((wd) => {
        return wd.toLowerCase().startsWith(value.toLowerCase())
      })

      this.setState({ wdOptions: results })
    }, 250)
  }

  renderWorkDescriptionModal () {
    return (
      <>
        <div className="p-col-4" style={{ padding: '.75em' }}><label> Work Description</label></div>
        <div className="p-col-8" style={{ padding: '.5em' }}>
        <Autocomplete
                    className="auto-complete"
                    getItemValue={(item) => item}
                    items={this.state.wdOptions}
                    id="workDescription"
                    renderItem={(item, isHighlighted) =>
                      <div style={{ background: isHighlighted ? 'lightgray' : 'white', zIndex: 10000, paddingTop: '5px' }}>
                        {item}
                      </div>
                    }
                    value={this.state.workItemDescription}
                    onChange={(e) => { this.updateWorkDescription(e.target.value) }}
                    onSelect={(val) => {
                      this.setState({
                        workItemDescription: val,
                        workDescriptionOptions: []
                      })
                    }}
                    wrapperStyle={
                      {
                        fontSize: '15px',
                        color: '#333333',
                        height: '38px',
                        width: '250px',
                        background: '#ffffff',
                        padding: '0.429em',
                        border: '1px solid #ced4da',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                        appearance: 'none',
                        borderRadius: '4px'
                      }
                    }
                    menuStyle={
                      {
                        top: '158px !important',
                        left: '23px !important',
                        zIndex: 1000,
                        borderRadius: '3px',
                        boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                        background: 'rgba(255, 255, 255, 0.9)',
                        paddingLeft: '3px',
                        paddingBottom: '3px',
                        position: 'fixed',
                        overflow: 'auto',
                        maxHeight: '50%',
                        fontSize: '14px',
                        fontFamily: 'Open Sans',
                        textDecoration: 'none',
                        minWidth: '240px'
                      }
                    }
                  />
        </div>
      </>
    )
  }

  updateWorkDescription (value) {
    this.setState({
      workItemDescription: value
    })
    this.filterOptionsMultiple(value)
  }

  saveWorkDescription () {
    Axios.post(
      `${backendUrl}/dashboard/send_accepted_to_itp`,
      {
        ProjectID: this.props.projectId,
        FileType: this.props.documentFiletype,
        CommentSheetRow: this.state.selectedCommentSheetRow,
        WorkDescription: this.state.workItemDescription
      }
    )
    let newTableData = this.props.dataList
    const newRow = this.state.selectedCommentSheetRow
    newRow.WorkDescription = this.state.workItemDescription
    newRow.Status = 'Accepted'
    newTableData = this.props.dataList.filter(row => {
      if (!isEqual(row, this.state.selectedCommentSheetRow)) {
        return row
      }
    })
    newTableData.push(newRow)
    this.setState({
      displayWorkDescriptionForm: false,
      workItemDescription: '',
      selectedCommentSheetRow: {},
      tableData: newTableData
    })
    this.props.saveCommentSheet(newTableData)
  }

  rejectWorkDescription(){
    let newTableData = this.props.dataList
    const newRow = this.state.selectedCommentSheetRow
    newRow.Status = 'Rejected'
    newTableData = this.props.dataList.filter(row => {
    if (!isEqual(row, this.state.selectedCommentSheetRow)) {
        return row
      }
    })
    newTableData.push(newRow)
    this.setState({
      displayWorkDescriptionForm: false,
      workItemDescription: '',
      selectedCommentSheetRow: {},
      tableData: newTableData
    })
    this.props.saveCommentSheet(newTableData)
  }

  actionTemplate (props) {
    const deleteRow = s => {
      console.log(props)
      let newTableData = this.props.dataList;
      let flag;
      this.props.dataList.forEach((row, key) => {
        if (isEqual(row, props)) {
          flag = key
        }
      })
      newTableData.splice(flag, 1)
      this.setState({
        tableData: newTableData
      })
    }

    const acceptRow = x => {
      this.setState({
        displayWorkDescriptionForm: true,
        selectedCommentSheetRow: props
      })
    }

    const rejectRow = x => {
      this.setState({
        selectedCommentSheetRow: props,
        displayRejectWorkDescriptionForm: true
      })
      // this.rejectWorkDescription();
    }

    return this.props.editable && (<>
      { this.props.deleteEnabled && <i className="material-icons" onClick={deleteRow}>
          delete_outline
      </i>}
      { this.props.acceptButton ? <i className="material-icons" onClick={acceptRow}>
          check
      </i> : ''}
      { this.props.rejectButton ? <i className="material-icons" onClick={rejectRow}>
          close
      </i> : ''}
    </>)
  }

  statusTemplate (rowData, column){
    let status = rowData.Status;
    let fontColor = status === 'Accepted' ? 'green' : 'red';

    return <span style={{color: fontColor}}>{status}</span>;
  }

  render () {
    console.log('props', this.props)
    console.log('state', this.state)
    let { colList, dataList } = this.props
    const { selected, selectAll } = this.state
    const actions = this.props.actionsLabel

    const dialogModal = this.renderDialogModal(colList)
    const workDescriptionModal = this.renderWorkDescriptionModal()
    const footer = (this.props.editable || this.props.footer) && (
      <div className="p-clearfix tableFooter" style={{ width: '100%' }}>
        {/* <Dropdown
          options={actions}
          onChange={e => this.handleClickAllSelected(e.value)}
          placeholder="Select Action"
          disabled={selected.length == 0}
        /> */}
        {!this.props.footer ? <Button style={{ float: 'right', margin: '5px' }} label="Add" icon="pi pi-plus" onClick={this.addNew}/> : ''}
        {/* {!this.props.footer ? <Button style={{float:'right', margin: '5px'}} label="Delete" icon="pi pi-times" onClick={this.delete}/> : ''} */}
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
          value={this.state.tableData || dataList}
          footer={footer}
          paginator={true}
          paginatorPosition={'bottom'}
          style={this.props.style}
          rows={10}
          scrollable={true}
          editable={this.props.editable}
          autoLayout={true}
          resizableColumns={true}
          rowClassName={this.props.rowClassName ? (rowData) => this.props.rowClassName(rowData) : () => { }}
        >
          <Column body={this.actionTemplate} style={{ textAlign: 'center', width: '4em' }}/>
          {colList.map((el, index) => {
            const field = el.field
            const header = el.header
            let columnProps = {
              id: el.header,
              header: el.header,
              filter: true,
              sortable: true,
              filterMatchMode: 'startsWith'
            }
            // console.log(header.toLowerCase().replace(/ /g, ''))

            if (header.toLowerCase().replace(/ /g, '') == 'documentid') {
              return <Column
                id={`table-${index}`}
                {...columnProps}
                style={{ width: '200px' }}
              />
            } else {
              if(header === 'Status'){
                columnProps = {
                  ...columnProps,
                  body: this.statusTemplate
                }
              }
              if (this.props.editable) {
                columnProps = {
                  ...columnProps,
                  editor: this.cellEditor
                }
              }
              if(this.props.broadColumns && this.props.broadColumns.indexOf(header) >= 0){
                return (
                  <Column
                    field={el.field}
                    {...columnProps}
                    style={{ width: '600px' }}
                  />
                );
              }
              return (
                <Column
                  field={el.field}
                  {...columnProps}
                  style={{ width: '200px' }}
                />
              );
            }
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
        <Dialog visible={this.state.displayWorkDescriptionForm} width="600px" header="Work Description" modal={true} footer={workDescriptionFormFooter} onHide={() => this.setState({ displayWorkDescriptionForm: false })}>
          {
            <div className="p-grid p-fluid">
              {workDescriptionModal}
            </div>
          }
        </Dialog>
        <Dialog visible={this.state.displayRejectWorkDescriptionForm} width="600px" header="Are you sure you want to reject?" modal={true} footer={<></>} onHide={() => this.setState({ displayRejectWorkDescriptionForm: false })}>
          {
            <div className="p-grid p-fluid justify-content-center">
              <div className="container">
                <div className="row justify-content-center">
                  <button className="btn btn-danger" onClick={this.rejectWorkDescription}>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          }
        </Dialog>
      </div>
    )
  }
}
