import React from 'react'
import { connect } from 'react-redux'
import './index.css'
import LoadingScreen from './LoadingScreen/loadingScreen'
import { Input, CustomInput } from 'reactstrap'
import FileUpload from '../FileUpload/FileUpload'
import { authenticationUrl } from '../../constant'
import axios from 'axios'

export class CreateNewIncident extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      issueType: '',
      issue: '',
      issueDescription: '',
      issueFiles: '',
      isLoading: false,
      errorMsg: {
        issue: '',
        issueDescription: '',
        issueType: '',
        issueFiles: ''
      }
    }
    this.onSave = this.onSave.bind(this)
    this.saveIssue = this.saveIssue.bind(this)
    this.saveIssueFiles = this.saveIssueFiles.bind(this)
    this.saveIssueType = this.saveIssueType.bind(this)
    this.saveIssueDescription = this.saveIssueDescription.bind(this)
    this.validateFormData = this.validateFormData.bind(this)
  }

  saveIssue (e) {
    if(e.target.value.length > 0){
      this.setState({
        issue: e.target.value,
        errorMsg: {
          ...this.state.errorMsg,
          issue: ''
        }
      })
    } else {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          issue: '*It is required field!'
        }
      })
    }
  }

  saveIssueDescription (e) {
    if(e.target.value.length > 0){
      this.setState({
        issueDescription: e.target.value,
        errorMsg: {
          ...this.state.errorMsg,
          issueDescription: ''
        }
      })
    } else {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          issueDescription: '*It is required field!'
        }
      })
    }
  }

  saveIssueFiles (e) {
    if(e){
      this.setState({
        issueFiles: e,
        errorMsg: {
          ...this.state.errorMsg,
          issueFiles: ''
        }
      })
    } else {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          issueFiles: '*It is required field!'
        }
      })
    }
  }

  saveIssueType (e) {
    if(e.target.value.length > 0){
      this.setState({
        issueType: e.target.value,
        errorMsg: {
          ...this.state.errorMsg,
          issueType: ''
        }
      })
    } else {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          issueType: '*It is required field!'
        }
      })
    }
  }
  validateFormData () {
    const fields = Object.keys(this.state.errorMsg)
    let flag = false
    let cErr = this.state.errorMsg
    fields.map(field => {
      if (this.state[field] === '') {
        cErr[field] = '*it is required field'
        flag = true
      }
    })

    this.setState({
      errorMsg: cErr
    })
    return flag
  }

  async onSave () {
    if (this.validateFormData()) {
      return
    }
    this.setState({
      isLoading: true
    });
    
    const supportFormData = new FormData();
    supportFormData.append('username', this.props.username);
    supportFormData.append('issue', this.state.issue);
    supportFormData.append('issueType', this.state.issueType);
    supportFormData.append('issueDescription', this.state.issueDescription);
    const sendMailRes = await axios.post(
			`${authenticationUrl}/api/sendmail`,
      supportFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    this.setState({
      isLoading: false
    });
    this.setState({
      issueType: '',
      issue: '',
      issueDescription: '',
      issueFiles: ''
    })
  }

  render () {
    return !this.state.isLoading ? (
      <div style={{ backgroundColor: 'white', paddingRight: '100px', paddingLeft: '100px', paddingTop: '50px', paddingBottom: '200px' }}>
        <div className="row justify-content-center">
          <div className="col-12 justify-content-center">
            <h2>
							Support Details
            </h2>
            <hr />
            <div className="form-group">
              <div className="upload-label-2">Issue Type</div>
              <CustomInput type="select" id="exampleCustomSelect" name="customSelect" onChange={this.saveIssueType} placeholder="Please select issue type" required>
                <option value="">Please select your issue type</option>
                <option>Technical</option>
                <option>Business Flow</option>
                <option>Other</option>
              </CustomInput>
              <p className="text-danger font-italic">{this.state.errorMsg.issueType}</p>
            </div>
            <div className="form-group">
              <div className="upload-label-2">Issue</div>
              <Input onChange={this.saveIssue} placeholder="Please enter issue tite" required/>
              <p className="text-danger font-italic">{this.state.errorMsg.issue}</p>
            </div>
            <div className="form-group">
              <div className="upload-label-2">Issue Description</div>
              <Input type="textarea" onChange={this.saveIssueDescription} name="issueDescription" placeholder="Please enter your issue description" required/>
              <p className="text-danger font-italic">{this.state.errorMsg.issueDescription}</p>
            </div>
            <FileUpload
              onFileSelect={this.saveIssueFiles}
              multiple
            />
            <p className="text-danger font-italic">{this.state.errorMsg.issueFiles}</p>
            <hr />
            <button className="saveButton" onClick={this.onSave} type="submit">Submit</button>
          </div>
        </div>
      </div>
    ) : (
      <LoadingScreen />
    )
  }
}

const mapStateToProps = state => ({
  username: state.userName
})

export default connect(
  mapStateToProps,
  null
)(CreateNewIncident)
