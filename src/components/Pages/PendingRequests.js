import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import {
  setUserList
} from '../../actions/loginActions'
import './index.css'
import axios from 'axios'
import { connect } from 'react-redux'
import { authenticationUrl } from '../../constant'
import LoadingScreen from './LoadingScreen/loadingScreen'

class PendingRequests extends React.Component {
  constructor () {
    super()
    this.state = {
      selected: [],
      isLoading: false,
      userList: []
    }

    this.approveTemplate = this.approveTemplate.bind(this)
    this.rejectTemplate = this.rejectTemplate.bind(this)
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this)
  }

  async getUserList () {
    this.setState({ isLoading: true })
    const userList = await axios.get(
      `${authenticationUrl}/api/alluser`
    )
    this.props.setUserList(userList.data)
    this.setState({ selected: [], isLoading: false, userList: userList.data.data })
  }

  componentDidMount () {
    this.getUserList()
  }

  async handleClick (rowData, action) {
    const userList = []
    userList.push(rowData.username)
    if (action) {
      await axios.put(
        `${authenticationUrl}/api/approveuser`,
        {
          username: rowData.username
        }
      )
    } else {
      await axios.put(
        `${authenticationUrl}/api/removeuser`,
        {
          username: rowData.username
        }
      )
    }
    this.getUserList()
  }

  handleClickAllSelected (action) {
    if (action) {
      this.state.selected.forEach(async user => {
        await axios.put(
          `${authenticationUrl}/api/approveuser`,
          {
            username: user.username
          }
        )
      })
    } else {
      this.state.selected.forEach(async user => {
        await axios.put(
          `${authenticationUrl}/api/removeuser`,
          {
            username: user.username
          }
        )
      })
    }
    this.getUserList()
  }

  approveTemplate (rowData, column) {
    const enable =
      (JSON.stringify(this.state.selected[0]) === JSON.stringify(rowData)) && this.state.selected.length === 1
    return (
      <Button
        label="Approve"
        onClick={() => this.handleClick(rowData, true)}
        disabled={!enable}
      />
    )
  }

  rejectTemplate (rowData, column) {
    const enable =
    (JSON.stringify(this.state.selected[0]) === JSON.stringify(rowData)) && this.state.selected.length === 1
    return (
      <Button
        label="Reject"
        onClick={() => this.handleClick(rowData, false)}
        disabled={!enable}
      />
    )
  }

  render () {
    const actions = [
      { label: 'Approve All Selected', value: 1 },
      { label: 'Reject All Selected', value: 0 }
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
        body: this.approveTemplate,
        header: 'Approve User'
      },
      { 
        body: this.rejectTemplate,
        header: 'Remove User'
      }
    ]
    const userList = []
    this.state.userList.forEach(user => {
      if (!user.is_approved && user.is_active) {
        userList.push(user)
      }
    })

    return !this.state.isLoading ? (
      <div>
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
          paginatorPosition={'bottom'}
          rows={10}
          responsive={true}
          resizableColumns={true}
          scrollable={true}
          autoLayout={true}
          selection={this.state.selected}
          onSelectionChange={e => this.setState({ selected: e.value })}
        >
          <Column selectionMode="multiple" style={{ width: '3em' }} />
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
                style={{ width: '200px' }}
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
)(PendingRequests)
