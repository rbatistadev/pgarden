// app/dashboard/page.tsx

async function DashboardPage() {
  //const session = await getSession();
  //const activeModules: ModuleKey[] = await getUserModules(session.token);

  // EXAMPLE lazy loading
  return (
    <div className="grid gap-4">
      <h1>Dashboard</h1>
      {/* {activeModules.map((key) => {
        const Module = React.lazy(AvailableModules[key]);
        return (
          <React.Suspense key={key} fallback={<p>Cargando {key}...</p>}>
            <Module.DashboardWidget />
          </React.Suspense>
        );
      })} */}
    </div>
  );
}
