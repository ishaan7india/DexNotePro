import React, { useRef, useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, Eraser } from "lucide-react";

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
    ctx.strokeStyle = isEraser ? "#FFFFFF" : color;
    ctx.lineWidth = isEraser ? lineWidth * 3 : lineWidth;
    ctxRef.current = ctx;
  }, [color, lineWidth, isEraser]);

  const startDrawing = (e: React.MouseEvent) => {
    if (!ctxRef.current) return;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !ctxRef.current) return;
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
  };

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);

  const getCanvasCoordinates = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const coords = getCanvasCoordinates(e);
    setCursorPos(coords);
    draw(e);
  };

  const handleMouseEnter = () => {
    setShowCursor(true);
  };

  const handleMouseLeaveCanvas = () => {
    setShowCursor(false);
    stopDrawing();
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

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4 text-center">🖊️ Whiteboard</h1>
        <div className="flex justify-center items-center gap-4 mb-4">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 p-1 rounded border"
            disabled={isEraser}
          />
          <input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
          />
          <Button 
            onClick={toggleEraser}
            variant={isEraser ? "default" : "outline"}
          >
            {isEraser ? (
              <>
                <Pencil className="mr-2 h-4 w-4" /> Pen
              </>
            ) : (
              <>
                <Eraser className="mr-2 h-4 w-4" /> Eraser
              </>
            )}
          </Button>
          <Button onClick={clearCanvas} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
        <div className="flex justify-center relative">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            className="border rounded-lg bg-white shadow-lg cursor-none"
            onMouseDown={startDrawing}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDrawing}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeaveCanvas}
          />
          {showCursor && (
            <div
              className="absolute pointer-events-none"
              style={{
                left: cursorPos.x,
                top: cursorPos.y,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className={`rounded-full border-2 ${
                  isEraser ? 'border-gray-400' : 'border-black'
                }`}
                style={{
                  width: `${isEraser ? lineWidth * 3 : lineWidth}px`,
                  height: `${isEraser ? lineWidth * 3 : lineWidth}px`,
                  backgroundColor: isEraser ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
