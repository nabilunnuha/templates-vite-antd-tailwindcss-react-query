import NotFound from './notFound';
import Home from '../pages/home';
import About from '../pages/about';

const Content = ({ pathname }: { pathname: string }) => {
    switch (pathname) {
        case '/home':
            return <Home />
        case '/about':
            return <About />
        default:
            return <NotFound title={`Unknown Page "${pathname}"`} />
    }
}

export default Content