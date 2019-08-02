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
    modifier userExists() {
        require(userDirectory[msg.sender].userAddress != address(0x0));
        _;
    }

    enum roles {admin, regular}

    enum partnerRoles { buyer, seller, shipper, bank }

    enum status { active, inactive }

    struct User {
        address userAddress;
        string userID;
        string organizationID;
        string firstName;
        string lastName;
        string email;
        string phoneNumber;
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
        status projectStatus;
        uint256 startTime;
        uint256 endTime;
    }

    // Mapping of invited users emails
    mapping(string => Organization) invitedUsers;

    // User Directory
    mapping(address => User) userDirectory;

    // All users
    User[] private users;

    // User Directory from userID
    mapping(string => User) userDirectoryFromID;

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

    function setUser(string memory userID, string memory firstName, string memory lastName, string memory email, string memory phoneNumber, address publicKey) public {
        require(bytes(invitedUsers[email].organizationID).length > 0);
        User memory newUser = User ({
            userAddress : publicKey,
            userID: userID,
            organizationID: invitedUsers[email].organizationID,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            role: roles.regular
        });

        userDirectory[publicKey] = newUser;
        userDirectoryFromID[userID] = newUser;
        users.push(newUser);
    }

    function inviteUser(string memory email) public onlyOrgAdmin() {
        Organization storage adminOrg = organizationDirectory[userDirectory[msg.sender].organizationID];
        invitedUsers[email] = adminOrg;
    }

    function updateOrgAdmin(address publicKey) public onlyOrgAdmin {
        userDirectory[msg.sender].role = roles.regular;
        userDirectory[publicKey].role == roles.admin;
    }

    function editUserEmail(string memory email) public userExists {
        userDirectory[msg.sender].email = email;
    }

    function getUserDetails() public view userExists returns (User memory){
        return userDirectory[msg.sender];
    }

    function getUserOrganizationDetails() public view userExists returns (User memory, Organization memory) {
        return (userDirectory[msg.sender], organizationDirectory[userDirectory[msg.sender].organizationID]);
    }

    function getUserFromUserID(string memory userID) public view onlyOwner returns (User memory) {
        return userDirectoryFromID[userID];
    }

    function setOrganizationAdmin(string memory organizationID, string memory name, string memory geocode, string memory userID, string memory firstName, string memory lastName, string memory email, string memory phoneNumber, address publicKey) public onlyOwner{
        Organization memory newOrganization = Organization ({
            organizationID: organizationID,
            name: name,
            geocode: geocode
        });
        User memory newUser = User ({
            userAddress : publicKey,
            userID: userID,
            organizationID: organizationID,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            role: roles.admin
        });

        userDirectory[publicKey] = newUser;
        userDirectoryFromID[userID] = newUser;
        users.push(newUser);
        organizationDirectory[organizationID] = newOrganization;
        organizations.push(newOrganization);
        partners["All"].push(newOrganization);

    }


    function setOrganizationType(string memory organizationID, string memory orgType) public userExists {
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
        project.projectStatus = status.active;
        project.startTime= now;
        projectRegistry[projectID] = project;
        myProjects[msg.sender].push(project);
        consortium[projectID].push(userDirectory[msg.sender]);
        projectRoles[projectID][msg.sender] = partnerRole;
    }

    function closeProject(string memory projectID) public userExists {
        Project storage project = projectRegistry[projectID];
        require(projectRoles[projectID][msg.sender]==partnerRoles(0));
        project.endTime=now;
        project.projectStatus = status.inactive;
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

    function addUserToProject(string memory projectID, string memory userID, partnerRoles partnerRole) public {
        User storage user = userDirectoryFromID[userID];
        consortium[projectID].push(user);
        myProjects[user.userAddress].push(projectRegistry[projectID]);
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

    function isValidUser() public view returns (bool) {
        return (userDirectory[msg.sender].userAddress != 0x0000000000000000000000000000000000000000);
    }
}
