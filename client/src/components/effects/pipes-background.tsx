import { useEffect, useRef, useState } from "react";

/**
 * Decorative animated "plumbing" background: a network of 3D-looking pipes with
 * fluid flowing through them — cyan for water, warm amber for hot water / gas —
 * and glowing couplings where the pipes connect. Rendered on a 2D canvas so it
 * works reliably everywhere. It is purely decorative (pointer-events-none),
 * renders a single static frame when the user prefers reduced motion, and falls
 * back to a soft gradient if a canvas context can't be created.
 */

type Pipe = {
  pts: [number, number][]; // normalised [0..1] polyline of right-angle bends
  kind: "water" | "hot";
  w: number; // tube width in CSS px
  speed: number; // relative flow speed
};

// Hand-laid so the pipes weave across the band and visibly interconnect.
const PIPES_A: Pipe[] = [
  {
    pts: [
      [-0.05, 0.24], [0.22, 0.24], [0.22, 0.62], [0.46, 0.62],
      [0.46, 0.32], [0.72, 0.32], [0.72, 0.74], [1.05, 0.74],
    ],
    kind: "water",
    w: 16,
    speed: 1,
  },
  {
    pts: [
      [-0.05, 0.82], [0.16, 0.82], [0.16, 0.46], [0.38, 0.46],
      [0.38, 0.86], [0.62, 0.86], [0.62, 0.5], [1.05, 0.5],
    ],
    kind: "hot",
    w: 13,
    speed: 0.85,
  },
  {
    pts: [[0.1, -0.05], [0.1, 0.12], [0.85, 0.12], [0.85, -0.05]],
    kind: "water",
    w: 11,
    speed: 1.25,
  },
  {
    pts: [[0.3, 1.05], [0.3, 0.78], [0.56, 0.78], [0.56, 1.05]],
    kind: "water",
    w: 11,
    speed: 0.95,
  },
];

// A sparser, differently-routed layout so adjacent sections don't look identical.
const PIPES_B: Pipe[] = [
  {
    pts: [
      [-0.05, 0.16], [0.3, 0.16], [0.3, 0.52], [0.6, 0.52],
      [0.6, 0.22], [1.05, 0.22],
    ],
    kind: "water",
    w: 13,
    speed: 0.9,
  },
  {
    pts: [
      [-0.05, 0.62], [0.2, 0.62], [0.2, 0.9], [0.55, 0.9],
      [0.55, 0.66], [0.82, 0.66], [0.82, 0.95], [1.05, 0.95],
    ],
    kind: "hot",
    w: 12,
    speed: 0.7,
  },
  {
    pts: [[0.46, -0.05], [0.46, 0.36], [0.94, 0.36], [0.94, -0.05]],
    kind: "water",
    w: 11,
    speed: 1.1,
  },
];

export function PipesBackground({
  className,
  variant = "a",
}: {
  className?: string;
  variant?: "a" | "b";
}) {
  const PIPES = variant === "b" ? PIPES_B : PIPES_A;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setUseFallback(true);
      return;
    }

    const reduce =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const DPR_CAP = 2;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      const cssW = canvas.clientWidth || 1;
      const cssH = canvas.clientHeight || 1;
      canvas.width = Math.max(1, Math.floor(cssW * dpr));
      canvas.height = Math.max(1, Math.floor(cssH * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const tracePath = (pipe: Pipe, sx: number, sy: number) => {
      ctx.beginPath();
      pipe.pts.forEach((p, i) => {
        const x = p[0] * sx;
        const y = p[1] * sy;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
    };

    const drawPipe = (pipe: Pipe, sx: number, sy: number, flow: number) => {
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      const w = pipe.w;

      // outer edge (gives the tube a dark rim -> 3D feel)
      tracePath(pipe, sx, sy);
      ctx.lineWidth = w + 5;
      ctx.strokeStyle = "rgba(6,59,102,0.32)";
      ctx.stroke();

      // tube body
      tracePath(pipe, sx, sy);
      ctx.lineWidth = w;
      ctx.strokeStyle = "rgba(14,116,210,0.42)";
      ctx.stroke();

      // centre sheen
      tracePath(pipe, sx, sy);
      ctx.lineWidth = Math.max(1.5, w * 0.3);
      ctx.strokeStyle = "rgba(210,240,255,0.7)";
      ctx.stroke();

      // flowing fluid
      const flowColor =
        pipe.kind === "hot" ? "rgba(255,140,55,0.75)" : "rgba(0,200,255,0.8)";
      tracePath(pipe, sx, sy);
      ctx.lineWidth = Math.max(2, w * 0.42);
      ctx.strokeStyle = flowColor;
      ctx.setLineDash([14, 28]);
      ctx.lineDashOffset = -flow * pipe.speed;
      ctx.shadowColor = flowColor;
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.shadowBlur = 0;

      // couplings / joints at the bends
      pipe.pts.forEach((p, i) => {
        if (i === 0 || i === pipe.pts.length - 1) return; // skip off-screen ends
        const x = p[0] * sx;
        const y = p[1] * sy;
        const r = w * 0.7;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(14,116,210,0.4)";
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = "rgba(6,59,102,0.5)";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(x - r * 0.25, y - r * 0.25, r * 0.32, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(225,247,255,0.75)";
        ctx.fill();
      });
    };

    const renderFrame = (flow: number) => {
      const sx = canvas.clientWidth || 1;
      const sy = canvas.clientHeight || 1;
      ctx.clearRect(0, 0, sx, sy);
      for (const pipe of PIPES) drawPipe(pipe, sx, sy, flow);
    };

    resize();

    if (reduce) {
      renderFrame(0);
      const onResize = () => {
        resize();
        renderFrame(0);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      resize();
      const elapsed = (now - start) / 1000;
      renderFrame(elapsed * 60);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  if (useFallback) {
    return (
      <div
        aria-hidden="true"
        className={className}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "radial-gradient(120% 120% at 50% 0%, rgba(10,102,194,0.08), transparent 70%)",
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );
}

export default PipesBackground;
