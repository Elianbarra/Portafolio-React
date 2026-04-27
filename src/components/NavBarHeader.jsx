import { Link } from "react-router-dom";

const NavBarHeader = () => (
  <header>
    <nav className="navbar navbar-fixed-top navbar-default">
      <div className="container">
        <div className="collapse navbar-collapse" id="navbar-collapse">
          <ul className="nav navbar-nav ">
            <li>
              <Link to="/">01 : Home</Link>
            </li>
            <li>
              <Link to="/works">02 : Works</Link>
            </li>
            <li>
              <Link to="/about">03 : AboutMe</Link>
            </li>
            <li>
              <Link to="/contact">04 : Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default NavBarHeader;
