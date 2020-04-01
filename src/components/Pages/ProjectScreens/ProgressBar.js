import React from 'react'
import { connect } from 'react-redux'
import { createHashHistory } from 'history'
import { setProjectId, setProjectTitle, setProjectType, setProjectCustomer, setCurrentURL } from '../../../actions/dataActions'

import './index.css'
const history = createHashHistory()

const pageMapping = {
  calculations: 'calculations',
  details: 'details',
  'comment-sheet': 'comment-sheet',
  itp: 'itp',
  rmts: 'rmts',
  documents: 'documents'

}
class ProgressBar extends React.Component {
  constructor () {
    super()
    this.onStepsClick = this.onStepsClick.bind(this)
  }

  onStepsClick (e, el) {
    const step = '' + el
    history.push(`/Inquiry/create-new-projects/${pageMapping[step.toLowerCase().replace(/ /g, '-')]}`)
  }

  render () {
    const URL = '' + window.location.href.replace(window.location.origin, '')
    if (this.props.projectId === '') {
      return (
        < div className="progress-container" >
          <div className="progress-wrapper">
            <div className="progress-steps clearfix ">
              {this.props.steps.map((el, index) => {
                if (URL.search(el.toLowerCase().replace(/ /g, '-')) !== -1) { return < div key={`progress-step-${index}`} key={`progress-step-${index}`} className="progress-step progress-current" ><span>{el}</span></div> } else { return <div key={`progress-step-${index}`} key={`progress-step-${index}`} className="progress-step"><span>{el}</span></div> }
              })}
            </div>
          </div>
        </div >
      )
    }
    return (
      < div className="progress-container" >
        <div className="progress-wrapper">
          <div className="progress-steps clearfix ">
            {this.props.steps.map((el, index) => {
              if (URL.search(el.toLowerCase().replace(/ /g, '-')) !== -1) { return < div onClick={(e) => this.onStepsClick(e, el)} key={`progress-step-${index}`} className="progress-step progress-current" ><span>{el}</span></div> } else { return <div onClick={(e) => this.onStepsClick(e, el)} key={`progress-step-${index}`} className="progress-step"><span>{el}</span></div> }
            })}
          </div>
        </div>
      </div >

    )
  }
}

const mapStateToProps = state => ({
  projectId: state.projectId,
  projectType: state.projectType,
  projectTitle: state.projectTitle,
  projectCustomer: state.projectCustomer,
  userName: state.userName
})
const mapDispatchToProps = dispatch => ({
  setProjectId: (projectId) => dispatch(setProjectId(projectId)),
  setProjectTitle: (projectTitle) => dispatch(setProjectTitle(projectTitle)),
  setProjectCustomer: (projectCustomer) => dispatch(setProjectCustomer(projectCustomer)),
  setProjectType: (projectType) => dispatch(setProjectType(projectType)),
  setCurrentURL: (currentURL) => dispatch(setCurrentURL(currentURL))

})
export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar)
