# Инструкция по созданию BLOG

---

## ЭТАП 1. Создание локального проекта и первая отправка на GitHub

### Шаг 1.1. Инициализация React-приложения через Vite
Откройте терминал в вашей рабочей папке и выполните команды:

```bash
# Создаем проект на React с шаблоном Vite
npm create vite@latest blog -- --template react

# Переходим в папку созданного проекта
cd blog

# Устанавливаем базовые зависимости проекта
npm install

# Устанавливаем библиотеку маршрутизации (React Router)
npm install react-router-dom
```
### Шаг 1.2. Создание стартовой структуры папок
Внутри папки src/ необходимо создать следующую архитектуру проекта:  

```text
src/
├── layouts/
│   ├── BlogLayout.jsx
│   └── BlogLayout.css
└── pages/
    ├── NewsFeed.jsx
    ├── ArticlePage.jsx
    ├── About.jsx
    ├── NotFound.jsx
    ├── Dashboard.jsx
    ├── Profile.jsx
    └── Settings.jsx
```

### Шаг 1.3. Создание фундамента и базовых маршрутов
напишем код  файла src/main.jsx

```jsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import BlogLayout from './layouts/BlogLayout';
import NewsFeed from './pages/NewsFeed';
import ArticlePage from './pages/ArticlePage';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      {/* ПРАВИЛО РЕДИРЕКТА: если пользователь зашел просто на сайт ("/") 
      http://localhost/ мы автоматически перенаправляем в ленту новостей /news
      replace - указывает что страницу "/" не нужно сохранять в истории переходов
      */}
      <Route path='/' element={<Navigate to="/news" replace />} />
      <Route path='/' element={<BlogLayout />} >
          <Route path='news' element={<NewsFeed />} />
          <Route path='about' element={<About />} />
          {/* news/42   news/js-article */}
          <Route path='news/:articleId' element={<ArticlePage />} />
          <Route path='dashboard' element={<Dashboard />} >
            {/* /dashboard/profile */}
            <Route path='profile' element={<Profile />} />
            {/* /dashboard/settings*/}
            <Route path='settings' element={<Settings />} />
          </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  </Router>
);

```
### Шаг 1.4 Создание макета (Layout) и навигации
Создадим src/layouts/BlogLayout.jsx:

```jsx
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
```

### Шаг 1.5. Лента новостей (Компонент NewsFeed)
Создадим src/pages/NewsFeed.jsx:

```jsx
import { Link } from "react-router-dom";

const ARTICLES_DATA = [
    {
     id: 'future-of-js', 
     title: 'Статья 1',
     description: 'Описанние статьи 1'   
    },
    {
     id: 'css-modules', 
     title: 'Статья 2',
     description: 'Описанние статьи 2'   
    },
    {
     id: 'react-router-v6', 
     title: 'Статья 3',
     description: 'Описанние статьи 3'   
    }
]
function NewsFeed(){
    return (
        <>
            <h1>Лента свежих новостей</h1>
            <div>
                {ARTICLES_DATA.map((article) => (
                    <article key={article.id}>
                        <h2>{article.title}</h2>
                        <h2>{article.description}</h2>
                        <Link to={`/news/${article.id}`}>
                            Читать полностью
                        </Link>
                    </article>
                ) )}
            </div>
        </>
    );
};
export default NewsFeed;
```
### Шаг 1.6. Динамические параметры (Хук useParams)
Создадим src/pages/ArticlePage.jsx:

```jsx
import { useParams, useNavigate } from "react-router-dom";

function ArticlePage(){
    const { articleId } = useParams();
    const navigate = useNavigate(); //  возвращает функцию с помощью которой можно програмно менять URL
    
    const handleGoBack = () => {
        navigate(-1);
    };   
    const handleGoHome = () => {
        navigate('/news');
    };

    return (
        <>
            <button onClick={handleGoBack}> --Назад в ленту </button>
            <div>
                <h1>Вы читаете статью {articleId}</h1>
                <p>здесь полноценный текст статьи</p>
            </div>
            <button onClick={handleGoHome}> На главную ленту </button>
        </>
    );
    
}

export default ArticlePage;
```

