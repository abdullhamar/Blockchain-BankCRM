module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",   // localhost
      port: 7545,          // منفذ Ganache GUI 2.7.1 الافتراضي
      network_id: "*"      // أي شبكة
    }
  },

  // إعدادات Mocha (اختبارات)
  mocha: {
    // timeout: 100000
  },

  // إعدادات المترجم Solidity
  compilers: {
    solc: {
      version: "0.8.17",   // مطابق لعقد EmptyContract.sol
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        }
      }
    }
  }
};
