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

    listAdr() {
        console.log('list addresses')
        this.wallet.listAddresses().then(function (response) { console.log(response); })
    }

    withdraw(amount) {
        console.log('withdraw')
        var bankAddress = bankWallet.listAddresses().then(function (response) { console.log('Bank Addresses[0] = %s', response[0].address)})
        var walletAddress = wallet.listAddresses().then(function (response) { console.log('Addresses[0] = %s', response[0].address)})
        this.wallet.send(bankAddress, amount, {from: walletAddress})
    }

    payout(amount, playersCount) {
        console.log('payout')
        var bankAddress = bankWallet.listAddresses().then(function (response) { console.log('Bank Addresses[0] = %s', response[0].address)})
        var walletAddress = wallet.listAddresses().then(function (response) { console.log('Addresses[0] = %s', response[0].address)})
        this.bankWallet.send(walletAddress, amount * playersCount, {from: bankAddress})
    }
}

var options = { apiCode: 'myAPICode', apiHost: 'http://localhost:3000' }
var wallet = new Wallet('28e400a2-8a4d-4d62-b2c2-98fbf5765085', 'TQOnMnT5aqbG7SZ8tRxJ', options)
wallet.getBalance()
wallet.listAdr()

module.exports = Wallet
