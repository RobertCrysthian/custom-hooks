import { createBrowserRouter } from "react-router";
import PageHome from "../pages/home";


const router = createBrowserRouter([
    {
        path: "/", Component: PageHome,
    }
])

export default router;