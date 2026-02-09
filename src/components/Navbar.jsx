import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
            OX
          </span>
          <div className="leading-tight">
            <p className="text-lg font-semibold text-slate-900">Oxymai</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">LinkedIn</p>
          </div>
        </div>
        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a className="transition hover:text-slate-900" href="#features">
            Features
          </a>
          <a className="transition hover:text-slate-900" href="#stories">
            Stories
          </a>
          <a className="transition hover:text-slate-900" href="#pricing">
            Pricing
          </a>
          <a className="transition hover:text-slate-900" href="#contact">
            Contact
          </a>
        </div>
        <div className="flex items-center gap-3">
          <button className="hidden rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900 md:inline-flex">
            Sign in
          </button>
          <Link
            className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            to="/dashboard"
          >
            Get started
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
