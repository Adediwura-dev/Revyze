import { useState } from "react";

import Sidebar from "../../components/layout/Sidebar/Sidebar";
import Header from "../../components/layout/Header/Header";
import WelcomeSection from "../../components/dashboard/WelcomeSection/WelcomeSection";
import StudyMaterials from "../../components/dashboard/StudyMaterials/StudyMaterials";
import RecommendedStudy from "../../components/dashboard/RecommendedStudy/RecommendedStudy";
import RecentActivity from "../../components/dashboard/RecentActivity/RecentActivity";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex min-h-screen">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={handleCloseSidebar}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header onMenuClick={handleOpenSidebar} />

          <main className="flex-1 p-6 sm:p-8">
            <div className="mx-auto max-w-7xl">
              <WelcomeSection />
              <RecommendedStudy/>
              <StudyMaterials/>
              <RecentActivity/>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;