import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const Logo = () => {
  return (
    <div className={cn("flex flex-col items-center", font.className)}>
      <Image
        src="/logo.png"
        alt="IndieGo Live"
        width={300}
        height={300}
        className="bg-[#e17fe3]"
      />
      <p className="text-2xl font-semibold">
        Watch your favourite Indie Hackers <br /> build LIVE!
      </p>
    </div>
  );
};
