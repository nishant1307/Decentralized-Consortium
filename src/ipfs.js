const IPFS = require('ipfs-http-client')
const ipfs = new IPFS({
  host: 'ipfs.arthanium.org',
  port: 443,
  protocol: 'https'
})

export default ipfs;
