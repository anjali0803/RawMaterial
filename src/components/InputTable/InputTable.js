import React from "react";
import { createHashHistory } from 'history'
import './index.css'
const history = createHashHistory();

class InputTable extends React.Component {
    onClick() {
        history.push("/Inquiry/create-new-projects/input-key-value/second");
    }
    render() {
        return (
            <div onClick={this.onClick}>First Screen</div>
        )
    }
}
export default InputTable;