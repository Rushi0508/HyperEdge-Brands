import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}