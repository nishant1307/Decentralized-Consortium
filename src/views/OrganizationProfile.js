import React, { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "axios";
import ColleagueForm from './ColleagueForm';
// const { CSSTransitionGroup } = ReactTransitionGroup;
import { Alert, TabContent, TabPane, Nav, NavItem, NavLink, CardTitle, CardText } from 'reactstrap';
import classnames from 'classnames';
import 'assets/css/ClaimPage.css'
import {
  Col,
  Row,
  ListGroup,
  ListGroupItem,
  Button,
  FormText,
} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone'
import {parseJSONFromIPFSHash} from "utils";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import Divider from '@material-ui/core/Divider';
import Claims from "views/Claims&Certifications/Claims";
// import 'bootstrap/dist/css/bootstrap.min.css';

// import DropzoneS3Uploader from 'react-dropzone-s3-uploader'

class OrganizationProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organization: '',
      admin: false,
      urls: [],
      deletedUrls: [],
      imageFiles: [],
      imageFilesWithurl: [],
      isOpen: false,
      certificateName: '',
      activeTab: '1',
      //
      content_add: "Add claim +",
      width: 100,
      myItems: [],
      alertMessage: '',
      invitedProjects: [],
      plan:{}
    };

    this.renderColleagueForm = this.renderColleagueForm.bind(this);


    this.helperspan = null;
    this.lastId = -1;

  }

  componentDidMount(){
    // parseJSONFromIPFSHash(props.user.user[4]).then(userDetails => {
    //   setUserName(userDetails.info.fullName);
    // })
  }



  componentDidUpdate(prevProps, prevState) {
    if (prevState.content_add != this.state.content_add) {
      const helperWidth = this.helperspan.offsetWidth;
      this.setState({ width: Math.max(50, helperWidth + 1) });
      this.forceUpdate();
    }
  }

  makeAddedList() {
    const elements = this.state.myItems.map((listitem, index) => (
      <li
        key={listitem.id}
        className="claimList"
        onClick={this.handleCancelClick}
        data-item={listitem.id}
        style={{ color: "black", borderColor: listitem.verified ? 'green' : 'red' }}
        value={listitem.content}
      >
        {listitem.content}
      </li>
    ));
    return elements
  }



  handleNameChange = event => {
    this.setState({ certificateName: event.target.value });
    this.forceUpdate();
  };

  handleColleagueFormSubmit = status => {
    this.setState({
      alertMessage: <Alert color={status === 'User already registered to the platform' ? 'danger' : 'success'}>{status}</Alert>
    })
    setTimeout(
      function () {
        this.setState({
          alertMessage: ''
        })
      }
        .bind(this),
      3000
    );
  }

  renderColleagueForm() {
    this.setState({ 'colleagueForm': <ColleagueForm onColleagueFormSubmit={this.handleColleagueFormSubmit} /> });
  }

  componentDidMount() {
    axios.post("/api/dashboard/getOrganizationInfo", {}).then(res => {
      this.setState({ organization: res.data.organization, admin: this.props.user.user.role === "0" ? true : false })
    });
    axios.post("/api/dashboard/getSubscriptionInfo", {}).then(res => {
      const date1 = new Date(res.data.plan.startDate)
      const date2 = new Date(res.data.plan.endDate)
      this.setState({ plan:{"startDate":date1.toString() ,"endDate":date2.toString() ,"credits":res.data.plan.credits,"dataUsage":res.data.plan.dataUsage}})
    });
    this.forceUpdate();
    this.fetchCertificateDetails()
    this.fetchinvitedConsortiumProjectInfo()
  }

  fetchinvitedConsortiumProjectInfo = () => {
    axios.post("/api/dashboard/invitedConsortiumProjectInfo", {}).then(res => {
      this.setState({ invitedProjects: res.data.projectList })
    });
    this.forceUpdate();
  }

  fetchCertificateDetails = () => {
    axios.post("/api/dashboard/getCertification", {}).then(res => {
      this.setState({ urls: res.data.certificationLinks, myItems: res.data.claims })
    })
  }

  deleteCertificateFiles = () => {
    axios.post("/api/dashboard/deleteCertification", { urls: this.state.deletedUrls }).then(res => {
      this.setState({ deletedUrls: [] });
      this.fetchCertificateDetails()
      this.setState({
        alertMessage: <Alert>{res.data.message}</Alert>
      })
    })
  }

  handleCertificationChanges = (e) => {
    if (this.state.deletedUrls.find(x => x.url === e.target.name)) {
      let temp = this.state.deletedUrls
      temp = temp.filter((item) => item.url !== e.target.name);
      this.setState(prevState => ({ deletedUrls: temp }))
      this.forceUpdate();
    } else {
      let temp = this.state.urls
      temp = temp.filter((item) => item.url === e.target.name);
      this.setState(prevState => ({
        deletedUrls: [
          ...prevState.deletedUrls,
          temp[0]
        ]
      }))
      this.forceUpdate();
    }
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  //
  handleFinishedUpload = (key) => {
    // console.log("in here", key);
    let { certificateName, urls } = this.state
    this.setState({
      urls: [
        {
          name: certificateName,
          url: "https://iotconekt.s3.amazonaws.com/OrganizationProfile/" + key
        },
        ...urls
      ],
      imageFiles: [],
      certificateName: ''

    }, () => {
      // console.log(this.state);
      axios.post("/api/dashboard/addCertification", { urls: this.state.urls }).then(res => {
        this.fetchCertificateDetails()
        this.setState({
          alertMessage: <Alert>{res.data.message}</Alert>
        })
      })
    });
  }

  onCertificateUpload = () => {
    let handleFinishedUpload = this.handleFinishedUpload
    axios.get("/s3/sign?objectName=" + this.state.imageFiles[0].name + "&contentType=" + this.state.imageFiles[0].type+"&objectKey=OrganizationProfile").then(res => {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            // success
            handleFinishedUpload(res.data.fileKey)
          } else {
            // failure
          }
        }
      }
      xhr.open('PUT', res.data.signedUrl)
      xhr.setRequestHeader('Content-Type', this.state.imageFiles[0].type)
      xhr.send(this.state.imageFiles[0])
    })
  }

  onDrop = (acceptedFiles => {
    this.setState({
      imageFiles: [acceptedFiles[0]],
      imageFilesWithurl: [URL.createObjectURL(acceptedFiles[0])]
    });
  })
  //

  render() {
    const {
      organization,
      imageFiles,
      colleagueForm,
      admin,
      urls,
      isOpen,
      imageFilesWithurl,
      alertMessage,
      invitedProjects,
      plan
    } = this.state;
    const previewStyle = {
      position: 'relative',
      width: '200px',
      height: '200px',
      borderWidth: '2px',
      borderColor: 'rgb(102, 102, 102)',
      borderStyle: 'dashed',
      borderRadius: '5px'
    };
    const maxSize = 1048576;
    return (<div>
      <Row>
        <Col sm="12" xl="6">
        <Card style={{height: "200px"}}>
          <CardHeader>
            <strong>Organization Info</strong>
          </CardHeader>
          <Divider/>
          <CardBody>
              <b>Organization Name:</b> {this.props.user.organization[1]}<br/>
              <b>Organization ID: </b>{this.props.user.organization[0]}<br/>
              <b>Organization Address: </b>
          </CardBody>
        </Card>
              <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i>
              <strong>Organization Plan Info</strong>
            </CardHeader>
            <CardBody>
              <ListGroup>
                <ListGroupItem>Plan Type: Trial</ListGroupItem>
                <ListGroupItem>Start Date: {plan.startDate}</ListGroupItem>
                <ListGroupItem>End Date: {plan.endDate}</ListGroupItem>
                <ListGroupItem>Credits: {plan.credits}</ListGroupItem>
              </ListGroup>
            </CardBody>
          </Card>
              <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i>
              <strong>Organization Admin Info</strong>
            </CardHeader>
            {
              admin && <CardBody>
                <ListGroup>
                  <ListGroupItem>First Name: {this.props.user.user.firstName}</ListGroupItem>
                  <ListGroupItem>Last Name: {this.props.user.user.lastName}</ListGroupItem>
                  <ListGroupItem>Email ID: {this.props.user.user.email}</ListGroupItem>

                </ListGroup>
                <br />
                <Button color="primary" onClick={this.renderColleagueForm}>Add your colleagues
                  </Button>
                <br /> {colleagueForm}
              </CardBody>
            }
          </Card>
        </Col>
        {this.props.user.user[5]==1 && <Col sm="12" xl="6">
          <Card>
            <CardHeader>
              <i className="fa fa-align-justify"></i>
              <strong>Upload certificates of authenticity or standards</strong>
            </CardHeader>
            <Divider/>
            <CardBody>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }}
                  >
                    Claims
            </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }}
                  >
                    Certificates
            </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Claims/>
                </TabPane>
                <TabPane tabId="2">
                  <ListGroup>
                    <ListGroupItem>
                      <TextField
                      variant="outlined"
                      type="text" placeholder="Enter Certificate File Name" name="certificateName" required="required" value={this.state.certificateName} onChange={this.handleNameChange} />
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col sm="12" xl="6">
                          <Dropzone onDrop={this.onDrop} accept="image/*" minSize={0} maxSize={maxSize} multiple={false}>
                            {
                              ({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                                const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                                return (<div {...getRootProps()}>
                                  <input {...getInputProps()} /> {!isDragActive && 'Click here or drop an images'}
                                  {isDragActive && !isDragReject && "Drop it here"}
                                  {isDragReject && "File type not accepted, sorry!"}
                                  {
                                    isFileTooLarge && (<div className="text-danger mt-2">
                                      File is too large.
                                </div>)
                                  }
                                  <div style={previewStyle} />
                                </div>)
                              }
                            }
                          </Dropzone>

                        </Col>
                        <Col sm="12" xl="6">
                          {
                            imageFilesWithurl.length > 0
                              ? <div>
                                <h4>{imageFilesWithurl.length}
                                  images uploaded</h4>
                                <div>{imageFilesWithurl.map((file) => <img src={file} height="170px" key={0} onClick={() => this.setState({ isOpen: true })} width="170px" />)}</div>
                              </div>
                              : null
                          }
                        </Col>
                      </Row>
                      <br />
                      <Button color="primary" onClick={this.onCertificateUpload}>Upload certificates</Button>
                      <FormText color="muted"></FormText>
                    </ListGroupItem>
                    <ListGroupItem>
                      <CardHeader>
                        <i className="fa fa-align-justify"></i>
                        <strong>Manage uploaded certificates</strong>
                      </CardHeader>
                    </ListGroupItem>
                    <ListGroupItem>
                      {
                        urls.length === 0 && <p>No data found!</p>
                      }
                      {
                        urls.length !== 0 && urls.map((url, i) => {
                          // return (<ListGroupItem><a href={url}>{url}</a></ListGroupItem>)
                          return (<ListGroupItem>
                            <input name={url.url} key={i} type="checkbox" onChange={this.handleCertificationChanges} />
                            Certificate Name : {url.name}
                            <img style={{
                              padding: 10
                            }} src={url.url} key={i + 1} alt="Smiley face" height="100" width="100" /></ListGroupItem>)
                        })
                      }
                    </ListGroupItem>
                    {
                      urls.length !== 0 &&  <ListGroupItem>
                      <Button color="primary" onClick={this.deleteCertificateFiles}>Delete certificates</Button>
                    </ListGroupItem> }
                  </ListGroup>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
          {alertMessage}
        </Col>}
      </Row>
      {isOpen && (<Lightbox mainSrc={imageFiles[0]} onCloseRequest={() => this.setState({ isOpen: false })} />)}
    </div>)
  }
}

const mapStateToProps = (state) => ({ user: state.user, errors: state.errors })

export default connect(mapStateToProps)(OrganizationProfile);
