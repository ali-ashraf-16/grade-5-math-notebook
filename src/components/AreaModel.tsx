type Cell = string | null;

export interface AreaModelProps {
  /** column headers (top factor parts) */
  cols: string[];
  /** row headers (left factor parts) */
  rows: string[];
  /** grid values, rows x cols; null renders an empty box to fill in */
  cells: Cell[][];
  /** width of a body cell in px */
  cellW?: number;
  /** height of a body cell in px */
  cellH?: number;
  /** font size of the text inside a body cell */
  fontSize?: number;
}

/**
 * Neon chalk area model: red place-value column headers, lime row headers and
 * a glowing cyan grid holding the partial products.
 */
export function AreaModel({
  cols,
  rows,
  cells,
  cellW = 380,
  cellH = 170,
  fontSize = 44,
}: AreaModelProps) {
  const headW = 150;
  const headH = Math.round(cellH * 0.55);

  return (
    <table
      className="border-separate"
      style={{ borderSpacing: 0, fontFamily: "var(--font-hand)" }}
    >
      <tbody>
        <tr>
          <td style={{ width: headW, height: headH }} />
          {cols.map((c, i) => (
            <td
              key={i}
              className="nb-glow-red text-center align-middle"
              style={{ width: cellW, height: headH, fontSize: fontSize + 14 }}
            >
              {c}
            </td>
          ))}
        </tr>
        {rows.map((r, ri) => (
          <tr key={ri}>
            <td
              className="nb-glow-green text-center align-middle"
              style={{ width: headW, height: cellH, fontSize: fontSize + 14 }}
            >
              {r}
            </td>
            {cols.map((_, ci) => {
              const v = cells[ri]?.[ci] ?? null;
              return (
                <td
                  key={ci}
                  className="nb-cell nb-glow-blue text-center align-middle"
                  style={{ width: cellW, height: cellH, fontSize }}
                >
                  {v ?? ""}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Vertical addition column used to sum the partial products. */
export function AdditionColumn({
  addends,
  total,
  fontSize = 56,
}: {
  addends: string[];
  total?: string | undefined;
  fontSize?: number;
}) {
  return (
    <div
      className="inline-block text-right"
      style={{ fontFamily: "var(--font-hand)", minWidth: 340 }}
    >
      {addends.map((a, i) => (
        <div key={i} className="nb-glow-blue" style={{ fontSize, lineHeight: 1.25 }}>
          {i === 0 ? "" : "+ "}
          {a}
        </div>
      ))}
      {total && (
        <div
          className="nb-glow-blue mt-3 pt-3"
          style={{
            fontSize: fontSize + 8,
            borderTop: "4px solid rgba(56,189,248,0.9)",
            boxShadow: "0 -6px 20px -12px rgba(56,189,248,0.9)",
          }}
        >
          {total}
        </div>
      )}
    </div>
  );
}

/** Blank answer lines with a + sign, used on practice slides. */
export function BlankAddition({ lines = 5 }: { lines?: number }) {
  return (
    <div className="flex items-center gap-8">
      <div className="nb-glow-blue" style={{ fontFamily: "var(--font-hand)", fontSize: 72 }}>
        +
      </div>
      <div className="flex flex-col gap-12" style={{ width: 320 }}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="nb-blank-line" />
        ))}
      </div>
    </div>
  );
}
