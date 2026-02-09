import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import DashboardLayout from './pages/Dashboard/DashboardLayout'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Dashboard/Profile'
import Posts from './pages/Dashboard/Posts'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="posts" element={<Posts />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
