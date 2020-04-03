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
import { Checkbox } from 'primereact/checkbox'
import { Password } from 'primereact/password'
import { Messages } from 'primereact/messages'
import { get } from 'lodash-es'
import './index.css'
import axios from 'axios'
import { authenticationUrl } from '../../constant'
import LoadingScreen from '../../components/Pages/LoadingScreen/loadingScreen'

class TopBanner extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      displayUpdateForm: false,
      name: get(this.props, 'userData.name', ''),
      designation: get(this.props, 'userData.role', ''),
      department: get(this.props, 'userData.department', ''),
      mobileNumber: get(this.props, 'userData.mobileNumber', ''),
      oldPassword: '',
      newPassword: '',
      updatePasswordCheck: false,
      errorMsgs: {
        name: '',
        designation: '',
        department: '',
        mobileNumber: '',
        oldPassword: '',
        newPassword: ''
      },
      buttonDisabled: false,
      message: null
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
    this.saveMobileNumber = this.saveMobileNumber.bind(this)
  }

  saveName (e) {
    if (e.target.value.length > 0) {
      this.setState({
        errorMsgs: {
          ...this.state.errorMsgs,
          name: ''
        }
      })
    }
    this.setState({
      name: e.target.value
    })
  }

  saveMobileNumber (e) {
    if (e.target.value.length > 0) {
      this.setState({
        errorMsgs: {
          ...this.state.errorMsgs,
          mobileNumber: ''
        }
      })
    }
    this.setState({
      mobileNumber: e.target.value
    })
  }

  saveOldPassword (e) {
    if (e.target.value.length > 0) {
      this.setState({
        errorMsgs: {
          ...this.state.errorMsgs,
          oldPassword: ''
        }
      })
    }
    this.setState({
      oldPassword: e.target.value
    })
  }

  saveNewPassword (e) {
    if (e.target.value.length > 0) {
      this.setState({
        errorMsgs: {
          ...this.state.errorMsgs,
          newPassword: ''
        }
      })
    }
    this.setState({
      newPassword: e.target.value
    })
  }

  saveDesignation (e) {
    if (e.target.value.length > 0) {
      this.setState({
        errorMsgs: {
          ...this.state.errorMsgs,
          designation: ''
        }
      })
    }
    this.setState({
      designation: e.target.value
    })
  }

  saveDepartment (e) {
    if (e.target.value.length > 0) {
      this.setState({
        errorMsgs: {
          ...this.state.errorMsgs,
          department: ''
        }
      })
    }
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

  vaildateForm () {
    let fields = Object.keys(this.state.errorMsgs)
    let flag = false
    const cErr = this.state.errorMsgs
    if (!this.state.updatePasswordCheck) {
      fields = fields.slice(0, 4)
    }
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

  async updateProfile () {
    if (this.vaildateForm()) {
      return
    }
    this.setState({
      buttonDisabled: true
    })
    let requestBody = {
      username: this.props.userName,
      name: this.state.name,
      role: this.state.designation,
      department: this.state.department
    }
    if (this.state.updatePasswordCheck) {
      requestBody = {
        ...requestBody,
        password: this.state.oldPassword,
        new_password: this.state.newPassword
      }
    }

    const updateProfileRes = await axios.put(
      `${authenticationUrl}/api/updateprofile`, {
        ...requestBody
      }
    )

    this.setState({
      buttonDisabled: false
    })

    if (updateProfileRes.data.status_code === 1) {
      this.setState({
        message: {
          className: 'success',
          text: 'Your details are updated'
        }
      })
    } else {
      this.setState({
        message: {
          className: 'danger',
          text: 'Some issur occured!!'
        }
      })
    }
    setTimeout(() => {
      this.setState({
        message: null
      })
      this.resetForm()
    }, 5000)
  }

  renderFooter () {
    return (
      <div>
        { this.state.buttonDisabled ? <button type="button" className="btn btn-primary" onClick={this.updateProfile} disabled>Update Profile</button> : <button type="button" className="btn btn-primary" onClick={this.updateProfile}>Update Profile</button>}
      </div>
    )
  }

  resetForm () {
    this.setState({
      displayUpdateForm: false,
      oldPassword: '',
      newPassword: '',
      errorMsgs: {
        name: '',
        designation: '',
        department: '',
        oldPassword: '',
        newPassword: '',
        mobileNumber: ''
      }
    })
  }

  render () {
    return (
      <>
        <Dialog header="Update Profile" visible={this.state.displayUpdateForm} style={{ width: '50vw' }} onHide={() => this.resetForm() } footer={this.renderFooter()}>
          <form>
            <div className="form-group">
              <div className="upload-label-2">Name</div>
              <Input value={this.state.name} onChange={this.saveName} placeholder="Please enter name" required/>
              <p className="text-danger font-italic">{this.state.errorMsgs.name}</p>
            </div>
            <div className="form-group">
              <div className="upload-label-2">Mobile Number</div>
              <Input value={this.state.mobileNumber} keyfilter="num" maxlength={10} onChange={this.saveMobileNumber} placeholder="Please enter your mobile number" required/>
              <p className="text-danger font-italic">{this.state.errorMsgs.mobileNumber}</p>
            </div>
            <div className="form-group">
              <div className="upload-label-2">Designation</div>
              <Input value={this.state.designation} onChange={this.saveDesignation} placeholder="Please enter designation" required/>
              <p className="text-danger font-italic">{this.state.errorMsgs.designation}</p>
            </div>
            <div className="form-group">
              <div className="upload-label-2">Department</div>
              <Input value={this.state.department} onChange={this.saveDepartment} placeholder="Please enter department" required/>
              <p className="text-danger font-italic">{this.state.errorMsgs.department}</p>
            </div>
            <Checkbox onChange={e => this.setState({ updatePasswordCheck: e.checked })} checked={this.state.updatePasswordCheck}></Checkbox>
            <label className="p-checkbox-label">Do you want to change your password?</label>
            { this.state.updatePasswordCheck ? <><div className="form-group">
              <div className="upload-label-2">Old Password</div>
              <Password value={this.state.oldPassword} onChange={this.saveOldPassword} placeholder="Please enter old password" />
              <p className="text-danger font-italic">{this.state.errorMsgs.oldPassword}</p>
            </div>
            <div className="form-group">
              <div className="upload-label-2">New Password</div>
              <Password value={this.state.newPassword} onChange={this.saveNewPassword} placeholder="Please enter new password" required/>
              <p className="text-danger font-italic">{this.state.errorMsgs.newPassword}</p>
            </div>
            { this.state.message && <div className={`alert alert-${this.state.message.className}`} role="alert">
              {this.state.message.text}
            </div>}
            </> : ''}
          </form>
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
            <div style={{ position: 'absolute', right: '60px', cursor: 'auto'}} className="sign-out-icon">{this.props.userName}</div>
            <div className="sign-out-icon">
              <div className="userProfileButton" onClick={(event) => this.menu.toggle(event)}>
                <Menu model={[
                  {
                    items: [{ label: 'Update Profile', icon: '', command: () => { this.showUpdateProfileForm() } },
                      { label: 'Logout', icon: '', command: () => { this.logout() } }]
                  }
                ]} popup={true} ref={el => this.menu = el} />
              </div>
            </div></> : null}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  userLogin: state.userLogin,
  userName: state.userName,
  userRole: state.userRole,
  userData: state.userData
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
