import React, { useState } from "react";

export default function VectorViz() {
  const [vx, setVx] = useState<number>(2);
  const [vy, setVy] = useState<number>(1);

  // fixed example matrix: [[2, 0], [0, 1]]
  const a = 2,
    b = 0,
    c = 0,
    d = 1;

  const tx = a * vx + b * vy;
  const ty = c * vx + d * vy;

  const size = 220;
  const center = size / 2;
  const scale = 18; // pixels per unit

  const toSvg = (x: number, y: number) => ({
    x: center + x * scale,
    y: center - y * scale,
  });

  const p1 = toSvg(vx, vy);
  const p2 = toSvg(tx, ty);

  return (
    <div className="mt-6 flex flex-col items-center gap-4">
      <svg width={size} height={size} className="rounded border border-ink-800/40 bg-ink-950/60">
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 L2,3 z" fill="#f59e0b" />
          </marker>
          <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 L2,3 z" fill="#60a5fa" />
          </marker>
        </defs>

        {/* axes */}
        <line x1={center} y1={0} x2={center} y2={size} stroke="#374151" strokeWidth={1} />
        <line x1={0} y1={center} x2={size} y2={center} stroke="#374151" strokeWidth={1} />

        {/* original vector */}
        <line x1={center} y1={center} x2={p1.x} y2={p1.y} stroke="#60a5fa" strokeWidth={3} markerEnd="url(#arrowBlue)" />

        {/* transformed vector */}
        <line x1={center} y1={center} x2={p2.x} y2={p2.y} stroke="#f59e0b" strokeWidth={3} markerEnd="url(#arrow)" />

        {/* labels */}
        <text x={p1.x + 6} y={p1.y - 6} fill="#60a5fa" fontSize={12}>{`[${vx}, ${vy}]`}</text>
        <text x={p2.x + 6} y={p2.y - 6} fill="#f59e0b" fontSize={12}>{`[${tx.toFixed(1)}, ${ty.toFixed(1)}]`}</text>
      </svg>

      <div className="w-full max-w-md rounded-xl border border-ink-800/60 bg-ink-900/70 p-3">
        <div className="flex items-center justify-between text-sm text-ink-300">
          <label className="flex-1 pr-4">Vector x: {vx}</label>
          <input
            type="range"
            min={-5}
            max={5}
            value={vx}
            onChange={(e) => setVx(Number(e.target.value))}
            className="w-28"
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-ink-300">
          <label className="flex-1 pr-4">Vector y: {vy}</label>
          <input
            type="range"
            min={-5}
            max={5}
            value={vy}
            onChange={(e) => setVy(Number(e.target.value))}
            className="w-28"
          />
        </div>

        <p className="mt-3 text-xs text-ink-400">Matrix used: [[2, 0], [0, 1]] — doubles x, leaves y unchanged.</p>
      </div>
    </div>
  );
}
