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
    const collection: Collection = db.collection('projects')

    const projects = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    const serializedProjects = projects.map(project => ({
      ...project,
      _id: project._id.toString(),
      createdAt: project.createdAt instanceof Date ? project.createdAt.toISOString() : project.createdAt,
      updatedAt: project.updatedAt instanceof Date ? project.updatedAt.toISOString() : project.updatedAt,
    }))

    return Response.json(serializedProjects)
  } catch (error) {
    console.error('Admin projects API error:', error)
    return Response.json(
      { error: 'Failed to fetch projects' },
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

    const { title, description, content, image, tags, client, published } = await req.json()

    if (!title || !description) {
      return Response.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const db: Db = await connectDB()
    const collection: Collection = db.collection('projects')

    const result = await collection.insertOne({
      title,
      description,
      content,
      image,
      tags: tags || [],
      client,
      published: published || false,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    return Response.json(
      { _id: result.insertedId.toString(), ...{ title, description } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Admin projects POST error:', error)
    return Response.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
