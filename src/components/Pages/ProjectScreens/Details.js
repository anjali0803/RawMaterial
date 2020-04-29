import React from 'react'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/nova-light/theme.css'
import FileUpload from '../../FileUpload/FileUpload'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { ProgressBar } from 'primereact/progressbar'
import { createHashHistory } from 'history'
import './index.css'
import { setProjectId, setProjectTitle, setProjectType, setProjectCustomer, setCurrentURL, setDueDate, setAssignedUser } from '../../../actions/dataActions'
import { connect } from 'react-redux'
import ButtonHeader from '../../ButtonHeader/ButtonHeader'
import axios from 'axios'
import { backendUrl, authenticationUrl } from '../../../constant'
import Autocomplete from 'react-autocomplete'
import { Input } from 'reactstrap'
import {AutoComplete} from 'primereact/autocomplete';

const history = createHashHistory()

class Details extends React.Component {
  constructor (props) {
    super(props)
    
    if(!this.props.newProject && !props.projectId){
      history.push('/inquiry/projects-assigned-to-me')
    }

    
    if (this.props.newProject) {
      this.props.setProjectId('')
      this.props.setProjectCustomer('')
      this.props.setProjectTitle('')
      this.props.setProjectType('')
      this.props.setAssignedUser('')
      this.props.setDueDate('')
    }
    this.state = {
      pipeSpecNumber: '',
      coatingSpecNumber: '',
      createdBy: '',
      projectStatus: '',
      createdOn: '',
      submittedOn: '',
      errorMsg: {
        dueDate: '',
        type: '',
        customer: '',
        title: '',
        file1: '',
        file2: '',
        file3: '',
        CreateProjectErrorMsg: '',
        assignedUser:''
      },
      dueDate: this.props.newProject ? '' : (new Date(props.dueDate) || ''),
      projectId: this.props.newProject ? '' : (props.projectId || ''),
      title: this.props.newProject ? '' : (props.projectTitle || ''),
      type: this.props.newProject ? '' : (props.projectType || ''),
      customer: this.props.newProject ? '' : (props.projectCustomer || ''),
      assignedUser: this.props.newProject ? '' : (props.assignedUser || ''),
      projectTypes: [
        { label: 'HFW', value: 'HFW' },
        { label: 'HSAW', value: 'HSAW' }
      ],
      file1: this.props.newProject ? '' : (props.file1 || ''),
      file2: this.props.newProject ? '' : (props.file3 || ''),
      file3: this.props.newProject ? '' : (props.file4 || ''),
      file4: this.props.newProject ? '' : (props.file5 || ''),
      isLoading: false,
      isLoadingProgress: 0,
      isLoadingTexts: '',
      filteredCustomers: [],
      emailList: [],
      assignedUserSuggestions: [],
      customerSuggestion: [
        'Boardwalk',
        'Corpac',
        'Epic',
        'Energy Transfer',
        'Edgen',
        'Enable Midstream',
        'Enbridge',
        'Grey Oak',
        'Gulf Interstate',
        'Iracore Pipe',
        'KAPS',
        'Kinder Morgan',
        'MVP',
        'Mainline Pipe',
        'Oklahoma',
        'Plains',
        'TCPL',
        'Williams',
        'Chinere Midship ',
        'Enable',
        'Ensite',
        'EPCO',
        'Eagle'
      ]
    }

    this.handleInputCustomer = this.handleInputCustomer.bind(this)

    this.handleInputType = this.handleInputType.bind(this)
    this.saveFile1 = this.saveFile1.bind(this)
    this.saveFile2 = this.saveFile2.bind(this)
    this.saveFile3 = this.saveFile3.bind(this)
    this.saveFile4 = this.saveFile4.bind(this)
    this.upLoadFiletoS3 = this.upLoadFiletoS3.bind(this)
    this.handleInputTitle = this.handleInputTitle.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.displayValueTemplate = this.displayValueTemplate.bind(this)
    this.filterCountryMultiple = this.filterCountryMultiple.bind(this)
    this.renderSuggestion = this.renderSuggestion.bind(this)
    this.validateFormData = this.validateFormData.bind(this)
    this.upLoadMultipleFiletoS3 = this.upLoadMultipleFiletoS3.bind(this)
  }

