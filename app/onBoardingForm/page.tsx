'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Skills from './skills';
import { FileUploader } from './FileUploader'; // Import the new FileUploader component

// Define the shape of the form data
interface FormData {
    name: string;
    enrolmentNo: string;
    email: string;
    phone: string;
    cgpa: string;
    branch: string;
    fileUrl: string; // New field for the uploaded file URL
}

function OnBoardingForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        enrolmentNo: '',
        email: '',
        phone: '',
        cgpa: '',
        branch: '',
        fileUrl: '' // Initialize the fileUrl field
    });

    const [skills, setSkills] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSkillsChange = (newSkills: string[]) => {
        setSkills(newSkills);
    };

    const handleFileUploadSuccess = (url: string) => {
        setFormData({
            ...formData,
            fileUrl: url
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", { ...formData, skills });
        // Here you can make API calls or further process the data
    };

    return (
        <div className='bg-black flex flex-col justify-center items-center min-h-screen p-20'>
            <div>
                <Card className='bg-black text-white'>
                    <CardHeader className='text-center'>
                        <CardTitle>OnBoarding Form</CardTitle>
                        <CardDescription>Enter your credentials to login.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <form onSubmit={handleSubmit}>
                            {/* Existing form fields */}
                            {['name', 'enrolmentNo', 'email', 'phone', 'cgpa', 'branch'].map((field) => (
                                <div className="space-y-1" key={field}>
                                    <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace(/No/, ' No') + ':'}</Label>
                                    <Input
                                        type={field === 'email' ? 'email' : field === 'cgpa' ? 'number' : 'text'}
                                        id={field}
                                        name={field}
                                        value={formData[field as keyof FormData]}
                                        onChange={handleChange}
                                        required
                                        style={{
                                            backgroundColor: 'black',
                                            color: 'white',
                                            border: '1px solid grey',
                                            padding: '10px',
                                            borderRadius: '4px',
                                            width: '100%',
                                            marginBottom: '10px'
                                        }}
                                    />
                                </div>
                            ))}
                            <Skills onSkillsChange={handleSkillsChange} />
                            
                            {/* File Uploader component */}
                            <FileUploader onUploadSuccess={handleFileUploadSuccess} />

                            <div className='w-full flex justify-center pt-10'>
                                <button 
                                    type="submit" 
                                    style={{ 
                                        padding: '10px 20px', 
                                        backgroundColor: 'black', 
                                        color: 'white', 
                                        border: 'none', 
                                        borderRadius: '4px', 
                                        position: 'relative', 
                                        overflow: 'hidden',
                                        boxShadow: '0 0 10px rgba(255, 0, 0, 0.6), 0 0 20px rgba(255, 255, 0, 0.6)',
                                        transition: 'transform 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default OnBoardingForm;