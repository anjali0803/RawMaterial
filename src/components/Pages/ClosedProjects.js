import React from 'react';
import ProjectsTable from '../ProjectsTable/ProjectsTable';
import './index.css';
import { setDocumentArray, setProjectId, setProjectCustomer, setProjectTitle, setProjectType } from '../../actions/dataActions'
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
import Axios from 'axios';
import LoadingScreen from './LoadingScreen/loadingScreen';
const history = createHashHistory();




class ClosedProjects extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            tableData: [
            ],
            tableColList: [
                { field: "ProjectID", header: "Project Id" },
                { field: "Title", header: "Title" },
                { field: "Customer", header: "Customer" },
                { field: "Type", header: "Type" },
                { field: "AssignedDate", header: "Assigned Date" },
                { field: "AssignedTo", header: "Assigned To" },
                { field: "Status", header: "Status" },
                { field: "createdBy", header: "Created By" }
            ]
        }

        this.onProjectIdClick = this.onProjectIdClick.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }
    async getTableData() {
        this.setState({ isLoading: true });
        let res = await Axios.get('http://5dbdaeb405a6f30014bcaee3.mockapi.io/projects');
        let data = res.data;
        data = data.filter((element, index) => {
            if (element['Status'] == 'closed') {
                return element;
            }
        })
        this.setState({ tableData: data });
        this.setState({ isLoading: false });
    }
    componentDidMount() {
        this.getTableData();
    }
    onRefresh() {
        this.getTableData();
    }
    onProjectIdClick(rowData) {
        //refresh the document array and project id
        const { Type, Title, Customer, ProjectID } = rowData;
        //sconsole.log({ Type, Title, Customer, ProjectID })
        this.props.setProjectId(ProjectID);
        this.props.setProjectCustomer(Customer);
        this.props.setProjectType(Type);
        this.props.setProjectTitle(Title)
        this.props.setDocumentArray(['', '', '', '', '']);
        history.push('/Inquiry/create-new-projects/details');

    }
    render() {
        //console.log(typeof this.props.dataList)
        return this.state.isLoading === false ? (
            <div>
                <ProjectsTable
                    colList={this.state.tableColList}
                    dataList={this.state.tableData}
                    onProjectIdClick={this.onProjectIdClick}
                    onRefresh={this.onRefresh}
                />
            </div>
        ) : (
                <LoadingScreen />
            );
    }
}

const mapStateToProps = state => ({
    dataList: state.dataList,
    colList: state.colList,
    projectId: state.projectId,
    projectType: state.projectType,
    projectTitle: state.projectTitle,
    projectCustomer: state.projectId,
});
const mapDispatchToProps = dispatch => ({
    setProjectId: (projectId) => dispatch(setProjectId(projectId)),
    setProjectType: (projectTitle) => dispatch(setProjectTitle(projectTitle)),
    setProjectCustomer: (projectCustomer) => dispatch(setProjectCustomer(projectCustomer)),
    setProjectTitle: (projectTitle) => dispatch(setProjectTitle(projectTitle)),
    setDocumentArray: (documentArray) => dispatch(setDocumentArray(documentArray))
})
export default connect(
    mapStateToProps, mapDispatchToProps
)(ClosedProjects);