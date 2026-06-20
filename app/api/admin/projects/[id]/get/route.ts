import { connectDB } from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ObjectId } from 'mongodb'
import { Db, Collection } from 'mongodb'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db: Db = await connectDB()
    const collection: Collection = db.collection('projects')

    const project = await collection.findOne({
      _id: new ObjectId(params.id)
    })

    if (!project) {
      return Response.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return Response.json(project)
  } catch (error) {
    console.error('Get project error:', error)
    return Response.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}
