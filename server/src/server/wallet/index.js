const MyWallet = require('blockchain.info').MyWallet;
const bankGuid = '37ae8076-39b3-422c-9a85-8034974100d3';
const bankPassword = 'eZGKiJcb7FLIIPoIlJ1S';


class Wallet {
    constructor(guid, password) {
        let options = {
            apiCode: 'walletAPICode' + guid,
            apiHost: 'http://localhost:3005'
        };
        this.wallet = new MyWallet(guid, password, options);
        this.bankWallet = new MyWallet(bankGuid, bankPassword, options)
    }

    getBalance() {
        return this.wallet.getBalance();
    }

    withdraw(amount, success, error) {
        let wallet = this.wallet;

        this.bankWallet.listAccounts().then(function (response) {
            let bankAddress = response[0].receiveAddress;

            console.log(bankAddress);
            wallet.listAccounts().then(function (response) {
                let walletAddress = response[0].receiveAddress;
                console.log('Addresses[0] = %s', response[0].receiveAddress);

                wallet.send(bankAddress, amount, {from: walletAddress}).then(function (response) {
                    success(response.message);
                }).catch(function (data) {
                    error(data);
                })
            });
        });
    }

    payout(amount, playersCount) {
        let bankAddress = this.bankWallet.listAccounts()
            .then(function (response) {
                console.log('Bank Addresses[0] = %s', response[0].receiveAddress)
            })
        let walletAddress = this.wallet.listAccounts()
            .then(function (response) {
                console.log('Addresses[0] = %s', response[0].receiveAddress)
            })
        this.bankWallet.send(walletAddress, amount * playersCount, {from: bankAddress})
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
}

// let wallet = new Wallet('28e400a2-8a4d-4d62-b2c2-98fbf5765085', 'TQOnMnT5aqbG7SZ8tRxJ')
// let balance1 = wallet.getBalance().then(function (response) {
//     console.log(response.balance)
// })
//
// wallet.withdraw(100)
//
// let wallet2 = new Wallet(bankGuid, bankPassword)
// let balance2 = wallet2.getBalance()
// console.log(balance2)
// wallet2.payout(1000, 5)

module.exports = Wallet
