import { MongoClient, Db } from 'mongodb'

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const mongoUri = process.env.MONGODB_URI
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not set')
  }

  const client = await MongoClient.connect(mongoUri)
  const db = client.db('connectx')

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function getDatabase(): Promise<Db> {
  const { db } = await connectToDatabase()
  return db
}

export async function closeDatabase(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
    cachedDb = null
  }
}

// Alias for compatibility
export async function connectDB(): Promise<Db> {
  return getDatabase()
}
