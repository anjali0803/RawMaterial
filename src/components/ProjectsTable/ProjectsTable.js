import React from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import "./index.css";
import "./react-table.css";
import { connect } from "react-redux";
import axios from "axios";
import { backendUrl } from '../../constant';
import ReactTable from "react-table";
import { Col, Row } from 'reactstrap';

export class ProjectsTable extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      isLoading: false,
    };
    this.projectIdTemplate = this.projectIdTemplate.bind(this);
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this);
  }
  projectIdTemplate(rowData) {

    return <a onClick={() => this.props.onProjectIdClick(rowData)} style={{cursor: 'pointer'}}>{rowData['ProjectID']}</a>
  }
  async handleClickAllSelected(action) {
    let data = this.state.selected;
        
    if (action) {
      let sendRecommendationRes = await axios.post(
        `${backendUrl}/dashboard/send_rec_from_ikv`,
        {
          projectID: this.props.projectId,
          fileType: this.props.documentArray[0].FileType,
          ikvValues: data
        }
      );
    } else {
      let sendAcceptanceRes = await axios.post(
        `${backendUrl}/dashboard/send_acceptance_from_ikv`,
        {
          projectID: this.props.projectId,
          fileType: this.props.documentArray[0].FileType,
          ikvValues: data
        }
      );
    }
  }

  render() {
    const colList = this.props.colList;
    const selected = this.state.selected;
    var dataList = this.props.dataList;

    const actions = [
      { label: "Send to recommendation", value: 1 },
      { label: "Send to acceptance", value: 0 }
    ];
    const footer = (
      <Dropdown
        options={actions}
        onChange={e => this.handleClickAllSelected(e.value)}
        placeholder="Select Action"
        disabled={selected.length == 0}
      />
    );
    console.log('dsfvvds',dataList);
    return (
        <Col xs={12} className="tableContainer">
          <ReactTable
            columns={[
              { Header: "id", accessor: "id"}, 
              { Header: "Title", accessor: "Title"},
              { Header: "Customer", accessor: "Client"},
              { Header: "Type", accessor: "ProjectType"},
              { Header: "Assigned Date", accessor: "AssignedOn"},
              { Header: "Status", accessor: "ProjectStatus"},
              { Header: "Created By", accessor: "CreatedBy"}]}
            data={dataList}
            pageSize={dataList && dataList.length > 0 ? 8 : 0}
            showPageJump={false}
            resizable={false}
            showPageSizeOptions={false}
            previousText={"Back"}
            pageText={""}
          />
        </Col>
    );
  }
}

const mapStateToProps = state => ({
  projectId: state.projectId,
  documentId: state.documentId,
  documentArray: state.documentArray
})

export default connect(mapStateToProps)(ProjectsTable);
