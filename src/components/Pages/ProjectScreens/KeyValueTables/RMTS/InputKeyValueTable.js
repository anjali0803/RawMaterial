import React from 'react'
import './index.css'
import { createHashHistory } from 'history'
import { connect } from 'react-redux'
import TableComponent from '../../../../Table/TableComponent2'
import CostSheetTableComponent from '../../../../Table/CostSheetTableComponent'
import axios from 'axios'
import { backendUrl } from '../../../../../constant'
import LoadingScreen from '../../../LoadingScreen/loadingScreen'
import { elementData, table2Data } from './stubData'
import { Dropdown } from 'primereact/dropdown'
import { cloneDeep, get } from 'lodash-es'
const history = createHashHistory()

class RMTS extends React.Component {
  constructor (props) {
    super(props)
    if (props.projectId === '') { history.push('/Inquiry/create-new-projects/details') }

    // if (props.documentArray[props.screenNumber - 1] === '')
    //     history.push(`/Inquiry/create-new-projects/${pageMapIndex[props.screenNumber - 1]}`)

    this.onSave = this.onSave.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.state = {
      isLoading: false,
      documentId: props.documentId,
      checked1: true,
      versionMenu: [],
      selectedVerison: 0,
      displayAcceptanceForm: false,
      editable: false,
      elementData: [],
      keyValueData: [],
      tableData: [],
      keyValueColumnList: [
        { field: 'element', header: 'Element' },
        { field: 'x52', header: 'x52' },
        { field: 'x60', header: 'x60' },
        { field: 'x65', header: 'x65' },
        { field: 'x70', header: 'x70' }
      ],
      table2ColumnList: [
        { field: 'property', header: 'Property' },
        { field: 'testingFromRolling', header: 'Testing direction from Rolling' },
        { field: 'testingTemprature', header: 'Test temp °C' },
        { field: 'API5LX52M', header: 'API5LX52M PSL2' },
        { field: 'API5LX60M', header: 'API5LX60M PSL2' },
        { field: 'API5LX65M', header: 'API5LX65M PSL2' },
        { field: 'API5LX70M', header: 'API5LX70M PSL2' }
      ],
      table2ValueData: []
    }
    this.onRefresh = this.onRefresh.bind(this)
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this)
    this.renderSingleValueEditableTable = this.renderSingleValueEditableTable.bind(this)
    this.renderButtonMenu = this.renderButtonMenu.bind(this)
    this.changeVerison = this.changeVerison.bind(this)
    this.createNewVerison = this.createNewVerison.bind(this)
    this.renderSaveButton = this.renderSaveButton.bind(this)
    this.editable = this.editable.bind(this)
    this.structureMechAndToughnessData = this.structureMechAndToughnessData.bind(this)
    this.destructureMechAndToughnessData = this.destructureMechAndToughnessData.bind(this)
    this.deStructureElementData = this.deStructureElementData.bind(this)
    this.structureElementData = this.structureElementData.bind(this)
    this.generateDoc = this.generateDoc.bind(this)
    // // this.onDocIdClick = this.onDocIdClick.bind(this);
  }

  async getKeyValueData () {
    this.setState({ isLoading: true })

    let data = await axios.get(
      `${backendUrl}/dashboard/get_rmts`, {
			  params: {
			    ProjectID: this.props.projectId
			  }
			}
    )
    
    const tableData = get(data, 'data.data[0].Values', []);

    const newData = this.structureElementData(tableData[0].tableData)

    const versionMenu = tableData.map((data, index) => {
      return { name: `version ${index + 1}`, code: index }
    })
    this.setState({
      versionMenu: versionMenu,
      tableData: tableData,
      selectedVerison: { name: 'version 1', code: 0 },
      keyValueData: cloneDeep(newData),
      table2ValueData: cloneDeep(this.structureMechAndToughnessData(tableData[0]))
    })
    if (tableData.length === 1) {
      this.setState({
        editable: true
      })
    }
    this.setState({ isLoading: false })
  }

  componentDidMount () {
    this.getKeyValueData()
  }

  onRefresh () {
    this.getKeyValueData()
  }

  async onSave () {
    this.setState({
      isLoading: true
    })
    let saveEditedValue
    saveEditedValue = await axios.post(
      `${backendUrl}/dashboard/update_rmts`,
      {
        ProjectID: this.props.projectId,
        Values: this.state.tableData
      }
    )
    this.setState({
      isLoading: false
    })
  }

  onDelete () {
    console.log('recommendations screen delete ....')
  }

  rowClassName (rowData) {
    console.log('Row class Name :', rowData.TestingFrequency > 5)

    return {
      'table-on-green': (parseInt(rowData.TestingFrequency) > 5),
      'table-on-red': (parseInt(rowData.TestingFrequency) < 5)
    }
  }

  async handleClickAllSelected (action, data) {
    if (action) {
      const sendRecommendationRes = await axios.post(
        `${backendUrl}/dashboard/send_rec_from_ikv`,
        {
          projectID: this.props.projectId,
          fileType: this.props.documentFiletype,
          ikvValues: data
        }
      )
    } else {
      const sendAcceptanceRes = await axios.post(
        `${backendUrl}/dashboard/send_acceptance_from_ikv`,
        {
          projectID: this.props.projectId,
          fileType: this.props.documentFiletype,
          ikvValues: data
        }
      )
    }
    // this.getUserList();
  }

  renderSingleValueEditableTable () {
    return (
      <CostSheetTableComponent
        colList={this.state.tableColList}
        dataList={this.state.keyvalueCostSheetValueList}
        editable={true}
        footer={true}
      />
    )
  }

  changeVerison (props) {
    const data = cloneDeep(this.state.tableData[props.value.code])
    this.setState({
      keyValueData: this.structureElementData(data.tableData),
      table2ValueData: this.structureMechAndToughnessData(data),
      selectedVerison: { name: `version ${props.value.code + 1}`, code: props.value.code }
    })
    if (props.value.code === this.state.tableData.length - 1) {
      this.setState({
        editable: true 
      })
    } else {
      this.setState({
        editable: false
      })
    }
  }

  createNewVerison (doc) {
    const newTableData = this.state.tableData
    newTableData[this.state.tableData.length - 1] = {
      ...this.destructureMechAndToughnessData(this.state.table2ValueData),
      tableData: this.deStructureElementData(this.state.keyValueData)
    }
    newTableData.push({
      ...this.destructureMechAndToughnessData(this.state.table2ValueData),
      tableData: this.deStructureElementData(this.state.keyValueData)
    })

    // newTableData[this.state.elementData.length - 1] = this.state.keyValueData
    // newTable2Data[this.state.table2ValueData.length - 1] = this.state.table2ValueData
    // newTableData.push(this.state.keyValueData)
    // newTable2Data.push(this.state.table2ValueData)
    const newVersionMenu = this.state.versionMenu
    newVersionMenu.push({ name: `version ${newVersionMenu.length + 1}`, code: newVersionMenu.length })
    this.setState({
      tableData: newTableData,
      versionMenu: newVersionMenu
    })
  }

  showForm () {
    this.setState({
      displayAcceptanceForm: true
    })
  }

  renderSaveButton () {
    return this.state.tableData.length === (this.state.selectedVerison.code + 1)
  }

  renderButtonMenu () {
    return (
      <div className="row" style={{ paddingLeft: '35px', paddingRight: '35px' }}>
        <div className="col-6 justify-content-start">
          <div className="row justify-content-start">
            <div className="col-6">
              <Dropdown value={this.state.selectedVerison} options={this.state.versionMenu} onChange={this.changeVerison} placeholder="Select Verison" optionLabel="name" />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row d-flex justify-content-end fright">
            <div className="col-12">
              {this.renderSaveButton() ? <button type="button pad-left" onClick={this.onSave} className="actionBtn btn-success">Save</button> : ''}
              {this.renderSaveButton() ? <button type="button pad-left" onClick={this.createNewVerison} className="actionBtn btn-primary">Create New Ver.</button> : ''}
              <button type="button pad-left" className="actionBtn btn-dark" onClick={this.generateDoc}>
                <i className="material-icons">
                save
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  async generateDoc () {
    this.setState({
      isLoading: true
    })
    const generateDocRes = await axios.post(
			`${backendUrl}/dashboard/itpdoc_download`,
			{
        values: this.state.tableData[this.state.selectedVerison.code],
			  version: this.state.selectedVerison.code,
			  project_id: this.props.projectId
			}
    )
    this.setState({
      isLoading: false
    })
  }

  editable () {
    return this.state.elementData.length === (this.state.selectedVerison.code + 1)
  }

  structureElementData(data){
    const keys = Object.keys(data)
    const newData = keys.map(ele => {
      return {
        element: ele,
        ...elementData[0][ele]
      }
    })
    return newData
  }

  deStructureElementData(data){
    let obj = {};

    data.map(row => {
      obj[row.element] = {
        x52: row.x52,
        x60: row.x60,
        x65: row.x65,
        x70: row.x70
      }
    })
    return obj;
  }

  structureMechAndToughnessData (data) {
    const properties = [
      'YS (0.5% EUL) MPa',
      'UTS, MPa',
      "Elogation at 2'' GL, %",
      'Hardness, Hv10 kgf',
      'Bend test',
      'CVN energy, Joule',
      'CVN shear area, %',
      'DWTT shear area, %',
      'DBTT (CVN & DWTT)'
    ]
    const testingFromRolling = [
      'ysTestingDirection',
      'ysTestingDirection',
      'ysTestingDirection',
      'ysTestingDirection',
      'hardnessTestingDirection',
      'bendTestDirection',
      'cvnDirection',
      'cvnShearDirection',
      'dwttShearDirection',
      'dbttDirection'
    ]
    const testingTemprature = [
      'ysTestingTemp',
      'ysTestingTemp',
      'ysTestingTemp',
      'ysTestingTemp',
      'hardnessTestingTemp',
      'bendTestTemp',
      'cvnTemp',
      'cvnShearTemp',
      'dwttShearTemp',
      'dbttDirection'
    ]
    const API5LX52M = [
      'ys52',
      'uts52',
      'ysuts52',
      'el52',
      'hardnessTesting52',
      'bendTest52',
      'cvn52',
      'cvnShear52',
      'dwttShear52',
      'dbtt52'
    ]
    const API5LX60M = [
      'ys60',
      'uts60',
      'ysuts60',
      'el60',
      'hardnessTesting60',
      'bendTest60',
      'cvn60',
      'cvnShear60',
      'dwttShear60',
      'dbtt60'
    ]
    const API5LX65M = [
      'ys65',
      'uts65',
      'ysuts65',
      'el65',
      'hardnessTesting65',
      'bendTest65',
      'cvn65',
      'cvnShear65',
      'dwttShear65',
      'dbtt65'
    ]
    const API5LX70M = [
      'ys70',
      'uts70',
      'ysuts70',
      'el70',
      'hardnessTesting70',
      'bendTest70',
      'cvn70',
      'cvnShear70',
      'dwttShear70',
      'dbtt70'
    ]

    const fields = [
      'property',
      'testingFromRolling',
      'testingTemprature',
      'API5LX52M',
      'API5LX60M',
      'API5LX65M',
      'API5LX70M'
    ]
    const table = []
    for (let i = 0; i < 7; i++) {
      table.push({
        property: properties[i],
        testingFromRolling: data[testingFromRolling[i]],
        testingTemprature: data[testingTemprature[i]],
        API5LX52M: data[API5LX52M[i]],
        API5LX60M: data[API5LX60M[i]],
        API5LX65M: data[API5LX65M[i]],
        API5LX70M: data[API5LX70M[i]]
      })
    }

    return table
  }

  destructureMechAndToughnessData (data) {
    const testingFromRolling = [
      'ysTestingDirection',
      'ysTestingDirection',
      'ysTestingDirection',
      'ysTestingDirection',
      'hardnessTestingDirection',
      'bendTestDirection',
      'cvnDirection',
      'cvnShearDirection',
      'dwttShearDirection',
      'dbttDirection'
    ]
    const testingTemprature = [
      'ysTestingTemp',
      'ysTestingTemp',
      'ysTestingTemp',
      'ysTestingTemp',
      'hardnessTestingTemp',
      'bendTestTemp',
      'cvnTemp',
      'cvnShearTemp',
      'dwttShearTemp',
      'dbttDirection'
    ]
    const API5LX52M = [
      'ys52',
      'uts52',
      'ysuts52',
      'el52',
      'hardnessTesting52',
      'bendTest52',
      'cvn52',
      'cvnShear52',
      'dwttShear52',
      'dbtt52'
    ]
    const API5LX60M = [
      'ys60',
      'uts60',
      'ysuts60',
      'el60',
      'hardnessTesting60',
      'bendTest60',
      'cvn60',
      'cvnShear60',
      'dwttShear60',
      'dbtt60'
    ]
    const API5LX65M = [
      'ys65',
      'uts65',
      'ysuts65',
      'el65',
      'hardnessTesting65',
      'bendTest65',
      'cvn65',
      'cvnShear65',
      'dwttShear65',
      'dbtt65'
    ]
    const API5LX70M = [
      'ys70',
      'uts70',
      'ysuts70',
      'el70',
      'hardnessTesting70',
      'bendTest70',
      'cvn70',
      'cvnShear70',
      'dwttShear70',
      'dbtt70'
    ]
    const fields = [
      'testingFromRolling',
      'testingTemprature',
      'API5LX52M',
      'API5LX60M',
      'API5LX65M',
      'API5LX70M'
    ]
    const obj = {}
    data.map((row, i) => {
      obj[testingFromRolling[i]] = row.testingFromRolling
      obj[testingTemprature[i]] = row.testingTemprature
      obj[API5LX52M[i]] = row.API5LX52M
      obj[API5LX60M[i]] = row.API5LX60M
      obj[API5LX65M[i]] = row.API5LX65M
      obj[API5LX70M[i]] = row.API5LX70M
    })
    return obj
  }

  render () {
    let view = <div></div>
    // for stubbed data only
    view = this.renderButtonMenu()

    return !this.state.isLoading ? (
      <div className="container-fluid">
        {view}
        <hr style={{ marginTop: '10px', marginBottom: '0px' }} />
        <TableComponent
          colList={this.state.keyValueColumnList}
          dataList={this.state.keyValueData}
          rowClassName={this.rowClassName}
          onRefresh={this.onRefresh}
          actionsLabel={this.state.actions}
          handleClickAllSelected={this.handleClickAllSelected}
          editable={this.state.editable}
          acceptButton={false}
          rejectButton={false}
        />

        <TableComponent
          colList={this.state.table2ColumnList}
          dataList={this.state.table2ValueData}
          rowClassName={this.rowClassName}
          onRefresh={this.onRefresh}
          actionsLabel={this.state.actions}
          handleClickAllSelected={this.handleClickAllSelected}
          editable={this.state.editable}
          acceptButton={false}
          rejectButton={false}
        />
      </div>
    ) : (
      <LoadingScreen />
    )
  }
}
const mapStateToProps = state => ({
  projectId: state.projectId,
  documentId: state.documentId,
  documentArray: state.documentArray,
  documentFiletype: state.documentFiletype
})
export default connect(mapStateToProps)(RMTS)
