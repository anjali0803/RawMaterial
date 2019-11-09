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
  setUserList
} from "../../actions/loginActions";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./index.css";
import { createHashHistory } from "history";
import axios from "axios";
import { connect } from "react-redux";
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
        message: 'Password confirmation is required.'
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
      confirmpassword: "",
      email: "",
      department: "",
      validation: this.validator.valid(),
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
    const confirmpassword = this.state.confirmpassword;
    const email = this.state.email;
    const department = this.state.department;
    console.log("userData", {
      username: username,
      name: name,
      password: password,
      email: email,
      department: department
    });

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

  render() {
    // const validUsername = this.state.username !== ""
    // const validName = this.state.name !== ""
    // const validPassword = this.state.password !== ""
    // const validConfirmPassword = this.state.confirmpassword !== ""
    // const validEmail = this.state.email !== ""
    // const validDepartment = this.state.department !== ""
    let validation = this.submitted ? this.validator.validate(this.state) : this.state.validation
    return (
      <div className="main-container">
        <div className="sign-up-page">
          <div className="sign-up-container">
            <div
              className="p-inputgroup"
              style={{ marginTop: "30px", paddingLeft: ".5em" }}
            >
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                placeholder="Username"
                name="username"
                type="text"
                onChange={this.handleInputChange}
                value={this.state.username}
                className={validation.username.isInvalid ? "p-error" : ""}
                style={{ marginRight: ".25em" }}
              />
              {validation.username.isInvalid ? <Message className="validation-msg" severity="error" text={validation.username.message} /> : null}
            </div>
            <div
              className="p-inputgroup"
              style={{ marginTop: "30px", paddingLeft: ".5em" }}
            >
              <span className="p-inputgroup-addon">
                <i className="pi pi-user"></i>
              </span>
              <InputText
                placeholder="Name"
                name="name"
                type="text"
                onChange={this.handleInputChange}
                value={this.state.name}
                className={validation.name.isInvalid ? "p-error" : ""}
                style={{ marginRight: ".25em" }}
              />
              {validation.name.isInvalid ? <Message className="validation-msg" severity="error" text={validation.name.message} /> : null}
            </div>
            <div
              className="p-inputgroup"
              style={{ marginTop: "30px", paddingLeft: ".5em" }}
            >
              <span className="p-inputgroup-addon">
                <i className="pi pi-key"></i>
              </span>
              <Password
                placeholder="Password"
                name="password"
                type="password"
                onChange={this.handleInputChange}
                value={this.state.password}
                className={validation.password.isInvalid ? "p-error" : ""}
                style={{ marginRight: ".25em" }}
              />
              {validation.password.isInvalid ? <Message className="validation-msg" severity="error" text={validation.password.message} /> : null}
            </div>
            <div
              className="p-inputgroup"
              style={{ marginTop: "30px", paddingLeft: ".5em" }}
            >
              <span className="p-inputgroup-addon">
                <i className="pi pi-lock"></i>
              </span>
              <InputText
                placeholder="Confirm Password"
                name="confirmpassword"
                type="password"
                onChange={this.handleInputChange}
                value={this.state.confirmpassword}
                className={validation.confirmpassword.isInvalid ? "p-error" : ""}
                style={{ marginRight: ".25em" }}
              />
              {validation.confirmpassword.isInvalid ? <Message className="validation-msg" severity="error" text={validation.confirmpassword.message} /> : null}
            </div>
            <div
              className="p-inputgroup"
              style={{ marginTop: "30px", paddingLeft: ".5em" }}
            >
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope"></i>
              </span>
              <InputText
                placeholder="E-mail"
                name="email"
                type="email"
                onChange={this.handleInputChange}
                value={this.state.email}
                className={validation.email.isInvalid ? "p-error" : ""}
                style={{ marginRight: ".25em" }}
              />
              {validation.email.isInvalid ? <Message className="validation-msg" severity="error" text={validation.email.message} /> : null}
            </div>
            <div
              className="p-inputgroup"
              style={{ marginTop: "30px", paddingLeft: ".5em" }}
            >
              <span className="p-inputgroup-addon">
                <i className="pi pi-home"></i>
              </span>
              <InputText
                placeholder="Department"
                name="department"
                type="text"
                onChange={this.handleInputChange}
                value={this.state.department}
                style={{ marginRight: ".25em" }}
              />
              {/* {validation.department.isInvalid ? <Message className="validation-msg" severity="error" text={validation.department.message} /> : null} */}
            </div>
            <br />
            <div className="sign-in-container">
              <Button label="Sign Up" onClick={this.handleSignUp} />
            </div>
            {/* <br />
            <Messages ref={el => (this.messages = el)}></Messages> */}
          </div>
        </div>
      </div>
    );
  }
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
  setUserList: userList => dispatch(setUserList(userList))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPage);
