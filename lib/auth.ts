import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getDatabase } from './mongodb'
import { compare } from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Employee Login',
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

          if (!user || !user.password) {
            return null
          }

          const isValid = await compare(credentials.password, user.password)
          if (!isValid) {
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
    async jwt(params: any) {
      const { token, user } = params as any
      if (user) {
        const typedToken = token as any
        const typedUser = user as any
        typedToken.id = typedUser.id
        typedToken.role = typedUser.role || 'user'
        return typedToken
      }
      return token
    },
    async session(params: any) {
      const { session, token } = params as any
      if (session?.user) {
        const typedSessionUser = session.user as any
        typedSessionUser.id = token.id as string
        typedSessionUser.role = token.role as string
        session.user = typedSessionUser
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
}
