pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;

import "./Storage.sol";
/**
 * @title EternalStorage
 * @dev An ownable contract that can be used as a storage where the variables
 * are stored in a set of mappings indexed by hash names.
 */
contract EternalStorage is StorageDefinition {

    // All users
    User[] internal users;
    // User Directory
    mapping(address => User) internal userDirectory;

    // Organization Directory from organizationID
    mapping(string => Organization) internal organizationDirectory;

    // All Organizations
    Organization[] internal organizations;

    // Mapping between orgID and its Users
    mapping(string => User[]) internal orgEmployees;

    // mapping between partnershipType and Organization
    mapping (string => Organization[]) internal partners;

    Storage internal s;

    mapping(address => bool) internal registeredContracts;

    address public owner;


    // All PartnershipRequest
    PartnershipRequest[] internal partnershipRequests;

  /**
   * @dev The constructor sets the original `owner` of the
   * contract to the sender account.
   */
  constructor() public {
    owner = msg.sender;
  }

  /**
   * @dev Throws if called by any account other than the owner.
   */
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  /**
   * @dev Throws if called by any account other than the registeredContract.
   */
  modifier onlyRegisteredContract() {
    require(registeredContracts[msg.sender]||msg.sender==address(this));
    _;
  }

  modifier sameOrganization(address a, address b) {
        require(compareStrings(userDirectory[a].organizationID, userDirectory[b].organizationID));
        _;
    }

    function compareStrings (string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }


  /**
   * @dev Allows the current owner to transfer control of the contract to a
   * newOwner.
   * @param newOwner The address to transfer ownership to.
   */
  function transferOwnership(address newOwner) external onlyOwner {
    require(newOwner != address(0));
    emit OwnershipTransferred(owner, newOwner);
    owner = newOwner;
  }

  function addRegisteredContract(address contractAddress, string calldata contractType) external onlyOwner {
    require(contractAddress != address(0));
    emit ContractRegistered(contractAddress, contractType, now);
    if(this.getAddress(keccak256(abi.encodePacked("ContractRegistry", contractType)))!=address(0x0)){
        revokeRegisteredContract(contractAddress, contractType);
    }
    this.setAddress(keccak256(abi.encodePacked("ContractRegistry", contractType)), contractAddress);
    registeredContracts[contractAddress] = true;
  }

  function getRegisteredContractAddress(string calldata contractType) external view onlyRegisteredContract returns (address) {
    return this.getAddress(keccak256(abi.encodePacked("ContractRegistry", contractType)));
  }

  function isRegisteredContract(address contractAddress) external view onlyRegisteredContract returns (bool) {
      return(registeredContracts[contractAddress]||contractAddress==address(this));
  }

  function revokeRegisteredContract(address contractAddress, string memory contractType) internal onlyOwner {
    require(contractAddress != address(0));
    emit ContractRevoked(contractAddress, contractType, now);
    registeredContracts[contractAddress] = false;
  }

  /**
   * @dev Allows the owner to set a value for a boolean variable.
   * @param h The keccak256 hash of the variable name
   * @param v The value to be stored
   */
  function setBoolean(bytes32 h, bool v) external onlyRegisteredContract {
    s._bool[h] = v;
  }

  /**
   * @dev Allows the owner to set a value for a int variable.
   * @param h The keccak256 hash of the variable name
   * @param v The value to be stored
   */
  function setInt(bytes32 h, int v) external onlyRegisteredContract {
    s._int[h] = v;
  }

  /**
   * @dev Allows the owner to set a value for a boolean variable.
   * @param h The keccak256 hash of the variable name
   * @param v The value to be stored
   */
  function setUint(bytes32 h, uint256 v) external onlyRegisteredContract {
    s._uint[h] = v;
  }

  /**
   * @dev Allows the owner to set a value for a address variable.
   * @param h The keccak256 hash of the variable name
   * @param v The value to be stored
   */
  function setAddress(bytes32 h, address v) external onlyRegisteredContract {
    s._address[h] = v;
  }

  /**
   * @dev Allows the owner to set a value for a string variable.
   * @param h The keccak256 hash of the variable name
   * @param v The value to be stored
   */
  function setString(bytes32 h, string calldata v) external onlyRegisteredContract {
    s._string[h] = v;
  }

  /**
   * @dev Allows the owner to set a value for a bytes variable.
   * @param h The keccak256 hash of the variable name
   * @param v The value to be stored
   */
  function setBytes32(bytes32 h, bytes32 v) external onlyRegisteredContract {
    s._bytes32[h] = v;
  }

  /**
   * @dev Get the value stored of a boolean variable by the hash name
   * @param h The keccak256 hash of the variable name
   */
  function getBoolean(bytes32 h) external view returns (bool){
    return s._bool[h];
  }

  /**
   * @dev Get the value stored of a int variable by the hash name
   * @param h The keccak256 hash of the variable name
   */
  function getInt(bytes32 h) external view returns (int){
    return s._int[h];
  }

  /**
   * @dev Get the value stored of a uint variable by the hash name
   * @param h The keccak256 hash of the variable name
   */
  function getUint(bytes32 h) external view returns (uint256){
    return s._uint[h];
  }

  /**
   * @dev Get the value stored of a address variable by the hash name
   * @param h The keccak256 hash of the variable name
   */
  function getAddress(bytes32 h) external view returns (address){
    return s._address[h];
  }

  /**
   * @dev Get the value stored of a string variable by the hash name
   * @param h The keccak256 hash of the variable name
   */
  function getString(bytes32 h) external view returns (string memory){
    return s._string[h];
  }

  /**
   * @dev Get the value stored of a bytes variable by the hash name
   * @param h The keccak256 hash of the variable name
   */
  function getBytes(bytes32 h) external view returns (bytes32){
    return s._bytes32[h];
  }

  /**** Delete Methods ***********/

    /// @param _key The key for the record
    function deleteAddress(bytes32 _key) onlyRegisteredContract external {
        delete s._address[_key];
    }

    /// @param _key The key for the record
    function deleteUint(bytes32 _key) onlyRegisteredContract external {
        delete s._uint[_key];
    }

    /// @param _key The key for the record
    function deleteString(bytes32 _key) onlyRegisteredContract external {
        delete s._string[_key];
    }

    /// @param _key The key for the record
    function deleteBytes32(bytes32 _key) onlyRegisteredContract external {
        delete s._bytes32[_key];
    }

    /// @param _key The key for the record
    function deleteBool(bytes32 _key) onlyRegisteredContract external {
        delete s._bool[_key];
    }

    /// @param _key The key for the record
    function deleteInt(bytes32 _key) onlyRegisteredContract external {
        delete s._int[_key];
    }

    function setUser(string calldata organizationID, string calldata email, string calldata kycHash, roles role) external onlyRegisteredContract {
        User memory newUser;
        newUser.organizationID = organizationID;
        newUser.email = email;
        newUser.role = role;
        newUser.publicKey = tx.origin;
        newUser.status =  KYCStatus.kycPending;
        newUser.kycHash = kycHash;
        userDirectory[tx.origin] = newUser;
        users.push(newUser);
        orgEmployees[organizationID].push(newUser);
    }

    function setOrganization(string calldata organizationID, string calldata name, string calldata orgKYCHash) external onlyRegisteredContract {
        Organization memory newOrganization;
        newOrganization.organizationID =organizationID;
        newOrganization.name = name;
        newOrganization.kycHash = orgKYCHash;
        newOrganization.status = KYCStatus.kycPending;
        organizationDirectory[organizationID] = newOrganization;
        organizations.push(newOrganization);
        partners["All"].push(newOrganization);
    }

    function getAllUsers() external view onlyRegisteredContract returns (User[] memory) {
        return users;
    }

    function getAllOrganizations() external view onlyRegisteredContract returns (Organization[] memory) {
        return organizations;
    }

    function getUserDetails() external view onlyRegisteredContract returns (User memory) {
        return (userDirectory[tx.origin]);
    }

    function getUserDetailsFromPublicKey(address userAddress) external view onlyRegisteredContract returns (User memory) {
        return (userDirectory[userAddress]);
    }

    function getOrganizationDetails() external view onlyRegisteredContract returns (Organization memory) {
        return (organizationDirectory[userDirectory[tx.origin].organizationID]);
    }

    function getUserOrganizationDetails() external view onlyRegisteredContract returns (User memory, Organization memory) {
        return (userDirectory[tx.origin], organizationDirectory[userDirectory[tx.origin].organizationID]);
    }

    function getOrganizationEmployees(string calldata organizationID) external view returns (User[] memory) {
        return orgEmployees[organizationID];
    }

    function switchOrgAdmin(address externalKey) external onlyRegisteredContract sameOrganization(tx.origin, externalKey){
        userDirectory[tx.origin].role = roles.regular;
        userDirectory[externalKey].role = roles.admin;
    }

    function updateUserRole(address externalKey, roles newRole) external onlyRegisteredContract sameOrganization(tx.origin, externalKey) {
        userDirectory[externalKey].role = newRole;
    }

    function getPartnersByType(string calldata orgType) external onlyRegisteredContract view returns (Organization[] memory) {
        return partners[orgType];
    }

    function updateUserKYC(string calldata kycHash) external onlyRegisteredContract returns (bool) {
        userDirectory[tx.origin].status =  KYCStatus.kycPending;
        userDirectory[tx.origin].kycHash = kycHash;
        return true;
    }

    function updateOrganizationKYC(string calldata kycHash) external onlyRegisteredContract returns (bool) {
       organizationDirectory[userDirectory[tx.origin].organizationID].kycHash = kycHash;
    }

    function setOrganizationKYCStatus(string calldata organizationID, KYCStatus status) external onlyRegisteredContract returns (bool) {
        organizationDirectory[organizationID].status = status;
        return true;
    }

    function getOrganizationKYCStatus(string calldata organizationID) external view onlyRegisteredContract returns (KYCStatus status)  {
        return organizationDirectory[organizationID].status;
    }

    function setUserStatus(address userAddress, KYCStatus status) external onlyRegisteredContract returns (bool) {
        userDirectory[userAddress].status = status;
        return true;
    }

    function getUserKYCStatus() external view onlyRegisteredContract returns (KYCStatus status)  {
        return userDirectory[tx.origin].status;
    }

    function createPartnershipRequest(string calldata organizationID, string calldata partnershipType, string calldata partnershipDoc) external onlyRegisteredContract{
        PartnershipRequest memory newRequest;
        newRequest.organizationID = organizationID;
        newRequest.partnershipDoc = partnershipDoc;
        newRequest.partnershipType = partnershipType;
        newRequest.partnershipStatus = KYCStatus.kycPending;
        partnershipRequests.push(newRequest);
        this.setUint(keccak256(abi.encodePacked("PartnershipRequestDirectory", partnershipType, this.getUserDetails().organizationID)), partnershipRequests.length-1);
    }

    function getAllPartnershipRequests() external view onlyRegisteredContract returns(PartnershipRequest[] memory) {
        return partnershipRequests;
    }

    function updatePartnershipStatus(string calldata organizationID, string calldata partnershipType, KYCStatus partnershipStatus) external onlyRegisteredContract {
        uint256 index = this.getUint(keccak256(abi.encodePacked("PartnershipRequestDirectory", partnershipType, organizationID)));
        partnershipRequests[index].partnershipStatus = partnershipStatus;
        if(partnershipStatus== KYCStatus.kycComplete){
            confirmPartnershipStatus(organizationID, partnershipType);
        }
    }

    function confirmPartnershipStatus(string memory organizationID, string memory partnershipType) internal {
        partners[partnershipType].push(organizationDirectory[organizationID]);
    }
}