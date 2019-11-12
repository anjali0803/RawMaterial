import React from 'react';
import { createHashHistory } from 'history'
import TableComponent from '../../Table/TableComponent';
import ButtonHeader from '../../ButtonHeader/ButtonHeader';
import { setDocumentArray } from "../../../actions/dataActions"
import { connect } from 'react-redux'
import './index.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from 'axios';
import { backendUrl } from '../../../constant';

const history = createHashHistory();
class InputKeyValue extends React.Component {
    constructor(props) {
        super(props);
        //console.log("here", this.props)
        if (this.props.projectId === '') {
            history.push('/Inquiry/create-new-projects/details')
        }
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            isLoading: false,
            tableColList: [
                { field: 'DocID', header: 'Document Id' },
                { field: 'ClientName', header: 'Customer' },
                { field: 'ProjectType', header: 'Project Type' },
                { field: 'FileType', header: 'File Type' },
                { field: 'CreatedOn', header: 'Created On' },
                { field: 'LastUpdatedBy', header: 'Last Updated By' },
                { field: 'LastUpdatedOn', header: 'Last Updated On' },
                { field: 'FileRevisionDate', header: 'File Revision Date' },
                { field: 'RevNumber', header: 'File Revision Number' },
                { field: 'SpecNumber', header: 'File Spec Number' }
            ],
            tableData: []
        }
        
        this.onDocIdClick = this.onDocIdClick.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }
    componentDidMount() {
        this.getTabledata();
    }

    async componentDidMount(){
        const formData = new FormData();
        formData.append('projectID', 'MASTERHFW')
        const  tableData  = await axios.get(
            `${backendUrl}/dashboard/get_ikv_doc`,{
                params:{
                    projectID : 'MASTERHFW'
                }
            }
        )
        this.setState({ tableData: tableData.data.data });
    }
    onDocIdClick(rowData) {
        //console.log(this.props.documentArray)

        let documentArray = this.props.documentArray;
        documentArray[0] = rowData['DocId'];
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