import { NuxtAuthHandler } from "#auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NuxtAuthHandler({
  secret: "SECRET",
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider.default({
      authorize: async (credentials: any, _req: any) => {
        const user = {
          id: 3,
          email: "test@test.com",
          password: "test",
        };
        if (
          credentials.email === user.email &&
          credentials.password === user.password
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
});
