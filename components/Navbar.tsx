"use client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useAuth } from "@/services/auth/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator"
import { Bolt } from 'lucide-react';
import { Button } from "@/components/ui/button";
import UserSkeleton from "@/components/skeletons/UserSkeleton";

const Navbar = () => {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="h-full w-full inset-x-0 top-0 border-t-4 border-t-orange-500 py-4">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span className="text-lg">File</span>
            <span className="text-lg text-orange-500">Storage</span>
          </Link>

          <div className="h-full flex items-center space-x-4 bg-white p-3 rounded-lg shadow-md">
            {loading ? (
              <>
                <UserSkeleton />
              </>
            ) : user ? (
              <>
                <Avatar className="w-10 h-10 border-[1px] border-orange-500">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {user?.username?.at(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="text-md">{user.username}</p>
                <Separator orientation="vertical" />
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Bolt />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="z-[101]">
                    <Button className="w-full" variant="destructive" size="sm" onClick={logout}>
                      Sign out
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link
                  href="/auth/register"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign up
                </Link>

                <Link
                  href="/auth/login"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
