import { OfferableWithType } from '@app/utils'
import { MergeOfferablePreviousType } from '@app/utils/enums'
import { getFavoriteAccountHash, isOffer, mergeOfferAndPrevious } from './utils'
import { AccountInfo, MergeOfferPreviousList } from '@app/services/insurance'

describe('isOffer', () => {
  it('should return true if any object in the array has type OFFER', () => {
    const list = [
      { type: MergeOfferablePreviousType.OFFER },
      { type: MergeOfferablePreviousType.PREVIOUS },
      { type: MergeOfferablePreviousType.OFFER },
    ]
    expect(isOffer(list)).toBe(true)
  })

  it('should return false if no object in the array has type OFFER', () => {
    const list = [
      { type: MergeOfferablePreviousType.PREVIOUS },
      { type: MergeOfferablePreviousType.PREVIOUS },
      { type: MergeOfferablePreviousType.PREVIOUS },
    ]
    expect(isOffer(list)).toBe(false)
  })

  it('should return false if the array is empty', () => {
    const list: Array<OfferableWithType> = []
    expect(isOffer(list)).toBe(false)
  })
})

describe('getFavoriteAccountHash', () => {
  it('should return the hash of the favorite account if it exists', () => {
    const accounts: Array<AccountInfo> = [
      {
        hash: 'hash1',
        favorite: false,
        mask: '1234',
        type: 'checking',
        balance: 1000,
        alias: 'My Checking Account',
        value: '1000 USD',
      },
      {
        hash: 'hash2',
        favorite: true,
        mask: '5678',
        type: 'savings',
        balance: 5000,
        alias: 'My Savings Account',
        value: '5000 USD',
      },
    ]
    expect(getFavoriteAccountHash(accounts)).toBe('hash2')
  })

  it('should return the hash of the first account if no favorite account exists', () => {
    const accounts: Array<AccountInfo> = [
      {
        hash: 'hash3',
        favorite: false,
        mask: '9012',
        type: 'credit',
        balance: -2000,
        alias: 'My Credit Card',
        value: '-2000 USD',
      },
      {
        mask: '5678',
        type: 'savings',
        balance: 5000,
        alias: 'My Savings Account',
        value: '5000 USD',
        favorite: false,
        hash: 'hash4',
      },
      {
        hash: 'hash3',
        favorite: false,
        mask: '9012',
        type: 'credit',
        balance: -2000,
        alias: 'My Credit Card',
        value: '-2000 USD',
      },
    ]
    expect(getFavoriteAccountHash(accounts)).toBe('hash3')
  })
})

describe('mergeOfferAndPrevious', () => {
  it('should return an empty array if no offerable or previous products are present', () => {
    const data: MergeOfferPreviousList = []
    expect(mergeOfferAndPrevious(data)).toEqual([])
  })

  it('should return an array appended with type', () => {
    const data: MergeOfferPreviousList = [
      {
        type: 1,
        data: [
          {
            code: 'code0',
          } as OfferableWithType,
        ],
      },
      {
        type: 2,
        data: [
          {
            code: 'code9',
          } as OfferableWithType,
        ],
      },
    ]

    expect(mergeOfferAndPrevious(data)).toEqual([
      {
        code: 'code0',
        type: MergeOfferablePreviousType.OFFER,
      },
      {
        code: 'code9',
        type: MergeOfferablePreviousType.PREVIOUS,
      },
    ])
  })

  it('should return an array of offerable products if only offerable products are present', () => {
    const data: MergeOfferPreviousList = [
      {
        type: 1,
        data: [
          {
            code: 'code1',
          } as OfferableWithType,
        ],
      },
    ]

    expect(
      mergeOfferAndPrevious(data).every(
        (item) => item.type === MergeOfferablePreviousType.OFFER
      )
    ).toBeTruthy()
  })

  it('should return an array of previous products if only previous products are present', () => {
    const data: MergeOfferPreviousList = [
      {
        type: 2,
        data: [
          {
            code: 'code2',
          } as OfferableWithType,
        ],
      },
      {
        type: 2,
        data: [
          {
            code: 'code3',
          } as OfferableWithType,
        ],
      },
    ]

    expect(
      mergeOfferAndPrevious(data).every(
        (item) => item.type === MergeOfferablePreviousType.PREVIOUS
      )
    ).toBeTruthy()
  })
})
