import { useState, useEffect, useRef } from 'react'

export function useTypewriter(strings, typeSpeed = 60, deleteSpeed = 35, pauseMs = 1800, pauseBeforeMs = 400) {
  const [displayed, setDisplayed] = useState('')
  const stateRef = useRef({ displayed: '', isDeleting: false, index: 0 })
  const timerRef = useRef(null)
  const stringsRef = useRef(strings)
  stringsRef.current = strings

  useEffect(() => {
    function tick() {
      const { displayed: cur, isDeleting, index } = stateRef.current
      const arr = stringsRef.current
      const word = arr[index % arr.length]

      if (!isDeleting) {
        const next = word.slice(0, cur.length + 1)
        stateRef.current.displayed = next
        setDisplayed(next)
        if (next.length === word.length) {
          timerRef.current = setTimeout(() => {
            stateRef.current.isDeleting = true
            timerRef.current = setTimeout(tick, deleteSpeed)
          }, pauseMs)
        } else {
          timerRef.current = setTimeout(tick, typeSpeed)
        }
      } else {
        const next = word.slice(0, cur.length - 1)
        stateRef.current.displayed = next
        setDisplayed(next)
        if (next.length === 0) {
          stateRef.current.isDeleting = false
          stateRef.current.index = index + 1
          timerRef.current = setTimeout(tick, pauseBeforeMs)
        } else {
          timerRef.current = setTimeout(tick, deleteSpeed)
        }
      }
    }

    timerRef.current = setTimeout(tick, typeSpeed)
    return () => clearTimeout(timerRef.current)
  }, [])

  return displayed
}
