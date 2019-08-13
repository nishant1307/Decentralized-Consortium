pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;
import "./EternalStorage.sol";
contract Registry{

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
        require(s.getUserDetails().role == EternalStorage.roles.admin,"invalid admin address" );
        _;
    }

    modifier onlyRegistrant() {
        require(s.getUserDetails().role == EternalStorage.roles.admin || s.getUserDetails().role == EternalStorage.roles.registrant);
        _;
    }

    modifier userExists() {
        require(!compareStrings(s.getUserDetails().organizationID, ""));
        _;
    }

    modifier uniqueEmail(string memory email) {
        require(s.getAddress(keccak256(abi.encodePacked(email))) == address(0x0));
        _;
    }

    modifier organizationExists(string memory organizationID) {
        require(s.getBoolean(keccak256(abi.encodePacked("organizationExists", organizationID))));
        _;
    }

    function compareStrings (string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }

    // enum roles {admin, regular, registrant}

    enum partnerRoles { buyer, seller, logistics, agent, bank }

    // enum userKYCStatus { kycPending, kycComplete, banned }

    enum projectItems { document, device, product }

    struct Project {
        bytes32 projectID;
        string name;
        string description;
        string industry;
    }

    event ProjectCreated(bytes32 indexed _projectID, string name, address _by, uint256 timestamp);
    event PartnerAddedToConsortium(bytes32 indexed _projectID, address _by, address userAddress, partnerRoles partnerRole, uint256 timestamp);
    event DocumentAdded(bytes32 indexed _projectID, address _by, string itemID, uint256 timestamp);
    event DeviceAdded(bytes32 indexed _projectID, address _by, string itemID, uint256 timestamp);
    event ProductAdded(bytes32 indexed _projectID, address _by, string itemID, uint256 timestamp);

    // mapping between Project ID and project Details
    mapping (bytes32 => Project) internal projectRegistry;

    // mapping between ProjectId and Users
    mapping (bytes32 => EternalStorage.User[]) internal consortium;

    // mapping between userPublicKey and Projects
    mapping (address => Project[]) internal myProjects;

    // mapping between projectID and user with their roles
    mapping(bytes32 => mapping (address => partnerRoles)) internal projectRoles;

    function setOrganizationAdmin(string memory organizationID, string memory name, string memory orgKYCHash, string memory userKYCHash, string memory email) public uniqueEmail(email) {
        s.setOrganizationAdmin(organizationID, name, orgKYCHash, userKYCHash, email);
        s.setBoolean(keccak256(abi.encodePacked("organizationExists", organizationID)), true);
    }

    function createUser(string memory organizationID, string memory email, string memory kycHash, EternalStorage.roles role) public uniqueEmail(email) {
        s.createUser(organizationID, email, kycHash, role);
    }

    function setUser(string memory email, string memory kycHash, EternalStorage.roles role) public uniqueEmail(email) {
        if(role != EternalStorage.roles.admin) {
            require(bytes(s.getString(keccak256(abi.encodePacked("InviteEmail", email)))).length > 0, "invalid email.");
            require(bytes(s.getUserDetails().email).length == 0, "address already used.");
        }
        createUser(s.getString(keccak256(abi.encodePacked("InviteEmail", email))), email , kycHash, role);
    }

    function inviteUser(string memory email) public onlyOrgAdmin() {
        EternalStorage.Organization memory adminOrg = s.getOrganizationDetails();
        s.setString(keccak256(abi.encodePacked("InviteEmail", email)), adminOrg.organizationID);
    }

    function switchOrgAdmin(address publicKey) public onlyOrgAdmin {
        s.switchOrgAdmin(publicKey);
    }

    function updateUserRole(address publicKey, EternalStorage.roles newRole) public onlyOrgAdmin {
        require(newRole!=EternalStorage.roles.admin);
        s.updateUserRole(publicKey, newRole);
    }

    function getUserDetails() public view userExists returns (EternalStorage.User memory) {
        return s.getUserDetails();
    }

    function getOrganizationDetails() public view userExists returns (EternalStorage.Organization memory) {
        return s.getOrganizationDetails();
    }

    function getUserOrganizationDetails() public view userExists returns (EternalStorage.User memory, EternalStorage.Organization memory) {
        return s.getUserOrganizationDetails();
    }

    function setOrganizationType(string memory organizationID, string memory orgType) public userExists organizationExists(organizationID) {
        s.setOrganizationType(organizationID, orgType);
    }

    function addNewProject(bytes32 projectID,  string memory name, string memory description, string memory industry, partnerRoles partnerRole) public userExists {
        Project memory project;
        project.projectID = projectID;
        project.name = name;
        project.description = description;
        project.industry = industry;
        projectRegistry[projectID] = project;
        emit ProjectCreated(projectID, name, msg.sender, now);
        addUserToProject(projectID, msg.sender, partnerRole);
    }

    function addUserToProject(bytes32 projectID, address userAddress, partnerRoles partnerRole) public {
        consortium[projectID].push(s.getUserDetailsFromPublicKey(userAddress));
        myProjects[userAddress].push(projectRegistry[projectID]);
        projectRoles[projectID][userAddress] = partnerRole;
        emit PartnerAddedToConsortium(projectID, msg.sender, userAddress, partnerRole, now);
    }

    function getProjectDetails(bytes32 projectID) public view returns (Project memory) {
        return (projectRegistry[projectID]);
    }

    function getMyProjects() public view returns (Project[] memory) {
        return myProjects[msg.sender];
    }

    function getMyProjectsCount() public view returns (uint) {
        return myProjects[msg.sender].length;
    }

    function getConsortiumMember(bytes32 projectID) public view returns (EternalStorage.User[] memory) {
        return (consortium[projectID]);
    }

    function getAllUsers() public view returns (EternalStorage.User[] memory) {
        return s.getAllUsers();
    }

    function getAllOrganizations() public view returns (EternalStorage.Organization[] memory) {
        return s.getAllOrganizations();
    }

    function getOrganizationEmployees(string memory organizationID) public view returns (EternalStorage.User[] memory) {
        return s.getOrganizationEmployees(organizationID);
    }

    function getPartnersByType(string memory orgType) public view returns (EternalStorage.Organization[] memory) {
        return s.getPartnersByType(orgType);
    }

    function getPartnerRole(bytes32 projectID, address publicKey) public view returns (partnerRoles) {
        return projectRoles[projectID][publicKey];
    }

    function getMyRole(bytes32 projectID) public view returns (partnerRoles) {
        return projectRoles[projectID][msg.sender];
    }

    function setUserStatus(address userAddress, EternalStorage.userKYCStatus status) public onlyOwner returns (bool) {
        return s.setUserStatus(userAddress, status);
    }

    function setOrganizationKYCStatus(string memory organizationID, EternalStorage.userKYCStatus status) public onlyOwner returns (bool) {
        return s.setOrganizationKYCStatus(organizationID, status);
    }

    function getUserKYCStatus() public view userExists returns (EternalStorage.userKYCStatus status)  {
        return s.getUserKYCStatus();
    }

    function getOrganizationKYCStatus(string memory organizationID) public view returns (EternalStorage.userKYCStatus status)  {
        return s.getOrganizationKYCStatus(organizationID);
    }

    function updateOrganizationKYC(string memory kycHash) public onlyOrgAdmin returns (bool) {
      return s.updateOrganizationKYC(kycHash);
    }


    function updateKYC(string memory kycHash) public userExists returns (bool) {
        return s.updateKYC(kycHash);
    }

    function existingEmail(string memory email) public view returns (bool){
        return(s.getAddress(keccak256(abi.encodePacked(email))) != address(0x0));
    }

    function addDocumentToProject(string memory docID, bytes32 _projectID) public userExists returns (bool) {
        emit DocumentAdded(_projectID, msg.sender, docID, now);
        return true;
    }

    function addDeviceToProject(string memory itemID, bytes32 _projectID) public userExists returns (bool) {
        emit DeviceAdded(_projectID, msg.sender, itemID, now);
        return true;
    }

    function addProductToProject(string memory itemID, bytes32 _projectID) public userExists returns (bool) {
        emit ProductAdded(_projectID, msg.sender, itemID, now);
        return true;
    }
}
