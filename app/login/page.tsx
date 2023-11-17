import LoginForm from "@/components/LoginForm";
import React from "react";

const page = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="px-6 mt-10 py-6 bg-slate-500 rounded-md flex items-center justify-center flex-col gap-3">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
