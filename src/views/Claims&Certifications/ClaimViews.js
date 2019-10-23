import React, {useState, useEffect} from "react";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import { TextField, Tooltip, Chip } from '@material-ui/core';
import {certificationContract} from "certificationContract";
import Skeleton from '@material-ui/lab/Skeleton';
import DoneIcon from '@material-ui/icons/Done';
const Claims = (props) => {
  const [myClaims, setMyClaims] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    // if(props.user && props.user.organization){
    //   certificationContract.methods.getOrganizationClaims(props.user.organization[0])
    //   .call({
    //     from: props.auth.user.publicKey
    //   }).then(claims => {
    //     setMyClaims(claims);
    //     setLoader(false);
    //   })
    // }
  }, [props.user.organization])

  return (
    <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
        {!loader ?
            myClaims.map((claim, index) => {
              return(
                <Chip label={claim.name} variant="outlined" icon={claim.verificationStatus ? <DoneIcon style={{color: "green"}}/> : null} style={{ color: claim.verificationStatus ? 'green' : 'black', margin: "5px" , borderColor: claim.verificationStatus ? 'green' : 'gray' }} clickable />
              )
            }):
          <>
            <Skeleton width="100%"/>
            <Skeleton width="100%" />
          </>
        }
        </GridItem>
        </GridContainer>
  );
}

export default Claims;
