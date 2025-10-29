import React, { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Trash2, Eraser, FileDown } from "lucide-react";
import jsPDF from "jspdf";

const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(2);
  const [isEraser, setIsEraser] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [color, lineWidth]);

  const startDrawing = (e: React.MouseEvent) => {
    if (!ctxRef.current) return;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !ctxRef.current) return;
    const ctx = ctxRef.current;
    ctx.strokeStyle = isEraser ? "#ffffff" : color;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!ctxRef.current) return;
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas && ctxRef.current) {
      ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const exportToPDF = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("whiteboard.pdf");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4 text-center">🖊️ Whiteboard</h1>

        <div className="flex justify-center items-center gap-4 mb-4 flex-wrap">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 p-1 rounded border"
          />
          <input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
          />
          <Button
            variant={isEraser ? "secondary" : "default"}
            onClick={() => setIsEraser(!isEraser)}
          >
            <Eraser className="mr-2 h-4 w-4" /> {isEraser ? "Disable Eraser" : "Eraser"}
          </Button>
          <Button onClick={exportToPDF} variant="outline">
            <FileDown className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <Button onClick={clearCanvas} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>

        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="border rounded-lg bg-white shadow-lg cursor-crosshair"
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
