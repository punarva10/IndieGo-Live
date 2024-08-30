import { NavBar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      <div className="h-full pt-20">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default BrowseLayout;
