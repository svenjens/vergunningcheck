const merge = require("lodash/merge");
const base = require("./development");

const config = {
  cache: {
    // redis: false,
  },
  loaders: {
    datapunt: {
      // HOST: "https://...",
    },
  },
};

module.exports = merge(base, config);
