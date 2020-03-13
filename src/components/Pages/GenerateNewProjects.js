import React from 'react'
import './index.css'
import ProjectsTable from '../ProjectsTable/ProjectsTable'
import { setDocumentArray, setProjectId, setProjectCustomer, setProjectTitle, setProjectType } from '../../actions/dataActions'
import { connect } from 'react-redux'
import { createHashHistory } from 'history'
import Axios from 'axios'
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
    
    
    
    let d1 = dateFrom.split("-");
    let d2 = dateTo.split("-");
    let from = new Date(d1[0], parseInt(d1[1] - 1), d1[2]);  // -1 because months are from 0 to 11
    let to   = new Date(d2[0], parseInt(d2[1] - 1), d2[2]);
    
    const filterList = this.state.tableData.filter(project => {
      let dateCheck = project.AssignedOn.substr(0, 10)
      let c = dateCheck.split("/")
      let check = new Date(c[2], parseInt(c[0]) - 1, c[1]);
  
      return (check > from && check < to)
    });
    
    this.setState({
      tableData: filterList,
      toDate: '',
      fromDate: ''
    })
  }

  render () {
    // console.log(typeof this.props.dataList)
    return this.state.isLoading === false ? (
      <div>
        <div className="container advanceOptions">
          <div className="row">
            <h3 className="advanceSearchHeading">Advance Search Options</h3>
            <hr />
            <div className="col-12">

                <label>
                  Assigned from:
                </label>
                <input className="filterBox" onChange={this.handleFromDate} type="date" />
                <label>
                  Assigned to:
                </label>
                <input className="filterBox" onChange={this.handleToDate} type="date" />
                  
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
