import React from 'react';
import './index.css'
import DocumentHeader from '../../../../DocumentHeader/DocumentHeader';
import ButtonHeader from '../../../../ButtonHeader/ButtonHeader';
import { createHashHistory } from 'history'
import { connect } from "react-redux";
import TableComponent from '../../../../Table/TableComponent';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import { backendUrl } from '../../../../../constant';
const history = createHashHistory();
const pageMapIndex = [
    'input-key-value',
    'recommendations',
    'acceptance',
    'output-key-value',
    'output-document'

]
class InputKeyValueTable extends React.Component {
    constructor(props) {
        super(props);
        if (props.projectId === '')
            history.push('/Inquiry/create-new-projects/details')

        // if (props.documentArray[props.screenNumber - 1] === '')
        //     history.push(`/Inquiry/create-new-projects/${pageMapIndex[props.screenNumber - 1]}`)

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
                { field: 'TestingFrequency', header: 'Testing Frequency' },
                { field: 'AcceptanceCriteria', header: 'Acceptance Criteria Value' }
            ],
            actions: [
                { label: "Recommendation", value: 1 },
                { label: "Acceptance", value: 0 },
			]
        }
        this.onRefresh = this.onRefresh.bind(this);
		this.handleClickAllSelected = this.handleClickAllSelected.bind(this);
		// // this.onDocIdClick = this.onDocIdClick.bind(this);
    }
    async getKeyValueData() {
        this.setState({ isLoading: true })
        let data = await axios.get(
            `${backendUrl}/dashboard/get_ikv_doc_docid`,{
                params:{
                    docID : this.state.documentId
                }
            }
        );
        data = data.data.data;
        this.setState({ keyValueData: data });
        this.setState({ isLoading: false })
    }
    componentDidMount() {
        this.getKeyValueData();
    }
    onRefresh() {
        this.getKeyValueData();
    }
    async onSave() {
        const saveEditedValue = await axios.post(
            `${backendUrl}/dashboard/update_ikv_values`,
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
        console.log('Row class Name :', rowData['TestingFrequency'] > 5);

        return {
            'table-on-green': (parseInt(rowData['TestingFrequency']) > 5),
            'table-on-red': (parseInt(rowData['TestingFrequency']) < 5)
        };
    }

    async handleClickAllSelected(action, data) {
        if (action) {
            let sendRecommendationRes = await axios.post(
                `${backendUrl}/dashboard/send_rec_from_ikv`,
                {
                    projectID: this.props.projectId,
                    fileType: this.props.documentFiletype,
                    ikvValues: data
                }
            );
        } else {
            let sendAcceptanceRes = await axios.post(
                `${backendUrl}/dashboard/send_acceptance_from_ikv`,
                {
                    projectID: this.props.projectId,
                    fileType: this.props.documentFiletype,
                    ikvValues: data
                }
            );
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
                    actionsLabel={this.state.actions}
                    handleClickAllSelected={this.handleClickAllSelected}
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
    documentArray: state.documentArray,
    documentFiletype: state.documentFiletype
})
export default connect(mapStateToProps)(InputKeyValueTable);