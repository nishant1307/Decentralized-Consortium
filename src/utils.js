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

export const eternalStorageAddress = "0xc006c3838a31a2bd1916842cc7ee0d1e0318764c";

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
