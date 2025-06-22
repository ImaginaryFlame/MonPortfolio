import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '64yujm4t',
    dataset: 'production'
  },
  studioHost: 'flame-portfolio',
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
