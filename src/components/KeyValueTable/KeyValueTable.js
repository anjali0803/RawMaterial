import React from 'react';
import './index.css'
import TableComponent from '../ProjectsTable/ProjectsTable';
import DocumentHeader from '../DocumentHeader/DocumentHeader';
import ButtonHeader from '../ButtonHeader/ButtonHeader';
import ProgressBar from '../Pages/ProjectScreens/ProgressBar';
import { createHashHistory } from 'history'
import { connect } from "react-redux";
import axios from 'axios';
import { backendUrl } from '../../constant';

const history = createHashHistory();
const pageMapIndex = [
    'input-key-value',
    'recommendations',
    'acceptance',
    'output-key-value',
    'output-document'

]
class KeyValueTable extends React.Component {
    constructor(props) {
        super(props);
        if (props.projectId === '')
            history.push('/Inquiry/create-new-projects/details')

        if (props.documentArray[props.screenNumber - 1] === '')
            history.push(`/Inquiry/create-new-projects/${pageMapIndex[props.screenNumber - 1]}`)

        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            documentId: props.documentArray[props.screenNumber - 1] || '',
            keyValueData: [],
            keyValueColList: [
                { field: 'WorkDescription', header: 'Work Description' },
                { field: 'ClientSpecNumber', header: 'Client Spec Number' },
                { field: 'TestingFrequency', header: 'Testing Frequency' },
                { field: 'AcceptanceCriteria', header: 'Acceptance Criteria' }
            ]
        }

    }
    async componentDidMount() {
        //get data based on document id and project id
        //set keyValueData and keyvalueColList here
        const  keyValueData  = await axios.get(
            `${backendUrl}/dashboard/get_ikv_doc_docid`,{
                params:{
                    docID : this.state.documentId
                }
            }
        )
        this.setState({ keyValueData: keyValueData.data.data });
    }
    onSave() {
        console.log('recommendations screen save ....');
        history.push(this.props.redirectTo);

    }
    onDelete() {
        console.log('recommendations screen delete ....');
    }

    render() {

        return (
            <div>
                <ButtonHeader saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
                <DocumentHeader documentId={this.state.documentId} projectId={this.props.projectId} />
                <TableComponent colList={this.state.keyValueColList} dataList={this.state.keyValueData} />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    projectId: state.projectId,
    documentId: state.documentId,
    documentArray: state.documentArray
})
export default connect(mapStateToProps)(KeyValueTable);