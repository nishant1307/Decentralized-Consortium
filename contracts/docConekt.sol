pragma solidity ^0.5.11;
pragma experimental ABIEncoderV2;
import "./EternalStorage.sol";
import "./Consortium.sol";
import './StorageDefinition.sol';

library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        uint256 c = a - b;
 
        return c;
    }

    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, "SafeMath: division by zero");
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b != 0, "SafeMath: modulo by zero");
        return a % b;
    }
}
library Counters {
    using SafeMath for uint256;

    struct Counter {
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        counter._value += 1;
    }

    function decrement(Counter storage counter) internal {
        counter._value = counter._value.sub(1);
    }
}
library Roles {
    struct Role {
        mapping (address => bool) bearer;
    }

    /**
     * @dev Give an account access to this role.
     */
    function add(Role storage role, address account) internal {
        require(!has(role, account), "Roles: account already has role");
        role.bearer[account] = true;
    }

    /**
     * @dev Remove an account's access to this role.
     */
    function remove(Role storage role, address account) internal {
        require(has(role, account), "Roles: account does not have role");
        role.bearer[account] = false;
    }

    /**
     * @dev Check if an account has this role.
     * @return bool
     */
    function has(Role storage role, address account) internal view returns (bool) {
        require(account != address(0), "Roles: account is the zero address");
        return role.bearer[account];
    }
}


