import { ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className=" h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 mb-4 pt-16">
          <h1 className="font-bold space-y-4  text-3xl text-[#2E2A47]">
            Welcome back!
          </h1>
          <p className="text-base  text-[#7E8CA0]">
            Log in or Create account to get back to your dashboard!
          </p>
        </div>
        <div className="flex items-center justify-center">
          <ClerkLoaded>
            <SignUp />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground"></Loader2>
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-[#07CBFF] bg-[radial-gradient(at_center_top,_#07CBFF,_#012BFF)] hidden lg:flex items-center justify-center">
        <Image src="logo.svg" alt="logo" height="100" width="100" />
      </div>
    </div>
  );
}
