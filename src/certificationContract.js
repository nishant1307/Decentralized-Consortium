import web3 from './web3';
export const certificationAddress = '0xe906d1277ab48e01d949de625d6b0fffd1e50792';
export const certificationABI = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "addCertificationAgency",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "claimID",
				"type": "string"
			}
		],
		"name": "addClaim",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "claimID",
				"type": "string"
			}
		],
		"name": "confirmClaim",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "claimID",
				"type": "string"
			}
		],
		"name": "rejectClaim",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "storageAddress",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_projectID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_by",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "ProjectCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_projectID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_by",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "partnerOrganization",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "enum StorageDefinition.partnerRoles",
				"name": "partnerRole",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "PartnerAddedToConsortium",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_projectID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_by",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "itemID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "DocumentAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_projectID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_by",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "itemID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "DeviceAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_projectID",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "_by",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "itemID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "ProductAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "contractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "contractName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "ContractRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "contractAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "contractName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "ContractRevoked",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "organizationID",
				"type": "string"
			}
		],
		"name": "getOrganizationClaims",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "claimID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string[]",
						"name": "acceptedBy",
						"type": "string[]"
					},
					{
						"internalType": "string[]",
						"name": "rejectedBy",
						"type": "string[]"
					},
					{
						"internalType": "bool",
						"name": "verificationStatus",
						"type": "bool"
					}
				],
				"internalType": "struct CertificationAgency.Claim[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
export const certificationContract =  new web3.eth.Contract(certificationABI, certificationAddress);
