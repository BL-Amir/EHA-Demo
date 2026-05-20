import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ThemeSwitcher from './components/ThemeSwitcher'
import Home from './pages/Home'
import Work from './pages/Work'
import Project from './pages/Project'
import NewsPage from './pages/News'
import NewsArticle from './pages/NewsArticle'

export default function App() {
  return (
    <>
      <Nav />
      <ThemeSwitcher />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<Project />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:slug" element={<NewsArticle />} />
      </Routes>
    </>
  )
}
