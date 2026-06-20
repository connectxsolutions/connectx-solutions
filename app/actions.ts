'use server'

import { connectDB } from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ObjectId } from 'mongodb'
import { Db, Collection } from 'mongodb'

export async function createProject(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Unauthorized')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const content = formData.get('content') as string
  const tags = (formData.get('tags') as string)?.split(',').filter(Boolean) || []
  const client = formData.get('client') as string
  const published = formData.get('published') === 'on'

  if (!title || !description) {
    throw new Error('Title and description are required')
  }

  const db: Db = await connectDB()
  const collection: Collection = db.collection('projects')

  const result = await collection.insertOne({
    title,
    description,
    content,
    tags,
    client,
    published,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  return { _id: result.insertedId }
}

export async function updateProject(id: string, formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Unauthorized')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const content = formData.get('content') as string
  const tags = (formData.get('tags') as string)?.split(',').filter(Boolean) || []
  const client = formData.get('client') as string
  const published = formData.get('published') === 'on'

  if (!title || !description) {
    throw new Error('Title and description are required')
  }

  const db: Db = await connectDB()
  const collection: Collection = db.collection('projects')

  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title,
        description,
        content,
        tags,
        client,
        published,
        updatedAt: new Date()
      }
    }
  )

  return { _id: id }
}

export async function createService(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Unauthorized')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const icon = formData.get('icon') as string

  if (!title || !description) {
    throw new Error('Title and description are required')
  }

  const db: Db = await connectDB()
  const collection: Collection = db.collection('services')

  const result = await collection.insertOne({
    title,
    description,
    icon,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  return { _id: result.insertedId }
}

export async function updateService(id: string, formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Unauthorized')
  }

  const title = formData.get('title') as string
  const description = formData.get('description') as string
  const icon = formData.get('icon') as string

  if (!title || !description) {
    throw new Error('Title and description are required')
  }

  const db: Db = await connectDB()
  const collection: Collection = db.collection('services')

  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        title,
        description,
        icon,
        updatedAt: new Date()
      }
    }
  )

  return { _id: id }
}

export async function createTestimonial(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Unauthorized')
  }

  const author = formData.get('author') as string
  const role = formData.get('role') as string
  const text = formData.get('text') as string
  const rating = parseInt(formData.get('rating') as string) || 5

  if (!author || !text) {
    throw new Error('Author and text are required')
  }

  const db: Db = await connectDB()
  const collection: Collection = db.collection('testimonials')

  const result = await collection.insertOne({
    author,
    role,
    text,
    rating,
    createdAt: new Date(),
    updatedAt: new Date()
  })

  return { _id: result.insertedId }
}

export async function updateTestimonial(id: string, formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error('Unauthorized')
  }

  const author = formData.get('author') as string
  const role = formData.get('role') as string
  const text = formData.get('text') as string
  const rating = parseInt(formData.get('rating') as string) || 5

  if (!author || !text) {
    throw new Error('Author and text are required')
  }

  const db: Db = await connectDB()
  const collection: Collection = db.collection('testimonials')

  await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        author,
        role,
        text,
        rating,
        updatedAt: new Date()
      }
    }
  )

  return { _id: id }
}
