module.exports = {
  map: false,
  plugins: [
    require("autoprefixer")(),
    require("postcss-csso")({
      restructure: false
    }),
    require("postcss-sprites")({
      spritePath: "./examples/sprite"
    })
  ]
}
