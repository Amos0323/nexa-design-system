import { useState } from 'react'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SchoolOutlined from '@mui/icons-material/SchoolOutlined'
import PaletteOutlined from '@mui/icons-material/PaletteOutlined'
import WidgetsOutlined from '@mui/icons-material/WidgetsOutlined'
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined'
import { NexaAppShell } from '../components/Navigation/NexaAppShell'
import { NexaBreadcrumbs } from '../components/Navigation/NexaBreadcrumbs'
import { NexaMetricCard } from '../components/MetricCard/NexaMetricCard'
import { NexaDataGrid } from '../components/DataGrid/NexaDataGrid'
import { NexaDatePicker } from '../components/DatePicker/NexaDatePicker'
import { NexaButton } from '../components/Button/NexaButton'
import { useColorMode } from '../hooks/useColorMode'
import { learnerColumns, learnerRows } from './enterpriseData'
export interface EnterpriseShowcaseProps {
  initialState?: 'ready' | 'loading' | 'empty' | 'error'
}
const navigation = [
  {
    id: 'learning',
    label: 'Learning administration',
    href: '?view=enterprise',
    icon: <SchoolOutlined />,
  },
  {
    id: 'foundations',
    label: 'Foundations',
    href: './#main-content',
    icon: <PaletteOutlined />,
  },
  {
    id: 'components',
    label: 'Components',
    href: './#components-title',
    icon: <WidgetsOutlined />,
  },
]
export function EnterpriseShowcase({
  initialState = 'ready',
}: EnterpriseShowcaseProps) {
  const { mode, toggleMode } = useColorMode()
  const [state, setState] = useState(initialState)
  const [dueBefore, setDueBefore] = useState<Dayjs | null>(null)
  const [selectedCount, setSelectedCount] = useState(0)
  const rows =
    state === 'empty'
      ? []
      : learnerRows.filter(
          (row) =>
            !dueBefore?.isValid() ||
            !dayjs(row.dueDate).isAfter(dueBefore, 'day'),
        )
  async function reload() {
    setState('loading')
    await new Promise<void>((resolve) => setTimeout(resolve, 450))
    setState('ready')
  }
  return (
    <NexaAppShell
      title="Nexa · Enterprise showcase"
      navigation={navigation}
      activeId="learning"
      actions={
        <NexaButton
          variant="text"
          size="small"
          onClick={toggleMode}
          startIcon={<DarkModeOutlined />}
          aria-label={
            'Switch to ' + (mode === 'light' ? 'dark' : 'light') + ' mode'
          }
        >
          {mode === 'light' ? 'Dark' : 'Light'} mode
        </NexaButton>
      }
    >
      <NexaBreadcrumbs
        items={[
          { label: 'Nexa Design System', href: './' },
          { label: 'Enterprise components' },
          { label: 'Learning administration' },
        ]}
      />
      <Typography
        variant="h1"
        sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, mb: 3 }}
      >
        Learning Administration
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 8 }}>
        An enterprise component showcase. Illustrative organization metrics and
        24 sample learner records; no live data.
      </Typography>
      <Box
        component="section"
        aria-label="Learning metrics"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2,minmax(0,1fr))',
            lg: 'repeat(4,minmax(0,1fr))',
          },
          gap: 4,
          mb: 8,
        }}
      >
        <NexaMetricCard
          label="Learners"
          value="1,284"
          trend="+8.4% this month"
          supportingText="Across all departments"
        />
        <NexaMetricCard
          label="Active courses"
          value="42"
          supportingText="Available in the catalog"
        />
        <NexaMetricCard
          label="Completion"
          value="86%"
          trend="+3 percentage points"
          supportingText="Organization-wide completion"
        />
        <NexaMetricCard
          label="Overdue"
          value="117"
          supportingText="Require follow-up"
        />
      </Box>
      <Box component="section" aria-labelledby="learner-records-title">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={4}
          sx={{
            alignItems: { sm: 'center' },
            justifyContent: 'space-between',
            mb: 6,
          }}
        >
          <Box>
            <Typography id="learner-records-title" variant="h3" component="h2">
              Learner records
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Search, sort, filter, and select records.
            </Typography>
          </Box>
          <NexaButton
            variant="outlined"
            loading={state === 'loading'}
            onClick={() => {
              void reload()
            }}
          >
            Refresh example
          </NexaButton>
        </Stack>
        <Box sx={{ maxWidth: '22rem', mb: 4 }}>
          <NexaDatePicker
            label="Due on or before"
            value={dueBefore}
            onChange={setDueBefore}
            helperText="Optional. Clear the date to show all records."
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          On narrow screens, scroll within the grid to see all columns.
        </Typography>
        <NexaDataGrid
          label="Learner records"
          rows={rows}
          columns={learnerColumns}
          checkboxSelection
          disableRowSelectionOnClick
          showToolbar
          loading={state === 'loading'}
          errorMessage={
            state === 'error'
              ? 'The example records could not be loaded. Try again.'
              : undefined
          }
          onRetry={() => {
            void reload()
          }}
          onRowSelectionModelChange={(model) =>
            setSelectedCount(
              model.type === 'include'
                ? model.ids.size
                : rows.length - model.ids.size,
            )
          }
        />
        <Typography role="status" variant="body2" sx={{ mt: 3 }}>
          {selectedCount} records selected
        </Typography>
      </Box>
    </NexaAppShell>
  )
}
