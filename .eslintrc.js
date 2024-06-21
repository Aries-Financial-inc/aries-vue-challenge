module.exports = {
  "root": true,
  "env": {
    browser: true,
    "node": true,
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended",
  ],
  "parserOptions": {
    ecmaVersion: 2020,
    "parser": "@babel/eslint-parser",
  },
  "rules": {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-duplicate-imports": "error",
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    camelcase: [
      "warn",
      {
        properties: "always",
        ignoreDestructuring: true,
        ignoreImports: false,
        ignoreGlobals: false,
      },
    ],
    eqeqeq: ["error", "always"],
    "max-params": ["error", 3],
    "no-var": "error",
    "space-before-function-paren": ["error", "never"],
    "space-before-blocks": ["error", "always"],
    "space-in-parens": ["error", "never"],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        prev: ["const", "let", "var"],
        next: "*",
      },
      {
        blankLine: "any",
        prev: ["const", "let", "var"],
        next: ["const", "let", "var"],
      },
      {
        blankLine: "always",
        prev: "import",
        next: "export",
      },
      {
        blankLine: "always",
        prev: "*",
        next: ["throw", "return", "function", "debugger"],
      },
      {
        blankLine: "always",
        prev: "debugger",
        next: "*",
      },
      {
        blankLine: "always",
        prev: "*",
        next: "multiline-block-like",
      },
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      },
    ],
    "default-param-last": ["error"],
    "key-spacing": [
      "error",
      {
        beforeColon: false,
        afterColon: true,
        mode: "strict",
      },
    ],
    "keyword-spacing": [
      "error",
      {
        before: true,
        after: true,
      },
    ],
    "operator-linebreak": [
      "error",
      "after",
      {
        "overrides": {
          "?": "before",
          ":": "before",
          "&&": "before",
          "||": "before",
        },
      },
    ],
    "space-unary-ops": [
      "error",
      {
        "words": true,
        "nonwords": false,
      },
    ],
    "space-infix-ops": "error",
    "no-extra-boolean-cast": [
      "off",
    ],
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: [],
      },
    ],
    "vue/no-async-in-computed-properties": "error",
    "vue/no-arrow-functions-in-watch": "off",
    "vue/no-child-content": [
      "off",
    ],
    "vue/no-mutating-props": [
      "error",
    ],
    "vue/no-unused-components": "error",
    "vue/no-unused-vars": "off",
    "vue/no-use-v-if-with-v-for": "error",
    "vue/no-v-text-v-html-on-component": "warn",
    "vue/require-v-for-key": "error",
    "vue/return-in-computed-property": [
      "error",
      {
        treatUndefinedAsUnspecified: false,
      },
    ],
    "vue/valid-template-root": "error",
    "vue/valid-v-else-if": "error",
    "vue/valid-v-else": "error",
    "vue/no-multiple-template-root": "error",
    "vue/no-v-for-template-key": "error",
    "vue/attribute-hyphenation": ["error", "always"],
    "vue/component-definition-name-casing": ["error", "PascalCase"],
    "vue/custom-event-name-casing": [
      "error",
      "kebab-case",
    ],
    "vue/first-attribute-linebreak": [
      "error",
      {
        singleline: "beside",
        multiline: "below",
      },
    ],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always",
      },
    ],
    "vue/html-closing-bracket-spacing": [
      "error",
      {
        startTag: "never",
        endTag: "never",
        selfClosingTag: "always",
      },
    ],
    "vue/max-attributes-per-line": [
      "error",
      {
        singleline: {
          max: 2,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vue/singleline-html-element-content-newline": [
      "error",
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: false,
      },
    ],
    "vue/multiline-html-element-content-newline": [
      "error",
      {
        ignoreWhenEmpty: false,
        allowEmptyLines: false,
      },
    ],
    "vue/html-end-tags": "error",
    "vue/html-indent": [
      "error",
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    "vue/html-quotes": [
      "error",
      "double",
      {avoidEscape: true},
    ],
    "vue/mustache-interpolation-spacing": ["error", "always"],
    "vue/no-multi-spaces": "error",
    "vue/no-spaces-around-equal-signs-in-attribute": "error",
    "vue/prop-name-casing": ["error", "camelCase"],
    "vue/require-default-prop": "error",
    "vue/require-prop-types": "error",
    "vue/v-bind-style": [
      "error",
      "shorthand",
    ],
    "vue/v-on-style": [
      "error",
      "shorthand",
    ],
    "vue/v-slot-style": [
      "error",
      {
        atComponent: "v-slot",
        default: "shorthand",
        named: "shorthand",
      },
    ],
    "vue/attributes-order": [
      "error",
      {
        order: [
          "DEFINITION", // e.g. 'is', 'v-is'
          "LIST_RENDERING", // e.g. 'v-for item in items'
          "CONDITIONALS", // e.g. 'v-if', 'v-else-if', 'v-else', 'v-show', 'v-cloak'
          "RENDER_MODIFIERS", // e.g. 'v-once', 'v-pre'
          "GLOBAL", // e.g. 'id'
          ["UNIQUE", "SLOT"], // [('ref', 'key'), ('v-slot', 'slot')]
          "TWO_WAY_BINDING", // e.g. 'v-model'
          "OTHER_DIRECTIVES", // e.g. 'v-custom-directive'
          "OTHER_ATTR", //  e.g. 'v-bind:prop="foo"', ':prop="foo"', 'prop="foo"', 'custom-prop="foo"', 'boolean-prop'
          "CONTENT", // e.g. 'v-text', 'v-html'
          "EVENTS", // e.g. '@click="functionCall"', 'v-on="event"'
        ],
        alphabetical: false,
      },
    ],
    "vue/no-lone-template": "error",
    "vue/no-v-html": "warn",
    "vue/order-in-components": [
      "error",
      {
        order: [
          // https://v2.vuejs.org/v2/style-guide/#Component-instance-options-order-recommended
          "el",
          "name",
          "key",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          ["provide", "inject"],
          "ROUTER_GUARDS",
          "layout",
          "middleware",
          "validate",
          "scrollToTop",
          "transition",
          "loading",
          "inheritAttrs",
          "model",
          ["props", "propsData"],
          "emits",
          "setup",
          "asyncData",
          "data",
          "fetch",
          "head",
          "computed",
          "LIFECYCLE_HOOKS",
          ["template", "render"],
          "renderError",
          "methods",
          "watch",
          "watchQuery",
        ],
      },
    ],
    "vue/this-in-template": "error",
    "vue/component-name-in-template-casing": [
      "error",
      "PascalCase",
      {
        registeredComponentsOnly: true,
      },
    ],
    "vue/sort-keys": ["error", "asc", {
      "caseSensitive": true,
      "ignoreChildrenOf": ["model"],
      "ignoreGrandchildrenOf": ["computed", "directives", "inject", "props", "watch"],
      "minKeys": 2,
      "natural": false,
    }],
  },
  ignorePatterns: [
    "node_modules",
    ".eslintrc.js",
  ],
};
