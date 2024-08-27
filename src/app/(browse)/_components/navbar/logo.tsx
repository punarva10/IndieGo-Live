import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition">
        <Image
          src="/logo.png"
          alt="IndieGo Live"
          width={150}
          height={150}
          className="bg-[#8e44ad]"
        />
      </div>
    </Link>
  );
};
