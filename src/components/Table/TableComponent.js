import React from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import { DataTable } from 'primereact/datatable';
import './index.css';


export default class TableComponent extends React.Component {
    constructor() {
        super();
        this.state = {};

    }

    componentDidMount() {
        const data = [
            {
                projectId: 'Project Id',
                title: 'Title',
                customer: 'Customer',
                type: 'Type',
                assignedDate: 'AssignedDate',
                status: 'Status',
                assignedTo: 'Assigned To'
            },
            {
                projectId: 'Project Id',
                title: 'Title',
                customer: 'Customer',
                type: 'Type',
                assignedDate: 'AssignedDate',
                status: 'Status',
                assignedTo: 'Assigned To'
            },
            {
                projectId: 'Project Id',
                title: 'Title',
                customer: 'Customer',
                type: 'Type',
                assignedDate: 'AssignedDate',
                status: 'Status',
                assignedTo: 'Assigned To'
            },
            {
                projectId: 'Project Id',
                title: 'Title',
                customer: 'Customer',
                type: 'Type',
                assignedDate: 'AssignedDate',
                status: 'Status',
                assignedTo: 'Assigned To'
            },
            {
                projectId: 'Project Id',
                title: 'Title',
                customer: 'Customer',
                type: 'Type',
                assignedDate: 'AssignedDate',
                status: 'Status',
                assignedTo: 'Assigned To'
            },
            {
                projectId: 'Project Id',
                title: 'Title',
                customer: 'Customer',
                type: 'Type',
                assignedDate: 'AssignedDate',
                status: 'Status',
                assignedTo: 'Assigned To'
            },
            {
                projectId: 'Project Id',
                title: 'Title',
                customer: 'Customer',
                type: 'Type',
                assignedDate: 'AssignedDate',
                status: 'Status',
                assignedTo: 'Assigned To'
            }, {
                projectId: 'Project Id',
                title: 'Title',
                customer: 'Customer',
                type: 'Type',
                assignedDate: 'AssignedDate',
                status: 'Status',
                assignedTo: 'Assigned To'
            }, {
                projectId: 'Project Id',
                title: 'Title',
                customer: 'Customer',
                type: 'Type',
                assignedDate: 'AssignedDate',
                status: 'Status',
                assignedTo: 'Assigned To'
            }, {
                projectId: 'Project Id',
                title: 'Title',
                customer: 'Customer',
                type: 'Type',
                assignedDate: 'AssignedDate',
                status: 'Status',
                assignedTo: 'Assigned To'
            }, {
                projectId: 'Project Id',
                title: 'Title',
                customer: 'Customer',
                type: 'Type',
                assignedDate: 'AssignedDate',
                status: 'Status',
                assignedTo: 'Assigned To'
            }, {
                projectId: 'Project Id',
                title: 'Title',
                customer: 'Customer',
                type: 'Type',
                assignedDate: 'AssignedDate',
                status: 'Status',
                assignedTo: 'Assigned To'
            }, {
                projectId: 'Project Id',
                title: 'Title',
                customer: 'Customer',
                type: 'Type',
                assignedDate: 'AssignedDate',
                status: 'Status',
                assignedTo: 'Assigned To'
            }




        ];
        this.setState({ cars: data });

    }
    render() {
        return (
            <div>
                <DataTable value={this.state.cars} paginator={true} paginatorPosition={'top'} rows={10}>
                    <DataTable.Column field="projectId" header="Project Id" filter={true} />
                    <DataTable.Column field="title" header="Title" filter={true} />
                    <DataTable.Column field="customer" header="Customer" filter={true} />
                    <DataTable.Column field="type" header="Type" filter={true} />
                    <DataTable.Column field="assignedDate" header="Assigned Date" filter={true} />
                    <DataTable.Column field="status" header="Status" filter={true} />
                    <DataTable.Column field="assignedTo" header="Assigned To" filter={true} />
                </DataTable>

            </div>
        );
    }
}
