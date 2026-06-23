import { connectDB } from '@/lib/mongodb'
import { Db, Collection } from 'mongodb'

export async function GET() {
  try {
    const db: Db = await connectDB()
    const collection: Collection = db.collection('projects')

    const projects = await collection
      .find({ published: true })
      .sort({ createdAt: -1 })
      .limit(12)
      .toArray()

    const serializedProjects = projects.map(project => ({
      ...project,
      _id: project._id.toString(),
      createdAt: project.createdAt instanceof Date ? project.createdAt.toISOString() : project.createdAt,
      updatedAt: project.updatedAt instanceof Date ? project.updatedAt.toISOString() : project.updatedAt,
    }))

    return Response.json(serializedProjects)
  } catch (error) {
    console.error('Projects API error:', error)
    return Response.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
