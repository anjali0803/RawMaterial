import React from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import './index.css';


export default class TableComponent extends React.Component {
    render() {
        return (
            <div>
                <DataTable value={this.props.dataList} paginator={true} paginatorPosition={'top'} rows={10}>
                    {this.props.colList.map((el) => {
                        return <Column field={el.field} header={el.header} filter={true} filterMatchMode="startsWith" />
                    })}
                </DataTable>
            </div>
        );
    }
}
