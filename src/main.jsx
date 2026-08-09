import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import "./i18n/index.js";

import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Projects from "./pages/Projects.jsx";
import Contact from "./pages/Contact.jsx";
import Pacman from "./pages/Playground/Pacman.jsx";
import TicTacToe from "./pages/Playground/TicTacToe.jsx";
import Calculator from "./pages/Playground/Calculator.jsx";
import LoginDemo from "./pages/Playground/LoginDemo.jsx";
import Colors from "./pages/Playground/Colors.jsx";
import GifSearch from "./pages/Playground/GifSearch.jsx";
import Markets from "./pages/Playground/Markets.jsx";
import CryptoDetail from "./pages/Playground/CryptoDetail.jsx";
import StockDetail from "./pages/Playground/StockDetail.jsx";

const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "works", element: <Projects /> },
      { path: "contact", element: <Contact /> },
      { path: "playground/pacman", element: <Pacman /> },
      { path: "playground/tictactoe", element: <TicTacToe /> },
      { path: "playground/calculator", element: <Calculator /> },
      { path: "playground/login", element: <LoginDemo /> },
      { path: "playground/colors", element: <Colors /> },
      { path: "playground/gifs", element: <GifSearch /> },
      { path: "playground/markets", element: <Markets /> },
      { path: "playground/markets/crypto/:coinId", element: <CryptoDetail /> },
      { path: "playground/markets/stock/:symbol", element: <StockDetail /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
