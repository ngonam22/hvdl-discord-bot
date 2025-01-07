import { Route, Routes } from "react-router"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home"

// const routes = [
//     {
//         path: '/',

//     }
// ]

export default function CustomRoute() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
            </Route>
        </Routes>
    )
}