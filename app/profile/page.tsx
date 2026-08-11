"use client";

import ProfileForm from "@/components/ProfileForm";
import AuthGuard from "@/components/AuthGuard";
import PageShell from "@/components/PageShell";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const ProfilePage = () => {
  const { user, photoURL } = useAuth();
  const [editing, setEditing] = useState(false);
  const [livePreview, setLivePreview] = useState<string | null>(null);

  const needsProfileForm =
    editing || !user?.displayName || !photoURL;

  const displayPhoto = needsProfileForm
    ? livePreview ?? photoURL
    : photoURL;

  return (
    <AuthGuard>
      {user && (
        <PageShell>
          <header className="page-header detail-topbar">
            <div>
              <h1 className="font-display">Profil</h1>
              <p>Hesap bilgileriniz</p>
            </div>
            {!needsProfileForm ? (
              <button
                type="button"
                className="detail-action-btn detail-action-btn--edit"
                onClick={() => {
                  setLivePreview(photoURL);
                  setEditing(true);
                }}
              >
                Düzenle
              </button>
            ) : null}
          </header>
          <div className="profile-layout">
            <div className="flex flex-col items-center justify-center gap-2">
              <p className="m-0 font-display" style={{ fontSize: "1.25rem" }}>
                {user.displayName}
              </p>
              <p className="m-0 text-muted">{user.email}</p>
              {displayPhoto ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={displayPhoto.slice(0, 64)}
                  src={displayPhoto}
                  alt="Profil"
                  className="profile-avatar"
                />
              ) : (
                <p className="m-0 text-sm text-muted">Profil görseli yok</p>
              )}
            </div>
            {needsProfileForm ? (
              <div
                className="auth-panel"
                style={{ margin: 0, width: "100%", maxWidth: "28rem" }}
              >
                <ProfileForm
                  onPreviewChange={setLivePreview}
                  onSaved={() => {
                    setEditing(false);
                    setLivePreview(null);
                  }}
                />
              </div>
            ) : null}
          </div>
        </PageShell>
      )}
    </AuthGuard>
  );
};

export default ProfilePage;
