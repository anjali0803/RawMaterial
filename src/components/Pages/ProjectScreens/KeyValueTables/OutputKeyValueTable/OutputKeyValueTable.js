import React from 'react';
import './index.css'
import DocumentHeader from '../../../../DocumentHeader/DocumentHeader';
import ButtonHeader from '../../../../ButtonHeader/ButtonHeader';
import { createHashHistory } from 'history'
import { connect } from "react-redux";
import TableComponent from '../../../../Table/TableComponent';
import { ProgressSpinner } from 'primereact/progressspinner';
import Axios from 'axios';
import { backendUrl } from '../../../../../constant';

const history = createHashHistory();
const pageMapIndex = [
    'input-key-value',
    'recommendations',
    'acceptance',
    'output-key-value',
    'output-document'

]
class OutputKeyValueTable extends React.Component {
    constructor(props) {
        super(props);
        if (props.projectId === '')
            history.push('/Inquiry/create-new-projects/details')

        if (props.documentArray[props.screenNumber - 1] === '')
            history.push(`/Inquiry/create-new-projects/${pageMapIndex[props.screenNumber - 1]}`)

        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            isLoading: false,
            documentId: props.documentArray[props.screenNumber - 1] || '',
            keyValueData: [],
            keyValueColList: [
                { field: 'workDescription', header: 'Work Description' },
                { field: 'referenceStandardValue', header: 'Reference Standard Value' },
                { field: 'technicalSpecificationValue', header: 'Technical Specification Value' },
                { field: 'acceptanceCriteriaValue', header: 'Acceptance Criteria Value' }
            ]
        }
        this.onRefresh = this.onRefresh.bind(this);
    }
    async getTableData() {
        this.setState({ isLoading: true })
        let data = await Axios.get(`${backendUrl}/dashboard/get_itp_doc_docid`,
            {
                params: {
                    docID: this.props.documentId
                }
            }
        );
        data = data.data;
        this.setState({ keyValueData: data });
        this.setState({ isLoading: false })

    }
    componentDidMount() {
        this.getTableData();
    }
    onRefresh() {
        this.getTableData();
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
    render() {

        return !this.state.isLoading ? (
            <div>
                <ButtonHeader saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
                <DocumentHeader documentId={this.state.documentId} projectId={this.props.projectId} />
                <TableComponent colList={this.state.keyValueColList} dataList={this.state.keyValueData} rowClassName={this.rowClassName} onRefresh={this.onRefresh} />
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
export default connect(mapStateToProps)(OutputKeyValueTable);