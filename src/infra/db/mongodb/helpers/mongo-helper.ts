import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as unknown as MongoClient,

  async connect (uri: string = process.env.MONGO_URL ?? '') {
    this.client = await MongoClient.connect(uri, {})
  },

  async disconnect () {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (item: any): any => {
    const { _id, ...rest } = item
    return Object.assign({}, rest, { id: _id })
  }
}
