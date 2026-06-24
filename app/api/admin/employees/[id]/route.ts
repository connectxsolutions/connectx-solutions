import { connectDB } from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ObjectId } from 'mongodb'
import { hash } from 'bcryptjs'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = (await getServerSession(authOptions)) as any
    if (!session || session.user?.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name, email, password, role } = body

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 })
    }

    const db = await connectDB()
    const collection = db.collection('users')

    const existingUser = await collection.findOne({ email, _id: { $ne: new ObjectId(id) } })
    if (existingUser) {
      return Response.json({ error: 'Email already in use' }, { status: 400 })
    }

    const updateFields: Record<string, unknown> = {
      email,
      name,
      role: role === 'admin' ? 'admin' : 'user',
      updatedAt: new Date(),
    }

    if (password) {
      updateFields.password = await hash(password, 10)
    }

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    )

    return Response.json({ success: true })
  } catch (error) {
    console.error('Employees PATCH error:', error)
    return Response.json({ error: 'Failed to update employee' }, { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = (await getServerSession(authOptions)) as any
    if (!session || session.user?.role !== 'admin') {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const db = await connectDB()
    const collection = db.collection('users')

    const { id } = await params
    await collection.deleteOne({ _id: new ObjectId(id) })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Employees DELETE error:', error)
    return Response.json({ error: 'Failed to delete employee' }, { status: 500 })
  }
}
