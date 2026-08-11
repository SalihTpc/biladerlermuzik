"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { App } from "antd";
import MyImages from "@/components/MyImages";
import YoutubeEmbed from "@/components/YoutubeEmbed";
import BaglamaForm from "@/components/BaglamaForm";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import { deleteBaglama } from "@/firebase.config";
import { boyut, govdeAgaci, tip } from "@/lib/generalValues";
import type { Baglama } from "@/lib/Interfaces";

function formatPrice(fiyat: number) {
  if (typeof fiyat !== "number" || Number.isNaN(fiyat)) return null;
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(fiyat);
}

function resolveLabel(
  raw: string | number | undefined | null,
  list: { id: number; label: string }[],
): string {
  if (raw === undefined || raw === null || raw === "") return "—";
  const asNum = typeof raw === "number" ? raw : Number(raw);
  if (!Number.isNaN(asNum) && String(asNum) === String(raw).trim()) {
    const found = list.find((item) => item.id === asNum);
    if (found) return found.label;
  }
  return String(raw);
}

type Props = {
  baglama: Baglama;
};

export default function BaglamaDetail({ baglama }: Props) {
  const { user, loading } = useAuth();
  const { modal, message } = App.useApp();
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      setEditing(false);
    }
  }, [loading, user]);

  const price = formatPrice(baglama.fiyat);
  const specs = [
    {
      label: "Tip / yapım",
      value: resolveLabel(
        baglama.tip,
        tip.map((t) => ({ id: t.id, label: t.isim })),
      ),
    },
    {
      label: "Boyut",
      value: resolveLabel(
        baglama.boyut,
        boyut.map((b) => ({ id: b.id, label: b.tip })),
      ),
    },
    {
      label: "Tekne boyu",
      value:
        baglama.tekneBoyu !== undefined &&
        baglama.tekneBoyu !== null &&
        String(baglama.tekneBoyu) !== ""
          ? String(baglama.tekneBoyu)
          : "—",
    },
    {
      label: "Gövde ağacı",
      value: resolveLabel(
        baglama.govdeAgaci,
        govdeAgaci.map((g) => ({ id: g.id, label: g.isim })),
      ),
    },
  ];

  const handleDelete = () => {
    if (!user) {
      message.error("Silmek için giriş yapmalısınız");
      router.replace("/login");
      return;
    }

    modal.confirm({
      title: "Bağlamayı sil",
      content: `"${baglama.title}" kalıcı olarak silinecek. Emin misiniz?`,
      okText: "Sil",
      okType: "danger",
      cancelText: "İptal",
      onOk: async () => {
        if (!user) {
          message.error("Silmek için giriş yapmalısınız");
          router.replace("/login");
          return;
        }
        setDeleting(true);
        try {
          await deleteBaglama(baglama.id);
          message.success("Bağlama silindi");
          router.push("/baglamalar");
          router.refresh();
        } catch (error: unknown) {
          const err = error as { message?: string };
          message.error(err.message || "Silme başarısız");
          throw error;
        } finally {
          setDeleting(false);
        }
      },
    });
  };

  if (editing) {
    return (
      <AuthGuard>
        <p className="text-muted detail-back">
          <Link href="/baglamalar">← Bağlamalar</Link>
        </p>
        <header className="page-header">
          <h1 className="font-display">Bağlamayı düzenle</h1>
          <p>{baglama.title}</p>
        </header>
        <div className="auth-panel baglama-form-panel">
          <BaglamaForm
            initial={baglama}
            onCancel={() => setEditing(false)}
            onUpdated={() => setEditing(false)}
          />
        </div>
      </AuthGuard>
    );
  }

  return (
    <>
      <div className="detail-topbar">
        <p className="text-muted detail-back">
          <Link href="/baglamalar">← Bağlamalar</Link>
        </p>
        {!loading && user ? (
          <div className="detail-actions">
            <button
              type="button"
              className="detail-action-btn detail-action-btn--edit"
              onClick={() => setEditing(true)}
              disabled={deleting}
            >
              Düzenle
            </button>
            <button
              type="button"
              className="detail-action-btn detail-action-btn--delete"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Siliniyor…" : "Sil"}
            </button>
          </div>
        ) : null}
      </div>

      <div className="detail-layout">
        <div className="detail-media">
          <MyImages images={baglama.images ?? []} />
        </div>

        <div className="detail-info">
          <header className="page-header detail-info__header">
            <h1 className="font-display">{baglama.title}</h1>
            {price ? <p className="detail-price">{price}</p> : null}
          </header>

          <section className="detail-section">
            <h2 className="detail-section-title font-display">Özellikler</h2>
            <dl className="detail-specs">
              {specs.map((spec) => (
                <div key={spec.label} className="detail-specs__row">
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="detail-section">
            <h2 className="detail-section-title font-display">Açıklama</h2>
            <div className="prose-block detail-description">
              {baglama.description?.trim() ? (
                baglama.description
                  .split(/\n+/)
                  .map((paragraph, i) => <p key={i}>{paragraph}</p>)
              ) : (
                <p className="text-muted">Açıklama eklenmemiş.</p>
              )}
            </div>
          </section>
        </div>
      </div>

      {baglama.youtubeLink ? (
        <YoutubeEmbed url={baglama.youtubeLink} title={baglama.title} />
      ) : null}
    </>
  );
}
