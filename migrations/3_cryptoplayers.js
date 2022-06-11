var CryptoPlayers = artifacts.require("./CryptoPlayers.sol");

module.exports = function(deployer) {
  deployer.deploy(CryptoPlayers);
};
