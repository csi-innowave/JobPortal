'use client'

import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, FileText, Briefcase, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface Job {
  name: string
  jdLink: string
}

interface Company {
  name: string
}

interface JobCardProps {
  job: Job
  company: Company
}

export default function JobCard({ job, company }: JobCardProps) {
  const handleApply = () => {
    console.log(`Applying for job: ${job.name} at ${company.name}`)
  }

  return (
    <Card className="w-full max-w-md overflow-hidden group">
      <div className="relative bg-gradient-to-br from-primary/80 to-primary p-6 pb-12">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <h3 className="text-2xl font-bold text-primary-foreground">{job.name}</h3>
          <Briefcase className="text-primary-foreground" size={28} />
        </motion.div>
        <div className="absolute -bottom-6 left-6 bg-background rounded-full shadow-lg">
          <div
            
            className="w-14 h-14 rounded-full object-cover flex items-center justify-center bg-gradient-to-br from-green-300 to-blue-300">
                <p className='font-semibold text-white text-2xl'>{company.name.charAt(0)}</p>
          </div>
        </div>
      </div>
      <CardContent className="pt-10 pb-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center mb-4"
        >
          <Building2 className="mr-2 text-muted-foreground" size={18} />
          <span className="text-sm font-medium text-foreground">{company.name}</span>
        </motion.div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center"
        >
          <FileText className="mr-2 text-muted-foreground" size={18} />
          <a
            href={job.jdLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-primary hover:underline"
          >
            View Job Description
          </a>
        </motion.div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-4">
        <Button
          onClick={handleApply}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group"
        >
          Apply Now
          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}