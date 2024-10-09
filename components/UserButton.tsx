import SignOutButton from "./Logout"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { authOptions } from "@/lib/AuthOptions";
  import { getServerSession } from "next-auth"
export default async function UserButton() {
    const session = await getServerSession(authOptions);
    
  return (
    <DropdownMenu >
  <DropdownMenuTrigger className="bg-purple-300 w-10 h-10 right-5 fixed rounded-full">
     <p className="text-slate-800 ">
     {session?.user?.name?.charAt(0)}

     </p>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="mr-6 bg-white">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
   <SignOutButton/>
  </DropdownMenuContent>
</DropdownMenu>

  )
}
