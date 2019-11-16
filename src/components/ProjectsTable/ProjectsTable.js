import React from "react";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/nova-light/theme.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import "./index.css";
import { connect } from "react-redux";
import axios from "axios";
import { backendUrl } from '../../constant';

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

    return <a onClick={() => this.props.onProjectIdClick(rowData)} >{rowData['ProjectID']}</a>
  }
  async handleClickAllSelected(action) {
    const data = this.state.selected;
        
    if (action) {
      const sendRecommendationRed = await axios.post(
        `${backendUrl}/dashboard/send_rec_from_ikv`,
        {
          projectID: this.props.projectId,
          fileType: this.props.documentArray[0].FileType,
          ikvValues: data
        }
      );
    } else {
      console.log(data, " is Rejected");
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
    return (
      <div>
        <DataTable
          value={dataList}
          footer={footer}
          paginator={true}
          paginatorPosition={"top"}
          rows={10}
          selection={this.state.selected}
          onSelectionChange={e => this.setState({ selected: e.value })}
        >
          <Column selectionMode="multiple" style={{ width: '3em' }} />
          <Column header={<i className="pi pi-refresh"></i>} style={{ width: '3em' }} />
          {colList.map((el, index) => {
            const field = el.field;
            const header = el.header;

            //console.log(header.toLowerCase().replace(/ /g, ''))

            if (header.toLowerCase().replace(/ /g, '') == 'projectid') {
              //console.log(el);
              return <Column
                id={`table-${index}`}
                header={el.header}
                filter={true}
                sortable={true}
                filterMatchMode="startsWith"
                body={this.projectIdTemplate}
              />
            }
            else
              return (
                <Column
                  field={el.field}
                  header={el.header}
                  filter={true}
                  sortable={true}
                  filterMatchMode="startsWith"

                />
              );
          })}
        </DataTable>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  projectId: state.projectId,
  documentId: state.documentId,
  documentArray: state.documentArray
})

export default connect(mapStateToProps)(ProjectsTable);
