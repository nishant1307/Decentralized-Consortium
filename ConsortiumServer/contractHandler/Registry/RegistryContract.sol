pragma solidity ^0.5.7;
pragma experimental ABIEncoderV2;

contract RegistryContract {

    constructor() public {
        owner = msg.sender;

    }

     enum roles {admin,writer,reader}


    struct Organization {
        string organizationID;
        string name;
        string organizationDetails;
        address organizationAddress;
    }

    struct Project {
        string projectID;
        address contractAddress;
        string name;
        string description;
        string additionalDetails;
        string organizationID;
        string registrantID;
    }

    struct Registrant {
        string registrantID;
        string organizationID;
        string registrantDetails;
        roles role;
        address registrantAddress;
    }

    // List of all projects
    Project[] private projects;

    // List of all organization
    Organization[] private organizations;

    // mapping between organizationID and registrants
    mapping (string => Registrant[]) registrants;

    //mapping between organization ID and Organization Details
    mapping (string => Organization) private organizationRegistry;

    // mapping between organization ID and its Projects
    mapping (string => Project[]) private organizationProjectRegistry;

    // mapping between organization ID and its Registrants
    mapping (string => Registrant[]) private organizationRegistrantRegistry;

    // mapping between Project ID and project Details
    mapping (string => Project) private projectRegistry;

    // mapping between registrantID and registrant Details
    mapping (string => Registrant) private registrantRegistry;

    mapping(address => Registrant) private registrantDetail;

    address public owner;

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    modifier onlyOrgAdmin(string memory organizationID){
        require(registrantDetail[msg.sender].role == roles(0) );
        require(compareStrings(registrantDetail[msg.sender].organizationID,organizationID));
        _;
    }

        function compareStrings (string memory a, string memory b) public view
       returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
       }

    function addNewOrganization(string memory organizationID,address organizationAddress,string memory organizationDetails,string memory registrantID, address registrantAddress, string memory registrantDetails) public onlyOwner {
        Organization memory organization;
        organization.organizationID = organizationID;
        organization.organizationDetails = organizationDetails;
        organization.organizationAddress = organizationAddress;
        organizations.push(organization);
        organizationRegistry[organizationID] = organization;
        //add admin
        Registrant memory registrant;
        registrant.registrantID = registrantID;
        registrant.organizationID = organizationID;
        registrant.registrantDetails = registrantDetails;
        registrant.role = roles(0);
        registrant.registrantAddress = registrantAddress;
        registrantRegistry[registrantID] = registrant;
        registrantDetail[registrantAddress] = registrant;
        organizationRegistrantRegistry[organizationID].push(registrant);
    }

    function addNewRegistrant(string memory registrantID, string memory organizationID, string memory registrantDetails,int256 role, address registrantAddress) public onlyOrgAdmin(organizationID) {
        Registrant memory registrant;
        registrant.registrantID = registrantID;
        registrant.organizationID = organizationID;
        registrant.registrantDetails = registrantDetails;
        registrant.role = roles(role);
        registrant.registrantAddress = registrantAddress;
        registrantRegistry[registrantID] = registrant;
        registrantDetail[registrantAddress] = registrant;
        organizationRegistrantRegistry[organizationID].push(registrant);
    }

    function changeRegistrantRole(uint256 role, address registrantAddress ,string memory registrantID, string memory organizationID ) public onlyOrgAdmin(organizationID ){
    require(registrantAddress!= address(0) && role != 0);
     registrantDetail[registrantAddress].role = roles(role);
     registrantRegistry[registrantID].role = roles(role);
    }

    function transferOwnership(string memory newAdminID, address newAdminAddress, string memory newAdminDetails, string memory organizationID) public onlyOrgAdmin(organizationID){
        require(newAdminAddress!= address(0));
         Registrant memory registrant;
        registrant.registrantID = newAdminID;
        registrant.organizationID = organizationID;
        registrant.registrantDetails = newAdminDetails;
        registrant.role = roles(0);
        registrant.registrantAddress = newAdminAddress;
         registrantRegistry[newAdminID] = registrant;
        registrantDetail[newAdminAddress] = registrant;
        organizationRegistrantRegistry[organizationID].push(registrant);
        //to remove old admin
        registrantDetail[msg.sender].registrantID = '';
        registrantDetail[msg.sender].organizationID = '';
        registrantDetail[msg.sender].registrantDetails = '';
        registrantDetail[msg.sender].role = roles(2);

    }

    function addNewProject(string memory projectID, address contractAddress, string memory name, string memory description, string memory organizationID, string memory registrantID) public onlyOrgAdmin(organizationID) {
        Project memory project;
        project.projectID = projectID;
        project.contractAddress = contractAddress;
        project.name = name;
        project.description = description;
        project.organizationID = organizationID;
        project.registrantID = registrantID;
        projects.push(project);
        projectRegistry[name] = project;
        organizationProjectRegistry[organizationID].push(project);
    }

    function getAllProjects() public view returns (Project[] memory){
        return projects;
    }

    function getAllOrganizations() public view returns (Organization[] memory){
        return organizations;
    }

    function getProjectDetails(string memory projectID) public view returns (Project memory) {
        return (projectRegistry[projectID]);
    }

    function getOrganizationDetails(string memory organizationID) public view returns (Organization memory) {
        return (organizationRegistry[organizationID]);
    }

    function getRegistrantDetails(string memory registrantID) public view returns (Registrant memory) {
        return (registrantRegistry[registrantID]);
    }

}
