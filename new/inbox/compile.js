const path = require('path')
const fs = require('fs')
const solc = require('solc')

const srcpath = path.resolve(__dirname, 'contracts', 'Inbox.sol')

const source = fs.readFileSync(srcpath, 'utf-8')

const json_contract_source = JSON.stringify({
    language: 'Solidity',
    sources: {
        'Inbox.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
})

let output = JSON.parse(solc.compile(json_contract_source))

module.exports = {
    abi: output.contracts['Inbox.sol']['Inbox'].abi,
    bytecode: output.contracts['Inbox.sol']['Inbox'].evm.bytecode.object
}
