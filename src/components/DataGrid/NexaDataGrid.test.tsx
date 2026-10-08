import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { renderNexa } from '../../test/renderNexa'
import { NexaDataGrid } from './NexaDataGrid'
import type { GridColDef } from '@mui/x-data-grid'
const rows = [
  { id: 1, name: 'Zanele' },
  { id: 2, name: 'Amina' },
  { id: 3, name: 'Liam' },
]
const columns: GridColDef<(typeof rows)[number]>[] = [
  { field: 'name', headerName: 'Name', width: 200 },
]
const props = {
  label: 'Employees',
  rows,
  columns,
  disableVirtualization: true,
  pageSizeOptions: [2, 3],
}
describe('NexaDataGrid', () => {
  it('renders rows and sorts from the column header', async () => {
    renderNexa(<NexaDataGrid {...props} />)
    expect(screen.getByRole('grid', { name: 'Employees' })).toBeVisible()
    await userEvent.click(screen.getByRole('columnheader', { name: /Name/ }))
    await waitFor(() =>
      expect(screen.getAllByRole('row')[1]).toHaveTextContent('Amina'),
    )
  })
  it('paginates without losing the typed dataset', async () => {
    renderNexa(<NexaDataGrid {...props} />)
    expect(
      screen.queryByRole('gridcell', { name: 'Liam' }),
    ).not.toBeInTheDocument()
    await userEvent.click(
      screen.getByRole('button', { name: 'Go to next page' }),
    )
    expect(await screen.findByRole('gridcell', { name: 'Liam' })).toBeVisible()
  })
  it('filters using the built-in quick search', async () => {
    renderNexa(<NexaDataGrid {...props} showToolbar />)
    await userEvent.click(screen.getByRole('button', { name: 'Search' }))
    await userEvent.type(
      screen.getByRole('searchbox', { name: 'Search' }),
      'Zanele',
    )
    await waitFor(() =>
      expect(
        screen.queryByRole('gridcell', { name: 'Amina' }),
      ).not.toBeInTheDocument(),
    )
    expect(screen.getByRole('gridcell', { name: 'Zanele' })).toBeVisible()
  })
  it('reports row selection through MUI model callbacks', async () => {
    const select = vi.fn()
    renderNexa(
      <NexaDataGrid
        {...props}
        checkboxSelection
        onRowSelectionModelChange={select}
      />,
    )
    const row = screen.getAllByRole('row')[1]
    await userEvent.click(within(row).getByRole('checkbox'))
    expect(within(row).getByRole('checkbox')).toBeChecked()
    expect(select.mock.calls[0][0].ids.has(1)).toBe(true)
  })
  it('shows empty and no-results feedback', () => {
    const { rerender } = renderNexa(<NexaDataGrid {...props} rows={[]} />)
    expect(screen.getByText('No records yet')).toBeVisible()
    rerender(
      <NexaDataGrid
        {...props}
        filterModel={{ items: [], quickFilterValues: ['missing'] }}
      />,
    )
    expect(screen.getByText('No matching records')).toBeVisible()
  })
  it('marks the grid busy during loading', () => {
    renderNexa(<NexaDataGrid {...props} loading />)
    expect(
      screen.getByRole('region', { name: 'Employees data' }),
    ).toHaveAttribute('aria-busy', 'true')
  })
  it('replaces stale rows with an error and retry', async () => {
    const retry = vi.fn()
    renderNexa(
      <NexaDataGrid
        {...props}
        errorMessage="Connection unavailable."
        onRetry={retry}
      />,
    )
    expect(screen.queryByRole('grid')).not.toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Connection unavailable.',
    )
    await userEvent.click(screen.getByRole('button', { name: 'Try again' }))
    expect(retry).toHaveBeenCalledTimes(1)
  })
})
