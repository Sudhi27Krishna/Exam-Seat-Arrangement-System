import NavBar from './NavBar';
import { Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="flex flex-row">
            <NavBar />
            <Outlet />
        </div>
    );
}
export default Layout;