import type { ReactNode } from "react";

/**
 * A single 1920x1080 slide: dark walnut frame, charcoal notebook paper,
 * silver binder clips, masking tape and margin doodles.
 */
export function SlideFrame({ children }: { children: ReactNode }) {
  return (
    <div className="slide-content">
      <div className="slide-wall">
        <div className="slide-frame">
          <div className="slide-paper">
            <Doodles />
            <div className="slide-clip" style={{ left: "620px" }} />
            <div className="slide-clip" style={{ left: "1240px" }} />
            <div className="slide-tape slide-tape-left" />
            <div className="slide-tape slide-tape-right" />
            <div className="relative z-10 flex h-full w-full flex-col px-[130px] py-[110px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Doodles() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-[0.28]"
      viewBox="0 0 1780 940"
      fill="none"
      stroke="currentColor"
      style={{ color: "var(--nb-doodle)" }}
      strokeWidth={3}
      strokeLinecap="round"
    >
      <circle cx="70" cy="150" r="26" />
      <path d="M46 300 h48 M70 276 v48" />
      <path d="M40 430 l60 60 M100 430 l-60 60" />
      <path d="M44 600 h52 M44 630 h52" />
      <rect x="44" y="740" width="54" height="54" rx="4" />
      <path d="M1700 180 l40 70 h-80 z" />
      <path d="M1690 360 h70 M1690 390 h70 M1725 345 v60" />
      <circle cx="1725" cy="560" r="30" />
      <path d="M1698 700 q27 -50 54 0 q-27 50 -54 0" />
      <path d="M1690 850 h70 l-70 40 h70" />
      <path d="M300 900 q40 -26 80 0 q40 26 80 0" />
      <path d="M1300 60 q40 -26 80 0 q40 26 80 0" />
    </svg>
  );
}
