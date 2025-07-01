import { getFavoriteAccountHash } from './utils'
import { AppAccounts } from '@app/store/reducers/app-slice/app-slice.interface'

describe('getFavoriteAccountHash', () => {
  it('should return the hash of the favorite account if it exists', () => {
    const accounts: AppAccounts = {
      accounts: {
        '4f356a5446717258743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d':
          {
            hash: '4f356a5446717258743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d',
            mask: '210021****',
            type: 'CTA.CTE PERSONAL',
            balance: 200,
            alias: 'ytytyty',
            favorite: false,
            allowsTransact: true,
            paymentType: 'CHECKING_ACCOUNT',
          },
        '644552306d7a4758584f4639473461694e6e4a7a6f657454516a42514a34594e75695a3736772f627775593d':
          {
            hash: '644552306d7a4758584f4639473461694e6e4a7a6f657454516a42514a34594e75695a3736772f627775593d',
            mask: '220404****',
            type: 'TRANSACCIONAL TRADICIONAL',
            balance: 20000,
            alias: 'fdfdf',
            favorite: false,
            allowsTransact: true,
            paymentType: 'SAVINGS_ACCOUNT',
          },
        '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d':
          {
            hash: '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
            mask: '221264****',
            type: 'Cuenta de AhorroTransaccional',
            balance: 29,
            alias: 'uyutty',
            favorite: true,
            allowsTransact: true,
            paymentType: 'SAVINGS_ACCOUNT',
          },
      },
      cards: {
        '54353454353743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d':
          {
            hash: '54353454353743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d',
            mask: '5555 5555 5555 4444',
            type: 'PERSONAL',
            balance: 4000.0,
            alias: 'TARJETA',
            favorite: false,
            allowsTransact: true,
            paymentType: 'UNKNOWN',
          },
      },
    }
    expect(getFavoriteAccountHash(accounts)).toBe(
      '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d'
    )
  })

  it('should return the hash of the first account if no favorite account exists', () => {
    const accounts: AppAccounts = {
      accounts: {
        '4f356a5446717258743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d':
          {
            hash: '4f356a5446717258743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d',
            mask: '210021****',
            type: 'CTA.CTE PERSONAL',
            balance: 200,
            alias: 'ytytyty',
            favorite: false,
            allowsTransact: true,
            paymentType: 'CHECKING_ACCOUNT',
          },
        '644552306d7a4758584f4639473461694e6e4a7a6f657454516a42514a34594e75695a3736772f627775593d':
          {
            hash: '644552306d7a4758584f4639473461694e6e4a7a6f657454516a42514a34594e75695a3736772f627775593d',
            mask: '220404****',
            type: 'TRANSACCIONAL TRADICIONAL',
            balance: 20000,
            alias: 'fdfdf',
            favorite: false,
            allowsTransact: true,
            paymentType: 'SAVINGS_ACCOUNT',
          },
        '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d':
          {
            hash: '727653384647637a774b5a7077486c595a3467516258316a4f7432694273727379625875583637366331453d',
            mask: '221264****',
            type: 'Cuenta de AhorroTransaccional',
            balance: 29,
            alias: 'uyutty',
            favorite: false,
            allowsTransact: true,
            paymentType: 'SAVINGS_ACCOUNT',
          },
      },
      cards: {
        '54353454353743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d':
          {
            hash: '54353454353743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d',
            mask: '5555 5555 5555 4444',
            type: 'PERSONAL',
            balance: 4000.0,
            alias: 'TARJETA',
            favorite: false,
            allowsTransact: true,
            paymentType: 'UNKNOWN',
          },
      },
    }
    expect(getFavoriteAccountHash(accounts)).toBe(
      '4f356a5446717258743858436149306c317a2b5653396b74384e67454168735350624e5850775135476e413d'
    )
  })
})
