import { useId, useRef, type ReactNode } from 'react'
import Dialog, { type DialogProps } from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'
import { NexaButton, type NexaButtonVariant } from '../Button/NexaButton'

export interface NexaDialogAction {
  label: string
  onClick: () => void
  variant?: NexaButtonVariant
  disabled?: boolean
}
export type NexaDialogCloseReason = 'cancel' | 'escapeKeyDown' | 'backdropClick'
export interface NexaDialogProps {
  open: boolean
  title: string
  description?: string
  children?: ReactNode
  primaryAction: NexaDialogAction
  onClose: (reason: NexaDialogCloseReason) => void
  cancelLabel?: string
  /** Pending work blocks all dismissal paths and repeated submissions. */
  loading?: boolean
  maxWidth?: DialogProps['maxWidth']
}
export function NexaDialog({
  open,
  title,
  description,
  children,
  primaryAction,
  onClose,
  cancelLabel = 'Cancel',
  loading = false,
  maxWidth = 'sm',
}: NexaDialogProps) {
  const id = useId()
  const cancelRef = useRef<HTMLButtonElement>(null)
  return (
    <Dialog
      open={open}
      fullWidth
      maxWidth={maxWidth}
      slotProps={{
        transition: {
          onEntered: () => {
            if (!loading) cancelRef.current?.focus()
          },
        },
      }}
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
      onClose={(_, reason) => {
        if (!loading) onClose(reason)
      }}
    >
      <DialogTitle id={`${id}-title`}>{title}</DialogTitle>
      <DialogContent>
        {description && (
          <DialogContentText
            id={`${id}-description`}
            sx={{ mb: children ? 4 : 0 }}
          >
            {description}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions sx={{ px: 6, pb: 6, gap: 2, flexWrap: 'wrap' }}>
        <NexaButton
          variant="text"
          ref={cancelRef}
          autoFocus
          disabled={loading}
          onClick={() => onClose('cancel')}
        >
          {cancelLabel}
        </NexaButton>
        <NexaButton
          variant={primaryAction.variant}
          disabled={primaryAction.disabled}
          loading={loading}
          onClick={primaryAction.onClick}
        >
          {primaryAction.label}
        </NexaButton>
      </DialogActions>
    </Dialog>
  )
}
