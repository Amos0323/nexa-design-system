import type { StorybookConfig } from '@storybook/react-vite'
const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx', '../src/**/*.mdx'],
  framework: '@storybook/react-vite',
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  staticDirs: ['../public', { from: '../docs/figma', to: '/handoff' }],
}
export default config
