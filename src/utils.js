import React from 'react';
// import ipfs from "./ipfs";
import axios from "axios";
import { MenuItem } from '@material-ui/core';
export const renderFromArray = array => {
  let render =[];
  array.forEach(element => {
    render.push(<MenuItem key={Math.random()} name={element} value={element}>{element}</MenuItem>)
  })
  return render;
}

export const eternalStorageAddress = "0x5f04bacdf64cd825b9f775d723449baf14ffedca";

export const parseJSONFromIPFSHash = async (ipfsHash) => {
  let res =  await axios.get("https://gateway.arthanium.org/ipfs/"+ipfsHash, {});
  return res.data;
}

export const encryptMessage = (message, secret) => {
  let AES = require("crypto-js/aes");
  return AES.encrypt(message, secret).toString();
}

export const decryptMessage = (encryptedMessage, secret) => {
  let CryptoJS = require("crypto-js");
  return CryptoJS.AES.decrypt(encryptedMessage, secret).toString(CryptoJS.enc.Utf8);
}
