const base = import.meta.env.BASE_URL;

export const projects = [
  {
    slug: "pacman",
    image: `${base}images/Ninja.png`,
    route: "/playground/pacman",
  },
  {
    slug: "tictactoe",
    image: `${base}images/tictactoe.jpg`,
    route: "/playground/tictactoe",
  },
  {
    slug: "calculator",
    image: `${base}images/Calculadora.png`,
    route: "/playground/calculator",
  },
  {
    slug: "login",
    image: `${base}images/Login.png`,
    route: "/playground/login",
  },
  {
    slug: "colors",
    image: `${base}images/Colores.png`,
    route: "/playground/colors",
  },
  {
    slug: "gifs",
    image: `${base}images/gifs.png`,
    route: "/playground/gifs",
  },
];

export default projects;
