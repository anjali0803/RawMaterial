import React from 'react'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/nova-light/theme.css'
import Details from './ProjectScreens/Details'
import InputKeyValue from './ProjectScreens/InputKeyValue'
import OutputKeyValue from './ProjectScreens/OutputKeyValue'
import OutputDocument from './ProjectScreens/OutputDocument'
import { HashRouter, Route } from 'react-router-dom'
import './index.css'
import { createHashHistory } from 'history'
import ProgressBar from './ProjectScreens/ProgressBar'
import InputKeyValueTable from './ProjectScreens/KeyValueTables/InputKeyValueTable/InputKeyValueTable'
import RMTS from './ProjectScreens/KeyValueTables/RMTS/InputKeyValueTable'
import ITP from './ProjectScreens/KeyValueTables/ITP/InputKeyValueTable'
import CommentSheet from './ProjectScreens/KeyValueTables/CommentSheet/InputKeyValueTable'
import OutputKeyValueTable from './ProjectScreens/KeyValueTables/OutputKeyValueTable/OutputKeyValueTable'
import OutputDocValueTable from './ProjectScreens/KeyValueTables/OutputDocValueTable/OutputDocValueTable'
const history = createHashHistory()

export default class CreateNewProjects extends React.Component {
  constructor () {
    super()
    this.state = {

      saveEnabled: true,
      deleteEnabled: true,
      title: '',
      type: '',
      customer: '',
      steps: [
        'Details',
        'Calculations',
        'Comment Sheet',
        'ITP',
        'RMTS',
        'Documents'
      ]
    }
  }

  recommendationsDocClick () {
    history.push('/Inquiry/create-new-projects/recommendations/second')
  }

  render () {
    const routes = [
      {
        path: '/Inquiry/create-new-projects/details',
        component: () => <Details
          steps={this.state.steps} readOnly={false} saveEnabled={true} deleteEnabled={true}
        />
      },
      {
        path: '/Inquiry/create-new-projects/new',
        component: () => <Details
          steps={this.state.steps} readOnly={false} saveEnabled={true} deleteEnabled={true} newProject={true}
        />
      },
      {
        path: '/Inquiry/create-new-projects/calculations',
        component: () => <InputKeyValueTable
          saveEnabled={true} deleteEnabled={true}
          steps={this.state.steps}
          screenNumber={1}
        />
      },
      {
        path: '/Inquiry/create-new-projects/rmts',
        component: () => <RMTS
          saveEnabled={true} deleteEnabled={true}
          steps={this.state.steps}
          screenNumber={1}
        />
      },
      {
        path: '/Inquiry/create-new-projects/input-key-value',
        component: () => <InputKeyValue
          steps={this.state.steps}
          saveEnabled={true} deleteEnabled={true} />
      },
      {
        path: '/Inquiry/create-new-projects/itp',
        component: () => <ITP
          saveEnabled={true} deleteEnabled={true}
          steps={this.state.steps} />
      },
      {
        path: '/Inquiry/create-new-projects/comment-sheet',
        component: () => <CommentSheet
          steps={this.state.steps}
          saveEnabled={true}
          deleteEnabled={false} />
      },
      {
        path: '/Inquiry/create-new-projects/output-key-value',
        component: () => <OutputKeyValue

          steps={this.state.steps}
          saveEnabled={true}
          deleteEnabled={false}
        />
      },
      {
        path: '/Inquiry/create-new-projects/output-key-value/second',
        component: () => <OutputKeyValueTable

          steps={this.state.steps}
          redirectTo='/Inquiry/create-new-projects/documents'
          saveEnabled={true} deleteEnabled={true}
          screenNumber={4}
        />
      },

      {
        path: '/Inquiry/create-new-projects/documents',
        component: () => <OutputDocument
          steps={this.state.steps}
          saveEnabled={true} deleteEnabled={true} />
      },
      {
        path: '/Inquiry/create-new-projects/documents/second',
        component: () => <OutputDocValueTable
          steps={this.state.steps}
          redirectTo='/'
          saveEnabled={true} deleteEnabled={true}
          screenNumber={5}
        />
      }
    ]

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
