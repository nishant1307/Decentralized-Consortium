import React, {useState, useEffect, useRef} from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  OutlinedInput,
  Select,
  MenuItem,
  FormGroup,
  FormControl,
  FormHelperText,
  InputLabel,
  CircularProgress
} from '@material-ui/core';
import uuidv1 from 'uuid/v1';
import { certificationContract, certificationAddress } from 'certificationContract';
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Modal from "components/CustomModal/Modal";
import { renderFromArray } from 'utils';
import { industryList } from 'dataset/industries';
import moment from "moment";
import "WA/css/custom.css"
import { DropzoneArea } from 'material-ui-dropzone'
import { connect } from 'react-redux';
import ipfs from 'ipfs.js';
import web3 from '../../web3';
const IPFS = require('ipfs-http-client');
const TemplateCertificate = (props) => {
  // console.log(props,"props")
  const [modalOpen, setModalOpen] = useState(true);
  const [templateID, setTemplateID] = useState('');
  const [industry, setIndustry] = useState('');
  const [certificateFiles, setCertificateFiles] = useState([]);
  const [certificateHash, setCertificateHash] = useState();
  const [infoConfirmation, setInformationConfirmed] = useState(false);
  const [claimName, setClaimName] = useState('');
  const [certificateID, setCertificateID] = useState('');
  const [loading, setLoading] = useState(false);
  const [struture, setStruture] = useState({});
  const [image, setImage] = useState({});
  const [isExist, setIsExist] = useState(false);

  const componentRef = useRef();

  const handleDropzone = (file) => {
    setCertificateFiles([...certificateFiles, { "file": file, "category": "Certificate" }])
  }

  const deleteDropzoneFile = (file) => {
    // console.log("inside");
    let temp = certificateFiles;
    temp.splice(temp.findIndex(e => e.file === file), 1);
    // console.log(temp);
    setCertificateFiles(temp);
  }

  const print = () => {
    var content = document.getElementById("printTemplate");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write('<html><head><title></title>');
    pri.document.write('<script src="https://unpkg.com/@material-ui/core@latest/umd/material-ui.production.min.js" type="text/javascript"></script>')
    pri.document.write('</head><body >');
    pri.document.write(content.innerHTML);
    pri.document.write('</body></html>');
    pri.document.close();
    pri.focus();
    setTimeout(function(){pri.print();},1000);

  }

  const handleSubmit = async () => {
    setLoading(true);
    uploadOnIPFS().then(async (result, error) => {
      // console.log(result)
      if (error) {
        console.log(error);
        setLoading(false);
        setSnackbar({ color: "danger", open: true, message: "Network error Occured! Please try again later." });
        setTimeout(() => {
          setSnackbar({ color: "success", open: false, message: "" });
        }, 10000)
      }
      const certificateID = uuidv1();
      result.certificateID = certificateID;
      setCertificateID(certificateID);
      const privateKey = await sessionStorage.getItem('privateKey');
      var transaction = {
        "to": certificationAddress,
        "data": certificationContract.methods.createCertificate(
          localStorage.getItem("address"),
          JSON.stringify(result),
          certificateID
        ).encodeABI()
      };
      transaction["gasLimit"] = 4700000;
      web3.eth.accounts.signTransaction(transaction, privateKey)
        .then(res => {
          // console.log(res.rawTransaction,"res.rawTransaction")
          web3.eth.sendSignedTransaction(res.rawTransaction)
            .on('receipt', async function (receipt) {
              setLoading(false);
              props.history.goBack()
            })
            .on('error', async function (error) {
              console.log(error);
              setLoading(false);
              setSnackbar({ color: "danger", open: true, message: "Network error Occured! Please try again later." });
              setTimeout(() => {
                setSnackbar({ color: "success", open: false, message: "" });
              }, 10000)
            })
        })
    })
  }

  function uploadOnIPFS() {
    return new Promise((resolve, reject) => {
      let _category = [];
      let _documentHash = [];
      let i = 0;
      certificateFiles.forEach(element => {
        let reader = new window.FileReader();
        reader.readAsArrayBuffer(element.file);
        reader.onloadend = async (res) => {
          let _image = await ipfs.add(IPFS.Buffer.from(res.target.result));
          let content = IPFS.Buffer.from( JSON.stringify({image:_image[0].hash ,  data: {...struture,date:moment(new Date()).format("Do MMMM YYYY")} }))
          ipfs.add(content, (err, newHash) => {
            if (err) {
              console.log(err)
              reject();
            }
            i++;
            if (certificateFiles.length === i) {
              resolve({
                title: "Certification",
                type: "Self Attested",
                documentType:"Template",
                templateType:templateID,
                industry:industry,
                properties: {
                  data: newHash[0].hash,
                }
              })
            }
          })
        }
      })
    })
  }
  const handleTemplateChange = (e) => {
    setTemplateID(e.target.value)
    setModalOpen(false);
  }

  useEffect(() => {
    if(typeof props.history.location.state !== "undefined"){
      setLoading(true);
      const {data } = props.history.location.state
     setIndustry(data.industry);
     setTemplateID(data.templateType);
     setModalOpen(false)
     setIsExist(true)
     ipfs.get(data.properties.data, function (err, files) {
        let data = JSON.parse(files[0].content.toString('utf8'))
        console.log(data.data)
        setStruture(data.data)
       setImage("https://gateway.arthanium.org/ipfs/" + data.image);
       setLoading(false);
     })
    }
 }, [])

  return (
    <>
    <Modal
      open={modalOpen}
      onClose={() => setModalOpen(false)}
      title={"Template Certification"}
      content={
        <FormGroup row>
          <GridItem xs="12" md="6">
            <FormControl variant="outlined">
              <InputLabel htmlFor="industryList">Select Industry</InputLabel>
              <Select
                name="industry"
                required
                fullWidth
                labelWidth={110}
                input={<OutlinedInput name="industry" />}
                value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              >
                {renderFromArray(industryList)}
              </Select>
              <FormHelperText color="muted">What industry does your project cover?</FormHelperText>
            </FormControl>
          </GridItem>
          <GridItem xs="12" md="6">
                {industry === "Art & Collectibles" &&
                <Select
                  name="role"
                  required
                  fullWidth
                  labelWidth={80}
                  value={templateID}
                  input={<OutlinedInput name="type" />}
                  onChange={(e) => handleTemplateChange(e)}
                  >
                  <MenuItem key={Math.random()} name={"Authenticity"} value={"Authenticity"}>Authenticity</MenuItem>
                // onChange={(e) => setRole(e.target.value)}
                >
                </Select>}
          </GridItem>
        </FormGroup>

      }
      />
    {
     loading ? <CircularProgress style={{position: "absolute",top:"50%",left:"50%"}} /> : templateID && <> 
      <div id="printTemplate">
      <div style={{width: '100%', height: '100%', padding: '20px', textAlign: 'center', border: '10px ridge #787878'}}>
        <div style={{width: '100%', height: '100%', padding: '20px', textAlign: 'center', border: '5px ridge #787878'}}>
          <span style={{fontSize: '50px', fontWeight: 'bold'}}><i>Certificate of Authenticity</i></span>
          <br /><br />
          <span style={{fontSize: '25px'}}><i>This artwork is one of a kind authentic, original artwork<br/>
      All copyright & reproduction rights are reserved by athe artist				</i></span>
          <br /><br />
        <GridContainer>
          <GridItem xs={12} sm={6} md={6}>
          <TextField
          defaultValue=" "
          disabled={isExist}
          type="text"
          onChange={e => setStruture({ ...struture, ["titleOfTheCertificate"]: e.target.value })}
          value={struture["titleOfTheCertificate"]}
          fullWidth
          variant="standard"
          label="Title of the Certificate" />
          </GridItem>
          <GridItem xs={12} sm={6} md={6}>
         { isExist? <img src={image} height="200px" width="200px" /> :
          <DropzoneArea
            dropzoneText={"Artwork Image. Ideally, your COA should include a high-resolution image of your work within the document. This ensures ease in archiving the document for both you and the buyer."}
            // onSave={(file) => { console.log(file);}}
            dropzoneParagraphClass = {"dropzone-text"}
            showPreviewsInDropzone
            onDrop={(file) => { handleDropzone(file) }}
            onDelete={(file) => { deleteDropzoneFile(file) }}
            acceptedFiles={['image/jpeg', 'image/png', 'image/bmp', 'application/pdf']}
            maxFileSize={5000000}
            filesLimit={1}
    /> }
          </GridItem>
        </GridContainer>
          <br /><br />
          <i><TextField
                    defaultValue=" "
                    disabled={isExist}

            type="text"
            fullWidth
            variant="standard"
            onChange={e => setStruture({ ...struture, ["certifiedBy"]: e.target.value })}
            value={struture["certifiedBy"]}
            label="Certified by" /></i>
            <br/><br/>
          <GridContainer>
            <GridItem xs={12} sm={6} md={6}>
              <TextField
                        defaultValue=" "
                        disabled={isExist}

                type="text"
                fullWidth
                variant="standard"
                onChange={e => setStruture({ ...struture, ["artistName"]: e.target.value })}
                value={struture["artistName"]}
                label="Artist name" />
            </GridItem>
            <GridItem xs={12} sm={6} md={6}>
            <TextField
                      defaultValue=" "
                      disabled={isExist}

            type="text"
            fullWidth
            variant="standard"
            onChange={e => setStruture({ ...struture, ["yearOfCompletion"]: e.target.value })}
            value={struture["yearOfCompletion"]}
            label="Year of completion" />
            </GridItem>
          </GridContainer>
          <br /><br />
          <span style={{fontSize: '20px'}}><b><TextField
                    defaultValue=" "
                    disabled={isExist}

          type="text"
          fullWidth
          variant="standard"
          onChange={e => setStruture({ ...struture, ["dimensions1"]: e.target.value })}
          value={struture["dimensions1"]}
          label="Dimensions" /></b></span> <br /><br /><br /><br />
          <span style={{fontSize: '25px'}}><i><TextField
                    defaultValue=" "
                    disabled={isExist}

          type="text"
          fullWidth
          variant="standard"
          onChange={e => setStruture({ ...struture, ["medium"]: e.target.value })}
          value={struture["medium"]}
          label="Medium" /></i></span><br /><br/>
          <span style={{fontSize: '20px'}}><b><TextField
                    defaultValue=" "
                    disabled={isExist}

          type="text"
          fullWidth
          variant="standard"
          onChange={e => setStruture({ ...struture, ["dimensions2"]: e.target.value })}
          value={struture["dimensions2"]}
          label="Dimensions" /></b></span> <br /><br /><br /><br />
          <span style={{fontSize: '25px'}}><i><TextField
                    defaultValue=" "
                    disabled={isExist}

          type="text"
          fullWidth
          variant="standard"
          onChange={e => setStruture({ ...struture, ["editionNumber"]: e.target.value })}
          value={struture["editionNumber"]}
          label="Edition number, if applicable." /></i></span><br /><br/>
          <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
            <span style={{fontSize: '16px'}}>Statement of Authenticity</span>
            </GridItem>
            <GridItem xs={12} sm={6} md={9}>
            <TextField
          disabled={isExist}

            type="text"
            rows="2"
            multiline
            fullWidth
            variant="outlined"
            onChange={e => setStruture({ ...struture, ["statementOfAuthenticity"]: e.target.value })}
            value={struture["statementOfAuthenticity"]}
            placeholder="This should consist of a short, one to two sentence statement declaring the authenticity of your work, as well as a statement that your work is copyrighted by you, and you alone." />
            </GridItem>
          </GridContainer>
          <br/><br/>
          <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
            <span style={{fontSize: '16px'}}>Special instructions</span>
            </GridItem>
            <GridItem xs={12} sm={6} md={9}>
            <TextField
          disabled={isExist}

            onChange={e => setStruture({ ...struture, ["specialInstruction"]: e.target.value })}
            value={struture["specialInstruction"]}
            type="text"
            rows="2"
            multiline
            fullWidth
            variant="outlined"


            placeholder="Make sure, if necessary, to include any special instructions regarding the condition of your work, installation instructions, etc." />
            </GridItem>
          </GridContainer>
          <br/><br/><br/>
          <b><i>Dated: {isExist ? struture.date : moment(new Date()).format("Do MMMM YYYY")} </i></b>
        </div>
      </div>
      </div>
     {! isExist && <FormControlLabel control={<Checkbox
        checked={
          infoConfirmation
        }
        onChange={
          () => {setInformationConfirmed(!infoConfirmation)}
        }
        value="checkedC"
        inputProps={{
          'aria-label': 'primary checkbox',
        }}
      />} label="I confirm that the information being shared on the platform is true to the best of my understanding" /> }
      {! isExist && <Button onClick={handleSubmit} color="info" round disabled={!infoConfirmation}>Submit Certification Claim</Button>}
      <iframe id="ifmcontentstoprint" height="0px" width="0px"></iframe>
      </>
    }
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors
});


export default connect(mapStateToProps)(TemplateCertificate);
