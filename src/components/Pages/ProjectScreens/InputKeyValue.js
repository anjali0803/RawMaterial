import React from 'react';
import { createHashHistory } from 'history'
import TableComponent from '../../Table/TableComponent';
import ButtonHeader from '../../ButtonHeader/ButtonHeader';
import { setDocumentArray } from "../../../actions/dataActions"
import { connect } from 'react-redux'
import './index.css';
import Axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
const history = createHashHistory();
class InputKeyValue extends React.Component {
    constructor(props) {
        super(props);
        //console.log("here", this.props)
        if (props.projectId === '') {
            history.push('/Inquiry/create-new-projects/details')
        }
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            isLoading: false,
            tableData: [

                {
                    documentId: '123490',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123487',
                    customer: 'Navi',
                    type: 'Beta',
                    uploadedDate: '11-10-2016',
                    sent: 'No',
                    last: "Non generated",
                    sentOn: '24-11-2019'
                },
                {
                    documentId: '123467',
                    customer: 'Valve',
                    type: 'Omega',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123493',
                    customer: 'theta',
                    type: 'Beta',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123490',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123490',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123490',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123490',
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
    componentDidMount() {
        this.getTabledata();
    }

    onDocIdClick(rowData) {
        //console.log(this.props.documentArray)

        let documentArray = this.props.documentArray;
        documentArray[0] = rowData['documentId'];
        this.props.setDocumentArray(documentArray)
        history.push("/Inquiry/create-new-projects/input-key-value/second");
    }

    onSave() {
        console.log('Input-key-value Save..');
        history.push("/Inquiry/create-new-projects/recommendations");
    }

    onDelete() {
        console.log('Input-key-value Delete..');
    }
    async getTabledata() {
        this.setState({ isLoading: true })
        let data = await Axios.get('http://5dbdaeb405a6f30014bcaee3.mockapi.io/documents');
        data = data.data;
        this.setState({ tableData: data });
        this.setState({ isLoading: false })
    }
    onRefresh() {
        this.getTabledata();
    }
    render() {

        return !this.state.isLoading ? (

            <div>
                <ButtonHeader saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
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
    setDocumentArray: (documentArray) => dispatch(setDocumentArray(documentArray))
});
export default connect(
    mapStateToProps, mapDispatchToProps
)(InputKeyValue);