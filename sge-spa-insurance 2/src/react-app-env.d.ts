/// <reference types="react-scripts" />
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    REACT_APP_INSURANCE_SERVICE?: string
    REACT_APP_INSURANCE_PUBLIC_KEY?: string
    REACT_APP_PUBLIC_KEY_512?: string
    REACT_APP_EXTERNAL_FLOW_ACCOUNT_URL?: string
  }
}
