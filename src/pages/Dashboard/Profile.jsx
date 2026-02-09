import { useOutletContext } from 'react-router-dom'

const Profile = () => {
  const { profile } = useOutletContext()
  const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  const authUrl = `${apiBase}/auth/linkedin`
  const loading = false // Profile is now handled by layout
  const error = ''

  const formatLocale = (locale) => {
    if (!locale) return 'N/A'
    if (typeof locale === 'object') {
      return `${locale.language || ''}_${locale.country || ''}`.replace(/^_+|_+$/g, '') || 'N/A'
    }
    return locale
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section with cover simulation */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
        <div className="h-32 w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              <div className="h-32 w-32 shrink-0 rounded-2xl border-4 border-white bg-slate-100 shadow-xl overflow-hidden">
                {profile?.picture ? (
                  <img alt={profile?.name || 'LinkedIn profile'} className="h-full w-full object-cover" src={profile.picture} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-slate-200 text-3xl font-bold text-slate-400">
                    {profile?.name?.charAt(0) || 'L'}
                  </div>
                )}
              </div>
              <div className="space-y-1 pb-1">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold text-slate-900">{profile?.name || 'LinkedIn Member'}</h1>
                  {profile && (
                    <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-slate-500 font-medium">LinkedIn Professional Profile</p>
              </div>
            </div>
            {!profile && !loading && (
              <a href={authUrl} className="mb-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
                Connect account
              </a>
            )}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900"></div>
          <p className="text-sm font-medium text-slate-500 italic">Retrieving secure data...</p>
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center space-y-4">
          <p className="text-rose-800 font-medium">{error}</p>
          <a className="inline-flex rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-all" href={authUrl}>
            Re-authenticate LinkedIn
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Info */}
          <section className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Profile Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                <div className="space-y-1">
                  <p className="text-slate-400 font-medium">First Name</p>
                  <p className="text-lg font-semibold text-slate-900">{profile?.given_name || '—'}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400 font-medium">Last Name</p>
                  <p className="text-lg font-semibold text-slate-900">{profile?.family_name || '—'}</p>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <p className="text-slate-400 font-medium">Email Address</p>
                  <p className="text-lg font-semibold text-slate-900">{profile?.email || 'Not provided'}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Session Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                <div className="space-y-1">
                  <p className="text-slate-400 font-medium">Locale</p>
                  <p className="text-base font-bold text-slate-700 uppercase">{formatLocale(profile?.locale)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400 font-medium">Connection Status</p>
                  <p className="text-base font-bold text-emerald-600">Active • OAuth 2.0</p>
                </div>
              </div>
            </div>
          </section>

          {/* Sidebar Stats */}
          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Permissions</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600">Post Creation</span>
                  <span className="text-emerald-600">Granted</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-600">Profile Read</span>
                  <span className="text-emerald-600">Granted</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-400">
                  <span>Ad Management</span>
                  <span>Not Requested</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 text-white shadow-xl">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Quick Tip</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Keeping your profile updated helps our scheduler provide better content suggestions tailored to your network.
              </p>
            </div>
          </aside>
        </div>
      )}
    </div>
  )
}

export default Profile
