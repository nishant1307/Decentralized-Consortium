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
        require(userDirectory[msg.sender].role == roles.admin );
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
        string organizationID;
        string firstName;
        string lastName;
        string email;
        string phoneNumber;
        userKYCStatus status;
        roles role;
    }

    struct Organization {
        string organizationID;
        string name;
        string geocode;
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

    event ProjectCreated(string indexed _projectID, string name, uint256 timestamp, address indexed _by);
    event PartnerAddedToConsortium(string indexed _projectID, string organizationName, partnerRoles partnerRole, address indexed _by);
    event ItemAdded(string indexed _projectID, projectItems itemType, string itemID, address indexed _by, uint256 timestamp);

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

    function setUser(string memory firstName, string memory lastName, string memory email, string memory phoneNumber) public uniqueEmail(email) {
        require(bytes(invitedUsers[email].organizationID).length > 0);
        User memory newUser = User ({
            organizationID: invitedUsers[email].organizationID,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            role: roles.regular,
            status: userKYCStatus.kycPending
        });
        emailRegistry[email] = msg.sender;
        userDirectory[msg.sender] = newUser;
        users.push(newUser);
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

    function editUserEmail(string memory email) public userExists {
        userDirectory[msg.sender].email = email;
    }

    function editUserPhoneNumber(string memory phoneNumber) public userExists {
        userDirectory[msg.sender].phoneNumber = phoneNumber;
    }

    function getUserOrganizationDetails() public view userExists returns (User memory, Organization memory) {
        return (userDirectory[msg.sender], organizationDirectory[userDirectory[msg.sender].organizationID]);
    }

    function setOrganizationAdmin(string memory organizationID, string memory name, string memory geocode, string memory firstName, string memory lastName, string memory email, string memory phoneNumber, address publicKey) public uniqueEmail(email) {
        Organization memory newOrganization = Organization ({
            organizationID: organizationID,
            name: name,
            geocode: geocode
        });
        User memory newUser = User ({
            organizationID: organizationID,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            role: roles.admin,
            status: userKYCStatus.kycComplete
        });
        emailRegistry[email] = publicKey;
        userDirectory[publicKey] = newUser;
        users.push(newUser);
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
        myProjects[msg.sender].push(project);
        consortium[projectID].push(userDirectory[msg.sender]);
        projectRoles[projectID][msg.sender] = partnerRole;
        emit ProjectCreated(projectID, name, now, msg.sender);
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

    function addUserToProject(string memory projectID, address userAddress, partnerRoles partnerRole) public {
        consortium[projectID].push(userDirectory[userAddress]);
        myProjects[userAddress].push(projectRegistry[projectID]);
        projectRoles[projectID][msg.sender] = partnerRole;
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

    function getUserKYCStatus() public view userExists returns (userKYCStatus status)  {
        return userDirectory[msg.sender].status;
    }

    function existingEmail(string memory email) public view returns (bool){
        return(emailRegistry[email] != address(0x0));
    }

    function updateUserStatus(address userAddress, userKYCStatus status) public onlyOwner returns (bool) {
        userDirectory[userAddress].status = status;
    }

    function addItemToProject(projectItems itemType, string memory itemID, string memory _projectID, address _by, uint256 timestamp) public returns (bool) {
        Item memory newItem = Item({
            itemType: itemType,
            itemID: itemID
        });
        itemList[_projectID].push(newItem);
        emit ItemAdded(_projectID, itemType, itemID, _by, timestamp);
        return true;
    }
}
