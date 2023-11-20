import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorizationUrl: GOOGLE_AUTHORIZATION_URL,
            authorization: {
                params: {
                    scope: "openid email profile https://www.googleapis.com/auth/drive",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({token, account, profile}) {
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({session, token, user}) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
