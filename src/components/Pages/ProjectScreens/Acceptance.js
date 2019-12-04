import React from 'react';
import { createHashHistory } from 'history'
import { connect } from 'react-redux'
import TableComponent from '../../Table/TableComponent';
import ButtonHeader from '../../ButtonHeader/ButtonHeader';
import './index.css';
import { setDocumentId, setDocumentType } from '../../../actions/dataActions';
import { backendUrl } from '../../../constant';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';

const history = createHashHistory();

class Acceptance extends React.Component {
    constructor(props) {

        super(props);
        if (this.props.projectId === '') {
            history.push('/Inquiry/create-new-projects/details')
        }
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            tableData: [],
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
							{ label: "Send selected to Acceptance", value: 1 }
						]
        }
		this.handleClickAllSelected = this.handleClickAllSelected.bind(this);
        this.onDocIdClick = this.onDocIdClick.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    async componentDidMount() {
			let getRecommedationData = await axios.get(
				`${backendUrl}/dashboard/get_acc_doc/`,{
					params: {
						projectID: this.props.projectId
					}
				}
			);
			this.setState({tableData: getRecommedationData.data.data});
    }

		async handleClickAllSelected(action, data) {
			if (action) {
				console.log(data, " is Accepted");
			
			} else {
				//TODO reject acceptance call 
				console.log(data, " is Rejected");
			}
			this.getUserList();
		}
    
    onRefresh() {
        this.getTableData();
    }
    onSave() {
        console.log('Acceptance Save..');
        history.push("/Inquiry/create-new-projects/output-key-value");
    }

    onDelete() {
        console.log('Acceptance Delete..');
    }

    onDocIdClick(rowData) {
        this.props.setDocumentId(rowData['DocID']);
        this.props.setDocumentType(rowData['FileType']);
        history.push("/Inquiry/create-new-projects/acceptance/second");
    }

    render() {
        return !this.state.isLoading ? (
            <div>
                <ButtonHeader saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
                <TableComponent colList={this.state.tableColList} dataList={this.state.tableData} onDocumentIdClick={this.onDocIdClick} handleClickAllSelected={this.handleClickAllSelected} actionsLabel={this.state.actions} editable={false}/>
            </div>
        ) : (
                <div className="spinner-container">
                    <ProgressSpinner
                        style={{ width: "40%", height: "40%" }}
                        strokeWidth="1"
                        animationDuration="1s"
                    ></ProgressSpinner>
                </div>
            )
    }
}

const mapStateToProps = state => ({
    projectId: state.projectId,
    documentId: state.documentId,
    documentArray: state.documentArray
});
const mapDispatchToProps = dispatch => ({
    setDocumentId: (documentId => dispatch(setDocumentId(documentId))),
    setDocumentType: (FileType => dispatch(setDocumentType(FileType))),
})
export default connect(
    mapStateToProps, mapDispatchToProps
)(Acceptance);