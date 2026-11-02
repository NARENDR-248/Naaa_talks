import { useId, useRef } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, CircleCheck, FileText, LoaderCircle, Upload, X } from 'lucide-react'
import { cn } from '@/lib/cn'

const control = 'w-full rounded-xl border bg-black/40 px-4 text-[15px] text-white placeholder:text-white/30 outline-none transition focus:border-signal-500/70 focus:ring-4 focus:ring-signal-500/15 disabled:opacity-60'

export function Field({ label, error, hint, optional, as = 'input', className, children, ...props }) {
  const id = useId()
  const Comp = as
  const describedBy = [error && `${id}-err`, hint && `${id}-hint`].filter(Boolean).join(' ') || undefined
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 flex justify-between gap-2 text-xs font-medium text-white/65">
        {label} {optional && <span className="text-white/30">Optional</span>}
      </label>
      <Comp
        id={id}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        className={cn(
          control,
          as === 'textarea' ? 'min-h-32 resize-y py-3' : 'h-12',
          error ? 'border-signal-500/70' : 'border-white/10',
          as === 'select' && 'appearance-none invalid:text-white/35',
        )}
        {...props}
      >
        {children}
      </Comp>
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-xs text-white/40">{hint}</p>}
      {error && <p id={`${id}-err`} className="mt-1.5 text-xs text-signal-400">{error}</p>}
    </div>
  )
}

export function SelectField({ options, placeholder = 'Select an option', labels, ...props }) {
  return (
    <Field as="select" required {...props}>
      <option value="" disabled>{placeholder}</option>
      {options.map((o) => <option key={o} value={o}>{labels?.[o] ?? o}</option>)}
    </Field>
  )
}

// File picker with a visible selected-file chip; validation is done by the caller.
export function FileField({ label, hint, error, optional, accept, file, onFile, className }) {
  const id = useId()
  const input = useRef(null)
  return (
    <div className={className}>
      <span id={`${id}-label`} className="mb-1.5 flex justify-between text-xs font-medium text-white/65">
        {label} {optional && <span className="text-white/30">Optional</span>}
      </span>
      <input ref={input} id={id} type="file" accept={accept} className="sr-only" aria-labelledby={`${id}-label`} aria-invalid={!!error} onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
      {file ? (
        <div className={cn('flex h-12 items-center gap-3 rounded-xl border bg-black/40 px-4', error ? 'border-signal-500/70' : 'border-white/10')}>
          <FileText className="size-4 shrink-0 text-signal-400" />
          <span className="min-w-0 flex-1 truncate text-sm text-white">{file.name}</span>
          <span className="text-xs text-white/40">{(file.size / 1024 / 1024).toFixed(1)} MB</span>
          <button type="button" onClick={() => { onFile(null); if (input.current) input.current.value = '' }} aria-label="Remove file" className="grid size-8 place-items-center rounded-full text-white/60 hover:bg-white/10 hover:text-white">
            <X className="size-4" />
          </button>
        </div>
      ) : (
        <label htmlFor={id} className={cn('flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed bg-black/30 text-sm text-white/60 transition hover:border-signal-500/60 hover:text-white', error ? 'border-signal-500/70' : 'border-white/15')}>
          <Upload className="size-4" /> Choose file
        </label>
      )}
      {hint && !error && <p className="mt-1.5 text-xs text-white/40">{hint}</p>}
      {error && <p className="mt-1.5 text-xs text-signal-400">{error}</p>}
    </div>
  )
}

// Hidden from people (and screen readers); bots that fill every field reveal themselves.
export function Honeypot({ value, onChange }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" tabIndex={-1} autoComplete="off" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  )
}

export function SubmitButton({ loading, children, className }) {
  return (
    <motion.button
      type="submit"
      disabled={loading}
      whileTap={{ scale: 0.97 }}
      className={cn('inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-signal-500 text-[13px] font-semibold tracking-[0.16em] text-white uppercase shadow-[0_12px_34px_-10px_rgb(245_32_58/0.85)] transition hover:bg-signal-400 disabled:opacity-60', className)}
    >
      {loading && <LoaderCircle className="size-4 animate-spin" />}
      {children}
    </motion.button>
  )
}

export function FormAlert({ children }) {
  if (!children) return null
  return (
    <p role="alert" className="flex items-start gap-2 rounded-xl border border-signal-500/30 bg-signal-500/10 px-4 py-3 text-sm text-signal-400">
      <AlertTriangle className="mt-0.5 size-4 shrink-0" /> {children}
    </p>
  )
}

export function FormSuccess({ title, children, action }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="py-8 text-center" role="status">
      <CircleCheck className="mx-auto size-12 text-emerald-400" />
      <h3 className="mt-4 font-display text-2xl font-light text-white">{title}</h3>
      <div className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-white/60">{children}</div>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  )
}

// Card wrapper used by every public form.
export function FormCard({ children, className }) {
  return <div className={cn('relative rounded-3xl border border-white/[0.08] bg-white/[0.025] p-5 sm:p-8', className)}>{children}</div>
}
