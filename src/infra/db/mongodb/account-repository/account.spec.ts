import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'

const collectionName = 'accounts'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection(collectionName)
    await accountCollection.deleteMany({})
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an account on success', async () => {
    const sut = makeSut()

    const newAccount = {
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password'
    }

    const account = await sut.add(newAccount)

    expect(account.id).toBeTruthy()
    expect(account.name).toBe(newAccount.name)
    expect(account.email).toBe(newAccount.email)
    expect(account.password).toBe(newAccount.password)
  })
})
