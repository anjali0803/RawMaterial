import React from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import { Steps } from 'primereact/steps'
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
import { setProgressActiveIndex, setProjectFields } from "../../actions/dataActions";
import { connect } from 'react-redux';
import ButtonHeader from '../ButtonHeader/ButtonHeader';
import KeyValueTable from '../KeyValueTable/KeyValueTable';
import InputTable from '../InputTable/InputTable';
const history = createHashHistory();


console.log(window.location);

const activeIndexMapping = [
    '/Inquiry/create-new-projects/details',
    '/Inquiry/create-new-projects/input-key-value',
    '/Inquiry/create-new-projects/recommendations',
    '/Inquiry/create-new-projects/acceptance',
    '/Inquiry/create-new-projects/output-key-value',
    '/Inquiry/create-new-projects/output-document'
]

class CreateNewProjects extends React.Component {
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
        this.incMe = this.incMe.bind(this);
    }



    onSave() {
        //save responds to url
        //each screen will give an object to this function 
        //that object will be sent 









        if (this.state.type == '' || this.state.customer == '' || this.state.title == '')
            return;

        console.log('Data saved');
        console.log(`Type = ${this.state.type}`);
        console.log(`Title = ${this.state.title}`);
        console.log(`Customer = ${this.state.customer}`);
        let currentActiveIndex = -1;
        this.state.steps.forEach((element, index) => {

            if (window.location.href.search(element.toLowerCase().replace(/ /g, '-')) !== -1) {
                currentActiveIndex = index;
            }
        });
        history.push(activeIndexMapping[(currentActiveIndex + 1) % 6]);



    }
    onDelete() {
        console.log('Data deleted');
    }
    incMe() {

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
                    colList={this.state.inputKeyValueData.keyValueColList}
                    dataList={this.state.inputKeyValueData.keyValueData}
                    saveEnabled={true} deleteEnabled={true}
                    steps={this.state.steps}
                    redirectTo='/Inquiry/create-new-projects/recommendations'
                />
            },

            {
                path: '/Inquiry/create-new-projects/input-key-value', component: () => <InputKeyValue
                    colList={this.state.inputKeyValueData.tableColList}
                    dataList={this.state.inputKeyValueData.tableData}
                    steps={this.state.steps}
                    saveEnabled={true} deleteEnabled={true} />
            },
            {
                path: '/Inquiry/create-new-projects/recommendations', component: () => <Recommendations
                    colList={this.state.inputKeyValueData.tableColList}
                    dataList={this.state.inputKeyValueData.tableData}
                    saveEnabled={true} deleteEnabled={true}
                    steps={this.state.steps} />
            },
            {
                path: '/Inquiry/create-new-projects/recommendations/second', component: () => <KeyValueTable
                    colList={this.state.inputKeyValueData.keyValueColList}
                    dataList={this.state.inputKeyValueData.keyValueData}
                    steps={this.state.steps}
                    saveEnabled={true} deleteEnabled={true}
                    redirectTo='/Inquiry/create-new-projects/acceptance'
                />
            },
            {
                path: '/Inquiry/create-new-projects/acceptance', component: () => <Acceptance
                    colList={this.state.inputKeyValueData.tableColList}
                    dataList={this.state.inputKeyValueData.tableData}
                    saveEnabled={true} deleteEnabled={true}
                    steps={this.state.steps}
                    saveEnabled={true}
                    deleteEnabled={false} />
            },
            {
                path: '/Inquiry/create-new-projects/acceptance/second', component: () => <KeyValueTable
                    colList={this.state.inputKeyValueData.keyValueColList}
                    dataList={this.state.inputKeyValueData.keyValueData}
                    steps={this.state.steps}
                    saveEnabled={true} deleteEnabled={true}
                    redirectTo='/Inquiry/create-new-projects/output-key-value/' />
            },
            {
                path: '/Inquiry/create-new-projects/output-key-value', component: () => <OutputKeyValue
                    colList={this.state.inputKeyValueData.tableColList}
                    dataList={this.state.inputKeyValueData.tableData}
                    steps={this.state.steps}
                    saveEnabled={true}
                    deleteEnabled={false}
                />
            },
            {
                path: '/Inquiry/create-new-projects/output-key-value/second', component: () => <KeyValueTable
                    colList={this.state.inputKeyValueData.keyValueColList}
                    dataList={this.state.inputKeyValueData.keyValueData}
                    steps={this.state.steps}
                    redirectTo='/Inquiry/create-new-projects/output-document'
                    saveEnabled={true} deleteEnabled={true} />
            },

            {
                path: '/Inquiry/create-new-projects/output-document', component: () => <OutputDocument
                    colList={this.state.inputKeyValueData.tableColList}
                    dataList={this.state.inputKeyValueData.tableData}
                    steps={this.state.steps}
                    saveEnabled={true} deleteEnabled={true} />
            },
            {
                path: '/Inquiry/create-new-projects/output-document/second', component: () => <KeyValueTable
                    colList={this.state.inputKeyValueData.keyValueColList}
                    dataList={this.state.inputKeyValueData.keyValueData}
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
                <div className="progbar">

                    {/* <button onClick={() => this.incMe()} style={{ width: "40px", height: "30px", backgroundColor: 'red', float: 'right', color: 'black' }} >Inc me</button> */}
                </div>


                <div className="subscreens">
                    <HashRouter>
                        {routeComponents}
                    </HashRouter>
                    {/* <HashRouter>
                        <Route path="/Inquiry/create-new-projects/input-key-value/screen-2" render={() => <KeyValueTable />} />
                    </HashRouter> */}
                </div>
            </div>

        )
    }
}
const mapStateToProps = state => ({
    progressActiveIndex: state.progressActiveIndex
});

const mapDispatchToProps = dispatch => ({
    setProgressActiveIndex: (progressActiveIndex) => dispatch(setProgressActiveIndex(progressActiveIndex))
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateNewProjects)