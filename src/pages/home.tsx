import { Button, Flex, Typography } from 'antd';
import { useMessage, useNotification } from '../themeProvider'

const Home = () => {
    const messageApi = useMessage()
    const notificationApi = useNotification()

    return (
        <Flex justify='center' align='center' className='w-full' vertical>
            <Typography.Title level={1} className='capitalize'>{'wkwkwkwkwkwk'}</Typography.Title>
            <Flex gap={'small'}>
                <Button onClick={() => messageApi.success('Button Message Clicked!')}>Show Message</Button>
                <Button type='primary' onClick={() => notificationApi.success({ message: 'Success', description: 'this is notification success' })}>Show Notification</Button>
            </Flex>
        </Flex>
    )
}

export default Home