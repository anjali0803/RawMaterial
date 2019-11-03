import React from 'react';
import './index.css';
import TableComponent from '../Table/TableComponent';
import { connect } from 'react-redux';
import Axios from 'axios';




class ClosedProjects extends React.Component {

    render() {

        return (
            <div>
                <TableComponent colList={this.props.colList} dataList={this.props.dataList.filter((element) => {
                    if (element['Status'] == 'closed')
                        return element;
                })} />
            </div>


        )
    }
}

const mapStateToProps = state => ({
    dataList: state.dataList,
    colList: state.colList
});

export default connect(
    mapStateToProps,
)(ClosedProjects);