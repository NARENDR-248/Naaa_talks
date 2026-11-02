import { useCallback, useEffect, useRef, useState } from 'react'

// Loads admin data with loading / error state. `key` re-runs the loader when it
// changes; `reload()` refetches on demand (e.g. after saving).
export function useAdminData(loader, key = '') {
  const loaderRef = useRef(loader)
  useEffect(() => { loaderRef.current = loader })
  const [state, setState] = useState({ data: null, loading: true, error: null })

  const fetchData = useCallback(() => {
    loaderRef.current()
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((error) => setState((s) => ({ ...s, loading: false, error })))
  }, [])

  useEffect(fetchData, [fetchData, key])

  const reload = useCallback(() => {
    setState((s) => ({ ...s, loading: true, error: null }))
    fetchData()
  }, [fetchData])

  const setData = useCallback((fn) => setState((s) => ({ ...s, data: typeof fn === 'function' ? fn(s.data) : fn })), [])

  return { ...state, reload, setData }
}
