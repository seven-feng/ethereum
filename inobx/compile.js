// 编译智能合约的脚本

const path = require('path')
const fs = require('fs')
const solc = require('solc')


// 获取智能合约的绝对路径
const contract_path = path.resolve(__dirname, 'contracts', 'Inbox.sol')

// 读取合约内容
const contract_source = fs.readFileSync(contract_path, 'utf-8')


// 预先定义好编译源 json 对象
const josn_contract_source = JSON.stringify({
    language: 'Solidity',
    sources: {
        'Inbox.sol': { // 指明编译的文件名
            content: contract_source // solidity 源代码
        }
    },
    settings: { // 自定义编译输出的格式。以下选择输出全部结果
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
})

// 编译得到结果
let output =  JSON.parse(solc.compile(josn_contract_source))

module.exports = {
    abi: output.contracts['Inbox.sol']['Inbox'].abi,
    bytecode: output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object
}

// let inbox_json = {
//     'abi': {},
//     'bytecode': ''
// }

// for(let contract_name in output.contracts['Inbox.sol']) {
//     inbox_json.abi = output.contracts['Inbox.sol'][contract_name].abi
//     inbox_json.bytecode = output.contracts['Inbox.sol'][contract_name].evm.bytecode.object
// }

// module.exports = solc.compile(source, 1).contracts[':Inbox']
// const out = solc.compile(source, 1).contracts[':Inbox']

