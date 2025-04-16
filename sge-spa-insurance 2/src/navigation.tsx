import { BrowserRouter } from 'react-router-dom'
import AppRoutes from '@app/routes/app-routes'

const Navigation = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)

export default Navigation
