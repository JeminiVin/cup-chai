import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import GithubProvider from 'next-auth/providers/github';
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectDB from '@/db/connectDB'



export const authoptions = NextAuth({
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        // FacebookProvider({
        //     clientId: process.env.FACEBOOK_ID,
        //     clientSecret: process.env.FACEBOOK_SECRET
        // }),
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_ID,
        //     clientSecret: process.env.GOOGLE_SECRET
        // }),
        // EmailProvider({
        //     server: process.env.MAIL_SERVER,
        //     from: 'NextAuth.js <no-reply@example.com>'
        // })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === "github") {
                await connectDB();

                const currentUser = await User.findOne({ email: user.email }); // use user.email directly

                if (!currentUser) {
                    const newUser = new User({
                        email: user.email,
                        username: user.email.split("@")[0],
                    });

                    await newUser.save(); // ✅ this was missing
                    user.name = newUser.username;
                    console.log("New user created:", newUser);
                } else {
                    user.name = currentUser.username;
                    console.log("Existing user:", currentUser);
                }

                return true;
            }

            return false;
        },

        async session({ session, user, token }) {
            const dbUser = await User.findOne({ email: session.user.email });
            console.log(dbUser)
            if (dbUser) {
                session.user.name = dbUser.username;
            }

            return session
        },
    }
})
export { authoptions as GET, authoptions as POST }