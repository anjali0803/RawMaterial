import React from "react";
import { connect } from "react-redux";
import ProjectsTable from "../ProjectsTable/ProjectsTable";
import { setProjectId, setProjectTitle, setProjectCustomer, setProjectType, setDocumentArray } from "../../actions/dataActions";
import "./index.css";


class ProjectAssignedByMe extends React.Component {
  constructor() {
    super();
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
          colList={this.props.colList.filter(element => {
            if (element.field != "createdBy") {
              return element;
            }
          })}
          dataList={this.props.dataList.filter(element => {
            if (element["createdBy"] == "user1") return element;
          })}

          onProjectIdClick={this.onProjectIdClick}
        />
      </div>
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
)(ProjectAssignedByMe);
