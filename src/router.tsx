import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home';
import RoomDetail from './routes/RoomDetail';
import Root from './components/Root';
import NotFound from './routes/NotFound';
import GithubConfirm from './components/GithubConfirm';
import KakaoConfim from './components/KakaoConfirm';

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
        {
            path: 'social',
            children: [
                {
                    path: "github",
                    element: <GithubConfirm />,
                },
                {
                    path: "kakao",
                    element: <KakaoConfim />,
                },
            ]
        }
    ]

}]);

export default router;