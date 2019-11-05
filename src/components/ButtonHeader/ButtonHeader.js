import React from "react";
import { Button } from 'primereact/button';
import './index.css'



class ButtonHeader extends React.Component {
    render() {
        return (
            <div className="button-header">

                {this.props.saveEnabled ? <Button type="button" label="save" icon="pi pi-check" onClick={this.props.onSave} /> : null}
                {this.props.deleteEnabled ? <Button type="button" label="delete" icon="pi pi-times" onClick={this.props.onDelete} /> : null}

            </div>
        )
    }
}

export default ButtonHeader;