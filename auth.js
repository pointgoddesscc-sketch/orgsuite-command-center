import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
        const refreshToken = account.refresh_token ?? token.googleRefreshToken;
        // A Gmail-enabled session must have an offline refresh token. Keep
        // the JWT structurally valid, but mark it unusable if one is missing.
        if (!refreshToken) {
          delete token.googleAccessToken;
          delete token.googleRefreshToken;
          delete token.googleAccessTokenExpires;
          token.googleAuthError = "MissingRefreshToken";
          return token;
        }

        token.googleAccessToken = account.access_token;
        token.googleRefreshToken = refreshToken;
        delete token.googleAuthError;
        // Google account.expires_at is Unix seconds; JWT uses milliseconds.
        token.googleAccessTokenExpires = account.expires_at
          ? account.expires_at * 1000
          : null;
        token.googleScope = account.scope ?? "";
      }

      if (!token.googleRefreshToken) token.googleAuthError = "MissingRefreshToken";
      return token;
    },
    async session({ session, token }) {
      // A tokenless Google JWT must not become an authenticated app session.
      if (token.googleAuthError || !token.googleRefreshToken) return null;
      // Provider tokens deliberately remain out of the browser-visible session.
      return session;
    }
  }
});
