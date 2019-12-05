import React from 'react';
import ProjectsTable from '../ProjectsTable/ProjectsTable';
import { ProgressSpinner } from 'primereact/progressspinner'
import './index.css';
import { setDocumentArray, setProjectId, setProjectCustomer, setProjectTitle, setProjectType } from '../../actions/dataActions'
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
import Axios from 'axios';
import { backendUrl } from '../../constant';
const history = createHashHistory();




class AllOngoingProjects extends React.Component {
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
                { field: "createdBy", header: "Created by" },
                { field: "Status", header: "Status" }
            ]
        }

        this.onProjectIdClick = this.onProjectIdClick.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }
    async getTableData() {
        this.setState({ isLoading: true });
        let res = await Axios.get(`${backendUrl}/dashboard/all_project`);
        let data = res.data;
        // data = data.filter((element, index) => {

        //     if (element['Status'] === 'In Process' || element['Status'] === 'In Progress') {
        //         return element;
        //     }
        // })

        this.setState({ tableData: data.data });
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
                <div className="spinner-container">
                    <ProgressSpinner
                        style={{ width: "40%", height: "40%" }}
                        strokeWidth="1"
                        animationDuration="1s"
                    ></ProgressSpinner>
                </div>
            );
    }
}

const mapStateToProps = state => ({
    projectList: state.projectList,
    projectTableColList: state.projectTableColList,
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
)(AllOngoingProjects);