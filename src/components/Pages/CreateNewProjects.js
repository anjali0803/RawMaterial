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
const history = createHashHistory();




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
        const items = [
            { label: 'Details', },
            { label: 'Input Key Value' },
            { label: 'Recommendations' },
            { label: 'Acceptance' },
            { label: 'Output Key Value' },
            { label: 'Output Document' }
        ];


        this.state = {
            items: items,
            saveEnabled: true,
            deleteEnabled: true,
            title: '',
            type: '',
            customer: ''
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
        this.setState({ customer: e.target.value })

    }
    handleInputType(e) {
        //console.log(e.target.value);
        this.setState({ type: e.target.value })
    }
    handleInputTitle(e) {
        //console.log(e.target.value);
        this.setState({ title: e.target.value })
    }
    onSave() {
        console.log('Data saved');
        console.log(`Type = ${this.state.type}`);
        console.log(`Title = ${this.state.title}`);
        console.log(`Customer = ${this.state.customer}`);
        const currentActiveIndex = this.props.progressActiveIndex;
        this.props.setProgressActiveIndex(currentActiveIndex + 1)
        console.log(activeIndexMapping)
        console.log(activeIndexMapping[(currentActiveIndex + 1) % 6]);
        history.push(activeIndexMapping[(currentActiveIndex + 1) % 6]);


    }
    onDelete() {
        console.log('Data deleted')
    }
    incMe() {

    }

    render() {

        const projectTypes = [
            { label: 'Alpha' },
            { label: 'Beta' },
            { label: 'Gamma' },
            { label: 'theta' },
            { label: 'omega' }
        ];



        const routes = [
            {
                path: '/Inquiry/create-new-projects/details', component: () => <Details
                    handleInputCustomer={this.handleInputCustomer} handleInputType={this.handleInputType}
                    handleInputTitle={this.handleInputTitle} projectTypes={projectTypes}
                    title={this.state.title} type={this.state.type} customer={this.state.customer} />
            },
            { path: '/Inquiry/create-new-projects/input-key-value', component: () => <InputKeyValue /> },
            { path: '/Inquiry/create-new-projects/recommendations', component: () => <Recommendations /> },
            { path: '/Inquiry/create-new-projects/acceptance', component: () => <Acceptance /> },
            { path: '/Inquiry/create-new-projects/output-key-value', component: () => <OutputKeyValue /> },
            { path: '/Inquiry/create-new-projects/output-document', component: () => <OutputDocument /> },

        ];


        const routeComponents = routes.map(({ path, component }) => {
            return <Route key={path} path={path} render={component} />
        })
        return (
            <div>
                <div className="progbar">

                    <ProgressBar activeIndex={this.props.progressActiveIndex} unqURL={window.location.href.replace(window.location.origin, '')} />

                    <button onClick={() => this.incMe()} style={{ width: "40px", height: "30px", backgroundColor: 'red', float: 'right', color: 'black' }} >Inc me</button>
                    <ButtonHeader saveEnabled={this.state.saveEnabled} deleteEnabled={this.state.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
                </div>


                <div className="subscreens">
                    <HashRouter>
                        {routeComponents}
                    </HashRouter>
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