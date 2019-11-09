import React from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import FileUpload from '../../FileUpload/FileUpload';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown'
import { createHashHistory } from 'history'
import './index.css';
import { setProjectId, setProjectTitle, setProjectType, setProjectCustomer, setCurrentURL } from '../../../actions/dataActions'
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import ButtonHeader from '../../ButtonHeader/ButtonHeader'
const history = createHashHistory();
//readOnly props 
class Details extends React.Component {

    constructor(props) {
        super(props)
        //console.log("details", props)
        this.state = {
            projectId: props.projectId || '',
            title: props.projectTitle || '',
            type: props.projectType || '',
            customer: props.projectCustomer || '',
            projectTypes: [
                { label: 'Alpha', value: 'Alpha' },
                { label: 'Beta', value: 'Beta' },
                { label: 'Gamma', value: 'Gamma' },
                { label: 'theta', value: 'theta' },
                { label: 'omega', value: 'omega' }
            ]
        }
        this.handleInputCustomer = this.handleInputCustomer.bind(this);
        this.handleInputType = this.handleInputType.bind(this);
        this.handleInputTitle = this.handleInputTitle.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDelete = this.onDelete.bind(this);

    }

    uploadHandler() {
        console.log('upload handled');
    }
    handleInputCustomer(e) {

        this.setState({ customer: e.target.value })


    }
    handleInputType(e) {

        this.setState({ type: e.value })
    }
    handleInputTitle(e) {

        this.setState({ title: e.target.value })
    }
    onSave() {
        const { title, customer, type } = this.state;
        console.log({ title, customer, type })
        if (this.props.projectId === '') {
            const projectId = Math.round(Math.random() * 10000000)
            console.log('project id on save = ' + projectId)
            this.props.setProjectId(projectId);
        }

        this.props.setProjectCustomer(customer);
        this.props.setProjectTitle(title);
        this.props.setProjectType(type)
        this.props.setCurrentURL('/Inquiry/create-new-projects/input-key-value')
        history.push('/Inquiry/create-new-projects/input-key-value')
        //
    }
    onDelete() {
        console.log('Data deleted');
    }


    render() {
        return (
            <div>
                <ButtonHeader saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="details-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
                <div className="details-container">
                    <div className="details-form-container">
                        <div className="details-project-id-container">
                            <div className="details-input-label">Project Id</div>
                            <InputText id="projectId"
                                value={this.props.projectId}
                                readOnly={true}
                                disabled={true}
                            />
                        </div>
                        <br></br>
                        <div className="details-title-container">
                            <div className="details-input-label">Title</div>
                            <InputText id="title"
                                value={this.state.title}
                                onChange={this.handleInputTitle}
                                readOnly={this.props.readOnly}
                            />
                        </div>

                        <br></br>

                        {/* <span style={{ marginLeft: '.5em' }}>Title</span> */}
                        <div className="details-customer-container">
                            <div className="details-input-label">Customer</div>
                            <InputText id="customer"
                                value={this.state.customer}
                                onChange={this.handleInputCustomer}
                                readOnly={this.props.readOnly} />
                            {/* <span style={{ marginLeft: '.5em' }}>Customer</span> */}

                        </div>
                        <br></br>

                        <div className="details-type-container">
                            <div className="details-input-label">Type</div>
                            <Dropdown id="type" value={this.state.type}
                                options={this.state.projectTypes}
                                onChange={this.handleInputType}
                            />
                        </div>
                        <br></br>

                    </div>

                    <div className="upload-label" >Cost Sheet</div>
                    <FileUpload
                        className="cost-sheet-upload"
                        disabled={this.props.readOnly} />

                    <div className="upload-label" >PIPE</div>
                    <FileUpload
                        className="pipe-upload"
                        disabled={this.props.readOnly}
                    />

                    <div className="upload-label" >INNER-COATING</div>
                    <FileUpload
                        className="inner-coating-upload"
                        disabled={this.props.readOnly}
                    />
                    <div className="upload-label" >OUTER-COATING</div>
                    <FileUpload
                        className="outer-coating-upload"
                        disabled={this.props.readOnly}
                    />


                </div>

            </div >



        )
    }
}
const mapStateToProps = state => ({
    projectId: state.projectId,
    projectType: state.projectType,
    projectTitle: state.projectTitle,
    projectCustomer: state.projectCustomer
})
const mapDispatchToProps = dispatch => ({
    setProjectId: (projectId) => dispatch(setProjectId(projectId)),
    setProjectTitle: (projectTitle) => dispatch(setProjectTitle(projectTitle)),
    setProjectCustomer: (projectCustomer) => dispatch(setProjectCustomer(projectCustomer)),
    setProjectType: (projectType) => dispatch(setProjectType(projectType)),
    setCurrentURL: (currentURL) => dispatch(setCurrentURL(currentURL))

});
export default connect(mapStateToProps, mapDispatchToProps)(Details);