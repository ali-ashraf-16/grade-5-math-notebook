import { slides, DECK_TITLE, type Slide, type Model } from "@/deck/slides";

const PAPER = "1E1E1E";
const WOOD = "3D2416";
const ORANGE = "FF8C32";
const BLUE = "38BDF8";
const WHITE = "F5F5F7";
const RED = "FF4D4D";
const GREEN = "39FF14";
const HAND = "Comic Sans MS";

const W = 10;
const H = 5.625;

function modelRows(model: Model) {
  const header = [
    { text: "", options: { fill: { color: PAPER } } },
    ...model.cols.map((c) => ({
      text: c,
      options: {
        color: RED,
        bold: true,
        align: "center" as const,
        fill: { color: PAPER },
      },
    })),
  ];
  const body = model.rows.map((r, ri) => [
    {
      text: r,
      options: {
        color: GREEN,
        bold: true,
        align: "center" as const,
        fill: { color: PAPER },
      },
    },
    ...model.cols.map((_, ci) => {
      const v = model.cells[ri]?.[ci] ?? null;
      return {
        text: v ?? "",
        options: {
          color: BLUE,
          align: "center" as const,
          fill: { color: PAPER },
          border: [{ pt: 1.5, color: BLUE }] as never,
        },
      };
    }),
  ]);
  return [header, ...body];
}

