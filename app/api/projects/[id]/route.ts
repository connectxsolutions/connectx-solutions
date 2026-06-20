import { connectDB } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { Db, Collection } from 'mongodb'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const db: Db = await connectDB()
    const collection: Collection = db.collection('projects')

    const project = await collection.findOne({
      _id: new ObjectId(params.id),
      published: true
    })

    if (!project) {
      return Response.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return Response.json(project)
  } catch (error) {
    console.error('Project detail API error:', error)
    return Response.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}
