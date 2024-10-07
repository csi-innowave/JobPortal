import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept, generatePermittedFileTypes } from "uploadthing/client";
import { useState, useCallback } from "react";
import { useUploadThing } from "../utils/uploadthing";
import { FolderDown } from 'lucide-react'

export function ResumeUploader({ onUploadComplete }: { onUploadComplete: (url: string) => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, routeConfig } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      alert("uploaded successfully!");
      if (res && res[0]) {
        onUploadComplete(res[0].url);
      }
      setFiles([])
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: ({
        // @ts-ignore
        file }) => {
      console.log("upload has begun for", file);
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: generateClientDropzoneAccept(
      generatePermittedFileTypes(routeConfig).fileTypes,
    ),
  });

  return (
    <>
      <div {...getRootProps()} className={files.length>0?'hidden':'bg-primary p-2 rounded-md text-white flex gap-1 w-fit shadow-md'}>
        <FolderDown/>
        <input {...getInputProps()} className={files.length>0?'hidden':'block'}/>
        <p>
          Upload Resume here!
        </p>
      </div>
      <div>
        {files.length > 0 && (
          <div className={files.length===0?'hidden':'bg-primary p-2 rounded-md text-white flex gap-1 w-fit shadow-md'}>
            <FolderDown/>
            <button onClick={() => startUpload(files)} className="w-fit">
              Complete Upload
            </button>
          </div>
        )}
      </div>
    </>
  );
}