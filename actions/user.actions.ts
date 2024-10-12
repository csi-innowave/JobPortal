'use server'

import prisma from "@/lib/postgresdb"
type UserInfoFormData = {
    emailId:string;
    year: number;
    branch: string;
    cgpa: number;
    skills: string[];
    enrolmentNo: string;
    phoneNumber: string;
  };

export async function getUser(emailId:string){
    const user = await prisma.user.findFirst({
        where:{
            emailId
        }
    })
    return user
}

export async function completeOnboarding(
    userinfo:UserInfoFormData
){
    const {emailId,enrolmentNo,branch,year,skills,cgpa,phoneNumber}=userinfo
    const user = await prisma.user.findFirst({
        where:{
            emailId
        }
    })
    if(!user) return 
    const yeare = Number(year)
    const cpa = Number(cgpa)
   
   const updateUser = await prisma.userInfo.create({
    data:{
        userId:user.id,
        enrolmentNo,
        branch,
        year:yeare,
        skills,
        cgpa:cpa,
        phoneNumber

    }
   })
   console.log(updateUser)
   await prisma.user.update({
    where:{
        emailId
    },data:{
        isVerified:true
    }
   })
   return updateUser
}

export async function showInterestInJob(userId: number, jobId: number) {
    try {
      const userInterest = await prisma.userInterest.create({
        data: {
          userId,
          jobId,
        },
      })
      return { success: true, userInterest }
    } catch (error) {
      console.error('Failed to show interest:', error)
      return { success: false, error: 'Failed to show interest in job' }
    }
  }