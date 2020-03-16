import React from 'react'
import 'primereact/resources/themes/nova-light/theme.css'
import {
  setUserLogin,
  setUserName,
  setUserRole
} from '../../actions/loginActions'
import { connect } from 'react-redux'
import { Menu } from 'primereact/menu'
import { Dialog } from 'primereact/dialog'
import { Input } from 'reactstrap'
import { Password } from 'primereact/password';
import './index.css'
import Axios from 'axios'
import { authenticationUrl } from '../../constant'

class TopBanner extends React.Component {
  constructor () {
    super()
    this.state = {
      displayUpdateForm: false,
      name: '',
      designation: '',
      department: '',
      oldPassword: '',
      newPassword: ''
    }
    this.showUpdateProfileForm = this.showUpdateProfileForm.bind(this)
    this.logout = this.logout.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.saveDepartment = this.saveDepartment.bind(this)
    this.saveName = this.saveName.bind(this)
    this.saveOldPassword = this.saveOldPassword.bind(this)
    this.saveNewPassword = this.saveNewPassword.bind(this)
    this.saveDesignation = this.saveDesignation.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
  }

  saveName (e) {
    this.setState({
      name: e.target.value
    })
  }

  saveOldPassword (e) {
    this.setState({
      oldPassword: e.target.value
    })
  }

  saveNewPassword (e) {
    this.setState({
      newPassword: e.target.value
    })
  }

  saveDesignation (e) {
    this.setState({
      designation: e.target.value
    })
  }

  saveDepartment (e) {
    this.setState({
      department: e.target.value
    })
  }

  showUpdateProfileForm () {
    this.setState({
      displayUpdateForm: true
    })
  }

  logout () {
    this.props.setUserLogin(false)
    localStorage.setItem('isAuthenticated', 'false')
  }

  updateProfile () {
    const updateProfileRes = axios.put(
      `${authenticationUrl}/api/updateprofile`,{
        username: this.state.username,
        name: this.state.name,
        role: this.state.designation,
        department: this.state.department
      }
    )
  }

  renderFooter () {
    return (
      <div>
        <button type="button" className="btn btn-primary" onClick={this.updateProfile}>Update Profile</button>
      </div>
    )
  }

  render () {
    return (
      <>
        <Dialog header="Update Profile" visible={this.state.displayUpdateForm} style={{ width: '50vw' }} onHide={() => this.setState({ displayUpdateForm: false }) } footer={this.renderFooter('displayBasic')}>
          <div className="form-group">
            <div className="upload-label-2">Name</div>
            <Input value={this.state.name} onChange={this.saveName} placeholder="Please enter name" required/>
          </div>
          <div className="form-group">
            <div className="upload-label-2">Designation</div>
            <Input value={this.state.designation} onChange={this.saveDesignation} placeholder="Please enter designation" required/>
          </div>
          <div className="form-group">
            <div className="upload-label-2">Department</div>
            <Input value={this.state.department} onChange={this.saveDepartment} placeholder="Please enter issue CS format" required/>
          </div>
          {/* <div className="form-group">
            <div className="upload-label-2">Old Password</div>
            <Password value={this.state.oldPassword} onChange={this.saveOldPassword} placeholder="Please enter old password" />
          </div>
          <div className="form-group">
            <div className="upload-label-2">New Password</div>
            <Password value={this.state.newPassword} onChange={this.saveNewPassword} placeholder="Please enter new password" required/>
          </div> */}
        </Dialog>
        <div className="banner">
          <div className="logo">
          Welspun
          </div>
          <div className="banner-heading-primary">
                    Customer Inquiry Process
            <span className="copyright">
                    &copy; by
              <a href="https://www.matsci.ai/" target="_blank" className="copyright-link"> MatSci AI</a>
            </span>
          </div>
          {this.props.userLogin ? <>
            <div className="sign-out-icon">
              <div className="userProfileButton" onClick={(event) => this.menu.toggle(event)}>
                <Menu model={[
                  {
                    items: [{ label: 'Update Profile', icon: '', command: () => { this.showUpdateProfileForm() } },
                      { label: 'Logout', icon: '', command: () => { this.logout() } }]
                  }
                ]} popup={true} ref={el => this.menu = el} />
              </div>
              <i className="pi pi-sign-out" onClick={() => this.logout()} style={{ fontSize: 40, paddingTop: '5px' }}></i>
            </div></> : null}

        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  userLogin: state.userLogin,
  userName: state.userName,
  userRole: state.userRole
})

const mapDispatchToProps = dispatch => ({
  setUserLogin: userLogin => dispatch(setUserLogin(userLogin)),
  setUserName: userName => dispatch(setUserName(userName)),
  setUserRole: userRole => dispatch(setUserRole(userRole))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopBanner)
