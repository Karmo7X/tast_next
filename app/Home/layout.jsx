import Header from "../Components/Header/Header";
import Sidebar from "../Components/sidebar/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <div className="flex min-h-screen p-4">
        <aside className="w-96 rounded-3xl  border border-gray-200 shadow ">
          <Sidebar />
        </aside>
        <div className="w-full p-2">
          <header className="w-full">
            <Header />
          </header>
          <main className="min-h-screen p-7">{children}</main>
        </div>
      </div>
    </>
  );
}
