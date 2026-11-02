import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/gmail.readonly",
          access_type: "offline",
          prompt: "consent",
          response_type: "code"
        }
      }
    })
  ],
  pages: { signIn: "/sign-in" },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "google") {
        token.googleAccessToken = account.access_token;
        token.googleRefreshToken = account.refresh_token ?? token.googleRefreshToken;
        token.googleAccessTokenExpires = account.expires_at ? account.expires_at * 1000 : null;
        token.googleScope = account.scope ?? "";
      }
      return token;
    },
    async session({ session }) {
      // Provider tokens deliberately remain out of the browser-visible session.
      return session;
    }
  }
});
