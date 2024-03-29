module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true,
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true,
    },
    "ecmaVersion": 13,
    "sourceType": "module",
  },
  "plugins": [
    "react",
    "@typescript-eslint",
  ],
  "rules": {
    "indent": [ "error", 2, { "ignoredNodes": [ "JSXIdentifier" ]}],
    "react/jsx-indent-props": [ "error", "first" ],
    "quotes": [ "error", "double" ],
    "semi": [ "error", "always" ],
    "comma-spacing": [ "error", { "before": false, "after": true }],
    "comma-dangle": [ "error", "always-multiline" ],
    "eol-last": [ "error", "always" ],
    "no-multiple-empty-lines": "error",
    "func-call-spacing": [ "error", "never" ],
    "no-multi-spaces": "error",
    "no-trailing-spaces": "error",
    "space-in-parens": [ "error", "never" ],
    "array-element-newline": [ "error", "consistent" ],
    "array-bracket-newline": [ "error", { "multiline": true }],
    "array-bracket-spacing": [ "error", "always", { "arraysInArrays": false, "objectsInArrays": false }],
    "object-curly-spacing": [ "error", "always", { "arraysInObjects": false, "objectsInObjects": false }],
    "implicit-arrow-linebreak": [ "error", "beside" ],
    "space-before-function-paren": [ "error", "always" ],
    "require-await": "error",
    "brace-style": "error",
    "space-infix-ops": [ "error", { "int32Hint": false }],
    "react/jsx-closing-tag-location": "error",
    "react/jsx-equals-spacing": [ "error", "never" ],
    "@typescript-eslint/no-var-requires": 0,
  },
};
