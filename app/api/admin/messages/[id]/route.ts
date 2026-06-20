import { connectDB } from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ObjectId } from 'mongodb'
import { Db, Collection } from 'mongodb'

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db: Db = await connectDB()
    const collection: Collection = db.collection('contact_messages')

    await collection.deleteOne({ _id: new ObjectId(params.id) })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Delete message error:', error)
    return Response.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    )
  }
}
