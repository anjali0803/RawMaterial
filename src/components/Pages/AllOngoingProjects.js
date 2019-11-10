import React from 'react';
import './index.css';
import { setDocumentArray, setProjectCustomer, setProjectId, setProjectTitle, setProjectType } from '../../actions/dataActions'
import { connect } from 'react-redux';

import ProjectsTable from '../ProjectsTable/ProjectsTable';
import { createHashHistory } from "history";
const history = createHashHistory()

class AllOngoingProjects extends React.Component {
    constructor() {
        super();
        this.onProjectIdClick = this.onProjectIdClick.bind(this)
    }

    onProjectIdClick(rowData) {
        //refresh the document array and project id
        const { Type, Title, Customer, ProjectID } = rowData;
        console.log({ Type, Title, Customer, ProjectID })
        this.props.setProjectId(ProjectID);
        this.props.setProjectCustomer(Customer);
        this.props.setProjectType(Type);
        this.props.setProjectTitle(Title)
        this.props.setDocumentArray(['', '', '', '', '']);
        history.push('/Inquiry/create-new-projects/details');

    }

    render() {
        return (
            <div>
                <ProjectsTable colList={this.props.colList} dataList={this.props.dataList}
                    onProjectIdClick={this.onProjectIdClick} />
            </div>


        )
    }
}
const mapStateToProps = state => ({
    dataList: state.dataList,
    colList: state.colList,
    projectId: state.projectId,
    projectTitle: state.projectTitle,
    projectType: state.projectType,
    setProjectCustomer: state.projectId,
    documentArray: state.documentArray

});
const mapDispatchToProps = dispatch => ({
    setProjectId: (projectId) => dispatch(setProjectId(projectId)),
    setProjectTitle: (projectTitle) => dispatch(setProjectTitle(projectTitle)),
    setProjectCustomer: (projectCustomer) => dispatch(setProjectCustomer(projectCustomer)),
    setProjectType: (projectType) => dispatch(setProjectType(projectType)),
    setDocumentArray: (documentArray) => dispatch(setDocumentArray(documentArray)),


})
export default connect(
    mapStateToProps, mapDispatchToProps
)(AllOngoingProjects)