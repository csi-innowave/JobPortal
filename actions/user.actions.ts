'use server'

import prisma from "@/lib/postgresdb"


export async function getUser(emailId:string){
    const user = await prisma.user.findFirst({
        where:{
            emailId
        }
    })
    return user
}