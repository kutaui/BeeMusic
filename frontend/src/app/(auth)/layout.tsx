import MainNavbar from "@/components/main-navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNavbar />
      <section>{children}</section>
    </>
  );
}
