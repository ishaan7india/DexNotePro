import { useRef, useState, useEffect, useCallback } from "react";
import Navbar from "@/components/Navbar";

const WhiteboardPage = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingRef = useRef(false);

  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(4);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement ?? document.body;

    const styleWidth = Math.min(parent.clientWidth * 0.9, 1200);
    const styleHeight = Math.min(window.innerHeight * 0.65, 900);

    const dpr = window.devicePixelRatio || 1;
    canvas.style.width = `${styleWidth}px`;
    canvas.style.height = `${styleHeight}px`;
    canvas.width = Math.floor(styleWidth * dpr);
    canvas.height = Math.floor(styleHeight * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [color, lineWidth]);

  useEffect(() => {
    resizeCanvas();
    let rTimer: number | undefined;
    const onResize = () => {
      if (rTimer) window.clearTimeout(rTimer);
      rTimer = window.setTimeout(() => resizeCanvas(), 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rTimer) window.clearTimeout(rTimer);
    };
  }, [resizeCanvas]);

  useEffect(() => {
    const ctx = ctxRef.current;
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
    }
  }, [color, lineWidth]);

  const getPointerPos = (e: PointerEvent | MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    if (e instanceof PointerEvent || e instanceof MouseEvent) {
      return { x: (e as PointerEvent | MouseEvent).clientX - rect.left, y: (e as PointerEvent | MouseEvent).clientY - rect.top };
    } else {
      const t = (e as TouchEvent).touches[0] ?? (e as TouchEvent).changedTouches[0];
      return { x: t.clientX - rect.left, y: t.clientY - rect.top };
    }
  };

  const handlePointerDown = (ev: PointerEvent) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    drawingRef.current = true;
    canvas.setPointerCapture(ev.pointerId);
    const pos = getPointerPos(ev, canvas);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  };

  const handlePointerMove = (ev: PointerEvent) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx || !drawingRef.current) return;
    const pos = getPointerPos(ev, canvas);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  };

  const handlePointerUp = (ev: PointerEvent) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    drawingRef.current = false;
    try {
      canvas.releasePointerCapture(ev.pointerId);
    } catch {}
    ctx.closePath();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.touchAction = "none";
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const w = window.open("");
    if (w) {
      w.document.write(`<img src="${url}" alt="whiteboard" />`);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="flex flex-col items-center py-8 space-y-4">
        <h1 className="text-3xl font-bold mb-4">Whiteboard</h1>

        <div className="flex space-x-4 mb-4">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 cursor-pointer"
          />
          <input
            type="range"
            min="1"
            max="20"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
          />
          <button
            onClick={clearCanvas}
            className="px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Clear
          </button>
          <button onClick={saveImage} className="px-4 py-2 rounded border">
            Save
          </button>
        </div>

        <div className="w-full flex justify-center">
          <canvas
            ref={canvasRef}
            className="border border-border bg-white dark:bg-gray-800 rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default WhiteboardPage;
