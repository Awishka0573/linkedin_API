import { useState } from 'react'
import { Search, Loader2, AlertCircle, ExternalLink, Calendar, Globe } from 'lucide-react'

const AdLibrary = () => {
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const [keywords, setKeywords] = useState('')
    const [results, setResults] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        if (!keywords.trim()) return

        setLoading(true)
        setError('')
        setResults(null)

        try {
            const response = await fetch(`${apiBase}/api/adLibrary/search?keywords=${encodeURIComponent(keywords)}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Failed to fetch ad library data')
            }

            setResults(data.data)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Tools</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Ad Library Search</h2>
                <p className="mt-2 text-sm text-slate-500">Search and analyze ads from the LinkedIn Ad Library.</p>

                <form onSubmit={handleSearch} className="mt-6 flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="Search by keyword or advertiser name..."
                            className="w-full rounded-xl border border-slate-200 pl-10 pr-4 py-3 text-sm focus:border-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-sans"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !keywords.trim()}
                        className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-200"
                    >
                        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Search'}
                    </button>
                </form>
            </section>

            {error && (
                <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm text-rose-700 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                </div>
            )}

            {results && (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Since we don't know the exact response structure yet, we'll dump it safely or iterate if it's an array */}
                    {results.elements && results.elements.length > 0 ? (
                        results.elements.map((ad, index) => (
                            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        {/* Placeholder for advertiser log if available */}
                                        <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Globe className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 text-sm">{ad.advertiserName || 'Advertiser'}</h3>
                                            <p className="text-xs text-slate-500">Sponsored</p>
                                        </div>
                                    </div>
                                    <a
                                        href={ad.adUrl || '#'} // Assuming adUrl might exist
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-emerald-600 transition-colors"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </a>
                                </div>

                                <div className="mt-4 space-y-2">
                                    <p className="text-sm text-slate-700 line-clamp-3">
                                        {ad.text?.text || ad.description || 'No description available'}
                                    </p>
                                    {/* Media placeholder */}
                                    <div className="aspect-video w-full rounded-lg bg-slate-100 mt-3 flex items-center justify-center text-slate-400 text-xs">
                                        Ad Media
                                    </div>
                                </div>

                                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        <span>{new Date(ad.startDate || Date.now()).toLocaleDateString()}</span>
                                    </div>
                                    <span>ID: {ad.id}</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-slate-500">
                            {JSON.stringify(results, null, 2)}
                            <br />
                            <span className="text-xs mt-2 block">Raw response shown for debugging structure</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default AdLibrary
