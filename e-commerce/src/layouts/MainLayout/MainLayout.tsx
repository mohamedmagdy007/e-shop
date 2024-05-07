import { Outlet } from "react-router-dom";
import { Header, Footer } from "@components/common";

const MainLayout = () => {
  return (
    <div className=" h-svh grid grid-rows-[auto_1fr_auto]">
      <Header />
      <div className="container mx-auto  mt-3 px-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
