import React from 'react'
import AuthPage from '../../components/login'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOptions";
import { redirect } from "next/navigation";
export default async function page() {
    const session = await getServerSession(authOptions);
  console.log(session)
  if (session?.user) {
    redirect("/");
  }
  return (
   <AuthPage/>
  )
}
