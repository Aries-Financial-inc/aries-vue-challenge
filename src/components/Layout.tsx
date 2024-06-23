import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="w-full max-w-7xl bg-white shadow-md rounded-lg p-6">
        {children}
      </div>
    </div>
  );
};

export default Layout;
