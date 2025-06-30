import { QueryClientProvider } from '@tanstack/react-query'
import Navigation from './navigation'
import { Provider } from 'react-redux'
import store from '@app/store'

import { queryClient } from '@app/config/queryClient'

function App() {
  return (
    <div data-testid="webviews-app" className="app-container">
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </QueryClientProvider>
    </div>
  )
}

export default App
