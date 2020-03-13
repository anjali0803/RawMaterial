import React from 'react'
import './../index.css'

class LoadingScreen extends React.Component {
  constructor () {
    super()
    this.state = {
    }
  }

  render () {
    // console.log(typeof this.props.dataList)
    return <div className="spinner-container">
      <img
        src="./../../../assests/44.gif"
        style={{ margin: '100px' }}
      />
      <h2 style={{ fontWeight: 'light' }}>Loading.....</h2>
      {/* <ProgressSpinner
                        style={{ width: "40%", height: "40%" }}
                        strokeWidth="1"
                        animationDuration="1s"
                    ></ProgressSpinner> */}
    </div>
  }
}

export default LoadingScreen
