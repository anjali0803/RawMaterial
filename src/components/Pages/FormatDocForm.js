import React from 'react'
import { connect } from 'react-redux'
import './index.css'
import { Dialog } from 'primereact/dialog';
import { Input } from 'reactstrap'
import { authenticationUrl, backendUrl } from '../../constant'
import axios from 'axios'

export class FormatDocForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      itpFormat: '',
      rmtsFormat: '',
      csFormat: ''
    }
    this.onSave = this.onSave.bind(this)
    this.saveITPFormat = this.saveITPFormat.bind(this)
    this.saveRMTSFormat = this.saveRMTSFormat.bind(this)
    this.saveCSFormat = this.saveCSFormat.bind(this)
  }

  async componentDidMount () {
    this.setState({ isLoading: true })
    const res = await axios.get(`${backendUrl}/dashboard/get_format_number`)
    const data = res.data
    this.setState({
      itpFormat: data.data.itpFormat,
      rmtsFormat: data.data.rmtsFormat,
      csFormat: data.data.csFormat,
      visible: false
    })
    this.setState({ isLoading: false })
  }

  saveITPFormat (e) {
    this.setState({
      itpFormat: e.target.value
    })
  }

  saveRMTSFormat (e) {
    this.setState({
      rmtsFormat: e.target.value
    })
  }

  saveCSFormat (e) {
    this.setState({
      csFormat: e.target.value
    })
  }

  async onSave () {
    this.setState({
      visible: true
    })
    const formatRes = await axios.post(
			`${authenticationUrl}/api/sendmail`,
			{
			  itp_format: this.state.itpFormat,
			  rmts_format: this.state.rmtsFormat,
			  cs_format: this.state.csFormat
			}
    )
    if (formatRes) {
      this.setState({
        visible: false
      })
    }
    this.setState({
      itpFormat: '',
      rmtsFormat: '',
      csFormat: ''
    })
  }

  render () {
    return (
      <div style={{ backgroundColor: 'white', paddingRight: '100px', paddingLeft: '100px', paddingTop: '50px', paddingBottom: '200px' }}>
        <div className="row justify-content-center">
          <div className="col-12 justify-content-center">
            <h2>Format Document Form</h2>
            <hr />
            <hr />
            <div className="form-group">
              <div className="upload-label-2">ITP Format Number</div>
              <Input onChange={this.saveITPFormat} placeholder="Please enter issue ITP format" required/>
            </div>
            <div className="form-group">
              <div className="upload-label-2">RMTS Format Number</div>
              <Input onChange={this.saveRMTSFormat} placeholder="Please enter issue RMTS format" required/>
            </div>
            <div className="form-group">
              <div className="upload-label-2">Comment Sheet Format Number</div>
              <Input onChange={this.saveCSFormat} placeholder="Please enter issue CS format" required/>
            </div>
            <button className="saveButton" onClick={this.onSave} type="submit">Update Format</button>
            <Dialog header="Please Wait..." visible={this.state.visible} style={{ width: '50vw' }} modal={true}>
              Your response is getting submitted!!
            </Dialog>
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
)(FormatDocForm)
