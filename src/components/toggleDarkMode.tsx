import { useTheme } from '../themeProvider';
import { Button, Tooltip } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { useEffect } from 'react';

interface ToggleDarkModeProps {
    icon?: boolean
    text?: boolean
    size?: 'large' | 'middle' | 'small'
    darkText?: string
    lightText?: string
}

const ToggleDarkMode = ({ icon = true, text = false, size = 'middle', darkText = 'Switch to Light Mode', lightText = 'Switch to Dark Mode' }: ToggleDarkModeProps) => {
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <Tooltip title={!text && isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <Button
                onClick={() => toggleTheme(!isDark)}
                size={size}
                type={icon ? 'text' : undefined}
                icon={icon ? isDark ? <SunOutlined /> : <MoonOutlined /> : undefined}
            >
                {text ? isDark ? darkText : lightText : undefined}
            </Button>
        </Tooltip>
    )
}

export default ToggleDarkMode