### Шаг 1.7. Личный кабинет и вложенность (Вложенные Route)
Создадим src/pages/Dashboard.jsx:

```jsx
import { Link, Outlet } from "react-router-dom";

function Dashboard() {
    return (
        <>
            <aside>
                <h3>Кабинет автора</h3>
                <ul>
                    <li><Link to='/dashboard/profile'>Мой профиль</Link></li>
                    <li><Link to='/dashboard/settings'>Настройки</Link></li>
                </ul>
            </aside>
             <section>
                <h2>Добро пожаловать в панель управления!</h2>
                <div>
                    <Outlet />
                </div>
             </section>
        </>
    );
}
export default Dashboard;

```

### Шаг 1.8.создадим заглушки для профиля (src/pages/Profile.jsx) и настроек (src/pages/Settings.jsx):

```jsx 
function Profile() {
    return (
        <>
           <h3>Личный профиль</h3> 
        </>
    );
}
export default Profile;


function Settings() {
    return (
        <>
           <h3>Настройки</h3> 
        </>
    );
}
export default Settings;
```

### Шаг 1.9.Обработка ошибок (Компонент NotFound)
Создадим src/pages/NotFound.jsx:

```jsx
import { Link } from "react-router-dom";

function NotFound(){
    return (
        <>
            <h1>Ошибка 404</h1>
            <p>Страница, которую вы ищите, куда-то испарилась</p>
            <Link to='/news'>Вернуться в ленту новостей</Link>
        </>
    );
}
export default NotFound;
```

### Шаг 1.10.About.jsx
Создайте src/pages/About.jsx

```jsx 
function About() {
    return (
        <>
           <h3>О нашем блоге</h3> 
        </>
    );
}
export default About;
```

### Шаг 1.11. Привязка к Git и первая фиксация в ветке main

```bash
# Инициализируем локальный Git-репозиторий
git init

# Добавляем все файлы в индекс для отслеживания
git add .

# Делаем первый коммит в главной ветке
git commit -m "Initial commit: Создана структура проекта и настроен Vite"

# Переименовываем ветку по умолчанию в main (если это необходимо)
git branch -M main

# Связываем локальный репозиторий со своим пустым удаленным репозиторием на GitHub
# (Вместо ССЫЛКА_НА_РЕПОЗИТОРИЙ  подставляем свой URL)
git remote add origin ССЫЛКА_НА_РЕПОЗИТОРИЙ

# Отправляем изменения на GitHub
git push -u origin main
```



## ЭТАП 2.  Ветка feature-filter — Разработка фильтрации и поиска

### Шаг 2.1. Создание изолированной ветки 

