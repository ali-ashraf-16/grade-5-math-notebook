import { AreaModel, AdditionColumn, BlankAddition } from "./AreaModel";
import { SlideFrame } from "./SlideFrame";
import type { Slide } from "@/deck/slides";

function Title({ children }: { children: string }) {
  return <h1 className="nb-slide-title nb-glow-blue">{children}</h1>;
}

function Banner({ children }: { children: string }) {
  return (
    <div className="nb-banner mx-auto mt-10 w-full max-w-[1400px] text-center">
      <span
        className="nb-glow-white"
        style={{ fontFamily: "var(--font-hand)", fontSize: 68 }}
      >
        {children}
      </span>
    </div>
  );
}

export function SlideRenderer({ slide }: { slide: Slide }) {
  if (slide.kind === "cover") {
    return (
      <SlideFrame>
        <div className="flex h-full flex-col items-center justify-center text-center">
          <div className="slide-subtitle nb-glow-white">GRADE 5 MATHEMATICS</div>
          <div className="slide-title-lg nb-glow-orange mt-8">{slide.unit}</div>
          <div className="slide-title nb-glow-blue mt-2">
            {slide.lesson}: {slide.title}
          </div>
          <div className="slide-body-lg nb-glow-white mt-24">Prepared by</div>
          <div
            className="slide-title nb-glow-white"
            style={{ fontFamily: "var(--font-hand)" }}
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
        <Title>{slide.title}</Title>
        <ul className="mt-16 space-y-12">
          {slide.lines.map((l, i) => (
            <li
              key={i}
              className="slide-body-lg nb-glow-white max-w-[1450px]"
              style={{ fontFamily: "var(--font-hand)" }}
            >
              <span className="nb-glow-green mr-6">•</span>
              {l}
            </li>
          ))}
        </ul>
      </SlideFrame>
    );
  }

  if (slide.kind === "example") {
    const cols = slide.model?.cols.length ?? 2;
    return (
      <SlideFrame>
        <Title>{slide.title}</Title>
        <div className="mt-14 flex flex-1 items-center justify-between gap-16">
          {slide.model && (
            <AreaModel
              {...slide.model}
              cellW={cols >= 3 ? 330 : 420}
              cellH={cols >= 3 ? 160 : 190}
              fontSize={cols >= 3 ? 40 : 48}
            />
          )}
          {slide.addends && (
            <AdditionColumn
              addends={slide.addends}
              total={slide.total}
              fontSize={slide.addends.length > 4 ? 46 : 58}
            />
          )}
        </div>
        {slide.answer && (
          <div className="nb-banner mx-auto w-full max-w-[1200px] text-center">
            <span
              className="nb-glow-orange"
              style={{ fontFamily: "var(--font-hand)", fontSize: 72 }}
            >
              {slide.answer}
            </span>
          </div>
        )}
      </SlideFrame>
    );
  }

  if (slide.kind === "practice") {
    const cols = slide.model?.cols.length ?? 2;
    return (
      <SlideFrame>
        <Title>{slide.title}</Title>
        <Banner>{`Solve using an area model: ${slide.problem} = ?`}</Banner>
        <div className="mt-12 flex flex-1 items-center justify-between gap-16">
          {slide.model && (
            <AreaModel
              {...slide.model}
              cellW={cols >= 3 ? 330 : 420}
              cellH={cols >= 3 ? 170 : 200}
            />
          )}
          <BlankAddition lines={cols >= 3 ? 6 : 5} />
        </div>
      </SlideFrame>
    );
  }

  return (
    <SlideFrame>
      <div className="flex h-full flex-col items-center justify-center text-center">
        <div className="slide-subtitle nb-glow-blue">
          Quiz · Question {slide.n} of 10
        </div>
        <div className="nb-banner mt-16 max-w-[1450px]">
          <span
            className="nb-glow-orange"
            style={{ fontFamily: "var(--font-hand)", fontSize: 130 }}
          >
            {slide.question}
          </span>
        </div>
        {slide.sub && (
          <div className="slide-body-lg nb-glow-white mt-16">{slide.sub}</div>
        )}
      </div>
    </SlideFrame>
  );
}
