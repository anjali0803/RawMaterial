import React from 'react'
import ProjectsTable from '../ProjectsTable/ProjectsTable'
import './index.css'
import { setDocumentArray, setProjectId, setProjectCustomer, setProjectTitle, setProjectType, setAssignedUser, setDueDate } from '../../actions/dataActions'
import { connect } from 'react-redux'
import { createHashHistory } from 'history'
import Axios from 'axios'
import { backendUrl } from '../../constant'
import LoadingScreen from './LoadingScreen/loadingScreen'
const history = createHashHistory()

class ProjectAssignedToMe extends React.Component {
  constructor (props) {
    super(props)
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
    const res = await Axios.get(`${backendUrl}/dashboard/myproject`, {
      params: {
        username: this.props.userName
      }
    })
    const data = res.data.data
    this.setState({ tableData: data })
    this.setState({ isLoading: false })
  }

  componentDidMount () {
    this.getTableData()
  }

  onProjectIdClick (rowData) {
    const { ProjectType, Title, Client, ProjectID, AssignedTo, DueDate } = rowData
    // sconsole.log({ Type, Title, Customer, ProjectID })
    this.props.setProjectId(ProjectID)
    this.props.setProjectCustomer(Client)
    this.props.setProjectType(ProjectType)
    this.props.setProjectTitle(Title)
    this.props.setAssignedUser(AssignedTo)
    this.props.setDueDate(DueDate)
    history.push('/Inquiry/create-new-projects/details')
  }

  onRefresh () {
    this.getTableData()
  }

  render () {
    // console.log(typeof this.props.dataList)
    const assignedToMeList = this.state.tableData.filter((element) => {
      if (element.AssignedTo === this.props.userName) { return element }
    });
    
    const sortedAssigedToMeList = assignedToMeList.sort((a,b) => new Date(b.CreatedOn).getTime() - new Date(a.CreatedOn).getTime());
    return this.state.isLoading === false ? (
      <div>
        <ProjectsTable
          colList={this.state.tableColList.filter(element => {
            if (element.field != 'AssignedTo') {
              return element
            }
          })}

          dataList={sortedAssigedToMeList}

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
  userName: state.userName,
  projectList: state.projectList,
  projectTableColList: state.projectTableColList,
  projectId: state.projectId,
  projectType: state.projectType,
  projectTitle: state.projectTitle,
  projectCustomer: state.projectId
})
const mapDispatchToProps = dispatch => ({
  setProjectId: (projectId) => dispatch(setProjectId(projectId)),
  setProjectType: (projectType) => dispatch(setProjectType(projectType)),
  setProjectCustomer: (projectCustomer) => dispatch(setProjectCustomer(projectCustomer)),
  setProjectTitle: (projectTitle) => dispatch(setProjectTitle(projectTitle)),
  setDocumentArray: (documentArray) => dispatch(setDocumentArray(documentArray)),
  setAssignedUser: (user) => dispatch(setAssignedUser(user)),
  setDueDate: (date) => dispatch(setDueDate(date))
})
export default connect(
  mapStateToProps, mapDispatchToProps
)(ProjectAssignedToMe)
