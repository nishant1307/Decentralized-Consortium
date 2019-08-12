import web3 from './web3';
export const registryAddress = '0xae5f4ebe500cfae08db6c7664e6acef7c24239e8';
export const registryABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "itemType",
				"type": "uint8"
			},
			{
				"name": "itemID",
				"type": "string"
			},
			{
				"name": "_projectID",
				"type": "string"
			},
			{
				"name": "_by",
				"type": "address"
			},
			{
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "addItemToProject",
		"outputs": [
			{
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
				"name": "projectID",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "industry",
				"type": "string"
			},
			{
				"name": "partnerRole",
				"type": "uint8"
			}
		],
		"name": "addNewProject",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "projectID",
				"type": "string"
			},
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "partnerRole",
				"type": "uint8"
			}
		],
		"name": "addUserToProject",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "email",
				"type": "string"
			}
		],
		"name": "inviteUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "organizationID",
				"type": "string"
			},
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "orgKYCHash",
				"type": "string"
			},
			{
				"name": "userKYCHash",
				"type": "string"
			},
			{
				"name": "email",
				"type": "string"
			}
		],
		"name": "setOrganizationAdmin",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "organizationID",
				"type": "string"
			},
			{
				"name": "status",
				"type": "uint8"
			}
		],
		"name": "setOrganizationKYCStatus",
		"outputs": [
			{
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
				"name": "organizationID",
				"type": "string"
			},
			{
				"name": "orgType",
				"type": "string"
			}
		],
		"name": "setOrganizationType",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "email",
				"type": "string"
			},
			{
				"name": "kycHash",
				"type": "string"
			},
			{
				"name": "role",
				"type": "uint8"
			}
		],
		"name": "setUser",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "userAddress",
				"type": "address"
			},
			{
				"name": "status",
				"type": "uint8"
			}
		],
		"name": "setUserStatus",
		"outputs": [
			{
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
				"name": "publicKey",
				"type": "address"
			}
		],
		"name": "switchOrgAdmin",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "kycHash",
				"type": "string"
			}
		],
		"name": "updateKYC",
		"outputs": [
			{
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
				"name": "organizationID",
				"type": "string"
			},
			{
				"name": "kycHash",
				"type": "string"
			}
		],
		"name": "updateOrganizationKYC",
		"outputs": [
			{
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
				"name": "publicKey",
				"type": "address"
			},
			{
				"name": "newRole",
				"type": "uint8"
			}
		],
		"name": "updateUserRole",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "_projectID",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"indexed": true,
				"name": "_by",
				"type": "address"
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
				"name": "_projectID",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "organizationName",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "partnerRole",
				"type": "uint8"
			},
			{
				"indexed": true,
				"name": "_by",
				"type": "address"
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
				"name": "_projectID",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "itemType",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "itemID",
				"type": "string"
			},
			{
				"indexed": true,
				"name": "_by",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "ItemAdded",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "a",
				"type": "string"
			},
			{
				"name": "b",
				"type": "string"
			}
		],
		"name": "compareStrings",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "email",
				"type": "string"
			}
		],
		"name": "existingEmail",
		"outputs": [
			{
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
		"inputs": [],
		"name": "getAllOrganizations",
		"outputs": [
			{
				"components": [
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "kycHash",
						"type": "string"
					},
					{
						"name": "status",
						"type": "uint8"
					}
				],
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
		"name": "getAllUsers",
		"outputs": [
			{
				"components": [
					{
						"name": "publicKey",
						"type": "address"
					},
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "email",
						"type": "string"
					},
					{
						"name": "status",
						"type": "uint8"
					},
					{
						"name": "kycHash",
						"type": "string"
					},
					{
						"name": "role",
						"type": "uint8"
					}
				],
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
		"inputs": [
			{
				"name": "projectID",
				"type": "string"
			}
		],
		"name": "getConsortiumMember",
		"outputs": [
			{
				"components": [
					{
						"name": "publicKey",
						"type": "address"
					},
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "email",
						"type": "string"
					},
					{
						"name": "status",
						"type": "uint8"
					},
					{
						"name": "kycHash",
						"type": "string"
					},
					{
						"name": "role",
						"type": "uint8"
					}
				],
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
		"name": "getMyProjects",
		"outputs": [
			{
				"components": [
					{
						"name": "projectID",
						"type": "string"
					},
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "description",
						"type": "string"
					},
					{
						"name": "industry",
						"type": "string"
					}
				],
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
		"name": "getMyProjectsCount",
		"outputs": [
			{
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
				"name": "projectID",
				"type": "string"
			}
		],
		"name": "getMyRole",
		"outputs": [
			{
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
				"name": "organizationID",
				"type": "string"
			}
		],
		"name": "getOrganizationDetails",
		"outputs": [
			{
				"components": [
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "kycHash",
						"type": "string"
					},
					{
						"name": "status",
						"type": "uint8"
					}
				],
				"name": "",
				"type": "tuple"
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
				"name": "organizationID",
				"type": "string"
			}
		],
		"name": "getOrganizationKYCStatus",
		"outputs": [
			{
				"name": "status",
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
				"name": "projectID",
				"type": "string"
			},
			{
				"name": "publicKey",
				"type": "address"
			}
		],
		"name": "getPartnerRole",
		"outputs": [
			{
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
				"name": "orgType",
				"type": "string"
			}
		],
		"name": "getPartnersByType",
		"outputs": [
			{
				"components": [
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "kycHash",
						"type": "string"
					},
					{
						"name": "status",
						"type": "uint8"
					}
				],
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
		"inputs": [
			{
				"name": "projectID",
				"type": "string"
			}
		],
		"name": "getProjectDetails",
		"outputs": [
			{
				"components": [
					{
						"name": "projectID",
						"type": "string"
					},
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "description",
						"type": "string"
					},
					{
						"name": "industry",
						"type": "string"
					}
				],
				"name": "",
				"type": "tuple"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserKYCStatus",
		"outputs": [
			{
				"name": "status",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getUserOrganizationDetails",
		"outputs": [
			{
				"components": [
					{
						"name": "publicKey",
						"type": "address"
					},
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "email",
						"type": "string"
					},
					{
						"name": "status",
						"type": "uint8"
					},
					{
						"name": "kycHash",
						"type": "string"
					},
					{
						"name": "role",
						"type": "uint8"
					}
				],
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "kycHash",
						"type": "string"
					},
					{
						"name": "status",
						"type": "uint8"
					}
				],
				"name": "",
				"type": "tuple"
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
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

export const registryContract =  new web3.eth.Contract(registryABI, registryAddress);
