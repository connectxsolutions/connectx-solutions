import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { getDatabase } from './mongodb'
import { z } from 'zod'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const db = await getDatabase()
          const user = await db.collection('users').findOne({ email: credentials.email })

          if (!user) {
            return null
          }

          // In production, use bcrypt to compare passwords
          if (user.password !== credentials.password) {
            return null
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || 'user',
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id
        token.role = user.role || 'user'
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google' && user.email) {
        try {
          const db = await getDatabase()
          const existingUser = await db.collection('users').findOne({ email: user.email })

          if (!existingUser) {
            await db.collection('users').insertOne({
              email: user.email,
              name: user.name,
              image: user.image,
              provider: 'google',
              role: 'user',
              createdAt: new Date(),
            })
          }
        } catch (error) {
          console.error('SignIn error:', error)
        }
      }
      return true
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
}
