import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const RootLayout = () => (
  <div className="flex min-h-screen flex-col">
    <div className="app-background" aria-hidden="true" />
    <Navbar />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default RootLayout;
