import { useState } from "react";

export default function Calculator() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState<string | number>("");

  const handleCalculate = () => {
    try {
      // ⚠️ Using eval for demo (safe only for local/demo use)
      // You can replace with a math parser library later.
      // eslint-disable-next-line no-eval
      const evalResult = eval(expression);
      setResult(evalResult);
    } catch (err) {
      setResult("Error");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCalculate();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-card text-card-foreground rounded-2xl shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">🧮 Calculator</h2>

      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type an expression (e.g. 2+3*4)"
        className="w-full border border-border rounded-md px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex justify-center space-x-3">
        <button
          onClick={handleCalculate}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md transition-all"
        >
          Calculate
        </button>
        <button
          onClick={() => {
            setExpression("");
            setResult("");
          }}
          className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-black dark:text-white font-medium px-4 py-2 rounded-md transition-all"
        >
          Clear
        </button>
      </div>

      {result !== "" && (
        <div className="mt-4 text-center text-lg font-semibold">
          Result: <span className="text-blue-600">{result}</span>
        </div>
      )}
    </div>
  );
}
