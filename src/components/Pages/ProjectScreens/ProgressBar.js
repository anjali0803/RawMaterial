import React from 'react';
import { connect } from 'react-redux';
import { createHashHistory } from 'history'
import './index.css';
const history = createHashHistory();

class ProgressBar extends React.Component {
    constructor() {
        super()
        this.onStepsClick = this.onStepsClick.bind(this);
    }
    onStepsClick(e, el) {

        let step = '' + el;
        history.push(`/Inquiry/create-new-projects/${step.toLowerCase().replace(/ /g, '-')}`)

    }
    render() {
        const URL = '' + window.location.href.replace(window.location.origin, '');
        return (
            < div className="progress-container" >
                <div className="progress-wrapper">
                    <div className="progress-steps clearfix ">
                        {this.props.steps.map((el, index) => {

                            if (URL.search(el.toLowerCase().replace(/ /g, '-')) !== -1)
                                return < div onClick={(e) => this.onStepsClick(e, el)} key={`progress-step-${index}`} className="progress-step progress-current" ><span>{el}</span></div>
                            else
                                return <div onClick={(e) => this.onStepsClick(e, el)} key={`progress-step-${index}`} className="progress-step"><span>{el}</span></div>

                        })}
                    </div>
                </div>
            </div >

        )
    }
}

export default ProgressBar;