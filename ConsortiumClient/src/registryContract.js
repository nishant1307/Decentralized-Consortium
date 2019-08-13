import web3 from './web3';
export const registryAddress = '0xcc51f98456d6d8c9ae4ed3293d4c680b37626298';
export const registryABI = [
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "projectID",
				"type": "bytes32"
			}
		],
		"name": "getMyRole",
		"outputs": [
			{
				"internalType": "enum Registry.partnerRoles",
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
		"inputs": [],
		"name": "getAllOrganizations",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "organizationID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.userKYCStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct EternalStorage.Organization[]",
				"name": "",
				"type": "tuple[]"
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
				"name": "itemID",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "_projectID",
				"type": "bytes32"
			}
		],
		"name": "addProductToProject",
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
				"name": "docID",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "_projectID",
				"type": "bytes32"
			}
		],
		"name": "addDocumentToProject",
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
		"inputs": [],
		"name": "getMyProjectsCount",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "organizationID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "kycHash",
				"type": "string"
			},
			{
				"internalType": "enum EternalStorage.roles",
				"name": "role",
				"type": "uint8"
			}
		],
		"name": "createUser",
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
				"name": "kycHash",
				"type": "string"
			}
		],
		"name": "updateKYC",
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
				"name": "organizationID",
				"type": "string"
			},
			{
				"internalType": "string",
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
				"internalType": "bytes32",
				"name": "projectID",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "enum Registry.partnerRoles",
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
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "projectID",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "publicKey",
				"type": "address"
			}
		],
		"name": "getPartnerRole",
		"outputs": [
			{
				"internalType": "enum Registry.partnerRoles",
				"name": "",
				"type": "uint8"
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
				"name": "kycHash",
				"type": "string"
			}
		],
		"name": "updateOrganizationKYC",
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
				"name": "email",
				"type": "string"
			}
		],
		"name": "existingEmail",
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
				"name": "projectID",
				"type": "bytes32"
			}
		],
		"name": "getConsortiumMember",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "externalKey",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "organizationID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.userKYCStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.roles",
						"name": "role",
						"type": "uint8"
					}
				],
				"internalType": "struct EternalStorage.User[]",
				"name": "",
				"type": "tuple[]"
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
				"name": "organizationID",
				"type": "string"
			},
			{
				"internalType": "enum EternalStorage.userKYCStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"name": "setOrganizationKYCStatus",
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
		"constant": true,
		"inputs": [],
		"name": "getOrganizationDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "organizationID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.userKYCStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct EternalStorage.Organization",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "enum EternalStorage.userKYCStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"name": "setUserStatus",
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
		"inputs": [],
		"name": "getUserDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "externalKey",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "organizationID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.userKYCStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.roles",
						"name": "role",
						"type": "uint8"
					}
				],
				"internalType": "struct EternalStorage.User",
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
				"internalType": "string",
				"name": "organizationID",
				"type": "string"
			}
		],
		"name": "getOrganizationEmployees",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "externalKey",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "organizationID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.userKYCStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.roles",
						"name": "role",
						"type": "uint8"
					}
				],
				"internalType": "struct EternalStorage.User[]",
				"name": "",
				"type": "tuple[]"
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
				"name": "itemID",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "_projectID",
				"type": "bytes32"
			}
		],
		"name": "addDeviceToProject",
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
				"name": "a",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "b",
				"type": "string"
			}
		],
		"name": "compareStrings",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "publicKey",
				"type": "address"
			},
			{
				"internalType": "enum EternalStorage.roles",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "kycHash",
				"type": "string"
			},
			{
				"internalType": "enum EternalStorage.roles",
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
		"constant": true,
		"inputs": [],
		"name": "getUserOrganizationDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "externalKey",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "organizationID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.userKYCStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.roles",
						"name": "role",
						"type": "uint8"
					}
				],
				"internalType": "struct EternalStorage.User",
				"name": "",
				"type": "tuple"
			},
			{
				"components": [
					{
						"internalType": "string",
						"name": "organizationID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.userKYCStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct EternalStorage.Organization",
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
				"internalType": "string",
				"name": "orgType",
				"type": "string"
			}
		],
		"name": "getPartnersByType",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "organizationID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.userKYCStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct EternalStorage.Organization[]",
				"name": "",
				"type": "tuple[]"
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
				"name": "projectID",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "industry",
				"type": "string"
			},
			{
				"internalType": "enum Registry.partnerRoles",
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
		"constant": true,
		"inputs": [],
		"name": "getAllUsers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "externalKey",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "organizationID",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.userKYCStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum EternalStorage.roles",
						"name": "role",
						"type": "uint8"
					}
				],
				"internalType": "struct EternalStorage.User[]",
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
		"name": "getUserKYCStatus",
		"outputs": [
			{
				"internalType": "enum EternalStorage.userKYCStatus",
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
		"name": "getMyProjects",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "projectID",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "industry",
						"type": "string"
					}
				],
				"internalType": "struct Registry.Project[]",
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
				"internalType": "string",
				"name": "organizationID",
				"type": "string"
			}
		],
		"name": "getOrganizationKYCStatus",
		"outputs": [
			{
				"internalType": "enum EternalStorage.userKYCStatus",
				"name": "status",
				"type": "uint8"
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
				"name": "organizationID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "orgKYCHash",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "userKYCHash",
				"type": "string"
			},
			{
				"internalType": "string",
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
		"constant": true,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "projectID",
				"type": "bytes32"
			}
		],
		"name": "getProjectDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "bytes32",
						"name": "projectID",
						"type": "bytes32"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "industry",
						"type": "string"
					}
				],
				"internalType": "struct Registry.Project",
				"name": "",
				"type": "tuple"
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
				"internalType": "address",
				"name": "_by",
				"type": "address"
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
				"internalType": "address",
				"name": "_by",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "enum Registry.partnerRoles",
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
				"internalType": "address",
				"name": "_by",
				"type": "address"
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
				"internalType": "address",
				"name": "_by",
				"type": "address"
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
				"internalType": "address",
				"name": "_by",
				"type": "address"
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
	}
];

export const registryContract =  new web3.eth.Contract(registryABI, registryAddress);
