import React from 'react'
import { createHashHistory } from 'history'
import { connect } from 'react-redux'
import { setDocumentArray } from '../../../actions/dataActions'
import './index.css'
import TableComponent from '../../Table/TableComponent'
import {Growl} from 'primereact/growl';
import ButtonHeader from '../../ButtonHeader/ButtonHeader'
import LoadingScreen from '../LoadingScreen/loadingScreen'
import Axios from 'axios'
import { backendUrl } from '../../../../src/constant'
import { padEnd } from 'lodash-es'
const history = createHashHistory()

class OutputDocument extends React.Component {
  constructor (props) {
    super(props)
    if (props.projectId === '') {
        history.push('/Inquiry/create-new-projects/details')
    }
    this.state = {
      isLoading: false,
      saveEnabled: true,
      deleteEnabled: true,
      msg: '',
      tableData: [],
      tableColList: [
        { field: 'fileType', header: 'File Type' },
        { field: 'downloadLink', header: 'Download Button' }
      ],
      showSubmitButton: false
    }
    this.onDocIdClick = this.onDocIdClick.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.createDocumentVersionList = this.createDocumentVersionList.bind(this)
    this.submitProject = this.submitProject.bind(this)
    this.cancelProject = this.cancelProject.bind(this)
  }

  async getTableData () {
    this.setState({ isLoading: true })
    let data = await Axios.get(`${backendUrl}/dashboard/project`,
      {
        params: {
          projectid: this.props.projectId
        }
      })
    data = data.data.data
    const obj = [
      {
        fileType: 'Cost Sheet',
        downloadLink: <a href={data[0].CostSheet} className="downloadButton">Download</a>
      },

      {
        fileType: 'Client SpecPipe',
        downloadLink: <a href={data[0].ClientSpecPipe} className="downloadButton">Download</a>
      },
      {
        fileType: 'Client Spec Inner Coating',
        downloadLink: <a href={data[0].ClientSpecInnerCoating} className="downloadButton">Download</a>
      },
      {
        fileType: 'Client Spec Outer Coating',
        downloadLink: <a href={data[0].ClientSpecOuterCoating} className="downloadButton">Download</a>
      }
    ]
    if (data[0].CommentSheetCoating !== 'Not Available Yet') {
      obj.push({
        fileType: 'Comment Sheet Coating',
        downloadLink: this.createDocumentVersionList(data[0].CommentSheetCoating)
      })
    }
    if (data[0].CommentSheetPipe !== 'Not Available Yet') {
      obj.push({
        fileType: 'Comment Sheet Pipe',
        downloadLink: this.createDocumentVersionList(data[0].CommentSheetPipe)
      })
    } if (data[0].ITPCoating !== 'Not Available Yet') {
      obj.push({
        fileType: 'ITP Coating',
        downloadLink: this.createDocumentVersionList(data[0].ITPCoating)
      })
    } if (data[0].ITPPipe !== 'Not Available Yet') {
      obj.push({
        fileType: 'ITP Pipe',
        downloadLink: this.createDocumentVersionList(data[0].ITPPipe)
      })
    }
    if (data[0].RMTS !== 'Not Available Yet') {
      obj.push({
        fileType: 'RMTS',
        downloadLink: this.createDocumentVersionList(data[0].RMTS)
      })
    }
    this.setState({ tableData: obj })
    this.setState({ isLoading: false })
    if (data[0].SubmittedOn) {
      this.setState({
        showSubmitButton: true,
        msg: 'Project is Already Submitted!'
      })
    }
    if(data[0].ProjectStatus === 'Cancelled'){
      this.setState({
        showSubmitButton: true,
        msg: 'Project is Cancelled!'
      })
    }
  }

  componentDidMount () {
    this.getTableData()
  }

  onRefresh () {
    this.getTableData()
  }

  onDocIdClick (rowData) {
    const documentArray = this.props.documentArray
    documentArray[4] = rowData.documentId
    this.props.setDocumentArray(documentArray)
    history.push('/Inquiry/create-new-projects/output-document/second')
  }

  async submitProject () {
    this.setState({
      isLoading: true
    })
    const saveRes = await Axios.post(
      `${backendUrl}/dashboard/update_submit_date`,
      {
        project_id: this.props.projectId
      }
    ).then( res => {
      this.setState({
        isLoading: false,
        showSubmitButton: true,
        msg: 'Project is Already Submitted!'
      });
      this.growl.show({severity: 'success', summary: 'Project Submitted Successfully!', detail: ''});
    }).catch(err => {
      this.setState({
        isLoading: false,
      });
      this.growl.show({ sticky: 'true', severity: 'error', summary: `${err.response.data.code}`, detail: 'Some issue occur while submitting project.'});
    })
  }

  async cancelProject () {
    this.setState({
      isLoading: true
    })
    const saveRes = await Axios.post(
      `${backendUrl}/dashboard/cancel_project`,
      {
        project_id: this.props.projectId
      }
    ).then( res => {
      this.setState({
        isLoading: false,
        showSubmitButton: true,
        msg: 'Project is Cancelled!'
      });
      this.growl.show({severity: 'success', summary: 'Project Cancel Successfully!', detail: ''});
    }).catch(err => {
      this.setState({
        isLoading: false,
      });
      this.growl.show({ sticky: 'true', severity: 'error', summary: `${err.response.data.code}`, detail: 'Some issue occur while canceling project.'});
    })
  }

  onDelete () {
    console.log('Output document deleted......')
    history.push('/')
  }

  createDocumentVersionList (list) {
    const htmlDownloadList = list.map((doc, index) => {
      if (doc.length > 0) {
        return (
          <a role="button" href={doc} className="downloadButton">Ver. {index + 1} <i className="material-icons" style={{ position: 'relative', top: '7px' }}>
                save_alt
          </i></a>
        )
      }
    })
    return htmlDownloadList
  }

  render () {
    return !this.state.isLoading ? (
      <div>
        <Growl style={{ top: '15%'}} ref={(el) => this.growl = el} />
        <TableComponent colList={this.state.tableColList} dataList={this.state.tableData} onDocumentIdClick={this.onDocIdClick} onRefresh={this.onRefresh} actionItemNotNeeded={true}/>
        <div style={{ display: 'flex'}}>
          {
            this.state.showSubmitButton ? <></> : 
              <button className="save-button btn-grad" style={{ margin: 'auto',  width: '400px'}} type="button" label="Cancel" onClick={this.cancelProject}> Cancel Project </button>
          }
          {
            this.state.showSubmitButton ? <button className="save-button btn-grad" style={{ margin: 'auto', width: '400px', opacity:'0.8', cursor: 'not-allowed'}} type="button" label="Save" disabled> {this.state.msg} </button> : 
              <button className="save-button btn-grad" style={{ margin: 'auto',  width: '400px'}} type="button" label="Save" onClick={this.submitProject}> Submit Project </button>
          }
        </div>
      </div>
    ) : (
      <LoadingScreen />
    )
  }
}

const mapStateToProps = state => ({
  projectId: state.projectId,
  documentArray: state.documentArray
})
const mapDispatchToProps = dispatch => ({
  setDocumentArray: (documentArray) => dispatch(setDocumentArray(documentArray))
})
export default connect(
  mapStateToProps, mapDispatchToProps
)(OutputDocument)
