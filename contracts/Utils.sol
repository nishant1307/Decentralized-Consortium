/* Library for common utils
*/
pragma solidity ^0.5.11;
library Utils {
    function compareStrings (string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
    }

}
