import web3 from './web3';
export const registryAddress = '0x51120091fdf990cc0d0b7f52165deb9ad6800859';
export const registryABI = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "deviceID",
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
				"internalType": "string",
				"name": "partnerRole",
				"type": "string"
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
				"internalType": "string",
				"name": "productID",
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
				"internalType": "string",
				"name": "partnerRole",
				"type": "string"
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
				"internalType": "string",
				"name": "organizationID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "partnershipType",
				"type": "string"
			}
		],
		"name": "confirmPartnershipStatus",
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
				"name": "organizationID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "kycHash",
				"type": "string"
			}
		],
		"name": "registerInvitedUser",
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
			}
		],
		"name": "removeEmailFromMapping",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "organizationID",
				"type": "string"
			},
			{
				"internalType": "enum StorageDefinition.KYCStatus",
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
				"name": "userAddress",
				"type": "address"
			},
			{
				"internalType": "enum StorageDefinition.KYCStatus",
				"name": "status",
				"type": "uint8"
			}
		],
		"name": "setUserKYCStatus",
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
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "publicKey",
				"type": "address"
			},
			{
				"internalType": "enum StorageDefinition.roles",
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
				"internalType": "string",
				"name": "partnerRole",
				"type": "string"
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct StorageDefinition.Organization[]",
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
						"internalType": "address",
						"name": "publicKey",
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum StorageDefinition.roles",
						"name": "role",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "adminApprovalStatus",
						"type": "bool"
					}
				],
				"internalType": "struct StorageDefinition.User[]",
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
				"internalType": "bytes32",
				"name": "projectID",
				"type": "bytes32"
			}
		],
		"name": "getConsortiumMembers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "publicKey",
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum StorageDefinition.roles",
						"name": "role",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "adminApprovalStatus",
						"type": "bool"
					}
				],
				"internalType": "struct StorageDefinition.User[]",
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
				"name": "email",
				"type": "string"
			}
		],
		"name": "getInvitedUserOrganizationDetails",
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct StorageDefinition.Organization",
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
					},
					{
						"internalType": "address",
						"name": "projectAdmin",
						"type": "address"
					}
				],
				"internalType": "struct StorageDefinition.Project[]",
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
				"name": "organizationID",
				"type": "string"
			}
		],
		"name": "getOrganizationAdminEmail",
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
		"constant": true,
		"inputs": [
			{
				"internalType": "string",
				"name": "organizationID",
				"type": "string"
			}
		],
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct StorageDefinition.Organization",
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
				"internalType": "address",
				"name": "publicKey",
				"type": "address"
			}
		],
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct StorageDefinition.Organization",
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct StorageDefinition.Organization",
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
		"name": "getOrganizationDetailsByorganizationID",
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct StorageDefinition.Organization",
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
		"name": "getOrganizationEmployees",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "publicKey",
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum StorageDefinition.roles",
						"name": "role",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "adminApprovalStatus",
						"type": "bool"
					}
				],
				"internalType": "struct StorageDefinition.User[]",
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
				"internalType": "enum StorageDefinition.KYCStatus",
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
				"internalType": "bytes32",
				"name": "projectID",
				"type": "bytes32"
			}
		],
		"name": "getPartnerRole",
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct StorageDefinition.Organization[]",
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
					},
					{
						"internalType": "address",
						"name": "projectAdmin",
						"type": "address"
					}
				],
				"internalType": "struct StorageDefinition.Project",
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
				"name": "email",
				"type": "string"
			}
		],
		"name": "getPublicKeyFromEmail",
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
		"inputs": [],
		"name": "getUserDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "publicKey",
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum StorageDefinition.roles",
						"name": "role",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "adminApprovalStatus",
						"type": "bool"
					}
				],
				"internalType": "struct StorageDefinition.User",
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
				"internalType": "address",
				"name": "publicKey",
				"type": "address"
			}
		],
		"name": "getUserDetails",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "publicKey",
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum StorageDefinition.roles",
						"name": "role",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "adminApprovalStatus",
						"type": "bool"
					}
				],
				"internalType": "struct StorageDefinition.User",
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
				"internalType": "enum StorageDefinition.KYCStatus",
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
						"internalType": "address",
						"name": "publicKey",
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					},
					{
						"internalType": "string",
						"name": "kycHash",
						"type": "string"
					},
					{
						"internalType": "enum StorageDefinition.roles",
						"name": "role",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "adminApprovalStatus",
						"type": "bool"
					}
				],
				"internalType": "struct StorageDefinition.User",
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
						"internalType": "enum StorageDefinition.KYCStatus",
						"name": "status",
						"type": "uint8"
					}
				],
				"internalType": "struct StorageDefinition.Organization",
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
				"name": "email",
				"type": "string"
			}
		],
		"name": "isUniqueEmail",
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

export const registryContract =  new web3.eth.Contract(registryABI, registryAddress);
