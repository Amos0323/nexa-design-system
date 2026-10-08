import { useId, useState, type ReactNode } from 'react'
import {
  DatePicker,
  type DatePickerProps,
} from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import type { DateValidationError } from '@mui/x-date-pickers/models'
export interface NexaDatePickerProps extends Omit<
  DatePickerProps,
  'label' | 'slotProps'
> {
  label: string
  helperText?: ReactNode
  error?: boolean
  required?: boolean
}
function validationMessage(error: DateValidationError): string | undefined {
  switch (error) {
    case 'invalidDate':
      return 'Enter a valid date.'
    case 'minDate':
      return 'Choose a date on or after the minimum date.'
    case 'maxDate':
      return 'Choose a date on or before the maximum date.'
    case null:
      return undefined
    default:
      return 'This date is unavailable.'
  }
}
/** Dayjs | null values; retain MUI's accessible segmented field and calendar. */
export function NexaDatePicker({
  label,
  helperText,
  error,
  required,
  onError,
  ...props
}: NexaDatePickerProps) {
  const id = useId()
  const [validationError, setValidationError] =
    useState<DateValidationError>(null)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...props}
        label={label}
        onError={(reason, value) => {
          setValidationError(reason)
          onError?.(reason, value)
        }}
        slotProps={{
          textField: {
            id,
            fullWidth: true,
            required,
            error: error || !!validationError,
            helperText: error
              ? helperText
              : (validationMessage(validationError) ?? helperText),
          },
        }}
      />
    </LocalizationProvider>
  )
}
