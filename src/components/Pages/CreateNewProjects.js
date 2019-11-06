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

var activeIndexMapping = [
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

        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.incMe = this.incMe.bind(this);
        this.handleInputCustomer = this.handleInputCustomer.bind(this)
        this.handleInputTitle = this.handleInputTitle.bind(this);
        this.handleInputType = this.handleInputType.bind(this)


    }


    handleInputCustomer(e) {
        //console.log(e.target.value);
        console.log('Customer handled = ', e.target)
        this.setState({ customer: e.target.value })


    }
    handleInputType(e) {

        console.log('Type handled = ', e)
        this.setState({ type: e.value })
    }
    handleInputTitle(e) {
        //console.log(e.target.value);
        this.setState({ title: e.target.value })
    }
    onSave() {
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

    render() {

        const projectTypes = [
            { label: 'Alpha', value: 'Alpha' },
            { label: 'Beta', value: 'Beta' },
            { label: 'Gamma', value: 'Gamma' },
            { label: 'theta', value: 'theta' },
            { label: 'omega', value: 'omega' }
        ];



        const routes = [
            {
                path: '/Inquiry/create-new-projects/details', component: () => <Details
                    handleInputCustomer={this.handleInputCustomer} handleInputType={this.handleInputType}
                    handleInputTitle={this.handleInputTitle} projectTypes={projectTypes}
                    title={this.state.title} type={this.state.type} customer={this.state.customer} />
            },
            {
                path: '/Inquiry/create-new-projects/input-key-value/second', component: () => <KeyValueTable
                    colList={this.state.inputKeyValueData.keyValueColList}
                    dataList={this.state.inputKeyValueData.keyValueData}

                />
            },

            {
                path: '/Inquiry/create-new-projects/input-key-value', component: () => <InputKeyValue
                    colList={this.state.inputKeyValueData.tableColList}
                    dataList={this.state.inputKeyValueData.tableData} />
            },
            {
                path: '/Inquiry/create-new-projects/recommendations', component: () => <Recommendations
                    colList={this.state.inputKeyValueData.tableColList}
                    dataList={this.state.inputKeyValueData.tableData} />
            },
            {
                path: '/Inquiry/create-new-projects/recommendations/second', component: () => <KeyValueTable
                    colList={this.state.inputKeyValueData.keyValueColList}
                    dataList={this.state.inputKeyValueData.keyValueData} />
            },
            {
                path: '/Inquiry/create-new-projects/acceptance', component: () => <Acceptance
                    colList={this.state.inputKeyValueData.tableColList}
                    dataList={this.state.inputKeyValueData.tableData} />
            },
            {
                path: '/Inquiry/create-new-projects/acceptance/second', component: () => <KeyValueTable
                    colList={this.state.inputKeyValueData.keyValueColList}
                    dataList={this.state.inputKeyValueData.keyValueData} />
            },
            {
                path: '/Inquiry/create-new-projects/output-key-value', component: () => <OutputKeyValue
                    colList={this.state.inputKeyValueData.tableColList}
                    dataList={this.state.inputKeyValueData.tableData} />
            },
            {
                path: '/Inquiry/create-new-projects/output-key-value/second', component: () => <KeyValueTable
                    colList={this.state.inputKeyValueData.keyValueColList}
                    dataList={this.state.inputKeyValueData.keyValueData} />
            },

            {
                path: '/Inquiry/create-new-projects/output-document', component: () => <OutputDocument
                    colList={this.state.inputKeyValueData.tableColList}
                    dataList={this.state.inputKeyValueData.tableData} />
            },
            {
                path: '/Inquiry/create-new-projects/output-document/second', component: () => <KeyValueTable
                    colList={this.state.inputKeyValueData.keyValueColList}
                    dataList={this.state.inputKeyValueData.keyValueData} />
            },
        ];


        const routeComponents = routes.map(({ path, component }) => {
            return <Route exact key={path} path={path} render={component} />
        })
        return (
            <div>
                <div className="progbar">
                    <ButtonHeader saveEnabled={this.state.saveEnabled} deleteEnabled={this.state.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
                    <ProgressBar steps={this.state.steps} activeIndex={this.props.progressActiveIndex} unqURL={window.location.href.replace(window.location.origin, '')} />

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