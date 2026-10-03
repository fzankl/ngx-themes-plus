// @ts-check
import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import angular from "angular-eslint";
import prettier from "eslint-config-prettier";

export default defineConfig(
  {
    ignores: ["node_modules/", "dist/", ".angular/"]
  },
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.recommendedTypeChecked,
      angular.configs.tsRecommended,
      prettier
    ],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    processor: angular.processInlineTemplates,
    rules: {
      "lines-between-class-members": [
        "error",
        "always",
        {
          exceptAfterSingleLine: true
        }
      ],
      "no-useless-constructor": "off",
      "@typescript-eslint/no-useless-constructor": ["error"],
      // Keep NgModule-based public API and constructor injection for compatibility with older Angular versions
      "@angular-eslint/prefer-standalone": "off",
      "@angular-eslint/prefer-inject": "off",
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": ["error"],
      "no-unused-vars": "off",
      "@typescript-eslint/ban-ts-comment": ["off"],
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-explicit-any": ["error"],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        {
          allowExpressions: true
        }
      ],
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
          accessibility: "explicit",
          overrides: {
            constructors: "off"
          }
        }
      ],
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "tp",
          style: "camelCase"
        }
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "tp",
          style: "kebab-case"
        }
      ],
      "@typescript-eslint/member-ordering": [
        "error",
        {
          default: [
            "signature",
            "public-static-field",
            "protected-static-field",
            "private-static-field",
            "public-decorated-field",
            "protected-decorated-field",
            "private-decorated-field",
            "public-instance-field",
            "protected-instance-field",
            "private-instance-field",
            "public-abstract-field",
            "protected-abstract-field",
            "public-field",
            "protected-field",
            "private-field",
            "static-field",
            "instance-field",
            "abstract-field",
            "decorated-field",
            "field",
            "public-constructor",
            "protected-constructor",
            "private-constructor",
            "constructor",
            "public-static-method",
            "protected-static-method",
            "private-static-method",
            "public-decorated-method",
            "protected-decorated-method",
            "private-decorated-method",
            "public-instance-method",
            "protected-instance-method",
            "private-instance-method",
            "public-abstract-method",
            "protected-abstract-method",
            "public-method",
            "protected-method",
            "private-method",
            "static-method",
            "instance-method",
            "abstract-method",
            "decorated-method",
            "method"
          ]
        }
      ]
    }
  },
  {
    files: ["projects/showcase/**/*.ts"],
    rules: {
      "@angular-eslint/component-selector": ["error", { type: "element", prefix: "app", style: "kebab-case" }]
    }
  },
  {
    files: ["**/*.cy.ts", "**/cypress/support/component.ts"],
    rules: {
      "@typescript-eslint/no-namespace": ["off"],
      "@typescript-eslint/no-unsafe-assignment": ["off"],
      "@typescript-eslint/no-unsafe-call": ["off"],
      "@typescript-eslint/no-unsafe-member-access": ["off"]
    }
  },
  {
    files: ["**/*.html"],
    extends: [angular.configs.templateRecommended, prettier],
    rules: {
      "@angular-eslint/template/prefer-control-flow": "off"
    }
  }
);