library Address {
    /**
     * @dev Converts an `address` into `address payable`. Note that this is
     * simply a type cast: the actual underlying value is not changed.
     */
    function toPayable(address account) internal pure returns (address payable) {
        return address(uint160(account));
    }
}
contract Ownable {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor () internal {
        _owner = msg.sender;
        emit OwnershipTransferred(address(0), _owner);
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(isOwner(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Returns true if the caller is the current owner.
     */
    function isOwner() public view returns (bool) {
        return msg.sender == _owner;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public onlyOwner {
        emit OwnershipTransferred(_owner, address(0));
        _owner = address(0);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public onlyOwner {
        _transferOwnership(newOwner);
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     */
    function _transferOwnership(address newOwner) internal {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        emit OwnershipTransferred(_owner, newOwner);
        _owner = newOwner;
    }
}

contract ERC721 {
    using SafeMath for uint256;
    using Address for address;
    using Counters for Counters.Counter;
    
    event ReviewersAdded(bytes32 indexed _tokenId,bytes32 indexed _projectId, address indexed _address);
    event ReviewAdded(bytes32 indexed _tokenId, address indexed _reviewer);

    EternalStorage s;
    Consortium registerContract;
    // Equals to `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
    // which can be also obtained as `IERC721Receiver(0).onERC721Received.selector`
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;
    
    enum reviewStatus {notInitiated, pending ,approved, rejected}

    // Mapping from token ID to owner
    mapping (bytes32 => address) private _tokenOwner;
    
    //mapping from token id to other parties
    mapping (bytes32 => address[]) private _reviewer;
    
    //mapping from token id to other parties
    mapping (bytes32 => mapping (address => reviewStatus)) private _reviewerStatus;


    //Mapping from owner to number of owned token
    mapping (address => Counters.Counter) private _ownedTokensCount;
    
    
     constructor (address storageAddress) public {
        s = EternalStorage(storageAddress);
        // registerContract = Consortium(s.getRegisteredContractAddress("Consortium"));
    }

    modifier onlyRegistrant() {
        require(s.getUserDetails().role == StorageDefinition.roles.admin || s.getUserDetails().role == StorageDefinition.roles.registrant);
        _;
    }
    
    
    function addReview(bytes32 tokenId, uint256 status) public{
         for (uint i=0; i< _reviewer[tokenId].length; i++){
            if(_reviewer[tokenId][i] == msg.sender){
                _reviewerStatus[tokenId][msg.sender] = reviewStatus(status);
            }
         }
         emit ReviewAdded(tokenId, msg.sender );
    }
    
    function getReviewStatusForIndividual(bytes32 tokenId) public view returns(reviewStatus){
        return _reviewerStatus[tokenId][msg.sender];
    }
    
    function getReviewStatus(bytes32 tokenId)public view returns(bool){
        // address[] storage approvedReviwer;
        // address[] storage notApprovedReviwer;
          for (uint i=0; i< _reviewer[tokenId].length; i++){
            if(_reviewerStatus[tokenId][_reviewer[tokenId][i]] != reviewStatus.approved ){
                // approvedReviwer.push(_reviewer[tokenId][i]);
                return false;
            }
            // else {
                //  notApprovedReviwer.push(_reviewer[tokenId][i]);
                // return true;
            // }
         }
         return true;
    }


    /**
     * @dev Gets the balance of the specified address.
     * @param owner address to query the balance of
     * @return uint256 representing the amount owned by the passed address
     */
    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");

        return _ownedTokensCount[owner].current();
    }
    
    function addReviewers(bytes32  tokenId, address reviewer) public returns(bool){
        require(ownerOf(tokenId) == msg.sender, "Roles: account does not have access");
        _reviewer[tokenId].push(reviewer);
        _reviewerStatus[tokenId][reviewer] = reviewStatus.pending;
    }
    
    function getReviewersList(bytes32  tokenId) public view returns(address[] memory reviewer){
      return _reviewer[tokenId];
    }

    /**
     * @dev Gets the owner of the specified token ID.
     * @param tokenId uint256 ID of the token to query the owner of
     * @return address currently marked as the owner of the given token ID
     */
    function ownerOf(bytes32  tokenId) public view returns (address) {
        address owner = _tokenOwner[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");

        return owner;
    }

    /**
     * @dev Returns whether the specified token exists.
     * @param tokenId uint256 ID of the token to query the existence of
     * @return bool whether the token exists
     */
    function _exists(bytes32 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    /**
     * @dev Internal function to mint a new token.
     * Reverts if the given token ID already exists.
     * @param to The address that will own the minted token
     * @param tokenId uint256 ID of the token to be minted
     */
    function _mint(address to, bytes32 tokenId) internal {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to].increment();

        // emit Transfer(address(0), to, tokenId);
    }

    /**
     * @dev Internal function to burn a specific token.
     * Reverts if the token does not exist.
     * Deprecated, use {_burn} instead.
     * @param owner owner of the token to burn
     * @param tokenId uint256 ID of the token being burned
     */
    function _burn(address owner, bytes32 tokenId) internal {
        require(ownerOf(tokenId) == owner, "ERC721: burn of token that is not own");
        _ownedTokensCount[owner].decrement();
        _tokenOwner[tokenId] = address(0);

        // emit Transfer(owner, address(0), tokenId);
    }

    /**
     * @dev Internal function to burn a specific token.
     * Reverts if the token does not exist.
     * @param tokenId uint256 ID of the token being burned
     */
    function _burn(bytes32 tokenId) internal {
        _burn(ownerOf(tokenId), tokenId);
    }

}

/**
 * @title ERC721Mintable
 * @dev ERC721 minting logic.
 */
contract ERC721Mintable is ERC721 {
    /**
     * @dev Function to mint tokens.
     * @param to The address that will receive the minted tokens.
     * @param tokenId The token id to mint.
     * @return A boolean that indicates if the operation was successful.
     */
    function mint(address to, bytes32 tokenId) internal returns (bool) {
        _mint(to, tokenId);
        return true;
    }
}
contract ERC721Metadata is  ERC721 {
    
      struct docDetails {
        string encryptedData;
        string encryptedPassword;
        bytes32 projectId;
        uint256 timeStamp;
    }
    
    event DetailsUpdated(bytes32 tokenId, uint256 indexed timeStamp, string indexed remark );
    
    // Optional mapping for token URIs
    mapping(bytes32  => string) private _tokenURIs;
    
      // mapping for token deviceDetails
    mapping(bytes32 => docDetails) private _tokenDetails;

    /*
     *     bytes4(keccak256('name()')) == 0x06fdde03
     *     bytes4(keccak256('symbol()')) == 0x95d89b41
     *     bytes4(keccak256('tokenURI(uint256)')) == 0xc87b56dd
     *
     *     => 0x06fdde03 ^ 0x95d89b41 ^ 0xc87b56dd == 0x5b5e139f
     */
    bytes4 private constant _INTERFACE_ID_ERC721_METADATA = 0x5b5e139f;

    /**
     * @dev Returns an URI for a given token ID.
     * Throws if the token ID does not exist. May return an empty string.
     * @param tokenId uint256 ID of the token to query
     */
    function tokenURI(bytes32 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _tokenURIs[tokenId];
    }
    
     function getDocumentDetails(bytes32 tokenId) external view returns (docDetails memory,string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return (_tokenDetails[tokenId],_tokenURIs[tokenId]);
    }

    /**
     * @dev Internal function to set the token URI for a given token.
     * Reverts if the token ID does not exist.
     * @param tokenId uint256 ID of the token to set its URI
     * @param uri string URI to assign
     */
    function _setTokenURI(bytes32 tokenId, string memory uri) internal {
        require(_exists(tokenId), "ERC721Metadata: URI set of nonexistent token");
        _tokenURIs[tokenId] = uri;
    }
    
      function _setProjectId (bytes32 tokenId, bytes32 projectId) internal{
        require(_tokenDetails[tokenId].projectId == 0x0, "Project Id reassign denied!");
        docDetails memory temp = _tokenDetails[tokenId];
        temp.projectId = projectId;
         _tokenDetails[tokenId] = temp;
    }
    
    
    function _setDocumentDetails(bytes32 tokenId,string memory encryptedData, string memory encryptedPassword ) internal {
      docDetails memory temp;
      temp.encryptedData = encryptedData;
      temp.encryptedPassword = encryptedPassword;
      temp.timeStamp = block.timestamp;
      _tokenDetails[tokenId] = temp;
    }
    
    function _updateDocumentDetails(bytes32 tokenId,string memory remark, string memory encryptedData) internal {
        _tokenDetails[tokenId].encryptedData = encryptedData;
        emit DetailsUpdated(tokenId, block.timestamp, remark);
    }

    /**
     * @dev Internal function to burn a specific token.
     * Reverts if the token does not exist.
     * Deprecated, use _burn(uint256) instead.
     * @param owner owner of the token to burn
     * @param tokenId uint256 ID of the token being burned by the msg.sender
     */
    function _burn(address owner, bytes32 tokenId) internal {
        super._burn(owner, tokenId);

        // Clear metadata (if any)
        if (bytes(_tokenURIs[tokenId]).length != 0) {
            delete _tokenURIs[tokenId];
        }
    }
    
     function addReviewers(bytes32 tokenId, address reviewer) public returns(bool){
        require(ownerOf(tokenId) == msg.sender, "Roles: account does not have access");
        super.addReviewers(tokenId,reviewer);
        emit ReviewersAdded(tokenId,_tokenDetails[tokenId].projectId ,reviewer);
    } 

}

// contract ERC721MetadataMintable is ERC721, ERC721Metadata {
//     /**
//      * @dev Function to mint tokens.
//      * @param to The address that will receive the minted tokens.
//      * @param tokenId The token id to mint.
//      * @param tokenURI The token URI of the minted token.
//      * @return A boolean that indicates if the operation was successful.
//      */
//     function mintWithTokenURI(address to, string memory tokenId, string memory tokenURI) public returns (bool) {
//         _mint(to, tokenId);
//         _setTokenURI(tokenId, tokenURI);
//         return true;
//     }
// }
contract ERC721Enumerable is ERC721 , ERC721Metadata {
    // Mapping from owner to list of owned token IDs
    mapping(address => bytes32[]) private _ownedTokens;

    // Mapping from token ID to index of the owner tokens list
    mapping(bytes32 => uint256) private _ownedTokensIndex;

    // Array with all token ids, used for enumeration
    bytes32[] private _allTokens;

    // Mapping from token id to position in the allTokens array
    mapping(bytes32 => uint256) private _allTokensIndex;
    
        // Mapping from project to list of owned token IDs
    mapping(bytes32 => bytes32[]) private _ownedTokensByProject;

    // Mapping from token ID to index of the project tokens list
    mapping(bytes32 => uint256) private _ownedTokensByProjectIndex;

    /**
     * @dev Internal function to mint a new token.
     * Reverts if the given token ID already exists.
     * @param to address the beneficiary that will own the minted token
     * @param tokenId uint256 ID of the token to be minted
     */
    function _mint(address to, bytes32 tokenId) internal {
        super._mint(to, tokenId);

        _addTokenToOwnerEnumeration(to, tokenId);

        _addTokenToAllTokensEnumeration(tokenId);
    }

    /**
     * @dev Internal function to burn a specific token.
     * Reverts if the token does not exist.
     * Deprecated, use {ERC721-_burn} instead.
     * @param owner owner of the token to burn
     * @param tokenId uint256 ID of the token being burned
     */
    function _burn(address owner, bytes32 tokenId) internal {
        super._burn(owner, tokenId);

        _removeTokenFromOwnerEnumeration(owner, tokenId);
        // Since tokenId will be deleted, we can clear its slot in _ownedTokensIndex to trigger a gas refund
        _ownedTokensIndex[tokenId] = 0;

        _removeTokenFromAllTokensEnumeration(tokenId);
    }

    /**
     * @dev Gets the list of token IDs of the requested owner.
     * @param owner address owning the tokens
     * @return uint256[] List of token IDs owned by the requested address
     */
    function _tokensOfOwner(address owner) public view returns (bytes32[] memory) {
        return _ownedTokens[owner];
    }
    
     function _tokensOfProject(bytes32 projectId) public view returns (bytes32[] memory) {
        return _ownedTokensByProject[projectId];
    }
    
     function _setProjectId (bytes32 tokenId, bytes32 projectId) internal{
        super._setProjectId(tokenId,projectId);
       _addTokenToProjectEnumeration(projectId, tokenId);
    }
    
     function _addTokenToProjectEnumeration(bytes32 projectId , bytes32 tokenId) private {
        _ownedTokensIndex[tokenId] = _ownedTokensByProject[projectId].length;
        _ownedTokensByProject[projectId].push(tokenId);
    }
    
    /**
     * @dev Private function to add a token to this extension's ownership-tracking data structures.
     * @param to address representing the new owner of the given token ID
     * @param tokenId uint256 ID of the token to be added to the tokens list of the given address
     */
    function _addTokenToOwnerEnumeration(address to, bytes32 tokenId) private {
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);
    }

    /**
     * @dev Private function to add a token to this extension's token tracking data structures.
     * @param tokenId uint256 ID of the token to be added to the tokens list
     */
    function _addTokenToAllTokensEnumeration(bytes32 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    /**
     * @dev Private function to remove a token from this extension's ownership-tracking data structures. Note that
     * while the token is not assigned a new owner, the `_ownedTokensIndex` mapping is _not_ updated: this allows for
     * gas optimizations e.g. when performing a transfer operation (avoiding double writes).
     * This has O(1) time complexity, but alters the order of the _ownedTokens array.
     * @param from address representing the previous owner of the given token ID
     * @param tokenId uint256 ID of the token to be removed from the tokens list of the given address
     */
    function _removeTokenFromOwnerEnumeration(address from, bytes32 tokenId) private {
        // To prevent a gap in from's tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = _ownedTokens[from].length.sub(1);
        uint256 tokenIndex = _ownedTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary
        if (tokenIndex != lastTokenIndex) {
           bytes32 lastTokenId = _ownedTokens[from][lastTokenIndex];

            _ownedTokens[from][tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
            _ownedTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index
        }

        // This also deletes the contents at the last position of the array
        _ownedTokens[from].length--;

        // Note that _ownedTokensIndex[tokenId] hasn't been cleared: it still points to the old slot (now occupied by
        // lastTokenId, or just over the end of the array if the token was the last one).
    }

    /**
     * @dev Private function to remove a token from this extension's token tracking data structures.
     * This has O(1) time complexity, but alters the order of the _allTokens array.
     * @param tokenId uint256 ID of the token to be removed from the tokens list
     */
    function _removeTokenFromAllTokensEnumeration(bytes32 tokenId) private {
        // To prevent a gap in the tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = _allTokens.length.sub(1);
        uint256 tokenIndex = _allTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary. However, since this occurs so
        // rarely (when the last minted token is burnt) that we still do the swap here to avoid the gas cost of adding
        // an 'if' statement (like in _removeTokenFromOwnerEnumeration)
        bytes32 lastTokenId = _allTokens[lastTokenIndex];

        _allTokens[tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
        _allTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index

        // This also deletes the contents at the last position of the array
        _allTokens.length--;
        _allTokensIndex[tokenId] = 0;
    }
}


contract ERC721Burnable is ERC721 {
    /**
     * @dev Burns a specific ERC721 token.
     * @param tokenId uint256 id of the ERC721 token to be burned.
     */
    function burn(bytes32 tokenId) public {
        //solhint-disable-next-line max-line-length
        _burn(tokenId);
    }
}
contract DocContract is ERC721, ERC721Enumerable,ERC721Burnable,ERC721Mintable {
    constructor(address storageAddress) ERC721(storageAddress) public {
    }

    event MetadataChanged(bytes32 indexed tokenId , string indexed metadata);

    function setMetadata(bytes32 tokenId, string memory metadata ) public onlyRegistrant returns (bool) {
        require(ownerOf(tokenId) == msg.sender, "ERC721: can not set metadata of token that is not own");
        _setTokenURI(tokenId , metadata);
        emit MetadataChanged(tokenId,metadata);
        return true;
    }
    
     function setProjectId(bytes32 tokenId, bytes32 projectId ) public onlyRegistrant returns (bool) {
        registerContract = Consortium(s.getRegisteredContractAddress("Consortium"));
        require(ownerOf(tokenId) == msg.sender, "ERC721: can not set metadata of token that is not own");
        _setProjectId(tokenId , projectId);
        registerContract.addDocumentToProject(tokenId,projectId);
        return true;
    }
    
     function MintWithDetailsAndProjectId (address to, bytes32 tokenId,string memory encryptedData, string memory encryptedPassword,  bytes32 projectId) public onlyRegistrant returns (bool){
        _setDocumentDetails(tokenId, encryptedData, encryptedPassword);
        mint(to, tokenId); 
        registerContract = Consortium(s.getRegisteredContractAddress("Consortium"));
        require(ownerOf(tokenId) == msg.sender, "ERC721: can not set metadata of token that is not own");
        _setProjectId(tokenId , projectId);
        registerContract.addDocumentToProject(tokenId,projectId);
        return true;
    }
    
    function updateDetails(bytes32 tokenId,string memory encryptedData, string memory encryptedPassword ) public onlyRegistrant returns (bool) {
        require(ownerOf(tokenId) == msg.sender, "ERC721: can not set metadata of token that is not own");
        _updateDocumentDetails(tokenId, encryptedData, encryptedPassword);
        return true;
    }

    function MintWithDetails(address to, bytes32 tokenId,string memory encryptedData, string memory encryptedPassword ) public onlyRegistrant returns (bool) {
        _setDocumentDetails(tokenId, encryptedData, encryptedPassword);
         mint(to, tokenId);
        // registerContract.addDeviceToProject(tokenId, (projectId));
        return true;
    }
}