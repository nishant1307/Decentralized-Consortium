pragma solidity ^0.5.10;
pragma experimental ABIEncoderV2;

contract Storage {

    address public owner;

    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender);
        _;
    }

    modifier onlyOrgAdmin() {
        require(userDirectory[msg.sender].role == roles.admin,"invalid admin address" );
        _;
    }

    modifier onlyRegistrant() {
        require(userDirectory[msg.sender].role == roles.admin || userDirectory[msg.sender].role == roles.registrant);
        _;
    }

    modifier userExists() {
        require(!compareStrings(userDirectory[msg.sender].organizationID, ""));
        _;
    }

    modifier uniqueEmail(string memory email) {
        require(emailRegistry[email]== address(0x0));
        _;
    }

    modifier organizationExists(string memory organizationID) {
        require(compareStrings(organizationDirectory[organizationID].organizationID, ""));
        _;
    }

    modifier sameOrganization(address a, address b) {
        require(compareStrings(userDirectory[a].organizationID, userDirectory[b].organizationID));
        _;
    }

    function compareStrings (string memory a, string memory b) public pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }

    enum roles {admin, regular, registrant}

    enum partnerRoles { buyer, seller, logistics, agent, bank }

    enum userKYCStatus { kycPending, kycComplete, banned }

    enum projectItems { document, device, product }

    struct User {
        address publicKey;
        string organizationID;
        string email;
        userKYCStatus status;
        string kycHash;
        roles role;
    }

    struct Organization {
        string organizationID;
        string name;
        string kycHash;
        userKYCStatus status;
    }

    struct Project {
        string projectID;
        string name;
        string description;
        string industry;
    }

    struct Item {
        projectItems itemType;
        string itemID;
    }

    event ProjectCreated(string indexed _projectID, string name, uint256 timestamp);
    event PartnerAddedToConsortium(string indexed _projectID, address userAddress, partnerRoles partnerRole);
    event ItemAdded(string indexed _projectID, projectItems itemType, string itemID, uint256 timestamp);

    // Mapping of invited users emails
    mapping(string => Organization) invitedUsers;

    // User Directory
    mapping(address => User) userDirectory;

    // Email Registry
    mapping(string => address) emailRegistry;

    // All users
    User[] private users;

    // Organization Directory from organizationID
    mapping(string => Organization) private organizationDirectory;

    // All Organizations
    Organization[] private organizations;

    // Mapping between orgID and its Users
    mapping(string => User[]) orgEmployees;

    // mapping between Project ID and project Details
    mapping (string => Project) private projectRegistry;

    // mapping between ProjectId and Users
    mapping (string => User[]) private consortium;

    // mapping between userPublicKey and Projects
    mapping (address => Project[]) private myProjects;

    // mapping between orgType and Organization
    mapping (string => Organization[]) private partners;

    // mapping between projectID and user with their roles
    mapping(string => mapping (address => partnerRoles)) projectRoles;

    // mapping between ProjectID and item
    mapping(string => Item[]) itemList;

    function createUser(string memory organizationID, string memory email, string memory kycHash, roles role) internal uniqueEmail(email) {
        User memory newUser;
        newUser.organizationID = organizationID;
        newUser.email = email;
        newUser.role = role;
        newUser.publicKey = msg.sender;
        newUser.status =  userKYCStatus.kycPending;
        newUser.kycHash = kycHash;
        emailRegistry[email] = msg.sender;
        userDirectory[msg.sender] = newUser;
        users.push(newUser);
        orgEmployees[organizationID].push(newUser);
    }

    function setUser(string memory email, string memory kycHash, roles role) public uniqueEmail(email) {
        if(role != roles.admin) {
            require(bytes(invitedUsers[email].organizationID).length > 0, "invalid email.");
            require(bytes(userDirectory[msg.sender].email).length == 0, "address already used.");
        }
        createUser(invitedUsers[email].organizationID, email , kycHash, role);
    }

    function inviteUser(string memory email) public onlyOrgAdmin() {
        Organization storage adminOrg = organizationDirectory[userDirectory[msg.sender].organizationID];
        invitedUsers[email] = adminOrg;
    }

    function switchOrgAdmin(address publicKey) public onlyOrgAdmin sameOrganization(msg.sender, publicKey) {
        userDirectory[msg.sender].role = roles.regular;
        userDirectory[publicKey].role == roles.admin;
    }

    function updateUserRole(address publicKey, roles newRole) public onlyOrgAdmin sameOrganization(msg.sender, publicKey) {
        require(newRole!=roles.admin);
        userDirectory[publicKey].role = newRole;
    }

    function getUserOrganizationDetails() public view userExists returns (User memory, Organization memory) {
        return (userDirectory[msg.sender], organizationDirectory[userDirectory[msg.sender].organizationID]);
    }

    function setOrganizationAdmin(string memory organizationID, string memory name, string memory orgKYCHash, string memory userKYCHash, string memory email) public uniqueEmail(email) {
        Organization memory newOrganization;
        newOrganization.organizationID =organizationID;
        newOrganization.name = name;
        newOrganization.kycHash = orgKYCHash;
        newOrganization.status = userKYCStatus.kycPending;
        createUser(organizationID ,email, userKYCHash, roles.admin);
        organizationDirectory[organizationID] = newOrganization;
        organizations.push(newOrganization);
        partners["All"].push(newOrganization);
    }

    function setOrganizationType(string memory organizationID, string memory orgType) public userExists organizationExists(organizationID) {
        partners[orgType].push(organizationDirectory[organizationID]);
    }

    function getOrganizationDetails(string memory organizationID) public view userExists returns (Organization memory) {
        return organizationDirectory[organizationID];
    }

    function addNewProject(string memory projectID,  string memory name, string memory description, string memory industry, partnerRoles partnerRole) public userExists {
        Project memory project;
        project.projectID = projectID;
        project.name = name;
        project.description = description;
        project.industry = industry;
        projectRegistry[projectID] = project;
        emit ProjectCreated(projectID, name, now);
        addUserToProject(projectID, msg.sender, partnerRole);
    }

    function addUserToProject(string memory projectID, address userAddress, partnerRoles partnerRole) public {
        consortium[projectID].push(userDirectory[userAddress]);
        myProjects[userAddress].push(projectRegistry[projectID]);
        projectRoles[projectID][userAddress] = partnerRole;
        emit PartnerAddedToConsortium(projectID, userAddress, partnerRole);
    }

    function getProjectDetails(string memory projectID) public view returns (Project memory) {
        return (projectRegistry[projectID]);
    }

    function getMyProjects() public view returns (Project[] memory) {
        return myProjects[msg.sender];
    }

    function getMyProjectsCount() public view returns (uint) {
        return myProjects[msg.sender].length;
    }

    function getConsortiumMember(string memory projectID) public view returns (User[] memory) {
        return (consortium[projectID]);
    }

    function getAllUsers() public view returns (User[] memory) {
        return users;
    }

    function getAllOrganizations() public view returns (Organization[] memory) {
        return organizations;
    }

    function getPartnersByType(string memory orgType) public view returns (Organization[] memory) {
        return partners[orgType];
    }

    function getPartnerRole(string memory projectID, address publicKey) public view returns (partnerRoles) {
        return projectRoles[projectID][publicKey];
    }

    function getMyRole(string memory projectID) public view returns (partnerRoles) {
        return projectRoles[projectID][msg.sender];
    }

    function setUserStatus(address userAddress, userKYCStatus status) public onlyOwner returns (bool) {
        userDirectory[userAddress].status = status;
    }

    function setOrganizationKYCStatus(string memory organizationID, userKYCStatus status) public onlyOwner returns (bool) {
        organizationDirectory[organizationID].status = status;
    }


    function getUserKYCStatus() public view userExists returns (userKYCStatus status)  {
        return userDirectory[msg.sender].status;
    }

    function getOrganizationKYCStatus(string memory organizationID) public view returns (userKYCStatus status)  {
        return organizationDirectory[organizationID].status;
    }

    function updateOrganizationKYC(string memory organizationID ,string memory kycHash) public onlyOrgAdmin returns (bool) {
       organizationDirectory[organizationID].kycHash = kycHash;
    }


    function updateKYC(string memory kycHash) public userExists returns (bool) {
        userDirectory[msg.sender].status =  userKYCStatus.kycPending;
        userDirectory[msg.sender].kycHash = kycHash;
    }

    function existingEmail(string memory email) public view returns (bool){
        return(emailRegistry[email] != address(0x0));
    }

    function addItemToProject(projectItems itemType, string memory itemID, string memory _projectID, uint256 timestamp) public returns (bool) {
        Item memory newItem = Item({
            itemType: itemType,
            itemID: itemID
        });
        itemList[_projectID].push(newItem);
        emit ItemAdded(_projectID, itemType, itemID, timestamp);
        return true;
    }
}