```bash
# Создаем ветку feature-filter и автоматически переключаемся на неё
git checkout -b feature-filter
```
### Шаг 2.2. Написание кода компонента src/pages/NewsFeed.jsx
```jsx 
import { Link, useSearchParams } from "react-router-dom";
// http:localhost/news?search=react&category=frontend

const ARTICLES_DATA = [
    {
     id: 'future-of-js', 
     title: 'Статья 1',
     description: 'Описанние статьи 1',
     category: 'javascript'   
    },
    {
     id: 'css-modules', 
     title: 'Статья 2',
     description: 'Описанние статьи 2',
     category: 'css'   
    },
    {
     id: 'react-router-v6', 
     title: 'Статья 3',
     description: 'Описанние статьи 3',
     category: 'react'   
    }
]
function NewsFeed(){
    // useSearchParams позволяет доставать параметры url
    const [searchParams, setSearchParams] = useSearchParams();
    // достаем текущие значения фильтров
    const searchQuery = searchParams.get('search') || '';
    const categoryQuery = searchParams.get('category') || '';

    const handleSearchChange = (event) => {
        const text = event.target.value;
        const newParams = new URLSearchParams(searchParams);

        if (text) {
            newParams.set('search', text); //устанавливаем текст в URL
        }else {
            newParams.delete('search');//если поле очистили
        }
        setSearchParams(newParams); // обновляем URL адрес
    }

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        const newParams = new URLSearchParams(searchParams);
        if (category){
            newParams.set('category', category);
        }else{
            newParams.delete('category');
        }
        setSearchParams(newParams);
    }
    // ФИЛЬТРАЦИЯ НА ОСНОВЕ ПОЛУЧЕННЫХ ЗНАЧЕНИЙ
    const filteredArticles = ARTICLES_DATA.filter((article) => {
        // в нижнем регстре, в описании или названии
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
        const matchesCategory = categoryQuery === '' || article.category === categoryQuery;
        return matchesSearch && matchesCategory;
    });

    const handleResetFilters = () => {
        setSearchParams({}); //передаем пустой объект, URL становится /news
    };


    return (
        <>
            <h1>Лента свежих новостей</h1>
            {/* БЛОК ФИЛЬТРОВ И ПОИСКА */}
            <div style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center'
            }}>
                {/* ПОЛЕ ПОИСКА ТЕКСТОВОЕ */}
                <div>
                    <label htmlFor="search-input">Поиск по тексту</label>
                    <input 
                        type="text"
                        id="search-input"
                        value={searchQuery}
                        onInput={handleSearchChange}
                    />
                </div>
                {/* Выпадающий список категорий */}
                <div>
                    <label htmlFor="category-select">Категории</label>
                    <select
                        id="category-select"
                        value={categoryQuery}
                        onChange={handleCategoryChange}
                    >
                        <option value=''>Все категории</option>
                        <option value='react'>React</option>
                        <option value='css'>CSS</option>
                        <option value='javascript'>JavaScript</option>
                    </select>
                </div>
                {/* КНОПКА СБРОСА ПАРАМЕТРОВ */}
                {(searchQuery || categoryQuery) && (
                    <button onClick={handleResetFilters}>
                        Сбросить фильтры
                    </button>
                )}
            </div>
            <div>
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                       <article key={article.id}>
                            <h2>{article.title}</h2>
                            <h2>{article.description}</h2>
                            <span>{article.category.toUpperCase()}</span>
                            <Link to={`/news/${article.id}`}>
                                Читать полностью
                            </Link>
                        </article> 
                    ))
                ) : (
                    <p>По вашему запросу ничего не найдено</p>
                )}
            {/* 
                {ARTICLES_DATA.map((article) => (
                    <article key={article.id}>
                        <h2>{article.title}</h2>
                        <h2>{article.description}</h2>
                        <Link to={`/news/${article.id}`}>
                            Читать полностью
                        </Link>
                    </article>
                ) )} */}
            </div>
        </>
    );
};
export default NewsFeed;
```

### Шаг 2.3. Пуш ветки на GitHub

```Bash
# Фиксируем изменения
git add .
git commit -m "Feature: Реализована фильтрация и поиск через URL SearchParams"

# Пушим локальную ветку в удаленный репозиторий GitHub
git push origin feature-filter
```

## ЭТАП 3. Ветка feature-auth — Система авторизации
Возвращаемся на main и создаем чистую изолированную ветку для авторизации, задействуя React Context и localStorage.  

### Шаг 3.1. Создание ветки от main

```Bash
# Возвращаемся в ветку main
git checkout main

# Перепроверяем, что исходный код чист, и создаем ветку feature-auth
git checkout -b feature-auth
```

