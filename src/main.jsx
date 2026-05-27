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
