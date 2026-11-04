import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, ImagePlus, Inbox, LoaderCircle, X } from 'lucide-react'
import { DEMO_MODE } from '@/lib/supabase'
import { uploadMedia } from '@/services/api'
import { cn } from '@/lib/cn'

export function AdminPage({ title, subtitle, actions, children }) {
  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-white/50">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  )
}

const BTN = {
  primary: 'bg-signal-500 text-white hover:bg-signal-400',
  outline: 'border border-white/12 text-white/85 hover:border-white/25 hover:bg-white/[0.05]',
  danger: 'border border-signal-500/40 text-signal-400 hover:bg-signal-500/10',
  ghost: 'text-white/70 hover:bg-white/[0.06] hover:text-white',
}

export function AdminButton({ variant = 'outline', loading, className, children, ...props }) {
  return (
    <button
      type="button"
      disabled={loading || props.disabled}
      className={cn('inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition disabled:opacity-50', BTN[variant], className)}
      {...props}
    >
      {loading && <LoaderCircle className="size-4 animate-spin" />}
      {children}
    </button>
  )
}

const STATUS_TONE = {
  new: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
  reviewed: 'bg-white/10 text-white/80 border-white/15',
  shortlisted: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  contacted: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
  approved: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  rejected: 'bg-signal-500/15 text-signal-400 border-signal-500/30',
}

export function StatusBadge({ status, className }) {
  return (
    <span className={cn('inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize', STATUS_TONE[status] ?? STATUS_TONE.reviewed, className)}>
      {status}
    </span>
  )
}

export function Loading({ label = 'Loading…' }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-white/[0.06] py-16 text-sm text-white/50" role="status">
      <LoaderCircle className="size-5 animate-spin text-signal-400" /> {label}
    </div>
  )
}

export function ErrorBox({ error, onRetry }) {
  return (
    <div role="alert" className="flex flex-col items-start gap-3 rounded-2xl border border-signal-500/30 bg-signal-500/10 p-5 text-sm text-signal-400 sm:flex-row sm:items-center sm:justify-between">
      <span className="flex items-start gap-2"><AlertTriangle className="mt-0.5 size-4 shrink-0" /> {error?.message ?? String(error)}</span>
      {onRetry && <AdminButton onClick={onRetry}>Try again</AdminButton>}
    </div>
  )
}

export function EmptyState({ title, text, action, icon: Icon = Inbox }) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-white/12 px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-2xl bg-white/[0.05] text-white/50"><Icon className="size-5" /></span>
      <h3 className="mt-4 font-sans text-base font-semibold text-white">{title}</h3>
      {text && <p className="mt-1.5 max-w-sm text-sm text-white/50">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}

