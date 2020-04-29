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
import {Growl} from 'primereact/growl';
import { backendUrl } from '../../../../../constant'
import LoadingScreen from '../../../LoadingScreen/loadingScreen'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
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
class CommentSheet extends React.Component {
  constructor (props) {
    super(props)
    if (props.projectId === '') { history.push('/Inquiry/create-new-projects/details') }

    // if (props.documentArray[props.screenNumber - 1] === '')
    //     history.push(`/Inquiry/create-new-projects/${pageMapIndex[props.screenNumber - 1]}`)

    this.pipeWDOptions = [
      'Steel Coils',
      'Coil Width',
      'Chemical Composition',
      'Tensile Test',
      'Mill Control Tensile Test',
      'Coil Slitting',
      'Edge Milling',
      'pipe Forming',
      'Welding',
      'Seam Annealing',
      'On Line UT',
      'Hydrostatic Test',
      'Beveling',
      'UT Calibration',
      'Weld Seam Ultrasonic Testing',
      'Manual Ultrasonic Testing',
      'Residual Magnetism',
      'Visual Inspection',
      'Dents',
      'Radial Offset of Edges',
      'Trim Of OD Weld Flash',
      'Cracks',
      'Leaks & Sweats',
      'Hard Spots',
      'Arc Burns',
      'Laminations',
      'Geometric Deviations',
      'Grinding',
      'Other Defects',
      'Wall Thickness',
      'pipe Length',
      'Straightness',
      'Inside Diameter at the Pipe End over a Length',
      'Outside  Diameter at the pipe End',
      'Outside Diameter at pipe Body',
      'Out Of Roundness at pipe Ends',
      'Out Of Roundness on pipe Body',
      'Weight',
      'Bevel Angle & Root Face',
      'End Squareness',
      'Test Report & Certification of pipes',
      'Chemical Analysis',
      'Transverse Tensile Test (Base Metal)',
      'Transverse Tensile Test (Weld Metal)',
      'Flattening Test',
      'Charpy Impact Testing (Base Metal and pWHT)',
      'Drop Weight Tear Test',
      'Hardness Tests',
      'Metallographic Testing',
      'All testing in section B above',
      'Reverse Bend Test',
      'MPQT',
      'Pipe PWHT',
      'Surface Quality',
      'CVN Impact Testing',
      'Macro section Examination',
      'Strained and aged test',
      'Charpy V-notch Transition Curve',
      'DWTT',
      'Metallography',
      'Charpy Impact Testing (Weld)',
      'Charpy Impact Test(Pipe Body, PWHT HAZ)',
      'Transverse CVN TestTransition Curve(base, PWHT HAZ)',
      'DWTT TestTransition Curve',
      'Transverse CVN transition curves for pipe bodyand weld bond line',
      'Cross section macro specimen of the weld zone',
      'Statistical Analysis'
    ];
    this.coatingWDOptions = [
      'Review of Raw material manufacturer test certificate',
      'Epoxy Gel time Shelf life Storage Mfg test certificate',
      'CD test',
      'Flexibility Test',
      'Adhesion Test',
      'Gel Time',
      'Abrasive Contamination test percent fineness Conductivity',
      'Visual inspection of bare pipe surface',
      'Recording of pipe no., heat no., dia. And wall thickness',
      'Pipe temp, relative humidity and preheating',
      'Salt contamination',
      'Degree of cleanliness',
      'Surface profile (peak to valley)',
      'Inspection after blasting',
      'Blow out after blasting',
      'Phosphoric acid',
      'Conductivity of rinse water',
      'Concentration',
      'Pipe temp before phosphoric acid application and dwell time',
      'Rinse water pressure',
      'Pipe pH after rinsing',
      'Pipe temp after pre heating before FBE',
      'Time to quench & Curing',
      'Batch no. of epoxy powder',
      'Coating thickness For FBE Coating',
      'Coating thickness For ARO Coating',
      'Holiday inspection',
      'Residual Magnetism',
      'CD test',
      'Flexibility Test',
      'Adhesion Test',
      'Thermal characteristics',
      'Cross section porosity',
      'Interface Contamination',
      'Interface porosity',
      'Impact Resistance',
      'Cut-back and visual appearance check',
      'Coating repair',
      'Pipe repairs',
      'Separators -Coated pipe handling and storage',
      'Thickness gauge',
      'Holiday detector',
      'Portable holiday detector',
      'Portable holiday detector',
      'Rinse water solids content',
      'Virgin powder application',
      'Holiday Inspection Travel Speed',
      'Dew Point of Compressed Air',
      'Codification of pipes after holiday',
      'Contact thermometer',
      'Cathodic disbondment power supply'
    ];

    this.onSave = this.onSave.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.state = {
      x: 0,
      isLoading: false,
      documentId: props.documentId,
      checked1: true,
      versionMenu: [],
      pipeData: [],
      coatingData: [],
      doc: 'PIPE',
      selectedVerison: 0,
      editable: false,
      wdOptions: [],
      keyValueColumnList: [
        { field: 'Sn', header: 'SR' },
        { field: 'ReferenceStandard', header: 'Client Spec Number' },
        { field: 'ClientRequirement', header: 'Client Requirements' },
        { field: 'Proposal', header: 'Proposal' },
        { field: 'CostImpact', header: 'Cost Impact' },
        { field: 'Status', header: 'Status' },
        { field: 'ClientReply', header: 'Client Reply' },
        { field: 'WelspunComments1', header: 'Welspun Comments 1' },
        { field: 'ClientReply1', header: 'Client Reply 1' },
        { field: 'WelspunComments2', header: 'Welspun Comments 2' },
        { field: 'Conclusion', header: 'Conclusion' },
        { field: 'WorkDescription', header: 'Work Description' },
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
    this.scrollLeft= this.scrollLeft.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
    // // this.onDocIdClick = this.onDocIdClick.bind(this);
  }

  async getKeyValueData () {
    this.setState({ isLoading: true })

    let data = await axios.get(
			`${backendUrl}/dashboard/get_comment_sheet`, {
			  params: {
			    ProjectID: this.props.projectId
			  }
			}
    )
    const pipeData = get(data, 'data.data[0].Values.Pipe', [])
    const coatingData = get(data, 'data.data[0].Values.Coating', [])
    data = cloneDeep(pipeData[0])
    const versionMenu = pipeData.map((data, index) => {
      return { name: `version ${index + 1}`, code: index }
    })
    this.setState({
      versionMenu: versionMenu,
      pipeData: pipeData,
      coatingData: coatingData,
      selectedVerison: { name: 'version 1', code: 0 },
      wdOptions: this.pipeWDOptions
    })
    this.setState({ keyValueData: data })
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

  async onSave (newVersion) {
    this.setState({
      isLoading: true
    })
    let bckpData
    let saveEditedValue
    if (this.state.doc === 'PIPE') {
      bckpData = this.state.pipeData
      bckpData[bckpData.length - 1] = this.state.keyValueData
      saveEditedValue = await axios.post(
				`${backendUrl}/dashboard/update_comment_sheet`,
				{
				  ProjectID: this.props.projectId,
				  Values: {
				    Pipe: bckpData,
				    Coating: this.state.coatingData
				  }
				}
      ).then( res => {
        this.setState({
          isLoading: false
        })
        if(newVersion === true){
          this.growl.show([
            {severity: 'success', summary: 'Success', detail: `new ${this.state.doc} version created.`},
            {severity: 'success', summary: 'Success', detail: `${this.state.doc} data saved.`}]);
        } else {
          this.growl.show({severity: 'success', summary: 'Success', detail: `${this.state.doc} data saved.`});
        }
      }).catch(err => {
        this.setState({
          isLoading: false
        })
        this.growl.show({ sticky: 'true', severity: 'error', summary: `${err.response.data.code}`, detail: `There is some issue occured while saving the ${this.state.doc} data.`});
      })
    } else {
      bckpData = this.state.coatingData
      bckpData[bckpData.length - 1] = this.state.keyValueData
      saveEditedValue = await axios.post(
				`${backendUrl}/dashboard/update_comment_sheet`,
				{
				  ProjectID: this.props.projectId,
				  Values: {
				    Pipe: this.state.pipeData,
				    Coating: bckpData
				  }
				}
      ).then( res => {
        this.setState({
          isLoading: false
        })
        if(newVersion === true){
          this.growl.show([
            {severity: 'success', summary: 'Success', detail: `new ${this.state.doc} version created.`},
            {severity: 'success', summary: 'Success', detail: `${this.state.doc} data saved.`}]);
        } else {
          this.growl.show({severity: 'success', summary: 'Success', detail: `${this.state.doc} data saved.`});
        }
      }).catch(err => {
        this.setState({
          isLoading: false
        })
        this.growl.show({ sticky: 'true', severity: 'error', summary: `${err.response.data.code}`, detail: `There is some issue occured while saving the ${this.state.doc} data.`});
      })
    }
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
      wdOptions: this.pipeWDOptions,
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
      wdOptions: this.coatingWDOptions,
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
              <button type="button pad-left" onClick={this.generateDoc} style={{top: '3px',
    position: 'relative'}}  className="actionBtn btn-dark">
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
			`${backendUrl}/dashboard/commentsheetdoc_download`,
			{
			  itpjson: this.state.keyValueData,
			  file_type: this.state.doc,
			  version: this.state.selectedVerison.code + 1,
			  project_id: this.props.projectId
			}
    ).then( res => {
      this.setState({
        isLoading: false
      })
      this.growl.show({severity: 'success', summary: 'Success', detail: 'Document created successfully.'});
    }).catch(err => {
      this.setState({
        isLoading: false
      })
      this.growl.show({severity: 'error', summary: 'Failure', detail: 'Some Issue occured while creating you document.'});
    })

    if(this.state.doc === 'PIPE'){
      $('.pipeButton').addClass('active')
    } else {
      $('.coatingButton').addClass('active')
    }
  }

  scrollLeft(){
    const target = $("#app > div > div.home-container > div.view-container > div > div.subscreens > div > div.tableContainer > div.p-datatable.p-component.p-datatable-resizable.p-datatable-resizable-fit.p-datatable-scrollable.p-datatable-auto-layout > div.p-datatable-scrollable-wrapper > div > div.p-datatable-scrollable-body");
    target.animate({
      scrollLeft: this.state.x - 300
    })
    if( this.state.x > 0){
      this.setState({
        x: this.state.x - 300
      })
    }
  }

  scrollRight(){
    const target = $("#app > div > div.home-container > div.view-container > div > div.subscreens > div > div.tableContainer > div.p-datatable.p-component.p-datatable-resizable.p-datatable-resizable-fit.p-datatable-scrollable.p-datatable-auto-layout > div.p-datatable-scrollable-wrapper > div > div.p-datatable-scrollable-body");
    target.animate({
      scrollLeft: this.state.x + 300
    })
    if(this.state.x < 1980 ){
      this.setState({
        x: this.state.x + 300
      })
    }
  }

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
          projectId={this.props.projectId}
          colList={this.state.keyValueColumnList}
          dataList={this.state.keyValueData}
          documentFiletype={this.state.doc}
          rowClassName={this.rowClassName}
          onRefresh={this.onRefresh}
          actionsLabel={this.state.actions}
          handleClickAllSelected={this.handleClickAllSelected}
          editable={this.state.editable}
          acceptButton={true}
          rejectButton={true}
          saveCommentSheet={this.onSave}
          wdOptions={this.state.wdOptions}
          broadColumns={['Client Requirements', 'Proposal']}
        />
        <div className="scroll-left-button" onClick={this.scrollLeft}>
          <span class="material-icons">
            navigate_before
          </span>
        </div>

        <div className="scroll-right-button" onClick={this.scrollRight}>
          <span class="material-icons">
            navigate_next
          </span>
        </div>
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
export default connect(mapStateToProps)(CommentSheet)
