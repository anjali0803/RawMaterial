import React from "react";
import { createHashHistory } from 'history'
import TableComponent from '../../components/Table/TableComponent'
import './index.css'
const history = createHashHistory();

class InputTable extends React.Component {
    onClick() {
        history.push("/Inquiry/create-new-projects/input-key-value/second");
    }
    render() {
        return (
            <div >
                <TableComponent colList={this.props.colList} dataList={this.props.dataList} />
            </div>
        )
    }
}
export default InputTable;