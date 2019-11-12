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
import ButtonHeader from '../../ButtonHeader/ButtonHeader'
import axios from 'axios';
import { backendUrl } from '../../../constant';

const history = createHashHistory();

class Details extends React.Component {

    constructor(props) {
        super(props)
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
            ],
            file1: '',
            file2: '',
            file3: '',
            file4: ''
        }
        this.handleInputCustomer = this.handleInputCustomer.bind(this);
        this.handleInputType = this.handleInputType.bind(this);
        this.saveFile1 = this.saveFile1.bind(this);
        this.saveFile2 = this.saveFile2.bind(this);
        this.saveFile3 = this.saveFile3.bind(this);
        this.saveFile4 = this.saveFile4.bind(this);
        this.upLoadFiletoS3 = this.upLoadFiletoS3.bind(this);
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
    saveFile1(e){
        this.setState({ file1: e });
    }
    saveFile2(e){
        this.setState({ file2: e });
    }
    saveFile3(e){
        this.setState({ file3: e });
    }
    saveFile4(e){
        this.setState({ file4: e });
    }

    handleInputType(e) {

        this.setState({ type: e.value })
    }
    handleInputTitle(e) {

        this.setState({ title: e.target.value })
    }

    async upLoadFiletoS3(file){
        let formData = new FormData();
        formData.append('file', file);
        // formData.append('filepath', '/sada/')
        const fileRes = await axios.post(
            `${backendUrl}/dashboard/uploadfile`,
            formData,
            {headers: {
                'Content-Type': 'multipart/form-data'
            }}
        )
        return fileRes;
    }

    async onSave() {
        const { title, customer, type } = this.state;
        const { file1, file2, file3, file4 } = this.state;

        const file1Res = await this.upLoadFiletoS3(file1);
        const file2Res = await this.upLoadFiletoS3(file2);
        const file3Res = await this.upLoadFiletoS3(file3);
        const file4Res = await this.upLoadFiletoS3(file4);

        const createProjectRes = await axios.post(
            `${backendUrl}/dashboard/create_project`,
            {
                title: title,
                client: customer,
                project_type: type,
                cost_sheet: file1Res.data.data,
                specs_pipe: file2Res.data.data,
                inner_coating: file3Res.data.data,
                outer_coating: file4Res.data.data,
                assignedTo: this.props.userName,
                createdBy: this.props.userName,
            }
        )
        const projectId = createProjectRes.data.data.ProjectID;
        this.props.setProjectId(projectId);
        this.props.setProjectCustomer(customer);
        this.props.setProjectTitle(title);
        this.props.setProjectType(type)
        history.push('/Inquiry/create-new-projects/input-key-value')

    }
    onDelete() {
        console.log('Data deleted');
    }


    render() {
        return (
            <div>
                <form onSubmit={obj => this.onSave(obj)}>
                <ButtonHeader type="button" saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="details-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} />
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
                        onFileSelect={this.saveFile1}
                        disabled={this.props.readOnly} 
                        />

                    <div className="upload-label" >PIPE</div>
                    <FileUpload
                        className="pipe-upload"
                        onFileSelect={this.saveFile2}
                        disabled={this.props.readOnly}
                    />

                    <div className="upload-label" >INNER-COATING</div>
                    <FileUpload
                        className="inner-coating-upload"
                        disabled={this.props.readOnly}
                        onFileSelect={this.saveFile3}
                    />
                    <div className="upload-label" >OUTER-COATING</div>
                    <FileUpload
                        className="outer-coating-upload"
                        disabled={this.props.readOnly}
                        onFileSelect={this.saveFile4}
                    />


                </div>
                </form>
            </div >



        )
    }
}
const mapStateToProps = state => ({
    projectId: state.projectId,
    projectType: state.projectType,
    projectTitle: state.projectTitle,
    projectCustomer: state.projectCustomer,
    userName: state.userName,
})
const mapDispatchToProps = dispatch => ({
    setProjectId: (projectId) => dispatch(setProjectId(projectId)),
    setProjectTitle: (projectTitle) => dispatch(setProjectTitle(projectTitle)),
    setProjectCustomer: (projectCustomer) => dispatch(setProjectCustomer(projectCustomer)),
    setProjectType: (projectType) => dispatch(setProjectType(projectType)),
    setCurrentURL: (currentURL) => dispatch(setCurrentURL(currentURL))

});
export default connect(mapStateToProps, mapDispatchToProps)(Details);