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
import {Growl} from 'primereact/growl';
import { connect } from 'react-redux'
import { authenticationUrl } from '../../constant'
import LoadingScreen from './LoadingScreen/loadingScreen'

class PendingRequests extends React.Component {
  constructor () {
    super()
    this.state = {
      selected: [],
      isLoading: false,
      userList: [],
      userMsgs: []
    }

    this.approveTemplate = this.approveTemplate.bind(this)
    this.rejectTemplate = this.rejectTemplate.bind(this)
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this)
  }

  async getUserList () {
    this.setState({ isLoading: true })
    const userList = await axios.get(
      `${authenticationUrl}/api/alluser`
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

  componentDidMount () {
    this.getUserList()
  }

  async handleClick (rowData, action) {
    if (action) {
      await axios.put(
        `${authenticationUrl}/api/approveuser`,
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
    let userMsg;
    if (action) {
      this.state.selected.forEach(async user => {
        await axios.put(
          `${authenticationUrl}/api/approveuser`,
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