### Шаг 3.2. Создание контекста авторизации src/context/AuthContext.
```jsx
import { createContext, useContext, useState, useEffect } from 'react';


// контекст это "коробка" в которой будут лежать данные об авторизации
const AuthContext = createContext(null);

export function AuthProvider({ children }){

    // для хранения текущего вошедшего пользователя
    const [currentUser, setCurrentUser] = useState(()=>{
        const savedUser = localStorage.getItem('active_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    
    const register = (username, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = users.some(u => u.username === username);
        if (userExists){
            return {success: false, message: 'пользователь с таким именем уже существует'};
        }
        const newUser = {id: Date.now().toString(), username, password};
        users.push(newUser);
        localStorage.setItem('users',  JSON.stringify(users));
        return {success: true, message: 'регистрация успешна'};
    };

    const login = (username, password) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.username === username && 
                                     u.password === password
        );
        if (user){
            setCurrentUser(user);
            localStorage.setItem('active_user', JSON.stringify(user));
            return {success: true};
        }else{
            return {success: false, message: 'неверное имя или пароль'}
        }
    };
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem('active_user');
        
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}



// создаем собственный хук для удобного использования контекста в других комп.
export function useAuth(){
    return useContext(AuthContext);
}
 
```

### Шаг 3.3. Создание компонента защиты маршрутов src/layouts/ProtectedRoute.jsx

```jsx
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }){

    const location= useLocation(); //записываем, откуда пришел пользователь
    const  { currentUser }   = useAuth();
    console.log(currentUser);
    // ЕСЛИ НЕ АВТОРИЗОВАН
    if(!currentUser){
        // state-сохраняет текущий адрес,чтобы после логина вернуть юзера назад
        return <Navigate to='/login' state={{ from: location }} replace />
    }    
    // ЕСЛИ АВТОРИЗОВАН возвращаем дочерний компонент (dashboard)
    return children;
}
export default ProtectedRoute;

```

### Шаг 3.4. Редактируем src/layouts/BlogLayout.jsx

```jsx
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

```

### Шаг 3.5. Создаем страницы Входа и Регистрации
Создайте файл pages/Login.jsx:

```jsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // если шел в кабинет-после авторизации вернем в кабинет
    // если зашел на логин сам-перенаправим на /news
    const fromPage = location.state?.from?.pathname || '/news';

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(''); //сброс старых ошибок
        if (!username.trim() || !password.trim()){
            setError('Все поля должны быть заполнены');
            return;
        }
        const result = login(username, password);

        if (result.success){
            // перенаправляем туда куда шел изначально
            navigate(fromPage, { replace: true });
        }else{
            setError(result.message);
        }
    };
    return (
        <div style={{ maxWidth: '400px', margin: '50px auto'}}>
            <h2>Войти в аккаунт</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input type="password" placeholder="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Войти</button>
            </form>
            <p>Еще нет аккаунта? 
                <Link to='/register'>Зарегистрироваться</Link>
            </p>
        </div>
    );
}
export default Login;

```
Создайте файл pages/Register.jsx:

```jsx 
import { useState } from "react";
import { useNavigate,  Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { register } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');  
        setSuccess('');
        if (!username.trim() || !password.trim()){
            setError('Все поля должны быть заполнены');
            return;
        }
        const result = register(username, password);

        if (result.success){
            setSuccess(result.message);
            setTimeout(() => { 
                navigate('/login');
            }, 2000);
        }else{
            setError(result.message);
        }
    };
    return (
        <div style={{ maxWidth: '400px', margin: '50px auto'}}>
            <h2>Зарегистрироваться</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input type="password" placeholder="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Зарегистрироваться</button>
            </form>
            <p>Уже есть аккаунт? 
                <Link to='/login'>Войти</Link>
            </p>
        </div>
    );
}
export default Register;

```

### Шаг 3.6.  Собираем все вместе в main.jsx

```jsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import BlogLayout from './layouts/BlogLayout';
import NewsFeed from './pages/NewsFeed';
import ArticlePage from './pages/ArticlePage';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

import ProtectedRoute from './layouts/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
      <Routes>
        {/* ПРАВИЛО РЕДИРЕКТА: если пользователь зашел просто на сайт ("/") 
        http://localhost/ мы автоматически перенаправляем в ленту новостей /news
        replace - указывает что страницу "/" не нужно сохранять в истории переходов
        */}
        <Route path='/' element={<Navigate to="/news" replace />} />
        <Route path='/' element={<BlogLayout />} >
            <Route path='news' element={<NewsFeed />} />
            <Route path='about' element={<About />} />
            {/* news/42   news/js-article */}
            <Route path='news/:articleId' element={<ArticlePage />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} /> 

            {/* ЗАЩИЩЕННЫЙ РОУТ КАБИНЕТА */}
            <Route path='dashboard' element={
              <ProtectedRoute>
                <Dashboard /> 
              </ProtectedRoute>
              }>
              {/* /dashboard/profile */}
              <Route path='profile' element={<Profile />} />
              {/* /dashboard/settings*/}
              <Route path='settings' element={<Settings />} />
            </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  </AuthProvider>
);

```
### Шаг 3.7. Пуш ветки в репозиторий

