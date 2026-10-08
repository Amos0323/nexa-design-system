import { useId, type ReactNode, type Ref } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import type { SxProps, Theme } from '@mui/material/styles'
import type { NexaOption } from '../../types/options'

export interface NexaSelectProps<Value extends string = string> {
  id?: string
  name?: string
  label: string
  options: readonly NexaOption<Value>[]
  /** Empty string represents no selection. */
  value: Value | ''
  onValueChange: (value: Value) => void
  helperText?: ReactNode
  error?: boolean
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  size?: 'small' | 'medium'
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
  inputRef?: Ref<HTMLInputElement>
  sx?: SxProps<Theme>
}
export function NexaSelect<Value extends string>({
  id,
  name,
  label,
  options,
  value,
  onValueChange,
  helperText,
  error,
  disabled,
  required,
  fullWidth = true,
  size = 'medium',
  onBlur,
  inputRef,
  sx,
}: NexaSelectProps<Value>) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const labelId = `${fieldId}-label`
  const helperId = helperText ? `${fieldId}-helper-text` : undefined
  return (
    <FormControl
      fullWidth={fullWidth}
      error={error}
      disabled={disabled}
      required={required}
      size={size}
      sx={sx}
    >
      <InputLabel id={labelId} htmlFor={fieldId}>
        {label}
      </InputLabel>
      <Select<Value | ''>
        id={fieldId}
        labelId={labelId}
        label={label}
        name={name}
        value={value}
        onBlur={onBlur}
        inputRef={inputRef}
        aria-describedby={helperId}
        onChange={(event) => {
          const option = options.find(
            (item) => item.value === event.target.value,
          )
          if (option && !option.disabled) onValueChange(option.value)
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText id={helperId}>{helperText}</FormHelperText>
      )}
    </FormControl>
  )
}
