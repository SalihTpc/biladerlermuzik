"use client";
import ProfileForm from "@/components/ProfileForm";
import AuthGuard from "@/components/AuthGuard";
import PageShell from "@/components/PageShell";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { user } = useAuth();
  const [imageBroken, setImageBroken] = useState(false);

  useEffect(() => {
    setImageBroken(false);
  }, [user?.photoURL]);

  const showPhoto = Boolean(user?.photoURL) && !imageBroken;
  const needsProfileForm =
    !user?.displayName || !user?.photoURL || imageBroken;

  return (
    <AuthGuard>
      {user && (
        <PageShell>
          <header className="page-header">
            <h1 className="font-display">Profil</h1>
            <p>Hesap bilgileriniz</p>
          </header>
          <div className="profile-layout">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="m-0 font-display" style={{ fontSize: "1.25rem" }}>
                {user.displayName}
              </p>
              <p className="m-0 text-muted">{user.email}</p>
              {showPhoto ? (
                <Image
                  width={320}
                  height={320}
                  src={user.photoURL!}
                  alt="User Image"
                  unoptimized
                  onError={() => setImageBroken(true)}
                  className="max-sm:h-60 max-sm:w-60 bg-white rounded-theme"
                  style={{ borderRadius: "var(--radius)", marginTop: "0.75rem" }}
                />
              ) : user.photoURL ? (
                <p className="m-0 text-sm text-muted">
                  Profil görseli yüklenemedi. Yeni bir URL girin.
                </p>
              ) : null}
            </div>
            {needsProfileForm ? (
              <div className="auth-panel" style={{ margin: 0, width: "100%", maxWidth: "28rem" }}>
                <ProfileForm />
              </div>
            ) : null}
          </div>
        </PageShell>
      )}
    </AuthGuard>
  );
};

export default ProfilePage;
