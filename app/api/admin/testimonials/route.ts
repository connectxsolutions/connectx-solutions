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
    const collection: Collection = db.collection('testimonials')

    const testimonials = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return Response.json(testimonials)
  } catch (error) {
    console.error('Admin testimonials API error:', error)
    return Response.json(
      { error: 'Failed to fetch testimonials' },
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

    const { author, role, text, rating } = await req.json()

    if (!author || !text) {
      return Response.json(
        { error: 'Author and text are required' },
        { status: 400 }
      )
    }

    const db: Db = await connectDB()
    const collection: Collection = db.collection('testimonials')

    const result = await collection.insertOne({
      author,
      role,
      text,
      rating: rating || 5,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return Response.json(
      { _id: result.insertedId, ...{ author, text } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Admin testimonials POST error:', error)
    return Response.json(
      { error: 'Failed to create testimonial' },
      { status: 500 }
    )
  }
}
