// import React from 'react'
// import { Container, Row, Col, Card, CardTitle, CardBody, CardFooter, Progress } from 'reactstrap'

// export default class Intermediate extends React.Component{
//     render(){
//         return <Container fluid = {true}>
//             Intermediate
//         </Container>
//     }
// }
// import React from 'react'
// import { Container, Row, Col, Card, CardTitle, CardBody, CardFooter, Progress } from 'reactstrap'

// export default class Product extends React.Component{
//     render(){
//         return <Container fluid = {true}>
//             Product
//         </Container>
//     }
// }


import React from 'react'
import './index.css'
import DocumentHeader from '../DocumentHeader/DocumentHeader'
import ButtonHeader from '../ButtonHeader/ButtonHeader'
import { createHashHistory } from 'history'
import { connect } from 'react-redux'
import TableComponent from '../Table/TableComponent2'
import {default as TableComponent1} from '../Table/TableComponent'
import CostSheetTableComponent from '../Table/CostSheetTableComponent'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { backendUrl } from '../../constant'
import LoadingScreen from '../Pages/LoadingScreen/loadingScreen'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
import {Growl} from 'primereact/growl';
import { ToggleButton } from 'primereact/togglebutton'
import { Button } from 'primereact/button'
import { cloneDeep, get } from 'lodash-es'
import {SplitButton} from 'primereact/splitbutton';
const history = createHashHistory()
const pageMapIndex = [
  'input-key-value',
  'recommendations',
  'acceptance',
  'output-key-value',
  'output-document'
]
class Intermediate extends React.Component {
  constructor (props) {
    super(props)
    // if (props.projectId === '') { history.push('/Inquiry/create-new-projects/details') }

    // if (props.documentArray[props.screenNumber - 1] === '')
    //     history.push(`/Inquiry/create-new-projects/${pageMapIndex[props.screenNumber - 1]}`)

    this.onSave = this.onSave.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.items = [
        {
            label: 'csv',
            command: () => {
                this.growl.show({severity:'success', summary:'csv', detail:'Data in csv'});
            }
        },
        {
            label: 'json',
            command: () => {
                this.growl.show({ severity: 'success', summary: 'json', detail: 'Data in json' });
            }
        },
        ];

    
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
      displayAcceptanceForm: false,
      editable: false,
      keyValueColumnList: [],
      keyValueColumnList1: [
        { field: 'WorkDescription', header: 'Work Description' },
        { field: 'ReferenceStandardAPI', header: 'Reference Standard API/CSA' },
        { field: 'ReferenceStandardExtracted', header: 'Reference Standard Extracted' },
        { field: 'TestingFrequencyAPI', header: 'Testing Frequency' },
        { field: 'AcceptanceCriteriaAPI', header: 'Acceptance Criteria API/CSA' },
        { field: 'AcceptanceCriteriaExtracted', header: 'Acceptance Criteria Extracted' },
        // { field: 'AcceptanceCriteriaTable', header: 'Acceptance Criteria Table' },
        { field: 'Documents', header: 'Documents' },
        // { field: 'Section', header: 'Section' },
        // { field: 'Subsection', header: 'Sub Section' },
        { field: 'TPI', header: 'TPI' },
        { field: 'WTL', header: 'WTL' },
        { field: 'Comment', header: 'Comment' }
      ],
      keyValueColumnList2: [
        { field: 'id', header: 'id' },
        { field: 'name', header: 'name' }
      ],

    }
    this.onRefresh = this.onRefresh.bind(this)
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this)
    this.renderSingleValueEditableTable = this.renderSingleValueEditableTable.bind(this)
    this.renderButtonMenu = this.renderButtonMenu.bind(this)
    this.renderSaveButton = this.renderSaveButton.bind(this)
    this.editable = this.editable.bind(this)
    this.generateDoc = this.generateDoc.bind(this)
    this.scrollLeft= this.scrollLeft.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
    // this.onDocIdClick = this.onDocIdClick.bind(this);
    this.export = this.export.bind(this);
  }

  async getKeyValueData () {
    this.setState({ isLoading: true })

    const data = await axios.get(
			`http://rmp-product-lb-756577841.us-east-1.elb.amazonaws.com/intermediary/allintermediary`
    ).then(res  =>{
      const content = get(res, 'data.data.content', [])
      this.setState({
        isLoading: false,
        keyValueData: content
      })
    })

    // const pipeData = get(data, 'data.data[0].Values.Pipe', [])

        this.setState({
           keyValueColumnList: this.state.keyValueColumnList2,
    })
    
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
				`${backendUrl}/dashboard/update_itp`,
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
				`${backendUrl}/dashboard/update_itp`,
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


  export() {
    this.growl.show({severity: 'success', summary: 'export', detail: 'Data exported'});
    }
  renderButtonMenu () {
    return (
      <div className="row" style={{ paddingLeft: '30px', paddingRight: '30px', justifyContent: 'flex-end' }}>
              {/* <button type="button pad-left" className="import-btn">Import</button> */}
              {/* <button type="button pad-left" className="export-btn">Export</button> */}
              <Button label="import" className="import-btn"/>
              <Growl ref={(el) => this.growl = el}></Growl>
              <SplitButton label="export" className="export-btn" onClick={this.export} model={this.items}></SplitButton>
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

  rowExpansionTemplate(data) {
    // console.log(data)
    const d = data.value;
    const clmList = [
      { field: 'element', header: 'Key'},
      { field: 'percentage', header: 'Value'}
    ];
    let keyValueData = [];
    const keys = Object.keys(d);
    keys.map(element => {
      keyValueData.push(
        {element: element,
        percentage: d[element]}
      )
    });

    return (
      <TableComponent1
        colList={clmList}
        dataList={keyValueData}
        rowClassName={this.rowClassName}
        onRefresh={this.onRefresh}
        actionsLabel={[]}
        handleClickAllSelected={this.handleClickAllSelected}
        editable={false}
      />
      )
  };

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
export default connect(mapStateToProps)(Intermediate)
