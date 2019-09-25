pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;
import "./StorageDefinition.sol";
import "./EternalStorage.sol";
contract Partners is StorageDefinition {

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

    
    event CategoryLog(string organizationID ,string category ,string documentHash, bool status);
    
     //all categories
    CategoryDetail[] internal categoryDetails;
    
     // Mapping between userAddress and index
    mapping(string => uint256) categoryIndex;
    
    mapping(string => uint256) public orgCategoryIndex;

    // User Directory
    mapping(string => CategoryDetail) internal categoryDirectory;

    //mapping between org and categories
    mapping(string => CategoryDetail[]) internal orgCategories;
    
    mapping(address => bool) internal reviewers;
    
    function addCategory(string[] calldata _category, string[] calldata _documentHash) external onlyOrgAdmin   {
         for (uint i=0; i<_category.length; i++) {
        CategoryDetail memory newCategoryDetail;
        newCategoryDetail.category = _category[i];
        newCategoryDetail.documentHash = _documentHash[i] ;
        newCategoryDetail.status = false;
        categoryIndex[_category[i]] = categoryDetails.length;
        orgCategoryIndex[_category[i]] = orgCategories[s.getUserDetails().organizationID].length;
        categoryDirectory[_category[i]] = newCategoryDetail;
        categoryDetails.push(newCategoryDetail);
        orgCategories[s.getUserDetails().organizationID].push(newCategoryDetail);
        }
    }
    
    function deleteCategory(string calldata _category) external onlyOrgAdmin {
        uint256 index = orgCategoryIndex[_category];
        require(index < orgCategories[s.getUserDetails().organizationID].length);
        if (orgCategories[s.getUserDetails().organizationID].length > 1) {
            orgCategories[s.getUserDetails().organizationID][index] = orgCategories[s.getUserDetails().organizationID][orgCategories[s.getUserDetails().organizationID].length-1];
        }
        delete orgCategories[s.getUserDetails().organizationID][orgCategories[s.getUserDetails().organizationID].length-1];
        orgCategories[s.getUserDetails().organizationID].length--; // Implicitly recovers gas from last element storage
        orgCategoryIndex[orgCategories[s.getUserDetails().organizationID][index].category] = index;
        delete index;
    }
    
    function updateCategory(string calldata _category, bool status, string calldata _organizationID) external  {
        require(reviewers[msg.sender] , "Invalid Reviewer");
        orgCategories[_organizationID][orgCategoryIndex[_category]].status = status;
        orgCategories[_organizationID][orgCategoryIndex[_category]].timeStamp = block.timestamp;
       
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

}
