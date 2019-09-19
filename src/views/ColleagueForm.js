import React, { useState } from "react";
import axios from "axios";
import {registryContract, registryAddress} from "registryContract";
import web3 from "../web3";
import {encryptMessage} from "utils";

import { TextField, Button } from '@material-ui/core';

const ColleagueForm = (props) => {
  const [email, setEmail] = useState('');
  const [invitePasscode, setInvitePasscode] = useState('');

  const onSubmitForm = (e) => {
    e.preventDefault();
    axios.post("https://api.arthanium.org/api/v1/inviteColleague", { email: email, link: encryptMessage(email, invitePasscode), passcode: invitePasscode})
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
      <Button className="primary" onClick = {onSubmitForm}>Invite Colleague</Button>
    </>
  )
}

export default ColleagueForm;
