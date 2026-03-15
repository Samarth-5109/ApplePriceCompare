import React from "react";
import appleLogo from "@/assets/images/Apple_Computer_Logo_rainbow.svg.png";


function Header() {
  return (
    <div className="flex flex-col items-center gap-4 p-5">
    <div className="flex items-center gap-2">
      <img
        className="h-[70px] w-[60px]"
        src={appleLogo}
        alt="apple-logo"
      />
      <h1 className="font-bold text-4xl text-gray-600 text-center">
        Apple Price Compare
      </h1>
    </div>
      <p className="text-gray-600 text-center text-sm">Compare Apple product prices across different countries</p>
    </div>
  );
}

export default Header;
