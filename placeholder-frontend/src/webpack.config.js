module.exports = {
    module: {
      rules: [
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack', 'url-loader'],
        },
      ],
    },
    resolve: {
      fallback: { 
        "util": require.resolve("util/"),
      },
    }
  }