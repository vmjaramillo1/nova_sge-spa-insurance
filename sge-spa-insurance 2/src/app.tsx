import { QueryClientProvider } from '@tanstack/react-query'
import { AppProvider } from './context/app-context'
import { FlowProvider } from './context/flow-context'
import { GlobalProvider } from './context/global-context'
import Navigation from './navigation'

import { queryClient } from '@app/config/queryClient'

function App() {
  return (
    <div data-testid="webviews-app" className="app-container">
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <AppProvider>
            <FlowProvider>
              <Navigation />
            </FlowProvider>
          </AppProvider>
        </GlobalProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
