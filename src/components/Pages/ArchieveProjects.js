import React from 'react';
import './index.css';
import TableComponent from '../Table/TableComponent';
import Axios from 'axios';




export default class ArchieveProjects extends React.Component {

    constructor() {
        super();
        this.state = { dataList: null };
    }

    async componentDidMount() {
        let res, data;
        res = await Axios.get('https://460625f2-c6f8-42b9-8743-3e4c33c89137.mock.pstmn.io/project-server/get-projects-archived');
        data = res.data;
        this.setState({ dataList: data });

    }
    render() {
        //PROPS for column headers and fields
        //field is the value mapped from the data
        //header is for display
        const colList = [
            { field: 'ProjectID', header: 'Project Id' },
            { field: 'Title', header: 'Title' },
            { field: 'Customer', header: 'Customer' },
            { field: 'Type', header: 'Type' },
            { field: 'AssignedDate', header: 'Assigned Date' },
            { field: 'Status', header: 'Status' },
            { field: 'AssignedTo', header: 'Assigned To' },
            { field: 'createdBy', header: 'Created By' }
        ];


        return (
            <div>
                <TableComponent colList={colList} dataList={this.state.dataList} />
            </div>


        )
    }
}