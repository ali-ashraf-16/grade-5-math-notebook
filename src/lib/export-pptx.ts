import { slides, DECK_TITLE, type Slide, type Model } from "@/deck/slides";

const PAPER = "1E1E1E";
const WOOD = "3D2416";
const ORANGE = "FF8C32";
const BLUE = "38BDF8";
const WHITE = "F5F5F7";
const RED = "FF4D4D";
const GREEN = "39FF14";
const HAND = "Comic Sans MS";

const W = 13.333;
const H = 7.5;

function modelRows(model: Model) {
  const header = [
    { text: "", options: { fill: { color: PAPER } } },
    ...model.cols.map((c) => ({
      text: c,
      options: { color: BLUE, align: "center" as const, fill: { color: PAPER } },
    })),
  ];
  const body = model.rows.map((r, ri) => [
    {
      text: r,
      options: { color: BLUE, align: "center" as const, fill: { color: PAPER } },
    },
    ...model.cols.map((_, ci) => {
      const v = model.cells[ri]?.[ci] ?? null;
      return {
        text: v === null ? "?" : v,
        options: {
          color: v === null ? ORANGE : GREEN,
          align: "center" as const,
          fill: { color: PAPER },
          border: [{ pt: 1, color: "BFC4CB" }] as never,
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
      x: 0.42,
      y: 0.42,
      w: W - 0.84,
      h: H - 0.84,
      fill: { color: PAPER },
      line: { color: "0B0D10", width: 1 },
    });
    return s;
  };

  for (const slide of slides as Slide[]) {
    const s = addBase();

    if (slide.kind === "cover") {
      s.addText("GRADE 5 MATHEMATICS", {
        x: 0.8, y: 1.0, w: W - 1.6, h: 0.7,
        align: "center", fontFace: HAND, fontSize: 26, color: BLUE,
      });
      s.addText(slide.unit, {
        x: 0.8, y: 1.8, w: W - 1.6, h: 1.2,
        align: "center", fontFace: HAND, fontSize: 60, bold: true, color: ORANGE,
      });
      s.addText(slide.lesson, {
        x: 0.8, y: 2.9, w: W - 1.6, h: 0.8,
        align: "center", fontFace: HAND, fontSize: 40, color: BLUE,
      });
      s.addText(slide.title, {
        x: 1.2, y: 3.7, w: W - 2.4, h: 0.9,
        align: "center", fontFace: HAND, fontSize: 28, color: WHITE,
      });
      s.addText("Prepared by", {
        x: 0.8, y: 5.2, w: W - 1.6, h: 0.5,
        align: "center", fontFace: HAND, fontSize: 20, color: WHITE,
      });
      s.addText("Mr. Ali Ashraf", {
        x: 0.8, y: 5.6, w: W - 1.6, h: 0.9,
        align: "center", fontFace: HAND, fontSize: 40, color: WHITE, italic: true,
      });
      continue;
    }

    if (slide.kind === "quiz") {
      s.addText(`Quiz · Question ${slide.n} of 10`, {
        x: 0.8, y: 1.2, w: W - 1.6, h: 0.6,
        align: "center", fontFace: HAND, fontSize: 24, color: BLUE,
      });
      s.addText(slide.question, {
        x: 0.8, y: 2.6, w: W - 1.6, h: 1.4,
        align: "center", fontFace: HAND, fontSize: 60, bold: true, color: ORANGE,
      });
      if (slide.sub) {
        s.addText(slide.sub, {
          x: 0.8, y: 4.3, w: W - 1.6, h: 0.7,
          align: "center", fontFace: HAND, fontSize: 24, color: WHITE,
        });
      }
      continue;
    }

    s.addText(slide.label, {
      x: 0.9, y: 0.8, w: 5, h: 0.5, fontFace: HAND, fontSize: 22, color: BLUE,
    });
    s.addText(slide.title, {
      x: 0.9, y: 1.25, w: W - 1.8, h: 0.9,
      fontFace: HAND, fontSize: 38, bold: true, color: ORANGE,
    });

    if (slide.kind === "concept") {
      s.addText(
        slide.lines.map((t) => ({
          text: t,
          options: { bullet: true, color: WHITE, fontFace: HAND, fontSize: 24, paraSpaceAfter: 16 },
        })),
        { x: 1.1, y: 2.4, w: W - 2.4, h: 3.4 },
      );
      continue;
    }

    if (slide.model) {
      s.addTable(modelRows(slide.model), {
        x: 0.9,
        y: 2.5,
        w: 1.4 * (slide.model.cols.length + 1),
        rowH: 0.62,
        fontFace: HAND,
        fontSize: 20,
        valign: "middle",
        border: { pt: 1, color: "BFC4CB" },
      });
    }

    if (slide.kind === "example") {
      if (slide.addends) {
        s.addText(slide.addends.map((a) => `+ ${a}`).join("\n"), {
          x: 8.4, y: 2.4, w: 3.2, h: 2.6,
          align: "right", fontFace: HAND, fontSize: 22, color: WHITE, lineSpacingMultiple: 1.1,
        });
      }
      if (slide.total) {
        s.addText(`= ${slide.total}`, {
          x: 8.4, y: 5.0, w: 3.2, h: 0.6,
          align: "right", fontFace: HAND, fontSize: 26, bold: true, color: RED,
        });
      }
      if (slide.answer) {
        s.addText(slide.answer, {
          x: 1.2, y: 6.1, w: W - 2.4, h: 0.8,
          align: "center", fontFace: HAND, fontSize: 28, bold: true, color: ORANGE,
          line: { color: ORANGE, width: 2 },
        });
      }
    } else {
      s.addText(`${slide.problem} = ______`, {
        x: 1.2, y: 6.1, w: W - 2.4, h: 0.7,
        align: "center", fontFace: HAND, fontSize: 28, color: BLUE,
      });
      s.addText("Fill in every partial product, then add them together.", {
        x: 8.2, y: 3.0, w: 4.0, h: 1.2,
        fontFace: HAND, fontSize: 20, color: WHITE,
      });
    }
  }

  await pptx.writeFile({ fileName: "Unit5-Lesson4-Area-Model-Multiplication.pptx" });
}
