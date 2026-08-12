"use client";

import { PlusOutlined, LinkOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Upload,
  type UploadFile,
  type UploadProps,
} from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { boyut, govdeAgaci, tekneBoyu, tip } from "@/lib/generalValues";
import { resolveOptionId } from "@/lib/baglamaOptions";
import { addBaglama, updateBaglama } from "@/firebase.config";
import { modifyString } from "@/lib/genFunc";
import { useAuth } from "@/context/AuthContext";
import type { Baglama } from "@/lib/Interfaces";
import {
  assertGalleryFits,
  BAGLAMA_IMAGE_OPTIONS,
  compressImageFile,
  resolveUploadFile,
} from "@/lib/imageCompress";

type FieldType = {
  title: string;
  boyut: number;
  govdeAgaci: number;
  tekneBoyu: number;
  tip: number;
  description: string;
  youtubeLink: string;
  fiyat: number;
};

type GalleryItem = {
  id: string;
  url: string;
  name: string;
  source: "upload" | "url";
};

/** Firestore boyut limiti nedeniyle makul üst sınır */
const MAX_IMAGES = 6;

function baglamaToFormValues(baglama: Baglama): Partial<FieldType> {
  return {
    title: baglama.title,
    description: baglama.description,
    youtubeLink: baglama.youtubeLink,
    fiyat: baglama.fiyat,
    boyut: resolveOptionId(
      baglama.boyut,
      boyut.map((b) => ({ id: b.id, label: b.tip })),
    ),
    tip: resolveOptionId(
      baglama.tip,
      tip.map((t) => ({ id: t.id, label: t.isim })),
    ),
    govdeAgaci: resolveOptionId(
      baglama.govdeAgaci,
      govdeAgaci.map((g) => ({ id: g.id, label: g.isim })),
    ),
    tekneBoyu: Number(baglama.tekneBoyu) || undefined,
  };
}

function imagesToGallery(images: string[] = []): GalleryItem[] {
  return images.map((url, index) => ({
    id: `existing-${index}-${url.slice(-24)}`,
    url,
    name: `Görsel ${index + 1}`,
    source: "url" as const,
  }));
}

type Props = {
  initial?: Baglama;
  onCancel?: () => void;
  onUpdated?: () => void;
};

