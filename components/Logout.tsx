"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { signOut } from "next-auth/react"
export default function SignOutButton() {
  const [isHovered, setIsHovered] = useState(false)

  

  return (
    <Button
      variant="outline"
      className="relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={()=>{
        signOut()
      }}
    >
      <motion.div
        className="flex items-center justify-center w-full h-full"
        initial={false}
        animate={{
          x: isHovered ? -40 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <span className="mr-2">Sign Out</span>
        <LogOut className="w-4 h-4" />
      </motion.div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center bg-primary text-primary-foreground"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <span className="mr-2">Confirm</span>
            <LogOut className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}