import { useEffect, useState } from "react";
import PlaygroundShell from "../../components/PlaygroundShell.jsx";

const INITIAL_WORLD = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 2, 2, 1, 3, 2, 2, 2, 1],
  [1, 2, 1, 2, 1, 3, 1, 2, 1, 1],
  [1, 2, 1, 2, 3, 3, 1, 2, 1, 1],
  [1, 3, 1, 3, 1, 1, 0, 2, 2, 1],
  [1, 3, 1, 2, 0, 0, 2, 1, 2, 1],
  [1, 2, 1, 1, 2, 1, 2, 1, 0, 1],
  [1, 2, 3, 3, 2, 1, 2, 2, 2, 1],
  [1, 2, 1, 2, 0, 0, 2, 1, 2, 1],
  [1, 2, 2, 2, 1, 1, 2, 2, 2, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const TILE_BACKGROUND = {
  0: "bg-transparent",
  1: "bg-ink-700",
  2: "bg-transparent",
  3: "bg-transparent",
};

const TILE_ICON = {
  0: "",
  1: "",
  2: "🍣",
  3: "🍙",
};

const Pacman = () => {
  const [world, setWorld] = useState(INITIAL_WORLD);
  const [score, setScore] = useState(0);
  const [player, setPlayer] = useState({ x: 1, y: 1 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      let { x, y } = player;

      if (event.key === "ArrowLeft" && world[y][x - 1] !== 1) x -= 1;
      else if (event.key === "ArrowRight" && world[y][x + 1] !== 1) x += 1;
      else if (event.key === "ArrowDown" && world[y + 1][x] !== 1) y += 1;
      else if (event.key === "ArrowUp" && world[y - 1][x] !== 1) y -= 1;
      else return;

      if (world[y][x] === 2) setScore((prev) => prev + 1);
      else if (world[y][x] === 3) setScore((prev) => prev + 2);

      const newWorld = world.map((row) => row.slice());
      newWorld[y][x] = 0;
      setWorld(newWorld);
      setPlayer({ x, y });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [world, player]);

  const resetGame = () => {
    setWorld(INITIAL_WORLD.map((row) => row.slice()));
    setScore(0);
    setPlayer({ x: 1, y: 1 });
  };

  return (
    <PlaygroundShell
      title="Ninja Man"
      description="A Pacman-style maze game. Use the arrow keys to move and collect all the sushi and onigiri."
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-6 font-mono text-sm text-slate-300">
          <span>
            Score: <span className="text-accent">{score}</span>
          </span>
          <button onClick={resetGame} className="btn-secondary px-4 py-1.5 text-xs">
            Reset
          </button>
        </div>

        <div
          className="grid gap-0.5 rounded-xl border border-white/10 bg-ink-900 p-2"
          style={{ gridTemplateColumns: `repeat(${world[0].length}, minmax(0, 1fr))` }}
        >
          {world.map((row, rowIndex) =>
            row.map((cell, cellIndex) => {
              const isPlayer = player.x === cellIndex && player.y === rowIndex;
              return (
                <div
                  key={`${rowIndex}-${cellIndex}`}
                  className={`relative flex h-8 w-8 items-center justify-center text-sm ${TILE_BACKGROUND[cell]}`}
                >
                  {isPlayer ? "🥷" : TILE_ICON[cell]}
                </div>
              );
            })
          )}
        </div>
      </div>
    </PlaygroundShell>
  );
};

export default Pacman;
