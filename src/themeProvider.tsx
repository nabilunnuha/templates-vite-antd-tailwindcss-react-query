import { ConfigProvider, message, notification, theme } from "antd";
import type { MessageInstance } from "antd/es/message/interface";
import type { NotificationInstance } from "antd/es/notification/interface";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextProps {
  isDark: boolean;
  toggleTheme: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
const MessageContext = createContext<MessageInstance | undefined>(undefined);
const NotificationContext = createContext<NotificationInstance | undefined>(
  undefined
);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a ThemeProvider");
  }
  return context;
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a ThemeProvider");
  }
  return context;
};

const ThemeProvider = ({
  children = undefined,
}: {
  children?: React.ReactNode;
}) => {
  const [isDark, setIsDark] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const [messageApi, contextHolderMessage] = message.useMessage();
  const [notificationApi, contextHolderNotification] =
    notification.useNotification();

  const toggleTheme = (value: boolean) => {
    setIsDark(value);
    localStorage.setItem("theme", value ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <ThemeContext.Provider value={{ isDark, toggleTheme }}>
        {contextHolderMessage}
        {contextHolderNotification}

        <MessageContext.Provider value={messageApi}>
          <NotificationContext.Provider value={notificationApi}>
            {children}
          </NotificationContext.Provider>
        </MessageContext.Provider>
      </ThemeContext.Provider>
    </ConfigProvider>
  );
};

export default ThemeProvider;
