// Thin gradient strip used to soften abrupt color changes between sections.
// Drop one in wherever the next section has a noticeably different background.
//
// Example: <SectionTransition from="#FBFAF8" to="#000000" />
export default function SectionTransition({ from, to, height = 100 }) {
  return (
    <div
      aria-hidden
      style={{
        height: `${height}px`,
        background: `linear-gradient(to bottom, ${from} 0%, ${to} 100%)`,
        pointerEvents: 'none',
        // negative top margin pulls the transition slightly under the previous
        // section so the gradient feels like a tail rather than a stripe
        marginTop: '-1px'
      }}
    />
  )
}
