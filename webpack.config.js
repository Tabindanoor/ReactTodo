// webpack.config.js

module.exports = {
    // Other webpack configuration options
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify")
      }
    }
  };
  

  // webpack.config.js

// module.exports = {
//     // Other webpack configuration options
//     resolve: {
//       fallback: {
//         "util": require.resolve("util/")
//       }
//     }
//   };
  