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

    enum roles {orgAdmin, registrant, reader}

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
        string city;
        string country;
        string zipcode;
    }

    struct Project {
        string projectID;
        string name;
        string description;
        string industry;
        string functionalRoles;
        status projectStatus;
    }

    struct Location {
        address registrant;
        uint128 latitude;
        uint128 longitude;
        string name;
    }

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

    // mapping between Project ID and its locations
    mapping (string => Location[]) private projectLocations;

    // mapping between ProjectId and Organizations
    mapping (string => Organization[]) private consortium;

    // mapping between OrganizationID and Projects
    mapping (string => Project[]) private myProjects;

    // mapping between orgType and Organization
    mapping (string => Organization[]) private partners;


    function setUser(string memory userID, string memory organizationID, string memory firstName, string memory lastName, string memory email, string memory phoneNumber, roles role) public {
        User memory newUser = User ({
            userAddress : msg.sender,
            userID: userID,
            organizationID: organizationID,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            role: role
        });

        userDirectory[msg.sender] = newUser;
        userDirectoryFromID[userID] = newUser;
        users.push(newUser);
    }

    function editUserEmail(string memory email) public {
        User storage oldUserDetails = userDirectory[msg.sender];
        oldUserDetails.email = email;
    }

    function getUserDetails() public view returns (User memory) {
        return userDirectory[msg.sender];
    }

    function getUserOrganizationDetails() public view returns (User memory, Organization memory) {
        return (userDirectory[msg.sender], organizationDirectory[userDirectory[msg.sender].organizationID]);
    }

    function getUserFromUserID(string memory userID) public view onlyOwner returns (User memory) {
        return userDirectoryFromID[userID];
    }

    function setOrganization(string memory organizationID, string memory name, string memory city, string memory country, string memory zipcode) public{
        Organization memory newOrganization = Organization ({
            organizationID: organizationID,
            name: name,
            city: city,
            country: country,
            zipcode: zipcode
        });
        organizationDirectory[organizationID] = newOrganization;
        organizations.push(newOrganization);
        partners["regular"].push(newOrganization);

    }

    function addProjectLocation(uint128 latitude, uint128 longitude, string memory name, string memory projectID) public {
        Location memory newLocation = Location ({
            registrant: msg.sender,
            latitude: latitude,
            longitude: longitude,
            name: name
        });
        projectLocations[projectID].push(newLocation);
    }

    function getProjectLocations(string memory projectID) public view returns(Location[] memory){
        return projectLocations[projectID];
    }

    function setOrganizationType(string memory organizationID, string memory orgType) public {
        partners[orgType].push(organizationDirectory[organizationID]);

    }

    function getOrganizationDetails(string memory organizationID) public view returns (Organization memory) {
        return organizationDirectory[organizationID];
    }

    function addNewProject(string memory projectID,  string memory name, string memory description, string memory industry, string memory functionalRoles) public {
        Project memory project;
        project.projectID = projectID;
        project.name = name;
        project.description = description;
        project.industry = industry;
        project.functionalRoles = functionalRoles;
        project.projectStatus = status.active;
        projectRegistry[projectID] = project;
        myProjects[userDirectory[msg.sender].organizationID].push(project);
        consortium[projectID].push(organizationDirectory[userDirectory[msg.sender].organizationID]);
    }

    function closeProject(string memory projectID) public {
        Project storage project = projectRegistry[projectID];
        project.projectStatus = status.inactive;
    }

    function getProjectDetails(string memory projectID) public view returns (Project memory) {
        return (projectRegistry[projectID]);
    }

    function getMyProjects() public view returns (Project[] memory) {
        return myProjects[userDirectory[msg.sender].organizationID];
    }

    function getMyProjectsCount() public view returns (uint) {
        return myProjects[userDirectory[msg.sender].organizationID].length;
    }

    function addOrganizationToProject(string memory projectID, string memory organizationID) public {
        Organization storage organization = organizationDirectory[organizationID];
        consortium[projectID].push(organization);
        myProjects[organizationID].push(projectRegistry[projectID]);
    }

    function getConsortiumOrganizations(string memory projectID) public view returns (Organization[] memory) {
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
}
