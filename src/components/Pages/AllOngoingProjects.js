import React from 'react';
import './index.css';
import TableComponent from '../Table/TableComponent';
import { connect } from 'react-redux';

class AllOngoingProjects extends React.Component {


    render() {
        return (
            <div>
                <TableComponent
                    colList={this.props.colList}
                    dataList={this.props.dataList} />
            </div>
        )
    }
}
const mapStateToProps = state => ({
    dataList: state.dataList,
    colList: state.colList
});
export default connect(
    mapStateToProps
)(AllOngoingProjects)