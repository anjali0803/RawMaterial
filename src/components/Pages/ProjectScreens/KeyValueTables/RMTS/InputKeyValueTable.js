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
import { cloneDeep } from 'lodash-es'
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
    this.setPipeCommentSheet = this.setPipeCommentSheet.bind(this)
    this.createNewVerison = this.createNewVerison.bind(this)
    this.renderSaveButton = this.renderSaveButton.bind(this)
    this.editable = this.editable.bind(this)
    this.convertElementData = this.convertElementData.bind(this)
    this.structureMechAndToughnessData = this.structureMechAndToughnessData.bind(this)
    this.destructureMechAndToughnessData = this.destructureMechAndToughnessData.bind(this)
    // // this.onDocIdClick = this.onDocIdClick.bind(this);
  }

  convertElementData (data) {
    const reducer = (total, value) => {
      const temp = Object.keys(value).map(element => {
        const obj = {
          element: element,
          ...value[element]
        }
        return obj
      })
      return [
        ...total,
        { ...temp }
      ]
    }
    return data.reduce(reducer, [])
  }

  async getKeyValueData () {
    let data
    this.setState({ isLoading: true })

    // stubbed code

    data = this.convertElementData(elementData)
    // let newData = [];

    const keys = Object.keys(elementData[0])
    const newData = keys.map(ele => {
      return {
        element: ele,
        ...elementData[0][ele]
      }
    })

    const versionMenu = elementData.map((data, index) => {
      return { name: `version ${index + 1}`, code: index }
    })
    this.setState({
      versionMenu: versionMenu,
      elementData: elementData,
      selectedVerison: { name: 'version 1', code: 0 }
    })
    this.setState({
      keyValueData: newData,
      table2ValueData: this.structureMechAndToughnessData(table2Data)
    })
    const s = this.destructureMechAndToughnessData(this.structureMechAndToughnessData(table2Data))
    if (this.state.elementData.length === 1) {
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
    let saveEditedValue
    if (this.props.documentFiletype === 'cost_sheet') {
      saveEditedValue = await axios.post(
        `${backendUrl}/dashboard/update_costsheet_value`,
        {
          docID: this.props.documentId,
          values: this.state.keyValueData,
          docData: {
            GrainSize: this.state.keyvalueCostSheetValueList[0].value,
            HoldTime: this.state.keyvalueCostSheetValueList[1].value,
            HoopStress: this.state.keyvalueCostSheetValueList[2].value,
            ReverseBendTest: this.state.keyvalueCostSheetValueList[3].value,
            RtRm: this.state.keyvalueCostSheetValueList[4].value,
            SMTS: this.state.keyvalueCostSheetValueList[5].value,
            Tolerance: this.state.keyvalueCostSheetValueList[6].value,
            Weight: this.state.keyvalueCostSheetValueList[7].value,
            PipeLength: this.state.keyvalueCostSheetValueList[8].value
          }
        }
      )
    } else {
      saveEditedValue = await axios.post(
        `${backendUrl}/dashboard/update_ikv_values`,
        {
          docID: this.props.documentId,
          values: this.state.keyValueData
        }
      )
    }
    console.log('data saved', saveEditedValue)
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
    const data = cloneDeep(this.state.elementData[props.value.code])
    this.setState({
      keyValueData: data,
      selectedVerison: { name: `version ${props.value.code + 1}`, code: props.value.code }
    })
    if (props.value.code === this.state.elementData.length - 1) {
      this.setState({
        editable: true
      })
    } else {
      this.setState({
        editable: false
      })
    }
  }

  setPipeCommentSheet () {
    $('.pipeButton').addClass('active')
    $('.coatingButton').removeClass('active')
    const data = cloneDeep(this.state.elementData[0])
    this.setState({
      keyValueData: data
    })
    const versionMenu = this.state.elementData.map((data, index) => {
      return { name: `version ${index + 1}`, code: index }
    })
    this.setState({
      versionMenu: versionMenu,
      selectedVerison: { name: 'version 1', code: 0 },
      doc: 'PIPE'
    })
    if (this.state.elementData.length === 1) {
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
    if (this.state.doc === 'PIPE') {
      const newPipeData = this.state.elementData
      newPipeData[this.state.elementData.length - 1] = this.state.keyValueData
      newPipeData.push(this.state.keyValueData)
      const newVersionMenu = this.state.versionMenu
      newVersionMenu.push({ name: `version ${newVersionMenu.length + 1}`, code: newVersionMenu.length })
      this.setState({
        elementData: newPipeData,
        versionMenu: newVersionMenu
      })
    } else {
      newCoatingData.push(this.state.keyValueData)
      const newVersionMenu = this.state.versionMenu
      newVersionMenu.push({ name: `version ${newVersionMenu.length + 1}`, code: newVersionMenu.length })
      this.setState({
        versionMenu: newVersionMenu
      })
    }
  }

  showForm () {
    this.setState({
      displayAcceptanceForm: true
    })
  }

  renderSaveButton () {
    if (this.state.doc === 'PIPE') {
      return this.state.elementData.length === (this.state.selectedVerison.code + 1)
    } else {
    }
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
              {this.renderSaveButton() ? <button type="button pad-left" className="actionBtn btn-success">Save</button> : ''}
              {this.renderSaveButton() ? <button type="button pad-left" onClick={this.createNewVerison} className="actionBtn btn-primary">Create New Ver.</button> : ''}
              <button type="button pad-left" className="actionBtn btn-dark">
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

  editable () {
    return this.state.elementData.length === (this.state.selectedVerison.code + 1)
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
