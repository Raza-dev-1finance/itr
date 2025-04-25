import { FlatCompat } from "@eslint/eslintrc";
import prettier from "eslint-config-prettier";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier"], 
    rules: {
      "react/react-in-jsx-scope": "off", 
      // "no-console": "warn", 
      "no-unused-vars": "warn", 
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], 
      "import/no-anonymous-default-export": "off", 
      "semi": ["error", "always"], 
      "quotes": ["error", "double"],
      "curly": "error", 
      'jsx-a11y/label-has-associated-control': 'off',
       "prefer-const": "warn",
       "max-len": ["warn", { "code": 500 }]
    },
  }),
  prettier, 
];

export default eslintConfig;