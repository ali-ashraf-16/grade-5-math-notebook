export interface Model {
  cols: string[];
  rows: string[];
  cells: (string | null)[][];
}

export type Slide =
  | { kind: "cover"; unit: string; lesson: string; title: string }
  | { kind: "concept"; label: string; title: string; lines: string[] }
  | {
      kind: "example";
      label: string;
      title: string;
      problem: string;
      model?: Model;
      addends?: string[];
      total?: string;
      answer?: string;
    }
  | {
      kind: "practice";
      label: string;
      title: string;
      problem: string;
      model?: Model;
      hintLines?: string[];
    }
  | { kind: "quiz"; n: number; question: string; sub?: string };

export const DECK_TITLE = "Multiplying Decimals with the Area Model";

export const slides: Slide[] = [
  {
    kind: "cover",
    unit: "UNIT 5",
    lesson: "LESSON 4",
    title: DECK_TITLE,
  },

  // --- Idea 1: what an area model is -------------------------------------
  {
    kind: "concept",
    label: "Concept",
    title: "What is an area model?",
    lines: [
      "An area model breaks each factor into its place values.",
      "Each small box holds one partial product.",
      "Add all the partial products to get the final answer.",
    ],
  },
  {
    kind: "example",
    label: "Solved Example",
    title: "Evaluate 1.4 × 7.8",
    problem: "1.4 × 7.8",
    model: {
      cols: ["7", "0.8"],
      rows: ["1", "0.4"],
      cells: [
        ["7", "0.8"],
        ["2.8", "0.32"],
      ],
    },
    addends: ["7", "2.8", "0.8", "0.32"],
    total: "10.92",
    answer: "1.4 × 7.8 = 10.92",
  },
  {
    kind: "practice",
    label: "Your Turn",
    title: "Evaluate 2.3 × 6.5",
    problem: "2.3 × 6.5",
    model: {
      cols: ["6", "0.5"],
      rows: ["2", "0.3"],
      cells: [
        [null, null],
        [null, null],
      ],
    },
  },

  // --- Idea 2: hundredths -------------------------------------------------
  {
    kind: "concept",
    label: "Concept",
    title: "Decomposing to hundredths",
    lines: [
      "A factor like 0.51 splits into 0.5 and 0.01.",
      "Multiply tenths by tenths to get hundredths.",
      "Multiply tenths by hundredths to get thousandths.",
    ],
  },
  {
    kind: "example",
    label: "Solved Example",
    title: "Evaluate 38.2 × 0.51",
    problem: "38.2 × 0.51",
    model: {
      cols: ["30", "8", "0.2"],
      rows: ["0.5", "0.01"],
      cells: [
        ["15", "4", "0.10"],
        ["0.30", "0.08", "0.002"],
      ],
    },
    addends: ["15", "4", "0.10", "0.30", "0.08", "0.002"],
    total: "19.482",
    answer: "38.2 × 0.51 = 19.482",
  },
  {
    kind: "practice",
    label: "Your Turn",
    title: "Evaluate 24.6 × 0.37",
    problem: "24.6 × 0.37",
    model: {
      cols: ["20", "4", "0.6"],
      rows: ["0.3", "0.07"],
      cells: [
        [null, null, null],
        [null, null, null],
      ],
    },
  },

  // --- Idea 3: missing parts ---------------------------------------------
  {
    kind: "concept",
    label: "Concept",
    title: "Finding a missing part",
    lines: [
      "Sometimes a box or a factor is missing.",
      "Divide a known product by the known factor.",
      "Example: ? × 60 = 180, so ? = 180 ÷ 60 = 3.",
    ],
  },
  {
    kind: "example",
    label: "Solved Example",
    title: "Complete the model, then multiply",
    problem: "43 × 65",
    model: {
      cols: ["40", "3"],
      rows: ["60", "5"],
      cells: [
        ["2,400", "180"],
        ["200", "15"],
      ],
    },
    addends: ["2,400", "180", "200", "15"],
    total: "2,795",
    answer: "43 × 65 = 2,795",
  },
  {
    kind: "practice",
    label: "Your Turn",
    title: "Complete the model, then multiply",
    problem: "5.4 × 2.8",
    model: {
      cols: ["2", "0.8"],
      rows: ["5", "0.4"],
      cells: [
        [null, null],
        [null, null],
      ],
    },
  },

  // --- Quiz ---------------------------------------------------------------
  { kind: "quiz", n: 1, question: "1.2 × 3.4 = ?", sub: "Use an area model." },
  { kind: "quiz", n: 2, question: "2.5 × 4.6 = ?", sub: "Use an area model." },
  { kind: "quiz", n: 3, question: "0.7 × 8.3 = ?", sub: "Use an area model." },
  { kind: "quiz", n: 4, question: "15.2 × 0.4 = ?", sub: "Use an area model." },
  { kind: "quiz", n: 5, question: "6.1 × 3.9 = ?", sub: "Use an area model." },
  { kind: "quiz", n: 6, question: "23.6 × 0.25 = ?", sub: "Use an area model." },
  { kind: "quiz", n: 7, question: "? × 40 = 320", sub: "Find the missing factor." },
  { kind: "quiz", n: 8, question: "0.9 × 7.2 = ?", sub: "Use an area model." },
  { kind: "quiz", n: 9, question: "34 × 52 = ?", sub: "Use an area model." },
  {
    kind: "quiz",
    n: 10,
    question: "12.4 × 1.5 = ?",
    sub: "Use an area model.",
  },
];
