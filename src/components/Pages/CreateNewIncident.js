import React from 'react'
import { connect } from 'react-redux'
import './index.css'
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
      issueFiles: ''
    }
    this.onSave = this.onSave.bind(this)
    this.saveIssue = this.saveIssue.bind(this)
    this.saveIssueFiles = this.saveIssueFiles.bind(this)
    this.saveIssueType = this.saveIssueType.bind(this)
    this.saveIssueDescription = this.saveIssueDescription.bind(this)
  }

  saveIssue (e) {
    this.setState({
      issue: e.target.value
    })
  }

  saveIssueDescription (e) {
    this.setState({
      issueDescription: e.target.value
    })
  }

  saveIssueFiles (e) {
    this.setState({
      issueFiles: e
    })
  }

  saveIssueType (e) {
    this.setState({
      issueType: e.target.value
    })
  }

  async onSave () {
    const sendMailRes = await axios.post(
			`${authenticationUrl}/api/sendmail`,
			{
			  username: this.props.username,
			  issue: this.state.issue,
			  issueType: this.state.issueType,
			  issueDescription: this.state.issueDescription
			}
    )
    this.setState({
      issueType: '',
      issue: '',
      issueDescription: '',
      issueFiles: ''
    })
  }

  render () {
    return (
      <div style={{ backgroundColor: 'white', paddingRight: '100px', paddingLeft: '100px', paddingTop: '50px', paddingBottom: '200px' }}>
        <div className="row justify-content-center">
          <div className="col-12 justify-content-center">
            <h2>
							Support Details
            </h2>
            <hr />
            <hr />
            <div className="form-group">
              <div className="upload-label-2">Issue Type</div>
              <CustomInput type="select" id="exampleCustomSelect" name="customSelect" onChange={this.saveIssueType} placeholder="Please select issue type" required>
                <option value="">Please select your issue type</option>
                <option>Technical</option>
                <option>Business Flow</option>
                <option>Other</option>
              </CustomInput>
            </div>
            <div className="form-group">
              <div className="upload-label-2">Issue</div>
              <Input onChange={this.saveIssue} placeholder="Please enter issue tite" required/>
            </div>
            <div className="form-group">
              <div className="upload-label-2">Issue Description</div>
              <Input type="textarea" onChange={this.saveIssueDescription} name="issueDescription" placeholder="Please enter your issue description" required/>
            </div>
            <FileUpload
              onFileSelect={this.saveIssueFiles}
              multiple
            />
            <hr />
            <button className="saveButton" onClick={this.onSave} type="submit">Submit</button>
          </div>
        </div>
      </div>
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
