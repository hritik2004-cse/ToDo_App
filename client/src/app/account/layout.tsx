import NavBar from "@/components/main/NavBar";
import Sidebar from "@/components/main/Sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
