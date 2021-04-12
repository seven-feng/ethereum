const { abi, bytecode } = require('../compile')
const ganache = require('ganache-cli') // 本地测试网络
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())

describe('测试智能合约', () => {
    it('部署智能合约', async () => {
        const accounts = await web3.eth.getAccounts()
        const res = await new web3.eth.Contract(abi).deploy({
            data: bytecode,
            arguments: ['abc']
        }).send({
            from: accounts[0],
            gas: 1000000
        })
        console.log(res.options)
    })
})