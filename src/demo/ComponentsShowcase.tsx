import { useRef, useState, type FormEvent } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import SaveOutlined from '@mui/icons-material/SaveOutlined'
import ArrowForward from '@mui/icons-material/ArrowForward'
import { NexaAlert } from '../components/Alert/NexaAlert'
import { NexaButton } from '../components/Button/NexaButton'
import { NexaCard } from '../components/Card/NexaCard'
import { NexaCheckbox } from '../components/Checkbox/NexaCheckbox'
import { NexaDialog } from '../components/Dialog/NexaDialog'
import { NexaRadioGroup } from '../components/RadioGroup/NexaRadioGroup'
import { NexaSelect } from '../components/Select/NexaSelect'
import { NexaStatusBadge } from '../components/StatusBadge/NexaStatusBadge'
import { NexaSwitch } from '../components/Switch/NexaSwitch'
import { NexaTextField } from '../components/TextField/NexaTextField'
import type { NexaOption } from '../types/options'

type Region = 'africa' | 'europe' | 'asia'
type Access = 'restricted' | 'team'
const regions: readonly NexaOption<Region>[] = [
  { value: 'africa', label: 'Africa' },
  { value: 'europe', label: 'Europe' },
  { value: 'asia', label: 'Asia Pacific' },
]
const accessOptions: readonly NexaOption<Access>[] = [
  { value: 'restricted', label: 'Invite only' },
  { value: 'team', label: 'Everyone in the team' },
]

