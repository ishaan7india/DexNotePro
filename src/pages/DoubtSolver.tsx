import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Download, PenTool } from "lucide-react";

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);

  // 🖌️ Setup the canvas when component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const tempImage = ctxRef.current?.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = width;
      canvas.height = height;
      if (tempImage && ctxRef.current) ctxRef.current.putImageData(tempImage, 0, 0);
    };

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.lineCap = "round";
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = lineWidth;
      ctxRef.current = ctx;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // ✏️ Start drawing
  const startDrawing = (e: React.MouseEvent) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current?.beginPath();
    ctxRef.current?.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  // 🧭 Draw as mouse moves
  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctxRef.current?.lineTo(offsetX, offsetY);
    ctxRef.current?.stroke();
  };

  // 🛑 Stop drawing
  const stopDrawing = () => {
    ctxRef.current?.closePath();
    setIsDrawing(false);
  };

  // 🗑️ Clear the whiteboard
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  // 💾 Download as image
  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  // 🎨 Update color or line width dynamically
  useEffect(() => {
    if (ctxRef.current) {
      ctxRef.current.strokeStyle = strokeColor;
      ctxRef.current.lineWidth = lineWidth;
    }
  }, [strokeColor, lineWidth]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-1 px-4 py-6 space-y-4">
        <h1 className="text-3xl font-bold mb-4">🖍️ Interactive Whiteboard</h1>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <PenTool className="w-4 h-4" />
            <Input
              type="color"
              value={strokeColor}
              onChange={(e) => setStrokeColor(e.target.value)}
              className="w-10 h-10 p-1"
            />
          </div>

          <Input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-32"
          />

          <Button variant="destructive" onClick={clearCanvas}>
            <Trash2 className="w-4 h-4 mr-2" /> Clear
          </Button>

          <Button onClick={downloadCanvas}>
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
        </div>

        <div className="w-full max-w-5xl border rounded-xl overflow-hidden shadow-md">
          <canvas
            ref={canvasRef}
            className="w-full h-[70vh] bg-white cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
