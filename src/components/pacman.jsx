import React, { useEffect, useState } from "react";
const NinjaImage = "/images/ninja.gif";
import "/images/sushi.png";
const fondo = "/images/Fondo1.png";
import "./Front-End.css";
import "./pacman.css";
import { Routes, Route, Link } from "react-router-dom";
import aboutMe from "./AboutMe.jsx";
import Contact from "./Contact.jsx";
import Home from "./home.jsx";
import Project from "./Projects.jsx"; 
import AboutMe from "./AboutMe.jsx";

const Pacman = () => {
  const [world, setWorld] = useState([
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
  ]);
  const worldDict = {
    0: "blank",
    1: "wall",
    2: "sushi",
    3: "onigiri",
  };
    const [scoreTotal, setScoreTotal] = useState(0);
    const [ninjaman, setNinjaman] = useState({ x: 1, y: 1 });
  useEffect(() => {
    const handleKeyDown = (e) => {
      let newX = ninjaman.x;
      let newY = ninjaman.y;

      if (e.keyCode === 37 && world[ninjaman.y][ninjaman.x - 1] !== 1) {
        newX--;
      } else if (e.keyCode === 39 && world[ninjaman.y][ninjaman.x + 1] !== 1) {
        newX++;
      } else if (e.keyCode === 40 && world[ninjaman.y + 1][ninjaman.x] !== 1) {
        newY++;
      } else if (e.keyCode === 38 && world[ninjaman.y - 1][ninjaman.x] !== 1) {
        newY--;
      }

      if (world[newY][newX] === 2) {
        setScoreTotal(scoreTotal + 1);
      } else if (world[newY][newX] === 3) {
        setScoreTotal(scoreTotal + 2);
      }

      const newWorld = world.slice();
      newWorld[newY][newX] = 0;
      setWorld(newWorld);
      setNinjaman({ x: newX, y: newY });
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [world, ninjaman, scoreTotal]);

    


  return (
    <div>
      <div className="projects">
        <div id="site-border-left"></div>
        <div id="site-border-right"></div>
        <div id="site-border-top"></div>
        <div id="site-border-bottom"></div>
        <header>
          <nav className="navbar  navbar-fixed-top navbar-default">
            <div className="container">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar-collapse"
                aria-expanded="false"
              ></button>
              <div className="collapse navbar-collapse" id="navbar-collapse">
                <ul className="nav navbar-nav ">
                  <li>
                    {" "}
                    <Link to="/">01 : Home</Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/works">02 : Works</Link>
                  </li>

                  <li>
                    {" "}
                    <Link to="/about">03 : AboutMe</Link>
                  </li>
                  <li>
                    {" "}
                    <Link to="/contact">04 : Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Project />} />
          <Route path="/aboutMe" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <div className="section-container">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <img src={fondo} className="img-responsive" alt="" />
                <div className="card-container">
                  <div className="text-center">
                    <h1 className="h2">01 : Ninja Man</h1>
                  </div>
                  <blockquote>
                    <p>
                      This project is called Ninja man, which is a reference to
                      the classic game Pacman.
                    </p>
                    <small className="pull-right">
                      Elian Barra.(coding-dojo)
                    </small>
                  </blockquote>
                  <div>
                    <div className="container">
                      <div id="world">
                        {world.map((row, rowIndex) => (
                          <div className="row" key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <div
                                className={worldDict[cell]}
                                key={cellIndex}
                              ></div>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div
                        id="ninjaman"
                        style={{ top: ninjaman.y * 40, left: ninjaman.x * 40 }}
                      ></div>
                      <div id="scoreboard">
                        <p>
                          Score: <span id="score">{scoreTotal}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pacman;
