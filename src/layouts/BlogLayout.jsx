import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext';
import './BlogLayout.css';

function BlogLayout() {
    const setActiveClass = ({ isActive }) => isActive ? 'nav-link active' : 'nav-link';

    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        logout();
        navigate('/news');
    }

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
                    {/* БЛОК АВТОРИЗАЦИИ */}
                    <div>
                        { currentUser ? (
                            <>
                                <span>Привет, {currentUser.username}</span>
                                <button onClick={handleLogoutClick}>Выйти</button>
                            </>
                        ) : (
                            <Link to='/login'>Войти</Link>
                        )}
                    </div>
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