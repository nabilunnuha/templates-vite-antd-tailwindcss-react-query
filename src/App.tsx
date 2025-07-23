import { Button, Card, List } from "antd";
import { useMessage, useNotification } from "./themeProvider";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const nofitication = useNotification();
  const message = useMessage();

  const todos = useQuery({
    queryKey: ["todos"],
    retry: 1,
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      if (!res.ok) {
        throw new Error("Failed to fetch todos");
      }
      return (await res.json()) as Todo[];
    },
  });

  return (
    <main className="flex w-full h-dvh flex-col gap-2 items-center overflow-auto scroll-thin">
      <h1>Hello World</h1>
      <Button onClick={() => nofitication.info({ message: "Clicked" })}>
        Click Nofitication
      </Button>
      <Button onClick={() => message.info("Clicked")}>Click Message</Button>
      <Card classNames={{ body: "h-80 overflow-auto scroll-thin" }}>
        <List
          loading={todos.isFetching}
          dataSource={todos.data}
          renderItem={(item, _) => (
            <List.Item key={item.id}>
              <p>{item.userId}</p>
              <p>{item.title}</p>
              {item.completed ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <ExclamationCircleOutlined style={{ color: "red" }} />
              )}
            </List.Item>
          )}
        />
      </Card>
      <Button onClick={() => todos.refetch()}>Refech</Button>
    </main>
  );
}

export default App;
