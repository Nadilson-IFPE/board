import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import firebase from "./../../../services/firebaseConnection";

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

  callbacks: {
    async session(session, profile) {
      try {
        const lastDonate = await firebase
          .firestore()
          .collection("usuarios")
          .doc(String(profile.sub))
          .get()
          .then((snapshot) => {
            if (snapshot.exists) {
              return snapshot.data().lastDonate.toDate();
            } else {
              return null; // Usuário não é apoiador.
            }
          });
        return {
          ...session,
          id: profile.sub,
          vip: lastDonate ? true : false,
          lastDonate: lastDonate,
        };
      } catch {
        return {
          ...session,
          id: null,
          vip: false,
          lastDonate: null,
        };
      }
    },
    async signIn(user, account, profile) {
      const { email } = user;
      try {
        return true;
      } catch (err) {
        console.log("DEU ERRO: ", err);
        return false;
      }
    },
  },
});
