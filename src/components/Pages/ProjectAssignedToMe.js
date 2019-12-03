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




class ProjectAssignedToMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            tableData: [
            ],
            tableColList: [
                { field: "ProjectID", header: "Project Id" },
                { field: "Title", header: "Title" },
                { field: "Client", header: "Customer" },
                { field: "ProjectType", header: "Type" },
                { field: "AssignedOn", header: "Assigned Date" },
                { field: "ProjectStatus", header: "Status" },
                { field: "CreatedBy", header: "Created By" }
            ]
        }

        this.onProjectIdClick = this.onProjectIdClick.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }
    async getTableData() {
        this.setState({ isLoading: true });
        let res = await Axios.get(`${backendUrl}/dashboard/myproject`, {
            params: {
                username: this.props.userName
            }
        });
        let data = res.data.data;
        this.setState({ tableData: data });
        this.setState({ isLoading: false });
    }
    componentDidMount() {
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
        this.props.setDocumentArray([]);
        history.push('/Inquiry/create-new-projects/details');

    }
    onRefresh() {
        this.getTableData();
    }
    render() {
        //console.log(typeof this.props.dataList)
        return this.state.isLoading === false ? (
            <div>
                <ProjectsTable
                    colList={this.state.tableColList.filter(element => {
                        if (element.field != 'AssignedTo') {
                            return element;
                        }
                    })}

                    dataList={this.state.tableData.filter((element) => {
                        if (element['AssignedTo'] === this.props.userName)
                            return element;

                    })}

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
    userName: state.userName,
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
)(ProjectAssignedToMe);