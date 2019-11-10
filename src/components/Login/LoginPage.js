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
import { Button } from "primereact/button";
import "./index.css";
import { createHashHistory } from "history";
import axios from "axios";
import { connect } from "react-redux";
import { backendUrl } from '../../constant';
// axios.defaults.withCredentials = true;

const history = createHashHistory();

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
      role: ""
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async getUserInfo() {
    const userList = await axios.get(
      `${backendUrl}/dashboard/users`
    );
    this.props.setUserList(userList.data);
  }

  componentDidMount() {
    this.getUserInfo();
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

  async handleSignIn() {
    const username = this.state.username;
    const password = this.state.password;
    const role = this.state.role;
    const referer = this.props.location.state || "/";

    const loginResponse = await axios.post(
      `${backendUrl}/auth/login`,
      {
        username: username,
        password: password
      }
    )

    if (loginResponse) {
      if (loginResponse.data.code === 0) {
        await this.props.setUserLogin(true);        
        await this.props.setUserName(loginResponse.data.username);
        await this.props.setUserRole(loginResponse.data.is_superuser ? 'admin' : '');

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", loginResponse.data.username);
        localStorage.setItem("role", loginResponse.data.is_superuser ? 'admin' : '');
        history.push(referer);
      }
      if(loginResponse.data.code === 2) {
        this.messages.show({
          closable: false,
          severity: "error",
          summary: "Your username or password is incorrect!",
          // detail: "Order submitted"
        });
      }
      if(loginResponse.data.code === 1) {
        this.messages.show({
          closable: false,
          severity: "warn",
          summary: "Your request hasn't been accepted by the admin",
          // detail: "Order submitted"
        });
      }
    }
}

  render() {
    return (
      <div className="main-container">
        <div className="login-page">
          <div className="login-container">
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
            </div>
            <br />
            <div className="sign-in-container">
              <Button label="Sign In" onClick={this.handleSignIn} />
            </div>
            <br />
            <div className="sign-up-container">
              <div
                className="sign-up-text"
                onClick={() => history.push("/sign-up")}
              >
                Sign Up
              </div>
              <div
                className="forgot-pass-text"
                onClick={() => history.push("/forgot-password")}
              >
                Forgot Password
              </div>
            </div>
            <br/>
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
)(LoginPage);
