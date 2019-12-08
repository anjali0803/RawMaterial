import React from 'react';
import { createHashHistory } from 'history'
import { connect } from 'react-redux'
import { setDocumentArray } from "../../../actions/dataActions";
import './index.css';
import TableComponent from '../../Table/TableComponent';
import ButtonHeader from '../../ButtonHeader/ButtonHeader';
import { ProgressSpinner } from 'primereact/progressspinner';
import Axios from 'axios';
import { backendUrl } from '../../../../src/constant';
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
            tableData: [],
            tableColList: [
                { field: 'fileType', header: 'File Type' },
                { field: 'downloadLink', header: 'Download Button' }
            ]
        }
        this.onDocIdClick = this.onDocIdClick.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }
    async getTableData() {
        this.setState({ isLoading: true })
        let data = await Axios.get(`${backendUrl}/dashboard/project`,
        {
            params: {
                projectid: this.props.projectId
            }
        });
        data = data.data.data;
        const obj = [
            {
                fileType: 'Cost Sheet',
                downloadLink: <a href={data[0].CostSheet}>Download</a>
            },
            
            {
                fileType: 'Client SpecPipe',
                downloadLink: <a href={data[0].ClientSpecPipe}>Download</a>
            },
            { 
                fileType: 'Client Spec Inner Coating',
                downloadLink: <a href={data[0].ClientSpecInnerCoating}>Download</a>
            },
            { 
                fileType: 'Client Spec Outer Coating',
                downloadLink: <a href={data[0].ClientSpecOuterrCoating}>Download</a>
            }
        ];
        if(data[0].CommentSheetCoating){
            obj.push({
                fileType: 'Comment Sheet Coating',
                downloadLink: <a href={data[0].CommentSheetCoating}>Download</a>  
            })
        }
        if(data[0].CommentSheetPipe){
            obj.push({
                fileType: 'Comment Sheet Pipe',
                downloadLink: <a href={data[0].CommentSheetPipe}>Download</a>  
            })
        }if(data[0].ITPCoating){
            obj.push({
                fileType: 'ITP Coating',
                downloadLink: <a href={data[0].ITPCoating}>Download</a>  
            })
        }if(data[0].ITPPipe){
            obj.push({
                fileType: 'ITP Pipe',
                downloadLink: <a href={data[0].ITPPipe}>Download</a>  
            })
        }
        this.setState({ tableData: obj });
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