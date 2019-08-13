import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader, FormFeedback,ListGroupItem,ListGroup, Form, FormGroup, Label, Input, FormText, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row , Alert } from 'reactstrap';
import ipfs from 'ipfs.js';
import { connect } from 'react-redux';
import { createNewThing, closeThingModal } from '../actions/userActions';
// import useForm from 'react-hook-form'
// import * as Yup from 'yup';
import Dropzone from 'react-dropzone'
import TextField from '@material-ui/core/TextField';
import "assets/css/ClaimPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import axios from "axios";

const RegisterThingModal = (props) => {

  const onSubmit = (e) => {
    e.preventDefault();
    props.createNewThing({
      thingName: state.thingName,
      thingDescription: state.thingDescription,
      thingBrand: state.thingBrand,
      thingStory: state.thingStory,
      thingValue: state.thingValue,
      quantity: state.quantity,
      claims: claims,
      certificateURLs: certificateURLs,
      ipfsHash: ipfsHash
    })
    setURL([]);
    setClaims([]);
    setImageFilesWithURL([]);
  };

  const [content_add, setContentAdd] = useState("Add claim");
  const [myItems, setMyItems] = useState([]);
  const [urls, setURL] = useState([]);
  const [ipfsHash, setIPFSHash] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [certificateName, setCertificateName] = useState('');
  const [imageFilesWithurl, setImageFilesWithURL] = useState([]);
  const [imageCertificateFiles, setImageCertificateFiles] = useState([]);
  const [button, setButton] = useState(true);
  const [claims, setClaims] = useState([]);

  const [state, setState] = useState({
    thingName: '',
    thingDescription: '',
    thingBrand: '',
    thingStory: '',
    thingValue: '',
    quantity: ''
  })
  let helperspan = null;
  let lastId = -1;
  const width = Math.max(50)

  //claim
  const handleFocus = (event) => {
    setContentAdd("")
  }

  const handleChange = (event) => {
    setContentAdd(event.target.value)
    console.log(content_add);
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setState(state => ({
      ...state,
      [name]: value
    }));
  }


const handleKeypress = (event) => {
  if (event.key == "Enter") {
    var newArray = myItems;
    var currentcontent = content_add.trim();
    console.log(currentcontent);
    if (!currentcontent) {
      console.log("Return");
      return;
    }

    var currentWidth = helperspan.offsetWidth;
    console.log("Hey", currentWidth);
    newArray.push({
      content: currentcontent,
      id: ++lastId,
      itemWidth: currentWidth + 2,
      verified: false
    });
    setClaims(newArray);
    setMyItems(newArray);
    setContentAdd("");
    event.preventDefault();
  }
}

const handleBlur = (event) => {
  setContentAdd("add +");
}

const handleCancelClick = (event) => {
  const idToRemove = Number(event.target.dataset["item"]);
  const newArray = myItems.filter((listitem) => { return listitem.id !== idToRemove });
  setMyItems(newArray)
}

const makeAddedList = () => {
  const elements = myItems.map((listitem, index) => (
    <li
      key={listitem.id}
      className="claimList"
      onClick={handleCancelClick}
      data-item={listitem.id}
      style={{ color: "black", borderColor: 'black' }}
      value={listitem.content}
    >
      {listitem.content}
    </li>
  ));
  return elements
}

  const onDrop = (acceptedFiles) => {
    let i;
    let length = acceptedFiles.length;
    for (i = 0; i < acceptedFiles.length; i++) {
      let file = acceptedFiles[i];
      setImageFiles([...imageFiles, URL.createObjectURL(acceptedFiles[i])])
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = (res) => {
        let content = ipfs.Buffer.from(res.target.result);
        ipfs.add(content, (err, newHash) => {
          console.log(err, ipfsHash);
          setIPFSHash([...ipfsHash, newHash[0].hash])
          if (newHash.length == length) {
            setButton(false);
          }
        })
      }
    }
  }


    const handleNameChange = event => {
      setCertificateName(event.target.value)
    };

  const uploadImages = () => {
    axios.get("/s3/sign?objectName=" + imageCertificateFiles[0].name + "&contentType=" + imageCertificateFiles[0].type+"&objectKey=Things").then(res => {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            setURL([...urls, {
              name:certificateName,
              url: "https://iotconekt.s3.amazonaws.com/Things/" + res.data.fileKey
            }]);
          } else {
            // failure
          }
        }
      }
      xhr.open('PUT', res.data.signedUrl)
      xhr.setRequestHeader('Content-Type', imageCertificateFiles[0].type)
      xhr.send(imageCertificateFiles[0])
      setImageCertificateFiles([]);
      setCertificateName('');
      setImageFilesWithURL([])
    })
  }

  const onCertificateDrop = (acceptedFiles => {
    // let handleFinishedUpload = handleFinishedUpload
    setImageCertificateFiles([acceptedFiles[0]]);
    setImageFilesWithURL([URL.createObjectURL(acceptedFiles[0])])
  })

  const toggle = () => {
    props.closeThingModal();
  }

    let projectName;
    if (props.projectName == null) {
      projectName = "None";
    }
    else {
      projectName = props.projectName;
    }
    const maxSize = 1048576;
    const previewStyle = {
      position: 'relative',
      width: '200px',
      height: '200px',
      borderWidth: '2px',
      borderColor: 'rgb(102, 102, 102)',
      borderStyle: 'dashed',
      borderRadius: '5px',
    };
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Modal style={{maxWidth: '800px'}}  isOpen={props.user.thingModalOpen} toggle={toggle}>
              <Form>
                <ModalHeader toggle={toggle}><strong>New Thing Registration </strong></ModalHeader>
                <ModalBody>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Thing name</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <TextField type="thingName"
                        label="Thing Name"
                        fullWidth
                        name="thingName"
                        onChange={handleFormChange} />
                      <FormText color="muted">Enter Thing Name</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Brand / Maker</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <TextField type="thingBrand"
                        label="Thing Brand"
                        fullWidth
                        name="thingBrand"
                        onChange={handleFormChange} />
                      <FormText color="muted">Enter Thing Brand</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">Thing description</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <TextField type="thingDescription"
                        label="Thing Description"
                        fullWidth
                        name="thingDescription"
                        onChange={handleFormChange} />
                      <FormText color="muted">Enter Thing Description</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="text-input">How is it made?</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <TextField type="text"
                        label="How is it made?"
                        fullWidth
                        name="thingStory"
                        onChange={handleFormChange} />
                      <FormText color="muted">Enter Thing Description</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Col md="3">
                      <Label htmlFor="file-multiple-input">Thing Images</Label>
                    </Col>
                    <Col xs="12" md="9">
                      <Dropzone
                        onDrop={onDrop}
                        accept="image/*"
                        minSize={0}
                        maxSize={maxSize}
                        multiple
                      >
                      {({ getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles }) => {
                        const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                        return (
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            {!isDragActive && 'Click here or drop upto 3 images'}
                            {isDragActive && !isDragReject && "Drop it here"}
                            {isDragReject && "File type not accepted, sorry!"}
                            {isFileTooLarge && (
                              <div className="text-danger mt-2">
                                File is too large.
                              </div>
                            )}
                            <div style={previewStyle} />
                          </div>
                        )
                      }}
                      </Dropzone>
                      {imageFiles.length > 0 ? <div>
                        <h4>{imageFiles.length} images uploaded</h4>
                        <div>{imageFiles.map((file) => <img src={file} height="50px" width="50px" />)}</div>
                      </div> : null}
                      <FormText color="muted"></FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Monetary Value</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input type="number"
                      placeholder="Price of the thing (if applicable)?"
                      name="thingValue"
                      onChange={handleFormChange} />
                  </Col>
                </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Quantity</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="number"
                    min={1} defaultValue={1}
                    name="quantity"
                    onChange={handleFormChange} />
                </Col>
              </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label htmlFor="text-input">Claims</Label>
                  </Col>
                  <Col xs="12" md="9">
                  <Input
                    id="add"
                    type="text"
                    name="claims"
                    autoComplete="off"
                    maxLength="1000"
                    onFocus={handleFocus}
                    onChange= {handleChange}
                    value={content_add}
                    onKeyPress={handleKeypress}
                    onBlur={handleBlur}
                  />
                  <FormText color="muted">Hit "Enter" to confirm</FormText>
                  <span style={{ whiteSpace: "pre", visibility: "hidden", position: "absolute", pointerEvents: "none" }} ref={el => (helperspan = el)}>
                    {content_add}
                  </span>
                    </Col>
                  </FormGroup>
                      <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Claim list</Label>
                      </Col>
                    <Col xs="12" md="9">
                    <ListGroupItem>
                      {makeAddedList()}
                    </ListGroupItem>
                    <FormText color="muted">Click a pill to remove.</FormText>
                      </Col>
                      </FormGroup>
                      <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Certificate Name</Label>
                      </Col>
                    <Col xs="12" md="9">
                    <Input type="text" placeholder="Enter Certificate File Name" name="certificateName" value={certificateName} onChange={handleNameChange} />
                    <FormText color="muted">Name of the certificate.</FormText>
                      </Col>
                      </FormGroup>
                      <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input"> Certificate Image</Label>
                      </Col>
                    <Col xs="12" md="9">
                    <Row>
                      <Col sm="12" xl="6">
                    <Dropzone onDrop={onCertificateDrop} accept="image/*" minSize={0} maxSize={maxSize} multiple={false}>
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
                            <div>{imageFilesWithurl.map((file) => <img src={file} height="170px" key={0} width="170px" />)}</div>
                          </div>
                          : null
                      }
                    </Col>
                  </Row>
                    <br/>
                      <Button color="primary" onClick={uploadImages}>Upload Certificates</Button>
                      </Col>
                      </FormGroup>
                      <FormGroup row>
                      <Col md="3">
                        <Label htmlFor="text-input">Uploaded Certificates</Label>
                      </Col>
                    <Col xs="12" md="9">
                    {
                      urls.length !== 0 && urls.map((url, i) => {
                        // return (<ListGroupItem><a href={url}>{url}</a></ListGroupItem>)
                        return (<ListGroupItem>
                          Certificate Name : {url.name}
                          <img style={{
                            padding: 10
                          }} src={url.url} key={i + 1} alt="Smiley face" height="100" width="100" /></ListGroupItem>)
                      })
                    }
                      </Col>
                      </FormGroup>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary"  onClick={onSubmit}>Add new Thing</Button>
                </ModalFooter>
              </Form>
              {props.errors.thingError && (<FormGroup>
                    <Col md="12" className="center">

              <Alert color="danger">
                {props.errors.thingError.message}
              </Alert>

          </Col>
              </FormGroup>  )
              }
            </Modal>
          </Col>
        </Row>
      </div>
    );
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { createNewThing, closeThingModal })(RegisterThingModal);
