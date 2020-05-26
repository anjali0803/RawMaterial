import React from 'react'
import { createHashHistory } from 'history'
import { connect } from 'react-redux'
import { setDocumentId, setDocumentType } from '../../../actions/dataActions'
import './index.css'
import TableComponent from '../../Table/TableComponent'
import ButtonHeader from '../../ButtonHeader/ButtonHeader'
import { backendUrl } from '../../../constant'
import axios from 'axios'
import LoadingScreen from './../LoadingScreen/loadingScreen'

const history = createHashHistory()
class OutputKeyValue extends React.Component {
  constructor (props) {
    super(props)
    if (props.projectId === '') {
      history.push('/Inquiry/create-new-projects/details')
    }

    this.state = {
      tableData: [
      ],
      tableColList: [
        { field: 'DocID', header: 'Document Id' },
        { field: 'ClientName', header: 'Customer' },
        { field: 'FileType', header: 'Type' },
        { field: 'CreatedOn', header: 'Uploaded Date' },
        { field: 'LastUpdatedBy', header: 'Last Updated By' },
        { field: 'LastUpdatedOn', header: 'Last' },
        { field: 'sentOn', header: 'Sent On' }
      ],
      keyValueData: [
      ],
      keyValueColList: [
        { field: 'key', header: 'Key' },
        { field: 'value', header: 'Value' }
      ],
      actions: [
        { label: 'Generate Docx', value: 1 },
        { label: 'Generate PDF', value: 0 }
      ]
    }
    this.onSave = this.onSave.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onDocIdClick = this.onDocIdClick.bind(this)
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this)
  }

  async componentDidMount () {
    const getRecommedationData = await axios.get(
				`${backendUrl}/dashboard/get_itp_doc/`, {
				  params: {
				    projectID: this.props.projectId
				  }
				}
    )
    this.setState({ tableData: getRecommedationData.data.data })
  }

  async handleClickAllSelected (action, data) {
    if (action) {
      data.forEach(async element => {
        const sendAcceptanceRes = await axios.post(
                    `${backendUrl}/dashboard/docx_download`,
                    {
                      DocId: element.DocID,
                      ProjectID: this.props.projectId,
                      FileType: element.FileType,
                      IsITP: true
                    }
        )
      })
    } else {
      data.forEach(async element => {
        const sendAcceptanceRes = await axios.post(
                    `${backendUrl}/dashboard/pdf_download`,
                    {
                      DocId: element.DocID
                    }
        )
      })
    }
    // this.getUserList();
  }

  onDocIdClick (rowData) {
    this.props.setDocumentId(rowData.DocID)
    this.props.setDocumentType(rowData.FileType)
    history.push('/Inquiry/create-new-projects/output-key-value/second')
  }

  onSave () {
    console.log('Recommendations Save..')
    history.push('/Inquiry/create-new-projects/output-document')
  }

  onDelete () {
    console.log('Output-key-value Delete..')
  }

  render () {
    return !this.state.isLoading ? (
      <div>
        <ButtonHeader saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />

        <TableComponent
          colList={this.state.tableColList}
          dataList={this.state.tableData}
          onDocumentIdClick={this.onDocIdClick}
          onRefresh={this.onRefresh}
          handleClickAllSelected={this.handleClickAllSelected}
          actionsLabel={this.state.actions}
          editable={false}
          footer={true}
          tabulate={true}
          projectID={this.props.projectId}
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
  documentArray: state.documentArray
})
const mapDispatchToProps = dispatch => ({
  setDocumentId: documentId => dispatch(setDocumentId(documentId)),
  setDocumentType: FileType => dispatch(setDocumentType(FileType))
})
export default connect(
  mapStateToProps, mapDispatchToProps
)(OutputKeyValue)
