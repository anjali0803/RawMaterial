import React from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import "./App.css";
import TopBanner from "./components/Banner/TopBanner.js";
// import { Button } from 'primereact/button';
import MenuComponent from "./components/Menu/MenuComponent";
import ViewComponent from "./components/View/ViewComponent";
import LoginPage from "./components/Login/LoginPage";
import { connect } from "react-redux";
import { setUserLogin, setUserName, setUserRole } from "./actions/loginActions";

class App extends React.Component {


  render() {
    console.log(this.props.userLogin);
    return (
      <div>
        <TopBanner />
        {this.props.userLogin ? (
          <div className="main-container">
            <MenuComponent />
            <ViewComponent />
          </div>
        ) : (
            <div className="main-container">
              <LoginPage />
            </div>
          )}
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
