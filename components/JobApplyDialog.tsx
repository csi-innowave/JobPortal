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
import { Textarea } from "@/components/ui/textarea"

import { Button } from "./ui/button";
import { Label } from "./ui/label";
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
          <DialogTitle className="mb-2">Why do you wanna work with us?</DialogTitle>
          <DialogDescription className="space-y-4">
           <p> What interests you about working for this company.</p>
           <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your Message</Label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p className="text-xs text-muted-foreground">
        Is Your profile up to date?. Click <span className="text-purple-500 hover:underline cursor-pointer">here</span> to verify how you will appear to recruiters.
      </p>
    </div>
            <Button className="flex gap-2"><p>Send Application</p>

                <SendHorizonal size={18}/>
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
