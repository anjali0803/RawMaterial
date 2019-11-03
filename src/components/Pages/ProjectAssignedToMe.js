import React from 'react';
import TableComponent from '../Table/TableComponent';
import './index.css';
import Axios from 'axios';
import { setDataList } from '../../actions/dataActions'
import { connect } from 'react-redux';




class ProjectAssignedToMe extends React.Component {

    render() {
        return (
            <div>
                <TableComponent
                    colList={this.props.colList.filter(element => {
                        if (element.field != 'AssignedTo') {
                            return element;
                        }
                    })}

                    dataList={this.props.dataList.filter((element) => {
                        if (element['AssignedTo'] == 'user1')
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
)(ProjectAssignedToMe);