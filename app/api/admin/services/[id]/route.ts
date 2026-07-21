import { connectDB } from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ObjectId } from 'mongodb'
import { Db, Collection } from 'mongodb'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    if (!ObjectId.isValid(id)) {
      return Response.json({ error: 'Invalid service ID' }, { status: 400 })
    }

    const db: Db = await connectDB()
    const collection: Collection = db.collection('services')

    const service = await collection.findOne({ _id: new ObjectId(id) })

    if (!service) {
      return Response.json({ error: 'Service not found' }, { status: 404 })
    }

    return Response.json({
      ...service,
      _id: service._id.toString(),
      createdAt: service.createdAt instanceof Date ? service.createdAt.toISOString() : service.createdAt,
      updatedAt: service.updatedAt instanceof Date ? service.updatedAt.toISOString() : service.updatedAt,
    })
  } catch (error) {
    console.error('Get service error:', error)
    return Response.json({ error: 'Failed to fetch service' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const db: Db = await connectDB()
    const collection: Collection = db.collection('services')

    await collection.deleteOne({ _id: new ObjectId(id) })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Delete service error:', error)
    return Response.json(
      { error: 'Failed to delete service' },
      { status: 500 }
    )
  }
}
