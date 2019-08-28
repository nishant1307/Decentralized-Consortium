import web3 from './web3';

export const docAddress = '0x83300f757e0531bff45bdcd23132ede7b700a3d2';
export const abi = [
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			}
		],
		"name": "getReviewStatusForIndividual",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "projectId",
				"type": "bytes32"
			}
		],
		"name": "_tokensOfProject",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			}
		],
		"name": "tokenURI",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "metadata",
				"type": "string"
			}
		],
		"name": "setMetadata",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "status",
				"type": "bool"
			}
		],
		"name": "addReview",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			}
		],
		"name": "ownerOf",
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
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "_tokensOfOwner",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "projectId",
				"type": "bytes32"
			}
		],
		"name": "setProjectId",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			}
		],
		"name": "getReviewersList",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "reviewer",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			}
		],
		"name": "getDocumentDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "encryptedData",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "encryptedPassword",
						"type": "string"
					},
					{
						"internalType": "bytes32",
						"name": "projectId",
						"type": "bytes32"
					},
					{
						"internalType": "uint256",
						"name": "timeStamp",
						"type": "uint256"
					}
				],
				"internalType": "struct ERC721Metadata.docDetails",
				"name": "",
				"type": "tuple"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			}
		],
		"name": "burn",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "encryptedData",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "encryptedPassword",
				"type": "string"
			}
		],
		"name": "MintWithDetails",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			}
		],
		"name": "getReviewStatus",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			},
			{
				"internalType": "address[]",
				"name": "reviewer",
				"type": "address[]"
			}
		],
		"name": "addReviewers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
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
				"indexed": false,
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "metadata",
				"type": "string"
			}
		],
		"name": "MetadataChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "listOfAddress",
				"type": "address[]"
			}
		],
		"name": "ReviewersAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "reviewer",
				"type": "address"
			}
		],
		"name": "ReviewAdded",
		"type": "event"
	}
]
export const docContract = new web3.eth.Contract(abi, docAddress);;