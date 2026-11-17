import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/5 py-16">
      <div className="container-page">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <Logo className="h-9 w-9" />
              <span className="font-display text-lg font-semibold tracking-tightest text-white">
                LADG
              </span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Personal Technology &amp; Innovation Brand. Lead the Code. Shape
              the Future.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <p className="eyebrow">Get in touch</p>
            <a
              href="mailto:hello@ladg.dev"
              className="text-lg font-medium text-white transition-colors hover:text-primary-300"
            >
              hello@ladg.dev
            </a>
            <p className="text-xs text-slate-600">
              © {new Date().getFullYear()} LADG. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
