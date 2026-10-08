import type { Meta, StoryObj } from '@storybook/react-vite'
import Stack from '@mui/material/Stack'
import AddOutlined from '@mui/icons-material/AddOutlined'
import ArrowForward from '@mui/icons-material/ArrowForward'
import { NexaButton } from './NexaButton'
const meta = {
  title: 'Components/Button',
  component: NexaButton,
  tags: ['autodocs'],
  args: {
    children: 'Save changes',
    variant: 'primary',
    size: 'medium',
    disabled: false,
    loading: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'text', 'destructive'],
    },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
  },
  parameters: {
    docs: {
      description: {
        component:
          'Native action button with semantic variants. Loading disables activation and keeps the accessible action name. Use type="submit" explicitly inside forms.',
      },
    },
  },
} satisfies Meta<typeof NexaButton>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Variants: Story = {
  render: () => (
    <Stack direction="row" useFlexGap spacing={3} sx={{ flexWrap: 'wrap' }}>
      {(
        ['primary', 'secondary', 'outlined', 'text', 'destructive'] as const
      ).map((variant) => (
        <NexaButton key={variant} variant={variant}>
          {variant}
        </NexaButton>
      ))}
    </Stack>
  ),
}
export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <NexaButton key={size} size={size}>
          {size}
        </NexaButton>
      ))}
    </Stack>
  ),
}
export const WithIcons: Story = {
  args: { startIcon: <AddOutlined />, endIcon: <ArrowForward /> },
}
export const Disabled: Story = { args: { disabled: true } }
export const Loading: Story = { args: { loading: true } }
export const Dark: Story = { globals: { theme: 'dark' } }