```Bash
git add .
git commit -m "Feature: Настроен AuthContext, защищенный роут и сохранение сессии"
git push origin feature-auth
```

## ЭТАП 4. Ветка feature-edit — Мерж веток и разработка редактирования
Теперь мы объединяем наработки фильтрации и авторизации в единую сквозную ветку, где пишем CRUD-логику постов с привязкой к создателю. 

### Шаг 4.1. Создание ветки от main и мерж предыдущих веток

```Bash
# Возвращаемся в main
git checkout main

# Создаем финальную ветку feature-edit
git checkout -b feature-edit

# Поочередно вливаем наработки фильтрации и авторизации в созданную ветку
git merge feature-filter --no-edit
git merge feature-auth --no-edit
```
Примечание: Если при мерже возникнут конфликты, откройте редактор кода, выберите финальный вариант, сохраните изменения и завершите операцию командами: 

```Bash 
git add .
git commit -m "Merge branches into feature-edit".   
```

### Шаг 4.2. Написание логики добавления/редактирования в NewsFeed.

```jsx
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from "react-router-dom";
// http:localhost/news?search=react&category=frontend
import { useAuth } from '../context/AuthContext';

const ARTICLES_DATA = [
    {
     id: 'future-of-js', 
     title: 'Статья 1',
     description: 'Описанние статьи 1',   
     category: 'javascript' ,
     authorId: 'system',
     authorName: 'Редакция'   
    },
    {
     id: 'css-modules', 
     title: 'Статья 2',
     description: 'Описанние статьи 2',
     category: 'css',  
     authorId: 'system',
     authorName: 'Редакция'    
    },
    {
     id: 'react-router-v6', 
     title: 'Статья 3',
     description: 'Описанние статьи 3',
     category: 'react',   
     authorId: 'system',
     authorName: 'Редакция'    
    }
]
function NewsFeed(){

    const { currentUser } = useAuth();

    const [articles, setArticles] = useState([]);

    useEffect(()=>{
        const savedArticles = localStorage.getItem('blog_articles');
        if (savedArticles){
            setArticles(JSON.parse(savedArticles));
        }else {
            localStorage.setItem('blog_articles', 
                JSON.stringify(ARTICLES_DATA));
        }
    }, []);

    // useSearchParams позволяет доставать параметры url
    const [searchParams, setSearchParams] = useSearchParams();
    // достаем текущие значения фильтров
    const searchQuery = searchParams.get('search') || '';
    const categoryQuery = searchParams.get('category') || '';

    const handleSearchChange = (event) => {
        const text = event.target.value;
        const newParams = new URLSearchParams(searchParams);

        if (text) {
            newParams.set('search', text); //устанавливаем текст в URL
        }else {
            newParams.delete('search');//если поле очистили
        }
        setSearchParams(newParams); // обновляем URL адрес
    }

    const handleCategoryChange = (event) => {
        const category = event.target.value;
        const newParams = new URLSearchParams(searchParams);
        if (category){
            newParams.set('category', category);
        }else{
            newParams.delete('category');
        }
        setSearchParams(newParams);
    }
    // ФИЛЬТРАЦИЯ НА ОСНОВЕ ПОЛУЧЕННЫХ ЗНАЧЕНИЙ
    const filteredArticles = articles.filter((article) => {
        // в нижнем регстре, в описании или названии
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
        const matchesCategory = categoryQuery === '' || article.category === categoryQuery;
        return matchesSearch && matchesCategory;
    });

    const handleResetFilters = () => {
        setSearchParams({}); //передаем пустой объект, URL становится /news
    };


    return (
        <>
            <h1>Лента свежих новостей</h1>
            {/* КНОПКА ДОБАВЛЕНИЯ ЕСЛИ ПОЛЬЗОВАТЕЛЬ АВТОРИЗОВАН */}
            { currentUser && (
                <Link to='/dashboard/create-article'>
                    + Создать статью
                </Link>
            )}

            {/* БЛОК ФИЛЬТРОВ И ПОИСКА */}
            <div style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'center'
            }}>
                {/* ПОЛЕ ПОИСКА ТЕКСТОВОЕ */}
                <div>
                    <label htmlFor="search-input">Поиск по тексту</label>
                    <input 
                        type="text"
                        id="search-input"
                        value={searchQuery}
                        onInput={handleSearchChange}
                    />
                </div>
                {/* Выпадающий список категорий */}
                <div>
                    <label htmlFor="category-select">Категории</label>
                    <select
                        id="category-select"
                        value={categoryQuery}
                        onChange={handleCategoryChange}
                    >
                        <option value=''>Все категории</option>
                        <option value='react'>React</option>
                        <option value='css'>CSS</option>
                        <option value='javascript'>JavaScript</option>
                    </select>
                </div>
                {/* КНОПКА СБРОСА ПАРАМЕТРОВ */}
                {(searchQuery || categoryQuery) && (
                    <button onClick={handleResetFilters}>
                        Сбросить фильтры
                    </button>
                )}
            </div>
            <div>
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                       <article key={article.id}>
                            <span>{article.authorName}</span>
                            <h2>{article.title}</h2>
                            <h2>{article.description}</h2>
                            <span>{article.category.toUpperCase()}</span>
                            <Link to={`/news/${article.id}`}>
                                Читать полностью
                            </Link>
                            { currentUser && currentUser.id === article.authorId &&(
                            <Link to={`/dashboard/edit-article/${article.id}`}>
                                Редактировать
                            </Link> )}
                        </article> 
                    ))
                ) : (
                    <p>По вашему запросу ничего не найдено</p>
                )}
            {/* 
                {ARTICLES_DATA.map((article) => (
                    <article key={article.id}>
                        <h2>{article.title}</h2>
                        <h2>{article.description}</h2>
                        <Link to={`/news/${article.id}`}>
                            Читать полностью
                        </Link>
                    </article>
                ) )} */}
            </div>
        </>
    );
};
export default NewsFeed;

```

