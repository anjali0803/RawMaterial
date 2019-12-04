import React from 'react';
import { createHashHistory } from 'history'
import { connect } from "react-redux";
import { setDocumentArray, setDocumentId, setDocumentType } from "../../../actions/dataActions"
import './index.css';
import TableComponent from '../../Table/TableComponent';
import ButtonHeader from '../../ButtonHeader/ButtonHeader';
import { backendUrl } from '../../../constant';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';

const history = createHashHistory();
class Recommendations extends React.Component {
	constructor(props) {
		super(props);
		if (props.projectId === '') {
			history.push('/Inquiry/create-new-projects/details')
		}
		this.onSave = this.onSave.bind(this);
		this.onDelete = this.onDelete.bind(this);
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
				{ label: "Send selected to Acceptance", value: 1 }
			]
		}
		this.onDocIdClick = this.onDocIdClick.bind(this);
		this.handleClickAllSelected = this.handleClickAllSelected.bind(this);
	}
	
	async componentDidMount() {
		let getRecommedationData = await axios.get(
			`${backendUrl}/dashboard/get_rec_doc/`,{
				params: {
					projectID: this.props.projectId
				}
			}
		);
		this.setState({tableData: getRecommedationData.data.data});
	}
	
	async handleClickAllSelected(action, data) {
		if (action) {
		let sendAcceptanceRes = await axios.post(
			`${backendUrl}/dashboard/send_acceptance_from_ikv`,
			{
				projectID: this.props.projectId,
				fileType: this.props.documentArray[0].FileType,
				ikvValues: data
			}
		);
		} else {
		//TODO reject recommendation call 
		console.log(data, " is Rejected");
		}
		// this.getUserList();
	}
	
	onSave() {
		history.push("/Inquiry/create-new-projects/acceptance");
	}
	
	onDelete() {
		console.log('Recommendations Delete..');
	}
	
	onDocIdClick(rowData) {
		// let documentArray = this.props.documentArray;
		// documentArray[1] = rowData['DocID'];
		// this.props.setDocumentArray(documentArray);
		this.props.setDocumentId(rowData['DocID']);
        this.props.setDocumentType(rowData['FileType']);
		history.push("/Inquiry/create-new-projects/recommendations/second");
	}
	
	render() {
		return (
			<div>
				<ButtonHeader saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
				<TableComponent colList={this.state.tableColList} dataList={this.state.tableData} onDocumentIdClick={this.onDocIdClick} handleClickAllSelected={this.handleClickAllSelected} actionsLabel={this.state.actions} editable={false}/>
			</div>
			)
		}
	}
	
	const mapStateToProps = state => ({
		projectId: state.projectId,
		documentArray: state.documentArray,
		documentId: state.documentId,
	});
	const mapDispatchToProps = dispatch => ({
		setDocumentArray: (documentArray) => dispatch(setDocumentArray(documentArray)),
		setDocumentType: (fileType) => dispatch(setDocumentType(fileType)),
		setDocumentId: (documentId) => dispatch(setDocumentId(documentId)),
	});
	export default connect(
		mapStateToProps, mapDispatchToProps
		)(Recommendations);
