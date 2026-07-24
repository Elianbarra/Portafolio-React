const base = import.meta.env.BASE_URL;

export const projects = [
  {
    slug: "pacman",
    title: "Ninja Man",
    subtitle: "Pacman clone",
    description:
      "A Pacman-style maze game built from a raw 2D grid, with keyboard-driven movement, collision detection and live scoring.",
    tags: ["React", "useState", "Keyboard events"],
    image: `${base}images/Ninja.png`,
    route: "/playground/pacman",
  },
  {
    slug: "tictactoe",
    title: "Tic Tac Toe",
    subtitle: "Two-player game",
    description:
      "Classic Tic Tac Toe with win/draw detection across all combinations and a confetti celebration on victory.",
    tags: ["React", "Game logic", "canvas-confetti"],
    image: `${base}images/tictactoe.jpg`,
    route: "/playground/tictactoe",
  },
  {
    slug: "calculator",
    title: "Calculator",
    subtitle: "Arithmetic UI",
    description:
      "A functioning calculator supporting the four basic operations and parentheses, with a light/dark toggle.",
    tags: ["JavaScript", "UI state"],
    image: `${base}images/Calculadora.png`,
    route: "/playground/calculator",
  },
  {
    slug: "login",
    title: "Auth Demo",
    subtitle: "Login & sign up",
    description:
      "A login/sign-up flow with client-side validation and persistence via localStorage — a sandbox for auth UX patterns.",
    tags: ["React", "Forms", "localStorage"],
    image: `${base}images/Login.png`,
    route: "/playground/login",
  },
  {
    slug: "colors",
    title: "Color Palette Generator",
    subtitle: "Shade generator",
    description:
      "Generates a 5-step shade palette from any base color, with one-click copy to clipboard for each hex value.",
    tags: ["React", "values.js", "Clipboard API"],
    image: `${base}images/Colores.png`,
    route: "/playground/colors",
  },
  {
    slug: "gifs",
    title: "GIF Search",
    subtitle: "Giphy API",
    description:
      "Searches the Giphy API by keyword and renders the results in a responsive grid.",
    tags: ["React", "REST API", "Giphy"],
    image: `${base}images/gifs.png`,
    route: "/playground/gifs",
  },
];

export default projects;
