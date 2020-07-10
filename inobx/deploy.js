const HDWalletProvider = require("@truffle/hdwallet-provider")
const Web3 = require("web3")
const {bytecode, abi} = require('./compile')
const mnemonic = "rich bird stadium post biology scale bullet accuse street type pair pond"; // 12 word mnemonic
let provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/43e69a6c9bf4487c8a47ecde44de8c1f")
const web3 = new Web3(provider)

const deploy = async () => {
    try {
        const accounts = await web3.eth.getAccounts()
        const result = await new web3.eth.Contract(abi)
        .deploy({
            data: bytecode,
            arguments: ['abc']
        })
        .send({
            from: accounts[0],
            gas: '1000000'
        })
        console.log('address: ' + result.options.address)
    } catch(e) {
        console.log(e)
    }
}

deploy()