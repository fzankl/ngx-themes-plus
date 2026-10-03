/// <reference types="node" />

import { resolve } from 'path';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    supportFile: false
  },
  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
      options: {
        projectConfig: {
          root: 'projects/ngx-themes-plus',
          sourceRoot: 'projects/ngx-themes-plus/src',
          buildOptions: {
            tsConfig: 'cypress/tsconfig.json',
            workspaceRoot: resolve(__dirname, '../..')
          }
        }
      }
    },
    specPattern: '**/*.cy.ts',
    video: false,
    screenshotOnRunFailure: false
  }
});
