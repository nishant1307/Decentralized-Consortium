pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;
import "./StorageDefinition.sol";
import "./EternalStorage.sol";
contract Partners is StorageDefinition {

      EternalStorage s;
    address public owner;
    struct partnerInvitationDetail{
        bytes32 projectID;
        string partnerOrganizationID;
        string partnerRole;
    }
    
    event PartnerRequestAdded(bytes32, string, string, uint256);
    //projectID >> to roles >> to details
    mapping (bytes32 => mapping(string => partnerInvitationDetail)) partnerInvitationList;

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

    
    event CategoryLog(string organizationID ,string category ,string documentHash, bool status);
    
     //all categories
    CategoryDetail[] internal categoryDetails;
    CategoryDetail[] internal allCategoryDetails;

    
     // Mapping between userAddress and index
    mapping(string => uint256) categoryIndex;
    
    mapping(string => uint256) public orgCategoryIndex;
    
    mapping(string => uint256) public allCategoryIndex;

    // User Directory
    mapping(string => CategoryDetail) internal categoryDirectory;

    //mapping between org and categories
    mapping(string => CategoryDetail[]) internal orgCategories;
    
    mapping(address => bool) internal reviewers;
    
    function addCategory(string[] calldata _category, string[] calldata _documentHash) external onlyOrgAdmin   {
         for (uint i=0; i<_category.length; i++) {
        CategoryDetail memory newCategoryDetail;
        newCategoryDetail.organizationID = s.getUserDetails().organizationID;
        newCategoryDetail.category = _category[i];
        newCategoryDetail.documentHash = _documentHash[i] ;
        newCategoryDetail.status = false;
        categoryIndex[_category[i]] = categoryDetails.length;
        orgCategoryIndex[_category[i]] = orgCategories[s.getUserDetails().organizationID].length;
        categoryDirectory[_category[i]] = newCategoryDetail;
        categoryDetails.push(newCategoryDetail);
        orgCategories[s.getUserDetails().organizationID].push(newCategoryDetail);
        allCategoryIndex[_category[i]] = allCategoryDetails.length;
        allCategoryDetails.push(newCategoryDetail);
        }
    }
    
    function deleteCategory(string calldata _category) external onlyOrgAdmin {
        uint256 index = orgCategoryIndex[_category];
        require(index < orgCategories[s.getUserDetails().organizationID].length);
        if (orgCategories[s.getUserDetails().organizationID].length > 1) {
            orgCategories[s.getUserDetails().organizationID][index] = orgCategories[s.getUserDetails().organizationID][orgCategories[s.getUserDetails().organizationID].length-1];
        }
        delete allCategoryDetails[allCategoryIndex[_category]];
        delete orgCategories[s.getUserDetails().organizationID][orgCategories[s.getUserDetails().organizationID].length-1];
        orgCategories[s.getUserDetails().organizationID].length--; // Implicitly recovers gas from last element storage
        orgCategoryIndex[orgCategories[s.getUserDetails().organizationID][index].category] = index;
        delete index;
    }
    
    function updateCategory(string calldata _category, bool status, string calldata _organizationID) external  {
        require(reviewers[msg.sender] , "Invalid Reviewer");
        orgCategories[_organizationID][orgCategoryIndex[_category]].status = status;
        orgCategories[_organizationID][orgCategoryIndex[_category]].timeStamp = block.timestamp;
        allCategoryDetails[allCategoryIndex[_category]].status = status;
        allCategoryDetails[allCategoryIndex[_category]].timeStamp = block.timestamp;
    }
    
    function addReviewer(address _reviewer) public onlyOwner {
        reviewers[_reviewer] = true;
    }
    
    function removeReviewer(address _reviewer) public onlyOwner {
         reviewers[_reviewer] = false;
    }
    
    function getCategory () external view onlyOrgAdmin  returns(CategoryDetail[] memory)  {
        return orgCategories[s.getUserDetails().organizationID];
    }
    
    function getAllCategory () external view returns(CategoryDetail[] memory)  {
        require(reviewers[msg.sender] , "Invalid Reviewer");
        return allCategoryDetails;
    }
    
    function getPartnerRole(bytes32 projectID, address publicKey) external view returns (string memory) {
        return s.getPartnerRole(projectID, publicKey);
    }

    function getPartnerRole(bytes32 projectID) public view returns (string memory) {
        return s.getPartnerRole(projectID);
    }
    
    function invitedOrganizationForPartnership(string memory partnerOrganizationID, bytes32 projectID, string memory partnerRole) public onlyProjectAdmin(projectID){
        partnerInvitationList[projectID][partnerRole].projectID = projectID;
        partnerInvitationList[projectID][partnerRole].partnerOrganizationID = partnerOrganizationID;
        partnerInvitationList[projectID][partnerRole].partnerRole = partnerRole;
        emit PartnerRequestAdded(projectID, partnerRole, partnerOrganizationID, now);
    }
    
    
    function acceptPartnership(bytes32 projectID, string calldata partnerRole, address userAddress) external onlyOrgAdmin {
        string memory _organizationID = s.getOrganizationDetails().organizationID;
        require(keccak256(abi.encodePacked(_organizationID)) == keccak256(abi.encodePacked(partnerInvitationList[projectID][partnerRole].partnerOrganizationID)));
        require(!s.getBoolean(keccak256(abi.encodePacked("BelongsToProject", projectID, userAddress))));
        s.addUserToProject(projectID, userAddress, partnerRole);
        s.setBoolean(keccak256(abi.encodePacked("BelongsToProject", projectID, userAddress)), true);
        delete(_organizationID);
    }
    
    function closePartnership(bytes32 projectID, string calldata partnerRole, address userAddress) external {
        require((s.getUserDetails().role == roles.admin && keccak256(abi.encodePacked(s.getOrganizationDetails(msg.sender).organizationID))==keccak256(abi.encodePacked(partnerInvitationList[projectID][partnerRole].partnerOrganizationID))) || s.getProjectDetails(projectID).projectAdmin == msg.sender );
        s.removeUserToProject( projectID,  userAddress,  partnerRole);
        delete partnerInvitationList[projectID][partnerRole];
    }
}
