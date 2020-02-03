import React from 'react';
import { createHashHistory } from 'history'
import TableComponent from '../../Table/TableComponent';
import ButtonHeader from '../../ButtonHeader/ButtonHeader';
import { setDocumentArray, setDocumentId, setDocumentType } from "../../../actions/dataActions"
import { connect } from 'react-redux'
import './index.css';
import axios from 'axios';
import { backendUrl } from '../../../constant';
import LoadingScreen from '../LoadingScreen/loadingScreen';

const history = createHashHistory();
class InputKeyValue extends React.Component {
    constructor(props) {
        super(props);
        //console.log("here", this.props)
        // if (this.props.projectId === '') {
        //     history.push('/Inquiry/create-new-projects/details')
        // }
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
        const  tableData  = await axios.get(
            `${backendUrl}/dashboard/get_ikv_doc`,{
                params:{
                    projectID : this.props.projectId
                }
            }
        )
        let newTableData = tableData.data.data.ikv.concat(tableData.data.data.cost_sheet)
        this.setState({ tableData: newTableData });
        this.setState({ isLoading: false })
    }
    onDocIdClick(rowData) {
        let documentArray = this.props.documentArray[0] || [];
        // let documentArray = [];
        // documentArray.push(rowData);
        this.props.setDocumentId(rowData['DocID']);
        this.props.setDocumentType(rowData['FileType']);
        // this.props.setDocumentArray(documentArray);
        history.push("/Inquiry/create-new-projects/input-key-value/second");
    }

    onSave() {
        console.log('Input-key-value Save..');
        history.push("/Inquiry/create-new-projects/recommendations");
    }

    onDelete() {
        console.log('Input-key-value Delete..');
    }
    
    onRefresh() {
        this.getTabledata();
    }
    render() {

        return !this.state.isLoading ? (

            <div className="container-fluid">
                <div className="row justify-content-end">
                    <ButtonHeader saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
                </div>
                <TableComponent colList={this.state.tableColList} dataList={this.state.tableData} onDocumentIdClick={this.onDocIdClick} onRefresh={this.onRefresh} editable={false} />
            </div>

        ) : (
                <LoadingScreen />
            )
    }
}
const mapStateToProps = state => ({
    projectId: state.projectId,
    documentArray: state.documentArray
});
const mapDispatchToProps = dispatch => ({
    setDocumentArray: (documentArray) => dispatch(setDocumentArray(documentArray)),
    setDocumentId: (docID) => dispatch(setDocumentId(docID)),
    setDocumentType: (fileType) => dispatch(setDocumentType(fileType))
});
export default connect(
    mapStateToProps, mapDispatchToProps
)(InputKeyValue);