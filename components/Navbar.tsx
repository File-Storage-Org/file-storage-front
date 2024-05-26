"use client";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useAuth } from "@/services/auth/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import UserSkeleton from "@/components/skeletons/UserSkeleton";

const Navbar = () => {
  const { user, loading, logout } = useAuth();

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            file<span className="text-orange-600">storage</span>
          </Link>

          <div className="h-full flex items-center space-x-4">
            {loading ? (
              <>
                <UserSkeleton />
              </>
            ) : user ? (
              <>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Log out
                </Button>

                <div className="h-8 w-px bg-zinc-200 hidden sm:block" />

                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>
                    {user?.username?.at(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <p className="text-md">{user.username}</p>
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
