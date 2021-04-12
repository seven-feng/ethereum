// 智能合约部署到真实网络
const { abi, bytecode } = require('./compile')
const HDWalletProvider = require("@truffle/hdwallet-provider")
const Web3 = require("web3");
const mnemonicPhrase = "rich bird stadium post biology scale bullet accuse street type pair pond" // 12 word mnemonic
let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase
  },
  providerOrUrl: "https://rinkeby.infura.io/v3/43e69a6c9bf4487c8a47ecde44de8c1f"
})
const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()
  const res = await new web3.eth.Contract(abi).deploy({
    data: bytecode,
    arguments: ['abc']
  }).send({
    from: accounts[0],
    gas: 1000000
  })
  console.log('address:' + res.options.address)
}

deploy()