import React from 'react'
import './index.css'
import DocumentHeader from '../../../../DocumentHeader/DocumentHeader'
import ButtonHeader from '../../../../ButtonHeader/ButtonHeader'
import { createHashHistory } from 'history'
import { connect } from 'react-redux'
import TableComponent from '../../../../Table/TableComponent'
import CostSheetTableComponent from '../../../../Table/CostSheetTableComponent'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { backendUrl } from '../../../../../constant'
import LoadingScreen from '../../../LoadingScreen/loadingScreen'
import { cloneDeep } from 'lodash-es'
const history = createHashHistory()
const pageMapIndex = [
  'input-key-value',
  'recommendations',
  'acceptance',
  'output-key-value',
  'output-document'

]
class InputKeyValueTable extends React.Component {
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
      grainSize: '',
      holdTime: '',
      hoopStress: '',
      reverseBendTest: '',
      RtRm: '',
      SMTS: '',
      tolerance: '',
      weight: '',
      keyValueData: [
      ],
      backUpData: [],
      keyValueColumnList: [],
      tableColList: [
        { field: 'fieldname', header: 'Field Name' },
        { field: 'value', header: 'Value' }
      ],
      keyValueColList: [
        { field: 'WorkDescription', header: 'Work Description' },
        { field: 'ClientSpecNumber', header: 'Client Spec Number' },
        { field: 'TestingFrequency', header: 'Testing Frequency' },
        { field: 'AcceptanceCriteria', header: 'Acceptance Criteria Value' }
      ],
      keyvalueCostSheetValueList: [],
      keyvalueCostSheetColList: [
        { field: 'OD', header: 'OD(in)' },
        { field: 'Wall thickness', header: 'WT(in)' },
        { field: 'Grade', header: 'Grade' },
        { field: 'Each Pipe Length', header: 'Length (ft)' },
        { field: 'Quantity (MT)', header: 'Quantity (MT)' },
        { field: 'Bare / Coated External/Coated (Ext+Intl)', header: 'Coating' }
      ],
      actions: [
        { label: 'Recommendation', value: 1 },
        { label: 'Acceptance', value: 0 }
      ]
    }
    this.onRefresh = this.onRefresh.bind(this)
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this)
    this.renderSingleValueEditableTable = this.renderSingleValueEditableTable.bind(this)
    // // this.onDocIdClick = this.onDocIdClick.bind(this);
  }

  async getKeyValueData () {
    const data = await axios.get(
      `${backendUrl}/dashboard/get_calculation_data`, {
        params: {
          ProjectID: this.props.projectId
        }
      }
    )
    this.setState({
      keyValueColumnList: this.state.keyValueColList
    })
    this.setState({
      grainSize: data.data.data[0].GrainSize,
      holdTime: data.data.data[0].HoldTime,
      hoopStress: data.data.data[0].HoopStress,
      reverseBendTest: data.data.data[0].ReverseBendTest,
      RtRm: data.data.data[0].RtRm,
      SMTS: data.data.data[0].SMTS,
      negativeTolerance: data.data.data[0].NegativeTolerance,
      weight: data.data.data[0].Weight,
      pipeLength: data.data.data[0].PipeLength
    })
    this.setState({
      keyValueColumnList: this.state.keyvalueCostSheetColList,
      actions: [],
      keyvalueCostSheetValueList: [
        {
          fieldname: 'Grain Size',
          value: data.data.data[0].GrainSize
        },
        {
          fieldname: 'Hold Time',
          value: data.data.data[0].HoldTime
        },
        {
          fieldname: 'Hoop Stress',
          value: data.data.data[0].HoopStress
        },
        {
          fieldname: 'Peaking Factor',
          value: data.data.data[0].Peaking
        },
        {
          fieldname: 'Yield Ratio',
          value: data.data.data[0].RtRm
        },
        {
          fieldname: 'SMTS',
          value: data.data.data[0].SMTS
        },
        {
          fieldname: 'Positive Tolerance',
          value: data.data.data[0].PositiveTolerance
        },
        {
          fieldname: 'Negative Tolerance',
          value: data.data.data[0].NegativeTolerance
        },
        {
          fieldname: 'Weight',
          value: data.data.data[0].Weight
        },
        {
          fieldname: 'Pipe length',
          value: data.data.data[0].PipeLength
        }
      ]
    })

    this.setState({ isLoading: true })
    const xdata = data.data.data[0].Values

    const newData = []
    let backUpData = []
    xdata.forEach(element => {
      const newElement = {
        ...element
      }
      newElement.OD = newElement.OD[0]
      newElement['Wall thickness'] = newElement['Wall thickness'][1]
      newData.push(newElement)
      backUpData.push({
        'OD': element.OD[1],
        'Wall thickness': element['Wall thickness'][0]
      })
    })

    this.setState({ 
      keyValueData: newData,
      backUpData: backUpData
     })

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

    let data = cloneDeep(this.state.keyValueData);
    let nData = []
    data.map((row, i) => {
      const t = row;
      t['OD'] = [ row['OD'], this.state.backUpData[i]['OD']];
      t['Wall thickness'] = [ row['Wall thickness'], this.state.backUpData[i]['Wall thickness']];
      nData.push(t);
    })

    let saveEditedValue
    saveEditedValue = await axios.post(
            `${backendUrl}/dashboard/update_calculation_data`,
            {
              ProjectID: this.props.projectId,
              docData: {
                Values: nData,
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

  render () {
    let view = <div></div>
    if (this.props.documentFiletype === 'cost_sheet') {
      view = this.renderSingleValueEditableTable()
    }
    // for stubbed data only
    view = this.renderSingleValueEditableTable()

    return !this.state.isLoading ? (
      <div className="container-fluid">
        <div className="row justify-content-end">
          <div style={{ marginRight: '50px' }}>
            <ButtonHeader
              saveEnabled={this.props.saveEnabled}
              deleteEnabled={this.props.deleteEnabled}
              className="progbar-button-header"
              onSave={() => this.onSave()}
              onDelete={() => this.onDelete()}
            />
          </div>
        </div>
        {/* <DocumentHeader
                    documentId={this.state.documentId}
                    projectId={this.props.projectId}
                /> */}
        <TableComponent
          colList={this.state.keyValueColumnList}
          dataList={this.state.keyValueData}
          rowClassName={this.rowClassName}
          onRefresh={this.onRefresh}
          actionsLabel={this.state.actions}
          handleClickAllSelected={this.handleClickAllSelected}
          editable={true}
        />
        {view}
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
export default connect(mapStateToProps)(InputKeyValueTable)
