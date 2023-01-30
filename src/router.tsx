import { createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';
import Root from './components/Root';

const router = createBrowserRouter([{
    path: '/',
    element: <Root />,
    children: [
        {
            path: '/Home', element: <Home />
        }
    ]

}]);

export default router;