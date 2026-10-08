import { useId, type ReactNode } from 'react'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import type { SxProps, Theme } from '@mui/material/styles'
import type { NexaOption } from '../../types/options'

export interface NexaRadioGroupProps<Value extends string = string> {
  id?: string
  name?: string
  label: string
  options: readonly NexaOption<Value>[]
  value: Value | ''
  onValueChange: (value: Value) => void
  orientation?: 'horizontal' | 'vertical'
  helperText?: ReactNode
  error?: boolean
  disabled?: boolean
  required?: boolean
  sx?: SxProps<Theme>
}
export function NexaRadioGroup<Value extends string>({
  id,
  name,
  label,
  options,
  value,
  onValueChange,
  orientation = 'vertical',
  helperText,
  error,
  disabled,
  required,
  sx,
}: NexaRadioGroupProps<Value>) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const helperId = helperText ? `${fieldId}-helper-text` : undefined
  return (
    <FormControl
      component="fieldset"
      disabled={disabled}
      error={error}
      required={required}
      sx={sx}
    >
      <FormLabel component="legend" id={`${fieldId}-label`}>
        {label}
      </FormLabel>
      <RadioGroup
        name={name ?? fieldId}
        value={value}
        row={orientation === 'horizontal'}
        aria-labelledby={`${fieldId}-label`}
        aria-describedby={helperId}
        aria-invalid={error || undefined}
        onChange={(_, next) => {
          const option = options.find((item) => item.value === next)
          if (option && !option.disabled && !disabled)
            onValueChange(option.value)
        }}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            label={option.label}
            disabled={disabled || option.disabled}
            control={
              <Radio
                required={required}
                slotProps={{
                  input: {
                    'aria-describedby': helperId,
                    'aria-invalid': error || undefined,
                  },
                }}
              />
            }
          />
        ))}
      </RadioGroup>
      {helperText && (
        <FormHelperText id={helperId} sx={{ mx: 0 }}>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}
