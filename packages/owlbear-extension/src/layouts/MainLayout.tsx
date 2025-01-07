import { Outlet } from "react-router";
import Nav from "../components/layouts/MainLayout/Nav";

export default function MainLayout() {
    return (
        <>
            <Nav />
            <main className="">
                <Outlet />
            </main>
        </>
    )
}