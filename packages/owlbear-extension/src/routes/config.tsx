import { Route, Routes } from "react-router"
import MainLayout from "../layouts/MainLayout"
import HomePage from "../pages/Home"
import HistoryPage from "../pages/History"
import InitPage from "@pages/Init"

// const routes = [
//     {
//         path: '/',

//     }
// ]

export default function CustomRoute() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/init" element={<InitPage />} />
            </Route>
        </Routes>
    )
}