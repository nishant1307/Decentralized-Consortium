const Web3 = require("web3");
var web3 = new Web3();
var provider = new Web3.providers.HttpProvider(
  //"https://blockchain.iotconekt.com"
  "http://localhost:8545"
);
// var provider = new Web3.providers.WebsocketProvider("wss://ropsten.infura.io/ws");
// var provider = new Web3.providers.WebsocketProvider("ws://52.202.82.44:8601");

web3.setProvider(provider);

export default web3;
