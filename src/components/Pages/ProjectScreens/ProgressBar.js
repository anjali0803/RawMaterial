import React from 'react';
import { connect } from 'react-redux';
import './index.css';

class ProgressBar extends React.Component {
    render() {
        const steps = [
            'Details',
            'Input Key Value',
            'Recommendations',
            'Acceptance',
            'Output Key Value',
            'OutputDocument'
        ];


        return (
            < div className="progress-container" >
                <div className="progress-wrapper">
                    <div className="progress-steps clearfix">
                        {steps.map((el, index) => {
                            if (index == this.props.progressActiveIndex)
                                return <div className="progress-step progress-current"> <span> {el}</span> </div>
                            else
                                return <div className="progress-step"> <span> {el}</span> </div>

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