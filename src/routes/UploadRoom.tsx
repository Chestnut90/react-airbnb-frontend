import ProtectedPage from "../components/ProtectedPage";
import useHostOnlyPage from "../lib/useHostOnlyPage";

export default function UploadRoom() {
    useHostOnlyPage();
    return (
        <ProtectedPage>
            <h1>Upload Page</h1>
        </ProtectedPage>
    )
}