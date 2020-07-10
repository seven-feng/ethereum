const Koa = require('koa')
const router = require('koa-router')()
const app = new Koa()

const Web3 = require('web3')
const mnemonic = "rich bird stadium post biology scale bullet accuse street type pair pond"; // 12 word mnemonic
const HDWalletProvider = require("@truffle/hdwallet-provider")
let provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/43e69a6c9bf4487c8a47ecde44de8c1f")
const web3 = new Web3(provider)

const deploy = async () => {
    const accounts = await web3.eth.getAccounts()
    console.log('account0: '+ await web3.eth.getBalance(accounts[0]))
    console.log('account1: '+ await web3.eth.getBalance(accounts[1]))

    const data = Buffer.from('i love you m')
    const content = data.toString('hex')
    // 转账操作
    const result = await web3.eth.sendTransaction({
        from: accounts[0],
        to: accounts[1],
        value: '100000000000000'
    })

    console.log(result)
    // console.log('account0: '+ await web3.eth.getBalance(accounts[0]))
    // console.log('account1: '+ await web3.eth.getBalance(accounts[1]))
}

deploy()



// router.get('/:addr', ctx => {
//     ctx.body = ctx.params.addr
// })

// app.use(router.routes())

// app.listen(3000)