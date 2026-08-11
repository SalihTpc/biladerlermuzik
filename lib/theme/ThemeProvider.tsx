"use client";

import { App, ConfigProvider } from "antd";
import type { TenantTheme } from "@/lib/tenants/types";
import type { ReactNode } from "react";

type Props = {
  theme: TenantTheme;
  children: ReactNode;
};

export default function ThemeProvider({ theme, children }: Props) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme.colors.accent,
          colorBgContainer: theme.colors.surface,
          colorText: theme.colors.text,
          colorBorder: theme.colors.border,
          borderRadius: 8,
          fontFamily: theme.fonts.body,
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
