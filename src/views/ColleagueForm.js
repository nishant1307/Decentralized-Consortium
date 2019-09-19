import React, { useState, useEffect } from "react";
import axios from "axios";
import {registryContract, registryAddress} from "registryContract";
import web3 from "../web3";
import {encryptMessage} from "utils";

import { TextField } from '@material-ui/core';
import Button from "components/CustomButtons/Button";

const ColleagueForm = (props) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [myemail, setMyEmail] = useState('');
  const [organizationID, setOrganizationID] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [invitePasscode, setInvitePasscode] = useState('');
  console.log(props);
  useEffect(() => {
    if(props.user){
      setOrganizationID(props.user.organization[0]);
      setOrganizationName(props.user.organization[1]);
      setMyEmail(props.user.user[2])
      setName(props.user.user[2])
    }
  }, [props])
  const onSubmitForm = (e) => {
    e.preventDefault();
    let companyInfo = {
      emailid: myemail,
      companyName: organizationName,
      name: name
    }
    axios.post("https://api.arthanium.org/api/v1/inviteColleague", { email: email,companyInfo: companyInfo , link: encryptMessage(organizationID, invitePasscode), passcode: invitePasscode})
    .then(res=> {
      if(res.data.status=="Invitation sent successsfully"){
        setEmail('');
        props.onColleagueFormSubmit(res.data.status)
      }
    })
    .catch(function (error) {
      if (error.response) {
        props.onColleagueFormSubmit(error.response.data.message)
      }
    });
  }

  return(
    <>
      <TextField type="text"
        variant="outlined"
        label= "Email"
        required
        value={email}
        placeholder="Enter Colleague Email id"
        onChange={(e => setEmail(e.target.value))}
      />
      &nbsp;
      <TextField type="text"
        variant="outlined"
        label= "Invite Passcode"
        value={invitePasscode}
        required
        onChange={(e => setInvitePasscode(e.target.value))}
      />
      <br/>
      <Button color="info" round onClick = {onSubmitForm}>Invite Colleague</Button>
    </>
  )
}

export default ColleagueForm;
