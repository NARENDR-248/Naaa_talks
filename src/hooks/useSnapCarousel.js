import { useCallback, useEffect, useRef, useState } from 'react'

// Scroll-snap carousel: tracks the active slide from scroll position, scrolls to
// a slide, adds mouse drag-to-scroll (touch uses native swipe) and sizes a
// trailing spacer so the last slide can align to the start like the others.
// Slides are the track's children marked with data-slide.
export function useSnapCarousel(trackRef, { reduceMotion = false } = {}) {
  const [active, setActive] = useState(0)
  const [spacer, setSpacer] = useState(0)
  const [dragging, setDragging] = useState(false)
  const drag = useRef(null)
  const suppressClick = useRef(false)

  const slides = useCallback(() => [...(trackRef.current?.querySelectorAll('[data-slide]') ?? [])], [trackRef])
  const padStart = useCallback(() => parseFloat(getComputedStyle(trackRef.current).paddingLeft) || 0, [trackRef])

  const nearest = useCallback(() => {
    const track = trackRef.current
    if (!track) return 0
    const pad = padStart()
    let best = 0
    let bestDist = Infinity
    slides().forEach((el, i) => {
      const d = Math.abs(el.offsetLeft - pad - track.scrollLeft)
      if (d < bestDist) { bestDist = d; best = i }
    })
    return best
  }, [trackRef, padStart, slides])

  const goTo = useCallback((index, { smooth = true } = {}) => {
    const track = trackRef.current
    const list = slides()
    if (!track || !list.length) return
    const i = (index + list.length) % list.length
    track.scrollTo({ left: list[i].offsetLeft - padStart(), behavior: smooth && !reduceMotion ? 'smooth' : 'auto' })
  }, [trackRef, slides, padStart, reduceMotion])

  // Active slide follows the scroll position.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setActive(nearest()))
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener('scroll', onScroll)
    }
  }, [trackRef, nearest])

  // Spacer width = room needed for the last slide to reach the start edge.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      const list = slides()
      const last = list[list.length - 1]
      if (!last) return
      const style = getComputedStyle(track)
      const room = track.clientWidth - last.offsetWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - parseFloat(style.columnGap || 0)
      setSpacer(Math.max(0, Math.round(room)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    return () => ro.disconnect()
  }, [trackRef, slides])

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    drag.current = { x: e.clientX, left: trackRef.current.scrollLeft, moved: false, id: e.pointerId }
  }

  const onPointerMove = (e) => {
    const d = drag.current
    const track = trackRef.current
    if (!d || !track) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true
      setDragging(true)
      track.setPointerCapture(d.id)
      track.style.scrollSnapType = 'none'
      track.style.scrollBehavior = 'auto'
    }
    if (d.moved) track.scrollLeft = d.left - dx
  }

  const endDrag = () => {
    const d = drag.current
    const track = trackRef.current
    drag.current = null
    if (!d?.moved || !track) return
    suppressClick.current = true
    track.style.scrollSnapType = ''
    track.style.scrollBehavior = ''
    setDragging(false)
    goTo(nearest())
  }

  // A drag shouldn't also count as a click on the slide underneath.
  const onClickCapture = (e) => {
    if (!suppressClick.current) return
    suppressClick.current = false
    e.preventDefault()
    e.stopPropagation()
  }

  return {
    active,
    goTo,
    spacer,
    dragging,
    trackProps: { onPointerDown, onPointerMove, onPointerUp: endDrag, onPointerCancel: endDrag, onClickCapture },
  }
}
