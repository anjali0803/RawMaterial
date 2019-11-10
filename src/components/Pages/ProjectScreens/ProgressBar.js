import React from 'react';
import { connect } from 'react-redux';
import './index.css';


class ProgressBar extends React.Component {
    constructor() {
        super()
        this.onStepsClick = this.onStepsClick.bind(this);
    }
    onStepsClick() {
        console.log('steps clicked')
    }
    render() {

        const URL = '' + window.location.href.replace(window.location.origin, '');


        return (
            < div className="progress-container" >
                <div className="progress-wrapper">
                    <div className="progress-steps clearfix">
                        {this.props.steps.map((el, index) => {

                            if (URL.search(el.toLowerCase().replace(/ /g, '-')) !== -1)
                                return < div onClick={(e) => this.onStepsClick(e)} key={`progress-step-${index}`} className="progress-step progress-current" > <span> {el}</span> </div>
                            else
                                return <div onClick={(e) => this.onStepsClick(e)} key={`progress-step-${index}`} className="progress-step"> <span> {el}</span> </div>

                        })}
                    </div>
                </div>
            </div >

        )
    }
}
const mapStateToProps = state => ({
    progressActiveIndex: state.progressActiveIndex
})
export default connect(
    mapStateToProps
)(ProgressBar);