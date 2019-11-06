import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { createHashHistory } from 'history'
import './index.css';
import KeyValueTable from '../../KeyValueTable/KeyValueTable';
import InputTable from '../../InputTable/InputTable';
const history = createHashHistory();
class InputKeyValue extends React.Component {
    onClick() {

    }
    render() {

        const routes = [

            //{ path: '/Inquiry/create-new-projects/input-key-value/first', component: () => <InputTable /> },
            { path: '/Inquiry/create-new-projects/input-key-value/second', component: () => <KeyValueTable /> },
        ];

        //history.push("/Inquiry/create-new-projects/input-key-value/first");
        const routeComponents = routes.map(({ path, component }) => {
            return <Route key={path} path={path} render={component} />
        })

        return (
            <div>
                <InputTable />
                {/* <HashRouter>
                    {routeComponents}
                </HashRouter> */}

            </div>
        )
    }
}

export default InputKeyValue;