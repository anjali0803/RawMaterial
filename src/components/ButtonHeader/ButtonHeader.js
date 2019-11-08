import React from "react";
import { Button } from 'primereact/button';
import './index.css'



class ButtonHeader extends React.Component {
    render() {
        return (
            <div className="button-header">
                <div className="save-container" >
                    <Button className="save-button" type="button" label="save" icon="pi pi-check" onClick={this.props.onSave} disabled={!this.props.saveEnabled} />
                </div>

                <div className="delete-container" >
                    <Button className="delete-button" type="button" label="delete" icon="pi pi-times" onClick={this.props.onDelete} disabled={!this.props.deleteEnabled} />
                </div>

            </div>
        )
    }
}

export default ButtonHeader;