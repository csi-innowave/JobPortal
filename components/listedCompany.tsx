'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { jobs } from '@/app/data/data'

export default function JobList() {
  const [interestedJobs, setInterestedJobs] = useState<number[]>([])

  const handleInterested = (jobId: number) => {
    if (interestedJobs.includes(jobId)) {
      setInterestedJobs(interestedJobs.filter(id => id !== jobId))
    } else {
      setInterestedJobs([...interestedJobs, jobId])
    }
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-chart-1 to-chart-2">
        Job Openings
      </h1>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs.companies.flatMap(company =>
            company.jobs.map(job => (
              <Card 
                key={job.id} 
                className="flex flex-col bg-card rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <CardHeader className="p-6 border-b border-border h-24 flex">
                  <CardTitle className="flex gap-2 text-lg font-semibold">
                    <Briefcase className="w-6 h-6 text-primary flex-shrink-0" />
                    <Link
                      href={job.jdLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline line-clamp-2"
                    >
                      {company.name}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow p-6 h-24 flex items-center">
                  <p className="text-xl font-medium">{job.name}</p>
                </CardContent>
                <CardFooter className="p-6">
                  <Button
                    variant={interestedJobs.includes(job.id) ? "secondary" : "default"}
                    onClick={() => handleInterested(job.id)}
                    className="w-full font-semibold"
                  >
                    {interestedJobs.includes(job.id) ? (
                      <span className="flex items-center justify-center">
                        Interested
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </span>
                    ) : (
                      "I'm Interested"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
