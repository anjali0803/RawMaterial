import React from 'react'
import { createHashHistory } from 'history'
import { connect } from 'react-redux'
import { setDocumentArray } from '../../../actions/dataActions'
import './index.css'
import TableComponent from '../../Table/TableComponent'
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
      tableData: [],
      tableColList: [
        { field: 'fileType', header: 'File Type' },
        { field: 'downloadLink', header: 'Download Button' }
      ]
    }
    this.onDocIdClick = this.onDocIdClick.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.createDocumentVersionList = this.createDocumentVersionList.bind(this)
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
        downloadLink: ''
      })
    }
    this.setState({ tableData: obj })
    this.setState({ isLoading: false })
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

  onSave () {
    console.log('Output document saved......')
    history.push('/')
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
        {/* <ButtonHeader saveEnabled={this.state.saveEnabled} deleteEnabled={this.state.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} /> */}
        <TableComponent colList={this.state.tableColList} dataList={this.state.tableData} onDocumentIdClick={this.onDocIdClick} onRefresh={this.onRefresh} />
        <button className="save-button btn-grad" type="button" label="Save" onClick={this.props.onSave}> Save </button>
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
