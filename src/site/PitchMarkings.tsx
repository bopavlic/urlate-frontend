/** Faint chalk lines of a football pitch seen from above: halfway line, centre circle, boxes. */
export function PitchMarkings() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      stroke="var(--pitch-line)"
      strokeWidth="3"
    >
      <rect x="40" y="40" width="1120" height="620" />
      <line x1="600" y1="40" x2="600" y2="660" />
      <circle cx="600" cy="350" r="95" />
      <circle cx="600" cy="350" r="4" fill="var(--pitch-line)" />
      <rect x="40" y="190" width="170" height="320" />
      <rect x="40" y="270" width="60" height="160" />
      <rect x="990" y="190" width="170" height="320" />
      <rect x="1100" y="270" width="60" height="160" />
    </svg>
  );
}
