import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { createHashHistory } from 'history'
import './index.css';
import KeyValueTable from '../../KeyValueTable/KeyValueTable';
import InputTable from '../../InputTable/InputTable';
import TableComponent from '../../Table/TableComponent';
import ButtonHeader from '../../ButtonHeader/ButtonHeader';
import ProgressBar from './ProgressBar';
const history = createHashHistory();
class OutputDocument extends React.Component {
    constructor() {
        super();
        this.state = {
            saveEnabled: true,
            deleteEnabled: true,
            tableData: [


                {
                    documentId: '123490',
                    projectId: '125012',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123487',
                    projectId: '125019',
                    customer: 'Navi',
                    type: 'Beta',
                    uploadedDate: '11-10-2016',
                    sent: 'No',
                    last: "Non generated",
                    sentOn: '24-11-2019'
                },
                {
                    documentId: '123467',
                    projectId: '125045',
                    customer: 'Valve',
                    type: 'Omega',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123493',
                    projectId: '125142',
                    customer: 'theta',
                    type: 'Beta',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123490',
                    projectId: '125012',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123490',
                    projectId: '125012',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123490',
                    projectId: '125012',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                },
                {
                    documentId: '123490',
                    projectId: '125012',
                    customer: 'Adante',
                    type: 'Aplha',
                    uploadedDate: '12-10-2017',
                    sent: 'Yes',
                    last: "Generated",
                    sentOn: '24-11-2017'
                }
            ],
            tableColList: [
                { field: 'documentId', header: 'Document Id' },
                { field: 'projectId', header: 'Project Id' },
                { field: 'customer', header: 'Customer' },
                { field: 'type', header: 'Type' },
                { field: 'uploadedDate', header: 'Uploaded Date' },
                { field: 'sent', header: 'Sent' },
                { field: 'last', header: 'Last' },
                { field: 'sentOn', header: 'Sent On' }

            ],
            keyValueData: [

                { key: 'Queue Size', value: 12000 },
                { key: 'Volume', value: '45 Cubic Meters' },
                { key: 'density', value: 67 }
            ],
            keyValueColList: [
                { field: 'key', header: 'Key' },
                { field: 'value', header: 'Value' }

            ],



        }
    }
    onDocIdClick() {
        history.push('/Inquiry/create-new-projects/output-document/second')
    }
    onClick() {
        history.push("/Inquiry/create-new-projects/output-document/second");
    }
    onSave() {
        console.log('Output document saved......')
        history.push("/");
    }
    onDelete() {
        console.log('Output document deleted......')
        history.push("/");
    }
    render() {
        return (
            <div>
                <ButtonHeader saveEnabled={this.state.saveEnabled} deleteEnabled={this.state.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
                <ProgressBar steps={this.props.steps} unqURL={window.location.href.replace(window.location.origin, '')} />
                <button onClick={this.onClick}>Click me</button>
                <TableComponent colList={this.props.colList} dataList={this.props.dataList} onDocumentIdClick={this.onDocIdClick} />
            </div>
        )
    }
}

export default OutputDocument;