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
				const toggleDropDownMenu = () => {
					var dropdownEle = document.activeElement.className;
					let collapsedDropDown = [];
					$(".dashboard").removeClass("active");
					for(let i = 0; i <= 3; i++){
						if(dropdownEle.indexOf(i.toString()) < 0){
							$(`.dropdown-container-${i}`).hide();
							$(`.dropdown-btn-${i}`).removeClass("active");
						} else {
							$(`.dropdown-btn-${i}`).addClass("active");
							$(`.dropdown-container-${i}`).toggle();
						}
					}
				};

        const items = [
            {
                name: "Dashboard",
                icon: "pi pi-fw pi-home",
                url: '/dashboard'
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
                name: "Admin",
                icon: "pi pi-user",
                children: [
                    {
                        name: "Pending Requests",
                        icon: "pi pi-key",
                        url: "/admin/pending-requests"
                    },
                    {
                        name: "All Users",
                        icon: "pi pi-fw pi-users",
                        url: "/admin/all-users"
                    }
                ]
            })
            : null;
				
				const redirectToDashboard = () =>{
					var activeElement = document.activeElement.className;
					$(".dashboard").addClass("active");
					for(let i = 0; i <= 3; i++){
						$(`.dropdown-container-${i}`).hide();
						$(`.dropdown-btn-${i}`).removeClass("active");
					}
					this.props.history.push('/dashboard');
				};

        return (
            <div className="sideBar">
              <div className="navMenu">
								{
									(this.props.userRole == "admin") && (
										<>
											<button class="dropdown-btn dropdown-btn-0" onClick={toggleDropDownMenu}><i class="pi pi-user"></i>Admin
													<i class="fa fa-caret-down"></i>
											</button>
											<div class="dropdown-container dropdown-container-0">
													<a href="#/support/create-new-incident"><i class="pi pi-key"></i>Pending Requests</a>
													<a href="#/support/open-incidents"><i class="pi pi-fw pi-users"></i>All Users</a>
											</div>
										</>
									)
								}
								<button class="dropdown-btn dashboard" onClick={redirectToDashboard}><i class="pi pi-fw pi-home"></i> Dashboard</button>
								<button class="dropdown-btn dropdown-btn-1" onClick={toggleDropDownMenu}><i class="pi pi-fw pi-question"></i>Inquiry
                    <i class="fa fa-caret-down"></i>
                </button>
								<div class="dropdown-container dropdown-container-1">
                    <a href="#/inquiry/create-new-projects/new"><i class="pi pi-fw pi-plus"></i>Create new projects</a>
                    <a href="#/inquiry/projects-assigned-to-me"><i class="pi pi-fw pi-align-left"></i>Projects assigned to me</a>
                    <a href="#/inquiry/projects-assigned-by-me"><i class="pi pi-fw pi-align-right"></i>Projects assigned by me</a>
										<a href="#/inquiry/all-ongoing-projects"><i class="pi pi-fw pi-clone"></i>All ongoing projects</a>
                    <a href="#/inquiry/closed-projects"><i class="pi pi-fw pi-copy"></i>Closed projects</a>
                    <a href="#/inquiry/archieve-projects"><i class="pi pi-fw pi-envelope"></i>Archive projects</a>
                </div>
								<button class="dropdown-btn dropdown-btn-2" onClick={toggleDropDownMenu}><i class="pi pi-fw pi-file-excel"></i>Report
                    <i class="fa fa-caret-down"></i>
                </button>
								<div class="dropdown-container dropdown-container-2">
                    <a href="#/report/generate-new-reports"><i class="pi pi-fw pi-plus"></i>Generate new reports</a>
                    <a href="#/report/past-reports"><i class="pi pi-fw pi-minus"></i>Past reports</a>
                </div>
                <button class="dropdown-btn dropdown-btn-3" onClick={toggleDropDownMenu}><i class="pi  pi-info"></i>Support
                    <i class="fa fa-caret-down"></i>
                </button>
                <div class="dropdown-container dropdown-container-3">
                    <a href="#/support/create-new-incident"><i class="pi pi-eye"></i>Create new Incident</a>
                    <a href="#/support/open-incidents"><i class="pi pi-circle-off"></i>Open Incidents</a>
                </div>
							</div>
            </div>
        );
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
