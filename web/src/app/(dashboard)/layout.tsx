import { MainNavigation } from './components/MainNavigation';

const DashboardLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex h-screen min-h-screen flex-col overflow-hidden">
      <div className="flex h-full">
        <MainNavigation
        /* environment={environment}
          organization={organization}
          projects={projects}
          user={user}
          isFormbricksCloud={IS_FORMBRICKS_CLOUD}
          isDevelopment={IS_DEVELOPMENT}
          membershipRole={membershipRole} */
        />
        <div id="mainContent" className="flex flex-1 flex-col overflow-hidden bg-slate-50">
          {/* <TopControlBar
            environments={environments}
            currentOrganizationId={organization.id}
            organizations={organizations}
            currentProjectId={project.id}
            projects={projects}
            isMultiOrgEnabled={isMultiOrgEnabled}
            organizationProjectsLimit={organizationProjectsLimit}
            isFormbricksCloud={IS_FORMBRICKS_CLOUD}
            isLicenseActive={active}
            isOwnerOrManager={isOwnerOrManager}
            isAccessControlAllowed={isAccessControlAllowed}
            membershipRole={membershipRole}
          /> */}
          <div className="flex-1 overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
