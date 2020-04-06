import React from 'react'
import './index.css'
import DocumentHeader from '../../../../DocumentHeader/DocumentHeader'
import ButtonHeader from '../../../../ButtonHeader/ButtonHeader'
import { createHashHistory } from 'history'
import { connect } from 'react-redux'
import TableComponent from '../../../../Table/TableComponent2'
import {default as TableComponent1} from '../../../../Table/TableComponent'
import CostSheetTableComponent from '../../../../Table/CostSheetTableComponent'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { backendUrl } from '../../../../../constant'
import LoadingScreen from '../../../LoadingScreen/loadingScreen'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
import {Growl} from 'primereact/growl';
import { ToggleButton } from 'primereact/togglebutton'
import { Button } from 'primereact/button'
import { cloneDeep, get } from 'lodash-es'
const history = createHashHistory()
const pageMapIndex = [
  'input-key-value',
  'recommendations',
  'acceptance',
  'output-key-value',
  'output-document'
]
class ITP extends React.Component {
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
      pipeData: [],
      coatingData: [],
      doc: 'PIPE',
      selectedVerison: 0,
      displayAcceptanceForm: false,
      editable: false,
      keyValueColumnList: [
        { field: 'WorkDescription', header: 'Work Description' },
        { field: 'ReferenceStandardAPI', header: 'Reference Standard API' },
        { field: 'ReferenceStandardExtracted', header: 'Reference Standard Extracted' },
        { field: 'TestingFrequencyAPI', header: 'Testing Frequency API' },
        { field: 'TestingFrequencyExtracted', header: 'Testing Frequency Extracted' },
        { field: 'AcceptanceCriteriaAPI', header: 'Acceptance Criteria API' },
        { field: 'AcceptanceCriteriaExtracted', header: 'Acceptance Criteria Extracted' },
        // { field: 'AcceptanceCriteriaTable', header: 'Acceptance Criteria Table' },
        { field: 'Documents', header: 'Documents' },
        // { field: 'Section', header: 'Section' },
        // { field: 'Subsection', header: 'Sub Section' },
        { field: 'TPI', header: 'TPI' },
        { field: 'WTL', header: 'WTL' },
        { field: 'Comment', header: 'Comment' }
      ]
    }
    this.onRefresh = this.onRefresh.bind(this)
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this)
    this.renderSingleValueEditableTable = this.renderSingleValueEditableTable.bind(this)
    this.renderButtonMenu = this.renderButtonMenu.bind(this)
    this.changeVerison = this.changeVerison.bind(this)
    this.setPipeCommentSheet = this.setPipeCommentSheet.bind(this)
    this.setCoatingCommentSheet = this.setCoatingCommentSheet.bind(this)
    this.createNewVerison = this.createNewVerison.bind(this)
    this.renderSaveButton = this.renderSaveButton.bind(this)
    this.editable = this.editable.bind(this)
    this.generateDoc = this.generateDoc.bind(this)
    // // this.onDocIdClick = this.onDocIdClick.bind(this);
  }

  async getKeyValueData () {
    this.setState({ isLoading: true })

    const data = await axios.get(
			`${backendUrl}/dashboard/get_itp`, {
			  params: {
			    ProjectID: this.props.projectId
			  }
			}
    );
    const pipeData = get(data, 'data.data[0].Values.Pipe', [])
    const coatingData = get(data, 'data.data[0].Values.Coating', [])

    let keyValueData = cloneDeep(pipeData[0])
    
    const versionMenu = pipeData.map((data, index) => {
      return { name: `version ${index + 1}`, code: index }
    })
    this.setState({
      versionMenu: versionMenu,
      pipeData: pipeData,
      coatingData: coatingData,
      selectedVerison: { name: 'version 1', code: 0 }
    })
    this.setState({ keyValueData: keyValueData })
    if (this.state.pipeData.length === 1) {
      this.setState({
        editable: true
      })
    }
    this.setState({ isLoading: false })
    $('.pipeButton').addClass('active')
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
    let bckpData
    let saveEditedValue
    if (this.state.doc === 'PIPE') {
      bckpData = this.state.pipeData
      bckpData[bckpData.length - 1] = this.state.keyValueData
      saveEditedValue = await axios.post(
				`${backendUrl}/dashboard/update_itp`,
				{
				  ProjectID: this.props.projectId,
				  Values: {
				    Pipe: bckpData,
				    Coating: this.state.coatingData
				  }
				}
      )
    } else {
      bckpData = this.state.coatingData
      bckpData[bckpData.length - 1] = this.state.keyValueData
      saveEditedValue = await axios.post(
				`${backendUrl}/dashboard/update_itp`,
				{
				  ProjectID: this.props.projectId,
				  Values: {
				    Pipe: this.state.pipeData,
				    Coating: bckpData
				  }
				}
      )
    }
    this.setState({
      isLoading: false
    })
    if(this.state.doc === 'PIPE'){
      $('.pipeButton').addClass('active')
    } else {
      $('.coatingButton').addClass('active')
    }
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
    if (this.state.doc === 'PIPE') {
      const data = cloneDeep(this.state.pipeData[props.value.code])
      this.setState({
        keyValueData: data,
        selectedVerison: { name: `version ${props.value.code + 1}`, code: props.value.code }
      })
      if (props.value.code === this.state.pipeData.length - 1) {
        this.setState({
          editable: true
        })
      } else {
        this.setState({
          editable: false
        })
      }
    } else {
      const data = cloneDeep(this.state.coatingData[props.value.code])
      this.setState({
        keyValueData: data,
        selectedVerison: { name: `version ${props.value.code + 1}`, code: props.value.code }
      })
      if (props.value.code === this.state.coatingData.length - 1) {
        this.setState({
          editable: true
        })
      } else {
        this.setState({
          editable: false
        })
      }
    }
  }

  setPipeCommentSheet () {
    $('.pipeButton').addClass('active')
    $('.coatingButton').removeClass('active')
    const data = cloneDeep(this.state.pipeData[0])
    this.setState({
      keyValueData: data
    })
    const versionMenu = this.state.pipeData.map((data, index) => {
      return { name: `version ${index + 1}`, code: index }
    })
    this.setState({
      versionMenu: versionMenu,
      selectedVerison: { name: 'version 1', code: 0 },
      doc: 'PIPE'
    })
    if (this.state.pipeData.length === 1) {
      this.setState({
        editable: true
      })
    } else {
      this.setState({
        editable: false
      })
    }
  }

  setCoatingCommentSheet () {
    $('.coatingButton').addClass('active')
    $('.pipeButton').removeClass('active')
    const data = cloneDeep(this.state.coatingData[0])
    this.setState({
      keyValueData: data
    })
    const versionMenu = this.state.coatingData.map((data, index) => {
      return { name: `version ${index + 1}`, code: index }
    })
    this.setState({
      versionMenu: versionMenu,
      selectedVerison: { name: 'version 1', code: 0 },
      doc: 'COATING'
    })
    if (this.state.coatingData.length === 1) {
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
      const newPipeData = this.state.pipeData
      newPipeData[this.state.pipeData.length - 1] = this.state.keyValueData
      newPipeData.push(this.state.keyValueData)
      const newVersionMenu = this.state.versionMenu
      newVersionMenu.push({ name: `version ${newVersionMenu.length + 1}`, code: newVersionMenu.length })
      this.setState({
        pipeData: newPipeData,
        versionMenu: newVersionMenu
      })
    } else {
      const newCoatingData = this.state.coatingData
      newCoatingData[this.state.coatingData.length - 1] = this.state.keyValueData
      newCoatingData.push(this.state.keyValueData)
      const newVersionMenu = this.state.versionMenu
      newVersionMenu.push({ name: `version ${newVersionMenu.length + 1}`, code: newVersionMenu.length })
      this.setState({
        coatingData: newCoatingData,
        versionMenu: newVersionMenu
      })
    }
    this.onSave();
  }

  showForm () {
    this.setState({
      displayAcceptanceForm: true
    })
  }

  renderSaveButton () {
    if (this.state.doc === 'PIPE') {
      return this.state.pipeData.length === (this.state.selectedVerison.code + 1)
    } else {
      return this.state.coatingData.length === (this.state.selectedVerison.code + 1)
    }
  }

  renderButtonMenu () {
    return (
      <div className="row" style={{ paddingLeft: '35px', paddingRight: '35px' }}>
        <div className="col-4 justify-content-start">
          <div className="row justify-content-start">
            <div className="col-6">
              <Dropdown value={this.state.selectedVerison} options={this.state.versionMenu} onChange={this.changeVerison} placeholder="Select Verison" optionLabel="name" />
            </div>
          </div>
        </div>
        <div className="col-4 justify-content-center">
          <div className="row justify-content-center">
            <div className="col-12">
              <button type="button pad-left" onClick={this.setPipeCommentSheet} className="pipeButton">Pipe</button>
              <button type="button pad-left" onClick={this.setCoatingCommentSheet} className="coatingButton">Coating</button>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="row d-flex justify-content-end fright">
            <div className="col-12">
              { this.renderSaveButton() ? <button type="button pad-left" onClick={this.onSave} className="actionBtn btn-success">Save</button> : ''}
              { this.renderSaveButton() ? <button type="button pad-left" onClick={this.createNewVerison} className="actionBtn btn-primary">Create New Ver.</button> : ''}
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

  editable () {
    // if(this.state.doc === 'PIPE'){
    // 	this.state.selectedVerison === this.state.pipeData.length ? true : false;
    // } else {
    // 	this.state.selectedVerison === this.state.coatingData.length ? true : false;
    // }
    if (this.state.doc === 'PIPE') {
      return this.state.pipeData.length === (this.state.selectedVerison.code + 1)
    } else {
      return this.state.coatingData.length === (this.state.selectedVerison.code + 1)
    }
  }

  async generateDoc () {
    this.setState({
      isLoading: true
    })
    const generateDocRes = await axios.post(
			`${backendUrl}/dashboard/itpdoc_download`,
			{
			  itpjson: this.state.keyValueData,
			  file_type: this.state.doc,
			  version: this.state.selectedVerison.code,
			  project_id: this.props.projectId
			}
    )
    this.setState({
      isLoading: false
    })
    if(generateDocRes.data.status === 'error'){
      this.growl.show({severity: 'error', summary: 'Failure', detail: 'Some Issue occured while creating you document.'});
    } else {
      this.growl.show({severity: 'success', summary: 'Success', detail: 'Document created successfully.'});
    }
    if(this.state.doc === 'PIPE'){
      $('.pipeButton').addClass('active')
    } else {
      $('.coatingButton').addClass('active')
    }
  }

  rowExpansionTemplate(data) {
    if(data.AcceptanceCriteriaTable === undefined || data.AcceptanceCriteriaTable.length === 0) {
      return;
    }
    // const accCriTable = JSON.parse(get(data, 'AcceptanceCriteriaTable', []));
    const columnList = Object.keys(data.AcceptanceCriteriaTable[0]).map(key => {
      return {
        field: key,
        header: key
      }
    });
    
    return (
      data.AcceptanceCriteriaTable && (
          <div>
            <TableComponent1
              colList={columnList}
              dataList={data.AcceptanceCriteriaTable}
              editable={true}
              acceptButton={false}
              rejectButton={false}
              actionItemNotNeeded={true}
              notResizeable={true}
              deleteEnabled={true}
              style={{
                width: '1000px'
              }}
            />
          </div>
        )
      )
  };

  render () {
    let view = <div></div>
    // for stubbed data only
    view = this.renderButtonMenu()

    return !this.state.isLoading ? (
      <div className="container-fluid">
        <Growl style={{
          marginTop: '15vh'
        }} ref={(el) => (this.growl = el)} />
        {view}
        <hr style={{ marginTop: '10px', marginBottom: '0px' }}/>
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
          rowExpansionTemplate={this.rowExpansionTemplate}
          broadColumns={['Acceptance Criteria API', "Acceptance Criteria Extracted"]}
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
export default connect(mapStateToProps)(ITP)
