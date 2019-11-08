import React from 'react';
import { connect } from 'react-redux'
import { Button } from "primereact/button";
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
        // console.log(e.target.files);
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

        // readFileContent(e.target.files[0]).then(content => {
        //     target.value = content;
        //     console.log(content)
        // }).catch(error => console.log(error))

        var FileString = ''
        const FileListObj = e.target.files
        const FileList = Object.keys(FileListObj).map(function(item){
            return(FileListObj[item].name)
        })
        FileList.map(function(item){
            if(FileList.indexOf(item) === 0){
                FileString = item 
            }else{
                FileString = FileString + ', ' + item
            }
        })

        this.setState({fileName: FileList.length+" files chosen"})

    }
    render() {

        return (
            <div className={this.state.classString}>
                <div className="file-select">
                    <div className="file-select-button" id="fileName">Choose File</div>
                    <div className="file-select-name" id="noFile">{this.state.fileName}</div>
                    <input type="file" name="chooseFile" id="chooseFile" multiple="multiple" disabled={this.props.disabled} onChange={(e) => this.onChange(e)} /> 
                </div>
                {/* <span className="clear-icon"><Button icon="pi pi-replay"></Button></span>  */}
            </div>
        )
    }
}

export default FileUpload;