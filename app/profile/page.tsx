"use client";
import ProfileForm from "@/components/ProfileForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const { data: sesion, status } = useSession();
  const router = useRouter();
  // status == "unauthenticated" && router.push("/login");
  return (
    <div>
      {status == "loading" ? (
        <div className="w-12 h-12 border-4 border-gray-300 border-t-4 border-t-black rounded-full animate-spin" />
      ) : (
        <div>
          {status !== "unauthenticated" ? (
            <div className="flex items-center justify-around flex-col md:flex-row md:items-start">
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="m-0">{sesion?.user?.name}</p>
                <p className="m-0">{sesion?.user?.email}</p>
                {sesion?.user?.image && (
                  <Image
                    width={400}
                    height={400}
                    src={sesion?.user?.image}
                    alt="User Image"
                    className="max-sm:h-60 max-sm:w-60 bg-white rounded-xl"
                  />
                )}
              </div>
              {(!sesion?.user?.name || !sesion?.user?.image) && <ProfileForm />}
            </div>
          ) : (
            <p>unauthenticated</p>
          )}
        </div>
      )}
    </div>
  );
};

export default page;
