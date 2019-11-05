pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;
import "./StorageDefinition.sol";
import "./EternalStorage.sol";
contract Consortium is StorageDefinition {

    EternalStorage s;
    address public owner;

    constructor(address storageAddress) public {
        s = EternalStorage(storageAddress);
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyOrgAdmin() {
        require(s.getUserDetails().role == roles.admin,"Not an admin" );
        _;
    }

    modifier onlyProjectAdmin(bytes32 projectID) {
        require(s.getProjectDetails(projectID).projectAdmin == msg.sender);
        _;
    }

    modifier onlyRegistrant() {
        require(s.getUserDetails().role == roles.admin || s.getUserDetails().role == roles.registrant);
        _;
    }

    modifier userExists() {
        require(!compareStrings(s.getUserDetails().organizationID, ""));
        _;
    }

    // modifer belongsToProject(bytes32 projectID) {
    //     require()
    // }

    modifier uniqueEmail(string memory email) {
        require(s.getAddress(keccak256(abi.encodePacked("EmailToPKMapping", email))) == address(0x0));
        _;
    }

    modifier organizationExists(string memory organizationID) {
        require(s.getBoolean(keccak256(abi.encodePacked("organizationExists", organizationID))));
        _;
    }


    /**
       * @dev Throws if called by any account other than the registeredContract.
       */
    modifier onlyRegisteredContract() {
        require(s.isRegisteredContract(msg.sender));
        _;
    }

    function compareStrings (string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }

    function setOrganizationAdmin(string memory organizationID, string memory name, string memory orgKYCHash, string memory userKYCHash, string memory email) public uniqueEmail(email) {
        require(!s.getBoolean(keccak256(abi.encodePacked("organizationExists", organizationID))));
        s.setOrganization(organizationID, name, orgKYCHash);
        s.setBoolean(keccak256(abi.encodePacked("organizationExists", organizationID)), true);
        s.setAddress(keccak256(abi.encodePacked("EmailToPKMapping", email)), msg.sender);
        s.setString(keccak256(abi.encodePacked("OrganizationAdmin", organizationID)), email);
        s.setUser(organizationID, email, userKYCHash, roles.admin, true);
    }


    function registerInvitedUser(string calldata email, string calldata organizationID, string calldata kycHash) external uniqueEmail(email) {
        require(bytes(organizationID).length!=0, "Organization does not exist");
        require(bytes(s.getUserDetails().email).length == 0, "address already used.");
        s.setAddress(keccak256(abi.encodePacked("EmailToPKMapping", email)), msg.sender);
        s.setUser(organizationID, email, kycHash, roles.regular, false);
    }
    
    function deleteUser(address userAddress,string calldata organizationID)external onlyOwner{
        s.deleteUser(userAddress,organizationID);   
    }
    
    function deleteOrganization(string calldata organizationID) external onlyOwner{
        s.deleteOrganizationExt(organizationID);
    }


    function getInvitedUserOrganizationDetails(string memory email) public view returns (Organization memory){
        return s.getOrganizationDetails(s.getString(keccak256(abi.encodePacked("InviteEmail", email))));
    }

    function switchOrgAdmin(address publicKey) public onlyOrgAdmin {
        s.switchOrgAdmin(publicKey);
    }

    function updateUserRole(address publicKey, roles newRole) public onlyOrgAdmin {
        require(newRole!=roles.admin);
        s.updateUserRole(publicKey, newRole);
    }

    function getUserDetails() public view userExists returns (User memory) {
        return s.getUserDetails();
    }

    function getUserDetails(address publicKey) public view userExists returns (User memory) {
        return s.getUserDetails(publicKey);
    }

    function getOrganizationDetails() public view userExists returns (Organization memory) {
        return s.getOrganizationDetails();
    }

    function getOrganizationDetails(address publicKey) public view userExists returns (Organization memory) {
        return s.getOrganizationDetails(publicKey);
    }

    function getOrganizationDetails(string calldata organizationID) external view userExists returns (Organization memory) {
        return s.getOrganizationDetails(organizationID);
    }
    
    function getOrganizationDetailsByorganizationID(string calldata organizationID) external view returns (Organization memory) {
        return s.getOrganizationDetails(organizationID);
    }

    function getUserOrganizationDetails() public view userExists returns (User memory, Organization memory) {
        return s.getUserOrganizationDetails();
    }

    function addNewProject(bytes32 projectID,  string calldata name, string calldata description, string calldata industry, string calldata partnerRole) external onlyRegistrant {
        s.addNewProject(projectID, name, description, industry);
        emit ProjectCreated(projectID, name, s.getOrganizationDetails().name, now);
        s.addUserToProject(projectID, msg.sender, partnerRole);
    }

    // function addUserToProject(bytes32 projectID, address userAddress, string calldata partnerRole) external onlyProjectAdmin(projectID) {
    //     require(!s.getBoolean(keccak256(abi.encodePacked("BelongsToProject", projectID, userAddress))));
    //     s.addUserToProject(projectID, userAddress, partnerRole);
    //     s.setBoolean(keccak256(abi.encodePacked("BelongsToProject", projectID, userAddress)), true);
    //     string memory organizationName = s.getOrganizationDetails().name;
    //     string memory invitedOrganizationName = s.getOrganizationDetails(userAddress).name;
    //     emit PartnerAddedToConsortium(projectID, organizationName, invitedOrganizationName, partnerRole, now);
    //     delete(organizationName);
    //     delete(invitedOrganizationName);
    // }

    function getProjectDetails(bytes32 projectID) public view returns (Project memory) {
        return s.getProjectDetails(projectID);
    }

    function getMyProjects() public view returns (Project[] memory) {
        return s.getMyProjects();
    }

    function getMyProjectsCount() public view returns (uint256) {
        return s.getMyProjectsCount();
    }

    function getConsortiumMembers(bytes32 projectID) public view returns (User[] memory) {
        return s.getConsortiumMembers(projectID);
    }

    function getAllUsers() public view returns (User[] memory) {
        return s.getAllUsers();
    }

    function getAllOrganizations() public view returns (Organization[] memory) {
        return s.getAllOrganizations();
    }

    function getOrganizationEmployees() external view returns (User[] memory) {
        return s.getOrganizationEmployees(s.getUserDetails().organizationID);
    }

    // function getPartnerRole(bytes32 projectID, address publicKey) external view returns (string memory) {
    //     return s.getPartnerRole(projectID, publicKey);
    // }

    // function getPartnerRole(bytes32 projectID) public view returns (string memory) {
    //     return s.getPartnerRole(projectID);
    // }

    function setUserKYCStatus(address userAddress, KYCStatus status) public onlyOwner returns (bool) {
        return s.setUserKYCStatus(userAddress, status);
    }

    function setOrganizationKYCStatus(string memory organizationID, KYCStatus status) public onlyOwner returns (bool) {
        return s.setOrganizationKYCStatus(organizationID, status);
    }

    function getUserKYCStatus() public view userExists returns (KYCStatus status)  {
        return s.getUserKYCStatus();
    }

    function getOrganizationKYCStatus(string calldata organizationID) external view returns (KYCStatus status)  {
        return s.getOrganizationKYCStatus(organizationID);
    }

    function updateOrganizationKYC(string calldata kycHash) external onlyOrgAdmin returns (bool) {
      return s.updateOrganizationKYC(kycHash);
    }


    function updateKYC(string calldata kycHash) external userExists returns (bool) {
        return s.updateUserKYC(kycHash);
    }

    function addDocumentToProject(string calldata docID, bytes32 _projectID) external onlyRegisteredContract returns (bool) {
        emit DocumentAdded(_projectID,  s.getOrganizationDetails().name, docID, now);
        return true;
    }

    function addDeviceToProject(string calldata deviceID, bytes32 _projectID) external onlyRegisteredContract returns (bool) {
        emit DeviceAdded(_projectID, s.getOrganizationDetails().name, deviceID, now);
        return true;
    }

    function addProductToProject(string calldata productID, bytes32 _projectID) external onlyRegisteredContract returns (bool) {
        emit ProductAdded(_projectID,  s.getOrganizationDetails().name, productID, now);
        return true;
    }

    function isUniqueEmail(string memory email) public view returns (bool) {
        return(s.getAddress(keccak256(abi.encodePacked("EmailToPKMapping", email))) == address(0x0));
    }

    // Function to remove email from Email Mapping (Failsafe Mechanism)
    function removeEmailFromMapping(string memory email) public onlyOwner returns (bool) {
        s.setAddress(keccak256(abi.encodePacked("EmailToPKMapping", email)), address(0x0));
        return true;
    }

    function getPublicKeyFromEmail(string calldata email) external view returns(address) {
        return s.getAddress(keccak256(abi.encodePacked("EmailToPKMapping", email)));
    }


    // function confirmPartnershipStatus(string calldata organizationID, string calldata partnershipType) external onlyOwner {
    //     s.confirmPartnershipStatus(organizationID, partnershipType);
    // }

    function getPartnersByType(string calldata orgType) external view returns (Organization[] memory) {
        return s.getPartnersByType(orgType);
    }

    function getOrganizationAdminEmail(string calldata organizationID) external view returns (string memory) {
        return s.getString(keccak256(abi.encodePacked("OrganizationAdmin", organizationID)));
    }

}
