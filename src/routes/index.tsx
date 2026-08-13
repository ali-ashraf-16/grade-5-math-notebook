import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SlideRenderer } from "@/components/SlideRenderer";
import { slides, DECK_TITLE } from "@/deck/slides";
import { downloadPptx } from "@/lib/export-pptx";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Unit 5 · Lesson 4 — Area Model Multiplication (Grade 5)" },
      {
        name: "description",
        content:
          "Grade 5 math lesson deck: multiplying decimals with the area model, solved examples, practice problems and a 10-question quiz. Downloadable as PowerPoint.",
      },
      { property: "og:title", content: "Unit 5 · Lesson 4 — Area Model Multiplication" },
      {
        property: "og:description",
        content:
          "Handwritten notebook-style Grade 5 lesson on multiplying decimals with area models, with a PowerPoint download.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DeckPage,
});

function DeckPage() {
  const [index, setIndex] = useState(0);
  const [busy, setBusy] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const go = useCallback((n: number) => {
    setIndex((i) => Math.min(slides.length - 1, Math.max(0, i + n)));
  }, []);

  useLayoutEffect(() => {
    const fit = () => {
      const stage = stageRef.current;
      const wrap = wrapRef.current;
      if (!stage || !wrap) return;
      const scale = Math.min(stage.clientWidth / 1920, stage.clientHeight / 1080);
      wrap.style.transform = `scale(${scale})`;
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") go(1);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "f" || e.key === "F5") {
        e.preventDefault();
        document.documentElement.requestFullscreen?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const handleDownload = async () => {
    setBusy(true);
    try {
      await downloadPptx();
    } finally {
      setBusy(false);
    }
  };

  const current = slides[index]!;

  return (
    <main className="flex h-screen flex-col bg-[var(--nb-wall)]">
      <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div>
          <h1
            className="text-[var(--nb-orange)]"
            style={{ fontFamily: "var(--font-hand)", fontSize: 30 }}
          >
            Unit 5 · Lesson 4 — {DECK_TITLE}
          </h1>
          <p
            className="text-[var(--nb-white)] opacity-70"
            style={{ fontFamily: "var(--font-hand-body)", fontSize: 18 }}
          >
            Prepared by Mr. Ali Ashraf · use ← → to move between slides
          </p>
        </div>
        <button
          onClick={handleDownload}
          disabled={busy}
          className="rounded-md border-2 px-5 py-2 text-[var(--nb-blue)] transition-colors hover:bg-[var(--nb-blue)]/10 disabled:opacity-60"
          style={{
            borderColor: "var(--nb-blue)",
            fontFamily: "var(--font-hand-body)",
            fontSize: 20,
          }}
        >
          {busy ? "Preparing…" : "⤓ Download PowerPoint"}
        </button>
      </header>

      <div ref={stageRef} className="relative flex-1 overflow-hidden">
        <div ref={wrapRef} className="slide-scale-wrapper">
          <SlideRenderer slide={current} />
        </div>
      </div>

      <footer className="flex items-center justify-center gap-6 px-6 py-4">
        <button
          onClick={() => go(-1)}
          className="rounded-md border-2 px-4 py-1 text-[var(--nb-white)]"
          style={{ borderColor: "var(--nb-grid-line)", fontFamily: "var(--font-hand-body)" }}
        >
          ← Prev
        </button>
        <span
          className="text-[var(--nb-white)]"
          style={{ fontFamily: "var(--font-hand-body)", fontSize: 20 }}
        >
          {index + 1} / {slides.length}
        </span>
        <button
          onClick={() => go(1)}
          className="rounded-md border-2 px-4 py-1 text-[var(--nb-white)]"
          style={{ borderColor: "var(--nb-grid-line)", fontFamily: "var(--font-hand-body)" }}
        >
          Next →
        </button>
      </footer>
    </main>
  );
}
