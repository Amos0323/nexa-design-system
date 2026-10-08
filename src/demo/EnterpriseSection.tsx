import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
export function EnterpriseSection() {
  return (
    <Box
      component="section"
      aria-labelledby="enterprise-title"
      sx={{
        mt: 16,
        p: 6,
        bgcolor: 'background.paper',
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
      }}
    >
      <Typography id="enterprise-title" variant="h2" component="h2">
        Enterprise Components
      </Typography>
      <Typography sx={{ mt: 3, mb: 4 }}>
        Explore the Learning Administration showcase: responsive navigation,
        metrics, date inputs, and the community MUI X Data Grid.
      </Typography>
      <Link href="?view=enterprise">Open enterprise showcase</Link>
    </Box>
  )
}
