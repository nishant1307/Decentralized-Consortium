import web3 from './web3';
export const partnerAddress = '0xbc254eaf4e4a05cfb5052822cafbe34ffa12d936';
export const partnerABI = [
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string[]",
                "name": "_category",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "_documentHash",
                "type": "string[]"
            }
        ],
        "name": "addCategory",
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
                "name": "_reviewer",
                "type": "address"
            }
        ],
        "name": "addReviewer",
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
                "name": "_category",
                "type": "string"
            }
        ],
        "name": "deleteCategory",
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
                "name": "_reviewer",
                "type": "address"
            }
        ],
        "name": "removeReviewer",
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
                "name": "_category",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "status",
                "type": "bool"
            },
            {
                "internalType": "string",
                "name": "_organizationID",
                "type": "string"
            }
        ],
        "name": "updateCategory",
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
                "indexed": false,
                "internalType": "string",
                "name": "organizationID",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "category",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "documentHash",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "bool",
                "name": "status",
                "type": "bool"
            }
        ],
        "name": "CategoryLog",
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
        "name": "getCategory",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "category",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "documentHash",
                        "type": "string"
                    },
                    {
                        "internalType": "bool",
                        "name": "status",
                        "type": "bool"
                    },
                    {
                        "internalType": "uint256",
                        "name": "timeStamp",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct StorageDefinition.CategoryDetail[]",
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
                "name": "",
                "type": "string"
            }
        ],
        "name": "orgCategoryIndex",
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
export const partnerContract = new web3.eth.Contract(partnerABI, partnerAddress);
