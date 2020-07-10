import Web3 from 'web3'
const web3 = new Web3(window.web3.currentProvider)

if (window.ethereum) {
    let ethereum = window.ethereum
    window.web3 = new Web3(ethereum)
}
else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider)
}

export default web3