  async componentDidMount() {
    let emailList = [];
    await Promise.all([
      axios.get(
        `${backendUrl}/dashboard/all_client`
      ),
      axios.get(
        `${authenticationUrl}/api/allactiveuser`
      )
    ]).then(res => {
      res[1].data.data.forEach(user => {
        if( user.is_approved){
          emailList.push(user.username)
        }
      })
      this.setState({
        emailList: emailList,
        customerSuggestion: res[0].data.data
      })
    }).catch(err => {
      // handling error
    });
    if(!this.props.newProject){
      const projectData = await axios.get(
        `${backendUrl}/dashboard/project`,
        {
          params: {
          projectid: this.props.projectId
        }}
      )
      
      this.setState({
        assignedTo: projectData.data.data[0].AssignedTo,
        dueDate: projectData.data.data[0].DueDate,
        projectStatus: projectData.data.data[0].ProjectStatus,
        createdBy: projectData.data.data[0].CreatedBy,
        createdOn: projectData.data.data[0].CreatedOn ? projectData.data.data[0].CreatedOn.substring(0,10): '',
        submittedOn: projectData.data.data[0].SubmittedOn ? projectData.data.data[0].SubmittedOn.substring(0,10).split('-').reverse().join('/') : 'Not Submitted Yet!!',
        pipeSpecNumber: projectData.data.data[0].PipeSpecNumber,
        coatingSpecNumber: projectData.data.data[0].CoatingSpecNumber,
        purchasedOrderNo: projectData.data.data[0].PurchaseOrder
      })
      if(projectData.data.data[0].ProjectStatus  === 'Cancelled') {
        this.setState({
          submittedOn: 'Project has been cancelled'
        })
      }
    } else {
      this.setState({
        assignedUser: this.props.userName
      })
    }
  }

  uploadHandler () {
    console.log('upload handled')
  }

