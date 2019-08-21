pragma solidity ^0.5.11;
contract StorageDefinition {
    struct Storage {
        mapping(bytes32 => bool) _bool;
        mapping(bytes32 => int) _int;
        mapping(bytes32 => uint256) _uint;
        mapping(bytes32 => string) _string;
        mapping(bytes32 => address) _address;
        mapping(bytes32 => bytes32) _bytes32;
    }

    struct User {
        address publicKey;
        string organizationID;
        string email;
        KYCStatus status;
        string kycHash;
        roles role;
    }
    struct Organization {
        string organizationID;
        string name;
        string kycHash;
        KYCStatus status;
    }

    enum roles {regular, admin, registrant}

    enum KYCStatus { kycPending, kycComplete, suspended }

    enum partnerRoles { buyer, seller, logistics, agent, bank }

    enum projectItems { document, device, product }

    struct Project {
        bytes32 projectID;
        string name;
        string description;
        string industry;
    }

    struct PartnershipRequest {
        string partnershipType;
        string organizationID;
        string partnershipDoc;
        KYCStatus partnershipStatus;
    }

    event ProjectCreated(bytes32 indexed _projectID, string name, address _by, uint256 timestamp);
    event PartnerAddedToConsortium(bytes32 indexed _projectID, address _by, address userAddress, partnerRoles partnerRole, uint256 timestamp);
    event DocumentAdded(bytes32 indexed _projectID, address _by, string itemID, uint256 timestamp);
    event DeviceAdded(bytes32 indexed _projectID, address _by, string itemID, uint256 timestamp);
    event ProductAdded(bytes32 indexed _projectID, address _by, string itemID, uint256 timestamp);

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event ContractRegistered(address indexed contractAddress, string contractName, uint256 timestamp);
    event ContractRevoked(address indexed contractAddress, string contractName, uint256 timestamp);
}
