import React from 'react';
import "primereact/resources/themes/nova-light/theme.css";
import {
  setUserLogin,
  setUserName,
  setUserRole
} from "../../actions/loginActions";
import { connect } from "react-redux";
import MenuComponent from "../Menu/MenuComponent";
import ViewComponent from "../View/ViewComponent";
import './index.css'

class HomePage extends React.Component {
    render() {
        return (
            <div className="home-container">
              <MenuComponent />
              <ViewComponent />
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
  )(HomePage);
  