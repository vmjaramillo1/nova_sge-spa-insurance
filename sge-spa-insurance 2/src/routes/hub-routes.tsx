import { type RouteObject } from 'react-router-dom'
import { APP_ROUTES_CONFIG } from './config'

const HubRoutes: Array<RouteObject> = [
  {
    path: APP_ROUTES_CONFIG.HOME.path,
    element: <div>esto es una pruebba</div>,
    children: [
      {
        index: true,
        element: <>hijo del elemento</>,
      },
    ],
  },
  {
    path: APP_ROUTES_CONFIG.HOME.path + '/ele',
    element: <>elemento hijo</>,
  },
]

export default HubRoutes
