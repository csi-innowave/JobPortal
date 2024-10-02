import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface FileUploaderProps {
  onUploadSuccess: (url: string) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const FileUploader: React.FC<FileUploaderProps> = ({ onUploadSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const preset = process.env.NEXT_PUBLIC_PRESET;
  const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.size <= MAX_FILE_SIZE) {
        setFile(selectedFile);
      } else {
        toast({
          title: 'Error',
          description: 'File size exceeds 5MB limit.',
          variant: 'destructive',
        });
      }
    }
  }, [toast]);

  const removeFile = useCallback(() => {
    setFile(null);
  }, []);

  const handleUpload = useCallback(async () => {
    if (!file) {
      toast({
        title: 'Error',
        description: 'Please select a file to upload.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset ? preset : '');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        onUploadSuccess(data.secure_url);
        toast({
          title: 'Success',
          description: 'File uploaded successfully!',
        });
        setFile(null);
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to upload file. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  }, [file, onUploadSuccess, toast, preset, cloudName]);

  return (
    <div className="flex flex-col space-y-4 mt-2">
      <Input
        type="file"
        accept=".pdf,image/*"
        onChange={handleFileChange}
        className="file:mr-4 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-black hover:file:bg-violet-100"
      />
      {file && (
        <div className="flex items-center justify-between bg-black p-2 rounded">
          <span className="truncate">{file.name}</span>
          <button
            onClick={removeFile}
            className="text-red-500 hover:text-red-700"
          >
            <X size={16} />
          </button>
        </div>
      )}
      <Button onClick={handleUpload} disabled={!file || uploading} className="w-full">
        {uploading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          'Upload File'
        )}
      </Button>
    </div>
  );
};