### Шаг 4.3. Обновление страницы статьи ArticlePage.jsx

```jsx 
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ArticlePage(){
    const { articleId } = useParams();
    const navigate = useNavigate(); //  возвращает функцию с помощью которой можно програмно менять URL
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const savedArticles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
        const foundArticle = savedArticles.find(a => a.id === articleId);
        setArticle(foundArticle);
    }, [articleId]);

    const handleGoBack = () => {
        navigate(-1);
    };   
    const handleGoHome = () => {
        navigate('/news');
    };

    if (!article) {
        return (
            <>
                <h2>Статья не найдена</h2>
                <button onClick={handleGoHome}>На главную ленту</button>
            </>
        );
    }
    return (
        <>
            <button onClick={handleGoBack}> --Назад в ленту </button>
            <div>
                <h1>{article.title}</h1>
                <span>Категория: {article.category}</span>
                <span>Автор: {article.authorName}</span>
                <hr />
                <p>{article.description}</p>
            </div>
            <button onClick={handleGoHome}> На главную ленту </button>
        </>
    );
    
}

export default ArticlePage;
```
### Шаг 4.4. Создание формы src/pages/ArticleEdit.

```jsx 
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function ArticleForm(){
    const { currentUser } = useAuth();
    const { articleId } = useParams();
    console.log(articleId, currentUser);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('javascript');
    const [description, setDescription] = useState('');

    const [error, setError] = useState('');

    const isEditMode = Boolean(articleId);

    useEffect(() => {
        if (isEditMode) {
            const articles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
            const articleEdit = articles.find(a => a.id === articleId);
            if(!articleEdit){
                setError('Статья не найдена');
                return;
            }
            // ЖЕСТКАЯ ПРОВЕРКА: именно автор пытается редактировать
            if (articleEdit.authorId !== currentUser.id){
                alert('ВЫ МОЖЕТЕ РЕДАКТИРОВАТЬ ТОЛЬКО СВОЮ СТАТЬЮ');
                navigate('/news');
                return;
            }
            setTitle(articleEdit.title);
            setCategory(articleEdit.category);
            setDescription(articleEdit.description);
        }
    }, [articleId, currentUser, isEditMode, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if(!title.trim() || !description.trim()){
            setError('Пожалуйста, заполните все поля')
            return;
        }
        const articles = JSON.parse(localStorage.getItem('blog_articles') || '[]');
        if(isEditMode){
            const updateArticle = articles.map(a => {
                if(a.id === articleId){
                    return {
                        ...a,
                        title,
                        category,
                        description
                    };
                }
                return a;
            });
            localStorage.setItem('blog_articles', JSON.stringify(updateArticle)); 
        }else{
            const newArticle = {
                id: Date.now().toString(),
                title,
                category, 
                description,
                authorId: currentUser.id,
                authorName: currentUser.username
            };
            articles.unshift(newArticle);
            localStorage.setItem('blog_articles', JSON.stringify(articles));
        }
        navigate('/news');
    };
    return (
        <div>
            <h2>{isEditMode ? "Редактировать статью" : "Создать статью"}</h2>
            {error && <p>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Введите заголовок"
                />
                <input 
                    type="text" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Введите категорию"
                />
                <textarea
                    rows='10' 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Введите текст статьи"
                />
                <button type="submit">Сохранить</button>
                <button 
                    type="button"
                    onClick={()=>{
                        navigate(-1);
                    }}
                >Отмена</button>
            </form>
        </div>
    );
}
export default ArticleForm;
```

