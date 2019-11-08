import React from 'react';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/nova-light/theme.css';
import FileUpload from '../../FileUpload/FileUpload';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown'
import { createHashHistory } from 'history'
import './index.css';
import { setProjectFields, setProgressActiveIndex } from '../../../actions/dataActions'
import { connect } from 'react-redux';
import ProgressBar from './ProgressBar';
import ButtonHeader from '../../ButtonHeader/ButtonHeader'
const history = createHashHistory();
//readOnly props 
class Details extends React.Component {

    constructor() {
        super()
        this.state = {

            title: '',
            type: '',
            customer: '',
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
        history.push('/Inquiry/create-new-projects/input-key-value')
    }
    onDelete() {
        console.log('Data deleted');
    }


    render() {


        return (
            <div>

                <ButtonHeader saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="progbar-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
                <ProgressBar steps={this.props.steps} unqURL={window.location.href.replace(window.location.origin, '')} />

                <div className="details-container">
                    <h3 className="details-input-label">Title</h3>
                    <InputText id="title"
                        value={this.state.title}
                        onChange={this.handleInputTitle}
                        readOnly={this.props.readOnly}
                    />
                    {/* <span style={{ marginLeft: '.5em' }}>Title</span> */}

                    <h3 className="details-input-label">Customer</h3>
                    <InputText id="customer"
                        value={this.state.customer}
                        onChange={this.handleInputCustomer}
                        readOnly={this.props.readOnly} />
                    {/* <span style={{ marginLeft: '.5em' }}>Customer</span> */}

                    <h3 className="details-input-label">Type</h3>

                    <Dropdown value={this.state.type}
                        options={this.state.projectTypes}
                        onChange={this.handleInputType}
                        placeholder="Select a Type" />


                    {/* <span style={{ marginLeft: '.5em' }}>Type</span> */}
                    <br /> <br />

                    <div className="upload-label" >Cost Sheet</div>
                    <FileUpload
                        className="cost-sheet-upload"
                        disabled={this.props.readOnly} />
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