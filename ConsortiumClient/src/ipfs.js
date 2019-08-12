const IPFS = require('ipfs-http-client')
const ipfs = new IPFS({
  host: 'ipfs.arthanium.org',
  port: 80,
  protocol: 'http'
})

export default ipfs;
