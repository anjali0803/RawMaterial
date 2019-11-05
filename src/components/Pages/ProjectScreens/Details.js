import React from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import FileUpload from '../../FileUpload/FileUpload';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown'
import './index.css';
import { setProjectFields, setProgressActiveIndex } from '../../../actions/dataActions'
import { connect } from 'react-redux';


class Details extends React.Component {

    constructor() {
        super()
        //reset progbar index


    }

    uploadHandler() {
        console.log('upload handled');
    }


    render() {


        return (
            <div>

                <div className="details-container">
                    <h3 className="details-input-label">Title</h3>
                    <InputText id="title"
                        value={this.props.title}
                        onChange={(e) => this.props.handleInputTitle(e)}
                        readOnly={this.props.readOnly}
                    />
                    {/* <span style={{ marginLeft: '.5em' }}>Title</span> */}

                    <h3 className="details-input-label">Customer</h3>
                    <InputText id="customer"
                        value={this.props.customer}
                        onChange={(e) => this.props.handleInputCustomer(e)}
                        readOnly={this.props.readOnly} />
                    {/* <span style={{ marginLeft: '.5em' }}>Customer</span> */}

                    <h3 className="details-input-label">Type</h3>

                    <Dropdown value={this.props.type}
                        options={this.props.projectTypes}
                        onChange={(e) => this.props.handleInputCustomer(e)}
                        placeholder="Select a Type" />


                    {/* <span style={{ marginLeft: '.5em' }}>Type</span> */}
                    <br /> <br />

                    <div className="upload-label" >Cost Sheet</div>
                    <FileUpload
                        className="cost-sheet-upload"
                        disabled={this.props.readOnly} />

                    {/* <Button disabled={this.props.readOnly} onClick={this.onSubmit} className="details-submit p-button-raised p-button-rounded" label="submit" /> */}

                    <div className='details-pipe'>
                        <div className="upload-label" >PIPE</div>
                        <FileUpload
                            className="pipe-upload"
                            disabled={this.props.readOnly}
                        />
                    </div>
                    <div className='details-inner-coating'>
                        <div className="upload-label" >INNER-COATING</div>
                        <FileUpload
                            className="inner-coating-upload"
                            disabled={this.props.readOnly}
                        />
                    </div>
                    <div className='details-outer-coating'>
                        <div className="upload-label" >OUTER-COATING</div>
                        <FileUpload
                            className="outer-coating-upload"
                            disabled={this.props.readOnly}
                        />
                    </div>

                </div >

            </div>

        )
    }
}
const mapStateToProps = state => ({
    projectId: state.projectId,
    projectCustomer: state.customer,
    projectType: state.type,
    projectTitle: state.projectTitle,
    readOnly: state.readOnly,
    progressActiveIndex: state.progresActiveIndex
})
const mapDispatchToProps = dispatch => ({
    setProjectFields: (projectId, projectTitle, projectCustomer, projectType) => dispatch(setProjectFields(projectId, projectTitle, projectCustomer, projectType)),
    setProgressActiveIndex: (progressActiveIndex) => dispatch(setProgressActiveIndex(progressActiveIndex))
});
export default connect(mapStateToProps, mapDispatchToProps)(Details);