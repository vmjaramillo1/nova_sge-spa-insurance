import { BASE_PATH } from '@app/utils/constants'
import store from '@app/store'
import { useSmartContext } from '@app/context/smart-context'

import { smartFormat } from '@app/utils/format'
import { smartParse } from '@app/utils/common'
import { formats } from '@app/utils/format'

type ContextObject = Record<string, unknown>

const publicEnv = {
  baseUrl: BASE_PATH,
}

function getSmartContext(context: ContextObject = {}) {
  const values = store.getState()

  return {
    public: publicEnv,
    app: values.app,
    flow: values.flow,
    ...context,
  }
}

const useSmartValues = (context: ContextObject = {}) => {
  const smartContextValues = useSmartContext()

  return {
    ...getSmartContext(context),
    ...smartContextValues,
  }
}

export function SmartContent(
  props: Readonly<{ children: string; context?: ContextObject }>
) {
  const context = useSmartValues(props?.context)
  return <>{smartParse(props?.children ?? '', context)}</>
}

export function smartText(content: string, context: ContextObject = {}) {
  const smartContext = getSmartContext(context)
  return smartFormat(content ?? '', smartContext, formats)
}
