import { AddAccount, AddAccountModel, AddAccountRepository, Encrypter } from './protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository
  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<any> {
    const passwordHashed = await this.encrypter.encrypt(accountData.password)

    await this.addAccountRepository.add(Object.assign({}, accountData, { password: passwordHashed }))

    return await new Promise((resolve) => resolve(null))
  }
}
