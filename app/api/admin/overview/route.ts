import { connectDB } from '@/lib/mongodb'
import { Db } from 'mongodb';


interface OverviewStats {
  projects: number;
  services: number;
  testimonials: number;
  messages: number;
  users: number;
}

export async function GET() {
  try {
 

    const db: Db = await connectDB()

    // Fetch counts directly from the database for performance.
    const [projects, services, testimonials, messages, users] = await Promise.all([
      db.collection('projects').countDocuments(),
      db.collection('services').countDocuments(),
      db.collection('testimonials').countDocuments(),
      db.collection('contact_messages').countDocuments(),
      db.collection('users').countDocuments()
    ])

    return Response.json({ projects, services, testimonials, messages, users } as OverviewStats);
  } catch (error) {
    console.error('Admin overview API error:', error)
    return Response.json({ error: 'Failed to fetch statistics' }, { status: 500 })
  }
}