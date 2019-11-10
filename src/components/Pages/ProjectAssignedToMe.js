import React from 'react';
import ProjectsTable from '../ProjectsTable/ProjectsTable';
import './index.css';
import { setDocumentArray, setProjectId, setProjectCustomer, setProjectTitle, setProjectType } from '../../actions/dataActions'
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
const history = createHashHistory();




class ProjectAssignedToMe extends React.Component {
    constructor(props) {
        super(props);
        this.onProjectIdClick = this.onProjectIdClick.bind(this);
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
                <ProjectsTable
                    projectTableColList={this.props.projectTableColList.filter(element => {
                        if (element.field != 'AssignedTo') {
                            return element;
                        }
                    })}

                    projectList={this.props.projectList.filter((element) => {
                        if (element['AssignedTo'] === this.props.userName)
                            return element;

                    })}

                    onProjectIdClick={this.onProjectIdClick}

                />
            </div>
        )
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