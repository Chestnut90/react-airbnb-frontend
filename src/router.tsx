import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Root from './components/Root';
import NotFound from './routes/NotFound';

const router = createBrowserRouter([{
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
        {
            path: '/Home', element: <Home />
        }
    ]

}]);

export default router;