import { Button, Flex, Result } from 'antd'
import { Link } from 'react-router-dom'

const NotFound = ({ title = '' }: { title?: string }) => {
    return (
        <Flex justify='center' align='center' className='w-full'>
            <Result
                status={'404'}
                title={title && title}
                extra={<Button type='link'><Link to={'/'}>Back</Link></Button>}
            />
        </Flex>
    )
}

export default NotFound