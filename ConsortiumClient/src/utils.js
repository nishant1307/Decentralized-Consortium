import React from 'react';

export const renderFromArray = array => {
  let render =[];
  array.forEach(element => {
    render.push(<option key={element} key={Math.random()} name={element} value={element}>{element}</option>)
  })
  return render;
}

export const registryAddress = "0xecb9f65f59d42aaf48d50ba73c72f020cfc39beb";

export const registryABI = [
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
				"name": "userID",
				"type": "string"
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
				"name": "projectID",
				"type": "string"
			}
		],
		"name": "closeProject",
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
		"name": "editUserEmail",
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
				"name": "geocode",
				"type": "string"
			},
			{
				"name": "userID",
				"type": "string"
			},
			{
				"name": "firstName",
				"type": "string"
			},
			{
				"name": "lastName",
				"type": "string"
			},
			{
				"name": "email",
				"type": "string"
			},
			{
				"name": "phoneNumber",
				"type": "string"
			},
			{
				"name": "publicKey",
				"type": "address"
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
				"name": "userID",
				"type": "string"
			},
			{
				"name": "firstName",
				"type": "string"
			},
			{
				"name": "lastName",
				"type": "string"
			},
			{
				"name": "email",
				"type": "string"
			},
			{
				"name": "phoneNumber",
				"type": "string"
			},
			{
				"name": "publicKey",
				"type": "address"
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
				"name": "publicKey",
				"type": "address"
			}
		],
		"name": "updateOrgAdmin",
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
				"indexed": true,
				"name": "_by",
				"type": "address"
			}
		],
		"name": "OrganizationAddedToConsortium",
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
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "name",
						"type": "string"
					},
					{
						"name": "geocode",
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
		"name": "getAllUsers",
		"outputs": [
			{
				"components": [
					{
						"name": "userAddress",
						"type": "address"
					},
					{
						"name": "userID",
						"type": "string"
					},
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "firstName",
						"type": "string"
					},
					{
						"name": "lastName",
						"type": "string"
					},
					{
						"name": "email",
						"type": "string"
					},
					{
						"name": "phoneNumber",
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
						"name": "userAddress",
						"type": "address"
					},
					{
						"name": "userID",
						"type": "string"
					},
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "firstName",
						"type": "string"
					},
					{
						"name": "lastName",
						"type": "string"
					},
					{
						"name": "email",
						"type": "string"
					},
					{
						"name": "phoneNumber",
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
					},
					{
						"name": "projectStatus",
						"type": "uint8"
					},
					{
						"name": "startTime",
						"type": "uint256"
					},
					{
						"name": "endTime",
						"type": "uint256"
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
						"name": "geocode",
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
						"name": "geocode",
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
					},
					{
						"name": "projectStatus",
						"type": "uint8"
					},
					{
						"name": "startTime",
						"type": "uint256"
					},
					{
						"name": "endTime",
						"type": "uint256"
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
		"name": "getUserDetails",
		"outputs": [
			{
				"components": [
					{
						"name": "userAddress",
						"type": "address"
					},
					{
						"name": "userID",
						"type": "string"
					},
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "firstName",
						"type": "string"
					},
					{
						"name": "lastName",
						"type": "string"
					},
					{
						"name": "email",
						"type": "string"
					},
					{
						"name": "phoneNumber",
						"type": "string"
					},
					{
						"name": "role",
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
				"name": "userID",
				"type": "string"
			}
		],
		"name": "getUserFromUserID",
		"outputs": [
			{
				"components": [
					{
						"name": "userAddress",
						"type": "address"
					},
					{
						"name": "userID",
						"type": "string"
					},
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "firstName",
						"type": "string"
					},
					{
						"name": "lastName",
						"type": "string"
					},
					{
						"name": "email",
						"type": "string"
					},
					{
						"name": "phoneNumber",
						"type": "string"
					},
					{
						"name": "role",
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
		"name": "getUserOrganizationDetails",
		"outputs": [
			{
				"components": [
					{
						"name": "userAddress",
						"type": "address"
					},
					{
						"name": "userID",
						"type": "string"
					},
					{
						"name": "organizationID",
						"type": "string"
					},
					{
						"name": "firstName",
						"type": "string"
					},
					{
						"name": "lastName",
						"type": "string"
					},
					{
						"name": "email",
						"type": "string"
					},
					{
						"name": "phoneNumber",
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
						"name": "geocode",
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
		"name": "isValidUser",
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
