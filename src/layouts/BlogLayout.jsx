import { NavLink, Link, Outlet } from "react-router-dom";
import './BlogLayout.css';

function BlogLayout() {
    const setActiveClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

    return (
        <>
            <header>
                <div>
                    <Link to={{ pathname: '/news' }}>IT-NEWS-BLOG</Link>
                </div>
                <nav>
                    <NavLink to="/news" className={setActiveClass}> Лента </NavLink>
                    <NavLink to="/about" className={setActiveClass}> О нас </NavLink>
                    <NavLink to="/dashboard/profile" className={setActiveClass}> Кабинет автора </NavLink>
                </nav>
            </header>
            <main>
                {/* указывает React Router куда именно внутри макета нужно вставлять 
                дочерние компоненты */}
                <Outlet />
            </main>
            <footer>
                <p>&copy; 2026 Все права защищены. React Router Dom</p>
            </footer>
        </>
    )
};

export default BlogLayout;