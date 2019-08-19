import React, { useState } from "react";
import axios from "axios";
import {Form, FormGroup, FormText, Col, Button, Input} from 'reactstrap';
import {registryContract, registryAddress} from "registryContract";
import web3 from "../web3";
const ColleagueForm = (props) => {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  }

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
                axios.post("https://www.iotconekt.com/api/dashboard/inviteColleague", { inviteEmail: email})
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
    <div>
    <Form className="form-horizontal">
      <FormGroup row>
        <Col xs="12" md="9">
          <Input type="email" name="email" value= {email} onChange={handleChange}  id="text-input" placeholder="Enter Colleague Email id" />
          <FormText color="muted">Your colleague will be sent an invitation link on his mail.</FormText>
        </Col>
        <Col md="3">
          <Button className="primary" onClick = {onSubmitForm}>Invite Colleague</Button>
        </Col>
      </FormGroup>

    </Form>
    </div>
  )
}

export default ColleagueForm;
