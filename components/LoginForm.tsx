"use client";
import { Button, Form, Input, message } from "antd";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginForm = () => {
  const { login, user, loading } = useAuth();
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
        <div className="w-12 h-12 border-4 border-gray-300 border-t-4 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-40 font-montserrat">
      <Form
        className="flex items-center justify-center flex-col"
        onFinish={onFinish}
        labelCol={{ span: 7 }}
        wrapperCol={{ span: 17 }}
      >
        <Form.Item
          label="Email"
          name="email"
          className="w-full font-montserrat"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input
            required
            type="email"
            placeholder="Email"
            className="w-full font-montserrat"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          className="w-full"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 17 }}
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input
            required
            type="password"
            placeholder="***"
            className="w-full"
          />
        </Form.Item>
        <Button htmlType="submit" size="middle" type="primary">
          LOGIN
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
