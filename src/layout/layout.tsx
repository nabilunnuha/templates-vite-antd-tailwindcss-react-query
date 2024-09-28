import { useQuery } from '@tanstack/react-query';
import { Avatar, Button, Empty, Flex, Layout, List, Menu, Spin, Tooltip, Typography } from 'antd';
import { useMessage, useNotification, useTheme } from '../themeProvider';
import ToggleDarkMode from '../components/toggleDarkMode';
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import { AntDesignOutlined, GithubOutlined } from '@ant-design/icons';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import NotFound from './notFound';

interface Post {
    id: number;
    title: string;
    body: string;
}

const Abouts = () => {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['posts'],
        retry: false,
        queryFn: async (): Promise<Post[]> => {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            return response.json();
        },
    });

    if (isError) return <Empty description={error.toString()} />

    return (
        <Spin size="large" spinning={isLoading}>
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
        </Spin>
    )
}

const Header = ({ pathname, icon = undefined, title = 'Vite Template', menuItem = undefined }: { pathname: string, icon?: string | React.ReactNode, title?: string | React.ReactNode, menuItem?: ItemType<MenuItemType>[] | undefined }) => {
    return (
        <>
            <Link to={'/'} className='flex gap-2 justify-center items-center'>
                <Avatar shape='square' src={icon ? icon : 'https://vitejs.dev/logo.svg'} />
                <Typography.Text ellipsis className='text-xl font-medium capitalize'>{title}</Typography.Text>
            </Link>
            <Flex align='center' className='h-full' gap={'small'}>
                <Menu
                    className='w-fit items-center p-0 m-0'
                    mode="horizontal"
                    inlineCollapsed={false}
                    inlineIndent={12}
                    items={menuItem}
                    activeKey={pathname.replace('/', '')}
                    selectedKeys={[pathname.replace('/', '')]}
                />
                < ToggleDarkMode size='middle' />
                <Tooltip title='Github'><Button type='text' href='https://github.com/nabilunnuha/' target='_blank' icon={<GithubOutlined />} /></Tooltip>
                <Tooltip title='Ant Design'><Button type='text' href='https://ant.design/' target='_blank' icon={<AntDesignOutlined />} /></Tooltip>
            </Flex>
        </>
    )
}

const Home = () => {
    const messageApi = useMessage()
    const notificationApi = useNotification()

    return <>
        <Typography.Title level={1} className='capitalize'>{'wkwkwkwkwkwk'}</Typography.Title>
        <Flex gap={'small'}>
            <Button onClick={() => messageApi.success('Button Message Clicked!')}>Show Message</Button>
            <Button type='primary' onClick={() => notificationApi.success({ message: 'Success', description: 'this is notification success' })}>Show Notification</Button>
        </Flex>
    </>
}

const Content = ({ pathname }: { pathname: string }) => {
    switch (pathname) {
        case '/home':
            return <Home />
        case '/about':
            return <Abouts />
        default:
            return <NotFound title={`Unknown Page "${pathname}"`} />
    }
}

const LayoutPage = () => {
    const { isDark } = useTheme();
    const location = useLocation()

    const menuItem: ItemType<MenuItemType>[] = [
        {
            key: 'home',
            label: <Link to={'/home'}>Home</Link>,
        },
        {
            key: 'about',
            label: <Link to={'/about'}>About</Link>
        },
        {
            key: 'contact',
            label: <Link to={'/contact'}>Contact</Link>
        },
        {
            key: 'development',
            label: <Link to={'/development'}>Development</Link>
        }
    ]

    return (
        <Layout className={`${isDark ? 'bg-[#141414] text-white' : 'bg-white text-[#141414]'} w-full h-screen overflow-hidden flex flex-col`}>
            <Layout.Header className={`${isDark ? 'bg-[#141414]' : 'bg-white'} flex w-full justify-between items-center hover:shadow-md shadow h-16 py-0 px-10`}>
                <Header title={'Vite Template'} menuItem={menuItem} pathname={location.pathname} />
            </Layout.Header>
            <Layout.Content className={`w-full h-[calc(100vh-4rem)] overflow-auto flex flex-col items-center justify-center ${isDark && 'bg-[#1e1e1e]'}`} style={{ scrollbarWidth: 'thin' }}>
                <Content pathname={location.pathname} />
            </Layout.Content>
        </Layout>
    )
}

export default LayoutPage