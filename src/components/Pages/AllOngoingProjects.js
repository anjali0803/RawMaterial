import React from 'react'
import ProjectsTable from '../ProjectsTable/ProjectsTable'
import LoadingScreen from './LoadingScreen/loadingScreen'
import './index.css'
import { setDocumentArray, setProjectId, setProjectCustomer, setProjectTitle, setProjectType, setAssignedUser, setDueDate } from '../../actions/dataActions'
import { connect } from 'react-redux'
import { createHashHistory } from 'history'
import Axios from 'axios'
import { backendUrl } from '../../constant'
const history = createHashHistory()

class AllOngoingProjects extends React.Component {
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
        { field: 'ProjectStatus', header: 'Status' },
        { field: 'CreatedBy', header: 'Created By' }
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
      return project.SubmittedOn ? false : true
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
    const { ProjectType, Title, Client, ProjectID, AssignedTo, DueDate } = rowData
    // sconsole.log({ Type, Title, Customer, ProjectID })
    this.props.setProjectId(ProjectID)
    this.props.setProjectCustomer(Client)
    this.props.setProjectType(ProjectType)
    this.props.setProjectTitle(Title)
    this.props.setDocumentArray(['', '', '', '', ''])
    this.props.setAssignedUser(AssignedTo)
    this.props.setDueDate(DueDate)
    history.push('/Inquiry/create-new-projects/details')
  }

  render () {
    // console.log(typeof this.props.dataList)
    return this.state.isLoading === false ? (
      <div>
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
  projectList: state.projectList,
  projectTableColList: state.projectTableColList,
  projectId: state.projectId,
  projectType: state.projectType,
  projectTitle: state.projectTitle,
  projectCustomer: state.projectId
})
const mapDispatchToProps = dispatch => ({
  setProjectId: (projectId) => dispatch(setProjectId(projectId)),
  setProjectType: (projectTitle) => dispatch(setProjectType(projectTitle)),
  setProjectCustomer: (projectCustomer) => dispatch(setProjectCustomer(projectCustomer)),
  setProjectTitle: (projectTitle) => dispatch(setProjectTitle(projectTitle)),
  setDocumentArray: (documentArray) => dispatch(setDocumentArray(documentArray)),
  setAssignedUser: (user) => dispatch(setAssignedUser(user)),
  setDueDate: (date) => dispatch(setDueDate(date))
})
export default connect(
  mapStateToProps, mapDispatchToProps
)(AllOngoingProjects)
