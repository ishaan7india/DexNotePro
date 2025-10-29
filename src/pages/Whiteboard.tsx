import React, { useRef, useState, useEffect } from "react";

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [lineWidth, setLineWidth] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.7;

    context.lineCap = "round";
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;
  }, [color, lineWidth]);

  const startDrawing = (e: React.MouseEvent) => {
    contextRef.current?.beginPath();
    contextRef.current?.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    contextRef.current?.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    contextRef.current?.stroke();
  };

  const stopDrawing = () => {
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 w-full max-w-5xl border border-gray-200 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">
          ✏️ DexNote Whiteboard
        </h1>

        {/* Toolbar */}
        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-10 h-10 border-none rounded-full cursor-pointer"
          />
          <input
            type="range"
            min="1"
            max="10"
            value={lineWidth}
            onChange={(e) => setLineWidth(Number(e.target.value))}
            className="w-32 accent-blue-500"
          />
          <button
            onClick={clearCanvas}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Clear
          </button>
        </div>

        {/* Canvas */}
        <div className="flex justify-center items-center">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={stopDrawing}
            onMouseMove={draw}
            onMouseLeave={stopDrawing}
            className="border border-gray-300 rounded-lg bg-white shadow-md cursor-crosshair"
          />
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
