import {
  stringFormat,
  isValid,
  sortArrayBy,
  isLastItemInArray,
  isStringTruthy,
  formatPemKeys,
  calculateAcceptanceNextStatus,
  arrayIsEmpty,
} from '.'
import { FlowStatus } from '../enums'

describe('stringFormat', () => {
  it('should replace string params', () => {
    const sentence = 'This is a basic {0} of {1}'
    const sentenceParams = ['test', 'jest']
    const expectResult = 'This is a basic test of jest'

    expect(stringFormat(sentence, sentenceParams)).toBe(expectResult)
  })

  it('should replace number params', () => {
    const sentence = 'First number is {0}, and last number is {1}'
    const sentenceParams = [1, 9]
    const expectResult = 'First number is 1, and last number is 9'

    expect(stringFormat(sentence, sentenceParams)).toBe(expectResult)
  })

  it('should replace string and number params', () => {
    const sentence = 'First name is {0}, lastName is {1}, and age is {2}'
    const sentenceParams = ['Daniel', 'Gonzales', 40]
    const expectResult = 'First name is Daniel, lastName is Gonzales, and age is 40'

    expect(stringFormat(sentence, sentenceParams)).toBe(expectResult)
  })

  it('should return same input', () => {
    const sentence = 'This is a basic {0} of {1}'

    expect(stringFormat(sentence, [])).toBe(sentence)
  })
})

describe('isValid', () => {
  it('should return true if value is valid', () => {
    const value = 'test'

    expect(isValid(value)).toBe(true)
  })

  it('should return false if value is invalid', () => {
    expect(isValid(null)).toBe(false)
    expect(isValid(undefined)).toBe(false)
  })
})

describe('sortArrayBy', () => {
  it('should return array sorted by order', () => {
    const unsortedArray = [{ order: 2 }, { order: 1 }, { order: 3 }]

    const sortedArray = [{ order: 1 }, { order: 2 }, { order: 3 }]

    expect(sortArrayBy(unsortedArray, 'order')).toEqual(sortedArray)
  })
})

describe('isLastItemInArray', () => {
  it('should return true if item is last in array', () => {
    const array = [1, 2, 3]

    const isLast = isLastItemInArray(array, 2)

    expect(isLast).toBe(true)
  })

  it('should return false if item is not last in array', () => {
    const array = [1, 2, 3]

    const isLast = isLastItemInArray(array, 1)

    expect(isLast).toBe(false)
  })
})

describe('isStringTruthy', () => {
  it('should return true if string is truthy', () => {
    const resultTrueString = isStringTruthy('true')
    const resultTrueOne = isStringTruthy('1')

    const resultFalseString = isStringTruthy('false')
    const resultFalseZero = isStringTruthy('0')
    const resultFalseNull = isStringTruthy(null as never)

    expect(resultTrueString).toBe(true)
    expect(resultTrueOne).toBe(true)
    expect(resultFalseString).toBe(false)
    expect(resultFalseZero).toBe(false)
    expect(resultFalseNull).toBe(false)
  })
})

describe('formatPemKeys', () => {
  it('should return format pemKey', () => {
    const result = formatPemKeys(
      'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7gk7LSke+An0Xa3xFuHZCEfmACvUSzaBk/uNLA8P7vJAoctr1OHKUTArkknSQ3V9bIZwHkWG7JW2UQChBs2bs99bowVWEy3iksIg4SEZ/F2Fm9FXEQRFCnh/qwTKuClT19R8SOLVCTLYfTd0NOJbYTzCMwsJoS4i5RyStwugL2wIDAQAB',
      'public'
    )

    expect(result).toBe(
      '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7gk7LSke+An0Xa3xFuHZCEfmACvUSzaBk/uNLA8P7vJAoctr1OHKUTArkknSQ3V9bIZwHkWG7JW2UQChBs2bs99bowVWEy3iksIg4SEZ/F2Fm9FXEQRFCnh/qwTKuClT19R8SOLVCTLYfTd0NOJbYTzCMwsJoS4i5RyStwugL2wIDAQAB\n-----END PUBLIC KEY-----'
    )
  })

  it('should return the same input if it is already in pem format', () => {
    const result = formatPemKeys(
      '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7gk7LSke+An0Xa3xFuHZCEfmACvUSzaBk/uNLA8P7vJAoctr1OHKUTArkknSQ3V9bIZwHkWG7JW2UQChBs2bs99bowVWEy3iksIg4SEZ/F2Fm9FXEQRFCnh/qwTKuClT19R8SOLVCTLYfTd0NOJbYTzCMwsJoS4i5RyStwugL2wIDAQAB\n-----END PUBLIC KEY-----',
      'public'
    )

    expect(result).toBe(
      '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7gk7LSke+An0Xa3xFuHZCEfmACvUSzaBk/uNLA8P7vJAoctr1OHKUTArkknSQ3V9bIZwHkWG7JW2UQChBs2bs99bowVWEy3iksIg4SEZ/F2Fm9FXEQRFCnh/qwTKuClT19R8SOLVCTLYfTd0NOJbYTzCMwsJoS4i5RyStwugL2wIDAQAB\n-----END PUBLIC KEY-----'
    )
  })
})

describe('calculateAcceptanceNextStatus', () => {
  it('should return status last when is initial', () => {
    const result = calculateAcceptanceNextStatus(FlowStatus.RETRY_ACCEPTANCE_INITIAL)
    expect(result).toBe(FlowStatus.RETRY_ACCEPTANCE_LAST)
  })

  it('should return status error when is last', () => {
    const result = calculateAcceptanceNextStatus(FlowStatus.RETRY_ACCEPTANCE_LAST)
    expect(result).toBe(FlowStatus.RETRY_ACCEPTANCE_ERROR)
  })

  it('should return status initial default', () => {
    const result = calculateAcceptanceNextStatus(FlowStatus.RETRY_ACCEPTANCE_ERROR)
    expect(result).toBe(FlowStatus.RETRY_ACCEPTANCE_INITIAL)
  })
})

describe('arrayIsEmpty', () => {
  it('should return true if array is null', () => {
    const result = arrayIsEmpty(null)
    expect(result).toBe(true)
  })

  it('should return true if array is undefined', () => {
    const result = arrayIsEmpty()
    expect(result).toBe(true)
  })

  it('should return true if array is empty', () => {
    const result = arrayIsEmpty([])
    expect(result).toBe(true)
  })

  it('should return false if array is not empty', () => {
    const result = arrayIsEmpty([1, 2, 3])
    expect(result).toBe(false)
  })
})
