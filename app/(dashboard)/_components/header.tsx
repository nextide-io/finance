import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { HeaderLogo } from "./headerLogo";
import { Navigation } from "./navigation";
import { Loader2 } from "lucide-react";
import WelcomeMsg from "./welcomeMsg";

const Header = () => {
  return (
    <header
      className="
    px-4 py-8 lg:px-14 pb-36
    bg-[#07CBFF] bg-[radial-gradient(at_top_left,_#07CBFF,_#012BFF)]"
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex item-center justify-between mb-14">
          <div className="flex item-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 animate-spin text-slate-400"></Loader2>
          </ClerkLoading>
        </div>
        <WelcomeMsg />
      </div>
    </header>
  );
};

export default Header;
