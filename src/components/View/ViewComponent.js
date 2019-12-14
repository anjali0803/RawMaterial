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
import Dashboard from "../Pages/Dashboard";

class ViewComponent extends React.Component {
  render() {
    var routes = [
      { path: '/dashboard', component: Dashboard },
      { path: '/inquiry/create-new-projects', component: CreateNewProjects },
      { path: '/inquiry/projects-assigned-to-me', component: ProjectAssignedToMe },
      { path: '/inquiry/projects-assigned-by-me', component: ProjectAssignedByMe },
      { path: '/inquiry/all-ongoing-projects', component: AllOngoingProjects },
      { path: '/inquiry/closed-projects', component: ClosedProjects },
      { path: '/inquiry/archieve-projects', component: ArchieveProjects },
      { path: '/report/generate-new-reports', component: GenerateNewProjects },
      { path: '/report/past-reports', component: PastReports },
      { path: '/support/create-new-incident', component: CreateNewIncident },
      { path: '/support/open-incidents', component: OpenIncidents }
    ];

    routes = this.props.userRole == 'admin' ? [
      { path: '/admin/pending-requests', component: PendingRequests },
      { path: '/admin/all-users', component: AllUsers }
    ].concat(routes) : routes

    const routeComponents = routes.map(({ path, component }) => {
      return <PrivateRoute key={path} path={path} component={component} isAuthenticated={this.props.userLogin}>

      </PrivateRoute>
    })

    return (
      <div className="view-container">
        <HashRouter>
          <Switch>
            {routeComponents}
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
