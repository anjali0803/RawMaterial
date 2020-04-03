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
      holdTime: '',
      hoopStress: '',
      reverseBendTest: '',
      RtRm: '',
      SMTS: '',
      tolerance: '',
      weight: '',
      keyValueData: [
      ],
      tabulateMsg: {
        class: '',
        text: ''
      },
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
        { field: 'Each Pipe Length', header: 'Length (m)' },
        { field: 'Quantity (MT)', header: 'Quantity (MT)' },
        { field: 'Quantity', header: 'Quantity (ft)' },
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
    this.setState({
      isLoading: true
    })
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
      keyValueColumnList: this.state.keyvalueCostSheetColList,
      actions: [],
      keyvalueCostSheetValueList: [
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
          value: data.data.data[0].PeakingFactor
        },
        {
          fieldname: 'Positive Nominal Weight',
          value: data.data.data[0].PositiveNominalWeight
        },
        {
          fieldname: 'Negative Nominal Weight',
          value: data.data.data[0].NegativeNominalWeight
        },
        {
          fieldname: 'Yield Ratio',
          value: data.data.data[0].YieldRatio
        },
        {
          fieldname: 'SMTS Quantity',
          value: data.data.data[0].SMTSQuantity
        },
        {
          fieldname: 'SMTS Percent',
          value: data.data.data[0].SMTSPercent
        },
        {
          fieldname: 'SMYS Quantity',
          value: data.data.data[0].SMYSQuantity
        },
        {
          fieldname: 'Plus Tolerance',
          value: data.data.data[0].PlusTolerance
        },
        {
          fieldname: 'Minus Tolerance',
          value: data.data.data[0].MinusTolerance
        }
      ]
    })

    const xdata = data.data.data[0].Values

    const newData = []
    let backUpData = []
    xdata.forEach(element => {
      const newElement = {
        ...element
      }
      newElement.OD = newElement.OD[0]
      newElement['Wall thickness'] = newElement['Wall thickness'][1]
      newElement['Quantity'] = Number(newElement['Quantity'][1]).toFixed(3)
      newElement['Quantity (MT)'] = Number(newElement['Quantity (MT)'][0]).toFixed(3)
      newData.push(newElement)
      backUpData.push({
        'OD': element.OD[1],
        'Wall thickness': Number(element['Wall thickness'][0]).toFixed(3),
        'Quantity': Number(element['Quantity'][0]).toFixed(3)
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

  async tabulateData () {
    this.setState({
      isLoading: true
    })
    const tabulateRes = await axios.post(
      `${backendUrl}/dashboard/tabulate`,
      {
        projectID: this.props.projectId,
        fileType: 'PIPE'
      }
    )
    if(tabulateRes.data.status === 'error') {
      this.setState({
        isLoading: false,
        tabulateMsg: {
          class: 'danger',
          text: 'Some issue occured during tabulate call!!'
        }
      })
    } else {
      this.setState({
        isLoading: false,
        tabulateMsg: {
          class: 'success',
          text: 'Tabulate call is successful'
        }
      })
    }
    setTimeout(() => {
      this.setState({
        tabulateMsg: {
          class: '',
          text: ''
        }
      })
    }, 10000)
  }

  async onSave () {
    this.setState({
      isLoading: true
    })

    let data = cloneDeep(this.state.keyValueData);
    let nData = []
    data.map((row, i) => {
      const t = row;
      t['OD'] = [ row['OD'], this.state.backUpData[i] ? this.state.backUpData[i]['OD'] : 0 ];
      t['Wall thickness'] = [this.state.backUpData[i] ? this.state.backUpData[i]['Wall thickness'] : 0 , row['Wall thickness']];
      t['Quantity'] = [ row['Quantity'], this.state.backUpData[i] ? this.state.backUpData[i]['Quantity'] : 0];
      nData.push(t);
    })

    let saveEditedValue = await axios.post(
    `${backendUrl}/dashboard/update_calculation_data`,
    {
      ProjectID: this.props.projectId,
      docData: {
        Values: nData,
        HoldTime: this.state.keyvalueCostSheetValueList[0].value,
        HoopStress: this.state.keyvalueCostSheetValueList[1].value,
        PeakingFactor: this.state.keyvalueCostSheetValueList[2].value,
        PositiveNominalWeight: this.state.keyvalueCostSheetValueList[3].value,
        NegativeNominalWeight: this.state.keyvalueCostSheetValueList[4].value,
        YieldRatio: this.state.keyvalueCostSheetValueList[5].value,
        SMTSQuantity: this.state.keyvalueCostSheetValueList[6].value,
        SMTSPercent: this.state.keyvalueCostSheetValueList[7].value,
        SMYSQuantity: this.state.keyvalueCostSheetValueList[8].value,
        PlusTolerance: this.state.keyvalueCostSheetValueList[9].value,
        MinusTolerance: this.state.keyvalueCostSheetValueList[10].value
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
          <div style={{ marginRight: '10px' }}>
            <ButtonHeader
              saveEnabled={this.state.tabulateMsg.text ? false : true}
              deleteEnabled={this.props.deleteEnabled}
              className="progbar-button-header"
              onSave={() => this.tabulateData()}
              onDelete={() => this.onDelete()}
              buttonText={'Tabulate'}
            />
          </div>
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

        {this.state.tabulateMsg.text && <div class={`alert alert-${this.state.tabulateMsg.class}`} style={{margin: '25px'}}>
          {this.state.tabulateMsg.text}
        </div>}

        <TableComponent
          colList={this.state.keyValueColumnList}
          dataList={this.state.keyValueData}
          rowClassName={this.rowClassName}
          onRefresh={this.onRefresh}
          actionsLabel={this.state.actions}
          handleClickAllSelected={this.handleClickAllSelected}
          editable={true}
          deleteEnabled={true}
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
