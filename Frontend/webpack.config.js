const path = require("path");

module.exports = {
    resolve: {
      fallback: {
        "fs": false,
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "net": false,
        "tls": false
      }
    }
  };
  

  