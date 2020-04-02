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
  async componentDidMount () {
    let data
    data = await Axios.get(
			`${backendUrl}/dashboard/all_project`
    )
    this.props.setDataList(data.data.data.Items)

    const colList = [
      { field: 'ProjectID', header: 'Project Id' },
      { field: 'Title', header: 'Title' },
      { field: 'Client', header: 'Customer' },
      { field: 'ProjectType', header: 'Type' },
      { field: 'AssignedOn', header: 'Assigned Date' },
      { field: 'ProjectStatus', header: 'Status' },
      { field: 'AssignedTo', header: 'Assigned To' },
      { field: 'CreatedBy', header: 'Created By' }
    ]
    this.props.setColList(colList)
  }

  render () {
    const toggleDropDownMenu = () => {
      var dropdownEle = document.activeElement.className
      const collapsedDropDown = []
      $('.dashboard').removeClass('active')
      for (let i = 0; i <= 3; i++) {
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
      for (let i = 0; i <= 3; i++) {
        $(`.dropdown-container-${i}`).hide()
        $(`.dropdown-btn-${i}`).removeClass('active')
      }
      this.props.history.push('/dashboard')
    }

    return (
      <div className="sideBar">
        <div className="navMenu">
          {
            (this.props.userRole == 'admin') && (
              <>
                <button className="dropdown-btn dropdown-btn-0" onClick={toggleDropDownMenu}><i className="pi pi-user"></i>Admin
                  <i className="fa fa-caret-down"></i>
                </button>
                <div className="dropdown-container dropdown-container-0">
                  <a href="#/admin/pending-requests"><i className="pi pi-key"></i>Pending Requests</a>
                  <a href="#/admin/all-users"><i className="pi pi-fw pi-users"></i>All Users</a>
                  <a href="#/admin/format-doc-form"><i className="pi pi-fw pi-users"></i>Document Format</a>
                </div>
              </>
            )
          }
          <button className="dropdown-btn dashboard" onClick={redirectToDashboard}><i className="pi pi-fw pi-home"></i> Dashboard</button>
          <button className="dropdown-btn dropdown-btn-1" onClick={toggleDropDownMenu}><i className="pi pi-fw pi-question"></i>Inquiry
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container dropdown-container-1">
            <a href="#/inquiry/create-new-projects/new"><i className="pi pi-fw pi-plus"></i>Create new projects</a>
            <a href="#/inquiry/projects-assigned-to-me"><i className="pi pi-fw pi-align-left"></i>Projects assigned to me</a>
            <a href="#/inquiry/projects-assigned-by-me"><i className="pi pi-fw pi-align-right"></i>Projects assigned by me</a>
            <a href="#/inquiry/all-ongoing-projects"><i className="pi pi-fw pi-clone"></i>All ongoing projects</a>
            <a href="#/inquiry/closed-projects"><i className="pi pi-fw pi-copy"></i>Closed projects</a>
          </div>
          <button className="dropdown-btn dropdown-btn-2" onClick={toggleDropDownMenu}><i className="pi pi-fw pi-file-excel"></i>Report
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container dropdown-container-2">
            <a href="#/report/generate-new-reports"><i className="pi pi-fw pi-plus"></i>Generate new reports</a>
          </div>
          <button className="dropdown-btn dropdown-btn-3" onClick={toggleDropDownMenu}><i className="pi  pi-info"></i>Support
            <i className="fa fa-caret-down"></i>
          </button>
          <div className="dropdown-container dropdown-container-3">
            <a href="#/support/create-new-incident"><i className="pi pi-eye"></i>Create new Incident</a>
            <a href="#/support/open-incidents"><i className="pi pi-circle-off"></i>User Manual</a>
          </div>
        </div>
      </div>
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
