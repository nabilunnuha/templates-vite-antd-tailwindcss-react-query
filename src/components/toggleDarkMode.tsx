import { useTheme } from '../themeProvider';
import { Button, Tooltip } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { ReactNode, useEffect } from 'react';

interface ToggleDarkModeProps {
    showIcon?: boolean
    showText?: boolean
    size?: 'large' | 'middle' | 'small'
    darkText?: string
    lightText?: string
    darkIcon?: ReactNode
    lightIcon?: ReactNode
}

const ToggleDarkMode = ({ showIcon = true, showText = false, size = 'middle', darkText = 'Switch to Light Mode', lightText = 'Switch to Dark Mode', lightIcon = <SunOutlined />, darkIcon = <MoonOutlined /> }: ToggleDarkModeProps) => {
    const { isDark, toggleTheme } = useTheme();

    useEffect(() => {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <Tooltip title={!showText && isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
            <Button
                onClick={() => toggleTheme(!isDark)}
                size={size}
                type={showIcon ? 'text' : undefined}
                icon={showIcon ? isDark ? lightIcon : darkIcon : undefined}
            >
                {showText ? isDark ? darkText : lightText : undefined}
            </Button>
        </Tooltip>
    )
}

export default ToggleDarkMode