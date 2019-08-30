import React from 'react';
import MenuItem from '@material-ui/core/MenuItem';
// import ipfs from "./ipfs";
import axios from "axios";
export const renderFromArray = array => {
  let render =[];
  array.forEach(element => {
    render.push(<MenuItem key={element} key={Math.random()} name={element} value={element}>{element}</MenuItem>)
  })
  return render;
}

export const eternalStorageAddress = "0xb59759f0330bf52e571d368978d61ddfd006b408";

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
