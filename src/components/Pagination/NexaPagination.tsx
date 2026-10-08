import Pagination, { type PaginationProps } from '@mui/material/Pagination'
export interface NexaPaginationProps extends Pick<
  PaginationProps,
  | 'page'
  | 'count'
  | 'disabled'
  | 'size'
  | 'sx'
  | 'siblingCount'
  | 'boundaryCount'
> {
  onPageChange: (page: number) => void
  label?: string
}
/** One-based pages for non-grid lists. Data Grid uses its own zero-based model. */
export function NexaPagination({
  onPageChange,
  label = 'Pagination',
  siblingCount = 0,
  ...props
}: NexaPaginationProps) {
  return (
    <Pagination
      {...props}
      siblingCount={siblingCount}
      aria-label={label}
      onChange={(_, page) => onPageChange(page)}
    />
  )
}
