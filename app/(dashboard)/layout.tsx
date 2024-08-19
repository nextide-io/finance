import Header from "./_components/header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main className="px-4 lg:px-14">{children}</main>
    </>
  );
};

export default DashboardLayout;
