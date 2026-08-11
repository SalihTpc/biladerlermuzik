"use client";
import ProfileForm from "@/components/ProfileForm";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <AuthGuard>
      {user && (
        <div className="flex items-center justify-around flex-col md:flex-row md:items-start">
          <div className="flex flex-col items-center justify-center gap-2">
            <p className="m-0">{user.displayName}</p>
            <p className="m-0">{user.email}</p>
            {user.photoURL && (
              <Image
                width={400}
                height={400}
                src={user.photoURL}
                alt="User Image"
                className="max-sm:h-60 max-sm:w-60 bg-white rounded-xl"
              />
            )}
          </div>
          {(!user.displayName || !user.photoURL) && <ProfileForm />}
        </div>
      )}
    </AuthGuard>
  );
};

export default ProfilePage;
