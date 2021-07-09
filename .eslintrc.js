module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",

    "vue/script-indent": ["error", 2],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "never",
      },
    ],
    "vue/html-indent": [
      "error",
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: ["pre", "textarea", "span"],
      },
    ],

    // "vue/singleline-html-element-content-newline": [
    //   "error",
    //   {
    //     ignoreWhenNoAttributes: true,
    //     ignoreWhenEmpty: true,
    //     ignores: ["pre", "textarea", "span"],
    //   },
    // ],
  },
};
