var blockchain = require('blockchain.info')
var MyWallet = require('blockchain.info').MyWallet

const bankGuid = '37ae8076-39b3-422c-9a85-8034974100d3'
const bankPassword = 'eZGKiJcb7FLIIPoIlJ1S'
const bankOptions = 'BANK_OPTIONS'
const bankAddress = 'BANK_ADDRESS'

class Wallet {

    constructor(guid, password, options) {
        this.wallet = new MyWallet(guid, password, options)
        this.bankWallet = new MyWallet(bankGuid, bankPassword, options)
    }

    getBalance() {
        console.log('getBalance')
        this.wallet.getBalance().then(function (response) { console.log('My balance is %d!', response.balance); })
    }

    fullHD() {
        console.log('enable HD')
        this.wallet.enableHD()
    }

    getAccounts() {
        console.log('getAccounts')
        this.wallet.listAccounts().then(function (response) { console.log(response); })
    }

    withdraw(amount) {
        console.log('withdraw')
        var bankAddress = this.bankWallet.listAccounts().then(function (response) { console.log('Bank Addresses[0] = %s', response[0].receiveAddress)})
        var walletAddress = this.wallet.listAccounts().then(function (response) { console.log('Addresses[0] = %s', response[0].receiveAddress)})
        this.wallet.send(bankAddress, amount, {from: walletAddress})
                   .then(function (response) { console.log(response.message)})
                   .catch(function (error) { console.log(error)})
    }

    payout(amount, playersCount) {
        console.log('payout')
        var bankAddress = this.bankWallet.listAccounts().then(function (response) { console.log('Bank Addresses[0] = %s', response[0].receiveAddress)})
        var walletAddress = this.wallet.listAccounts().then(function (response) { console.log('Addresses[0] = %s', response[0].receiveAddress)})
        this.bankWallet.send(walletAddress, amount * playersCount, {from: bankAddress})
                       .then(function (response) { console.log(response)})
                       .catch(function (error) { console.log(error)})
    }
}

var options = { apiCode: 'myAPICode', apiHost: 'http://localhost:3000' }
var wallet = new Wallet('28e400a2-8a4d-4d62-b2c2-98fbf5765085', 'TQOnMnT5aqbG7SZ8tRxJ', options)
wallet.getBalance()
//wallet.getAccounts()
wallet.withdraw(100)

var wallet2 = new Wallet(bankGuid, bankPassword, options)
wallet2.getBalance()
//wallet2.getAccounts()
wallet2.payout(1000, 5)

module.exports = Wallet
