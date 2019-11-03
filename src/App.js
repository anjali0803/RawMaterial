import React from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "./App.css";
import TopBanner from "./components/Banner/TopBanner.js";
import LoginPage from "./components/Login/LoginPage";
import HomePage from "./components/HomePage/HomePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { connect } from "react-redux";
import { HashRouter, Route, Switch } from "react-router-dom";
import { setUserLogin, setUserName, setUserRole } from "./actions/loginActions";

class App extends React.Component {

  render() {
    return (
      <div>
        <TopBanner />
        <HashRouter>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <PrivateRoute path="/" component={HomePage} isAuthenticated={this.props.userLogin}/>
          </Switch>
        </HashRouter>
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
)(App);
