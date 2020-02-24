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
import "./index.css";
import { createHashHistory } from "history";
import axios from "axios";
import { connect } from "react-redux";
import { FormGroup, Grid, Button, Label, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from "reactstrap";
import { Link } from 'react-router-dom';
import { authenticationUrl } from '../../constant';
import Helmet from 'react-helmet';
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
      `${authenticationUrl}/api/login`,
      {
        username: username,
        password: password
      }
    )

    if (loginResponse) {
      await this.props.setUserLogin(true);
      await this.props.setUserName(loginResponse.data.data.username);
      await this.props.setUserRole(loginResponse.data.data.is_admin ? 'admin' : '');

      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", loginResponse.data.data.username);
      localStorage.setItem("role", loginResponse.data.data.is_admin ? 'admin' : '');
      history.push(referer);
      if (loginResponse.data.code === 0) {
        await this.props.setUserLogin(true);
        await this.props.setUserName(loginResponse.data.username);
        await this.props.setUserRole(loginResponse.data.is_superuser ? 'admin' : '');

        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", loginResponse.data.username);
        localStorage.setItem("role", loginResponse.data.is_superuser ? 'admin' : '');
        history.push(referer);
      }
      if (loginResponse.data.code === 2) {
        this.messages.show({
          closable: false,
          severity: "error",
          summary: "Your username or password is incorrect!",
          // detail: "Order submitted"
        });
      }
      if (loginResponse.data.code === 1) {
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
      <div>
        <Helmet
          title={"AutoCIP"}
          meta={[
            { name: 'description', content: '' },
          ]}
        />
        <Row>
          <div className="limiter">
            <div className="container-login100">
              <div className="wrap-login100">
                  <span className="login100-form-title p-b-48">
                    <i className="zmdi zmdi-font"></i>
                  </span>

                  <div className="wrap-input100 validate-input">
                    <input className="input100 has-val" type="text" name="username" onChange={this.handleInputChange} value={this.state.username}/>
                    <span className="focus-input100" data-placeholder="Username"></span>
                  </div>

                  <div className="wrap-input100 validate-input">
                    <span className="btn-show-pass">
                      <i className="zmdi zmdi-eye"></i>
                    </span>
                    <input className="input100 has-val" type="password" name="password" onChange={this.handleInputChange} value={this.state.password} />
                    <span className="focus-input100" data-placeholder="Password"></span>
                  </div>

                  <div className="container-login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn"></div>
                      <button className="login100-form-btn" onClick={this.handleSignIn}>
                        Login
							        </button>
                    </div>
                  </div>

                  <div className="text-center p-t-115">
                    <span className="txt1">
                      Don’t have an account?&nbsp;
						        </span>
                    <Link className="txt2" to='/sign-up'>Sign Up</Link>
                  </div>

                  <div className="text-center p-t-115">
                    <Link className="txt2" to='/forgot-password'>Forgot Password</Link>
                  </div>
              </div>
            </div>
          </div>
        </Row>

      </div>);
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
