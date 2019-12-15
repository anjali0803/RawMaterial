import React from 'react';
import './index.css'
import DocumentHeader from '../../../../DocumentHeader/DocumentHeader';
import ButtonHeader from '../../../../ButtonHeader/ButtonHeader';
import { createHashHistory } from 'history'
import { connect } from "react-redux";
import TableComponent from '../../../../Table/TableComponent';
import axios from 'axios';
import {backendUrl} from '../../../../../constant';
import LoadingScreen from '../../../LoadingScreen/loadingScreen';
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
                { field: 'WorkDescription', header: 'Work Description' },
                { field: 'ClientSpecNumber', header: 'Client Spec Number' },
                { field: 'TestingFrequency', header: 'Testing Ferquency' },
                { field: 'AcceptanceCriteria', header: 'Acceptance Criteria' },
                { field: 'TestingFrequencyProposal', header: 'Testing Ferquency Proposal' },
                { field: 'AcceptanceCriteriaProposal', header: 'Acceptance Criteria Proposal' },
                { field: 'CostImpact', header: 'Cost Impact' }
			],
            actions: [
                { label: "Accept", value: 1 }
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
    async onSave() {
        const saveEditedValue = await axios.post(
            `${backendUrl}/dashboard/update_recommendation_value`,
            {
                docID: this.props.documentId,
                values: this.state.keyValueData
            }
        )
        console.log('data saved', saveEditedValue);
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
			`${backendUrl}/dashboard/send_acceptance_from_rec`,
			{
                projectID: this.props.projectId,
                fileType: this.props.documentFiletype,
                recValues: data
			}
		);
		} else {
            //something
		}
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
                    deleteRowAction={this.deleteRowAction}
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
    documentArray: state.documentArray,
    documentFiletype: state.documentFiletype
})
export default connect(mapStateToProps)(RecKeyValueTable);