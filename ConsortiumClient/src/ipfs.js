const IPFS = require('ipfs-http-client')
const ipfs = new IPFS({
  host: '3.80.182.122',
  port: 5001,
  protocol: 'http'
})

export default ipfs;
