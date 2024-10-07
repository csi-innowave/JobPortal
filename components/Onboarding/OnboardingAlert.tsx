"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { format } from "date-fns";
import { CalendarIcon, User, X } from "lucide-react";
import { getUser } from '@/actions/user.actions'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ResumeUploader } from "../Companies";
import { completeOnboarding } from "@/actions/user.actions";
import useUserStore from "@/store/UserStore";
import { cn } from "@/lib/utils";
type UserInfoFormData = {
  resumeLink: string;
  dob: Date;
  year: number;
  branch: string;
  cgpa: number;
  skills: string[];
  enrolmentNo: string;
  phoneNumber: string;
};

const branches = [
  "Computer Science Engineering",
  "Electrical & Electronics Engineering",
  "Mechanical and Automation Engineering",
  "Electrical & Communications Engineering",
  "Computer Science & Technology",
  "Information Technology",
  "Information Technology & Engineering",
  "Artificial Intelligence & Data Science",
  "Artificial Intelligence & Machine learning"
];
const years = [1, 2, 3, 4];
const allSkills = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "React",
  "Node.js",
  "SQL",
  "Machine Learning",
];

const UserInfoForm = () => {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [resumeLink, setResumeLink] = useState<string>("");
  const [date, setDate] = React.useState<Date | undefined>();
  const form = useForm<UserInfoFormData>();
 const {user,setUser}=useUserStore()
 const { toast } = useToast();
  const handleSkillSelect = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
      form.setValue("skills", [...selectedSkills, skill]);
    }
  };
 const emailId = user?.email!
 const name = user?.name!
 console.log(user)
  const handleRemoveSkill = (skill: string) => {
    const updatedSkills = selectedSkills.filter((s) => s !== skill);
    setSelectedSkills(updatedSkills);
    form.setValue("skills", updatedSkills);
  };
  const handleResumeUpload = (url: string) => {
    setResumeLink(url);
  };

 async function onSubmit(data: UserInfoFormData) {
  if(!date||!data) return
   const {branch,year,cgpa,enrolmentNo,phoneNumber,skills}=data
   const completeData = {
    branch,year,cgpa,enrolmentNo,phoneNumber,skills,resumeLink,date,emailId
   }
   
     await completeOnboarding(completeData)
     toast({ title: "Onboarding Successfull🚀" });
     const info= await getUser(emailId)
     console.log(info)
     setUser({ name:info?.name!,isVerified:info?.isVerified!,email:info?.emailId!,id:info?.id! });
     
 }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="resumeLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume Link</FormLabel>
                <FormControl>
                  <ResumeUploader onUploadComplete={handleResumeUpload} />
                </FormControl>
                <FormDescription>Please upload your resume.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </FormControl>
                <FormDescription>
                  Please fill your correct date of birth.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your year" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        Year {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Your current year of study.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branch"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your branch" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {branches.map((branch) => (
                      <SelectItem key={branch} value={branch}>
                        {branch}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Your field of study.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cgpa"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CGPA</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Your current CGPA (0-10).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skills</FormLabel>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-4 w-4 p-0"
                        onClick={() => handleRemoveSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <Select onValueChange={handleSkillSelect}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your skills" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>
                        {skill}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select your skills from the dropdown.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="enrolmentNo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enrolment Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Your unique enrolment number.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="tel" {...field} />
                </FormControl>
                <FormDescription>Your contact number.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default UserInfoForm;
