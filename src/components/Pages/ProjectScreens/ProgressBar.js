import React from 'react';
import { connect } from 'react-redux';
import './index.css';

const getWindowUrlOrigin = () => {
    return {
        url: window.location.href,
        origin: window.location.origin
    }
}
class ProgressBar extends React.Component {

    render() {
        

        console.log(window.location);
        const URL = '' + window.location.href.replace(window.location.origin, '');
        console.log(URL)

        return (
            < div className="progress-container" >
                <div className="progress-wrapper">
                    <div className="progress-steps clearfix">
                        {this.props.steps.map((el) => {
                            console.log(el.toLowerCase().replace(' ', '-'))
                            if (URL.search(el.toLowerCase().replace(/ /g, '-')) !== -1)
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