import React from 'react';
import TableComponent from '../Table/TableComponent';
import './index.css';
import Axios from 'axios';




export default class ProjectAssignedByMe extends React.Component {
    constructor() {
        super();
        this.state = { dataList: null };
    }

    async componentDidMount() {
        let res, data;
        res = await Axios.get('https://d8226649-f8f5-4bb3-b4ac-b403b5ff19f5.mock.pstmn.io/project-server/get-projects');
        data = res.data;
        // console.log("data", data)
        data = data.filter((el) => {
            if (el['createdBy'] == 'user1')
                return el;
        });
        console.log(data);
        this.setState({ dataList: data });

    }

    render() {
        const colList = [
            { field: 'ProjectID', header: 'Project Id' },
            { field: 'Title', header: 'Title' },
            { field: 'Customer', header: 'Customer' },
            { field: 'Type', header: 'Type' },
            { field: 'AssignedDate', header: 'Assigned Date' },
            { field: 'Status', header: 'Status' },
            { field: 'AssignedTo', header: 'Assigned To' },
            //{ field: 'createdBy', header: 'Created By' }
        ];


        return (
            <div>
                <TableComponent colList={colList} dataList={this.state.dataList} />
            </div>


        )
    }
}