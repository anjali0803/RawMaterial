import React, { Component, Suspense } from 'react';
import Axios from "axios";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import { PanelMenu } from "primereact/panelmenu";
import { connect } from "react-redux";
import { setDataList, setColList } from "../../actions/dataActions";
import "./index.css";
import { backendUrl } from "../../constant";
import * as router from 'react-router-dom';

import {
    AppAside,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppBreadcrumb2 as AppBreadcrumb,
    AppSidebarNav2 as AppSidebarNav,
  } from '@coreui/react';


class MenuComponent extends React.Component {
    async componentDidMount() {
        let data;
        data = await Axios.get(
            `${backendUrl}/dashboard/all_project`
        );
        this.props.setDataList(data.data.data.Items);

        const colList = [
            { field: "ProjectID", header: "Project Id" },
            { field: "Title", header: "Title" },
            { field: "Client", header: "Customer" },
            { field: "ProjectType", header: "Type" },
            { field: "AssignedOn", header: "Assigned Date" },
            { field: "ProjectStatus", header: "Status" },
            { field: "AssignedTo", header: "Assigned To" },
            { field: "CreatedBy", header: "Created By" }
        ];
        this.props.setColList(colList);
    }
    render() {
        const items = [
            {
                name: "Dashboard",
                icon: "pi pi-fw pi-home",
                url: '/'
            },
            {
                name: "Inquiry",
                icon: "pi pi-fw pi-question",
                children: [
                    
                    {
                        name: "Create new projects",
                        icon: "pi pi-fw pi-plus",
                        url: '/inquiry/create-new-projects/new'
                    },
                    {
                        name: "Projects assigned to me",
                        icon: "pi pi-fw pi-align-left",
                        url: "/inquiry/projects-assigned-to-me"
                    },
                    {
                        name: "Projects assigned by me",
                        icon: "pi pi-fw pi-align-right",
                        url: "/inquiry/projects-assigned-by-me"
                    },
                    {
                        name: "All ongoing projects",
                        icon: "pi pi-fw pi-clone",
                        url: "/inquiry/all-ongoing-projects"
                    },
                    {
                        name: "Closed projects",
                        icon: "pi pi-fw pi-copy",
                        url: "/inquiry/closed-projects"
                    },
                    {
                        name: "Archive projects",
                        icon: "pi pi-fw pi-envelope",
                        url: "/inquiry/archieve-projects"
                    }
                ]
            },
            {
                name: "Report",
                icon: "pi pi-fw pi-file-excel",
                children: [
                    {
                        name: "Generate new reports",
                        icon: "pi pi-fw pi-plus",
                        url: "/report/generate-new-reports"
                    },
                    {
                        name: "past reports",
                        icon: "pi pi-fw pi-minus",
                        url: "/report/past-reports"
                    }
                ]
            },
            {
                name: "Support",
                icon: "pi  pi-info",
                url: "/support",
                children: [
                    {
                        name: "Create new Incident",
                        icon: "pi pi-eye",
                        url: "/support/create-new-incident"
                    },
                    {
                        name: "Open Incidents",
                        icon: "pi pi-circle-off",
                        url: "/support/open-incidents"
                    }
                ]
            }
        ];

        this.props.userRole == "admin"
            ? items.unshift({
                label: "Admin",
                icon: "pi pi-user",
                items: [
                    {
                        label: "Pending Requests",
                        icon: "pi pi-key",
                        command: event => {
                            window.location.hash = "/admin/pending-requests";
                        }
                    },
                    {
                        label: "All Users",
                        icon: "pi pi-fw pi-users",
                        command: event => {
                            window.location.hash = "/admin/all-users";
                        }
                    }
                ]
            })
            : null;

        return <AppSidebar fixed display="lg">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
          <AppSidebarNav navConfig={{items: items}} {...this.props} router={router}/>
          </Suspense>
          <AppSidebarFooter />
          <AppSidebarMinimizer />
        </AppSidebar>;
    }
}

const mapStateToProps = state => ({
    userRole: state.userRole
});

const mapDispatchToProps = dispatch => ({
    setDataList: dataList => dispatch(setDataList(dataList)),
    setColList: colList => dispatch(setColList(colList)),
});


export default router.withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuComponent));
