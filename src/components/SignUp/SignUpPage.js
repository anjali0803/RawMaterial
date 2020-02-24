import React from "react";
// import { PanelMenu } from 'primereact/panelmenu';
import "primereact/resources/primereact.min.css";
import { Messages } from "primereact/messages";
import { Message } from "primereact/message";
import { Password } from "primereact/password";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import FormValidator from '../FormValidator/FormValidator';
import { Redirect } from "react-router-dom";
import {
  setUserLogin,
  setUserName,
  setUserRole,
} from "../../actions/loginActions";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "./index.css";
import { createHashHistory } from "history";
import axios from "axios";
import { connect } from "react-redux";
import { authenticationUrl } from '../../constant';
import { Link } from 'react-router-dom';
import { Row } from 'reactstrap';
const history = createHashHistory();

class SignUpPage extends React.Component {
  constructor() {
    super();
    
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
    ]);

    this.state = {
      username: "",
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
      department: "",
      role: ""
    };

    this.submitted = false;
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  passwordMatch(confirmation, state) {return(state.password === confirmation)}

  componentDidMount() {
    // this.getUserInfo();
    const referer = this.props.location.state || "/";
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");
    if (isAuthenticated == "true") {
      this.props.setUserLogin(true);
      this.props.setUserName(username);
      this.props.setUserRole(role);
      history.push(referer);
    }
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  async handleSignUp() {
    const username = this.state.username;
    const name = this.state.name;
    const password = this.state.password;
    const confirmPassword = this.state.password;
    const email = this.state.email;
    const department = this.state.department;
    const userData = {
      username: username,
      password: password,
      email: email,
    };

    if (this.state.password === this.state.confirmPassword) {
      const signUpRes = await axios.post(
        `${authenticationUrl}/api/adduser`,
        userData,
        {
          headers: {
            'Content-Type' : 'application/json'
          }
        }
      )
    // if (this.state.password === this.state.confirmpassword) {
    //   history.push("/login");
    // } else {
    //   this.messages.show({
    //     severity: "error",
    //     summary: "Error Message",
    //     detail: "Password confirmation failed"
    //   });
    // }

    const validation = this.validator.validate(this.state);
    this.setState({ validation });
    this.submitted = true;

    if (validation.isValid) {
      history.push("/login");
    }
  }
  }

  render() {
    // const validUsername = this.state.username !== ""
    // const validName = this.state.name !== ""
    // const validPassword = this.state.password !== ""
    // const validConfirmPassword = this.state.confirmpassword !== ""
    // const validEmail = this.state.email !== ""
    // const validDepartment = this.state.department !== ""
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation;
    return (
      <Row>
        <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100">
                
                  <div className="wrap-input100 validate-input">
                    <input className="input100 has-val" type="text" name="username" onChange={this.handleInputChange} value={this.state.username}/>
                    <span className="focus-input100" data-placeholder="Username"></span>
                  </div>

                  <div className="wrap-input100 validate-input">
                    <input className="input100 has-val" type="text" name="name" onChange={this.handleInputChange} value={this.state.name}/>
                    <span className="focus-input100" data-placeholder="Name"></span>
                  </div>


                  <div className="wrap-input100 validate-input">
                    <input className="input100 has-val" type="password" name="password" onChange={this.handleInputChange} value={this.state.password} />
                    <span className="focus-input100" data-placeholder="Password"></span>
                  </div>

                 <div className="wrap-input100 validate-input">
                    <input className="input100 has-val" type="password" name="confirmPassword" onChange={this.handleInputChange} value={this.state.confirmPassword} />
                    <span className="focus-input100" data-placeholder="Confirm Password"></span>
                  </div>

                  <div className="wrap-input100 validate-input">
                    <input className="input100 has-val" type="email" name="email" onChange={this.handleInputChange} value={this.state.email}/>
                    <span className="focus-input100" data-placeholder="Email"></span>
                  </div>


                  <div className="wrap-input100 validate-input">
                    <input className="input100 has-val" type="text" name="department" onChange={this.handleInputChange} value={this.state.department}/>
                    <span className="focus-input100" data-placeholder="Department"></span>
                  </div>

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
    );
  };
}

const mapStateToProps = state => ({
  userLogin: state.userLogin,
  userName: state.userName,
  userRole: state.userRole,
  userList: state.userList
});

const mapDispatchToProps = dispatch => ({
  setUserLogin: userLogin => dispatch(setUserLogin(userLogin)),
  setUserName: userName => dispatch(setUserName(userName)),
  setUserRole: userRole => dispatch(setUserRole(userRole)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPage);
