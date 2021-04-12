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
const app = require('express')()

app.get('/send/:address', async (req, res) => {
    console.log('开始转账')
    const address = req.params.address
    const data = Buffer.from('我是个小测试').toString('hex')
    const accounts = await web3.eth.getAccounts()
    const tx = await web3.eth.sendTransaction({
        from: accounts[0],
        to: address,
        value: 1000000000000000000,
        data: data
    })
    console.log('转账成功：' + tx)
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})