import React from 'react';
// import { PanelMenu } from 'primereact/panelmenu';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import { PanelMenu } from 'primereact/panelmenu';
import { connect } from 'react-redux';
import { setDataList, setColList } from '../../actions/dataActions'
import './index.css';
import Axios from 'axios';

class MenuComponent extends React.Component {
    async componentDidMount() {
        let data;
        data = await Axios.get('https://d8226649-f8f5-4bb3-b4ac-b403b5ff19f5.mock.pstmn.io/project-server/get-projects');
        data = data.data;
        this.props.setDataList(data);

        const colList = [
            { field: 'ProjectID', header: 'Project Id' },
            { field: 'Title', header: 'Title' },
            { field: 'Customer', header: 'Customer' },
            { field: 'Type', header: 'Type' },
            { field: 'AssignedDate', header: 'Assigned Date' },
            { field: 'Status', header: 'Status' },
            { field: 'AssignedTo', header: 'Assigned To' },
            { field: 'createdBy', header: 'Created By' }
        ]
        this.props.setColList(colList);
    }
    render() {
        const items = [
            {
                label: 'Admin',
                icon: 'pi pi-user',
                items: [
                    {
                        label: 'Pending Requests',
                        icon: 'pi pi-key',
                        command: (event) => {
                            window.location.hash = "/Admin/pending-requests";
                        }

                    },
                    {
                        label: 'All Users',
                        icon: 'pi pi-fw pi-users',
                        command: (event) => {
                            window.location.hash = "/Admin/all-users";
                        }
                    }
                ]
            },
            {
                label: 'Inquiry',
                icon: 'pi pi-fw pi-question',
                items: [
                    {
                        label: 'Create new projects',
                        icon: 'pi pi-fw pi-plus',
                        command: (event) => {
                            window.location.hash = "/Inquiry/create-new-projects";
                        }
                    },
                    {
                        label: 'Projects assigned to me',
                        icon: 'pi pi-fw pi-align-left',
                        command: (event) => {
                            window.location.hash = "/Inquiry/projects-assigned-to-me";
                        }
                    },
                    {
                        label: 'Projects assigned by me',
                        icon: 'pi pi-fw pi-align-right',
                        command: (event) => {
                            window.location.hash = "/Inquiry/projects-assigned-by-me";
                        }
                    },
                    {
                        label: 'All ongoing projects',
                        icon: 'pi pi-fw pi-clone',
                        command: (event) => {
                            window.location.hash = "/Inquiry/all-ongoing-projects";
                        }
                    },
                    {
                        label: 'Closed projects',
                        icon: 'pi pi-fw pi-copy',
                        command: (event) => {
                            window.location.hash = "/Inquiry/closed-projects";
                        }
                    },
                    {
                        label: 'Archive projects',
                        icon: 'pi pi-fw pi-envelope',
                        command: (event) => {
                            window.location.hash = "/Inquiry/archieve-projects";
                        }
                    }

                ]
            },
            {
                label: 'Report',
                icon: 'pi pi-fw pi-file-excel',
                items: [
                    {
                        label: 'Generate new reports',
                        icon: 'pi pi-fw pi-plus',
                        command: (event) => {
                            window.location.hash = "/Report/generate-new-reports";
                        }

                    },
                    {
                        label: 'past reports',
                        icon: 'pi pi-fw pi-minus',
                        command: (event) => {
                            window.location.hash = "/Report/past-reports";
                        }

                    }

                ]
            },
            {
                label: 'Support',
                icon: 'pi  pi-info',
                command: (event) => {
                    window.location.hash = "/support";
                },
                items: [
                    {
                        label: 'Create new Incident',
                        icon: 'pi pi-eye',
                        command: (event) => {
                            window.location.hash = "/support/create-new-incident";
                        }

                    },
                    {
                        label: 'Open Incidents',
                        icon: 'pi pi-circle-off',
                        command: (event) => {
                            window.location.hash = "/support/open-incidents";
                        }

                    }

                ]

            }
        ]
        return (
            // <Tree value={data} />
            <PanelMenu model={items} />

        )
    }
}

const mapStateToProps = state => ({
    dataList: state.dataList,
    colList: state.colList
});

const mapDispatchToProps = dispatch => ({
    setDataList: dataList => dispatch(setDataList(dataList)),
    setColList: colList => dispatch(setColList(colList))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuComponent);
