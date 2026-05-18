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
