const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "/"),
      "@app": path.resolve(__dirname, "src/"),
      "@ds": path.resolve(__dirname, "ds/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@components": path.resolve(__dirname, "src/components/"),
    }
  }
}
