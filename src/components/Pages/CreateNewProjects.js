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
const history = createHashHistory();

var activeIndexMapping = {
    0: '/Inquiry/create-new-projects/details',
    1: '/Inquiry/create-new-projects/input-key-value',
    2: '/Inquiry/create-new-projects/recommendations',
    3: '/Inquiry/create-new-projects/acceptance',
    4: '/Inquiry/create-new-projects/output-key-value',
    5: '/Inquiry/create-new-projects/output-document'
}




export default class CreateNewProjects extends React.Component {
    constructor() {
        super();
        this.state = { activeIndex: -1 }

        this.incMe = this.incMe.bind(this)
    }

    onProgressSelect(e) {
        console.log("On selecting progress")
        console.log(e.item);
        console.log(e.index);

    }




    incMe() {
        const currentActiveIndex = this.state.activeIndex
        this.setState({ activeIndex: currentActiveIndex + 1 })
        history.push(activeIndexMapping[currentActiveIndex + 1])

    }
    render() {

        const items = [
            { label: 'Details', },
            { label: 'Input Key Value' },
            { label: 'Recommendations' },
            { label: 'Acceptance' },
            { label: 'Output Key Value' },
            { label: 'Output Document' }
        ];

        const routes = [
            { path: '/Inquiry/create-new-projects/details', component: Details },
            { path: '/Inquiry/create-new-projects/input-key-value', component: InputKeyValue },
            { path: '/Inquiry/create-new-projects/recommendations', component: Recommendations },
            { path: '/Inquiry/create-new-projects/acceptance', component: Acceptance },
            { path: '/Inquiry/create-new-projects/output-key-value', component: OutputKeyValue },
            { path: '/Inquiry/create-new-projects/output-document', component: OutputDocument },
        ];


        const routeComponents = routes.map(({ path, component }) => {
            return <Route key={path} path={path} component={component} />
        })
        return (
            <div>
                <div className="progbar">
                    <Steps model={items} activeIndex={this.state.activeIndex} />
                </div>
                <button onClick={() => this.incMe()}>inc me</button>
                {/* <button onClick={() => this.setState({ activeIndex: currentActiveIndex - 1 })}>dec me</button> */}
                <div className="subscreens">
                    <HashRouter>
                        {routeComponents}
                    </HashRouter>
                </div>
            </div>

        )
    }
}