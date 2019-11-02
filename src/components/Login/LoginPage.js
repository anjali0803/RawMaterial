import React from "react";
// import { PanelMenu } from 'primereact/panelmenu';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
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
    const userInfo = await axios.get(
      "https://63bd0dc7-78bd-4f8b-a91d-c64e3441056a.mock.pstmn.io"
    );
    this.setState({ userList: userInfo.data });
  }

  componentDidMount() {
    this.getUserInfo();
    this.checkExistingLogin();
  }

  checkExistingLogin(){
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')

    this.setState({username: username, password: password},function(){this.handleSignIn()})
    console.log(this.state.username)
    console.log(this.state.password)
  }

  handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({
      [name]: value
    });
  }

  handleSignIn() {
    const username = this.state.username;
    const password = this.state.password;
    const role = this.state.role;
    console.log("hi")
    const loginResponse = this.state.userList.find(function(item) {
      return item.username == username;
    });

    if (loginResponse) {
      this.props.setUserLogin(true);
      this.props.setUserName(loginResponse.username);
      this.props.setUserRole(loginResponse.role);

      localStorage.setItem('username', this.state.username);
      localStorage.setItem('password', this.state.password);
    }
  }

  render() {
    return (
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
