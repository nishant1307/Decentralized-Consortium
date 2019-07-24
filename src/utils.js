import React from 'react';

export const renderFromArray = array => {
  let render =[];
  array.forEach(element => {
    render.push(<option key={element} key={Math.random()} name={element} value={element}>{element}</option>)
  })
  return render;
}

export const registryABI = [
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
				"name": "city",
				"type": "string"
			},
			{
				"name": "country",
				"type": "string"
			},
			{
				"name": "zipcode",
				"type": "string"
			}
		],
		"name": "setOrganization",
		"outputs": [],
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
						"name": "city",
						"type": "string"
					},
					{
						"name": "country",
						"type": "string"
					},
					{
						"name": "zipcode",
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
			}
		],
		"name": "getConsortiumOrganizations",
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
						"name": "city",
						"type": "string"
					},
					{
						"name": "country",
						"type": "string"
					},
					{
						"name": "zipcode",
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
				"name": "organizationID",
				"type": "string"
			}
		],
		"name": "addOrganizationToProject",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
		"constant": false,
		"inputs": [
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
						"name": "city",
						"type": "string"
					},
					{
						"name": "country",
						"type": "string"
					},
					{
						"name": "zipcode",
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
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
];
