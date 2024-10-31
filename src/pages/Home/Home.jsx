import { Outlet } from "react-router-dom"
import Sidebar from "../../components/Sidebar"

function Home() {
    return (
        <div style={{ display: "flex" }}>
            <div>
                <Sidebar />
            </div>
            <div style={{ width: '100%' }}>
                <Outlet />
            </div>
        </div>
    )
}

export default Home
