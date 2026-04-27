
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import NavBarHeader from "./NavBarHeader.jsx";
import AboutMe from "./AboutMe.jsx";
import Home from "./home.jsx";
import Project from "./Projects.jsx";
import "./Contact.css";

// Formulario de contacto reutilizable
const initialState = {
  nombre: "",
  apellido: "",
  correo: "",
  numero: "",
  requerimientos: "",
  errors: {},
};

function validate(values) {
  const errors = {};
  if (!values.nombre) errors.nombre = "El nombre es requerido";
  if (!values.apellido) errors.apellido = "El apellido es requerido";
  if (!values.correo) {
    errors.correo = "El correo es requerido";
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.correo)) {
    errors.correo = "Correo inválido";
  }
  if (!values.numero) {
    errors.numero = "El número es requerido";
  } else if (!/^\d{7,15}$/.test(values.numero.replace(/\D/g, ""))) {
    errors.numero = "Número inválido";
  }
  if (!values.requerimientos) errors.requerimientos = "Este campo es requerido";
  return errors;
}

const ContactForm = () => {
  const [values, setValues] = React.useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(values);
    if (Object.keys(errors).length === 0) {
      alert("¡Formulario enviado! (demo)");
      setValues(initialState);
    } else {
      setValues((prev) => ({ ...prev, errors }));
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
      <label>
        Nombre:
        <input
          type="text"
          name="nombre"
          value={values.nombre}
          onChange={handleChange}
          required
        />
        {values.errors.nombre && <span className="error">{values.errors.nombre}</span>}
      </label>
      <label>
        Apellido:
        <input
          type="text"
          name="apellido"
          value={values.apellido}
          onChange={handleChange}
          required
        />
        {values.errors.apellido && <span className="error">{values.errors.apellido}</span>}
      </label>
      <label>
        Correo:
        <input
          type="email"
          name="correo"
          value={values.correo}
          onChange={handleChange}
          required
        />
        {values.errors.correo && <span className="error">{values.errors.correo}</span>}
      </label>
      <label>
        Número:
        <input
          type="tel"
          name="numero"
          value={values.numero}
          onChange={handleChange}
          required
        />
        {values.errors.numero && <span className="error">{values.errors.numero}</span>}
      </label>
      <label>
        Requerimientos:
        <textarea
          name="requerimientos"
          value={values.requerimientos}
          onChange={handleChange}
          required
        />
        {values.errors.requerimientos && <span className="error">{values.errors.requerimientos}</span>}
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export const Contact = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300); // Velocidad inicial
  const toRotate = ["04 : CONTACT ME"];
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
        setDelta(period); // Pausa antes de borrar
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setDelta(500); // Pausa antes de escribir
      }
    };

    const ticker = setTimeout(handleTick, delta);
    return () => clearTimeout(ticker);
  }, [text, delta, isDeleting, loopNum]);

  return (
    <h1 className="h2 animated-text">{text}</h1>
  );
};

const Contacts = () => {
  return (
    <div>
      <div className="contact">
        <div id="site-border-left"></div>
        <div id="site-border-right"></div>
        <div id="site-border-top"></div>
        <div id="site-border-bottom"></div>
        <NavBarHeader />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Project />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        <div className="section-container">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="section-container-spacer text-center">
                  <Contact />
                </div>

                <div className="contact-container" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <ul className="list-unstyled">
                    <li className="icon-text">
                      <span className="fa-icon">
                        <i className="fa fa-at" aria-hidden="true"></i>
                      </span>
                      <b>elianbarra@gmail.com</b>
                    </li>
                  </ul>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
