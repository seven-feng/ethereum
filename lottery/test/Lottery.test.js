const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {bytecode, abi} = require('../compile')

// user story 用户案例

let accounts
let contract

beforeEach(async () => {
    accounts = await web3.eth.getAccounts()
    contract = await new web3.eth.Contract(abi)
        .deploy({
            data: bytecode
        })
        .send({
            from: accounts[0],
            gas: 1000000
        })
})

describe('测试区块链彩票智能合约', () => {
    it('测试智能合约的编译和部署', async () => {
        assert.ok(contract.options.address)
    })

    it('测试彩票智能合约的投注方法，正确案例', async () => {
        const b1 = await contract.methods.getBalance().call()
        await contract.methods.enter().send({
            from: accounts[1],
            value: '1000000000000000000'
        })
        const b2 = await contract.methods.getBalance().call()
        assert.equal(b2-b1, '1000000000000000000')
    })

    it('测试彩票智能合约的投注方法，失败案例', async () => {
        let success
        try {
            await contract.methods.enter().send({
                from: accounts[1],
                value: '100000000000000000'
            })
            success = true
        } catch (error) {
            success = false
        }
        assert.equal(success, false)
    })

    it('测试彩票开奖', async () => {
        await contract.methods.enter().send({
            from: accounts[1],
            value: '1000000000000000000'
        })
        await contract.methods.enter().send({
            from: accounts[2],
            value: '1000000000000000000'
        })
        const winner = await contract.methods.pickWinner().send({
            from: accounts[0]
        })
        assert.ok(winner)
    })

    it('返还投注金额', async () => {
        await contract.methods.enter().send({
            from: accounts[1],
            value: '1000000000000000000'
        })
        await contract.methods.enter().send({
            from: accounts[2],
            value: '1000000000000000000'
        })
       await contract.methods.refund().send({
            from: accounts[0]
        })
        const balance = await contract.methods.getBalance().call({
            from: accounts[1]
        })
        console.log(balance)
    })
})
