const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-900">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">404</p>
        <h1 className="mt-3 text-3xl font-semibold">Page not found</h1>
        <p className="mt-2 text-sm text-slate-500">The page you are looking for does not exist.</p>
        <a className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white" href="/">
          Back to home
        </a>
      </div>
    </div>
  )
}

export default NotFound
