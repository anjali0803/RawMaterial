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
import checkboxHOC from "react-table/lib/hoc/selectTable";

const ReactTableWrapper = checkboxHOC(ReactTable);

export class ProjectsTable extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      isLoading: false,
    };
    this.handleClickAllSelected = this.handleClickAllSelected.bind(this);
    this.toggleSelection = this.toggleSelection.bind(this);
    this.toggleAll = this.toggleAll.bind(this);
    this.isSelected = this.isSelected.bind(this);
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

  toggleSelection(key, shift, row) {
    let selected = [...this.state.selected];
    const keyIndex = selected.indexOf(key.replace('select-',''));
    if (keyIndex >= 0) {
      selected = [
        ...selected.slice(0, keyIndex),
        ...selected.slice(keyIndex + 1)
      ];
    } else {
      selected.push(key.replace('select-',''));
    }
    this.setState({ selected });
  };

  toggleAll() {
    const selectAll = this.state.selectAll ? false : true;
    const selected = [];
    if (selectAll) {
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      currentRecords.forEach(item => {
        selected.push(item._original._id);
      });
    }
    this.setState({ selectAll, selected });
  };

  isSelected(key) {
    return this.state.selected.includes(key);
  };


  render() {
    const { colList, dataList } = this.props;
    const { toggleSelection, toggleAll, isSelected } = this;
    const { data, columns, selectAll, selected } = this.state;
   
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
    
    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: "checkbox",
    };


    return (
        <Col xs={12} className="tableContainer">
          {footer}
          <ReactTableWrapper
            ref={r => (this.checkboxTable = r)} 
            columns={colList.map((col) => Object.assign(
              {},
              { Header: col.header, accessor: col.field, width: col.width, ...col}
            ))}
            data={dataList.map(item => {
              const _id = item.id;
              return {
                _id,
                ...item
              };
            })}
            getTrProps={(state, record) => {
              return {
                onClick: () => this.props.onProjectIdClick(record.original),
              }
            }}
            pageSize={dataList && dataList.length > 0 ? 8 : 0}
            showPageJump={false}
            resizable={false}
            showPageSizeOptions={false}
            previousText={"Back"}
            pageText={""}
            {...checkboxProps}
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
