import web3 from './web3';

export const docAddress = '0xb2ceaca12ae4fbee83fee09cad62493c4a3b0cc7';
export const abi = [
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
			},
			{
				"internalType": "bytes32",
				"name": "projectId",
				"type": "bytes32"
			}
		],
		"name": "MintWithDetailsAndProjectId",
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
		"constant": false,
		"inputs": [
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
		"name": "updateDetails",
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
				"indexed": true,
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			},
			{
				"indexed": true,
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
				"indexed": true,
				"internalType": "string",
				"name": "tokenId",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "timeStamp",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "string",
				"name": "remark",
				"type": "string"
			}
		],
		"name": "DetailsUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "string",
				"name": "_tokenId",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_projectId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "address[]",
				"name": "_listOfAddress",
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
				"indexed": true,
				"internalType": "string",
				"name": "_tokenId",
				"type": "string"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_reviewer",
				"type": "address"
			}
		],
		"name": "ReviewAdded",
		"type": "event"
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
	}
]
export const docContract = new web3.eth.Contract(abi, docAddress);
