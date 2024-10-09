import SignOutButton from "./Logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { authOptions } from "@/lib/AuthOptions";
import { getServerSession } from "next-auth";
export default async function UserButton() {
  const session = await getServerSession(authOptions);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="absolute right-5 flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <span className="flex h-full w-full items-center justify-center rounded-full bg-purple-200">
          {session?.user?.name?.slice(0, 2).toUpperCase()}
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-5 bg-white">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
