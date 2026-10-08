import type { Meta, StoryObj } from '@storybook/react-vite'
import { NexaDataGrid } from './NexaDataGrid'
import {
  learnerRows,
  learnerColumns,
  type LearnerRecord,
} from '../../demo/enterpriseData'
const meta = {
  title: 'Components/Data Display/DataGrid',
  component: NexaDataGrid<LearnerRecord>,
  tags: ['autodocs'],
  args: {
    label: 'Learner records',
    rows: learnerRows.slice(0, 8),
    columns: learnerColumns,
    showToolbar: true,
  },
  argTypes: { rows: { control: false }, columns: { control: false } },
  parameters: {
    docs: {
      description: {
        component:
          'Community MUI X grid. Single-column sorting/filtering, quick search, selection and pages up to 100 rows. Scroll inside the grid on small screens; models, slots, apiRef and server modes remain available.',
      },
    },
  },
} satisfies Meta<typeof NexaDataGrid<LearnerRecord>>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const EnterpriseDataset: Story = { args: { rows: learnerRows } }
export const Sorted: Story = {
  args: {
    initialState: { sorting: { sortModel: [{ field: 'name', sort: 'asc' }] } },
  },
}
export const Filtered: Story = {
  args: {
    initialState: {
      filter: {
        filterModel: {
          items: [{ field: 'status', operator: 'is', value: 'Overdue' }],
        },
      },
    },
  },
}
export const Selection: Story = {
  args: { checkboxSelection: true, disableRowSelectionOnClick: true },
}
export const Loading: Story = { args: { loading: true } }
export const Empty: Story = { args: { rows: [] } }
export const Error: Story = {
  args: {
    errorMessage:
      'The service is unavailable. Retry when your connection is restored.',
  },
}
export const Dark: Story = { globals: { theme: 'dark' } }
