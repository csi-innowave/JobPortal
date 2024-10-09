"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Briefcase,SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";
export default function JobApplyDialog({jobId,userId}:{
    jobId:number,
    userId:number
}) {
  return (
    <Dialog>
      <DialogTrigger>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium flex items-center"
        >
          <Briefcase className="w-4 h-4 mr-2" />
          Apply Now
        </motion.button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-2">Are you absolutely sure?</DialogTitle>
          <DialogDescription className="space-y-4">
           <p> This action cannot be undone. Check your Profile and Job description once more to be sure.</p>
            <Button className="flex gap-2"><p>Send Application</p>

                <SendHorizonal size={18}/>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
