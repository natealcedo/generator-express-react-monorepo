const { mediaPath } = require("./config/utils")


module.exports = {
  "extends": [
    "airbnb",
    "plugin:prettier/recommended"
  ],
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "node": true
  },
 "settings": {
    "import/resolver": {
      "node": {
        "paths": [ mediaPath ]
      },
    }
 },
  "rules":{
    "import/first": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-unused-vars": "off",
    "react/jsx-filename-extension": "off",
    "prettier/prettier": "error",
    "import/extensions": "warn"
  }
}
