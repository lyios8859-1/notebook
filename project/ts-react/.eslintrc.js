module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/eslint-recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    },
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint"
  ],
  "settings": { // 不配置包警告: React version not specified in eslint-plugin-react settings.
    "react": {
      "createClass": "createReactClass", // Regex for Component Factory to use, default to "createReactClass"
      "pragma": "React",  // Pragma to use, default to "React"
      // React version. "detect" automatically picks the version you have installed.
      /*
      You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      default to latest and warns if missing
      It will default to "detect" in the future
      */
      "version": "detect",
      "flowVersion": "0.53" // Flow version
    },
    "propWrapperFunctions": [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
      "forbidExtraProps",
      { "property": "freeze", "object": "Object" },
      { "property": "myFavoriteWrapper" }
    ],
    "linkComponents": [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      "Hyperlink",
      { "name": "Link", "linkAttribute": "to" }
    ]
  },
  "rules": {
    "no-var": "error",
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};