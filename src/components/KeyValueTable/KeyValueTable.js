import React from 'react';
import './index.css'
import TableComponent from '../Table/TableComponent';
import DocumentHeader from '../DocumentHeader/DocumentHeader';
import ButtonHeader from '../ButtonHeader/ButtonHeader';
import ProgressBar from '../Pages/ProjectScreens/ProgressBar';
import { createHashHistory } from 'history'
const history = createHashHistory();
class KeyValueTable extends React.Component {
    constructor() {
        super();
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.state = {
            keyValueData: [

                { key: 'Queue Size', value: 12000 },
                { key: 'Volume', value: '45 Cubic Meters' },
                { key: 'density', value: 67 }
            ],
            keyValueColList: [
                { field: 'key', header: 'Key' },
                { field: 'value', header: 'Value' }

            ]
        }

    }
    onSave() {
        console.log('recommendations screen save ....');
        history.push(this.props.redirectTo);
    }
    onDelete() {
        console.log('recommendations screen delete ....');
    }

    render() {

        return (
            <div>
                <ButtonHeader saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
                <ProgressBar steps={this.props.steps} unqURL={window.location.href.replace(window.location.origin, '')} />
                <DocumentHeader documentId={'123456'} projectId={'121245'}
                />
                <TableComponent colList={this.state.keyValueColList} dataList={this.state.keyValueData} />
            </div>
        )
    }
}

export default KeyValueTable;