import NavBarHeader from "./NavBarHeader.jsx";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AboutMe from "./AboutMe.jsx";
import Contact from "./Contact.jsx";
import Home from "./home.jsx";
import Project from "./Projects.jsx";
import "./Project.css";
import "./Front-End.css";
const calculatorImage = `${import.meta.env.BASE_URL}images/Calculadora.png`;
const NinjaImage = `${import.meta.env.BASE_URL}images/Ninja.png`;
const LoginImage = `${import.meta.env.BASE_URL}images/Login.png`;
const gif = `${import.meta.env.BASE_URL}images/gifs.png`;
const colores = `${import.meta.env.BASE_URL}images/Colores.png`;
const tictactoe = `${import.meta.env.BASE_URL}images/tictactoe.jpg`;
import Pacman from "./pacman.jsx";
import Calculadora from "./Calculadora.jsx";
import Login from "./Login.jsx";
import Pokedex from "./HomePage.jsx";
import Gift from "./Gift.jsx";
import Colors from "./Colors.jsx";
import Tictactoe from "./tictactoe.jsx";

const AnimatedText = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300); 
  const toRotate = ["02 : Works"];
  const period = 1500;

  useEffect(() => {
    const handleTick = () => {
      const i = loopNum % toRotate.length;
      const fullText = toRotate[i];
      const updatedText = isDeleting
        ? fullText.substring(0, text.length - 1)
        : fullText.substring(0, text.length + 1);

      setText(updatedText);

      if (isDeleting) {
        setDelta(85);
      } else {
        setDelta(150 - Math.random() * 100);
      }

      if (!isDeleting && updatedText === fullText) {
        setIsDeleting(true);
        setDelta(period); 
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(500); 
      }
    };

    const ticker = setTimeout(handleTick, delta);
    return () => clearTimeout(ticker);
  }, [text, delta, isDeleting, loopNum]);

  return <h1 className="h2 animated-text">{text}</h1>;
};

const Projects = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showCalculadora, setShowCalculadora] = useState(false);
  const [showPacman, setShowPacman] = useState(false);
  const [showGift] = useState(false);
  const [showColors] = useState(false);
  const [showTictactoe, setShowTictactoe] = useState(false);

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
              <NavBarHeader />
              </div>
            </div>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Project />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pacman" component={Pacman} />
          <Route path="/calculadora" component={Calculadora} />
          <Route path="/login" component={Login} />
          <Route path="/pokedex" component={Pokedex} />
        </Routes>
        <div className="section-container">
          <div className="container">
            <div className="row">
              <div className="col-sm-8 col-sm-offset-2 section-container-spacer">
                <div className="text-center">

                  <AnimatedText />
                  <p>These are some of my projects that I work on.</p>
                </div>
              </div>

              <div className="col-md-12">
                <div
                  id="myCarousel"
                  className="carousel slide projects-carousel"
                >
                  <div className="carousel-inner">
                    <div className="item active">
                      <div className="row">
                        <div className="col-sm-4">
                          <Link
                            to="/pacman"
                            title=""
                            className="black-image-project-hover"
                          >
                            <img
                              src={NinjaImage}
                              alt="Work 1"
                              className="img-responsive"
                              onClick={() => setShowPacman(true)}
                            />
                          </Link>
                          <div className="card-container card-container-lg">
                            <h4>01/06</h4>
                            <h3>Pacman</h3>
                            <p>
                            The classic Pacman game where you have to eat all the points.
                            </p>
                            {showPacman && <Pacman />}
                          </div>
                        </div>
                        <div className="col-sm-4">
                        <Link
                            to="/login"
                            title=""
                            className="black-image-project-hover"
                          >
                            <img
                              src={LoginImage}
                              alt="Work 1"
                              className="img-responsive"
                              onClick={() => setShowLogin(true)}
                            />
                          </Link>

                        <div className="card-container card-container-lg">
                          <h4>02/06</h4>
                          <h3>Login</h3>
                          <p>Login to be able to implement it to some API</p>

                          {showLogin && <Login />}
                        </div>
                        </div>
                        <div className="col-sm-4">
                        <Link
                            to="/calculadora"
                            title=""
                            className="black-image-project-hover"
                          >
                            <img
                              src={calculatorImage}
                              alt="Work 1"
                              className="img-responsive"
                              onClick={() => setShowCalculadora(true)}
                            />
                          </Link>
                          <div className="card-container card-container-lg">
                            <h4>03/06</h4>
                            <h3>Calculadora</h3>
                            <p>Basic calculator with Java And CSS</p>
                            {showCalculadora && <Calculadora />}
                          </div>
                        </div>
                      </div>

                        <div className="col-sm-4">
                          
                        <Link
                            to="/gift"
                            title=""
                            className="black-image-project-hover"
                          >
                            <img
                              src={gif}
                              alt="Work 1"
                              className="img-responsive"
                              onClick={() => setShowCalculadora(true)}
                            />
                          </Link>
                          
                          
                          
          
                          <div className="card-container card-container-lg">
                            <h4>04/06</h4>
                            <h3>Gifs</h3>
                            <p>GIF search engine with API.</p>

                            {showGift && <Gift />}
                          </div>
                        </div>


                        <div className="col-sm-4">
                        <Link
                            to="/colors"
                            title=""
                            className="black-image-project-hover"
                          >
                            <img
                              src={colores}
                              alt="Work 1"
                              className="img-responsive"
                              onClick={() => setShowCalculadora(true)}
                            />
                          </Link>
                            <div className="card-container card-container-lg">
                            <h4>05/06</h4>
                            <h3>Colors</h3>
                            <p>Colors search engine with API.</p>

                            {showColors && <Colors />}
                          </div>
                        </div>






                        <div className="col-sm-4">
                          
                          <Link
                              to="/tictactoe"
                              title=""
                              className="black-image-project-hover"
                            >
                              <img
                                src={tictactoe}
                                alt="Work 1"
                                className="img-responsive"
                                onClick={() => setShowTictactoe(true)}
                              />
                            </Link>
                            
                            
                            
            
                            <div className="card-container card-container-lg">
                              <h4>06/06</h4>
                              <h3>Tic Tac Toe</h3>
                              <p>Tic Tac Toe game made with react.jsx</p>

                              {showTictactoe && <Tictactoe />}
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
          
        </div>
  );
};

export default Projects;
