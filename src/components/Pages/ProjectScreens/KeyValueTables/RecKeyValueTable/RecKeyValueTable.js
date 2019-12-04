import React from 'react';
import './index.css'
import DocumentHeader from '../../../../DocumentHeader/DocumentHeader';
import ButtonHeader from '../../../../ButtonHeader/ButtonHeader';
import { createHashHistory } from 'history'
import { connect } from "react-redux";
import TableComponent from '../../../../Table/TableComponent';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import {backendUrl} from '../../../../../constant';
const history = createHashHistory();

const pageMapIndex = [
    'input-key-value',
    'recommendations',
    'acceptance',
    'output-key-value',
    'output-document'

]
class RecKeyValueTable extends React.Component {
    constructor(props) {
        super(props);
        if (props.projectId === '')
            history.push('/Inquiry/create-new-projects/details')

        if (props.documentId === '')
            history.push(`/Inquiry/create-new-projects/${pageMapIndex[props.screenNumber - 1]}`)

        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            isLoading: false,
            documentId: props.documentId,
            keyValueData: [
            ],
            keyValueColList: [
				{ field: 'ClientSpecNumber', header: 'Client Spec Number' },
                { field: 'CostImpact', header: 'Cost Impact' },
				{ field: 'WorkDescription', header: 'Work Description' },
                { field: 'TestingFrequencyProposal', header: 'Testing Ferquency Proposal' },
                { field: 'TestingFrequency', header: 'Testing Ferquency' },
				{ field: 'AcceptanceCriteriaProposal', header: 'Acceptance Criteria Proposal' },
				{ field: 'AcceptanceCriteria', header: 'Acceptance Criteria' }
			],
            actions: [
				{ label: "pikachu thunder bolt please", value: 1 }
			]
        }

        this.onRefresh = this.onRefresh.bind(this);
		this.handleClickAllSelected = this.handleClickAllSelected.bind(this);
    }
    
    async componentDidMount() {
        let getRecommedationData = await axios.get(
			`${backendUrl}/dashboard/get_rec_doc_docid/`,{
				params: {
                    docID: this.state.documentId
                    
					// projectID: this.props.projectId
				}
			}
		);
		this.setState({keyValueData: getRecommedationData.data.data});
        this.setState({ isLoading: false });
    }
    onRefresh() {
        this.getKeyValueTable();
    }
    onSave() {
        console.log('recommendations screen save ....');
        history.push(this.props.redirectTo);

    }
    onDelete() {
        console.log('recommendations screen delete ....');
    }
    rowClassName(rowData) {
        console.log('Row class Name :', rowData['technicalSpecificationValue'] > 5);

        return {
            'table-on-green': (parseInt(rowData['technicalSpecificationValue']) > 5),
            'table-on-red': (parseInt(rowData['technicalSpecificationValue']) < 5)
        };

    }

    async handleClickAllSelected(action, data) {
		if (action) {
		let sendAcceptanceRes = await axios.post(
			`${backendUrl}/dashboard/send_acceptance_from_ikv`,
			{
                projectID: this.props.projectId,
                fileType: this.props.documentFiletype,
                ikvValues: data
			}
		);
		} else {
		//TODO reject recommendation call 
		console.log(data, " is Rejected");
		}
		// this.getUserList();
    }
    
    render() {

        return !this.state.isLoading ? (
            <div>
                <ButtonHeader
                    saveEnabled={this.props.saveEnabled}
                    deleteEnabled={this.props.deleteEnabled}
                    className="progbar-button-header"
                    onSave={() => this.onSave()}
                    onDelete={() => this.onDelete()} 
                />
                <DocumentHeader
                    documentId={this.state.documentId}
                    projectId={this.props.projectId}
                />
                <TableComponent
                    colList={this.state.keyValueColList}
                    dataList={this.state.keyValueData}
                    rowClassName={this.rowClassName}
                    onRefresh={this.onRefresh}
                    handleClickAllSelected={this.handleClickAllSelected}
                    actionsLabel={this.state.actions}
                    editable={true}
                />
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
})
export default connect(mapStateToProps)(RecKeyValueTable);