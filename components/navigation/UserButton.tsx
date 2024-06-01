"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { LogOut, Moon, Settings, Sun, TruckIcon } from "lucide-react";

export const UserButton = ({ user }: Session) => {
  if (user)
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Avatar>
            {user.image && (
              <Image src={user.image} alt={user.name!} fill={true} />
            )}
            {!user.image && (
              <AvatarFallback className="bg-primary/25">
                <div className="font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-6" align="end">
          <div className="mb-4 flex flex-col items-center gap-1 rounded-lg bg-primary/10 p-4">
            {user.image && (
              <Image
                src={user.image}
                alt={user.name!}
                className="rounded-full"
                width={36}
                height={36}
              />
            )}
            <p className="text-xs font-bold">{user.name}</p>
            <span className="text-xs font-medium text-secondary-foreground">
              {user.email}
            </span>
          </div>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="group cursor-pointer py-2 font-medium transition-all duration-500">
            <TruckIcon
              size={14}
              className="mr-3 transition-all duration-300 ease-in-out group-hover:translate-x-1"
            />{" "}
            My orders
          </DropdownMenuItem>
          <DropdownMenuItem className="group cursor-pointer py-2 font-medium transition-all duration-500">
            <Settings
              size={14}
              className="mr-3 transition-all duration-300 ease-in-out group-hover:rotate-180"
            />{" "}
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer py-2 font-medium transition-all duration-500">
            <div className="flex items-center">
              <Sun size={14} />
              <Moon size={14} />
              <p>
                <span>Light Theme</span>
              </p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="group cursor-pointer py-2 font-medium transition-all duration-500 focus:bg-destructive/30"
          >
            <LogOut
              size={14}
              className="mr-3 transition-all duration-300 ease-in-out group-hover:scale-75"
            />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
};
