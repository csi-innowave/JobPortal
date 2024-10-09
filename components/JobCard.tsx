"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Clock, ChevronRight, Search, Building } from "lucide-react";
import { useToast } from "./ui/use-toast";
import useUserStore from "@/store/UserStore";
import { showInterestInJob } from "@/actions/user.actions";
import JobApplyDialog from "./JobApplyDialog";
type Job = {
  id: number;
  name: string;
  jd: string;
  jdLink: string;
  companyId: number;
  updatedAt: Date;
  Tags: string[];
  branchesAllowed: string[];
};

type Company = {
  id: number;
  name: string;
  jobs: Job[];
};

export default function JobListings({ companies }: { companies: Company[] }) {
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const {user}=useUserStore()
  
  const { toast } = useToast();
  if(!user){
    return
  }



// async function apply(jobId: number) {
//     const applied = await showInterestInJob(userId,jobId)
//   if(applied.success){
//     toast({ title: "Application Sent 🚀🚀" });
//   }
// }
  const filteredCompanies = companies
    .map((company) => ({
      ...company,
      jobs: company.jobs.filter(
        (job) =>
          job.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.Tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          company.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((company) => company.jobs.length > 0);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

    if (diffDays > 1) {
      return `${diffDays} days ago`;
    } else if (diffHours > 1) {
      return `${diffHours} hours ago`;
    } else {
      return "Just now";
    }
  };

  return (
    <div className="min-h-screen  p-8">
      <div className="max-w-4xl mx-auto">
        <section className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Find Your Dream Internship at{" "}
            <span className="text-purple-600">CSI-INNOWAVE</span>
          </h1>
        </section>
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search jobs, companies, or skills..."
            className="w-full p-4 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="space-y-8">
          <AnimatePresence>
            {filteredCompanies.map((company) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className=""
              >
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Building className="w-6 h-6 mr-2" />
                  {company.name}
                </h2>
                <div className="space-y-6">
                  {company.jobs.map((job) => (
                    <motion.div
                      key={job.id}
                      layout
                      className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-800">
                              {job.name}
                            </h3>
                            <p className="text-gray-600">{company.name}</p>
                          </div>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {formatDate(job.updatedAt)}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-4">{job.jd}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.Tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          
                          <JobApplyDialog jobId={job.id} userId={user?.id}/>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              setExpandedJob(
                                expandedJob === job.id ? null : job.id
                              )
                            }
                            className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg font-medium flex items-center"
                          >
                            {expandedJob === job.id ? "See Less" : "See More"}

                            <motion.p
                              className=" text-sm"
                              animate={{
                                rotate: expandedJob === job.id ? 90 : 0,
                              }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <ChevronRight />
                            </motion.p>
                          </motion.button>
                        </div>
                      </div>
                      <AnimatePresence>
                        {expandedJob === job.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-purple-50 p-6 border-t border-purple-100"
                          >
                            <h4 className="text-lg font-semibold text-gray-800 mb-2">
                              Additional Information
                            </h4>
                            <p className="text-gray-700 mb-4">
                              This position is open to candidates from the
                              following branches:
                            </p>
                            <ul className="list-disc list-inside text-gray-700 mb-4">
                              {job.branchesAllowed.map((branch) => (
                                <li key={branch}>{branch}</li>
                              ))}
                            </ul>
                            <p className="text-gray-700">
                              For more details, please visit the{" "}
                              <a
                                href={job.jdLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-purple-600 hover:underline"
                              >
                                full job description
                              </a>
                              .
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
