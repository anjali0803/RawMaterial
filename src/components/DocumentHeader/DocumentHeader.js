import React from 'react'
import './index.css'

class DocumentHeader extends React.Component {
  render () {
    return (
      <div className="document-header-container">
        <div className="document-id-container">
          <div style={{ float: 'left', width: '100%', marginBottom: '10px', fontWeight: '800' }}> Document ID  </div>
          <div style={{}}>{this.props.documentId}</div>
        </div>

        <div className="project-id-container">
          <div style={{ float: 'left', width: '100%', marginBottom: '10px', fontWeight: '800' }}>Project ID   </div>
          <div style={{}}>{this.props.projectId}</div>
        </div>

      </div>

    )
  }
}
export default DocumentHeader
