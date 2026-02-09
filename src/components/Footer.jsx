const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              OX
            </span>
            <div>
              <p className="text-lg font-semibold text-slate-900">Oxymai</p>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">LinkedIn</p>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            We craft high-impact LinkedIn pages for founders, recruiters, and hiring teams who want visibility with measurable outcomes.
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">hello@oxymai.co</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Product</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Overview</li>
            <li>Templates</li>
            <li>Integrations</li>
            <li>Changelog</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Company</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">Resources</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>Community</li>
            <li>Guides</li>
            <li>Support</li>
            <li>Status</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-4 text-xs text-slate-500 md:flex-row">
          <p>2026 Oxymai. All rights reserved.</p>
          <div className="flex gap-6 uppercase tracking-[0.2em]">
            <span>Privacy</span>
            <span>Terms</span>
            <span>LinkedIn</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
