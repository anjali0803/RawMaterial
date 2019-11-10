import React from "react";
// import { PanelMenu } from 'primereact/panelmenu';
import "primereact/resources/primereact.min.css";
import { Messages } from "primereact/messages";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import { Redirect } from "react-router-dom";
import {
  setUserLogin,
  setUserName,
  setUserRole,
  setUserList
} from "../../actions/loginActions";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "./index.css";
import { createHashHistory } from "history";
import axios from "axios";
import { connect } from "react-redux";
import { backendUrl } from '../../constant';
const history = createHashHistory();

class SignUpPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      name: "",
      password: "",
      confirmPassword: "",
      email: "",
      department: "",
      role: ""
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

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
    const confirmPassword = this.state.confirmPassword;
    const email = this.state.email;
    const department = this.state.department;
    const userData = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      email: email,
      project: department,
    };

    if (this.state.password === this.state.confirmPassword) {
      const signUpRes = await axios.post(
        `${backendUrl}/auth/register_user`,
        userData
      )
      history.push("/login");
    } else {
      this.messages.show({
        severity: "error",
        summary: "Error Message",
        detail: "Password confirmation failed"
      });
    }
  }

  render() {
    return (
      <div className="main-container">
        <div className="sign-up-page">
          <div className="sign-up-container">
            <div className="p-grid p-fluid">
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText
                    placeholder="Username"
                    name="username"
                    type="text"
                    onChange={this.handleInputChange}
                    value={this.state.username}
                  />
                </div>
              </div>
              <br />
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-user"></i>
                  </span>
                  <InputText
                    placeholder="Name"
                    name="name"
                    type="text"
                    onChange={this.handleInputChange}
                    value={this.state.name}
                  />
                </div>
              </div>
              <br />
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-key"></i>
                  </span>
                  <InputText
                    placeholder="Password"
                    name="password"
                    type="password"
                    onChange={this.handleInputChange}
                    value={this.state.password}
                  />
                </div>
              </div>
              <br />
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-lock"></i>
                  </span>
                  <InputText
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    onChange={this.handleInputChange}
                    value={this.state.confirmPassword}
                  />
                  <Messages
                    severity="error"
                    text="Password didn't match"
                  ></Messages>
                </div>
              </div>
              <br />
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-envelope"></i>
                  </span>
                  <InputText
                    placeholder="E-mail"
                    name="email"
                    type="email"
                    onChange={this.handleInputChange}
                    value={this.state.email}
                  />
                </div>
              </div>
              <br />
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-home"></i>
                  </span>
                  <InputText
                    placeholder="Department"
                    name="department"
                    type="text"
                    onChange={this.handleInputChange}
                    value={this.state.department}
                  />
                </div>
              </div>
            <br />
            </div>
            <br />
            <div className="sign-in-container">
              <Button label="Sign Up" onClick={this.handleSignUp} />
            </div>
            <br />
            <Messages ref={el => (this.messages = el)}></Messages>
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
