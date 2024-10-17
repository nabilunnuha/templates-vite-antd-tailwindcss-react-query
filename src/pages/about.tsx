import { useQuery } from '@tanstack/react-query';
import { Empty, Flex, List, Skeleton, Spin, Typography } from 'antd';

interface Post {
    id: number;
    title: string;
    body: string;
}

const About = () => {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['posts'],
        retry: false,
        enabled: true,
        // refetchInterval: 15000,
        staleTime: Infinity,
        queryFn: async (): Promise<Post[]> => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            return response.json();
        },
    });

    if (isError) return <Empty description={error.toString()} />
    if (isLoading) return <Skeleton active={isLoading} />

    return (
        <List
            dataSource={data}
            size='small'
            renderItem={(item) => (
                <List.Item key={item.id}>
                    <Flex vertical gap={'small'}>
                        <Typography.Title level={5}>
                            {item.title}
                        </Typography.Title>
                        <Typography.Text>
                            {item.body}
                        </Typography.Text>
                    </Flex>
                </List.Item>
            )}
        />
    )
}

export default About