"use client";
import { App, Button, Form, Input } from "antd";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginForm = () => {
  const { login, user, loading } = useAuth();
  const { message } = App.useApp();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/");
    }
  }, [loading, user, router]);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      message.success("Giriş başarılı");
      router.push("/");
    } catch (error: unknown) {
      const err = error as { message?: string };
      message.error(err.message || "Giriş başarısız");
    }
  };

  if (loading || user) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <Form
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      style={{ width: "100%" }}
    >
      <Form.Item
        label="E-posta"
        name="email"
        rules={[{ required: true, message: "E-posta gerekli" }]}
      >
        <Input type="email" placeholder="E-posta" size="large" />
      </Form.Item>
      <Form.Item
        label="Şifre"
        name="password"
        rules={[{ required: true, message: "Şifre gerekli" }]}
      >
        <Input.Password placeholder="Şifre" size="large" />
      </Form.Item>
      <Button htmlType="submit" type="primary" size="large" block>
        Giriş yap
      </Button>
    </Form>
  );
};

export default LoginForm;
