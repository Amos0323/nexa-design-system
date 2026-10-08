import type { Preview } from '@storybook/react-vite'
import Box from '@mui/material/Box'
import { NexaProvider } from '../src/theme/NexaProvider'
const preview: Preview = {
  initialGlobals: { theme: 'light' },
  globalTypes: {
    theme: {
      description: 'Nexa color mode',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: ['light', 'dark'],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (Story, context) =>
      context.title.startsWith('Components/') ||
      context.title.startsWith('Patterns/') ? (
        <NexaProvider
          key={context.globals.theme}
          initialMode={context.globals.theme === 'dark' ? 'dark' : 'light'}
        >
          <Box
            sx={{
              p: context.parameters.nexa?.fullBleed ? 0 : 6,
              bgcolor: 'background.default',
              minHeight: '100vh',
            }}
          >
            <Story />
          </Box>
        </NexaProvider>
      ) : (
        <Story />
      ),
  ],
  parameters: {
    layout: 'fullscreen',
    a11y: { test: 'error' },
    controls: { expanded: true },
    options: {
      storySort: { order: ['Guides', 'Foundations', 'Components', 'Patterns'] },
    },
  },
}
export default preview
