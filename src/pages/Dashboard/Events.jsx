import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'

const Events = () => {
    const { profile } = useOutletContext()
    const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    const [isCreating, setIsCreating] = useState(false)
    const [eventStatus, setEventStatus] = useState({ type: '', message: '' })

    const [eventData, setEventData] = useState({
        title: '',
        description: '',
        eventType: 'ONLINE',
        onlineEventUrl: '',
        startTime: '',
        endTime: '',
        visibility: 'PUBLIC'
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setEventData(prev => ({ ...prev, [name]: value }))
    }

    const handleCreateEvent = async (e) => {
        e.preventDefault()
        setIsCreating(true)
        setEventStatus({ type: '', message: '' })

        try {
            // LinkedIn expects timestamps in milliseconds
            const payload = {
                title: eventData.title,
                description: eventData.description,
                eventSchedule: {
                    start: new Date(eventData.startTime).getTime(),
                    end: new Date(eventData.endTime).getTime()
                },
                eventType: eventData.eventType,
                visibility: eventData.visibility
            }

            if (eventData.eventType === 'ONLINE') {
                payload.onlineEventUrl = eventData.onlineEventUrl
            }

            const response = await fetch(`${apiBase}/api/events`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
                credentials: 'include',
            })

            const data = await response.json()

            if (response.ok) {
                setEventStatus({ type: 'success', message: 'Event created successfully!' })
                setEventData({
                    title: '',
                    description: '',
                    eventType: 'ONLINE',
                    onlineEventUrl: '',
                    startTime: '',
                    endTime: '',
                    visibility: 'PUBLIC'
                })
            } else {
                throw new Error(data.error || 'Failed to create event')
            }
        } catch (err) {
            setEventStatus({ type: 'error', message: err.message })
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Events</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Manage Events</h2>
                <p className="mt-2 text-sm text-slate-500">Create and manage your professional LinkedIn events.</p>
            </section>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <section className="space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Create new event</p>
                        {!profile ? (
                            <div className="mt-4 rounded-xl bg-slate-50 p-6 text-center">
                                <p className="text-sm text-slate-600">Please connect your LinkedIn account to create events.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleCreateEvent} className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Event Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={eventData.title}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="e.g. Masterclass: Personal Branding"
                                        className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-sans"
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Event Type</label>
                                        <select
                                            name="eventType"
                                            value={eventData.eventType}
                                            onChange={handleInputChange}
                                            className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-sans"
                                        >
                                            <option value="ONLINE">Online</option>
                                            <option value="IN_PERSON">In Person</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Visibility</label>
                                        <select
                                            name="visibility"
                                            value={eventData.visibility}
                                            onChange={handleInputChange}
                                            className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-sans"
                                        >
                                            <option value="PUBLIC">Public</option>
                                            <option value="CONNECTIONS_ONLY">Connections Only</option>
                                        </select>
                                    </div>
                                </div>

                                {eventData.eventType === 'ONLINE' && (
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Online Event URL</label>
                                        <input
                                            type="url"
                                            name="onlineEventUrl"
                                            value={eventData.onlineEventUrl}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="https://zoom.us/..."
                                            className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-sans"
                                        />
                                    </div>
                                )}

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Start Time</label>
                                        <input
                                            type="datetime-local"
                                            name="startTime"
                                            value={eventData.startTime}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-sans"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">End Time</label>
                                        <input
                                            type="datetime-local"
                                            name="endTime"
                                            value={eventData.endTime}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all font-sans"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        value={eventData.description}
                                        onChange={handleInputChange}
                                        required
                                        placeholder="Tell people what your event is about..."
                                        className="w-full min-h-[120px] rounded-xl border border-slate-200 p-3 text-sm focus:border-emerald-300 focus:outline-none focus:ring-4 focus:ring-emerald-50 transition-all resize-none font-sans"
                                    />
                                </div>

                                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                                    {eventStatus.message && (
                                        <div className={`flex items-center gap-2 rounded-lg px-3 py-1 text-xs font-medium ${eventStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                                            }`}>
                                            {eventStatus.message}
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={isCreating}
                                        className="ml-auto flex items-center gap-2 rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-slate-200"
                                    >
                                        {isCreating ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                                Creating...
                                            </>
                                        ) : 'Create Event'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </section>

                <aside className="space-y-6">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Event Success Tips</p>
                        <ul className="mt-4 space-y-4 text-sm text-slate-600">
                            <li className="flex gap-3">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">1</span>
                                <span>Choose a clear, descriptive title.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">2</span>
                                <span>Invite your connections once created.</span>
                            </li>
                            <li className="flex gap-3">
                                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">3</span>
                                <span>Post regular updates in the event feed.</span>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Events
