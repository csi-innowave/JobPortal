import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/AuthOptions";
const f = createUploadthing();




export const ourFileRouter = {

  imageUploader: f({ pdf: { maxFileSize: "4MB" } })
    
    .middleware(async ({ req }) => {
    
      const user = await getServerSession(authOptions);

 
      if (!user?.user?.email) throw new UploadThingError("Unauthorized");

  
      return { userId: user.user?.email };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);


      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
