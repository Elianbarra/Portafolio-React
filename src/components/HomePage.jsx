import { Routes, Route, Link } from "react-router-dom";
import Contact from "./Contact.jsx";
import Home from "./home.jsx";
import Project from "./Projects.jsx";
import AboutMe from "./AboutMe.jsx";
import "./poke.css";

export const HomePage = () => {
  return (
    <>
      <div className="Page">
        <div>
          <div id="site-border-left"></div>
          <div id="site-border-right"></div>
          <div id="site-border-top"></div>
          <div id="site-border-bottom"></div>
          <NavBarHeader />
            </div>
            </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/works" element={<Project />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}



export default HomePage;
