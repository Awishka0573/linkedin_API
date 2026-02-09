import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

const Posts = () => {
    const { profile } = useOutletContext()
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const loading = false // Managed by layout
    const [postContent, setPostContent] = useState('')
    const [isPosting, setIsPosting] = useState(false)
    const [postStatus, setPostStatus] = useState({ type: '', message: '' })

    const handleCreatePost = async (e) => {
        e.preventDefault()
        if (!postContent.trim()) return

        setIsPosting(true)
        setPostStatus({ type: '', message: '' })

        try {
            const response = await fetch(`${apiBase}/api/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: postContent }),
                credentials: 'include',
            })

            const data = await response.json()

            if (response.ok) {
                setPostStatus({ type: 'success', message: 'Post shared successfully!' })
                setPostContent('')
                setTimeout(() => setPostStatus({ type: '', message: '' }), 3000)
            } else {
                throw new Error(data.error || 'Failed to share post')
            }
        } catch (err) {
            setPostStatus({ type: 'error', message: err.message })
        } finally {
            setIsPosting(false)
        }
    }

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Content</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Create Post</h2>
                <p className="mt-2 text-sm text-slate-500">Create, manage, and schedule your LinkedIn content.</p>
            </section>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <section className="space-y-6">
                    {/* Create Post Section */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Create new post</p>
                        {loading ? (
                            <p className="mt-4 text-sm text-slate-500">Checking connection...</p>
                        ) : !profile ? (
                            <div className="mt-4 rounded-xl bg-slate-50 p-6 text-center">
                                <p className="text-sm text-slate-600">Please connect your LinkedIn account to start posting.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleCreatePost} className="mt-4 space-y-4">
                                <textarea
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    placeholder="What's on your mind? #linkedin"
                                    className="w-full min-h-[160px] rounded-xl border border-slate-200 p-4 text-sm focus:border-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all resize-none font-sans"
                                    disabled={isPosting}
                                />
                                <div className="flex items-center justify-between">
                                    {postStatus.message && (
                                        <div className={`flex items-center gap-2 rounded-lg px-3 py-1 text-xs font-medium ${postStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                                            }`}>
                                            {postStatus.message}
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isPosting || !postContent.trim()}
                                        className="ml-auto flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-200"
                                    >
                                        {isPosting ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                Sharing...
                                            </>
                                        ) : 'Share to LinkedIn'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Content pipeline</p>
                        <div className="mt-4 space-y-4">
                            <div className="flex items-start justify-between rounded-xl border border-slate-100 p-4 hover:border-slate-200 transition-colors">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Draft: Hiring update</p>
                                    <p className="text-xs text-slate-500">Video + copy ready for review.</p>
                                </div>
                                <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600 uppercase">Draft</span>
                            </div>
                            <div className="flex items-start justify-between rounded-xl border border-slate-100 p-4 hover:border-slate-200 transition-colors">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Scheduled: Founder story</p>
                                    <p className="text-xs text-slate-500">Publishing Friday at 9:00 AM.</p>
                                </div>
                                <span className="rounded-full bg-emerald-100 px-2 py-1 text-[10px] font-bold text-emerald-700 uppercase">Scheduled</span>
                            </div>
                        </div>
                    </div>
                </section>

                <aside className="space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Best Practices</p>
                        <ul className="mt-4 space-y-4 text-sm text-slate-600">
                            <li className="flex gap-3">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">1</span>
                                <span>Include 3-5 relevant hashtags to increase reach.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">2</span>
                                <span>Posts with images get 2x more engagement.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">3</span>
                                <span>The first 2 lines are critical—make them catchy!</span>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Posts