export async function downloadPptx() {
  const PptxGenJS = (await import("pptxgenjs")).default;
  const pptx = new PptxGenJS();
  pptx.layout = "LAYOUT_16x9";
  pptx.title = `Unit 5 · Lesson 4 — ${DECK_TITLE}`;
  pptx.author = "Mr. Ali Ashraf";

  const addBase = () => {
    const s = pptx.addSlide();
    s.background = { color: WOOD };
    s.addShape("rect", {
      x: 0.315,
      y: 0.315,
      w: W - 0.63,
      h: H - 0.63,
      fill: { color: PAPER },
      line: { color: "0B0D10", width: 1 },
    });
    return s;
  };

  /** Centered cyan title with an underline, like the reference deck. */
  const addTitle = (s: ReturnType<typeof addBase>, text: string) => {
    s.addText(text, {
      x: 0.6,
      y: 0.45,
      w: W - 1.2,
      h: 0.7,
      align: "center",
      fontFace: HAND,
      fontSize: 32,
      bold: true,
      color: BLUE,
    });
    s.addShape("rect", {
      x: 1.4,
      y: 1.14,
      w: W - 2.8,
      h: 0.03,
      fill: { color: BLUE },
      line: { color: BLUE, width: 0 },
    });
  };

  for (const slide of slides as Slide[]) {
    const s = addBase();

    if (slide.kind === "cover") {
      s.addText("GRADE 5 MATHEMATICS", {
        x: 0.6, y: 0.8, w: W - 1.2, h: 0.6,
        align: "center", fontFace: HAND, fontSize: 26, color: WHITE,
      });
      s.addText(slide.unit, {
        x: 0.6, y: 1.45, w: W - 1.2, h: 1.0,
        align: "center", fontFace: HAND, fontSize: 60, bold: true, color: ORANGE,
      });
      s.addText(`${slide.lesson}: ${slide.title}`, {
        x: 0.6, y: 2.45, w: W - 1.2, h: 0.8,
        align: "center", fontFace: HAND, fontSize: 30, color: BLUE,
      });
      s.addText("Prepared by", {
        x: 0.6, y: 3.7, w: W - 1.2, h: 0.45,
        align: "center", fontFace: HAND, fontSize: 22, color: WHITE,
      });
      s.addText("Mr. Ali Ashraf", {
        x: 0.6, y: 4.15, w: W - 1.2, h: 0.8,
        align: "center", fontFace: HAND, fontSize: 38, bold: true, color: WHITE,
      });
      continue;
    }

    if (slide.kind === "quiz") {
      s.addText(`Quiz · Question ${slide.n} of 10`, {
        x: 0.6, y: 0.75, w: W - 1.2, h: 0.5,
        align: "center", fontFace: HAND, fontSize: 26, color: BLUE,
      });
      s.addText(slide.question, {
        x: 1.2, y: 1.85, w: W - 2.4, h: 1.3,
        align: "center", valign: "middle", fontFace: HAND, fontSize: 54, bold: true,
        color: ORANGE, line: { color: ORANGE, width: 2.5 }, rectRadius: 0.12,
      });
      if (slide.sub) {
        s.addText(slide.sub, {
          x: 0.6, y: 3.5, w: W - 1.2, h: 0.6,
          align: "center", fontFace: HAND, fontSize: 26, color: WHITE,
        });
      }
      continue;
    }

    addTitle(s, slide.title);

    if (slide.kind === "concept") {
      s.addText(
        slide.lines.map((t) => ({
          text: t,
          options: {
            bullet: true,
            color: WHITE,
            fontFace: HAND,
            fontSize: 26,
            paraSpaceAfter: 26,
          },
        })),
        { x: 0.9, y: 1.6, w: W - 1.8, h: 3.2 },
      );
      continue;
    }

    const nCols = slide.model?.cols.length ?? 2;
    const colW = nCols >= 3 ? 1.55 : 2.05;

    if (slide.kind === "practice") {
      s.addText(`Solve using an area model: ${slide.problem} = ?`, {
        x: 1.0, y: 1.35, w: W - 2.0, h: 0.65,
        align: "center", valign: "middle", fontFace: HAND, fontSize: 28,
        color: WHITE, line: { color: ORANGE, width: 2.5 }, rectRadius: 0.1,
      });
    }

    if (slide.model) {
      const tableW = 0.8 + colW * nCols;
      s.addTable(modelRows(slide.model), {
        x: 0.55,
        y: slide.kind === "practice" ? 2.2 : 1.5,
        w: tableW,
        colW: [0.8, ...Array<number>(nCols).fill(colW)],
        rowH: slide.kind === "practice" ? 0.62 : 0.55,
        fontFace: HAND,
        fontSize: nCols >= 3 ? 13 : 16,
        valign: "middle",
        border: { pt: 1.5, color: BLUE },
      });
    }

    if (slide.kind === "example") {
      if (slide.addends) {
        const lines = slide.addends
          .map((a, i) => (i === 0 ? a : `+ ${a}`))
          .join("\n");
        s.addText(lines, {
          x: 6.6, y: 1.5, w: 2.6, h: 2.1,
          align: "right", fontFace: HAND,
          fontSize: slide.addends.length > 4 ? 18 : 22,
          color: BLUE, lineSpacingMultiple: 1.15,
        });
      }
      if (slide.total) {
        s.addShape("rect", {
          x: 7.3, y: 3.6, w: 1.9, h: 0.03,
          fill: { color: BLUE }, line: { color: BLUE, width: 0 },
        });
        s.addText(slide.total, {
          x: 6.6, y: 3.65, w: 2.6, h: 0.55,
          align: "right", fontFace: HAND, fontSize: 26, bold: true, color: BLUE,
        });
      }
      if (slide.answer) {
        s.addText(slide.answer, {
          x: 1.4, y: 4.55, w: W - 2.8, h: 0.62,
          align: "center", valign: "middle", fontFace: HAND, fontSize: 30, bold: true,
          color: ORANGE, line: { color: ORANGE, width: 2.5 }, rectRadius: 0.1,
        });
      }
    } else {
      // Practice: blank answer lines on the right of the empty grid.
      s.addText("+", {
        x: 6.7, y: 3.05, w: 0.4, h: 0.5,
        fontFace: HAND, fontSize: 30, color: BLUE, align: "center",
      });
      const rows = nCols >= 3 ? 6 : 5;
      for (let i = 0; i < rows; i++) {
        s.addShape("rect", {
          x: 7.2, y: 2.3 + i * 0.45, w: 1.9, h: 0.025,
          fill: { color: WHITE }, line: { color: WHITE, width: 0 },
        });
      }
    }
  }

  await pptx.writeFile({ fileName: "Unit5-Lesson4-Area-Model-Multiplication.pptx" });
}
