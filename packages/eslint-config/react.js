import { defineConfig } from 'eslint/config';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import base from './index.js';

// Rules for React apps and packages, on top of the base rules in index.js.
export default defineConfig(base, reactHooks.configs.flat.recommended, {
  languageOptions: {
    globals: globals.browser,
  },
});
