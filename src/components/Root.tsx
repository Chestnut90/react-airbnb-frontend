import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <div>
            <h1>Header Section</h1>
            <Outlet />
            <h1>Footer Section</h1>
        </div>
    )
}

