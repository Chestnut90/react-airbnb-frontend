import { createBrowserRouter } from 'react-router-dom';
import Home from './routes/Home';
import RoomDetail from './routes/RoomDetail';
import Root from './components/Root';
import NotFound from './routes/NotFound';
import GithubConfirm from './components/GithubConfirm';
import KakaoConfim from './components/KakaoConfirm';
import UploadRoom from './routes/UploadRoom';
import UploadPhotos from './routes/UploadPhotos';

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
            path: 'rooms/upload',
            element: <UploadRoom />
        },
        {
            path: 'rooms/:roomPK',
            element: <RoomDetail />,
        },
        {
            path: 'rooms/:roomPK/photos',
            element: <UploadPhotos />,
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