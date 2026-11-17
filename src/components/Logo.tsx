type LogoProps = {
  className?: string;
};

/**
 * Renders the official LADG logo from /public/logo.svg.
 *
 * The official SVG asset is not yet provided. It must be dropped in at
 * `public/logo.svg` — this component is already wired to that exact path, so
 * no code change is required once it arrives. Until then the image is hidden
 * via onError and the wordmark carries the brand alone.
 */
const LOGO_URL = `${import.meta.env.BASE_URL}logo.svg`;

export function Logo({ className = "h-9 w-9" }: LogoProps) {
  return (
    <img
      src={LOGO_URL}
      alt="LADG logo"
      className={className}
      width={36}
      height={36}
      draggable={false}
      onError={(e) => {
        (e.currentTarget as HTMLImageElement).style.display = "none";
      }}
    />
  );
}
