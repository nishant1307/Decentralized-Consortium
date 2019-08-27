import React from 'react';
// import ipfs from "./ipfs";
import axios from "axios";
export const renderFromArray = array => {
  let render =[];
  array.forEach(element => {
    render.push(<option key={element} key={Math.random()} name={element} value={element}>{element}</option>)
  })
  return render;
}

export const eternalStorageAddress = "0x3f69452797c779bfd8e6702742929d9b85d508ce";

export const parseJSONFromIPFSHash = async (ipfsHash) => {
  let res =  await axios.get("https://files.arthanium.org/ipfs/"+ipfsHash, {});
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
