'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Skills from './Skills';

function OnBoardingForm() {
    const [formData, setFormData] = useState({
        name: '',
        enrolmentNo: '',
        email: '',
        phone: '',
        cgpa: '',
        branch: ''
    });

    const [skills, setSkills] = useState<string[]>([]); // State to store skills

    // Handle changes for each input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle skills change
    const handleSkillsChange = (newSkills: string[]) => {
        setSkills(newSkills);
    };

    // Handle form submission
    const handleSubmit = (e) => {
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
                            {/* Form Fields */}
                            {['name', 'enrolmentNo', 'email', 'phone', 'cgpa', 'branch'].map((field) => (
                                <div className="space-y-1" key={field}>
                                    <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1).replace(/No/, ' No') + ':'}</label>
                                    <input
                                        type={field === 'email' ? 'email' : field === 'cgpa' ? 'number' : 'text'}
                                        id={field}
                                        name={field}
                                        value={formData[field]}
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
                            <Skills onSkillsChange={handleSkillsChange} /> {/* Skills Component */}

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
                                        boxShadow: '0 0 10px rgba(255, 0, 0, 0.6), 0 0 20px rgba(255, 255, 0, 0.6)', // gradient shadow
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
