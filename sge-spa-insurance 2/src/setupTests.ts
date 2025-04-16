// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import 'jest-canvas-mock'
import { matchers } from '@emotion/jest'

expect.extend(matchers)

process.env.REACT_APP_INSURANCE_PUBLIC_KEY =
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCxi0JF/mdemGCffB+JgEvL/GBJnM8hMHjc4Z2US1kvakTYnTvzQPzAcoMLee4vOkLVUFhb6s2SNTnZc6BiL70nqemVoWCH52rJJYbPtE+/sc77rP/dsxwySB9I91ksjD5AG6wj414oYYtJ4c/MzNfTtirnIG10ToZmuzdvaTNkswIDAQAB'
