/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a 
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() { 
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>') 
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */

require("dotenv").config();
require("babel-register")({
  ignore: /node_modules/,
});
require("babel-polyfill");

var HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = process.env.MNEMONIC;

module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*",
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/8870b78fa02d47eaa77ccfc9ec84ab01")
      },
      network_id: "3",
      gas: 4500000,
      gasPrice: 100,
    },
  },
};