### Шаг 4.5. Обновление роутинга в main.jsx

```jsx 
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import BlogLayout from './layouts/BlogLayout';
import NewsFeed from './pages/NewsFeed';
import ArticlePage from './pages/ArticlePage';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import ArticleForm from './pages/ArticleEdit';

import ProtectedRoute from './layouts/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Router>
      <Routes>
        {/* ПРАВИЛО РЕДИРЕКТА: если пользователь зашел просто на сайт ("/") 
        http://localhost/ мы автоматически перенаправляем в ленту новостей /news
        replace - указывает что страницу "/" не нужно сохранять в истории переходов
        */}
        <Route path='/' element={<Navigate to="/news" replace />} />
        <Route path='/' element={<BlogLayout />} >
            <Route path='news' element={<NewsFeed />} />
            <Route path='about' element={<About />} />
            {/* news/42   news/js-article */}
            <Route path='news/:articleId' element={<ArticlePage />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} /> 

            {/* ЗАЩИЩЕННЫЙ РОУТ КАБИНЕТА */}
            <Route path='dashboard' element={
              <ProtectedRoute>
                <Dashboard /> 
              </ProtectedRoute>
              }>
              {/* /dashboard/profile */}
              <Route path='profile' element={<Profile />} />
              {/* /dashboard/settings*/}
              <Route path='settings' element={<Settings />} />
              {/* /dashboard/create-article*/}
              <Route path='create-article' element={<ArticleForm />} />
              {/* /dashboard/edit-article/:articleId*/}
              <Route path='edit-article/:articleId' element={<ArticleForm />} />
            </Route>
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  </AuthProvider>
);

```
### Шаг 4.6. Пуш финальный на GitHub

```Bash
git add .
git commit -m "Feature: Реализована CRUD-логика редактирования и добавления постов с валидацией автора"
git push origin feature-edit
```

