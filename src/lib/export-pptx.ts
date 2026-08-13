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
      x: 0.315,
      y: 0.315,
      w: W - 0.63,
      h: H - 0.63,
      fill: { color: PAPER },
      line: { color: "0B0D10", width: 1 },
    });
    return s;
  };

  for (const slide of slides as Slide[]) {
    const s = addBase();

    if (slide.kind === "cover") {
      s.addText("GRADE 5 MATHEMATICS", {
        x: 0.6, y: 0.75, w: W - 1.6, h: 0.525,
        align: "center", fontFace: HAND, fontSize: 19.5, color: BLUE,
      });
      s.addText(slide.unit, {
        x: 0.6, y: 1.35, w: W - 1.6, h: 0.9,
        align: "center", fontFace: HAND, fontSize: 45.0, bold: true, color: ORANGE,
      });
      s.addText(slide.lesson, {
        x: 0.6, y: 2.175, w: W - 1.6, h: 0.6,
        align: "center", fontFace: HAND, fontSize: 30.0, color: BLUE,
      });
      s.addText(slide.title, {
        x: 0.9, y: 2.775, w: W - 2.4, h: 0.675,
        align: "center", fontFace: HAND, fontSize: 21.0, color: WHITE,
      });
      s.addText("Prepared by", {
        x: 0.6, y: 3.9, w: W - 1.6, h: 0.375,
        align: "center", fontFace: HAND, fontSize: 15.0, color: WHITE,
      });
      s.addText("Mr. Ali Ashraf", {
        x: 0.6, y: 4.2, w: W - 1.6, h: 0.675,
        align: "center", fontFace: HAND, fontSize: 30.0, color: WHITE, italic: true,
      });
      continue;
    }

    if (slide.kind === "quiz") {
      s.addText(`Quiz · Question ${slide.n} of 10`, {
        x: 0.6, y: 0.9, w: W - 1.6, h: 0.45,
        align: "center", fontFace: HAND, fontSize: 18.0, color: BLUE,
      });
      s.addText(slide.question, {
        x: 0.6, y: 1.95, w: W - 1.6, h: 1.05,
        align: "center", fontFace: HAND, fontSize: 45.0, bold: true, color: ORANGE,
      });
      if (slide.sub) {
        s.addText(slide.sub, {
          x: 0.6, y: 3.225, w: W - 1.6, h: 0.525,
          align: "center", fontFace: HAND, fontSize: 18.0, color: WHITE,
        });
      }
      continue;
    }

    s.addText(slide.label, {
      x: 0.675, y: 0.6, w: 3.75, h: 0.375, fontFace: HAND, fontSize: 16.5, color: BLUE,
    });
    s.addText(slide.title, {
      x: 0.675, y: 0.938, w: W - 2.4, h: 0.675,
      fontFace: HAND, fontSize: 28.5, bold: true, color: ORANGE,
    });

    if (slide.kind === "concept") {
      s.addText(
        slide.lines.map((t) => ({
          text: t,
          options: { bullet: true, color: WHITE, fontFace: HAND, fontSize: 18.0, paraSpaceAfter: 16 },
        })),
        { x: 0.825, y: 1.8, w: W - 2.4, h: 2.55 },
      );
      continue;
    }

    if (slide.model) {
      s.addTable(modelRows(slide.model), {
        x: 0.675,
        y: 1.875,
        w: 1.05 * (slide.model.cols.length + 1),
        rowH: 0.465,
        fontFace: HAND,
        fontSize: 15.0,
        valign: "middle",
        border: { pt: 1, color: "BFC4CB" },
      });
    }

    if (slide.kind === "example") {
      if (slide.addends) {
        s.addText(slide.addends.map((a) => `+ ${a}`).join("\n"), {
          x: 6.3, y: 1.8, w: 2.4, h: 1.95,
          align: "right", fontFace: HAND, fontSize: 16.5, color: WHITE, lineSpacingMultiple: 1.1,
        });
      }
      if (slide.total) {
        s.addText(`= ${slide.total}`, {
          x: 6.3, y: 3.75, w: 2.4, h: 0.45,
          align: "right", fontFace: HAND, fontSize: 19.5, bold: true, color: RED,
        });
      }
      if (slide.answer) {
        s.addText(slide.answer, {
          x: 0.9, y: 4.575, w: W - 2.4, h: 0.6,
          align: "center", fontFace: HAND, fontSize: 21.0, bold: true, color: ORANGE,
          line: { color: ORANGE, width: 2 },
        });
      }
    } else {
      s.addText(`${slide.problem} = ______`, {
        x: 0.9, y: 4.575, w: W - 2.4, h: 0.525,
        align: "center", fontFace: HAND, fontSize: 21.0, color: BLUE,
      });
      s.addText("Fill in every partial product, then add them together.", {
        x: 6.15, y: 2.25, w: 3.0, h: 0.9,
        fontFace: HAND, fontSize: 15.0, color: WHITE,
      });
    }
  }

  await pptx.writeFile({ fileName: "Unit5-Lesson4-Area-Model-Multiplication.pptx" });
}
