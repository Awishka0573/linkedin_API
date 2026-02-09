import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import DashboardHeader from './components/DashboardHeader'
import Sidebar from './components/Sidebar'

const DashboardLayout = () => {
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false)
  const [profile, setProfile] = useState(null)
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch(`${apiBase}/api/profile`, {
          credentials: 'include',
        })
        if (response.ok) {
          const data = await response.json()
          setProfile(data.profile)
          setIsLinkedInConnected(true)
        }
      } catch {
        setIsLinkedInConnected(false)
        setProfile(null)
      }
    }

    checkConnection()
  }, [apiBase])

  const handleDisconnect = async () => {
    try {
      await fetch(`${apiBase}/auth/linkedin/disconnect`, {
        method: 'POST',
        credentials: 'include',
      })
    } finally {
      setIsLinkedInConnected(false)
      setProfile(null)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <Sidebar isLinkedInConnected={isLinkedInConnected} onDisconnect={handleDisconnect} />
        <div className="flex flex-col">
          <DashboardHeader
            isLinkedInConnected={isLinkedInConnected}
            onDisconnect={handleDisconnect}
            profile={profile}
          />
          <main className="flex-1 px-6 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
