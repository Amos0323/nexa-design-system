import type { Meta, StoryObj } from '@storybook/react-vite'
import SchoolOutlined from '@mui/icons-material/SchoolOutlined'
import { NexaMetricCard } from './NexaMetricCard'
const meta = {
  title: 'Components/Data Display/MetricCard',
  component: NexaMetricCard,
  tags: ['autodocs'],
  args: {
    label: 'Active learners',
    value: '1,284',
    supportingText: 'Across all departments',
  },
  parameters: {
    docs: {
      description: {
        component:
          'A labeled metric with textual trend and optional decorative icon. Trend text must explain direction and period; it is never communicated by color alone.',
      },
    },
  },
} satisfies Meta<typeof NexaMetricCard>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithTrend: Story = {
  args: { trend: '+8.4% this month', icon: <SchoolOutlined /> },
}
export const Dark: Story = { globals: { theme: 'dark' } }
