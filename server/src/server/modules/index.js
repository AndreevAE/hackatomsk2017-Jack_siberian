var blockchain = require('blockchain.info')

function Wallet (guid, password, options) {
    options = options || {}
    this.guid = guid
    this.password = password
    return this
}

Wallet.prototype.getBalance = function() {
    
}

Wallet.prototype.withdraw = function() {
    
}

Wallet.prototype.payout = function() {
    
}

module.exports = Wallet
