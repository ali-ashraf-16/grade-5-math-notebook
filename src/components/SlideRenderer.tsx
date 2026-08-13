import { AreaModel, AdditionColumn } from "./AreaModel";
import { SlideFrame } from "./SlideFrame";
import type { Slide } from "@/deck/slides";

function Label({ children }: { children: string }) {
  return (
    <div
      className="slide-subtitle mb-6 inline-block text-[var(--nb-blue)]"
      style={{ transform: "rotate(-1deg)" }}
    >
      {children}
    </div>
  );
}

export function SlideRenderer({ slide }: { slide: Slide }) {
  if (slide.kind === "cover") {
    return (
      <SlideFrame>
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="slide-subtitle text-[var(--nb-blue)]">
            GRADE 5 MATHEMATICS
          </div>
          <div className="slide-title-lg mt-10 text-[var(--nb-orange)]">
            {slide.unit}
          </div>
          <div className="slide-title mt-4 text-[var(--nb-blue)]">
            {slide.lesson}
          </div>
          <div className="slide-subtitle mt-8 max-w-[1200px] text-[var(--nb-white)]">
            {slide.title}
          </div>
          <div className="slide-body mt-20 text-[var(--nb-white)] opacity-80">
            Prepared by
          </div>
          <div
            className="slide-title text-[var(--nb-white)]"
            style={{ transform: "rotate(-2deg)" }}
          >
            Mr. Ali Ashraf
          </div>
        </div>
      </SlideFrame>
    );
  }

  if (slide.kind === "concept") {
    return (
      <SlideFrame>
        <Label>{slide.label}</Label>
        <h1 className="slide-title text-[var(--nb-orange)]">{slide.title}</h1>
        <ul className="mt-16 space-y-10">
          {slide.lines.map((l, i) => (
            <li
              key={i}
              className="slide-body-lg max-w-[1250px] text-[var(--nb-white)]"
            >
              <span className="mr-5 text-[var(--nb-green)]">•</span>
              {l}
            </li>
          ))}
        </ul>
      </SlideFrame>
    );
  }

  if (slide.kind === "example") {
    return (
      <SlideFrame>
        <Label>{slide.label}</Label>
        <h1 className="slide-title text-[var(--nb-orange)]">{slide.title}</h1>
        <div className="mt-12 flex flex-1 items-center gap-24">
          {slide.model && <AreaModel {...slide.model} scale={0.82} />}
          {slide.addends && (
            <AdditionColumn addends={slide.addends} total={slide.total} />
          )}
        </div>
        {slide.answer && (
          <div
            className="slide-subtitle rounded-lg border-4 px-10 py-4 text-center text-[var(--nb-orange)]"
            style={{ borderColor: "var(--nb-orange)" }}
          >
            {slide.answer}
          </div>
        )}
      </SlideFrame>
    );
  }

  if (slide.kind === "practice") {
    return (
      <SlideFrame>
        <Label>{slide.label}</Label>
        <h1 className="slide-title text-[var(--nb-orange)]">{slide.title}</h1>
        <div className="mt-14 flex flex-1 items-center gap-28">
          {slide.model && <AreaModel {...slide.model} scale={0.9} />}
          <div className="slide-body-lg max-w-[520px] text-[var(--nb-white)]">
            Fill in every partial product, then add them all together.
          </div>
        </div>
        <div className="slide-subtitle text-[var(--nb-blue)]">
          {slide.problem} = ______
        </div>
      </SlideFrame>
    );
  }

  return (
    <SlideFrame>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="slide-subtitle text-[var(--nb-blue)]">
          Quiz · Question {slide.n} of 10
        </div>
        <div className="slide-title-lg mt-14 text-[var(--nb-orange)]">
          {slide.question}
        </div>
        {slide.sub && (
          <div className="slide-body-lg mt-14 text-[var(--nb-white)] opacity-85">
            {slide.sub}
          </div>
        )}
      </div>
    </SlideFrame>
  );
}
