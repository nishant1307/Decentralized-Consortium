import React, {useState, Suspense} from "react";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import PublishIcon from '@material-ui/icons/Publish';
import CustomTabs from "components/CustomTabs/CustomTabs";
import { DropzoneArea } from 'material-ui-dropzone'
import uuidv1 from 'uuid/v1';
const ViewCertifications = React.lazy(() => import("views/Claims&Certifications/ViewCertifications"));
import { connect } from 'react-redux';
import { certificationContract, certificationAddress } from 'certificationContract';

import ipfs from 'ipfs.js';
const IPFS = require('ipfs-http-client');
import {
  TextField,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import web3 from '../../web3';
import CustomLoader from "components/Loaders/CustomLoader";
const Certifications = (props) => {

  const [certificateFiles, setCertificateFiles] = useState([]);
  const [certificateHash, setCertificateHash] = useState();
  const [infoConfirmation, setInformationConfirmed] = useState(false);
  const [claimName, setClaimName] = useState('');
  const [certificateID, setCertificateID] = useState('');

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

  const handleSubmit = async () => {
    // setLoading(true);
    uploadOnIPFS().then(async (result, error) => {
      console.log(result);
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
          web3.eth.sendSignedTransaction(res.rawTransaction)
            .on('receipt', async function (receipt) {
              window.location.reload();
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
        reader.onloadend = (res) => {
          let content = IPFS.Buffer.from(res.target.result);
          ipfs.add(content, (err, newHash) => {
            if (err) {
              reject();
            }
            _documentHash.push(newHash[0].hash)
            _category.push(element.category)
            i++;
            if (certificateFiles.length === i) {
              resolve({
                title: "Certification",
                type: "Self Attested",
                properties: {
                  name: claimName,
                  description: claimName,
                  image: _documentHash[0]
                }
              })
            }
          })
        }

      })
    })
  }

  return (
    <CustomTabs
      variant="fullWidth"
      title="Partnerships:"
      headerColor="primary"
      tabs={[
        {
          tabName: "Publish a certificate",
          tabIcon: PublishIcon,
          tabContent: (
            <>
              <TextField
                type="text"
                name="name"
                fullWidth
                variant="outlined"
                value={claimName}
                onChange={(e) => {setClaimName(e.target.value)}}
                label="Certification Claim" />
              <br/>
              <br/>
              <DropzoneArea
                dropzoneText={"Upload your certificate"}
                // onSave={(file) => { console.log(file);}}
                onDrop={(file) => { handleDropzone(file) }}
                onDelete={(file) => { deleteDropzoneFile(file) }}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp', 'application/pdf']}
                showPreviews={true}
                maxFileSize={5000000}
                filesLimit={1}
              />
              <br/><br/>

              <FormControlLabel control={<Checkbox
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
              />} label="I confirm that the information being shared on the platform is true to the best of my understanding" />
              <Button onClick={handleSubmit} color="info" round disabled={!infoConfirmation}>Submit Certification Claim</Button>
            </>
          )
        },
        {
          tabName: "View certificates",
          tabIcon: PublishIcon,
          tabContent: (
            <Suspense fallback = {<CustomLoader/>}>
              <ViewCertifications/>
            </Suspense>
          )
        },
        {
          tabName: "Submit for platform verification",
          tabIcon: PublishIcon,
          tabContent: (
            <>
            </>
          )
        },
      ]}
      />
  );
}

export default Certifications;
