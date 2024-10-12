"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion,AnimatePresence } from "framer-motion";
import { Briefcase, SendHorizonal,Check, SendHorizontal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useState } from "react";
export default function JobApplyDialog({
  jobId,
  userId,
}: {
  jobId: number;
  userId: number;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = () => {
    setIsSubmitted(!isSubmitted)
  }

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
          <DialogTitle className="mb-2">
            Why do you wanna work with us?
          </DialogTitle>
          <DialogDescription className="space-y-4">
            <p> What interests you about working for this company.</p>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message-2">Your Message</Label>
              <Textarea placeholder="Type your message here." id="message-2" />
              <p className="text-xs text-muted-foreground">
                Is Your profile up to date?. Click{" "}
                <span className="text-purple-500 hover:underline cursor-pointer">
                  here
                </span>{" "}
                to verify how you will appear to recruiters.
              </p>
            </div>
            <motion.button
             whileHover="hover"
        onClick={handleSubmit}
        className="relative px-4 py-2 rounded-md focus:outline-none bg-primary  transition-colors duration-300 ease-in-out overflow-hidden"
        animate={{
          backgroundColor: isSubmitted ? "#10B981" : "#9333ea",
        }}
        
      >
        <motion.div 
          className="flex items-center justify-center gap-2  text-white"
          
          animate={{ opacity: isSubmitted ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <span>Send Application</span>
          <motion.div
           variants={{
            hover: { x: 5 },
          }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <SendHorizonal size={18} />
          </motion.div>
        </motion.div>

        <AnimatePresence>
          {isSubmitted && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <span>Successful</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSubmitted && (
            <>
              <motion.div
                className="absolute right-6 top-1/2 transform -translate-y-1/2"
                initial={{ y: 0, x: 0 }}
                animate={{ y: -50, x: 50, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <SendHorizonal size={18} />
              </motion.div>
              <motion.div
                className="absolute right-6 top-2 transform text-white -translate-y-1/2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Check size={18} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
