import logoUrl from "/logo.svg";

type LogoProps = {
  className?: string;
};

/**
 * Renders the official LADG logo asset from /public/logo.svg.
 * When the real LADG SVG is provided, replace the file at public/logo.svg —
 * do NOT redesign or approximate the mark here.
 */
export function Logo({ className = "h-9 w-9" }: LogoProps) {
  return (
    <img
      src={logoUrl}
      alt="LADG logo"
      className={className}
      width={36}
      height={36}
      draggable={false}
    />
  );
}
