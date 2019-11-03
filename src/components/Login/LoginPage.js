import React from "react";
// import { PanelMenu } from 'primereact/panelmenu';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import { Redirect } from "react-router-dom";
import {
  setUserLogin,
  setUserName,
  setUserRole
} from "../../actions/loginActions";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import "./index.css";
import { createHashHistory } from "history";
import axios from "axios";
import { connect } from "react-redux";
const history = createHashHistory();

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      userList: [],
      loggedIn: false,
      role: ""
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  async getUserInfo() {

  //   const userList= [
  //     {
  //         "username": "user1",
  //         "password": "user1",
  //         "role": "admin"
  //     },
  //     {
  //         "username": "user2",
  //         "password": "user2",
  //         "role": "user"
  //     },
  //     {
  //         "username": "user3",
  //         "password": "user3",
  //         "role": "requested"
  //     }
  // ]
    const userInfo = await axios.get(
      "http://5dbdaeb405a6f30014bcaee3.mockapi.io/users"
    );
    this.setState({ userList: userInfo.data });
    // this.setState({ userList: userList });
  }

  componentDidMount() {
    this.getUserInfo();
    const referer = this.props.location.state || '/'
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const username = localStorage.getItem("username")
    const role = localStorage.getItem("role")
    if (isAuthenticated == "true") {
      this.props.setUserLogin(true)
      this.props.setUserName(username)
      this.props.setUserRole(role)
      history.push(referer)
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
    const referer = this.props.location.state || '/'
    const loginResponse = this.state.userList.find(function(item) {
      return item.username == username;
    });

    if (loginResponse) {
      await this.props.setUserLogin(true);
      await this.props.setUserName(loginResponse.username);
      await this.props.setUserRole(loginResponse.role);

      localStorage.setItem("isAuthenticated","true")
      localStorage.setItem("username", loginResponse.username);
      localStorage.setItem("role", loginResponse.role);
      history.push(referer)
    }else{
      await this.props.setUserLogin(false);
      await this.props.setUserName(null);
      await this.props.setUserRole(null);

      localStorage.setItem("isAuthenticated","false")
      localStorage.setItem("username", "");
      localStorage.setItem("role", "");
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userLogin: state.userLogin,
  userName: state.userName,
  userRole: state.userRole
});

const mapDispatchToProps = dispatch => ({
  setUserLogin: userLogin => dispatch(setUserLogin(userLogin)),
  setUserName: userName => dispatch(setUserName(userName)),
  setUserRole: userRole => dispatch(setUserRole(userRole))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
