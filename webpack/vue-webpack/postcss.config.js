const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    autoprefixer({
      browsers: [
        "defaults",
        "not ie < 9",
        "last 2 versions",
        "> 1%",
        "iOS 7",
        "last 3 iOS versions"
      ]
    })
  ]
};
