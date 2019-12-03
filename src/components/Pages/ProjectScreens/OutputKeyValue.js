import React from 'react';
import { createHashHistory } from 'history'
import { connect } from "react-redux";
import { setDocumentArray } from "../../../actions/dataActions";
import './index.css';
import TableComponent from '../../Table/TableComponent';
import ButtonHeader from '../../ButtonHeader/ButtonHeader';
import { backendUrl } from '../../../constant';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';

const history = createHashHistory();
class OutputKeyValue extends React.Component {
    constructor(props) {
        super(props);
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
							{ label: "kuchh to hoga click karne pe", value: 1 }
						]
        }
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
				this.onDocIdClick = this.onDocIdClick.bind(this);
				this.handleClickAllSelected = this.handleClickAllSelected.bind(this);	
    }

    async componentDidMount() {
			let getRecommedationData = await axios.get(
				`${backendUrl}/dashboard/get_itp_doc/`,{
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
			this.getUserList();
		}

    onDocIdClick(rowData) {
        let documentArray = this.props.documentArray;
        documentArray[3] = rowData['documentId'];
        this.props.setDocumentArray(documentArray)
        history.push("/Inquiry/create-new-projects/output-key-value/second");
    }

    onSave() {
        console.log('Recommendations Save..');
        history.push("/Inquiry/create-new-projects/output-document");
    }

    onDelete() {
        console.log('Output-key-value Delete..');
    }

    render() {
        return !this.state.isLoading ? (
            <div>
                <ButtonHeader saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />

                <TableComponent colList={this.state.tableColList} dataList={this.state.tableData} onDocumentIdClick={this.onDocIdClick} onRefresh={this.onRefresh} handleClickAllSelected={this.handleClickAllSelected} actionsLabel={this.state.actions} />
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
    documentArray: state.documentArray
});
const mapDispatchToProps = dispatch => ({
    setDocumentArray: (documentArray) => dispatch(setDocumentArray(documentArray)),

});
export default connect(
    mapStateToProps, mapDispatchToProps
)(OutputKeyValue);