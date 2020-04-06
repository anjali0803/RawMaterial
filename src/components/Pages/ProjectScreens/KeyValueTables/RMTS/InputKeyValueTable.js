import React from 'react';
import './index.css';
import { createHashHistory } from 'history';
import { connect } from 'react-redux';
import TableComponent from '../../../../Table/TableComponent2';
import CostSheetTableComponent from '../../../../Table/CostSheetTableComponent';
import axios from 'axios';
import { backendUrl } from '../../../../../constant';
import LoadingScreen from '../../../LoadingScreen/loadingScreen';
import { Dropdown } from 'primereact/dropdown';
import { cloneDeep, get } from 'lodash-es';
import {Growl} from 'primereact/growl';

const history = createHashHistory();

class RMTS extends React.Component {
  constructor (props) {
    super(props)
    if (props.projectId === '') { history.push('/Inquiry/create-new-projects/details') }

    // if (props.documentArray[props.screenNumber - 1] === '')
    //     history.push(`/Inquiry/create-new-projects/${pageMapIndex[props.screenNumber - 1]}`)

    this.onSave = this.onSave.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.state = {
      isLoading: false,
      documentId: props.documentId,
      checked1: true,
      versionMenu: [],
      selectedVerison: 0,
      displayAcceptanceForm: false,
      editable: false,
      elementData: [],
      keyValueData: [],
      tableData: [],
      grades: [],
      keyValueColumnList: [
        { field: 'Element', header: 'Element' }
      ],
      table2ColumnList: [
        { field: 'Property', header: 'Property' },
        { field: 'Testing direction from rolling', header: 'Testing direction from Rolling' },
        { field: 'Test Temp, °C', header: 'Test temp °C' },
      ],
      table2ValueData: []
    }
    this.onRefresh = this.onRefresh.bind(this)
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this)
    this.renderSingleValueEditableTable = this.renderSingleValueEditableTable.bind(this)
    this.renderButtonMenu = this.renderButtonMenu.bind(this)
    this.changeVerison = this.changeVerison.bind(this)
    this.createNewVerison = this.createNewVerison.bind(this)
    this.renderSaveButton = this.renderSaveButton.bind(this)
    this.editable = this.editable.bind(this)
    this.generateDoc = this.generateDoc.bind(this);
    // // this.onDocIdClick = this.onDocIdClick.bind(this);
  }

  async getKeyValueData () {
    this.setState({ isLoading: true })

    let data = await axios.get(
      `${backendUrl}/dashboard/get_rmts`, {
			  params: {
			    ProjectID: this.props.projectId
			  }
			}
    )
    
    const tableData = get(data, 'data.data.Values', []);
    const grades = get(data, 'data.data.Grade', []);

    const newTableOneColumns = this.state.keyValueColumnList;
    const newTableTwoColumns = this.state.table2ColumnList;
    
    grades.forEach(grade => {
      newTableOneColumns.push({
        field: grade,
        header: grade
      });
      newTableTwoColumns.push({
        field: grade,
        header: `API5L${grade}M PSL2`
      })
    });

    const versionMenu = tableData.map((data, index) => {
      return { name: `version ${index + 1}`, code: index }
    });

    this.setState({
      versionMenu: versionMenu,
      tableData: tableData,
      selectedVerison: { name: 'version 1', code: 0 },
      keyValueColumnList: newTableOneColumns,
      table2ColumnList: newTableTwoColumns,
      keyValueData: cloneDeep(tableData[0].tableOne),
      table2ValueData: cloneDeep(tableData[0].tableTwo),
      grades: grades
    });
    
    if (tableData.length === 1) {
      this.setState({
        editable: true
      })
    }
    this.setState({ isLoading: false })
  }

  componentDidMount () {
    this.getKeyValueData()
  }

  onRefresh () {
    this.getKeyValueData()
  }

  async onSave () {
    this.setState({
      isLoading: true
    })
    let saveEditedValue
    saveEditedValue = await axios.post(
      `${backendUrl}/dashboard/update_rmts`,
      {
        ProjectID: this.props.projectId,
        Values: this.state.tableData
      }
    )
    this.setState({
      isLoading: false
    })
    if(saveEditedValue.data.status === 'error'){
      this.growl.show({severity: 'error', summary: 'Failure', detail: `There is some issue occured while saving the RMTS data.`});
    } else {
      if(newVersion === true){
        this.growl.show([
          {severity: 'success', summary: 'Success', detail: `new ${this.state.doc} version created.`},
          {severity: 'success', summary: 'Success', detail: `${this.state.doc} data saved.`}]);
      } else {
        this.growl.show({severity: 'success', summary: 'Success', detail: `${this.state.doc} data saved.`});
      }
    }
  }

  onDelete () {
    console.log('recommendations screen delete ....')
  }

  rowClassName (rowData) {
    console.log('Row class Name :', rowData.TestingFrequency > 5)

    return {
      'table-on-green': (parseInt(rowData.TestingFrequency) > 5),
      'table-on-red': (parseInt(rowData.TestingFrequency) < 5)
    }
  }

  async handleClickAllSelected (action, data) {
    if (action) {
      const sendRecommendationRes = await axios.post(
        `${backendUrl}/dashboard/send_rec_from_ikv`,
        {
          projectID: this.props.projectId,
          fileType: this.props.documentFiletype,
          ikvValues: data
        }
      )
    } else {
      const sendAcceptanceRes = await axios.post(
        `${backendUrl}/dashboard/send_acceptance_from_ikv`,
        {
          projectID: this.props.projectId,
          fileType: this.props.documentFiletype,
          ikvValues: data
        }
      )
    }
    // this.getUserList();
  }

  renderSingleValueEditableTable () {
    return (
      <CostSheetTableComponent
        colList={this.state.tableColList}
        dataList={this.state.keyvalueCostSheetValueList}
        editable={true}
        footer={true}
      />
    )
  }

  changeVerison (props) {
    const data = cloneDeep(this.state.tableData[props.value.code])
    this.setState({
      keyValueData: data.tableOne,
      table2ValueData: data.tableTwo,
      selectedVerison: { name: `version ${props.value.code + 1}`, code: props.value.code }
    })
    if (props.value.code === this.state.tableData.length - 1) {
      this.setState({
        editable: true 
      })
    } else {
      this.setState({
        editable: false
      })
    }
  }

  createNewVerison () {
    const newTableData = this.state.tableData
    newTableData[this.state.tableData.length - 1] = {
      tableOne: this.state.keyValueData,
      tableTwo: this.state.table2ValueData
    }
    newTableData.push({
      tableOne: this.state.keyValueData,
      tableTwo: this.state.table2ValueData
    })

    const newVersionMenu = this.state.versionMenu
    newVersionMenu.push({ name: `version ${newVersionMenu.length + 1}`, code: newVersionMenu.length })
    this.setState({
      tableData: newTableData,
      versionMenu: newVersionMenu
    });
    this.onSave(true);
  }

  showForm () {
    this.setState({
      displayAcceptanceForm: true
    })
  }

  renderSaveButton () {
    return this.state.tableData.length === (this.state.selectedVerison.code + 1)
  }

  renderButtonMenu () {
    return (
      <div className="row" style={{ paddingLeft: '35px', paddingRight: '35px' }}>
        <div className="col-6 justify-content-start">
          <div className="row justify-content-start">
            <div className="col-6">
              <Dropdown value={this.state.selectedVerison} options={this.state.versionMenu} onChange={this.changeVerison} placeholder="Select Verison" optionLabel="name" />
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="row d-flex justify-content-end fright">
            <div className="col-12">
              {this.renderSaveButton() ? <button type="button pad-left" onClick={this.onSave} className="actionBtn btn-success">Save</button> : ''}
              {this.renderSaveButton() ? <button type="button pad-left" onClick={this.createNewVerison} className="actionBtn btn-primary">Create New Ver.</button> : ''}
              <button type="button pad-left" className="actionBtn btn-dark" onClick={this.generateDoc}>
                <i className="material-icons">
                save
                </i>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  async generateDoc () {
    this.setState({
      isLoading: true
    })
    const generateDocRes = await axios.post(
			`${backendUrl}/dashboard/rmtsdoc_download`,
			{
        values: this.state.tableData[this.state.selectedVerison.code],
			  version: this.state.selectedVerison.code + 1,
        project_id: this.props.projectId,
        grade: JSON.stringify(this.state.grades)
			}
    )
    this.setState({
      isLoading: false
    })
    if(generateDocRes.data.status === 'error'){
      this.growl.show({severity: 'error', summary: 'Failure', detail: 'Some Issue occured while creating you document.'});
    } else {
      this.growl.show({severity: 'success', summary: 'Success', detail: 'Document created successfully.'});
    }
  }

  editable () {
    return this.state.elementData.length === (this.state.selectedVerison.code + 1)
  }

  render () {
    let view = <div></div>;
    view = this.renderButtonMenu();

    return !this.state.isLoading ? (
      <div className="container-fluid">
        <Growl style={{
          marginTop: '15vh'
        }} ref={(el) => (this.growl = el)} />
        {view}
        <hr style={{ marginTop: '10px', marginBottom: '0px' }} />
        <TableComponent
          colList={this.state.keyValueColumnList}
          dataList={this.state.keyValueData}
          rowClassName={this.rowClassName}
          onRefresh={this.onRefresh}
          actionsLabel={this.state.actions}
          handleClickAllSelected={this.handleClickAllSelected}
          editable={this.state.editable}
          acceptButton={false}
          actionItemNotNeeded={true}
          rejectButton={false}
        />

        <TableComponent
          colList={this.state.table2ColumnList}
          dataList={this.state.table2ValueData}
          rowClassName={this.rowClassName}
          onRefresh={this.onRefresh}
          actionsLabel={this.state.actions}
          handleClickAllSelected={this.handleClickAllSelected}
          editable={this.state.editable}
          acceptButton={false}
          rejectButton={false}
          actionItemNotNeeded={true}
        />
      </div>
    ) : (
      <LoadingScreen />
    )
  }
}
const mapStateToProps = state => ({
  projectId: state.projectId,
  documentId: state.documentId,
  documentArray: state.documentArray,
  documentFiletype: state.documentFiletype
})
export default connect(mapStateToProps)(RMTS)
