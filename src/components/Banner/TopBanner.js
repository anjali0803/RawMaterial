import React from 'react';
import "primereact/resources/themes/nova-light/theme.css";
import {
  setUserLogin,
  setUserName,
  setUserRole
} from "../../actions/loginActions";
import { connect } from "react-redux";
import './index.css'

class TopBanner extends React.Component {
    constructor(){
        super();

        this.logout = this.logout.bind(this)
    }
    logout(){
        this.props.setUserLogin(false)
        localStorage.setItem("isAuthenticated","false")
    }
    render() {
        return (
            this.props.userLogin ? <div className="banner">
                <div className="banner-heading-primary">
                    AutoCIP
                {this.props.userLogin ? <div className="sign-out-icon" onClick={() => this.logout()}>
                    <i className="pi pi-sign-out" style={{"fontSize": 40}}></i>
                </div> : null}
                </div>
                {/*<div className="copyright">
                    &copy; by
                <a href="https://www.matsci.ai/" target="_blank" className="copyright-link"> MatSci AI</a>
            <   /div>*/}
            </div> : null
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
  )(TopBanner);
  