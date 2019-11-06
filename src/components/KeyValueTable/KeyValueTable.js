import React from 'react';
import './index.css'
import TableComponent from '../Table/TableComponent';
import DocumentHeader from '../DocumentHeader/DocumentHeader';
class KeyValueTable extends React.Component {
    render() {
        return (
            <div>
                <DocumentHeader documentId={'123456'} projectId={'121245'}
                />
                <TableComponent colList={this.props.colList} dataList={this.props.dataList} />
            </div>
        )
    }
}

export default KeyValueTable;