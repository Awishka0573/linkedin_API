import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'

const Dashboard = () => {
  const { profile, onDisconnect } = useOutletContext()
  const [loading, setLoading] = useState(false)
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  const authUrl = `${apiBase}/auth/linkedin`
  const [showSuccess, setShowSuccess] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('auth') === 'success') {
      setShowSuccess(true)
      // Clean up the URL
      params.delete('auth')
      const newSearch = params.toString()
      navigate({ search: newSearch }, { replace: true })

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    }
  }, [location.search, navigate])

  return (
    <>
      {showSuccess && (
        <div className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800 shadow-sm animate-in fade-in slide-in-from-top-4">
          <p className="text-sm font-semibold">Successfully connected to LinkedIn!</p>
        </div>
      )}

      <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Overview</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">
          Welcome back, {profile?.given_name || 'Awishka'}
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Connect your LinkedIn account to start importing profiles, scheduling posts, and tracking performance.
        </p>
      </section>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Linked accounts</p>
            <div className="mt-4 flex items-center justify-between">
              {loading ? (
                <p className="text-sm text-slate-500">Checking connection...</p>
              ) : profile ? (
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-100">
                    {profile.picture ? (
                      <img src={profile.picture} alt={profile.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-500">
                        {profile.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-900">{profile.name}</p>
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
                      Connected
                    </span>
                  </div>
                  <button
                    onClick={onDisconnect}
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <>
                  <div>
                    <p className="text-lg font-semibold text-slate-900">No LinkedIn account yet</p>
                    <p className="text-sm text-slate-500">Connect to pull profiles and company pages.</p>
                  </div>
                  <a className="rounded-full bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 transition-colors" href={authUrl}>
                    Connect
                  </a>
                </>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Content pipeline</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-900">Draft: Hiring update</p>
                <p className="text-xs text-slate-500">Video + copy ready for review.</p>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-900">Scheduled: Founder story</p>
                <p className="text-xs text-slate-500">Publishing Friday at 9:00 AM.</p>
              </div>
            </div>
          </div>
        </section>
        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Insights</p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Profile views</span>
                <span className="font-semibold text-slate-900">1,240</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Post engagement</span>
                <span className="font-semibold text-slate-900">+18%</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Video completion</span>
                <span className="font-semibold text-slate-900">62%</span>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Next steps</p>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li className={profile ? "line-through text-slate-400" : ""}>Connect a LinkedIn account</li>
              <li>Import profiles and company pages</li>
              <li>Schedule your first post</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  )
}

export default Dashboard
