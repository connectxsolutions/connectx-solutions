import { ObjectId } from 'mongodb'

export interface User {
  _id?: ObjectId
  email: string
  name?: string
  image?: string
  password?: string
  role: 'admin' | 'user'
  provider?: string
  createdAt: Date
}

export interface Project {
  _id?: ObjectId
  title: string
  description: string
  image: string
  category: string
  technologies: string[]
  link?: string
  createdAt: Date
  featured: boolean
}

export interface Service {
  _id?: ObjectId
  title: string
  description: string
  icon: string
  features: string[]
  createdAt: Date
}

export interface Testimonial {
  _id?: ObjectId
  author: string
  role: string
  company: string
  content: string
  image?: string
  rating: number
  createdAt: Date
}

export interface ContactMessage {
  _id?: ObjectId
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
  read: boolean
}
