"use client";
import { FloatButton } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const NewButton = () => {
  const router = useRouter();
  const { status } = useSession();
  return (
    <>
      {status !== "unauthenticated" && (
        <FloatButton
          onClick={() => router.push("/baglamalar/ekle", { scroll: false })}
          type="primary"
          style={{ top: 94, right: 14 }}
          icon={<i className="fa-solid fa-plus" />}
        />
      )}
    </>
  );
};

export default NewButton;
