import React from 'react';
import './index.css';
import TableComponent from '../Table/TableComponent';
import { connect } from 'react-redux';
import ProjectsTable from '../ProjectsTable/ProjectsTable';




class ArchieveProjects extends React.Component {
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
)(ArchieveProjects);