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

        // { field: '"Basic Steel Price considered "', header: 'Basic Steel Price considered' },
        // { field: 'Cbm Ratio', header: 'Cbm Ratio' },
        // { field: 'Duties & C&F Charges', header: 'Duties & C&F Charges' },

        // { field: 'Applicable Main standard', header: 'Applicable Main standard' },
        // { field: 'Inwards Transportation for plates/coils', header: 'Inwards Transportation for plates/coils' },
        // { field: 'Item', header: 'Item' },
        // { field: 'Kg/Meter', header: 'Kg/Meter' },

        // { field: 'Pipe Type', header: 'Pipe Type' },
        // { field: 'Product Service Level (PSL-1/2)', header: 'Product Service Level (PSL-1/2)' },
        // { field: 'Quantity', header: 'Quantity' },
        // { field: 'Quantity (Joints)', header: 'Quantity (Joints)' },

        // { field: 'Quantity (Square meters)', header: 'Quantity (Square meters)' },
        // { field: 'RM Waste', header: 'RM Waste' },
        // { field: 'Service (Onshore/Offshore)', header: 'Service (Onshore/Offshore)' },
        // { field: 'Steel Source / Options', header: 'Steel Source / Options' },
        // { field: 'Total Cbm', header: 'Total Cbm' },

        // { field: 'Wastage after Considering Salvage', header: 'Wastage after Considering Salvage' },
        // { field: 'Weight Per Pipe', header: 'Weight Per Pipe' },
        // { field: 'Welspun Plant Location', header: 'Welspun Plant Location' }
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
    const newTableData = {
      ProjectID: 'PROJ456CLIENT',
      ProjectType: 'HFW',
      Client: 'Client',
      DocID: 'PROJ456CLIENT-CALC-SHEET',
      HoopStress: '100%',
      HoldTime: '10 seconds',
      NegativeTolerance: '98.75',
      PositiveTolerance: '98.75',
      PipeLength: 'QRL',
      Weight: '500',
      Peaking: '10',
      SMTS: '10%',
      RtRm: '0.9',
      GrainSize: '8 or finer'
    }
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
    // if(this.props.documentFiletype === 'cost_sheet'){
    //     data = await axios.get(
    //         `${backendUrl}/dashboard/get_costsheet_doc_docid`,{
    //             params:{
    //                 docID : this.state.documentId
    //             }
    //         }
    //     );
    //     const  tableData  = await axios.get(
    //         `${backendUrl}/dashboard/get_ikv_doc`,{
    //             params:{
    //                 projectID : this.props.projectId
    //             }
    //         }
    //     )
    //     let data.data = tableData.data.data[0].cost_sheet[0];
    //     this.setState({
    //         grainSize: data.data.GrainSize,
    //         holdTime: data.data.HoldTime,
    //         hoopStress: data.data.HoopStress,
    //         reverseBendTest: data.data.ReverseBendTest,
    //         RtRm: data.data.RtRm,
    //         SMTS: data.data.SMTS,
    //         tolerance: data.data.Tolerance,
    //         weight: data.data.Weight,
    //         pipeLength: data.data.PipeLength
    //     })
    //     this.setState({
    //         keyValueColumnList: this.state.keyvalueCostSheetColList,
    //         actions: [],
    //         keyvalueCostSheetValueList: [
    //             {
    //                 fieldname: 'Grain Size',
    //                 value: data.data.GrainSize,
    //             },
    //             {
    //                 fieldname: 'Hold Time',
    //                 value: data.data.HoldTime,
    //             },
    //             {
    //                 fieldname: 'Hoop Stress',
    //                 value: data.data.HoopStress,
    //             },
    //             {
    //                 fieldname: 'Reverse Bend Test',
    //                 value: data.data.ReverseBendTest,
    //             },
    //             {
    //                 fieldname: 'Rtrm',
    //                 value: newTableData.RtRm,
    //             },
    //             {
    //                 fieldname: 'SMTS',
    //                 value: newTableData.SMTS,
    //             },
    //             {
    //                 fieldname: "Tolerance",
    //                 value: newTableData.Tolerance,
    //             },
    //             {
    //                 fieldname: 'Weight',
    //                 value: newTableData.Weight,
    //             },
    //             {
    //                 fieldname: 'Pipe length',
    //                 value: newTableData.PipeLength,
    //             }
    //           ]
    //     });
    // }else{
    //     data = await axios.get(
    //         `${backendUrl}/dashboard/get_ikv_doc_docid`,{
    //             params:{
    //                 docID : this.state.documentId
    //             }
    //         }
    //     );
    //     this.setState({
    //         keyValueColumnList: this.state.keyValueColList
    //     });
    // }

    // data = data.data.data[0];

    // stubbed code
    const xdata = data.data.data[0].Values

    const newData = []
    xdata.forEach(element => {
      const newElement = {
        ...element
      }
      newElement.OD = newElement.OD[0]
      newElement['Wall thickness'] = newElement['Wall thickness'][1]
      newData.push(newElement)
    })

    this.setState({ keyValueData: newData })

    // if(this.props.documentFiletype === 'cost_sheet'){
    //     let newData = [];
    //     data.forEach(element => {
    //         let newElement = {
    //             ...element
    //         };
    //         newElement['OD'] = newElement['OD'][0];
    //         newElement['Wall thickness'] = newElement['Wall thickness'][1];
    //         newData.push(newElement);
    //     });

    //     this.setState({ keyValueData: newData });
    // }else {
    //     this.setState({ keyValueData: data });
    // }
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
    saveEditedValue = await axios.post(
            `${backendUrl}/dashboard/update_calculation_data`,
            {
              ProjectID: this.props.projectId,
              docData: {
                Values: this.state.keyValueData,
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
