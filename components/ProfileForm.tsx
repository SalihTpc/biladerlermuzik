"use client";
import { useAuth } from "@/context/AuthContext";
import { App, Button, Form, Input } from "antd";

type FieldType = {
  displayName: string;
  photoURL: string;
};

const ProfileForm = () => {
  const [form] = Form.useForm();
  const { message, notification } = App.useApp();
  const { updateUserProfile } = useAuth();

  const onFinish = async (values: FieldType) => {
    try {
      await updateUserProfile(values);
      message.success("Profil başarıyla güncellendi.");
      form.resetFields();
    } catch (error: unknown) {
      const err = error as { message?: string };
      notification.error({
        message: err.message || "Profil güncellenemedi",
      });
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
      <Form.Item<FieldType>
        name="displayName"
        label="Görünen ad"
        rules={[{ required: true, message: "Görünen ad gerekli" }]}
      >
        <Input placeholder="Görünen ad" size="large" />
      </Form.Item>
      <Form.Item<FieldType> name="photoURL" label="Profil görseli URL">
        <Input placeholder="https://..." type="url" size="large" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" block>
          Güncelle
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
