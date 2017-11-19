var blockchain = require('blockchain.info')
var MyWallet = require('blockchain.info').MyWallet

const bankGuid = '37ae8076-39b3-422c-9a85-8034974100d3'
const bankPassword = 'eZGKiJcb7FLIIPoIlJ1S'
const bankOptions = 'BANK_OPTIONS'
const bankAddress = 'BANK_ADDRESS'

class Wallet {

    constructor(guid, password) {
        var options = { apiCode: 'walletAPICode' + guid, apiHost: 'http://localhost:3005' }
        this.wallet = new MyWallet(guid, password, options)
        this.bankWallet = new MyWallet(bankGuid, bankPassword, options)
    }

    getBalance() {
        return this.wallet.getBalance()
                   .then(function (response) { 
                        let balance = response.balance
                        return balance
                    })
                   .catch(function (error) { 
                       console.log(error)
                    })
    }

    withdraw(amount) {
        let bankAddress = ""
        this.bankWallet.listAccounts()
                        .then(function (response) { 
                            bankAddress = response[0].receiveAddress
                        })
        console.log(bankAddress)
        var walletAddress = this.wallet.listAccounts()
                                       .then(function (response) { 
                                           console.log('Addresses[0] = %s', response[0].receiveAddress)
                                        })
        this.wallet.send(bankAddress, amount, {from: walletAddress})
                   .then(function (response) { console.log(response.message)})
                   .catch(function (error) { console.log(error)})
    }

    payout(amount, playersCount) {
        var bankAddress = this.bankWallet.listAccounts()
                                         .then(function (response) { 
                                             console.log('Bank Addresses[0] = %s', response[0].receiveAddress)
                                            })
        var walletAddress = this.wallet.listAccounts()
                                       .then(function (response) { 
                                           console.log('Addresses[0] = %s', response[0].receiveAddress)
                                        })
        this.bankWallet.send(walletAddress, amount * playersCount, {from: bankAddress})
                       .then(function (response) { console.log(response)})
                       .catch(function (error) { console.log(error)})
    }
}

var wallet = new Wallet('28e400a2-8a4d-4d62-b2c2-98fbf5765085', 'TQOnMnT5aqbG7SZ8tRxJ')
let balance1 = wallet.getBalance().then(function (response) {console.log(response.balance)})

wallet.withdraw(100)

var wallet2 = new Wallet(bankGuid, bankPassword)
let balance2 = wallet2.getBalance()
console.log(balance2)
wallet2.payout(1000, 5)

module.exports = Wallet
