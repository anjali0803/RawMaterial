import React from 'react'
import ProjectsTable from '../ProjectsTable/ProjectsTable'
import './index.css'
import { setDocumentArray, setProjectId, setProjectCustomer, setProjectTitle, setProjectType,setAssignedUser, setDueDate } from '../../actions/dataActions'
import { connect } from 'react-redux'
import { createHashHistory } from 'history'
import Axios from 'axios'
import LoadingScreen from './LoadingScreen/loadingScreen'
import { backendUrl } from '../../constant'

const history = createHashHistory()

class CancelledProjects extends React.Component {
  constructor () {
    super()
    this.state = {
      isLoading: true,
      tableData: [
      ],
      tableColList: [
        { field: 'ProjectID', header: 'Project Id' },
        { field: 'Title', header: 'Project Name' },
        { field: 'Client', header: 'Customer' },
        { field: 'ProjectType', header: 'Type' },
        { field: 'AssignedOn', header: 'Assigned Date' },
        { field: 'ProjectStatus', header: 'Status' }
      ]
    }

    this.onProjectIdClick = this.onProjectIdClick.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
  }

  async getTableData () {
    this.setState({ isLoading: true })
    const res = await Axios.get(`${backendUrl}/dashboard/all_project`)
    const data = res.data
    this.setState({ tableData: data.data.filter(project => {
      return project.ProjectStatus === 'Cancelled' ? true : false
    }) })
    this.setState({ isLoading: false })
  }

  componentDidMount () {
    this.getTableData()
  }

  onRefresh () {
    this.getTableData()
  }

  onProjectIdClick (rowData) {
    // refresh the document array and project id
    const { Type, Title, Customer, ProjectID, AssignedTo, DueDate } = rowData
    // sconsole.log({ Type, Title, Customer, ProjectID })
    this.props.setProjectId(ProjectID)
    this.props.setProjectCustomer(Customer)
    this.props.setProjectType(Type)
    this.props.setProjectTitle(Title)
    this.props.setDocumentArray(['', '', '', '', ''])
    this.props.setAssignedUser(AssignedTo)
    this.props.setDueDate(DueDate)
    history.push('/Inquiry/create-new-projects/details')
  }

  render () {
    // console.log(typeof this.props.dataList)
    const sortedList = this.state.tableData.sort((a,b) => new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime());
    
    return this.state.isLoading === false ? (
      <div>
        <ProjectsTable
          colList={this.state.tableColList}
          dataList={sortedList}
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
  setDocumentArray: (documentArray) => dispatch(setDocumentArray(documentArray)),
  setAssignedUser: (user) => dispatch(setAssignedUser(user)),
  setDueDate: (date) => dispatch(setDueDate(date))
})
export default connect(
  mapStateToProps, mapDispatchToProps
)(CancelledProjects)
