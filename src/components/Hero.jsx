const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 opacity-30">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,_rgba(94,234,212,0.35),_rgba(15,23,42,0.1)_45%,_rgba(2,6,23,1)_75%)]" />
      </div>
      <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div className="space-y-6 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">
            LinkedIn connect (coming soon)
          </p>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Connect your LinkedIn, pull profiles, and publish posts and videos from one hub.
          </h1>
          <p className="text-base text-slate-300 md:text-lg">
            A unified workspace to import profiles and company pages, schedule content, and see performance insights without switching tabs.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-emerald-300 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-200">
              Get started
            </button>
            <button className="rounded-full border border-emerald-200/50 px-6 py-3 text-sm font-semibold text-emerald-100 transition hover:border-emerald-200 hover:text-white">
              Join the waitlist
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300">
            <div>
              <p className="text-lg font-semibold text-white">1-click</p>
              <p className="uppercase tracking-[0.3em] text-emerald-200/70">Account connect</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Unified</p>
              <p className="uppercase tracking-[0.3em] text-emerald-200/70">Profile import</p>
            </div>
            <div>
              <p className="text-lg font-semibold text-white">Live</p>
              <p className="uppercase tracking-[0.3em] text-emerald-200/70">Analytics</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="rounded-3xl border border-emerald-200/30 bg-slate-900/60 p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-emerald-200">LinkedIn workspace</p>
              <span className="rounded-full bg-emerald-200/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-emerald-100">
                Coming soon
              </span>
            </div>
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl bg-slate-950/70 p-4">
                <p className="text-sm font-semibold text-white">Connect + import profiles</p>
                <p className="text-xs text-slate-400">
                  Link your LinkedIn account and pull profiles and company pages instantly.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950/70 p-4">
                <p className="text-sm font-semibold text-white">Publish posts and videos</p>
                <p className="text-xs text-slate-400">
                  Create, schedule, and ship content without leaving the dashboard.
                </p>
              </div>
              <div className="rounded-2xl bg-slate-950/70 p-4">
                <p className="text-sm font-semibold text-white">Track performance</p>
                <p className="text-xs text-slate-400">
                  Watch reach, engagement, and growth with clear weekly insights.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 hidden h-24 w-24 rounded-full border border-emerald-200/40 bg-emerald-200/10 md:block" />
          <div className="absolute -bottom-8 left-6 hidden h-16 w-16 rounded-full border border-emerald-200/30 bg-emerald-200/10 md:block" />
        </div>
      </div>
    </section>
  )
}

export default Hero
