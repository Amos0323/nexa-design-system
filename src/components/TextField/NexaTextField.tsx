import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
} from 'react'
import TextField, { type TextFieldProps } from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

export interface NexaTextFieldProps extends Omit<
  TextFieldProps<'outlined'>,
  | 'variant'
  | 'label'
  | 'select'
  | 'children'
  | 'slots'
  | 'slotProps'
  | 'inputRef'
> {
  label: string
  startAdornment?: ReactNode
  endAdornment?: ReactNode
  inputRef?: Ref<HTMLInputElement | HTMLTextAreaElement>
  /** Native input attributes such as maxLength, inputMode, or aria-describedby. */
  inputProps?: Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | 'id'
    | 'required'
    | 'disabled'
    | 'value'
    | 'defaultValue'
    | 'onChange'
    | 'aria-invalid'
  >
}
export function NexaTextField({
  id,
  label,
  startAdornment,
  endAdornment,
  inputProps,
  helperText,
  fullWidth = true,
  ...props
}: NexaTextFieldProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const description =
    [
      helperText ? `${fieldId}-helper-text` : undefined,
      inputProps?.['aria-describedby'],
    ]
      .filter(Boolean)
      .join(' ') || undefined
  return (
    <TextField
      {...props}
      id={fieldId}
      label={label}
      helperText={helperText}
      fullWidth={fullWidth}
      variant="outlined"
      slotProps={{
        htmlInput: { ...inputProps, 'aria-describedby': description },
        input: {
          startAdornment:
            startAdornment != null ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : undefined,
          endAdornment:
            endAdornment != null ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : undefined,
        },
      }}
    />
  )
}
