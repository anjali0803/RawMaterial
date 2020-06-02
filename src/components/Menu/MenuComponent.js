import React, { Component, Suspense } from 'react'
import Axios from 'axios'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/nova-light/theme.css'
import { PanelMenu } from 'primereact/panelmenu'
import { connect } from 'react-redux'
import { setDataList, setColList } from '../../actions/dataActions'
import './index.css'
import { backendUrl } from '../../constant'
import * as router from 'react-router-dom'

class MenuComponent extends React.Component {
  constructor(){
    super()
    this.state = {
      viewMargin: '18%',
      arrow: 'arrow_right'
    }
  }
  componentDidMount () {
    this.setState({
      arrow: 'arrow_left'
    })
  }

  render () {
    const toggleDropDownMenu = () => {
      var dropdownEle = document.activeElement.className
      const collapsedDropDown = []
      $('.dashboard').removeClass('active')
      for (let i = 0; i <= 4; i++) {
        if (dropdownEle.indexOf(i.toString()) < 0) {
          $(`.dropdown-container-${i}`).hide()
          $(`.dropdown-btn-${i}`).removeClass('active')
        } else {
          $(`.dropdown-btn-${i}`).addClass('active')
          $(`.dropdown-container-${i}`).toggle()
        }
      }
    }

    const redirectToDashboard = () => {
      var activeElement = document.activeElement.className
      $('.dashboard').addClass('active')
      for (let i = 0; i <= 4; i++) {
        $(`.dropdown-container-${i}`).hide()
        $(`.dropdown-btn-${i}`).removeClass('active')
      }
      this.props.history.push('/dashboard')
    }

    const toggleSideNavBar = () => {
      $(".sideBar").toggle()
      if(this.state.viewMargin === '18%'){
        $('.view-container').css({
          'margin-left' : '0'
        });
        $('.navBarShowHide').css({
          'left' : '0'
        });
        this.setState({
          viewMargin: '0',
          arrow: 'arrow_right'
        })
      } else {
        $('.view-container').css({
          'margin-left' : '18%'
        });
        $('.navBarShowHide').css({
          'left' : '18%'
        });
        this.setState({
          viewMargin: '18%',
          arrow: 'arrow_left'
        })
      }
    }
  

    return (
      <>
      <div className="navBarShowHide">
          <div className="sidebarShowHide-icon" onClick={toggleSideNavBar}>
          <span class="material-icons" style={{
               marginTop: '40%',
               fontSize: '50px',
               position: 'relative',
               left: '-8px'
          }}>
           {this.state.arrow}
          </span>
        </div>
      </div>
      <div className="sideBar">
        <div className="navMenu">
          {
            (this.props.userRole == 'admin') && (
              <>
                <button className="dropdown-btn dropdown-btn-0" onClick={toggleDropDownMenu}><i className="pi pi-fw pi-user"></i>Admin
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-container dropdown-container-0">
                  <a href="#/admin/pending-requests" className={ window.location.href.replace(window.location.origin, '') === '/#/admin/pending-requests' ? 'active-menu' : ''} ><i className="pi pi-key"></i>Pending Requests</a>
                  <a href="#/admin/all-users" className={ window.location.href.replace(window.location.origin, '') === '/#/admin/all-users' ? 'active-menu' : ''} ><i className="pi pi-fw pi-users"></i>All Users</a>
                  <a href="#/admin/format-doc-form"className={ window.location.href.replace(window.location.origin, '') === '/#/admin/format-doc-form' ? 'active-menu' : ''}><i className="pi pi-fw pi-users"></i>Document Format</a>
                </div>
              </>
            )
          }
          <button className="dropdown-btn dashboard" onClick={redirectToDashboard}><i className="pi pi-fw pi-home"></i> Dashboard</button>
          <button className="dropdown-btn dropdown-btn-1" onClick={toggleDropDownMenu}><i className="pi pi-fw pi-copy"></i>Data
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container dropdown-container-1">
            <a href="#/data/raw-material" className={ window.location.href.replace(window.location.origin, '') === '/#/data/raw-material' ? 'active-menu' : ''} ><i className="pi pi-fw pi-plus"></i>Raw Materials</a>
            <a href="#/data/product" className={ window.location.href.replace(window.location.origin, '') === '/#/data/product' ? 'active-menu' : ''}><i className="pi pi-fw pi-clone"></i>Products</a>
            <a href="#/data/intermediate" className={ window.location.href.replace(window.location.origin, '') === '/#/data/intermediate' ? 'active-menu' : ''}><i className="pi pi-fw pi-align-left"></i>Intermediates</a>
            <a href="#/data/by-product" className={ window.location.href.replace(window.location.origin, '') === '/#/data/by-product' ? 'active-menu' : ''}><i className="pi pi-fw pi-align-right"></i>By-Products</a>
            <a href="#/data/process" className={ window.location.href.replace(window.location.origin, '') === '/#/data/process' ? 'active-menu' : ''}><i className="pi pi-fw pi-copy"></i>Processes</a>
          </div>
          <button className="dropdown-btn dropdown-btn-2" onClick={toggleDropDownMenu}><i className="pi pi-fw pi-th-large"></i>Workflow
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container dropdown-container-2">
            <a href="#/workflow/existing-workflow" className={ window.location.href.replace(window.location.origin, '') === '/#/workflow/existing-workflow' ? 'active-menu' : ''}><i className="pi pi-fw pi-file"></i>Existing Workflows</a>
            <a href="#/workflow/create-new-workflow" className={ window.location.href.replace(window.location.origin, '') === '/#/workflow/create-new-workflow' ? 'active-menu' : ''}><i className="pi pi-fw pi-plus"></i>Create New Workflows</a>
          </div>
          <button className="dropdown-btn dropdown-btn-3" onClick={toggleDropDownMenu}><i className="pi pi-fw pi-file"></i>Reports
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container dropdown-container-3">
            <a href="#/report/generate-new-reports" className={ window.location.href.replace(window.location.origin, '') === '/#/report/generate-new-reports' ? 'active-menu' : ''}><i className="pi pi-fw pi-plus"></i>Existing Reports</a>
            <a href="#/report/generate-new-reports" className={ window.location.href.replace(window.location.origin, '') === '/#/report/generate-new-reports' ? 'active-menu' : ''}><i className="pi pi-fw pi-plus"></i>Generate New Workflows</a>
          </div>
          <button className="dropdown-btn dropdown-btn-4" onClick={toggleDropDownMenu}><i className="pi pi-fw pi-info"></i>Support
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container dropdown-container-4">
            <a href="#/support/create-new-incident" className={ window.location.href.replace(window.location.origin, '') === '/#/support/create-new-incident' ? 'active-menu' : ''}><i className="pi pi-eye"></i>Create new Incident</a>
            <a href="#/support/open-incidents" className={ window.location.href.replace(window.location.origin, '') === '/#/support/open-incidents' ? 'active-menu' : ''}><i className="pi pi-circle-off"></i>User Manual</a>
          </div>
        </div>
      </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  userRole: state.userRole
})

const mapDispatchToProps = dispatch => ({
  setDataList: dataList => dispatch(setDataList(dataList)),
  setColList: colList => dispatch(setColList(colList))
})

export default router.withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuComponent))
