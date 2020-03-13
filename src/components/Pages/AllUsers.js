import React from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
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
      userList: []
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
      `${authenticationUrl}/api/alluser`
    )
    this.props.setUserList(userList.data)
    this.setState({ selected: [], isLoading: false, userList: userList.data.data })
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
      )
    } else {
      await axios.put(
        `${authenticationUrl}api/removeuser`,
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
        await axios.post(
          `${authenticationUrl}/api/makeadmin`,
          {
            username: user.username
          }
        )
      })
    } else {
      this.state.selected.forEach(async user => {
        await axios.post(
          `${authenticationUrl}/api/removeuser`,
          {
            username: user.username
          }
        )
      })
    }
    this.getUserList()
  }

  adminTemplate (rowData, column) {
    const enable =
    (JSON.stringify(this.state.selected[0]) === JSON.stringify(rowData)) && this.state.selected.length === 1
    return (
      <Button
        label="Admin"
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
        label="Remove"
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
        header: (
          <Dropdown
            options={actions}
            onChange={e => this.handleClickAllSelected(e.value)}
            placeholder="Select Action"
            disabled={this.state.selected.length <= 1}
          />
        )
      },
      { body: this.adminTemplate },
      { body: this.removeTemplate }
    ]

    const userList = []
    this.state.userList.forEach(username => {
      userList.push({ username: username.username })
    })

    return !this.state.isLoading ? (
      <div>
        <DataTable
          className="hidden-header"
          value={userList}
          paginator={true}
          paginatorPosition={'top'}
          rows={10}
          selection={this.state.selected}
          onSelectionChange={e => this.setState({ selected: e.value })}
        >
          <Column selectionMode="multiple" style={{ width: '3em' }}/>
          {colList.map(el => {
            return (
              <Column
                key={el.header}
                field={el.field}
                header={el.header}
                body={el.body}
                filter={false}
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
