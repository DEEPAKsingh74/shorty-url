
import { ReactNode } from 'react';
import DashboardSidebar from '../../components/ui/sidebar/DashboardSidebar';
import DashboardNavbar from '../../components/ui/dashboard_navbar/DashboardNavbar';

type DashboardLayoutProps = {
    children: ReactNode;
   
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {


    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <DashboardSidebar />

            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Navbar */}
                <DashboardNavbar />

                {/* Main content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout