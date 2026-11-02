import { useState } from 'react'

// Shared state machine for public forms: validation, spam guard and submit.
export function useGuardedForm({ initial, validate, submit }) {
  const [values, setValues] = useState(initial)
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [result, setResult] = useState(null) // whatever submit() resolved with, e.g. { reference }
  const [error, setError] = useState(null)
  const [trap, setTrap] = useState('')
  const [startedAt] = useState(() => Date.now())
  const errors = validate(values)

  const set = (k) => (e) => setValues((v) => ({ ...v, [k]: e?.target ? e.target.value : e }))
  const err = (k) => (touched ? errors[k] : undefined)

  const onSubmit = async (e) => {
    e.preventDefault()
    setTouched(true)
    setError(null)
    if (Object.keys(errors).length) {
      e.currentTarget.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    // Spam guard: honeypot filled or submitted implausibly fast → pretend success.
    if (trap || Date.now() - startedAt < 2500) {
      setStatus('sent')
      return
    }
    const last = Number(localStorage.getItem('naaatalks.lastSubmit') || 0)
    if (Date.now() - last < 30_000) {
      setError('You just sent a form — please wait a few seconds before sending another.')
      return
    }
    setStatus('sending')
    try {
      setResult(await submit(values))
      try { localStorage.setItem('naaatalks.lastSubmit', String(Date.now())) } catch { /* ignore */ }
      setStatus('sent')
    } catch (ex) {
      setStatus('idle')
      setError(ex.message || 'Something went wrong. Please try again.')
    }
  }

  const reset = () => {
    setValues(initial)
    setTouched(false)
    setStatus('idle')
    setResult(null)
  }

  return { values, set, err, status, result, error, onSubmit, reset, trap, setTrap }
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_RE = /^[+\d][\d\s-]{6,18}$/
