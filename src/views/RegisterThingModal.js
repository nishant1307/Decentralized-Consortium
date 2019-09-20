import React, { useState,useEffect } from 'react';
import ipfs from 'ipfs.js';
const IPFS = require('ipfs-http-client')
import { connect } from 'react-redux';
import { createNewThing, closeThingModal } from 'actions/userActions';
import Dropzone from 'react-dropzone'
import Modal from "components/CustomModal/Modal";
import "assets/css/ClaimPage.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { renderFromArray } from 'utils';
import { currencyCode } from "assets/data/countryList";
import axios from "axios";
import Snackbar from '../components/Snackbar/Snackbar.jsx'
import {
  TextField,
  CircularProgress,
  Select,
  OutlinedInput,
  InputLabel,
  FormHelperText,
  FormControl,
  FormGroup,
  Button
} from '@material-ui/core';
import GridItem from "components/Grid/GridItem";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
 
  margin: {
    margin: theme.spacing(1)
  },
}));
const RegisterThingModal = (props) => {
// console.log(props.projectId);
const classes = useStyles();
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    props.createNewThing({
      thingName: state.thingName,
      thingDescription: state.thingDescription,
      thingBrand: state.thingBrand,
      thingStory: state.thingStory,
      thingValue: state.thingCurrencyCode + " " + state.thingValue,
      quantity: state.quantity,
      claims: claims,
      certificateURLs: [],
      ipfsHash: ipfsHash,
      projectId: props.projectId
    })
    setURL([]);
    setClaims([]);
    setImageFilesWithURL([]);
  };

  const [isLoading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ color: 'danger', open: false, message: '' })
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
  const initialState = {
    thingName: '',
    thingDescription: '',
    thingBrand: '',
    thingStory: '',
    thingCurrencyCode: 'INR',
    thingValue: '',
    quantity: '1'
  };

  const [state, setState] = useState(initialState)
  let helperspan = null;
  let lastId = -1;
  const width = Math.max(50)

  useEffect(() => {
    if (props.errors.message !== undefined) {
      setSnackbar({ open: true, message: "Network error Occured! Please try again later." });
      setTimeout(() => {
        setSnackbar({ open: false, message: "" });
      }, 10000)
      props.closeThingModal();
      setLoading(false)
    }
  }, [props.errors]);

  //claim
  const handleFocus = (event) => {
    setContentAdd("")
  }

  const handleChange = (event) => {
    setContentAdd(event.target.value)
    // console.log(content_add);
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
      // console.log(currentcontent);
      if (!currentcontent) {
        // console.log("Return");
        return;
      }

      var currentWidth = helperspan.offsetWidth;
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
        let content = IPFS.Buffer.from(res.target.result);
        ipfs.add(content, (err, newHash) => {
          // console.log(err, ipfsHash);
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
    axios.get("/s3/sign?objectName=" + imageCertificateFiles[0].name + "&contentType=" + imageCertificateFiles[0].type + "&objectKey=Things").then(res => {
      const xhr = new XMLHttpRequest()
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            setURL([...urls, {
              name: certificateName,
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
    setState(initialState);
    setLoading(false);
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
    width: '100%',
    height: '200px',
    borderWidth: '2px',
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: '5px',
  };
  return (
    <div className="animated fadeIn">
      <GridItem>
        <Modal
          open={props.user.thingModalOpen}
          onClose={toggle}
          title="New Product Registration"
          content={
            <>
              <FormGroup row>
                <GridItem xs="12" md="6">
                  <TextField
                    variant="outlined"
                    type="thingName"
                    label="Product Name"
                    fullWidth
                    name="thingName"
                    onChange={handleFormChange} />
                  <FormHelperText color="muted">Enter Product Name</FormHelperText>
                </GridItem>
                <GridItem xs="12" md="6">
                  <TextField
                    variant="outlined"
                    type="thingBrand"
                    label="Product Brand"
                    fullWidth
                    name="thingBrand"
                    onChange={handleFormChange} />
                  <FormHelperText color="muted">Enter Product Brand</FormHelperText>
                </GridItem>
              </FormGroup><br />
              <FormGroup row>
                <GridItem xs="12" md="6">
                  <TextField
                    variant="outlined"
                    type="thingDescription"
                    label="Product Description"
                    fullWidth
                    multiline
                    rows="4"
                    name="thingDescription"
                    onChange={handleFormChange} />
                  <FormHelperText color="muted">Enter Product Description</FormHelperText>
                </GridItem>
                <GridItem xs="12" md="6">
                  <TextField
                    variant="outlined"
                    type="text"
                    label="How is it made?"
                    fullWidth
                    multiline
                    rows="4"
                    name="thingStory"
                    onChange={handleFormChange} />
                  <FormHelperText color="muted">Enter Product Description</FormHelperText>
                </GridItem>
              </FormGroup><br />
              <FormGroup row>
                <GridItem xs="12" md="6">
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="industryList">Currency Code</InputLabel>
                    <Select
                      name="thingCurrencyCode"
                      value={state.thingCurrencyCode}
                      required
                      labelWidth={50}
                      input={<OutlinedInput />}
                      onChange={handleFormChange}
                    >
                      {renderFromArray(currencyCode)}
                    </Select>
                  </FormControl>
                  <TextField
                    variant="outlined"
                    label="Product Price"
                    type="number"
                    placeholder="Price of the product (if applicable)?"
                    name="thingValue"
                    onChange={handleFormChange} />
                </GridItem>
                <GridItem xs="12" md="6">
                  <TextField
                    variant="outlined"
                    label="Product Quantity"
                    type="number"
                    min={1} defaultValue={1}
                    name="quantity"
                    onChange={handleFormChange} />
                </GridItem>
              </FormGroup>
              <FormGroup row>
                <GridItem xs="12" md="12">
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
                  <FormHelperText color="muted"></FormHelperText>
                </GridItem>
              </FormGroup>
              <FormGroup row>
                <GridItem xs="12" md="12">
                  <TextField
                    id="add"
                    type="text"
                    variant="outlined"
                    name="claims"
                    autoComplete="off"
                    maxLength="1000"
                    onFocus={handleFocus}
                    onChange={handleChange}
                    value={content_add}
                    onKeyPress={handleKeypress}
                    onBlur={handleBlur}
                  />
                  <FormHelperText color="muted">Hit "Enter" to confirm</FormHelperText>
                  <span style={{ whiteSpace: "pre", visibility: "hidden", position: "absolute", pointerEvents: "none" }} ref={el => (helperspan = el)}>
                    {content_add}
                  </span>
                </GridItem>
              </FormGroup>
              <FormGroup row>
                <GridItem xs="12" md="12">
                  {makeAddedList()}
                  <FormHelperText color="muted">Click a pill to remove.</FormHelperText>
                </GridItem>
              </FormGroup>
              {/*    <FormGroup row>
                        <GridItem md="3">
                          <Label htmlFor="text-input">Certificate Name</Label>
                        </GridItem>
                      <GridItem xs="12" md="12">
                      <Input type="text" placeholder="Enter Certificate File Name" name="certificateName" value={certificateName} onChange={handleNameChange} />
                      <FormHelperText color="muted">Name of the certificate.</FormHelperText>
                        </GridItem>
                        </FormGroup>
                        <FormGroup row>
                        <GridItem md="3">
                          <Label htmlFor="text-input"> Certificate Image</Label>
                        </GridItem>
                      <GridItem xs="12" md="12">
                      <Row>
                        <GridItem sm="12" xl="6">
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
                      </GridItem>
                      <GridItem sm="12" xl="6">
                        {
                          imageFilesWithurl.length > 0
                            ? <div>
                              <h4>{imageFilesWithurl.length}
                                images uploaded</h4>
                              <div>{imageFilesWithurl.map((file) => <img src={file} height="170px" key={0} width="170px" />)}</div>
                            </div>
                            : null
                        }
                      </GridItem>
                    </Row>
                      <br/>
                        <Button color="primary" onClick={uploadImages}>Upload Certificates</Button>
                        </GridItem>
                        </FormGroup>
                    <FormGroup row>
                        <GridItem md="3">
                          <Label htmlFor="text-input">Uploaded Certificates</Label>
                        </GridItem>
                      <GridItem xs="12" md="12">
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
                        </GridItem>
                        </FormGroup> */}
            </>

          }
          action={
            <>
              {!isLoading ? <Button color="primary" type="button" onClick={onSubmit}>Create Product</Button> : <CircularProgress />}
            </>
          }
        />

      </GridItem>
      <Snackbar color="danger" open={snackbar.open} place="bl" className={classes.margin} message={snackbar.message} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});

export default connect(mapStateToProps, { createNewThing, closeThingModal })(RegisterThingModal);
