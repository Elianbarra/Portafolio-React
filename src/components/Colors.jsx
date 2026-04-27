import NavBarHeader from "./NavBarHeader.jsx";
import { useState } from 'react';
import "./Colors.css";
import { Link } from "react-router-dom";
import Values from 'values.js'
import FormColor from './FormColor';
import DisplayColors from './DisplayColors';
function Colors(){
    const [list, setList] = useState(new Values('red').all(5));
    console.log(list);

    return(
<div className="pokedexx">
        <div>
          <div id="site-border-left"></div>
          <div id="site-border-right"></div>
          <div id="site-border-top"></div>
          <div id="site-border-bottom"></div>
          <NavBarHeader />
        {/* DE ACA PARA ABAJO ES EL CODE GIFT */}

        <div className="bodycolor">
        <div className="color">
                <FormColor setList={setList}/>
                <DisplayColors list={list}/>
            </div>
            </div>
            </div>
            </div>
    )
}
export default Colors;