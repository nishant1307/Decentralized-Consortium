import React, { useState } from "react";
import axios from "axios";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {registryContract, registryAddress} from "registryContract";
import web3 from "../web3";
import {encryptMessage} from "utils";

const ColleagueForm = (props) => {
  const [email, setEmail] = useState('');
  const [invitePasscode, setInvitePasscode] = useState('');

  const onSubmitForm = (e) => {
    e.preventDefault();
    var transaction = {
      "to": registryAddress,
      "data": registryContract.methods.inviteUser(
        email
      ).encodeABI()
    };
    const privateKey = sessionStorage.getItem('privateKey')

    // web3.eth.estimateGas(transaction).then(gasLimit => {
    transaction["gasLimit"] = 2000000;
    web3.eth.accounts.signTransaction(transaction, privateKey)
      .then(res => {
        web3.eth.sendSignedTransaction(res.rawTransaction)
          .on('confirmation', async function (confirmationNumber, receipt) {
            if (confirmationNumber == 1) {
              if (receipt.status == true) {
                axios.post("https://www.iotconekt.com/api/dashboard/inviteColleague", { inviteEmail: email, inviteLink: encryptMessage(email, invitePasscode)})
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
            }
          })
          .on('error', async function (error) {
            console.log(error);
          })
      })
      .catch(err => {
        console.log(err);
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
