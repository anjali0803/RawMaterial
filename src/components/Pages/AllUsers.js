import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import {Growl} from 'primereact/growl';
import { Dropdown } from 'primereact/dropdown'
import './index.css'
import axios from 'axios'
import { setUserList } from '../../actions/loginActions'
import { connect } from 'react-redux'
import LoadingScreen from './LoadingScreen/loadingScreen'
import { authenticationUrl } from '../../constant'

class AllUsers extends React.Component {
  constructor (props) {
    super()
    this.state = {
      selected: [],
      isLoading: false,
      userList: [],
      userMsgs: []
    }

    this.adminTemplate = this.adminTemplate.bind(this)
    this.removeTemplate = this.removeTemplate.bind(this)
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this)
    this.getUserList = this.getUserList.bind(this)
  }

  componentDidMount () {
    this.getUserList()
  }

  async getUserList () {
    this.setState({ isLoading: true })
    const userList = await axios.get(
      `${authenticationUrl}/api/allactiveuser`
    ).then(res=> {
      this.setState({ selected: [], isLoading: false, userList: res.data.data })
      const growlMsgs = this.state.userMsgs.map(msg => {
        return {severity: 'success', summary: msg, detail: ''}
      })
      if(growlMsgs.length > 0){
        this.growl.show(growlMsgs)
        this.setState({
          userMsgs: []
        })
      }
    }).catch(err=> {

    })
  }

  async handleClick (rowData, action) {
    const userList = []
    userList.push(rowData.username)
    if (action) {
      await axios.put(
        `${authenticationUrl}/api/makeadmin`,
        {
          username: rowData.username
        }
      ).then(res => {
        this.setState({
          userMsgs: [`${rowData.username} Approved`]
        })
      }).catch(err => {

      })
    } else {
      await axios.put(
        `${authenticationUrl}/api/removeuser`,
        {
          username: rowData.username
        }
      ).then(res => {
        this.setState({
          userMsgs: [`${rowData.username} Removed`]
        })
      }).catch(err => {
        
      })
    }
    this.getUserList()
  }

  handleClickAllSelected (action) {
    if (action) {
      this.state.selected.forEach(async user => {
        await axios.put(
          `${authenticationUrl}/api/makeadmin`,
          {
            username: user.username
          }
        ).then(res => {
          let msgs = this.state.userMsgs;
          msgs.push(`${user.username} Approved`)
          this.setState({
            userMsgs: msgs
          })
        }).catch(err => {
          
        })
      })
    } else {
      this.state.selected.forEach(async user => {
        await axios.put(
          `${authenticationUrl}/api/removeuser`,
          {
            username: user.username
          }
        ).then(res => {
          let msgs = this.state.userMsgs;
          msgs.push(`${user.username} Removed`)
          this.setState({
            userMsgs: msgs
          })
        }).catch(err => {
          
        })
      })
    }
    this.getUserList()
  }

  adminTemplate (rowData, column) {
    const enable =
    (JSON.stringify(this.state.selected[0]) === JSON.stringify(rowData)) && this.state.selected.length === 1

    if(rowData.is_admin === true){
      return (
        <span>Admin</span>
      )
    }
    return (
      <Button
        label="Make Admin"
        onClick={() => this.handleClick(rowData, true)}
        disabled={!enable}
      />
    )
  }

  removeTemplate (rowData, column) {
    const enable =
      (JSON.stringify(this.state.selected[0]) === JSON.stringify(rowData)) && this.state.selected.length === 1
    return (
      <Button
        label="Remove User"
        onClick={() => this.handleClick(rowData, false)}
        disabled={!enable}
      />
    )
  }

  render () {
    const actions = [
      { label: 'Make All Selected admin', value: 1 },
      { label: 'Remove All Selected users', value: 0 }
    ]

    const colList = [
      {
        field: 'username',
        header: 'Username'
      },
      {
        field: 'name',
        header: 'Name'
      },
      {
        field: 'email',
        header: 'E-mail'
      },
      {
        field: 'department',
        header: 'Department'
      },
      { 
        header: 'User Type',
        body: this.adminTemplate },
      { header: 'Remove User',
        body: this.removeTemplate }
    ]

    const userList = []
    this.state.userList.forEach(username => {
      if(username.is_approved ) {
        userList.push(username)
      }
    })

    return !this.state.isLoading ? (
      <div>
        <Growl style={{ top: '15%'}} ref={(el) => this.growl = el}></Growl>
        <Dropdown
            options={actions}
            onChange={e => this.handleClickAllSelected(e.value)}
            placeholder="Select Action"
            disabled={this.state.selected.length <= 1}
            style={{ margin: '10px'}}
        />
        <DataTable
          className="hidden-header"
          value={userList}
          paginator={true}
          paginatorPosition={'top'}
          scrollable={true}
          autoLayout={true}
          resizableColumns={true}
          rows={10}
          selection={this.state.selected}
          onSelectionChange={e => this.setState({ selected: e.value })}
        >
          <Column selectionMode="multiple" style={{ width: '3em' }}/>
          {colList.map(el => {
            if(el.field === 'email'){
              return (
                <Column
                  style={{width: '350px'}}
                  key={el.header}
                  field={el.field}
                  header={el.header}
                  body={el.body}
                  filter={true}
                  filterMatchMode="startsWith"
                />
              )
            }
            return (
              <Column
                style={{width: '200px'}}
                key={el.header}
                field={el.field}
                header={el.header}
                body={el.body}
                filter={true}
                filterMatchMode="startsWith"
              />
            )
          })}
        </DataTable>
      </div>
    ) : (
      <LoadingScreen />
    )
  }
}

const mapStateToProps = state => ({
  userList: state.userList
})

const mapDispatchToProps = dispatch => ({
  setUserList: userList => dispatch(setUserList(userList))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllUsers)
