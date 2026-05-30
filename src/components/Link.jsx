import React, { useContext } from 'react'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { PageTransitionContext } from './PageTransition'

export default function Link({ to, children, onClick, ...props }) {
  const navigate = useNavigate()
  const { setIsTransitioning } = useContext(PageTransitionContext)

  const handleClick = (e) => {
    // Forward to caller first (e.g. close a menu) — caller can also preventDefault
    if (onClick) onClick(e)
    if (e.defaultPrevented) return

    // External / new-tab / modifier keys: let the browser handle navigation
    if (props.target === '_blank' || props.download || e.ctrlKey || e.metaKey) {
      return
    }

    e.preventDefault()
    setIsTransitioning(true)
    // Navigate immediately — the overlay animates in concurrently.
    // No blocking delay: INP is measured from click to next paint, so any
    // setTimeout before navigate() directly inflates the metric.
    window.scrollTo(0, 0)
    navigate(to)
  }

  return (
    <RouterLink to={to} onClick={handleClick} {...props}>
      {children}
    </RouterLink>
  )
}
