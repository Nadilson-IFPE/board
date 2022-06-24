import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.GitHub({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
      scope: "read:user",
    }),
  ],

  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // Sessão vai durar 30 dias
  },
});
