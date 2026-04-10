import Navbar from "../components/common/Navbar";

function MainLayout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-6">{children}</div>
    </div>
  );
}

export default MainLayout;