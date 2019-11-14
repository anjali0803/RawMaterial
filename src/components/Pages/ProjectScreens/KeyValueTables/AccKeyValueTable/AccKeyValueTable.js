import React from 'react';
import './index.css'
import DocumentHeader from '../../../../DocumentHeader/DocumentHeader';
import ButtonHeader from '../../../../ButtonHeader/ButtonHeader';
import { createHashHistory } from 'history'
import { connect } from "react-redux";
import TableComponent from '../../../../Table/TableComponent';
import Axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
const history = createHashHistory();
const pageMapIndex = [
    'input-key-value',
    'recommendations',
    'acceptance',
    'output-key-value',
    'output-document'

]
class AccKeyValueTable extends React.Component {
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
            keyValueData: [

                { "workDescription": "Clean up  and Cover", "referenceStandardValue": 234, "technicalSpecificationValue": 12, "acceptanceCriteriaValue": 456 },
                { "workDescription": "Maintainence and fixtures", "referenceStandardValue": 223, "technicalSpecificationValue": 7, "acceptanceCriteriaValue": 456 },
                { "workDescription": "Drills and exercies", "referenceStandardValue": 234, "technicalSpecificationValue": 9, "acceptanceCriteriaValue": 456 },
                { "workDescription": "Inventory management", "referenceStandardValue": 94, "technicalSpecificationValue": 3, "acceptanceCriteriaValue": 456 },
                { "workDescription": "Asset acquisitions", "referenceStandardValue": 111, "technicalSpecificationValue": 12, "acceptanceCriteriaValue": 456 },
                { "workDescription": "Classification", "referenceStandardValue": 178, "technicalSpecificationValue": 13, "acceptanceCriteriaValue": 456 },
            ],
            keyValueColList: [
                { field: 'workDescription', header: 'Work Description' },
                { field: 'referenceStandardValue', header: 'Reference Standard Value' },
                { field: 'technicalSpecificationValue', header: 'Technical Specification Value' },
                { field: 'acceptanceCriteriaValue', header: 'Acceptance Criteria Value' }



            ]
        }
        this.onRefresh = this.onRefresh.bind(this);
    }
    async getKeyValueTable() {
        this.setState({ isLoading: true });
        let res = await Axios.get('http://5dbdaeb405a6f30014bcaee3.mockapi.io/key-value-data');
        res = res.data;
        this.setState({ keyValueData: res })
        this.setState({ isLoading: false });
    }
    componentDidMount() {
        this.getKeyValueTable();
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
export default connect(mapStateToProps)(AccKeyValueTable);