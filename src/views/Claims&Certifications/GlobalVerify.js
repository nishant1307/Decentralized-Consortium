import React, {useState, useEffect} from "react";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import {TextField, Grid} from '@material-ui/core';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import {certificationContract} from "certificationContract";
import CustomLoader from "components/Loaders/CustomLoader";
import "WA/css/custom.css"
const GlobalVerify = () => {

  const [certificateID, setCertificateID] = useState('');
  const [certificateDetails, setCertificateDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const findDetails = () => {
    setLoading(true);
    certificationContract.methods.getCertificateDetailsFromID(certificateID).call({
      from: localStorage.getItem("address")
    }).then(details => {
      console.log(details);
      let tokenDetails = JSON.parse(details[0])
      console.log(tokenDetails);
      setCertificateDetails(tokenDetails);
      setLoading(false);
    })
  }
  return (
    <div className="backimageblue">
    <Grid
      container
      direction="row"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={12} md={6}>
      <Card raised>
      <CardBody>
        {certificateDetails ?
          <div style={{width: '100%', height: '100%', padding: '20px', textAlign: 'center', border: '10px ridge #787878'}}>
            <div style={{width: '100%', height: '100%', padding: '20px', textAlign: 'center', border: '5px ridge #787878'}}>
          <h1>{certificateDetails.title}</h1>
          <h4>Type: {certificateDetails.type}</h4>
          <h5>Claim Name: {certificateDetails.properties.name}</h5>
          <div class="iframe-container">
            <iframe src={"https://gateway.arthanium.org/ipfs/"+certificateDetails.properties.image}/>
          </div>
          </div>
          </div>
          :
          <>
          <TextField
            type="text"
            name="name"
            fullWidth
            variant="outlined"
            value={certificateID}
            onChange={(e) => {setCertificateID(e.target.value)}}
            label="Enter Certification ID to verify" />
          <Button round onClick={findDetails}>Get Details</Button>
          </>
        }
        </CardBody>
        {loading && <CustomLoader/>}
        </Card>
      </Grid>
    </Grid>
    </div>
  );
}

export default GlobalVerify;