// Inline success / error message that clears itself.
export function Notice({ notice, onDone }) {
  useEffect(() => {
    if (!notice) return
    const t = setTimeout(onDone, 3500)
    return () => clearTimeout(t)
  }, [notice, onDone])
  return (
    <AnimatePresence>
      {notice && (
        <motion.div
          role="status"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className={cn('fixed right-4 bottom-4 z-[80] max-w-sm rounded-xl border px-4 py-3 text-sm shadow-2xl', notice.error ? 'border-signal-500/40 bg-[#1a0508] text-signal-400' : 'border-emerald-500/30 bg-[#05140d] text-emerald-300')}
        >
          {notice.text}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Side panel on desktop, bottom sheet on phones. Escape closes it.
export function Drawer({ open, title, onClose, children, footer }) {
  const closeRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70] flex justify-end">
          <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 38 }}
            className="relative flex h-full w-full max-w-xl flex-col border-l border-white/[0.08] bg-[#0a0a0a]"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4">
              <h2 className="truncate font-display text-lg font-semibold text-white">{title}</h2>
              <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="grid size-9 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white">
                <X className="size-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">{children}</div>
            {footer && <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] px-5 py-4">{footer}</div>}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

export function ConfirmDialog({ open, title, text, confirmLabel = 'Delete', onConfirm, onCancel, loading }) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[90] grid place-items-center p-4">
          <motion.div className="absolute inset-0 bg-black/75" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onCancel} />
          <motion.div role="alertdialog" aria-modal="true" aria-label={title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0e0e0e] p-6">
            <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm text-white/60">{text}</p>
            <div className="mt-6 flex justify-end gap-2">
              <AdminButton variant="ghost" onClick={onCancel} autoFocus>Cancel</AdminButton>
              <AdminButton variant="primary" loading={loading} onClick={onConfirm}>{confirmLabel}</AdminButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

const input = 'w-full rounded-xl border border-white/10 bg-black/40 px-3.5 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-signal-500/70 focus:ring-4 focus:ring-signal-500/15'

// Renders one schema field (see services/collections.js) for the admin forms.
export function SchemaField({ field, value, onChange, error }) {
  const id = `f-${field.name}`
  const label = (
    <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-white/65">
      {field.label}{field.required && <span className="text-signal-400"> *</span>}
    </label>
  )
  const hint = field.hint && <p className="mt-1 text-xs text-white/40">{field.hint}</p>
  const err = error && <p className="mt-1 text-xs text-signal-400">{error}</p>

  if (field.type === 'boolean') {
    return (
      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-white/[0.08] bg-white/[0.02] px-3.5 py-3">
        <span className="text-sm text-white/80">{field.label}</span>
        <input type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} className="size-5 accent-primary" />
      </label>
    )
  }
  if (field.type === 'select') {
    return (
      <div>
        {label}
        <select id={id} value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={cn(input, 'h-11')}>
          <option value="">Select…</option>
          {field.options.map((o) => <option key={o} value={o}>{field.optionLabels?.[o] ?? o}</option>)}
        </select>
        {hint}{err}
      </div>
    )
  }
  if (field.type === 'textarea') {
    return (
      <div>
        {label}
        <textarea id={id} value={value ?? ''} onChange={(e) => onChange(e.target.value)} rows={4} className={cn(input, 'resize-y py-2.5')} />
        {hint}{err}
      </div>
    )
  }
  if (field.type === 'image') return <ImageField id={id} field={field} value={value} onChange={onChange} label={label} err={err} hint={hint} />
  return (
    <div>
      {label}
      <input
        id={id}
        type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : field.type === 'url' ? 'url' : 'text'}
        value={value ?? ''}
        onChange={(e) => onChange(field.type === 'number' ? (e.target.value === '' ? '' : Number(e.target.value)) : e.target.value)}
        className={cn(input, 'h-11')}
      />
      {hint}{err}
    </div>
  )
}

function ImageField({ id, value, onChange, label, err, hint }) {
  const [busy, setBusy] = useState(false)
  const [uploadError, setUploadError] = useState(null)
  const onFile = async (file) => {
    if (!file) return
    setBusy(true)
    setUploadError(null)
    try {
      onChange(await uploadMedia(file))
    } catch (e) {
      setUploadError(e.message)
    } finally {
      setBusy(false)
    }
  }
  return (
    <div>
      {label}
      <div className="flex gap-3">
        <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-white/10 bg-black/40">
          {value ? <img src={value} alt="" className="size-full object-cover" /> : <ImagePlus className="size-5 text-white/30" />}
        </div>
        <div className="min-w-0 flex-1 space-y-2">
          <input id={id} type="url" placeholder="https://… image URL" value={value ?? ''} onChange={(e) => onChange(e.target.value)} className={cn(input, 'h-10')} />
          <label className={cn('inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-white/12 px-3 text-xs font-semibold text-white/80 hover:bg-white/[0.05]', (DEMO_MODE || busy) && 'pointer-events-none opacity-50')}>
            {busy ? <LoaderCircle className="size-3.5 animate-spin" /> : <ImagePlus className="size-3.5" />}
            {value ? 'Replace image' : 'Upload image'}
            <input type="file" accept="image/*" className="sr-only" disabled={DEMO_MODE || busy} onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          {DEMO_MODE && <p className="text-xs text-white/40">Uploads need Supabase — paste an image URL in demo mode.</p>}
        </div>
      </div>
      {hint}{err}
      {uploadError && <p className="mt-1 text-xs text-signal-400">{uploadError}</p>}
    </div>
  )
}
