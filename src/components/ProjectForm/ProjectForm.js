import React from 'React';
import './index.css'
import FileUpload from '../FileUpload/FileUpload';
import { InputText } from 'primereact/inputtext';

class ProjectFrom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: props.projectTitle,
            type: props.projectType,
            customer: props.projectCustomer
        };

    }
    render() {
        return (
            <div>


                <div className="details-container">
                    <h3 className="details-input-label">Title</h3>
                    <InputText id="title"
                        value={this.state.title}
                        onChange={this.handleInputChange}
                    />
                    <span style={{ marginLeft: '.5em' }}>{this.state.title}</span>

                    <h3 className="details-input-label">Customer</h3>
                    <InputText id="customer"
                        value={this.state.customer}
                        onChange={this.handleInputChange} />
                    <span style={{ marginLeft: '.5em' }}>{this.state.customer}</span>

                    <h3 className="details-input-label">Type</h3>
                    <InputText id="type"
                        value={this.state.type}
                        onChange={this.handleInputChange} />
                    <span style={{ marginLeft: '.5em' }}>{this.state.type}</span>
                    <br /> <br />

                    <div className="upload-label" >Cost Sheet</div>
                    <FileUpload
                        className="cost-sheet-upload" />

                    <Button onClick={() => this.onSubmit} className="details-submit p-button-raised p-button-rounded" label="submit" />

                    <div className='details-pipe'>
                        <div className="upload-label" >PIPE</div>
                        <FileUpload
                            className="pipe-upload"
                        />
                    </div>
                    <div className='details-inner-coating'>
                        <div className="upload-label" >INNER-COATING</div>
                        <FileUpload
                            className="inner-coating-upload"
                        />
                    </div>
                    <div className='details-outer-coating'>
                        <div className="upload-label" >OUTER-COATING</div>
                        <FileUpload
                            className="outer-coating-upload"
                        />
                    </div>

                </div >

            </div>

        )
    }
}


export default ProjectFrom;