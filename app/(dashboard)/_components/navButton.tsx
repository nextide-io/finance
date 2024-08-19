import { Button } from "@/components/ui/button";
import Link from "next/link";

export const NavButton = ({
  label,
  href,
  isActive,
}: {
  label: string;
  href: string;
  isActive: boolean;
}) => {
  return (
    <Button
      className={`w-full lg:w-auto justify-between font-normal hover:bg-white/20
     hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent
      outline-none text-white focus:bg-white/30 transition
     ${isActive ? "bg-white/10 text-white" : "bg-transparent"}
      `}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
