import React, { ReactNode} from "react";
import { Navbar } from ".";
import Footer from "./Footer";

const metadata = {
  title: "JS-Miki Store",
};
const Layout = ({ children } :  { children: ReactNode} ) => {
  return (
    <div className="layout">
      <header>
        <Navbar />
      </header>
      <main className="main-container">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;