  handleInputCustomer (e) {
    if (e.target.value.length) {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          customer: ''
        }
      })
    } else {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          customer: '*It is required field.'
        }
      })
    }
    e.target.query ? this.filterCountryMultiple(e.target) : this.filterCountryMultiple({...e.target, query: e.target.value})
    this.setState({ customer: e.target.value })
  }

  saveFile1 (e) {
    if (e) {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          file1: ''
        }
      })
    } else {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          file1: '*It is required field.'
        }
      })
    }
    this.setState({ file1: e })
  }

  saveFile2 (e) {
    if (e) {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          file2: ''
        }
      })
    } else {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          file2: '*It is required field.'
        }
      })
    }
    this.setState({ file2: e })
  }

  saveFile3 (e) {
    if (e) {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          file3: ''
        }
      })
    } else {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          file3: '*It is required field.'
        }
      })
    }
    this.setState({ file3: e })
  }

  saveFile4 (e) {
    if (e) {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          file4: ''
        }
      })
    } else {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          file4: '*It is required field.'
        }
      })
    }
    this.setState({ file4: e })
  }

  handleInputType (e) {
    if (e.value.length) {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          type: ''
        }
      })
    } else {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          type: '*It is required field.'
        }
      })
    }
    this.setState({ type: e.value })
  }

  handleInputTitle (e) {
    if (e.target.value.length) {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          title: ''
        }
      })
    } else {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          title: '*It is required field.'
        }
      })
    }
    this.setState({ title: e.target.value })
  }

  async upLoadFiletoS3 (file) {
    const formData = new FormData()
    formData.append('file', file)
    // formData.append('filepath', '/sada/')
    const fileRes = await axios.post(
            `${backendUrl}/dashboard/uploadfile`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
    )
    return fileRes
  }

  async updateProject(){
    this.setState({
      isLoading: true
    })
    const updateProjectRes = await axios.put(
      `${backendUrl}/dashboard/project/`,
      {
        project_id: this.props.projectId,
        project_type: this.state.type,
        project_status: this.state.projectStatus,
        title: this.state.title,
        client: this.state.customer,
        assigned_to: this.state.assignedUser,
        due_date: this.state.dueDate,
        pipespec_number: this.state.pipeSpecNumber,
        coatingspec_number: this.state.coatingSpecNumber,
        purchase_order: this.state.purchasedOrderNo
      },
      {
        timeout: 60000
      }
    ).catch(err => {
      this.setState({
        CreateProjectErrorMsg: 'Time limit exceeded for request. Please try again.'
      })
    })

    if(updateProjectRes.data.status === 'error') {
      this.setState({
        CreateProjectErrorMsg: 'Some issue occur in updating project. Please try again.'
      })
    }
    this.setState({
      isLoading: false,
      dueDate: new Date(this.state.dueDate)
    })
    setTimeout(()=> {
      this.setState({
        CreateProjectErrorMsg: ''
      })
    }, 10000)
  }

  async upLoadMultipleFiletoS3 (file1, file2, file3, file4) {
    const formData1 = new FormData();
    formData1.append('file', file1);
    const formData2 = new FormData();
    formData2.append('file', file2);
    const formData3 = new FormData();
    formData3.append('file', file3);
    
    const [file1Res, file2Res, file3Res] = await Promise.all([
      axios.post(
        `${backendUrl}/dashboard/uploadfile`,
        formData1,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ),
      axios.post(
        `${backendUrl}/dashboard/uploadfile`,
        formData2,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ),
      axios.post(
        `${backendUrl}/dashboard/uploadfile`,
        formData3,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
    ]);

    let file4Res = null;
    if(file4){
      const formData4 = new FormData();
      formData4.append('file', file4);
      await axios.post(
        `${backendUrl}/dashboard/uploadfile`,
        formData4,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(res => {
        file4Res = res
      }).catch(err => {
        file4Res = ''
      })
    }

    return [file1Res, file2Res, file3Res, file4Res];
  }

  validateFormData () {
    const fields = Object.keys(this.state.errorMsg)
    let flag = false
    let cErr = this.state.errorMsg
    fields.map(field => {
      if (this.state[field] === '') {
        cErr[field] = '*it is required field'
        flag = true
      }
    })

    this.setState({
      errorMsg: cErr
    })
    return flag
  }

  async onSave () {
    if (this.validateFormData()) {
      return
    }

    this.setState({
      isLoading: true
    })

    this.interval = setInterval(() => {
      let val = this.state.isLoadingProgress
      val += Math.floor(Math.random() * 10) + 2
      if (val < 40) {
        this.setState({
          isLoadingTexts: 'Uploading documents...'
        })
      }
      if (val < 40) {
        this.setState({
          isLoadingProgress: val
        })
      }
    }, 2000)

    const { title, customer, type, dueDate } = this.state
    const { file1, file2, file3, file4 } = this.state
    const fileResArr = await this.upLoadMultipleFiletoS3(file1,file2, file3, file4);

    this.interval = setInterval(() => {
      let val = this.state.isLoadingProgress
      val += Math.floor(Math.random() * 10) + 2

      if (val > 50 && val < 65) {
        this.setState({
          isLoadingTexts: 'Preparing insights...'
        })
      }
      if (val > 65 && val < 90) {
        this.setState({
          isLoadingTexts: 'Creating project...'
        })
      }
      if (val > 90) {
        this.setState({
          isLoadingTexts: 'Finalizing...'
        })
      }
      if (val < 100) {
        this.setState({
          isLoadingProgress: val
        })
      }
    }, 2000)


    const createProjectRes = await axios.post(
      `${backendUrl}/dashboard/create_project`,
      {
        title: title,
        client: customer,
        project_type: type,
        cost_sheet: fileResArr[0].data.data,
        specs_pipe: fileResArr[1].data.data,
        inner_coating: fileResArr[2].data.data,
        outer_coating: fileResArr[3] ? fileResArr[3].data.data : '',
        assignedTo: this.state.assignedUser,
        createdBy: this.props.userName,
        due_date: this.state.dueDate,
        pipespec_number: this.state.pipeSpecNumber,
        coatingspec_number: this.state.coatingSpecNumber,
        purchase_order: this.state.purchasedOrderNo
      },
      {
        timeout: 90000
      }
    ).then(res => {
      if(res.data.status === 'error'){
        this.setState({
          isLoading: false,
          errorMsg: {
            ...this.state.errorMsg,
            CreateProjectErrorMsg: 'Some issue occured during creating project. Please try again!'
          }
        })
      } else {
        const projectId = res.data.data.ProjectID
        this.props.setProjectId(projectId)
        this.props.setProjectCustomer(customer)
        this.props.setProjectTitle(title)
        this.props.setProjectType(type)
        this.props.setDueDate(dueDate)
        this.props.setAssignedUser(this.state.assignedUser)
        this.setState({
          isLoading: false
        })
        history.push('/Inquiry/create-new-projects/calculations')
      }
    }).catch(err => {
      this.setState({
        isLoading: false,
        errorMsg: {
          ...this.state.errorMsg,
          CreateProjectErrorMsg: 'Time limit exceeded for request. Please try again!'
        }
      })
    })
  }

  onDelete () {
    console.log('Data deleted')
  }

  displayValueTemplate (value) {
    return (
      <React.Fragment>
        {this.state.isLoadingTexts}
      </React.Fragment>
    )
  }

  filterCountryMultiple (event) {
    const results = this.state.customerSuggestion.filter((customer) => {
      return customer.toLowerCase().startsWith(event.query.toLowerCase() || event.value.toLowerCase())
    })

    this.setState({ filteredCustomers: results })
  }

  suggestEmails(event) {
    let results = this.state.emailList.filter((email) => {
      return email.toLowerCase().startsWith(event.query.toLowerCase());
    });

    this.setState({ assignedUserSuggestions: results });
  }

  renderSuggestion (suggestion) {
    return (<div>
      {suggestion}
    </div>)
  };

  render () {
    return (!this.state.isLoading
      ? (
        <div className="container-fliud">
          <form onSubmit={obj => this.onSave(obj)}>
            <div className="row">
              <div className="col-6 justify-content-start divider">
                <div className="form-group">
                  <div className="upload-label-2">Project Id</div>
                  { this.props.newProject ? <Input id="projectId"
                    value={this.state.projectId}
                    readOnly={true}
                    disabled={true}
                  /> : <div className="readOnlyValues">{this.state.projectId}</div>}
                </div>
                <div className="form-group">
                  <div className="upload-label-2">Project Name</div>
                  {<Input id="title"
                    value={this.state.title}
                    onChange={this.handleInputTitle}
                    readOnly={this.props.readOnly}
                  />}
                  <p className="text-danger font-italic">{this.state.errorMsg.title}</p>
                </div>
                <div className="form-group">
                  <div className="upload-label-2">Customer</div>
                  {this.props.newProject ? <AutoComplete
                    id="customer"
                    inputStyle={{width: '100%'}}
                    value={this.state.customer}
                    onChange={this.handleInputCustomer}
                    suggestions={this.state.filteredCustomers} 
                    completeMethod={this.filterCountryMultiple}
                  /> : <div className="readOnlyValues">{this.state.customer}</div>}
                  <p className="text-danger font-italic">{this.state.errorMsg.customer}</p>
                </div>
                <div className="form-group">
                  <div className="upload-label-2">Type</div>
                  {this.props.newProject ? <Dropdown id="type" value={this.state.type}
                    options={this.state.projectTypes}
                    onChange={this.handleInputType}
                  />: <div className="readOnlyValues">{this.state.type}</div>}
                  <p className="text-danger font-italic">{this.state.errorMsg.type}</p>
                </div>
                <div className="form-group">
                  <div className="upload-label-2">Assigned To</div>
                  {<AutoComplete
                    id="assignedUser"
                    inputStyle={{ width: '100%'}}
                    value={this.state.assignedUser}
                    onChange={(e) => {
                      this.setState({assignedUser: e.value});
                      if(e.value.length){
                        this.setState({
                          errorMsg: {
                            ...this.state.errorMsg,
                            assignedUser: ''
                          }
                        })
                      } else {
                        this.setState({
                          errorMsg: {
                            ...this.state.errorMsg,
                            assignedUser: '*It is required!'
                          }
                        })
                      }
                    }}
                    suggestions={this.state.assignedUserSuggestions} 
                    completeMethod={this.suggestEmails.bind(this)}
                  />}
                  <p className="text-danger font-italic">{this.state.errorMsg.assignedUser}</p>
                </div>
                <div className="form-group">
                  <div className="upload-label-2">Due Date</div>
                  {<Calendar
                    id="dueDate"
                    value={this.state.dueDate}
                    minDate={new Date()}
                    onChange={(e) => this.setState({
                      dueDate: e.value,
                      errorMsg: {
                        ...this.state.errorMsg,
                        dueDate: ''
                      }
                    })}
                    monthNavigator={true}
                    yearNavigator={true}
                    yearRange="2020:2030"
                  />}
                  <p className="text-danger font-italic">{this.state.errorMsg.dueDate}</p>
                </div>
              </div>
              {this.props.newProject ? <div className="col-6">
                <div className="form-group">
                  <div className="upload-label-2">Pipe Spec Number <span className="optional-field">(Optional)</span></div>
                  {<AutoComplete
                    id="assignedUser"
                    inputStyle={{ width: '100%'}}
                    value={this.state.pipeSpecNumber}
                    onChange={(e) => {
                      this.setState({pipeSpecNumber: e.value});
                      if(e.value.length){
                        this.setState({
                          errorMsg: {
                            ...this.state.errorMsg,
                            pipeSpecNumber: ''
                          }
                        })
                      } else {
                        this.setState({
                          errorMsg: {
                            ...this.state.errorMsg,
                            pipeSpecNumber: '*It is required!'
                          }
                        })
                      }
                    }}
                    suggestions={[]} 
                    completeMethod={this.suggestEmails.bind(this)}
                  />}
                  <p className="text-danger font-italic">{this.state.errorMsg.pipeSpecNumber}</p>
                </div>
                <div className="form-group">
                  <div className="upload-label-2">Coating Spec Number <span className="optional-field">(Optional)</span> </div>
                  {<AutoComplete
                    id="assignedUser"
                    inputStyle={{ width: '100%'}}
                    value={this.state.coatingSpecNumber}
                    onChange={(e) => {
                      this.setState({coatingSpecNumber: e.value});
                      if(e.value.length){
                        this.setState({
                          errorMsg: {
                            ...this.state.errorMsg,
                            coatingSpecNumber: ''
                          }
                        })
                      } else {
                        this.setState({
                          errorMsg: {
                            ...this.state.errorMsg,
                            coatingSpecNumber: '*It is required!'
                          }
                        })
                      }
                    }}
                    suggestions={[]} 
                    completeMethod={this.suggestEmails.bind(this)}
                  />}
                  <p className="text-danger font-italic">{this.state.errorMsg.coatingSpecNumber}</p>
                </div>
                <div className="form-group">
                  <div className="upload-label-2">Purchase Order No <span className="optional-field">(Optional)</span></div>
                  {<AutoComplete
                    id="assignedUser"
                    inputStyle={{ width: '100%'}}
                    value={this.state.purchasedOrderNo}
                    onChange={(e) => {
                      this.setState({purchasedOrderNo: e.value});
                    }}
                    suggestions={[]} 
                    completeMethod={this.suggestEmails.bind(this)}
                  />}
                </div>

                <div className="upload-label-2" >Cost Sheet</div>
                <FileUpload
                  className="cost-sheet-upload"
                  onFileSelect={this.saveFile1}
                  disabled={!this.props.newProject}
                  docxOnly={true}
                />
                <p className="text-danger font-italic">{this.state.errorMsg.file1}</p>

                <div className="upload-label-2" >Pipe</div>
                <FileUpload
                  className="pipe-upload"
                  onFileSelect={this.saveFile2}
                  disabled={!this.props.newProject}
                />
                <p className="text-danger font-italic">{this.state.errorMsg.file2}</p>

                <div className="upload-label-2" >Internal Coating</div>
                <FileUpload
                  className="inner-coating-upload"
                  disabled={!this.props.newProject}
                  onFileSelect={this.saveFile3}
                />
                <p className="text-danger font-italic">{this.state.errorMsg.file3}</p>

                <div className="upload-label-2" >External Coating</div>
                <FileUpload
                  className="outer-coating-upload"
                  disabled={!this.props.newProject}
                  onFileSelect={this.saveFile4}
                />
                <p className="text-danger font-italic">{this.state.errorMsg.file4}</p>
              </div>: <div className="col-6">
                  <div className="readOnlyValues">Documents are already uploaded. Please find them on documents section.</div>
                  <div className="form-group">
                  <div className="upload-label-2">Pipe Spec Number <span className="optional-field">(Optional)</span></div>
                  {<AutoComplete
                    id="assignedUser"
                    inputStyle={{ width: '100%'}}
                    value={this.state.pipeSpecNumber}
                    onChange={(e) => {
                      this.setState({pipeSpecNumber: e.value});
                      if(e.value.length){
                        this.setState({
                          errorMsg: {
                            ...this.state.errorMsg,
                            pipeSpecNumber: ''
                          }
                        })
                      } else {
                        this.setState({
                          errorMsg: {
                            ...this.state.errorMsg,
                            pipeSpecNumber: '*It is required!'
                          }
                        })
                      }
                    }}
                    suggestions={[]} 
                    completeMethod={this.suggestEmails.bind(this)}
                  />}
                  <p className="text-danger font-italic">{this.state.errorMsg.pipeSpecNumber}</p>
                </div>
                <div className="form-group">
                  <div className="upload-label-2">Coating Spec Number <span className="optional-field">(Optional)</span></div>
                  {<AutoComplete
                    id="assignedUser"
                    inputStyle={{ width: '100%'}}
                    value={this.state.coatingSpecNumber}
                    onChange={(e) => {
                      this.setState({coatingSpecNumber: e.value});
                      if(e.value.length){
                        this.setState({
                          errorMsg: {
                            ...this.state.errorMsg,
                            coatingSpecNumber: ''
                          }
                        })
                      } else {
                        this.setState({
                          errorMsg: {
                            ...this.state.errorMsg,
                            coatingSpecNumber: '*It is required!'
                          }
                        })
                      }
                    }}
                    suggestions={[]} 
                    completeMethod={this.suggestEmails.bind(this)}
                  />}
                  <p className="text-danger font-italic">{this.state.errorMsg.coatingSpecNumber}</p>
                </div>
                <div className="form-group">
                  <div className="upload-label-2">Purchase Order No <span className="optional-field">(Optional)</span></div>
                  {<AutoComplete
                    id="assignedUser"
                    inputStyle={{ width: '100%'}}
                    value={this.state.purchasedOrderNo}
                    onChange={(e) => {
                      this.setState({purchasedOrderNo: e.value});
                    }}
                    suggestions={[]} 
                    completeMethod={this.suggestEmails.bind(this)}
                  />}
                </div>
                  <div className="form-group">
                    <div className="upload-label-2">Created By</div>
                    <div className="readOnlyValues">{this.state.createdBy || <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i>}</div>
                  </div>
                  <div className="form-group">
                    <div className="upload-label-2">Date Created (DD/MM/YYYY)</div>
                    <div className="readOnlyValues">{this.state.createdOn || <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i>}</div>
                  </div>
                  <div className="form-group">
                    <div className="upload-label-2">Date Submitted (DD/MM/YYYY)</div>
                    <div className="readOnlyValues">{this.state.submittedOn || <i className="pi pi-spin pi-spinner" style={{'fontSize': '2em'}}></i>}</div>
                  </div>
              </div>}
            </div>
            <div className="row justify-content-center" style={{marginTop: '10px'}}>
              {this.state.errorMsg.CreateProjectErrorMsg && <div class="alert alert-danger">
                {this.state.errorMsg.CreateProjectErrorMsg}
              </div>}
            </div>
            <div className="row justify-content-center">
              {this.props.newProject ? <ButtonHeader type="button" saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="details-button-header" onSave={() => this.onSave()} onDelete={() => this.onDelete()} /> : 
                <ButtonHeader type="button" buttonText={'Update Project'} saveEnabled={this.props.saveEnabled} deleteEnabled={this.props.deleteEnabled} className="details-button-header" onSave={() => this.updateProject()} onDelete={() => this.onDelete()} />
              }
            </div>
          </form>
        </div>
      )
      : (<div>
        <ProgressBar className="loading-bar" value={this.state.isLoadingProgress} displayValueTemplate={this.displayValueTemplate}></ProgressBar>
      </div>)
    )
  }
}
const mapStateToProps = state => ({
  dueDate: state.dueDate,
  projectId: state.projectId,
  projectType: state.projectType,
  projectTitle: state.projectTitle,
  projectCustomer: state.projectCustomer,
  userName: state.userName,
  assignedUser: state.assignedUser,
  dueDate: state.dueDate
})
const mapDispatchToProps = dispatch => ({
  setProjectId: (projectId) => dispatch(setProjectId(projectId)),
  setProjectTitle: (projectTitle) => dispatch(setProjectTitle(projectTitle)),
  setProjectCustomer: (projectCustomer) => dispatch(setProjectCustomer(projectCustomer)),
  setProjectType: (projectType) => dispatch(setProjectType(projectType)),
  setCurrentURL: (currentURL) => dispatch(setCurrentURL(currentURL)),
  setDueDate: (dueDate) => dispatch(setDueDate(dueDate)),
  setAssignedUser: (email) => dispatch(setAssignedUser(email))
})
export default connect(mapStateToProps, mapDispatchToProps)(Details)
