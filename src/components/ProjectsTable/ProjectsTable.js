import React from 'react'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/nova-light/theme.css'
import './index.css'
import './react-table.css'
import { connect } from 'react-redux'
import axios from 'axios'
import { backendUrl } from '../../constant'
import ReactTable from 'react-table'
import { Col, Row, Badge } from 'reactstrap'
import checkboxHOC from 'react-table/lib/hoc/selectTable'

const ReactTableWrapper = checkboxHOC(ReactTable)

export class ProjectsTable extends React.Component {
  constructor () {
    super()
    this.state = {
      selected: [],
      isLoading: false,
      searchText: ''
    }
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this)
    this.toggleSelection = this.toggleSelection.bind(this)
    this.toggleAll = this.toggleAll.bind(this)
    this.isSelected = this.isSelected.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
  }

  async handleClickAllSelected (action) {
    const data = this.state.selected

    if (action) {
      const sendRecommendationRes = await axios.post(
        `${backendUrl}/dashboard/send_rec_from_ikv`,
        {
          projectID: this.props.projectId,
          fileType: this.props.documentArray[0].FileType,
          ikvValues: data
        }
      )
    } else {
      const sendAcceptanceRes = await axios.post(
        `${backendUrl}/dashboard/send_acceptance_from_ikv`,
        {
          projectID: this.props.projectId,
          fileType: this.props.documentArray[0].FileType,
          ikvValues: data
        }
      )
    }
  }

  toggleSelection (key, shift, row) {
    let selected = [...this.state.selected]
    const keyIndex = selected.indexOf(key.replace('select-', ''))
    if (keyIndex >= 0) {
      selected = [
        ...selected.slice(0, keyIndex),
        ...selected.slice(keyIndex + 1)
      ]
    } else {
      selected.push(key.replace('select-', ''))
    }
    this.setState({ selected })
  };

  toggleAll () {
    const selectAll = !this.state.selectAll
    const selected = []
    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance()
      const currentRecords = wrappedInstance.getResolvedState().sortedData
      currentRecords.forEach(item => {
        selected.push(item._original._id)
      })
    }
    this.setState({ selectAll, selected })
  };

  isSelected (key) {
    return this.state.selected.includes(key)
  };

  handleFilter (val) {
    this.setState({ searchText: val })
  }

  filterRows (rows, columns, searchQuery = '') {
    const filteredRows = []
    if (searchQuery === null || searchQuery === '') {
      return rows
    }
    rows.forEach(row => {
      columns.some(column => {
        if (row[column.field] !== undefined && row[column.field] !== null) {
          const rowValue = String(row[column.field]).toLowerCase()
          if (rowValue.length >= searchQuery.length && rowValue.indexOf(searchQuery.toLowerCase()) >= 0) {
            filteredRows.push(row)
            return true
          }
        }
        return false
      })
    })
    return filteredRows
  }

  render () {
    const { colList, dataList } = this.props
    const { selectAll, selected, searchText } = this.state

    const actions = [
      { label: 'Send to recommendation', value: 1 },
      { label: 'Send to acceptance', value: 0 }
    ]

    return (
      <Col xs={12} className="tableContainer">
        <ReactTableWrapper
          ref={r => (this.checkboxTable = r)}
          filterable
          columns={colList.map((col) => Object.assign(
            { Header: col.header, accessor: col.field, filterMethod: (filter, row) => row[filter.id].toLowerCase().includes(filter.value.toLowerCase()), ...col }))}
          defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
          data={this.filterRows(dataList, colList, searchText).map(item => {
            const _id = item.ProjectID
            const { ProjectStatus = '', Status = '', Download = '' } = item
            return {
              _id,
              ...item,
              Download:
              <i style={{ margin: 'auto' }} className="material-icons">
              save_alt
              </i>,
              Status: <Badge color={['closed', 'completed'].includes(Status.toLowerCase()) ? 'success' : 'warning'}>{Status}</Badge>,
              ProjectStatus: <Badge color={['submitted', 'completed'].includes(ProjectStatus.toLowerCase()) ? 'success' : 'warning'}>{ProjectStatus}</Badge>
            }
          })}
          getTrProps={(state, record) => {
            return {
              onClick: () => this.props.onProjectIdClick(record.original)
            }
          }}
          pageSize={dataList && dataList.length > 0 ? 8 : 0}
          showPageJump={false}
          resizable={false}
          showPageSizeOptions={false}
          previousText={'Back'}
          pageText={''}
          {...this}
          selectAll={selectAll}
        />
      </Col>
    )
  }
}

const mapStateToProps = state => ({
  projectId: state.projectId,
  documentId: state.documentId,
  documentArray: state.documentArray
})

export default connect(mapStateToProps)(ProjectsTable)
