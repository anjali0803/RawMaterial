import React from 'react'
import 'primereact/resources/themes/nova-light/theme.css'
import {
  setUserLogin,
  setUserName,
  setUserRole
} from '../../actions/loginActions'
import { connect } from 'react-redux'
import MenuComponent from '../Menu/MenuComponent'
import ViewComponent from '../View/ViewComponent'
import './index.css'
import { createHashHistory } from 'history'

const history = createHashHistory()

class HomePage extends React.Component {
  constructor () {
    super()
    this.state = {
      viewMargin: '18%'
    }
    
    history.push('/dashboard')
    this.toggleSideNavBar = this.toggleSideNavBar.bind(this)
  }

  toggleSideNavBar () {
    $(".sideBar").toggle()
    if(this.state.viewMargin === '18%'){
      $('.view-container').css({
        'margin-left' : '0'
      });
      this.setState({
        viewMargin: '0'
      })
    } else {
      $('.view-container').css({
        'margin-left' : '18%'
      });
      this.setState({
        viewMargin: '18%'
      })
    }
  }

  render () {
    return (
      <>
        <div className="navBarShowHide">
          <div className="sidebarShowHide-icon" onClick={this.toggleSideNavBar}>
            <span class="tooltiptext">Show/Hide Side Bar</span>
            <span class="material-icons" style={{ marginTop: '11px'}}>
              reorder
            </span>
          </div>
        </div>
        <div className="home-container">
          <MenuComponent />
          <ViewComponent />
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  userLogin: state.userLogin,
  userName: state.userName,
  userRole: state.userRole
})

const mapDispatchToProps = dispatch => ({
  setUserLogin: userLogin => dispatch(setUserLogin(userLogin)),
  setUserName: userName => dispatch(setUserName(userName)),
  setUserRole: userRole => dispatch(setUserRole(userRole))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
