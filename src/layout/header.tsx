import { Avatar, Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { useTheme } from '../themeProvider';
import EachUtils from '../utils/eachUtils';

interface HeaderProps {
    pathname: string
    icon?: string | ReactNode
    title?: string | React.ReactNode
    menuItem?: ItemType<MenuItemType>[] | undefined
    menuItemNode?: ReactNode[] | undefined
}

const Header = ({ pathname, icon = undefined, title = 'Vite Template', menuItem = undefined, menuItemNode = [] }: HeaderProps) => {
    const { isDark } = useTheme();

    return (
        <Layout.Header className={`header ${isDark ? 'bg-[#141414]' : 'bg-white'} flex w-full justify-between items-center hover:shadow-md shadow gap-2 h-16 py-0 md:px-10 px-4`}>
            <Link to={'/'} className='flex gap-2 justify-center items-center flex-shrink w-fit'>
                <Avatar shape='square' src={icon ? icon : 'https://vitejs.dev/logo.svg'} />
                <span className='text-xl text-nowrap font-medium capitalize hidden md:block overflow-hidden'>{title}</span>
            </Link>
            <div className='flex h-full items-center justify-end gap-2 w-max flex-grow min-w-10'>
                <Menu
                    className='min-w-0 w-full flex-auto md:max-w-max'
                    mode="horizontal"
                    items={menuItem}
                    overflowedIndicator={<MenuOutlined />}
                    activeKey={pathname.replace('/', '')}
                    selectedKeys={[pathname.replace('/', '')]}
                />
                <EachUtils dataSource={menuItemNode} render={(item) => item} />
            </div>
        </Layout.Header>
    );
};



export default Header