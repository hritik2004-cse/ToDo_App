import NavBar from "@/components/main/NavBar";
import Sidebar from "@/components/main/Sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-dvh">
      <NavBar className="min-h-20"/>
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 md:p-8">{children}</main>
      </div>
    </div>
  );
}
