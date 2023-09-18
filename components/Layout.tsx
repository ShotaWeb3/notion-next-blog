import Link from "next/link";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
 
const Layout = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex flex-col items-center max-w-2xl w-full mx-auto">
        {/* */}
        <Navbar />
        {/* */}
        <main></main>
        {/* */}
        <Footer />
      </div>
    </div>
  );
};
 
export default Layout;
