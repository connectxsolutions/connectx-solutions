import { connectDB } from '@/lib/mongodb'
import { ContactMessage } from '@/lib/types'
import { Db, Collection } from 'mongodb'

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    // Validate input
    if (!name || !email || !subject || !message) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const db: Db = await connectDB()
    const collection: Collection = db.collection('contact_messages')

    const result = await collection.insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
      read: false
    })

    return Response.json(
      { success: true, id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return Response.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
