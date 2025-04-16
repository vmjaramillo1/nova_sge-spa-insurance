import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  AppMessage,
  MessageService,
  WebviewMessages,
} from '@pichincha/events-microsite'

const useRouterEvent = () => {
  const location = useLocation()

  useEffect(() => {
    const message: AppMessage = {
      type: WebviewMessages.ROUTER_EVENT,
      url: location.pathname,
    }

    MessageService.sendMessage(message)
  }, [location])
}

export default useRouterEvent
