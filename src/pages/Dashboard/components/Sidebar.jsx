import { NavLink } from 'react-router-dom'

const Sidebar = ({ isLinkedInConnected, onDisconnect }) => {
  const authUrl = `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/auth/linkedin`
  const navClass = ({ isActive }) =>
    `rounded-lg px-3 py-2 text-left transition ${isActive ? 'bg-slate-900/5 text-slate-900' : 'hover:bg-slate-100'
    }`

  return (
    <aside className="flex h-full w-full flex-col gap-6 border-r border-slate-200 bg-white px-6 py-8">
      <div className="flex items-center gap-3">
        <img src="/logo1.png" alt="Oxymai Logo" className="h-14 w-auto shrink-0" />
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 leading-none">Workspace</p>
          <h2 className="mt-1 text-lg font-bold text-slate-900 leading-none">Oxymai</h2>
        </div>
      </div>
      <nav className="flex flex-col gap-3 text-sm font-medium text-slate-600">
        <NavLink className={navClass} to="/dashboard" end>
          Overview
        </NavLink>
        <NavLink className={navClass} to="/dashboard/profile">
          Profiles
        </NavLink>
        <NavLink className={navClass} to="/dashboard/posts">
          Create Post
        </NavLink>
        <NavLink className={navClass} to="/dashboard/events">
          Events
        </NavLink>
        <button className="rounded-lg px-3 py-2 text-left transition hover:bg-slate-100">Scheduler</button>
        <button className="rounded-lg px-3 py-2 text-left transition hover:bg-slate-100">Analytics</button>
      </nav>
      {/* <div className="mt-auto rounded-2xl border border-emerald-200/60 bg-emerald-50 p-4 text-xs text-emerald-900">
        <p className="text-sm font-semibold">{isLinkedInConnected ? 'LinkedIn connected' : 'Connect LinkedIn'}</p>
        <p className="mt-2 text-emerald-800/80">
          {isLinkedInConnected
            ? 'Your LinkedIn account is ready to use.'
            : 'Unlock profile import and publishing with API access.'}
        </p>
        {isLinkedInConnected ? (
          <button
            className="mt-3 w-full rounded-full border border-emerald-200 bg-emerald-100 px-4 py-2 text-xs font-semibold text-emerald-900"
            type="button"
            onClick={onDisconnect}
          >
            Disconnect
          </button>
        ) : (
          <a
            className="mt-3 w-full rounded-full bg-emerald-300 px-4 py-2 text-center text-xs font-semibold text-slate-900"
            href={authUrl}
          >
            Request access
          </a>
        )}
      </div> */}
    </aside>
  )
}

export default Sidebar
