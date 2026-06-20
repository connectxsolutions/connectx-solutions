import { connectDB } from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Db, Collection } from 'mongodb'

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db: Db = await connectDB()
    const collection: Collection = db.collection('contact_messages')

    const messages = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return Response.json(messages)
  } catch (error) {
    console.error('Admin messages API error:', error)
    return Response.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}
