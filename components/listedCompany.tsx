'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { ChevronRight, Briefcase, Search } from 'lucide-react'
import Link from 'next/link'
import { jobs } from '@/app/data/data'

export default function JobList() {
  const [interestedJobs, setInterestedJobs] = useState<number[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const handleInterested = (jobId: number) => {
    if (interestedJobs.includes(jobId)) {
      setInterestedJobs(interestedJobs.filter(id => id !== jobId))
    } else {
      setInterestedJobs([...interestedJobs, jobId])
    }
  }

  const filteredJobs = jobs.companies.flatMap(company =>
    company.jobs.filter(job =>
      job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).map(job => ({ ...job, companyName: company.name }))
  )

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
      Discover Your Next Opportunity
      </h1>
      <div className="relative max-w-md mx-auto mb-12">
        <Input
          type="text"
          placeholder="Search jobs or companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-primary focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary w-5 h-5" />
      </div>
      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map(job => (
            <Card 
              key={job.id} 
              className="flex flex-col bg-card rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              <CardHeader className="p-6 border-b border-border">
                <CardTitle className="flex gap-2 text-lg font-semibold">
                  <Briefcase className="w-6 h-6 text-primary flex-shrink-0" />
                  <Link
                    href={job.jdLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline line-clamp-2 text-primary"
                  >
                    {job.companyName}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow p-6 flex items-center">
                <p className="text-xl font-medium">{job.name}</p>
              </CardContent>
              <CardFooter className="p-6">
                <Button
                  variant={interestedJobs.includes(job.id) ? "secondary" : "default"}
                  onClick={() => handleInterested(job.id)}
                  className="w-full font-semibold group hover:shadow-md transition-all duration-300"
                >
                  {interestedJobs.includes(job.id) ? (
                    <span className="flex items-center justify-center">
                      Interested
                      <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                  ) : (
                    "I'm Interested"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
