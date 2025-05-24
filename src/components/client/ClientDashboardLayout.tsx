import { Outlet } from 'react-router-dom';
import ClientDashboardSidebar from './ClientDashboardSidebar';
import ClientDashboardHeader from './ClientDashboardHeader';

const ClientDashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <ClientDashboardHeader />
      <div className="flex">
        <ClientDashboardSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ClientDashboardLayout;
