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
      return Response.json({ error: 'Invalid testimonial ID' }, { status: 400 })
    }

    const db: Db = await connectDB()
    const collection: Collection = db.collection('testimonials')

    const testimonial = await collection.findOne({ _id: new ObjectId(id) })

    if (!testimonial) {
      return Response.json({ error: 'Testimonial not found' }, { status: 404 })
    }

    return Response.json({
      ...testimonial,
      _id: testimonial._id.toString(),
      createdAt: testimonial.createdAt instanceof Date ? testimonial.createdAt.toISOString() : testimonial.createdAt,
      updatedAt: testimonial.updatedAt instanceof Date ? testimonial.updatedAt.toISOString() : testimonial.updatedAt,
    })
  } catch (error) {
    console.error('Get testimonial error:', error)
    return Response.json({ error: 'Failed to fetch testimonial' }, { status: 500 })
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
    const collection: Collection = db.collection('testimonials')

    await collection.deleteOne({ _id: new ObjectId(id) })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Delete testimonial error:', error)
    return Response.json(
      { error: 'Failed to delete testimonial' },
      { status: 500 }
    )
  }
}
