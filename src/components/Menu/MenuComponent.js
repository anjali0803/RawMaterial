import React from "react";
import Axios from "axios";
// import { PanelMenu } from 'primereact/panelmenu';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import { PanelMenu } from "primereact/panelmenu";
import { connect } from "react-redux";
import { setDataList, setColList } from "../../actions/dataActions";
import "./index.css";
import { backendUrl } from "../../constant";

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
                label: "Inquiry",
                icon: "pi pi-fw pi-question",
                items: [
                    {
                        label: "Create new projects",
                        icon: "pi pi-fw pi-plus",
                        command: event => {
                            window.location.hash = "/inquiry/create-new-projects/details";
                        }
                    },
                    {
                        label: "Projects assigned to me",
                        icon: "pi pi-fw pi-align-left",
                        command: event => {
                            window.location.hash = "/inquiry/projects-assigned-to-me";
                        }
                    },
                    {
                        label: "Projects assigned by me",
                        icon: "pi pi-fw pi-align-right",
                        command: event => {
                            window.location.hash = "/inquiry/projects-assigned-by-me";
                        }
                    },
                    {
                        label: "All ongoing projects",
                        icon: "pi pi-fw pi-clone",
                        command: event => {
                            window.location.hash = "/inquiry/all-ongoing-projects";
                        }
                    },
                    {
                        label: "Closed projects",
                        icon: "pi pi-fw pi-copy",
                        command: event => {
                            window.location.hash = "/inquiry/closed-projects";
                        }
                    },
                    {
                        label: "Archive projects",
                        icon: "pi pi-fw pi-envelope",
                        command: event => {
                            window.location.hash = "/inquiry/archieve-projects";
                        }
                    }
                ]
            },
            {
                label: "Report",
                icon: "pi pi-fw pi-file-excel",
                items: [
                    {
                        label: "Generate new reports",
                        icon: "pi pi-fw pi-plus",
                        command: event => {
                            window.location.hash = "/report/generate-new-reports";
                        }
                    },
                    {
                        label: "past reports",
                        icon: "pi pi-fw pi-minus",
                        command: event => {
                            window.location.hash = "/report/past-reports";
                        }
                    }
                ]
            },
            {
                label: "Support",
                icon: "pi  pi-info",
                command: event => {
                    window.location.hash = "/support";
                },
                items: [
                    {
                        label: "Create new Incident",
                        icon: "pi pi-eye",
                        command: event => {
                            window.location.hash = "/support/create-new-incident";
                        }
                    },
                    {
                        label: "Open Incidents",
                        icon: "pi pi-circle-off",
                        command: event => {
                            window.location.hash = "/support/open-incidents";
                        }
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

        return <PanelMenu model={items} />;
    }
}

const mapStateToProps = state => ({
    userRole: state.userRole
});

const mapDispatchToProps = dispatch => ({
    setDataList: dataList => dispatch(setDataList(dataList)),
    setColList: colList => dispatch(setColList(colList)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuComponent);
