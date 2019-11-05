import React from 'react';
import { connect } from 'react-redux'
import './index.css';


class FileUpload extends React.Component {
    render() {
        return (
            <div className="file-upload">
                <div className="file-select">
                    <div className="file-select-button" id="fileName">Choose File</div>
                    <div className="file-select-name" id="noFile">No file chosen...</div>
                    <input type="file" name="chooseFile" id="chooseFile" disabled={this.props.disabled} />
                </div>
            </div>
        )
    }
}

export default FileUpload;