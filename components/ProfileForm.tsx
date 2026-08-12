"use client";

import { useAuth } from "@/context/AuthContext";
import { App, Button, Form, Input } from "antd";
import { useEffect, useId, useRef, useState, type ChangeEvent } from "react";
import {
  compressImageFile,
  PROFILE_IMAGE_OPTIONS,
} from "@/lib/imageCompress";

type FieldType = {
  displayName: string;
};

type Props = {
  onSaved?: () => void;
  onPreviewChange?: (preview: string | null) => void;
};

const ProfileForm = ({ onSaved, onPreviewChange }: Props) => {
  const [form] = Form.useForm<FieldType>();
  const { message, notification } = App.useApp();
  const { user, photoURL, updateUserProfile } = useAuth();
  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const [hasLocalPick, setHasLocalPick] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const preview = hasLocalPick ? localPreview : photoURL;

  useEffect(() => {
    onPreviewChange?.(preview);
  }, [preview, onPreviewChange]);

  useEffect(() => {
    form.setFieldsValue({ displayName: user?.displayName || "" });
  }, [user?.displayName, form]);

  const setPreviewSafe = (url: string | null, local: boolean) => {
    setHasLocalPick(local);
    setLocalPreview(url);
    onPreviewChange?.(url);
  };

  const onFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setProcessing(true);
    try {
      const dataUrl = await compressImageFile(file, PROFILE_IMAGE_OPTIONS);
      setPreviewSafe(dataUrl, true);
      message.success("Yeni görsel seçildi — kaydetmek için Güncelle’ye basın");
    } catch (error: unknown) {
      const err = error as { message?: string };
      message.error(err.message || "Görsel işlenemedi");
    } finally {
      setProcessing(false);
    }
  };

  const onFinish = async (values: FieldType) => {
    if (!preview) {
      message.error("Profil görseli seçin");
      return;
    }
    setSaving(true);
    try {
      await updateUserProfile({
        displayName: values.displayName,
        photoURL: preview,
      });
      setHasLocalPick(false);
      message.success("Profil görseli kaydedildi");
      onSaved?.();
    } catch (error: unknown) {
      const err = error as { message?: string };
      notification.error({
        message: err.message || "Profil güncellenemedi",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      initialValues={{ displayName: user?.displayName || "" }}
    >
      <Form.Item
        label="Profil görseli"
        required
        extra="Dosya seçin, önizlemeyi kontrol edin, ardından Güncelle ile kaydedin."
      >
        <div className="profile-photo-picker">
          <div className="profile-photo-picker__preview">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="Profil önizleme" />
            ) : (
              <span className="text-muted">Henüz görsel yok</span>
            )}
          </div>
          <input
            id={inputId}
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="profile-photo-picker__input"
            onChange={onFileChange}
            disabled={processing || saving}
          />
          <label htmlFor={inputId} className="detail-action-btn detail-action-btn--edit">
            {processing ? "İşleniyor…" : "Dosya seç"}
          </label>
        </div>
      </Form.Item>

      <Form.Item<FieldType>
        name="displayName"
        label="Görünen ad"
        rules={[{ required: true, message: "Görünen ad gerekli" }]}
      >
        <Input placeholder="Görünen ad" size="large" />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          block
          loading={saving || processing}
        >
          Güncelle
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
