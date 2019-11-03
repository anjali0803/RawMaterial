import React from "react";
import { HashRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import "./index.css";
import PendingRequests from "../Pages/PendingRequests";
import AllUsers from "../Pages/AllUsers";
import CreateNewProjects from "../Pages/CreateNewProjects";
import ProjectAssignedToMe from "../Pages/ProjectAssignedToMe";
import ProjectAssignedByMe from "../Pages/ProjectAssignedByMe";
import AllOngoingProjects from "../Pages/AllOngoingProjects";
import ClosedProjects from "../Pages/ClosedProjects";
import ArchieveProjects from "../Pages/ArchieveProjects";
import GenerateNewProjects from "../Pages/GenerateNewProjects";
import PastReports from "../Pages/PastReports";
import CreateNewIncident from "../Pages/CreateNewIncident";
import OpenIncidents from "../Pages/OpenIncidents";

class ViewComponent extends React.Component {
  render() {
    return (
      <div className="view-container">
        <HashRouter>
          <Switch>
            <PrivateRoute
              path="/admin/pending-requests"
              component={PendingRequests}
              isAuthenticated={this.props.userLogin}
            />
            <PrivateRoute
              path="/admin/all-users"
              component={AllUsers}
              isAuthenticated={this.props.userLogin}
            />
            <PrivateRoute
              path="/inquiry/create-new-projects"
              component={CreateNewProjects}
              isAuthenticated={this.props.userLogin}
            />
            <PrivateRoute
              path="/inquiry/projects-assigned-to-me"
              component={ProjectAssignedToMe}
              isAuthenticated={this.props.userLogin}
            />
            <PrivateRoute
              path="/inquiry/projects-assigned-by-me"
              component={ProjectAssignedByMe}
              isAuthenticated={this.props.userLogin}
            />
            <PrivateRoute
              path="/inquiry/all-ongoing-projects"
              component={AllOngoingProjects}
              isAuthenticated={this.props.userLogin}
            />
            <PrivateRoute
              path="/inquiry/closed-projects"
              component={ClosedProjects}
              isAuthenticated={this.props.userLogin}
            />
            <PrivateRoute
              path="/inquiry/archieve-projects"
              component={ArchieveProjects}
              isAuthenticated={this.props.userLogin}
            />
            <PrivateRoute
              path="/report/generate-new-reports"
              component={GenerateNewProjects}
              isAuthenticated={this.props.userLogin}
            />
            <PrivateRoute
              path="/report/past-reports"
              component={PastReports}
              isAuthenticated={this.props.userLogin}
            />
            <PrivateRoute
              path="/support/create-new-incident"
              component={CreateNewIncident}
              isAuthenticated={this.props.userLogin}
            />
            <PrivateRoute
              path="/support/open-incidents"
              component={OpenIncidents}
              isAuthenticated={this.props.userLogin}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userLogin: state.userLogin,
  userName: state.userName,
  userRole: state.userRole
});

export default connect(mapStateToProps)(ViewComponent);
