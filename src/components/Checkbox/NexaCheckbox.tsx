import { useId, type ReactNode, type Ref } from 'react'
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormHelperText from '@mui/material/FormHelperText'

export interface NexaCheckboxProps extends Pick<
  CheckboxProps,
  | 'id'
  | 'name'
  | 'value'
  | 'checked'
  | 'defaultChecked'
  | 'onChange'
  | 'disabled'
  | 'required'
  | 'size'
  | 'sx'
  | 'onBlur'
> {
  label: string
  helperText?: ReactNode
  error?: boolean
  inputRef?: Ref<HTMLInputElement>
}
export function NexaCheckbox({
  label,
  helperText,
  error,
  id,
  disabled,
  required,
  sx,
  inputRef,
  ...props
}: NexaCheckboxProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const helperId = helperText ? `${fieldId}-helper-text` : undefined
  return (
    <FormControl error={error} disabled={disabled} required={required} sx={sx}>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            {...props}
            id={fieldId}
            disabled={disabled}
            required={required}
            color={error ? 'error' : 'primary'}
            slotProps={{
              input: {
                ref: inputRef,
                'aria-describedby': helperId,
                'aria-invalid': error || undefined,
              },
            }}
          />
        }
      />
      {helperText && (
        <FormHelperText id={helperId} sx={{ mx: 0 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}
