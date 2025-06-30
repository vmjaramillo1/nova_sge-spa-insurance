import { BASE_PATH } from '@app/utils/constants'
import { useSmartContext } from '@app/components/atoms/smart-text/smart-context'
import { useStore } from 'react-redux'
import { smartFormat } from '@app/utils/format'
import { smartParse } from '@app/utils/common'
import { formats } from '@app/utils/format'
import { type RootState } from '@app/store'

type ContextObject = Record<string, unknown>

const publicEnv = {
  baseUrl: BASE_PATH,
}

const useSmartReduxContext = (context: Record<string, unknown> = {}) => {
  const store = useStore()
  const values = store.getState() as RootState

  return {
    public: publicEnv,
    ...values,
    ...context,
  }
}

const useSmartValues = (context: Record<string, unknown> = {}) => {
  return {
    ...useSmartReduxContext(context),
    ...useSmartContext(),
  }
}

export function SmartContent(
  props: Readonly<{ children: string; context?: ContextObject }>
) {
  const context = useSmartValues(props?.context)
  return <>{smartParse(props?.children ?? '', context)}</>
}

export function smartTextFromState(
  content: string,
  storeState: RootState,
  context: Record<string, unknown> = {}
) {
  const smartContext = {
    public: publicEnv,
    ...storeState,
    ...context,
  }

  return smartFormat(content ?? '', smartContext, formats)
}

export function useSmartText(
  content: string,
  context: Record<string, unknown> = {}
) {
  const smartContext = useSmartValues(context)
  return smartFormat(content ?? '', smartContext, formats)
}
