import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Promise} from "bluebird";
import {
  Alert,
  Col,
  Row,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormGroup,
  Label,
  Input,
  ListGroup,
  ListGroupItem,
  Button
} from 'reactstrap';
import Dropzone from 'react-dropzone';

const SupportPage = () => {
  const [imageFiles, setimageFiles] = useState([]);
  const [imageFilesWithurl, setImageFilesWithURL] = useState([]);
  const [imgURL, setImgURL] = useState([]);
  const [subject, setSubject] = useState([]);
  const [message, setMessage] = useState([]);
  const [fetchedData , setFetchedData]  =  useState([]);
  const [sent, setSent] = useState(0);
  const [alertMessage, setAlertMessage] = useState('');


  useEffect(() => {
    axios.post('/api/dashboard/getAllTickets').then(res => {
      setFetchedData(res.data)
    })
  }, [sent])

  const onCertificateUpload = () => {
    return new Promise(function(resolve, reject) {
      let data = []
      imageFiles.map((item, i) => {
        console.log(imageFiles.length, i);
        console.log(Math.random());
        axios.get("/s3/sign?objectName=" + item.name + "&contentType=" + item.type+"&objectKey=support").then(res => {
          const xhr = new XMLHttpRequest()
          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                // success
                data = [...data,"https://iotconekt.s3.amazonaws.com/support/" + res.data.fileKey]
                if (imageFiles.length === i + 1)
                  resolve(data);
                  // setImgURL(...imgURL,"https://s3.amazonaws.com/iotconekt/" + res.data.fileKey)
                }
              else {
                // failure
                reject();
              }
            }
          }
          xhr.open('PUT', res.data.signedUrl)
          xhr.setRequestHeader('Content-Type', item.type)
          xhr.send(item)
        })
      });
    })
  }

  const onSubmit = () => {
    if(imageFiles.length>0){
      onCertificateUpload().then((imgURLs) => {
        axios
          .post("/api/dashboard/createTicket",{subject:subject, message:message, images:imgURLs})
          .then(res => {
            setSent(sent+1);
            setAlertMessage(res.data.message);
            console.log(res.data);
          })
      })
    }
    else{
      axios
        .post("/api/dashboard/createTicket",{subject:subject, message:message, images:""})
        .then(res => {
          setSent(sent+1);
          setAlertMessage(res.data.message);
        })
    }
  }

  const onDrop = (acceptedFiles => {
    if(imageFiles.length <= 3){
    setimageFiles([
      ...imageFiles,
      acceptedFiles[0]
    ])
    setImageFilesWithURL([
      ...imageFilesWithurl,
      URL.createObjectURL(acceptedFiles[0])
    ])
  }
  })

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
    <Col sm="12" xl="12">
      <Card>
        {alertMessage!='' && <Alert>{alertMessage}</Alert>}
        <CardHeader>
          <i className="fa fa-align-justify"></i>
          <strong>Raise Ticket</strong>
        </CardHeader>
        <CardBody>
          <Form className="form-horizontal">
            <FormGroup row="row">
              <Col md="3">
                <Label htmlFor="text-input">Subject</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="text" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} id="text-input" placeholder="Enter Subject Name"/>
              </Col>
            </FormGroup>
            <FormGroup row="row">
              <Col md="3">
                <Label htmlFor="text-input">Message</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="textarea" name="message" value={message} onChange={(e) => setMessage(e.target.value)} id="text-input" placeholder="Message"/>
              </Col>
            </FormGroup>
            <FormGroup row="row">
              <Col md="3">
                <Label htmlFor="text-input">Screen Shots</Label>
              </Col>
              <Col xs="9" md="9">
                <Row>
                  <Col md="6">
                    <Dropzone onDrop={onDrop} accept="image/*"  minSize={0} maxSize={maxSize} multiple>
                      {
                        ({getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles}) => {
                          const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;
                          return (<div {...getRootProps()}>
                            <input {...getInputProps()}/> {!isDragActive && 'Click here or drop upto 3 error related images '}
                            {isDragActive && !isDragReject && "Drop it here"}
                            {isDragReject && "File type not accepted, sorry!"}
                            {
                              isFileTooLarge && (<div className="text-danger mt-2">
                                File is too large.
                              </div>)
                            }
                            <div style={previewStyle}/>
                          </div>)
                        }
                      }
                    </Dropzone>
                  </Col>
                  <Col md="6">
                    {
                      imageFilesWithurl.length > 0
                        ? <div>
                            <h4>{imageFilesWithurl.length}
                              images uploaded</h4>
                            <div>{
                                imageFilesWithurl.map((file) => <img src={file} key={Math.random()} height="50px" width="50px" style={{
                                    margin: '10px'
                                  }}/>)
                              }</div>
                          </div>
                        : null
                    }
                  </Col>
                </Row>
              </Col>
            </FormGroup>
            <Button style={{
                float: "right"
              }} color="primary" onClick={onSubmit}>Submit</Button>
          </Form>
        </CardBody>
      </Card>
    </Col>
  </div>);
}

export default SupportPage;
