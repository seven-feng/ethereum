const assert = require('assert')
const ganache = require('ganache-cli') // 本地测试区块链网络
const {bytecode, abi} = require('../compile')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())


describe('测试智能合约', () => {
    it('测试web3的版本', async () => {
        // console.log(web3.eth.getAccounts().then((accounts) => {
        //     console.log(accounts)
        // }))

        const accounts = await web3.eth.getAccounts()
        const balance = await web3.eth.getBalance(accounts[1])
        console.log(web3.utils.fromWei(balance, 'ether'))
    })
 
    it('部署智能合约', async () => {
        const accounts = await web3.eth.getAccounts()
        const result = await new web3.eth.Contract(abi)
            .deploy({
                data: bytecode,
                arguments: ['abc']
            })
            .send({
                from: accounts[0],
                gas: 1000000
            })
        
        console.log('address: ' + result.options.address)

        // console.log('methods: ' + result.methods.getMessage().call())

        await result.methods.setMessage('aaa').send({
            from: accounts[0],
            gas: 1000000
        })

        let message = await result.methods.getMessage().call()
        console.log(message)
        assert.equal(message, 'aaa')
    })
})
