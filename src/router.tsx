import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home';
import RoomDetail from './routes/RoomDetail';
import Root from './components/Root';
import NotFound from './routes/NotFound';

const router = createBrowserRouter([{
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
        {
            path: '',
            element: <Home />
        },
        {
            path: 'rooms/:roomPK',
            element: <RoomDetail />
        },
    ]

}]);

export default router;