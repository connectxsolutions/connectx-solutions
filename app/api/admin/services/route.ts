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
    const collection: Collection = db.collection('services')

    const services = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return Response.json(services)
  } catch (error) {
    console.error('Admin services API error:', error)
    return Response.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, icon } = await req.json()

    if (!title || !description) {
      return Response.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const db: Db = await connectDB()
    const collection: Collection = db.collection('services')

    const result = await collection.insertOne({
      title,
      description,
      icon,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return Response.json(
      { _id: result.insertedId, ...{ title, description } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Admin services POST error:', error)
    return Response.json(
      { error: 'Failed to create service' },
      { status: 500 }
    )
  }
}
