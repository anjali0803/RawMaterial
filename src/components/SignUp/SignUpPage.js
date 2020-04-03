import React from 'react'
// import { PanelMenu } from 'primereact/panelmenu';
import 'primereact/resources/primereact.min.css'
import { Messages } from 'primereact/messages'
import { Message } from 'primereact/message'
import { Password } from 'primereact/password'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/nova-light/theme.css'
import FormValidator from '../FormValidator/FormValidator'
import { Redirect, Link } from 'react-router-dom'
import {
  setUserLogin,
  setUserName,
  setUserRole
} from '../../actions/loginActions'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import './index.css'
import { createHashHistory } from 'history'
import axios from 'axios'
import { connect } from 'react-redux'
import { authenticationUrl } from '../../constant'

import { Row } from 'reactstrap'
const history = createHashHistory()

class SignUpPage extends React.Component {
  constructor () {
    super()

    this.validator = new FormValidator([
      {
        field: 'username',
        method: 'isEmpty',
        validWhen: false,
        message: 'username is required.'
      },
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'name is required.'
      },
      {
        field: 'password',
        method: 'isEmpty',
        validWhen: false,
        message: 'password is required.'
      },
      {
        field: 'confirmpassword',
        method: 'isEmpty',
        validWhen: false,
        message: 'Passwords do not match.'
      },
      {
        field: 'confirmpassword',
        method: this.passwordMatch,
        validWhen: true,
        message: 'Password and password confirmation do not match.'
      },
      // {
      //   field: 'email',
      //   method: 'isEmpty',
      //   validWhen: false,
      //   message: 'email is required.'
      // },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'That is not a valid email.'
      }
    ])

    this.state = {
      signUpResErrorMsg: '',
      username: '',
      name: '',
      password: '',
      userType: '',
      email: '',
      department: '',
      role: '',
      errorMsg: {
        username: '',
        name: '',
        password: '',
        userType: '',
        email: '',
        department: ''
      }
    }

    this.submitted = false
    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.validateFormData = this.validateFormData.bind(this)
  }

  passwordMatch (confirmation, state) { return (state.password === confirmation) }

  componentDidMount () {
    // this.getUserInfo();
    const referer = this.props.location.state || '/'
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    const username = localStorage.getItem('username')
    const role = localStorage.getItem('role')
    if (isAuthenticated == 'true') {
      this.props.setUserLogin(true)
      this.props.setUserName(username)
      this.props.setUserRole(role)
      history.push(referer)
    }
  }

  handleInputChange (e) {
    const name = e.target.name
    const value = e.target.value

    this.setState({
      [name]: value,
      errorMsg: {
        ...this.state.errorMsg,
        [name]: ''
      }
    })
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

  
  async handleSignUp () {
    if (this.validateFormData()) {
      return
    }
    const username = this.state.username
    const name = this.state.name
    const password = this.state.password
    const userType = this.state.userType
    const email = this.state.email
    const department = this.state.department
    const userData = {
      username: username,
      department: department,
      is_admin: (userType.toLowerCase() === 'admin') ? true : false, 
      password: password,
      email: email,
      name: name,
    }

    if (true) {
      const signUpRes = await axios.post(
        `${authenticationUrl}/api/adduser`,
        userData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      
        switch(signUpRes.data.status_code){
          case 1:
            history.push('/login')
          case 2:
            this.setState({
              signUpResErrorMsg: 'User already exist. Please try to put different credentials'
            })
            return
          case 3:
            this.setState({
              signUpResErrorMsg: 'User already exist. Please try to put different credentials'
            })
            return
          default:
            history.push('/login')
        }
    }
  }

  render () {

    const validation = this.submitted ? this.validator.validate(this.state) : this.state.validation
    return (
      <Row>
        <div className="limiter">
          <div className="container-login100">
            <div className="wrap-login100">

              <div className="wrap-input100 validate-input">
                <label>
                  Username
                </label>
                <input className="input100 has-val" type="text" name="username" onChange={this.handleInputChange} value={this.state.username}/>
              </div>
                <p className="text-danger font-italic">{this.state.errorMsg.username}</p>

              <div className="wrap-input100 validate-input">
                <label>
                  Name
                </label>
                <input className="input100 has-val" type="text" name="name" onChange={this.handleInputChange} value={this.state.name}/>
              </div>
                <p className="text-danger font-italic">{this.state.errorMsg.name}</p>

              <div className="wrap-input100 validate-input">
                <label>
                  Password
                </label>
                <input className="input100 has-val" type="password" name="password" onChange={this.handleInputChange} value={this.state.password} />
              </div>
                <p className="text-danger font-italic">{this.state.errorMsg.password}</p>

              <div className="wrap-input100 validate-input">
                <label>
                  User Type
                </label>
                <select className="input100 has-val" name="userType" style={{border: 'none'}} onChange={this.handleInputChange} value={this.state.userType}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
                <p className="text-danger font-italic">{this.state.errorMsg.userType}</p>

              <div className="wrap-input100 validate-input">
                <label>
                  Email
                </label>
                <input className="input100 has-val" type="email" name="email" onChange={this.handleInputChange} value={this.state.email}/>
              </div>
                <p className="text-danger font-italic">{this.state.errorMsg.email}</p>

              <div className="wrap-input100 validate-input">
                <label>
                  Department
                </label>
                <input className="input100 has-val" type="text" name="department" onChange={this.handleInputChange} value={this.state.department}/>
              </div>
                <p className="text-danger font-italic">{this.state.errorMsg.department}</p>


                {this.state.signUpResErrorMsg && <p className="text-danger font-italic">{this.state.signUpResErrorMsg}</p>}
              <div className="container-login100-form-btn">
                <div className="wrap-login100-form-btn">
                  <div className="login100-form-bgbtn"></div>
                  <button className="login100-form-btn" onClick={this.handleSignUp}>
                        Sign Up
							        </button>
                </div>
              </div>

              <div className="text-center p-t-115">
                <span className="txt1">
                      Already have an account?&nbsp;
						        </span>
                <Link className="txt2" to='/login'>Login</Link>
              </div>
            </div>
          </div>
        </div>
      </Row>
    )
  };
}

const mapStateToProps = state => ({
  userLogin: state.userLogin,
  userName: state.userName,
  userRole: state.userRole,
  userList: state.userList
})

const mapDispatchToProps = dispatch => ({
  setUserLogin: userLogin => dispatch(setUserLogin(userLogin)),
  setUserName: userName => dispatch(setUserName(userName)),
  setUserRole: userRole => dispatch(setUserRole(userRole))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPage)
