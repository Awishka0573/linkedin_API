import { Link, useLocation } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'

const DashboardHeader = ({ isLinkedInConnected, onDisconnect, profile }) => {
  const authUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/linkedin`
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getPageTitle = () => {
    const path = location.pathname
    if (path.includes('/profile')) return 'Profile'
    if (path.includes('/posts')) return 'Create Post'
    return 'Overview'
  }

  const getSubTitle = () => {
    const path = location.pathname
    if (path.includes('/profile')) return 'Member Details'
    if (path.includes('/posts')) return 'Content Studio'
    return 'Dashboard'
  }

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 bg-white px-6 py-4 relative z-50">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{getSubTitle()}</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-900">{getPageTitle()}</h1>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard/posts"
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
          >
            New post
          </Link>

          {isLinkedInConnected ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center gap-3 border-l border-slate-200 pl-6 group outline-none cursor-pointer"
              >
                <div className="flex flex-col items-end">
                  <p className="text-sm font-bold text-slate-900 leading-none group-hover:text-slate-600 transition-colors">{profile?.name || 'Loading...'}</p>
                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Connected</p>
                  </div>
                </div>
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-slate-100 bg-slate-50 transition-transform group-active:scale-95 shadow-sm">
                  {profile?.picture ? (
                    <img src={profile.picture} alt={profile.name} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-500 font-bold">
                      {profile?.name?.charAt(0)}
                    </div>
                  )}
                </div>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-2 border-b border-slate-50 mb-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Account</p>
                  </div>
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex w-full items-center px-3 py-2 text-sm font-semibold text-slate-700 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => {
                      onDisconnect()
                      setIsMenuOpen(false)
                    }}
                    className="flex w-full items-center px-3 py-2 text-sm font-semibold text-rose-600 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    Disconnect
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              href={authUrl}
            >
              Connect LinkedIn
            </a>
          )}
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
