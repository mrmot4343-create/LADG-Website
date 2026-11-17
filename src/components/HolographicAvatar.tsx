/**
 * HolographicAvatar — placeholder component for the cinematic holographic robot avatar.
 *
 * Phase 1 ships this stylized CSS/SVG placeholder so the hero composition is complete.
 * A future phase will replace the inner visual with a real 3D scene (e.g. react-three-fiber)
 * without changing this component's public surface (size / position / ambient glow).
 */
type HolographicAvatarProps = {
  className?: string;
};

export function HolographicAvatar({ className = "" }: HolographicAvatarProps) {
  return (
    <div
      className={`relative aspect-square w-full max-w-md ${className}`}
      aria-hidden="true"
      data-slot="holographic-avatar"
    >
      {/* Ambient halo */}
      <div className="absolute inset-0 rounded-full bg-primary-500/20 blur-3xl animate-pulse-slow" />

      {/* Rotating rings */}
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <defs>
            <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22ccff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#34e3c4" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <circle
            cx="200"
            cy="200"
            r="190"
            fill="none"
            stroke="url(#ring)"
            strokeWidth="1.5"
            strokeDasharray="2 8"
          />
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            stroke="url(#ring)"
            strokeWidth="1"
            strokeDasharray="1 6"
          />
        </svg>
      </div>

      {/* Counter-rotating inner ring */}
      <div
        className="absolute inset-8 animate-spin-slow"
        style={{ animationDirection: "reverse", animationDuration: "18s" }}
      >
        <svg viewBox="0 0 400 400" className="h-full w-full">
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="#22ccff"
            strokeOpacity="0.25"
            strokeWidth="1"
            strokeDasharray="40 20"
          />
        </svg>
      </div>

      {/* Core figure — placeholder silhouette */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-3/5 w-3/5 animate-float">
          <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-[0_0_25px_rgba(34,204,255,0.5)]">
            <defs>
              <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#99ecff" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#22ccff" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#0aa887" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="visor" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0a0c14" />
                <stop offset="100%" stopColor="#11141f" />
              </linearGradient>
            </defs>

            {/* Head */}
            <path
              d="M70 40 h60 a12 12 0 0 1 12 12 v40 a12 12 0 0 1 -12 12 h-60 a12 12 0 0 1 -12 -12 v-40 a12 12 0 0 1 12 -12 z"
              fill="url(#body)"
              opacity="0.92"
            />
            {/* Visor */}
            <rect x="66" y="54" width="68" height="22" rx="6" fill="url(#visor)" />
            {/* Visor light */}
            <rect x="74" y="62" width="10" height="6" rx="3" fill="#34e3c4">
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="2.5s"
                repeatCount="indefinite"
              />
            </rect>

            {/* Neck + torso */}
            <rect x="92" y="104" width="16" height="14" fill="#22ccff" opacity="0.6" />
            <path
              d="M58 120 h84 a10 10 0 0 1 10 10 v34 a10 10 0 0 1 -10 10 h-84 a10 10 0 0 1 -10 -10 v-34 a10 10 0 0 1 10 -10 z"
              fill="url(#body)"
              opacity="0.82"
            />
            {/* Chest core */}
            <circle cx="100" cy="147" r="9" fill="#34e3c4">
              <animate
                attributeName="opacity"
                values="0.9;0.4;0.9"
                dur="3s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="100" cy="147" r="14" fill="none" stroke="#34e3c4" strokeOpacity="0.4" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Scan line overlay */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <div className="absolute inset-x-0 h-1/3 bg-gradient-to-b from-primary-300/0 via-primary-300/15 to-primary-300/0 animate-scan" />
      </div>

      {/* Base platform */}
      <div className="absolute -bottom-2 left-1/2 h-6 w-2/3 -translate-x-1/2 rounded-[50%] bg-primary-400/30 blur-md" />
    </div>
  );
}
