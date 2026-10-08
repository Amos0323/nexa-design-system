import { lazy, Suspense } from 'react'
import { EnterpriseSection } from './demo/EnterpriseSection'
import { NexaLoadingState } from './components/Feedback/NexaLoadingState'
import { ComponentsShowcase } from './demo/ComponentsShowcase'
import { FoundationsDemo } from './foundations/FoundationsDemo'
import { NexaProvider } from './theme/NexaProvider'
const EnterpriseShowcase = lazy(() =>
  import('./demo/EnterpriseShowcase').then((module) => ({
    default: module.EnterpriseShowcase,
  })),
)
export default function App() {
  const enterprise =
    new URLSearchParams(window.location.search).get('view') === 'enterprise'
  return (
    <NexaProvider>
      {enterprise ? (
        <Suspense
          fallback={<NexaLoadingState label="Loading enterprise components…" />}
        >
          <EnterpriseShowcase />
        </Suspense>
      ) : (
        <FoundationsDemo>
          <ComponentsShowcase />
          <EnterpriseSection />
        </FoundationsDemo>
      )}
    </NexaProvider>
  )
}
