import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import perfectionist from "eslint-plugin-perfectionist";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    files: ["**/*.{ts,tsx, js, jsx, mjs, cjs}"],
    plugins: {
      perfectionist,
    },
    rules: {
      "sort-imports": "off",
      "perfectionist/sort-imports": [
        "error",
        {
          type: "natural",
          order: "asc",
          groups: [
            "react-group",
            "external",
            "src-group",
            ["parent", "sibling", "index"],
            "style",
          ],
          newlinesBetween: 1,
          customGroups: [
            {
              groupName: "react-group",
              elementNamePattern: ["^react$", "^react-dom$", "^react-.+"],
            },
            {
              groupName: "src-group",
              elementNamePattern: ["^src/", "^@/"],
            },
          ],
        },
      ],
      "perfectionist/sort-exports": ["error"],
      "perfectionist/sort-named-imports": ["error"],
      "perfectionist/sort-named-exports": ["error"],
      "perfectionist/sort-jsx-props": [
        "error",
        {
          type: "unsorted",
          groups: ["shorthand-group", "multiline-group"],
          customGroups: [
            {
              groupName: "shorthand-group",
              modifiers: ["shorthand"],
              selector: "prop",
            },
            {
              groupName: "multiline-group",
              modifiers: ["multiline"],
              selector: "prop",
            },
          ],
        },
      ],
    },
  },
]);

export default eslintConfig;
