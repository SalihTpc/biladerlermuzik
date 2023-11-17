"use client";
import { Button, Form, Input, message } from "antd";
import { signIn, useSession } from "next-auth/react";

const LoginForm = () => {
  const { status } = useSession();

  const onFinish = async (values: any) => {
    // console.log("Success:", values);
    try {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: "/",
      });
      message.success("User Logged In");
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex items-center justify-center h-40 font-montserrat">
      {status == "loading" ? (
        <div className="w-12 h-12 border-4 border-gray-300 border-t-4 border-t-black rounded-full animate-spin" />
      ) : (
        <Form
          className="flex items-center justify-center flex-col"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Button
            htmlType="submit"
            size="middle"
            type="primary"
            // disabled={!email || !password}
          >
            LOGIN
          </Button>
        </Form>
      )}
    </div>
  );
};

export default LoginForm;
