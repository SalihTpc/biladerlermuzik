"use client";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Upload,
  message,
  notification,
} from "antd";
import { useState } from "react";
import { boyut, govdeAgaci, tekneBoyu, tip } from "@/lib/generalValues";
import { UploadChangeParam } from "antd/lib/upload";
import { addBaglama, storage } from "@/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const BaglamaForm = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageChange = async (info: UploadChangeParam) => {
    console.log(info.fileList);
    if (info.file.status === "done" && info.file.originFileObj) {
      try {
        console.log("first");
        const storageRef = ref(storage, "images/" + info.file.name);
        await uploadBytes(storageRef, info.file.originFileObj);
        const imageUrl = await getDownloadURL(storageRef);
        console.log(imageUrl);
        setImageUrls((prevUrls) => [...prevUrls, imageUrl]);
      } catch (error: any) {
        message.error("Resmi yüklerken hata oluştu: " + error.message);
      }
    }
  };

  const onFinish = async (values: any) => {
    values.images = imageUrls;
    console.log(values);

    // try {
    //   await addBaglama(values);
    //   message.success("Yeni Bağlama Başarıyla Eklendi.");
    // } catch (error: any) {
    //   api.error({
    //     message: error.message,
    //   });
    // }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    title: string;
    boyut: string;
    govdeAgaci: string;
    tekneBoyu: string;
    tip: string;
    description: string;
    youtubeLink: string;
    images: string[];
    fiyat: number;
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={4}>
          <Form.Item<FieldType>
            name="boyut"
            rules={[{ required: true, message: "Boyut seçin!" }]}
            className="w-full"
          >
            <Select
              className="w-full"
              allowClear
              placeholder="Boyut"
              options={boyut.map((boyut) => {
                return {
                  value: boyut.id,
                  label: boyut.tip,
                };
              })}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item<FieldType>
            name="govdeAgaci"
            rules={[{ required: true, message: "Gövde Ağacı seçin!" }]}
          >
            <Select
              allowClear
              placeholder="Gövde Ağacı"
              options={govdeAgaci.map((govdeAgaci) => {
                return {
                  value: govdeAgaci.id,
                  label: govdeAgaci.isim,
                };
              })}
            />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item<FieldType>
            name="tip"
            rules={[{ required: true, message: "Tipini seçin!" }]}
          >
            <Select
              allowClear
              placeholder="Yapım şeklini seçin"
              options={tip.map((tip) => {
                return {
                  value: tip.id,
                  label: tip.isim,
                };
              })}
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item<FieldType>
            name="tekneBoyu"
            rules={[{ required: true, message: "Tekne Boyu seçin!" }]}
          >
            <Select
              allowClear
              placeholder="Tekne Boyu seçin"
              options={tekneBoyu.map((tekneBoyu) => {
                return {
                  value: tekneBoyu,
                  label: tekneBoyu,
                };
              })}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item<FieldType>
            name="description"
            rules={[
              {
                required: true,
                message: "Geçerli bir resim yükleyin",
              },
            ]}
          >
            <Input.TextArea className="w-full" placeholder="Açıklama Girin" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={6}>
          <Form.Item<FieldType>
            name="title"
            rules={[
              {
                required: true,
                message: "Başlık Girin",
              },
            ]}
          >
            <Input className="w-full" placeholder="Başlık" type="text" />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Form.Item<FieldType>
            name="fiyat"
            rules={[
              {
                required: true,
                message: "Fiyat Girin",
              },
            ]}
          >
            <InputNumber className="w-full" placeholder="Fiyat" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item<FieldType>
            name="youtubeLink"
            rules={[
              {
                required: true,
                message: "Geçerli bir youtub linki yükleyin",
              },
            ]}
          >
            <Input className="w-full" placeholder="Youtube Link" type="url" />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item<FieldType> name="images">
            <Upload
              listType="picture-card"
              showUploadList={true}
              beforeUpload={() => false}
              onChange={handleImageChange}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Yükle</div>
              </div>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button className="float-right" type="primary" htmlType="submit">
          Gönder
        </Button>
      </Form.Item>

      {imageUrls.map((image, index) => (
        <img
          key={index}
          src={image} // Burada "image/jpeg" türünü ve resim formatını değiştirebilirsiniz.
          alt="Base64 Resim"
        />
      ))}
    </Form>
  );
};

export default BaglamaForm;
