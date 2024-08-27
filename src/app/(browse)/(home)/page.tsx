import { UserButton } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <h1>Dashboard</h1>
      <UserButton appearance={{ baseTheme: neobrutalism }}/>
    </div>
  );
}
