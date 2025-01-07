import { Outlet } from "react-router";

export default function MainLayout() {
    return (
        <div>
            <header>Main Header</header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}