import React from 'react';
import { connect } from 'react-redux'
import './index.css';

class FileUpload extends React.Component {
    constructor() {
        super();
        this.state = {
            fileName: 'No file chosen...',
            classString: 'file-upload'

        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        if (!e.target.value)
            return;
        console.log(e.target.files[0]);
        if (this.state.classString.search('active') === -1) {
            this.setState({ classString: this.state.classString + ' active' })
        }
        
        const reader = new FileReader()
        const readFileContent = (file) => {
            return new Promise((resolve, reject) => {
                reader.onload = event => resolve(event.target.result)
                reader.onerror = error => reject(error)
                reader.readAsText(file)
            })
        }

        readFileContent(e.target.files[0]).then(content => {
            target.value = content;
            //console.log(content)
        }).catch(error => console.log(error))


        this.setState({ fileName: e.target.value.substring(e.target.value.lastIndexOf('\\') + 1) })

    }
    render() {

        return (
            <div className={this.state.classString}>
                <div className="file-select">
                    <div className="file-select-button" id="fileName">Choose File</div>
                    <div className="file-select-name" id="noFile">{this.state.fileName}</div>
                    <input type="file" name="chooseFile" id="chooseFile" disabled={this.props.disabled} onChange={(e) => this.onChange(e)} />
                </div>
            </div>
        )
    }
}

export default FileUpload;