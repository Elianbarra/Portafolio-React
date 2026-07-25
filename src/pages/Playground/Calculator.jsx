import { useState } from "react";
import { useTranslation } from "react-i18next";
import PlaygroundShell from "../../components/PlaygroundShell.jsx";
import evaluateExpression from "../../utils/evaluateExpression.js";

const BUTTONS = [
  ["C", "(", ")", "⌫"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
];

const isOperator = (label) => ["/", "*", "-", "+"].includes(label);

const Calculator = () => {
  const { t } = useTranslation();
  const [display, setDisplay] = useState("");

  const handlePress = (label) => {
    if (label === "C") {
      setDisplay("");
    } else if (label === "⌫") {
      setDisplay((prev) => prev.slice(0, -1));
    } else if (label === "=") {
      try {
        setDisplay(String(evaluateExpression(display)));
      } catch {
        setDisplay(t("playground.calculator.error"));
        setTimeout(() => setDisplay(""), 1500);
      }
    } else {
      setDisplay((prev) => prev + label);
    }
  };

  return (
    <PlaygroundShell title={t("playground.calculator.title")} description={t("playground.calculator.description")}>
      <div className="mx-auto w-full max-w-xs">
        <div className="card mb-4 flex h-16 items-center justify-end overflow-x-auto px-4 font-mono text-2xl text-white">
          {display || "0"}
        </div>
        <div className="grid grid-cols-4 gap-2">
          {BUTTONS.flat().map((label, index) => (
            <button
              key={`${label}-${index}`}
              onClick={() => handlePress(label)}
              className={`rounded-xl border py-4 font-mono text-lg transition ${
                label === "="
                  ? "border-accent/50 bg-accent/20 text-accent hover:bg-accent/30"
                  : isOperator(label)
                    ? "border-white/10 bg-white/5 text-accent hover:border-accent/40"
                    : "border-white/10 bg-white/5 text-slate-100 hover:border-white/20"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </PlaygroundShell>
  );
};

export default Calculator;
