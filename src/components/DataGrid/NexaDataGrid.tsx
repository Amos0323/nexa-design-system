import Box from '@mui/material/Box'
import {
  DataGrid,
  type DataGridProps,
  type GridValidRowModel,
} from '@mui/x-data-grid'
import { NexaEmptyState } from '../Feedback/NexaEmptyState'
import { NexaErrorState } from '../Feedback/NexaErrorState'
export type NexaDataGridProps<Row extends GridValidRowModel> =
  DataGridProps<Row> & {
    label: string
    height?: number | string
    errorMessage?: string
    onRetry?: () => void
  }
function EmptyRows() {
  return (
    <NexaEmptyState
      title="No records yet"
      description="Records will appear here when they are available."
    />
  )
}
function NoResults() {
  return (
    <NexaEmptyState
      title="No matching records"
      description="Try a different search or clear your filters."
    />
  )
}
/** Retains MUI X's typed models, callbacks, slots, apiRef, and server-mode APIs. */
export function NexaDataGrid<Row extends GridValidRowModel>({
  height = '32rem',
  errorMessage,
  onRetry,
  label,
  initialState,
  pageSizeOptions = [10, 25, 50, 100],
  slots,
  slotProps,
  sx,
  ...props
}: NexaDataGridProps<Row>) {
  const first = pageSizeOptions[0]
  const pageSize = typeof first === 'number' ? first : (first?.value ?? 10)
  return (
    <Box
      role="region"
      aria-label={`${label} data`}
      aria-busy={props.loading ?? false}
      sx={{
        height,
        minWidth: 0,
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 1,
      }}
    >
      {errorMessage ? (
        <NexaErrorState
          title={'Unable to load ' + label.toLowerCase()}
          description={errorMessage}
          onRetry={onRetry}
        />
      ) : (
        <DataGrid<Row>
          {...props}
          label={label}
          aria-label={props['aria-label'] ?? label}
          pageSizeOptions={pageSizeOptions}
          initialState={{
            ...initialState,
            pagination: {
              ...initialState?.pagination,
              paginationModel: {
                page: 0,
                pageSize,
                ...initialState?.pagination?.paginationModel,
              },
            },
          }}
          slots={{
            noRowsOverlay: EmptyRows,
            noResultsOverlay: NoResults,
            ...slots,
          }}
          slotProps={{
            ...slotProps,
            toolbar: {
              ...slotProps?.toolbar,
              quickFilterProps: {
                ...slotProps?.toolbar?.quickFilterProps,
                slotProps: {
                  ...slotProps?.toolbar?.quickFilterProps?.slotProps,
                  root: {
                    ...slotProps?.toolbar?.quickFilterProps?.slotProps?.root,
                    slotProps: {
                      ...slotProps?.toolbar?.quickFilterProps?.slotProps?.root
                        ?.slotProps,
                      htmlInput: {
                        'aria-label': 'Search',
                        type: 'search',
                        ...slotProps?.toolbar?.quickFilterProps?.slotProps?.root
                          ?.slotProps?.htmlInput,
                      },
                    },
                  },
                },
              },
            },
            loadingOverlay: {
              variant: 'skeleton',
              noRowsVariant: 'skeleton',
              ...slotProps?.loadingOverlay,
            },
          }}
          sx={[
            {
              '& [role="toolbar"]': { flexWrap: 'wrap', gap: 1 },
              '& .MuiTablePagination-selectLabel': {
                display: { xs: 'none', sm: 'block' },
              },
              '& .MuiTablePagination-toolbar': { px: 1 },
              '& .MuiDataGrid-selectedRowCount': {
                display: { xs: 'none', sm: 'block' },
              },
              '@media (prefers-reduced-motion: reduce)': {
                '& .MuiSkeleton-root': { animation: 'none' },
              },
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        />
      )}
    </Box>
  )
}
