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
      <h2 style={{
        color: '#142850',
        fontWeight: 'light', 
        position: 'relative',
        top: '-50px' }}>
          Loading.....
      </h2>
    </div>
  }
}

export default LoadingScreen
