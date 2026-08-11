"use client";
import { useAuth } from "@/context/AuthContext";
import { Button, Form, Input, message, notification } from "antd";

type FieldType = {
  displayName: string;
  photoURL: string;
};

const ProfileForm = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { updateUserProfile } = useAuth();

  const onFinish = async (values: FieldType) => {
    try {
      await updateUserProfile(values);
      message.success("Profil başarıyla güncellendi.");
      form.resetFields();
    } catch (error: unknown) {
      const err = error as { message?: string };
      api.error({
        message: err.message || "Profil güncellenemedi",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        className="flex flex-col items-center"
      >
        <Form.Item<FieldType>
          name="displayName"
          rules={[
            { required: true, message: "Please input your Display Name!" },
          ]}
        >
          <Input className="w-full" placeholder="Display Name" type="text" />
        </Form.Item>
        <Form.Item<FieldType>
          name="photoURL"
          rules={[
            {
              type: "url",
              required: true,
              message: "Please input your Photo Url!",
            },
          ]}
        >
          <Input className="w-full" placeholder="Profile Url" type="url" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ProfileForm;
