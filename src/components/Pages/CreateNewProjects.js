import React from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import Details from './ProjectScreens/Details'
import InputKeyValue from './ProjectScreens/InputKeyValue'
import Recommendations from './ProjectScreens/Recommendations';
import Acceptance from './ProjectScreens/Acceptance';
import OutputKeyValue from './ProjectScreens/OutputKeyValue';
import OutputDocument from './ProjectScreens/OutputDocument';
import { HashRouter, Route } from 'react-router-dom';
import './index.css';
import { createHashHistory } from "history";
import ProgressBar from './ProjectScreens/ProgressBar';
import KeyValueTable from '../KeyValueTable/KeyValueTable';
const history = createHashHistory();




export default class CreateNewProjects extends React.Component {
    constructor() {

        super();
        this.state = {

            saveEnabled: true,
            deleteEnabled: true,
            title: '',
            type: '',
            customer: '',
            steps: [
                'Details',
                'Input Key Value',
                'Recommendations',
                'Acceptance',
                'Output Key Value',
                'Output Document'
            ],
            inputKeyValueData: {
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

                ]
            },

        }
    }


    recommendationsDocClick() {
        history.push('/Inquiry/create-new-projects/recommendations/second')
    }
    render() {

        const routes = [
            {
                path: '/Inquiry/create-new-projects/details', component: () => <Details
                    steps={this.state.steps} readOnly={false} saveEnabled={true} deleteEnabled={true}
                />
            },
            {
                path: '/Inquiry/create-new-projects/input-key-value/second', component: () => <KeyValueTable
                    saveEnabled={true} deleteEnabled={true}
                    steps={this.state.steps}
                    redirectTo='/Inquiry/create-new-projects/recommendations'
                />
            },

            {
                path: '/Inquiry/create-new-projects/input-key-value', component: () => <InputKeyValue
                    steps={this.state.steps}
                    saveEnabled={true} deleteEnabled={true} />
            },
            {
                path: '/Inquiry/create-new-projects/recommendations', component: () => <Recommendations
                    saveEnabled={true} deleteEnabled={true}
                    steps={this.state.steps} />
            },
            {
                path: '/Inquiry/create-new-projects/recommendations/second', component: () => <KeyValueTable

                    steps={this.state.steps}
                    saveEnabled={true} deleteEnabled={true}
                    redirectTo='/Inquiry/create-new-projects/acceptance'
                />
            },
            {
                path: '/Inquiry/create-new-projects/acceptance', component: () => <Acceptance
                    steps={this.state.steps}
                    saveEnabled={true}
                    deleteEnabled={false} />
            },
            {
                path: '/Inquiry/create-new-projects/acceptance/second', component: () => <KeyValueTable
                    steps={this.state.steps}
                    saveEnabled={true} deleteEnabled={true}
                    redirectTo='/Inquiry/create-new-projects/output-key-value/' />
            },
            {
                path: '/Inquiry/create-new-projects/output-key-value', component: () => <OutputKeyValue

                    steps={this.state.steps}
                    saveEnabled={true}
                    deleteEnabled={false}
                />
            },
            {
                path: '/Inquiry/create-new-projects/output-key-value/second', component: () => <KeyValueTable

                    steps={this.state.steps}
                    redirectTo='/Inquiry/create-new-projects/output-document'
                    saveEnabled={true} deleteEnabled={true} />
            },

            {
                path: '/Inquiry/create-new-projects/output-document', component: () => <OutputDocument
                    steps={this.state.steps}
                    saveEnabled={true} deleteEnabled={true} />
            },
            {
                path: '/Inquiry/create-new-projects/output-document/second', component: () => <KeyValueTable
                    steps={this.state.steps}
                    redirectTo='/'
                    saveEnabled={true} deleteEnabled={true}
                />
            },
        ];


        const routeComponents = routes.map(({ path, component }) => {
            return <Route exact key={path} path={path} render={component} />
        })
        return (
            <div>
                <ProgressBar steps={this.state.steps} unqURL={window.location.href.replace(window.location.origin, '')} />
                <div className="subscreens">
                    <HashRouter>
                        {routeComponents}
                    </HashRouter>
                </div>
            </div>

        )
    }
}