const BaglamaForm = ({ initial, onCancel, onUpdated }: Props) => {
  const isEdit = Boolean(initial?.id);
  const { user, loading: authLoading } = useAuth();
  const { message, notification } = App.useApp();
  const [form] = Form.useForm<FieldType>();
  const router = useRouter();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>(() =>
    initial?.images ? imagesToGallery(initial.images) : [],
  );
  const [externalUrl, setExternalUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const formInitialValues = initial ? baglamaToFormValues(initial) : undefined;

  const addGalleryItem = (item: GalleryItem): boolean => {
    let added = false;
    setGallery((prev) => {
      if (prev.some((g) => g.url === item.url)) {
        return prev;
      }
      if (prev.length >= MAX_IMAGES) {
        message.warning(`En fazla ${MAX_IMAGES} görsel ekleyebilirsiniz`);
        return prev;
      }
      const next = [...prev, item];
      try {
        assertGalleryFits(next.map((g) => g.url));
      } catch (error: unknown) {
        const err = error as { message?: string };
        message.error(err.message || "Galeri boyutu aşıldı");
        return prev;
      }
      added = true;
      return next;
    });
    return added;
  };

  const removeGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
    setFileList((prev) => prev.filter((file) => file.uid !== id));
  };

  const customRequest: UploadProps["customRequest"] = async (options) => {
    const { file, onSuccess, onError } = options;
    const uid =
      typeof file === "object" && file !== null && "uid" in file
        ? String((file as UploadFile).uid)
        : crypto.randomUUID();

    setUploading(true);
    try {
      const uploadFile = resolveUploadFile(file);
      const dataUrl = await compressImageFile(uploadFile, BAGLAMA_IMAGE_OPTIONS);
      const added = addGalleryItem({
        id: uid,
        url: dataUrl,
        name: uploadFile.name,
        source: "upload",
      });
      if (!added) {
        throw new Error("Görsel eklenemedi");
      }
      onSuccess?.(dataUrl);
    } catch (error: unknown) {
      const err = error as { message?: string };
      message.error(err.message || "Resim işlenemedi");
      onError?.(error as Error);
      setFileList((prev) => prev.filter((f) => f.uid !== uid));
    } finally {
      setUploading(false);
    }
  };

  const addExternalImage = () => {
    const url = externalUrl.trim();
    if (!url) return;
    try {
      new URL(url);
    } catch {
      message.error("Geçerli bir görsel URL’si girin");
      return;
    }
    addGalleryItem({
      id: crypto.randomUUID(),
      url,
      name: url.split("/").pop() || "görsel",
      source: "url",
    });
    setExternalUrl("");
  };

  const onFinish = async (values: FieldType) => {
    if (gallery.length === 0) {
      message.error("En az bir görsel ekleyin");
      return;
    }
    if (uploading) {
      message.warning("Yükleme bitene kadar bekleyin");
      return;
    }
    if (authLoading) {
      message.warning("Oturum kontrol ediliyor, tekrar deneyin");
      return;
    }
    if (!user) {
      message.error(
        isEdit
          ? "Güncellemek için giriş yapmalısınız"
          : "Eklemek için giriş yapmalısınız",
      );
      router.replace("/login");
      return;
    }

    const payload = {
      title: values.title,
      boyut: boyut.find((b) => b.id === values.boyut)?.tip ?? "",
      tip: tip.find((t) => t.id === values.tip)?.isim ?? "",
      govdeAgaci:
        govdeAgaci.find((g) => g.id === values.govdeAgaci)?.isim ?? "",
      tekneBoyu: String(values.tekneBoyu),
      description: values.description,
      youtubeLink: values.youtubeLink,
      images: gallery.map((item) => item.url),
      fiyat: values.fiyat,
    };

    setSubmitting(true);
    try {
      assertGalleryFits(payload.images);
      if (isEdit && initial) {
        await updateBaglama(initial.id, payload);
        message.success("Bağlama güncellendi");
        onUpdated?.();
        router.refresh();
      } else {
        await addBaglama(payload);
        message.success("Bağlama başarıyla eklendi");
        form.resetFields();
        setFileList([]);
        setGallery([]);
        router.push(`/baglamalar/${modifyString(values.title)}`);
      }
    } catch (error: unknown) {
      const err = error as { message?: string };
      notification.error({
        message: err.message || (isEdit ? "Güncelleme başarısız" : "Kayıt başarısız"),
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      requiredMark="optional"
      onFinish={onFinish}
      autoComplete="off"
      className="baglama-form"
      initialValues={formInitialValues}
    >
        <Form.Item<FieldType>
          name="title"
          label="Başlık"
          rules={[{ required: true, message: "Başlık girin" }]}
        >
          <Input size="large" placeholder="Örn. Uzun sap 46 tekne dut" />
        </Form.Item>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item<FieldType>
              name="boyut"
              label="Boyut"
              rules={[{ required: true, message: "Boyut seçin" }]}
            >
              <Select
                size="large"
                allowClear
                placeholder="Seçin"
                options={boyut.map((item) => ({
                  value: item.id,
                  label: item.tip,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item<FieldType>
              name="tip"
              label="Yapım şekli"
              rules={[{ required: true, message: "Tip seçin" }]}
            >
              <Select
                size="large"
                allowClear
                placeholder="Seçin"
                options={tip.map((item) => ({
                  value: item.id,
                  label: item.isim,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item<FieldType>
              name="govdeAgaci"
              label="Gövde ağacı"
              rules={[{ required: true, message: "Gövde ağacı seçin" }]}
            >
              <Select
                size="large"
                allowClear
                placeholder="Seçin"
                options={govdeAgaci.map((item) => ({
                  value: item.id,
                  label: item.isim,
                }))}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item<FieldType>
              name="tekneBoyu"
              label="Tekne boyu"
              rules={[{ required: true, message: "Tekne boyu seçin" }]}
            >
              <Select
                size="large"
                allowClear
                placeholder="Seçin"
                options={tekneBoyu.map((item) => ({
                  value: item,
                  label: String(item),
                }))}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[16, 0]}>
          <Col xs={24} sm={8}>
            <Form.Item<FieldType>
              name="fiyat"
              label="Fiyat (₺)"
              rules={[{ required: true, message: "Fiyat girin" }]}
            >
              <InputNumber
                size="large"
                className="w-full"
                min={0}
                step={100}
                placeholder="0"
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                }
                parser={(value) =>
                  Number(value?.replace(/\./g, "") || 0) as 0
                }
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={16}>
            <Form.Item<FieldType>
              name="youtubeLink"
              label="YouTube linki"
              rules={[
                { required: true, message: "YouTube linki girin" },
                { type: "url", message: "Geçerli bir URL girin" },
              ]}
            >
              <Input
                size="large"
                placeholder="https://www.youtube.com/watch?v=..."
                type="url"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item<FieldType>
          name="description"
          label="Açıklama"
          rules={[{ required: true, message: "Açıklama girin" }]}
        >
          <Input.TextArea
            rows={4}
            placeholder="Bağlama hakkında kısa bilgi"
            showCount
            maxLength={800}
          />
        </Form.Item>

        <Form.Item
          label="Görseller"
          required
          extra="Dosyalar cihazınızdan seçilir, tarayıcıda sıkıştırılıp kaydedilir (ek depolama servisi yok). En fazla 6 görsel."
        >
          <Upload
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif"
            listType="picture-card"
            fileList={fileList}
            disabled={gallery.length >= MAX_IMAGES}
            beforeUpload={() => {
              if (gallery.length >= MAX_IMAGES) {
                message.warning(`En fazla ${MAX_IMAGES} görsel`);
                return Upload.LIST_IGNORE;
              }
              return true;
            }}
            customRequest={customRequest}
            onChange={({ fileList: next }) => {
              setFileList(
                next.filter(
                  (f) => f.status === "uploading" || f.status === "done",
                ),
              );
            }}
            onRemove={(file) => {
              removeGalleryItem(file.uid);
              return true;
            }}
            showUploadList={{ showPreviewIcon: true }}
          >
            {gallery.length >= MAX_IMAGES ? null : (
              <div className="baglama-form__upload">
                <PlusOutlined />
                <span>Dosya seç</span>
              </div>
            )}
          </Upload>

          <div className="baglama-form__url-add">
            <Space.Compact style={{ width: "100%" }}>
              <Input
                size="large"
                prefix={<LinkOutlined />}
                placeholder="veya görsel URL’si yapıştır"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                onPressEnter={(e) => {
                  e.preventDefault();
                  addExternalImage();
                }}
              />
              <Button size="large" type="default" onClick={addExternalImage}>
                URL ekle
              </Button>
            </Space.Compact>
          </div>

          {gallery.length > 0 ? (
            <ul className="baglama-form__gallery">
              {gallery.map((item, index) => (
                <li key={item.id}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.url} alt={item.name} />
                  <div className="baglama-form__gallery-meta">
                    <span>
                      {index === 0 ? "Kapak · " : ""}
                      {item.source === "url" ? "URL" : "Yükleme"}
                    </span>
                    <button
                      type="button"
                      aria-label="Görseli kaldır"
                      onClick={() => removeGalleryItem(item.id)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}
        </Form.Item>

        <Form.Item className="baglama-form__actions">
          <Space>
            {onCancel ? (
              <Button size="large" onClick={onCancel} disabled={submitting}>
                İptal
              </Button>
            ) : null}
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={submitting || uploading}
            >
              {isEdit ? "Güncelle" : "Kaydet"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
  );
};

export default BaglamaForm;
