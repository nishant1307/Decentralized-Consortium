pragma solidity ^0.5.11;
contract StorageDefinition {
    struct Storage {
        mapping(bytes32 => bool) _bool;
        mapping(bytes32 => uint256) _uint;
        mapping(bytes32 => string) _string;
        mapping(bytes32 => address) _address;
    }

    struct User {
        address publicKey;
        string organizationID;
        string email;
        KYCStatus status;
        string kycHash;
        roles role;
        bool adminApprovalStatus;
    }
    struct Organization {
        string organizationID;
        string name;
        string kycHash;
        KYCStatus status;
    }

    enum roles {regular, admin, registrant}

    enum KYCStatus { kycPending, kycComplete, suspended }

    enum projectItems { document, device, product }

    struct Project {
        bytes32 projectID;
        string name;
        string description;
        string industry;
        address projectAdmin;
    }

    struct PartnershipRequest {
        string partnershipRequestID;
        string partnershipType;
        string organizationID;
        string partnershipDoc;
        KYCStatus partnershipStatus;
    }

    event ProjectCreated(bytes32 indexed _projectID, string name, string _by, uint256 timestamp);
    event PartnerAddedToConsortium(bytes32 indexed _projectID, string _by, string partnerOrganization, string partnerRole, uint256 timestamp);
    event DocumentAdded(bytes32 indexed _projectID, string _by, string itemID, uint256 timestamp);
    event DeviceAdded(bytes32 indexed _projectID, string _by, string itemID, uint256 timestamp);
    event ProductAdded(bytes32 indexed _projectID, string _by, string itemID, uint256 timestamp);

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event ContractRegistered(address indexed contractAddress, string contractName, uint256 timestamp);
    event ContractRevoked(address indexed contractAddress, string contractName, uint256 timestamp);
}
