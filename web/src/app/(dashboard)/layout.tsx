import { MainNavigation } from './components/MainNavigation';

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen min-h-screen flex-col overflow-hidden">
      <div className="flex h-full">
        <MainNavigation />
        <div id="mainContent" className="flex flex-1 flex-col overflow-hidden bg-slate-100">
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
