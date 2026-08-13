type Cell = string | null;

export interface AreaModelProps {
  /** column headers (top factor parts) */
  cols: string[];
  /** row headers (left factor parts) */
  rows: string[];
  /** grid values, rows x cols; null renders a blank "?" cell */
  cells: Cell[][];
  scale?: number;
}

/** Hand-drawn style area model grid. */
export function AreaModel({ cols, rows, cells, scale = 1 }: AreaModelProps) {
  const w = 190 * scale;
  const h = 110 * scale;

  return (
    <table
      className="border-separate"
      style={{ borderSpacing: 0, fontFamily: "var(--font-hand)" }}
    >
      <tbody>
        <tr>
          <td style={{ width: w, height: h }} />
          {cols.map((c, i) => (
            <td
              key={i}
              className="text-center align-middle text-[var(--nb-blue)]"
              style={{ width: w, height: h, fontSize: 44 * scale }}
            >
              {c}
            </td>
          ))}
        </tr>
        {rows.map((r, ri) => (
          <tr key={ri}>
            <td
              className="text-center align-middle text-[var(--nb-blue)]"
              style={{ width: w, height: h, fontSize: 44 * scale }}
            >
              {r}
            </td>
            {cols.map((_, ci) => {
              const v = cells[ri]?.[ci] ?? null;
              return (
                <td
                  key={ci}
                  className="border-2 text-center align-middle"
                  style={{
                    width: w,
                    height: h,
                    fontSize: 44 * scale,
                    borderColor: "var(--nb-grid-line)",
                    color: v === null ? "var(--nb-orange)" : "var(--nb-green)",
                  }}
                >
                  {v === null ? "?" : v}
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
}: {
  addends: string[];
  total?: string;
}) {
  return (
    <div
      className="inline-block rounded-md border-2 px-10 py-6 text-right"
      style={{
        borderColor: "var(--nb-grid-line)",
        fontFamily: "var(--font-hand)",
      }}
    >
      {addends.map((a, i) => (
        <div
          key={i}
          className="slide-body-lg text-[var(--nb-white)]"
          style={{ letterSpacing: "0.08em" }}
        >
          {i === addends.length - 1 ? "+ " : "  "}
          {a}
        </div>
      ))}
      {total && (
        <div
          className="slide-body-lg mt-2 border-t-2 pt-2 text-[var(--nb-red)]"
          style={{ borderColor: "var(--nb-grid-line)", letterSpacing: "0.08em" }}
        >
          {total}
        </div>
      )}
    </div>
  );
}
