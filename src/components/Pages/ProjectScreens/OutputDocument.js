import React from 'react';
import { createHashHistory } from 'history'
import { connect } from 'react-redux'
import { setDocumentArray } from "../../../actions/dataActions";
import './index.css';
import TableComponent from '../../Table/TableComponent';
import ButtonHeader from '../../ButtonHeader/ButtonHeader';
import { ProgressSpinner } from 'primereact/progressspinner';
import Axios from 'axios';
const history = createHashHistory();


class OutputDocument extends React.Component {
    constructor(props) {
        super(props);
        if (props.projectId === '') {
            history.push('/Inquiry/create-new-projects/details')
        }
        this.state = {
            isLoading: false,
            saveEnabled: true,
            deleteEnabled: true,
            tableData: [


                {
                    documentId: '123490',
                    projectId: '125012',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123487',
                    projectId: '125019',
                    customer: 'Navi',
                    type: 'Beta',
                    uploadedDate: '11-10-2016',
                    sent: 'No',
                    last: "Non generated",
                    sentOn: '24-11-2019'
                },
                {
                    documentId: '123467',
                    projectId: '125045',
                    customer: 'Valve',
                    type: 'Omega',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123493',
                    projectId: '125142',
                    customer: 'theta',
                    type: 'Beta',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123490',
                    projectId: '125012',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123490',
                    projectId: '125012',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123490',
                    projectId: '125012',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123490',
                    projectId: '125012',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                }
            ],
            tableColList: [
                { field: 'documentId', header: 'Document Id' },
                { field: 'projectId', header: 'Project Id' },
                { field: 'customer', header: 'Customer' },
                { field: 'type', header: 'Type' },
                { field: 'uploadedDate', header: 'Uploaded Date' },
                { field: 'sent', header: 'Sent' },
                { field: 'last', header: 'Last' },
                { field: 'sentOn', header: 'Sent On' }

            ]
        }
        this.onDocIdClick = this.onDocIdClick.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }
    async getTableData() {
        this.setState({ isLoading: true })
        let data = await Axios.get('http://5dbdaeb405a6f30014bcaee3.mockapi.io/key-value-data');
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
    onDocIdClick(rowData) {
        let documentArray = this.props.documentArray;
        documentArray[4] = rowData['documentId'];
        this.props.setDocumentArray(documentArray)
        history.push('/Inquiry/create-new-projects/output-document/second')
    }

    onSave() {
        console.log('Output document saved......')
        history.push("/");
    }
    onDelete() {
        console.log('Output document deleted......')
        history.push("/");
    }

    render() {
        return !this.state.isLoading ? (
            <div>
                <ButtonHeader saveEnabled={this.state.saveEnabled} deleteEnabled={this.state.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
                <TableComponent colList={this.state.tableColList} dataList={this.state.tableData} onDocumentIdClick={this.onDocIdClick} onRefresh={this.onRefresh} />
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
)(OutputDocument);