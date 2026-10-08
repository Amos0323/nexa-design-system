import type { GridColDef } from '@mui/x-data-grid'
import { NexaStatusBadge } from '../components/StatusBadge/NexaStatusBadge'
export interface LearnerRecord {
  id: string
  name: string
  department: string
  course: string
  status: 'Completed' | 'In progress' | 'Overdue' | 'Not started'
  completion: number
  dueDate: Date
}
const names = [
  'Thandi Nkosi',
  'Liam Williams',
  'Priya Naidoo',
  'Sipho Dlamini',
  'Amina Patel',
  'Daniel Smith',
  'Zanele Mokoena',
  'Grace Chen',
  'Musa Khumalo',
  'Olivia Jacobs',
  'Noah Brown',
  'Lerato Molefe',
  'Ethan Wilson',
  'Fatima Khan',
  'James Adams',
  'Naledi Ndlovu',
  'Mia Roberts',
  'Arjun Singh',
  'Chloe Martin',
  'Kabelo Maseko',
  'Ava Davies',
  'Ahmed Hassan',
  'Emma Taylor',
  'Sofia Costa',
]
const departments = [
  'Operations',
  'Customer experience',
  'Finance',
  'Technology',
  'People & culture',
  'Merchandising',
]
const courses = [
  'Information security',
  'Inclusive leadership',
  'Customer care essentials',
  'Data protection',
  'Workplace safety',
  'Responsible procurement',
]
const statuses = ['Completed', 'In progress', 'Overdue', 'Not started'] as const
export const learnerRows: LearnerRecord[] = names.map((name, index) => ({
  id: 'EMP-' + (1001 + index),
  name,
  department: departments[index % departments.length],
  course: courses[index % courses.length],
  status: statuses[index % 4],
  completion:
    index % 4 === 0 ? 100 : index % 4 === 1 ? 65 : index % 4 === 2 ? 30 : 0,
  dueDate: new Date(2026, 9, 8 + index),
}))
export const learnerColumns: GridColDef<LearnerRecord>[] = [
  { field: 'id', headerName: 'Employee ID', width: 140 },
  { field: 'name', headerName: 'Name', width: 190 },
  { field: 'department', headerName: 'Department', width: 190 },
  { field: 'course', headerName: 'Course', width: 220 },
  {
    field: 'status',
    headerName: 'Status',
    type: 'singleSelect',
    valueOptions: [...statuses],
    width: 160,
    renderCell: ({ row }) => (
      <NexaStatusBadge
        label={row.status}
        status={
          row.status === 'Completed'
            ? 'success'
            : row.status === 'Overdue'
              ? 'error'
              : row.status === 'In progress'
                ? 'info'
                : 'neutral'
        }
      />
    ),
  },
  {
    field: 'completion',
    headerName: 'Completion',
    type: 'number',
    width: 135,
    valueFormatter: (value: number) => value + '%',
  },
  { field: 'dueDate', headerName: 'Due date', type: 'date', width: 145 },
]
