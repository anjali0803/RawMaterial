import React from 'react'
import { Button } from 'primereact/button'
import './index.css'

class ButtonHeader extends React.Component {
  render () {
    return (
      <div >
        <button className="save-button btn-grad" type="button" label="Save" onClick={this.props.onSave} disabled={!this.props.saveEnabled}> {this.props.buttonText ? this.props.buttonText : 'Save'} </button>
      </div>
    )
  }
}

export default ButtonHeader
