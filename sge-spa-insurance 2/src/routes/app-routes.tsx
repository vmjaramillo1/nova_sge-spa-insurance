import { createBrowserRouter } from 'react-router-dom'

import { BASE_PATH } from '@app/utils/constants'

import Layout from '@app/components/molecules/layout'

import fraudRoutes from './fraud'
import hubRoutes from './hub'

const appRoutes = createBrowserRouter([
  {
    path: BASE_PATH,
    element: <Layout />,
    children: [...fraudRoutes, ...hubRoutes],
  },
])

export default appRoutes
