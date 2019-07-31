const ABI =[
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
						"name": "organizationDetails",
						"type": "string"
					},
					{
						"name": "organizationAddress",
						"type": "address"
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
						"name": "contractAddress",
						"type": "address"
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
						"name": "additionalDetails",
						"type": "string"
					},
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "registrantID",
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
						"name": "organizationDetails",
						"type": "string"
					},
					{
						"name": "organizationAddress",
						"type": "address"
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
		"constant": false,
		"inputs": [
			{
				"name": "organizationID",
				"type": "string"
			},
			{
				"name": "organizationAddress",
				"type": "address"
			},
			{
				"name": "organizationDetails",
				"type": "string"
			},
			{
				"name": "registrantID",
				"type": "string"
			},
			{
				"name": "registrantAddress",
				"type": "address"
			},
			{
				"name": "registrantDetails",
				"type": "string"
			}
		],
		"name": "addNewOrganization",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "registrantID",
				"type": "string"
			}
		],
		"name": "getRegistrantDetails",
		"outputs": [
			{
				"components": [
					{
						"name": "registrantID",
						"type": "string"
					},
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "registrantDetails",
						"type": "string"
					},
					{
						"name": "role",
						"type": "uint8"
					},
					{
						"name": "registrantAddress",
						"type": "address"
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
		"name": "getAllProjects",
		"outputs": [
			{
				"components": [
					{
						"name": "projectID",
						"type": "string"
					},
					{
						"name": "contractAddress",
						"type": "address"
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
						"name": "additionalDetails",
						"type": "string"
					},
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "registrantID",
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
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "role",
				"type": "uint256"
			},
			{
				"name": "registrantAddress",
				"type": "address"
			},
			{
				"name": "registrantID",
				"type": "string"
			},
			{
				"name": "organizationID",
				"type": "string"
			}
		],
		"name": "changeRegistrantRole",
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
				"name": "contractAddress",
				"type": "address"
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
				"name": "organizationID",
				"type": "string"
			},
			{
				"name": "registrantID",
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
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "registrantID",
				"type": "string"
			},
			{
				"name": "organizationID",
				"type": "string"
			},
			{
				"name": "registrantDetails",
				"type": "string"
			},
			{
				"name": "role",
				"type": "int256"
			},
			{
				"name": "registrantAddress",
				"type": "address"
			}
		],
		"name": "addNewRegistrant",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newAdminID",
				"type": "string"
			},
			{
				"name": "newAdminAddress",
				"type": "address"
			},
			{
				"name": "newAdminDetails",
				"type": "string"
			},
			{
				"name": "organizationID",
				"type": "string"
			}
		],
		"name": "transferOwnership",
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
	}
]
module.exports = ABI;
