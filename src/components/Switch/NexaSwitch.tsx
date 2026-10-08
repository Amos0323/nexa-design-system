import { type Ref } from 'react'
import Switch, { type SwitchProps } from '@mui/material/Switch'
import FormControlLabel from '@mui/material/FormControlLabel'

export interface NexaSwitchProps extends Pick<
  SwitchProps,
  | 'id'
  | 'name'
  | 'checked'
  | 'defaultChecked'
  | 'onChange'
  | 'onBlur'
  | 'disabled'
  | 'size'
  | 'sx'
> {
  label: string
  inputRef?: Ref<HTMLInputElement>
}
export function NexaSwitch({
  label,
  disabled,
  inputRef,
  sx,
  ...props
}: NexaSwitchProps) {
  return (
    <FormControlLabel
      label={label}
      disabled={disabled}
      sx={sx}
      control={
        <Switch
          {...props}
          disabled={disabled}
          slotProps={{ input: { ref: inputRef, role: 'switch' } }}
        />
      }
    />
  )
}
