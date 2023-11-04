import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';

const authOption = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      redirect_uri: process.env.LinkedIn_Redirect,
      
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) {
        throw new Error('No profile'); // Corrected error syntax
      }
      return true;
    },
  },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
