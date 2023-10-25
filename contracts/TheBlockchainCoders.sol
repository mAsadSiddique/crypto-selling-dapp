// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

contract  TheBlockchainCoders {
    string public name="The blockchain Coders";
    string public symbol="TBC";
    string public standard="@theBlockchainCoders v.0.1";
    uint256 public totalSupply;
    address public ownerOfContract;
    uint256 public _userId;

    address[] public holderToken;
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint _value
    );

    mapping (address => TokenHolderInfo) public tokenHoldersInfos;

    struct TokenHolderInfo {
        uint256 _tokenId;
        address _from;
        address _to;
        uint256 _totalToken; 
        bool _tokenHolder; 
    }


    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;


    constructor(uint256 _initialSupply) {
        ownerOfContract = msg.sender;
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    // Helper Function...
    function increment() internal {
        _userId++;
    }

    // transfer function...
    function transfer(address _to, uint256 _value) public  returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        increment();
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;

        TokenHolderInfo storage tokenHolderInfo = tokenHoldersInfos[_to];
        tokenHolderInfo._to = _to;
        tokenHolderInfo._tokenHolder = true;
        tokenHolderInfo._totalToken = _value;
        tokenHolderInfo._tokenId = _userId;
        holderToken.push(_to);

        emit Transfer(msg.sender, _to, _value);

        return true;
    }


    // transfer from...
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
            require(_value <= balanceOf[_from]);
            require(_value <= allowance[_from][msg.sender]);

            balanceOf[_from] -= _value;
            balanceOf[_to] += _value;

            allowance[_from][msg.sender] -= _value;

            emit Transfer(_from, _to, _value);

            return true;
    }

    // get token holder data...
    function getTokenHolderData(address _address) public view
     returns (uint256,address, address, uint256, bool) {
        return (
            tokenHoldersInfos[_address]._tokenId,
            tokenHoldersInfos[_address]._to,
            tokenHoldersInfos[_address]._from,
            tokenHoldersInfos[_address]._totalToken,
            tokenHoldersInfos[_address]._tokenHolder
        );
    }

    // token holder array...
    function getTokenHolder () public view returns (address[] memory) {
        return holderToken;
    }
}