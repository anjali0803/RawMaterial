import React from 'react'
import './index.css'
import ProjectsTable from '../ProjectsTable/ProjectsTable'
import { setDocumentArray, setProjectId, setProjectCustomer, setProjectTitle, setProjectType } from '../../actions/dataActions'
import { connect } from 'react-redux'
import { createHashHistory } from 'history'
import Axios from 'axios'
import {Dropdown} from 'primereact/dropdown';
import {Calendar} from 'primereact/calendar';
import LoadingScreen from './LoadingScreen/loadingScreen'
import { backendUrl } from '../../constant'

const history = createHashHistory()

export class GenerateNewProjects extends React.Component {
  constructor () {
    super()
    this.state = {
      toDate: '',
      fromDate: '',
      isLoading: true,
      tableData: [
      ],
      selectedDateType: 'AD',
      dateOptions: [
        {label: 'Assigned Date', value: 'AD'},
        {label: 'Due Date', value: 'DD'},
        {label: 'Submit Date', value: 'SD'}
      ],
      tableColList: [
        { field: 'ProjectID', header: 'Project Id' },
        { field: 'Title', header: 'Title' },
        { field: 'Client', header: 'Customer' },
        { field: 'ProjectType', header: 'Type' },
        { field: 'AssignedOn', header: 'Assigned Date' },
        { field: 'ProjectStatus', header: 'Status' },
        { field: 'CreatedBy', header: 'Created By' }
      ]
    }

    this.onProjectIdClick = this.onProjectIdClick.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.filterProjects = this.filterProjects.bind(this)
    this.handleFromDate = this.handleFromDate.bind(this)
    this.handleToDate = this.handleToDate.bind(this)
    this.getTableData = this.getTableData.bind(this)
  }

  async getTableData () {
    this.setState({ isLoading: true })
    const res = await Axios.get(`${backendUrl}/dashboard/all_project`)
    const data = res.data
    this.setState({ tableData: data.data })
    this.setState({ isLoading: false })
  }

  componentDidMount () {
    this.getTableData()
  }

  onRefresh () {
    this.getTableData()
  }

  handleToDate (e) {
    this.setState({ toDate: e.target.value })
  }

  handleFromDate (e) {
    this.setState({ fromDate: e.target.value })
  }

  onProjectIdClick (rowData) {
    // refresh the document array and project id
    const { Type, Title, Customer, ProjectID } = rowData
    // sconsole.log({ Type, Title, Customer, ProjectID })
    this.props.setProjectId(ProjectID)
    this.props.setProjectCustomer(Customer)
    this.props.setProjectType(Type)
    this.props.setProjectTitle(Title)
    this.props.setDocumentArray(['', '', '', '', ''])
    history.push('/Inquiry/create-new-projects/details')
  }

  filterProjects(){
    console.log(this.state)
    let dateFrom = this.state.fromDate;
    let dateTo = this.state.toDate;
    
    const obj = {
      AD: 'AssignedOn',
      DD: 'DueDate',
      SD: 'SubmittedOn'
    }
    
    const filterList = this.state.tableData.filter(project => {
      if(project[obj[this.state.selectedDateType]]){
        let dateCheck = project[obj[this.state.selectedDateType]].substr(0, 10)
        let c = dateCheck.split("/")
        let check = new Date(c[2], parseInt(c[0]) - 1, c[1]);
    
        return (check >= dateFrom && check <= dateTo)
      }
      return false
    });
    
    this.setState({
      tableData: filterList,
      toDate: '',
      fromDate: ''
    })
  }

  render () {
    return this.state.isLoading === false ? (
      <div>
        <div className="advanceOptions">
          <div className="row">
            <h3 className="advanceSearchHeading">Advance Search Options</h3>
            <hr />
            <div className="col-12">
                <Dropdown value={this.state.selectedDateType} options={this.state.dateOptions} onChange={e => this.setState({selectedDateType: e.value})} style={{width: '12em', marginRight: '10px'}}/>
                <label>
                  From:
                </label>
                <Calendar value={this.state.fromDate} onChange={(e) => this.setState({fromDate: e.value})} style={{
                  marginLeft: '10px',
                  marginRight: '20px'
                }}></Calendar>
                {/* <input className="filterBox" onChange={this.handleFromDate} type="date" /> */}
                <label>
                  To:
                </label>
                <Calendar value={this.state.toDate} onChange={(e) => this.setState({toDate: e.value})} style={{
                  marginLeft: '10px',
                  marginRight: '20px'
                }}></Calendar>
                {/* <input className="filterBox" onChange={this.handleToDate} type="date" /> */}
                  
              <button type="button" onClick={this.filterProjects} class="btn btn-primary">Search</button>
              <button type="button" style={{ marginLeft: '10px'}} onClick={this.getTableData} class="btn btn-primary">Reset Table</button>
            </div>
          </div>
        </div>
        <ProjectsTable
          colList={this.state.tableColList}
          dataList={this.state.tableData}
          onProjectIdClick={this.onProjectIdClick}
          onRefresh={this.onRefresh}
        />
      </div>
    ) : (
      <LoadingScreen />
    )
  }
}

const mapStateToProps = state => ({
  dataList: state.dataList,
  colList: state.colList,
  projectId: state.projectId,
  projectType: state.projectType,
  projectTitle: state.projectTitle,
  projectCustomer: state.projectId
})
const mapDispatchToProps = dispatch => ({
  setProjectId: (projectId) => dispatch(setProjectId(projectId)),
  setProjectType: (projectTitle) => dispatch(setProjectTitle(projectTitle)),
  setProjectCustomer: (projectCustomer) => dispatch(setProjectCustomer(projectCustomer)),
  setProjectTitle: (projectTitle) => dispatch(setProjectTitle(projectTitle)),
  setDocumentArray: (documentArray) => dispatch(setDocumentArray(documentArray))
})
export default connect(
  mapStateToProps, mapDispatchToProps
)(GenerateNewProjects)
