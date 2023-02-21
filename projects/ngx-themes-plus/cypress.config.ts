import { defineConfig } from 'cypress'

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
          root: '',
          sourceRoot: 'src',
          buildOptions: {
            tsConfig: 'cypress/tsconfig.json'
          },
        },
      }
    },
    specPattern: '**/*.cy.ts',
    video: false,
    screenshotOnRunFailure: false
  }
})
