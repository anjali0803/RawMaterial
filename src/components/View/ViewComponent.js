import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import './index.css';
import PendingRequests from '../Pages/PendingRequests'
import AllUsers from '../Pages/AllUsers'
import CreateNewProjects from '../Pages/CreateNewProjects'
import ProjectAssignedToMe from '../Pages/ProjectAssignedToMe'
import ProjectAssignedByMe from '../Pages/ProjectAssignedByMe'
import AllOngoingProjects from '../Pages/AllOngoingProjects'
import ClosedProjects from '../Pages/ClosedProjects'
import ArchieveProjects from '../Pages/ArchieveProjects'
import GenerateNewProjects from '../Pages/GenerateNewProjects'
import PastReports from '../Pages/PastReports'
import Support from '../Pages/CreateNewIncident'
import CreateNewIncident from '../Pages/CreateNewIncident';
import OpenIncidents from '../Pages/OpenIncidents';




export default class ViewComponent extends React.Component {
    render() {
        const routes = [
            { path: '/admin/pending-requests', component: PendingRequests },
            { path: '/admin/all-users', component: AllUsers },
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

        const routeComponents = routes.map(({ path, component }) => {
            return <Route key={path} path={path} component={component} />
        })



        
        return (
            <div className="view-container" >
                <HashRouter>
                    {routeComponents}
                </HashRouter>
            </div>

        )
    }
}