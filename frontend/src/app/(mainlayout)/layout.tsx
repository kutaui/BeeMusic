import MainNavbar from "@/components/main-navbar";
import MainDock from "@/components/main-dock";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MainNavbar />
      <section className="pb-16">{children}</section>
      <MainDock />
    </>
  );
}