export function ComponentsShowcase() {
  const [name, setName] = useState('Customer experience')
  const [code, setCode] = useState('2040')
  const [region, setRegion] = useState<Region | ''>('africa')
  const [access, setAccess] = useState<Access>('restricted')
  const [reviewed, setReviewed] = useState(false)
  const [digest, setDigest] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const nameRef = useRef<HTMLInputElement>(null)
  const reviewRef = useRef<HTMLInputElement>(null)
  const nameError = submitted && !name.trim()
  const reviewError = submitted && !reviewed
  function review(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    setNotice(null)
    if (!name.trim()) {
      nameRef.current?.focus()
      return
    }
    if (!reviewed) {
      reviewRef.current?.focus()
      return
    }
    setOpen(true)
  }
  async function save() {
    setSaving(true)
    // Demonstration only: no network request or persistence.
    await new Promise<void>((resolve) => setTimeout(resolve, 650))
    setSaving(false)
    setOpen(false)
    setNotice(
      'Settings saved for ' +
        name.trim() +
        '. This preview is stored in memory only.',
    )
  }
  function reset() {
    setName('Customer experience')
    setCode('2040')
    setRegion('africa')
    setAccess('restricted')
    setReviewed(false)
    setDigest(true)
    setSubmitted(false)
    setNotice(null)
  }
  return (
    <Box component="section" aria-labelledby="components-title" sx={{ mt: 16 }}>
      <Stack
        direction="row"
        useFlexGap
        spacing={4}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          mb: 3,
        }}
      >
        <Typography id="components-title" component="h2" variant="h2">
          Components
        </Typography>
        <NexaStatusBadge label="Phase 02" status="neutral" />
      </Stack>
      <Typography color="text.secondary" sx={{ mb: 8 }}>
        Reusable building blocks, working together. Explore a workspace settings
        form and its feedback states.
      </Typography>
      {notice && (
        <NexaAlert
          severity="success"
          title="Changes saved"
          onDismiss={() => setNotice(null)}
          sx={{ mb: 6 }}
        >
          {notice}
        </NexaAlert>
      )}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            md: 'minmax(0, 3fr) minmax(0, 2fr)',
          },
          gap: 6,
          alignItems: 'start',
        }}
      >
        <NexaCard
          title="Workspace settings"
          subtitle="A local component demo. No account or server required."
        >
          <Box component="form" onSubmit={review} noValidate>
            <Stack spacing={6}>
              <NexaTextField
                label="Workspace name"
                name="workspaceName"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
                error={nameError}
                helperText={
                  nameError
                    ? 'Enter a workspace name.'
                    : 'Visible to everyone in this workspace.'
                }
                inputRef={nameRef}
                inputProps={{ maxLength: 80 }}
              />
              <NexaTextField
                label="Cost center"
                name="costCenter"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                startAdornment="#"
                helperText="Optional internal reference."
              />
              <NexaSelect<Region>
                label="Hosting region"
                name="region"
                value={region}
                onValueChange={setRegion}
                options={regions}
                required
                helperText="Choose where your workspace is hosted."
              />
              <NexaRadioGroup<Access>
                label="Workspace access"
                name="access"
                value={access}
                onValueChange={setAccess}
                options={accessOptions}
                helperText="Invite-only workspaces keep access explicit."
              />
              <NexaSwitch
                label="Weekly email digest"
                checked={digest}
                onChange={(event) => setDigest(event.target.checked)}
              />
              <NexaCheckbox
                label="I have reviewed the access policy"
                checked={reviewed}
                onChange={(event) => setReviewed(event.target.checked)}
                required
                error={reviewError}
                helperText={
                  reviewError
                    ? 'Review the access policy before saving.'
                    : 'Required before applying changes.'
                }
                inputRef={reviewRef}
              />
              <Stack
                direction="row"
                useFlexGap
                spacing={3}
                sx={{ flexWrap: 'wrap' }}
              >
                <NexaButton type="submit" startIcon={<SaveOutlined />}>
                  Review changes
                </NexaButton>
                <NexaButton variant="text" onClick={reset}>
                  Reset form
                </NexaButton>
              </Stack>
            </Stack>
          </Box>
        </NexaCard>
        <Stack spacing={6} sx={{ minWidth: 0 }}>
          <NexaCard
            title="Feedback & status"
            subtitle="States with meaning beyond color."
          >
            <Stack spacing={5}>
              <NexaAlert severity="info">
                Use clear labels and specific feedback to help people complete a
                task.
              </NexaAlert>
              <Stack
                direction="row"
                useFlexGap
                spacing={2}
                sx={{ flexWrap: 'wrap' }}
              >
                <NexaStatusBadge label="Draft" />
                <NexaStatusBadge label="Active" status="success" />
                <NexaStatusBadge label="Needs review" status="warning" />
                <NexaStatusBadge label="Blocked" status="error" />
                <NexaStatusBadge label="In progress" status="info" />
                <NexaStatusBadge label="Archived" status="neutral" />
              </Stack>
              <NexaTextField
                label="Workspace URL"
                defaultValue="existing-workspace"
                error
                helperText="This address is already in use. Try another."
              />
              <NexaTextField
                label="Organization"
                defaultValue="Nexa Enterprise"
                disabled
                helperText="Managed by your administrator."
              />
              <NexaSwitch label="Single sign-on (managed)" checked disabled />
            </Stack>
          </NexaCard>
          <NexaCard
            title="Action styles"
            subtitle="Specimens of intent, scale, and progress."
          >
            <Stack spacing={4}>
              <Stack
                direction="row"
                useFlexGap
                spacing={3}
                sx={{ flexWrap: 'wrap' }}
              >
                <NexaButton size="small">Primary</NexaButton>
                <NexaButton variant="secondary" size="small">
                  Secondary
                </NexaButton>
                <NexaButton
                  variant="outlined"
                  size="small"
                  endIcon={<ArrowForward />}
                >
                  Outlined
                </NexaButton>
                <NexaButton variant="text" size="small">
                  Text
                </NexaButton>
                <NexaButton variant="destructive" size="small">
                  Destructive
                </NexaButton>
              </Stack>
              <Stack
                direction="row"
                useFlexGap
                spacing={3}
                sx={{ flexWrap: 'wrap' }}
              >
                <NexaButton loading>Saving</NexaButton>
                <NexaButton disabled>Unavailable</NexaButton>
              </Stack>
              <Typography variant="body2" color="text.secondary">
                These buttons show visual states. Use the settings form to try a
                complete interaction.
              </Typography>
            </Stack>
          </NexaCard>
        </Stack>
      </Box>
      <NexaDialog
        open={open}
        title="Save workspace settings?"
        description="Review the settings below before applying your changes."
        loading={saving}
        onClose={() => setOpen(false)}
        primaryAction={{
          label: 'Save changes',
          onClick: () => {
            void save()
          },
        }}
      >
        <Box
          component="dl"
          sx={{
            m: 0,
            '& dt': { fontWeight: 700, mt: 3 },
            '& dd': { m: 0, overflowWrap: 'anywhere' },
          }}
        >
          <dt>Workspace</dt>
          <dd>{name}</dd>
          <dt>Cost center</dt>
          <dd>{code || 'Not specified'}</dd>
          <dt>Region</dt>
          <dd>{regions.find((item) => item.value === region)?.label}</dd>
          <dt>Access</dt>
          <dd>{accessOptions.find((item) => item.value === access)?.label}</dd>
          <dt>Weekly digest</dt>
          <dd>{digest ? 'Enabled' : 'Disabled'}</dd>
        </Box>
      </NexaDialog>
    </Box>
  )
}
