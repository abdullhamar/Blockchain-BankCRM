const BankCRM = artifacts.require("BankCRM");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(BankCRM);
};
