import SidebarLayout from "@/components/sidebar/sidebar-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarLayout>
      <div className="">{children}</div>
    </SidebarLayout>
  );
};

export default Layout;
