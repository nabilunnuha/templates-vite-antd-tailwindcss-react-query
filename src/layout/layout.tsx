import { Button, Layout, Tooltip } from 'antd';
import { useTheme } from '../themeProvider';
import { Link, useLocation } from 'react-router-dom';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import Header from './header';
import Content from './content';
import ToggleDarkMode from '../components/toggleDarkMode';
import { AntDesignOutlined, GithubOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

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
    },
]

const itemsNode: ReactNode[] = [
    <ToggleDarkMode size='middle' />,
    <Tooltip title='Github'><Button type='text' href='https://github.com/nabilunnuha/' target='_blank' icon={<GithubOutlined />} /></Tooltip>,
    <Tooltip title='Ant Design'><Button type='text' href='https://ant.design/' target='_blank' icon={<AntDesignOutlined />} /></Tooltip>
]

const LayoutPage = () => {
    const { isDark } = useTheme();
    const location = useLocation()

    return (
        <Layout className={`${isDark ? 'bg-[#141414] text-white' : 'bg-white text-[#141414]'} w-full h-screen overflow-hidden flex flex-col`}>
            <Header title={'Vite Template'} menuItem={menuItem} pathname={location.pathname} menuItemNode={itemsNode} />
            <Layout.Content className={`w-full h-[calc(100vh-4rem)] overflow-auto flex ${isDark && 'bg-[#1e1e1e]'}`} style={{ scrollbarWidth: 'thin' }}>
                <Content pathname={location.pathname} />
            </Layout.Content>
        </Layout>
    )
}

export default LayoutPage