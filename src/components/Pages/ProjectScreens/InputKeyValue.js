import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { createHashHistory } from 'history'
import './index.css';
import KeyValueTable from '../../KeyValueTable/KeyValueTable';
import InputTable from '../../InputTable/InputTable';
import TableComponent from '../../Table/TableComponent';
import DocumentHeader from '../../DocumentHeader/DocumentHeader';
const history = createHashHistory();
class InputKeyValue extends React.Component {
    onClick() {
        history.push("/Inquiry/create-new-projects/input-key-value/second");
    }
    render() {



        return (
            <div>
                <button onClick={this.onClick}>Click me</button>
                
                <TableComponent colList={this.props.colList} dataList={this.props.dataList} />
            </div>
        )
    }
}

export default InputKeyValue;