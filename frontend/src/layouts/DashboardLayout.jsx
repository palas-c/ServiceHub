import Sidebar from "../components/common/Sidebar";

function DashboardLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        {children}
      </div>
    </div>
  );
}

export default DashboardLayout