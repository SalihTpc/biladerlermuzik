"use client";
import { FloatButton } from "antd";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";

const NewButton = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  if (loading || !user) {
    return null;
  }

  return (
    <FloatButton
      onClick={() => router.push("/baglamalar/ekle", { scroll: false })}
      type="primary"
      style={{ top: 94, right: 14 }}
      icon={<i className="fa-solid fa-plus" />}
    />
  );
};

export default NewButton;
