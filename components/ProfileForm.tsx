"use client";
import { updateMyProfile } from "@/firebase.config";
import { Button, Form, Input, message, notification } from "antd";

const ProfileForm = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values: FieldType) => {
    console.log(values);

    try {
      await updateMyProfile(values);
      message.success("Profile başarıyla güncellendi.");
    } catch (error: any) {
      api.error({
        message: error.message,
      });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    displayName: string;
    photoURL: string;
  };

  return (
    <Form
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className="flex flex-col items-center"
    >
      <Form.Item<FieldType>
        name="displayName"
        rules={[{ required: true, message: "Please input your Display Name!" }]}
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
  );
};

export default ProfileForm;
