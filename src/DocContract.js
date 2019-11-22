import web3 from './web3';

export const docAddress = '0xc501d3e7a23548654ef5ffc179d8e893d984565b';
export const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
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
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
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
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			}
		],
		"name": "getReviewStatusForIndividual",
		"outputs": [
			{
				"internalType": "enum ERC721.reviewStatus",
				"name": "",
				"type": "uint8"
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
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
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
				"name": "tokenId",
				"type": "bytes32"
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
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
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
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
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
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
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
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
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
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "_tokensOfOwner",
		"outputs": [
			{
				"internalType": "bytes32[]",
				"name": "",
				"type": "bytes32[]"
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
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
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
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
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
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
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
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "status",
				"type": "uint256"
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
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
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
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "reviewer",
				"type": "address"
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
				"indexed": true,
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
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
				"indexed": false,
				"internalType": "bytes32",
				"name": "tokenId",
				"type": "bytes32"
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
				"internalType": "bytes32",
				"name": "_tokenId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "_projectId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_address",
				"type": "address"
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
				"internalType": "bytes32",
				"name": "_tokenId",
				"type": "bytes32"
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
	}
]
export const docContract = new web3.eth.Contract(abi, docAddress);
