pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;
import "./Storage.sol";
import "./EternalStorage.sol";
import "./Utils.sol";

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
        require(projectRegistry[projectID].projectAdmin == msg.sender);
        _;
    }

    modifier onlyRegistrant() {
        require(s.getUserDetails().role == roles.admin || s.getUserDetails().role == roles.registrant);
        _;
    }

    modifier userExists() {
        require(!Utils.compareStrings(s.getUserDetails().organizationID, ""));
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

    // mapping between Project ID and project Details
    mapping (bytes32 => Project) internal projectRegistry;

    // mapping between ProjectId and Users
    mapping (bytes32 => User[]) internal consortium;

    // mapping between ProjectId and Consortium Requests
    mapping (bytes32 => address[]) consortiumRequests;

    // mapping between userPublicKey and Projects
    mapping (address => Project[]) internal myProjects;

    // mapping between projectID and user with their roles
    mapping(bytes32 => mapping (address => partnerRoles)) internal projectRoles;

    function setOrganizationAdmin(string memory organizationID, string memory name, string memory orgKYCHash, string memory userKYCHash, string memory email) public uniqueEmail(email) {
        s.setOrganization(organizationID, name, orgKYCHash);
        s.setBoolean(keccak256(abi.encodePacked("organizationExists", organizationID)), true);
        s.setAddress(keccak256(abi.encodePacked("EmailToPKMapping", email)), msg.sender);
        s.setString(keccak256(abi.encodePacked("OrganizationAdmin", organizationID)), email);
        s.setUser(organizationID, email, userKYCHash, roles.admin);
    }

    function setUser(string memory email, string memory kycHash) public uniqueEmail(email) {
        require(bytes(s.getString(keccak256(abi.encodePacked("InviteEmail", email)))).length > 0, "invalid email.");
        require(bytes(s.getUserDetails().email).length == 0, "address already used.");
        s.setAddress(keccak256(abi.encodePacked("EmailToPKMapping", email)), msg.sender);
        s.setUser(s.getString(keccak256(abi.encodePacked("InviteEmail", email))), email, kycHash, roles.regular);
    }

    function inviteUser(string memory email) public onlyOrgAdmin() {
        Organization memory adminOrg = s.getOrganizationDetails();
        s.setString(keccak256(abi.encodePacked("InviteEmail", email)), adminOrg.organizationID);
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

    function getOrganizationDetails() public view userExists returns (Organization memory) {
        return s.getOrganizationDetails();
    }

    function getUserOrganizationDetails() public view userExists returns (User memory, Organization memory) {
        return s.getUserOrganizationDetails();
    }

    function addNewProject(bytes32 projectID,  string memory name, string memory description, string memory industry, partnerRoles partnerRole, bytes32 passcode) public onlyRegistrant {
        Project memory project;
        project.projectID = projectID;
        project.name = name;
        project.description = description;
        project.industry = industry;
        project.projectAdmin = msg.sender;
        projectRegistry[projectID] = project;
        emit ProjectCreated(projectID, name, s.getUserDetails().email, now);
        s.setBytes32(keccak256(abi.encodePacked("ProjectPasscode", projectID)), passcode);
        addUserToProject(projectID, msg.sender, partnerRole);
    }

    function addUserToProject(bytes32 projectID, address userAddress, partnerRoles partnerRole) public onlyProjectAdmin(projectID) {
        consortium[projectID].push(s.getUserDetailsFromPublicKey(userAddress));
        myProjects[userAddress].push(projectRegistry[projectID]);
        projectRoles[projectID][userAddress] = partnerRole;
        s.setBoolean(keccak256(abi.encodePacked("BelongsToProject", projectID, userAddress)), true);
        emit PartnerAddedToConsortium(projectID, s.getOrganizationDetails().name, s.getUserDetailsFromPublicKey(userAddress).email, partnerRole, now);
    }

    function requestProjectInvite(bytes32 passcode, bytes32 projectID) external userExists returns(bool){
        require(s.getBytes32(keccak256(abi.encodePacked("ProjectPasscode", projectID)))==passcode);
        consortiumRequests[projectID].push(msg.sender);
        return true;
    }

    function fetchProjectInvites(bytes32 projectID) onlyProjectAdmin(projectID) external view returns(address[] memory){
        return consortiumRequests[projectID];
    }

    function fetchProjectPasscode(bytes32 projectID) onlyProjectAdmin(projectID) external view returns(bytes32){
        return s.getBytes32(keccak256(abi.encodePacked("ProjectPasscode", projectID)));
    }

    function getProjectDetails(bytes32 projectID) public view returns (Project memory) {
        return (projectRegistry[projectID]);
    }

    function getMyProjects() public view returns (Project[] memory) {
        return myProjects[msg.sender];
    }

    function getMyProjectsCount() public view returns (uint256) {
        return myProjects[msg.sender].length;
    }

    function getConsortiumMember(bytes32 projectID) public view returns (User[] memory) {
        return (consortium[projectID]);
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

    function getPartnerRole(bytes32 projectID, address publicKey) external view returns (partnerRoles) {
        return projectRoles[projectID][publicKey];
    }

    function getMyRole(bytes32 projectID) public view returns (partnerRoles) {
        return projectRoles[projectID][msg.sender];
    }

    function setUserStatus(address userAddress, KYCStatus status) public onlyOwner returns (bool) {
        return s.setUserStatus(userAddress, status);
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

    function createPartnershipRequest(string calldata organizationID, string calldata partnershipType, string calldata partnershipDoc) external onlyOrgAdmin{
        uint256 length = s.createPartnershipRequest(organizationID, partnershipType, partnershipDoc);
        s.setUint(keccak256(abi.encodePacked("PartnershipRequestDirectory", partnershipType, s.getUserDetails().organizationID)), length-1);
    }

    function getAllPartnershipRequests() external view returns(PartnershipRequest[] memory) {
        return s.getAllPartnershipRequests();
    }

    function updatePartnershipStatus(string calldata organizationID, string calldata partnershipType, KYCStatus partnershipStatus) external onlyOwner {
        s.updatePartnershipStatus(organizationID, partnershipType, partnershipStatus);
    }

    function getPartnersByType(string calldata orgType) external view returns (Organization[] memory) {
        return s.getPartnersByType(orgType);
    }

    function getOrganizationAdminEmail(string calldata organizationID) external view returns (string memory) {
        return s.getString(keccak256(abi.encodePacked("OrganizationAdmin", organizationID)));
    }

}
