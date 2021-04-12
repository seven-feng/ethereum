pragma solidity ^0.5.0;

contract Lottery {
    address public manager;
    address payable[] public players; 

    constructor() public {
         manager = msg.sender;
    }

    function getManager() public view returns(address) {
        return manager;
    }
    // 投注彩票
    function enter() public payable {
        require(msg.value == 1 ether);
        players.push(msg.sender);
    }

    function getAllPlayers() public view returns (address payable[] memory) {
        return players;
    }
    
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
    
    function getPlayerCount() public view returns(uint) {
        return players.length;
    }
    
    function random() private  view returns(uint) {
        return uint(keccak256(abi.encode(block.difficulty, block.timestamp, players)));
    }
    
    function pickWinner() public onlyManagerCanCall {
        
        uint index = random() % getPlayerCount();
        address payable winner = players[index];
        winner.transfer(address(this).balance);
        players = new address payable[]( 0);
    }
    
    function refund() public onlyManagerCanCall {
        for(uint i = 0; i < getPlayerCount(); i++) {
            players[i].transfer(1 ether);
        }
        players = new address payable[]( 0);
    }
    
    modifier onlyManagerCanCall() {
        require(msg.sender == manager);
        _;
    }
}