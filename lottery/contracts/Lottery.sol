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
    function enter() public payable {
        require(msg.value == 1 ether);
        players.push(msg.sender);
    } 
    function getAllPlayers() public view  returns(address payable[] memory) {
        return players;
    }
    function getBalance() public view returns(uint) {
        return address(this).balance;
    }
    function getPlayersCount() public view returns(uint) {
        return players.length;
    }
    function random() private view returns(uint){
        return uint(sha256(abi.encode(block.difficulty, now, players)));
    }
    function pickWinner() public payable onlyManagerCanCall returns(address){
        uint index = random() % players.length;
        address payable winner = players[index];
        players = new address payable[](0);
        winner.transfer(address(this).balance);
        return winner;
    }
    function refund() public payable onlyManagerCanCall {
        for(uint i = 0; i < players.length; i++) {
            players[i].transfer(1 ether);
        }
    }
    modifier onlyManagerCanCall() {
        require(msg.sender == manager);
        _;
    }
}