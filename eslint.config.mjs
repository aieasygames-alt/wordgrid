import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import path from "node:path";

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
});

const config = [
  { ignores: [".next/**", "out/**", ".wrangler/**", ".qa/**", "node_modules/**", "reports/**", "squaredle-public/**"] },
  ...compat.extends("next/core-web-vitals"),
  { rules: { "react/no-unescaped-entities": "off" } },
];

export default config;
