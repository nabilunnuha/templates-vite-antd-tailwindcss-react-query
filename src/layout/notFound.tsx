import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

const NotFound = ({ title = '' }: { title?: string }) => {
    return <Result
        status={'404'}
        title={title}
        extra={<Button type='link'>
            <Link to={'/'}>Back</Link>
        </Button>}
    />
}

export default NotFound