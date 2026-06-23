import { connectDB } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { Db, Collection } from 'mongodb'

// 1. تحديث الـ Type الخاص بـ params ليكون Promise
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 2. فك الـ Promise لاستخراج الـ id بأمان
    const { id } = await params

    // التحقق من صحة الـ ObjectId قبل الاستعلام لتجنب انهيار التطبيق (Crash)
    if (!ObjectId.isValid(id)) {
      return Response.json(
        { error: 'Invalid project ID format' },
        { status: 400 }
      )
    }

    const db: Db = await connectDB()
    const collection: Collection = db.collection('projects')

    // الاستعلام باستخدام الـ id المستخرج مباشرة
    const project = await collection.findOne({
      _id: new ObjectId(id),
      published: true,
    })

    if (!project) {
      return Response.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // 3. إرجاع البيانات بعد تحويل المعطيات المعقدة إلى نصوص (Strings)
    return Response.json({
      ...project,
      _id: project._id.toString(),
      createdAt:
        project.createdAt instanceof Date
          ? project.createdAt.toISOString()
          : project.createdAt,
      updatedAt:
        project.updatedAt instanceof Date
          ? project.updatedAt.toISOString()
          : project.updatedAt,
    })
  } catch (error) {
    console.error('Project detail API error:', error)
    return Response.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}