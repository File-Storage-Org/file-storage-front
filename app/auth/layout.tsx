import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-[calc(100vh-200px)] flex justify-center items-center">
      <div className="shadow-lg border border-gray-200 rounded-lg p-10 w-[300px] xl:w-[400px]">{children}</div>
    </div>
  );
};

export default AuthLayout;
