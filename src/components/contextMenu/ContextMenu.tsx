import React, { useEffect, useState } from "react";
import { MenuOptions } from "./ContextMenu.interface";

import "./ContextMenu.scss";

const Menu = ({ options, position, status }: MenuOptions) => {
  const [ show, setShow ] = useState<boolean>(false);

  // The position is update faster than the removal and placement of .visible making a flash be rendering
  // const [render, setRender ] = useState<boolean>(false);

  useEffect(() => {
    setShow(false)
    if (position) {
      var showing = setTimeout(() => {
        setShow(true);
      }, 100);
    }
    return () => {
      clearTimeout(showing)
    };
  }, [position])
  return (
    <div
      className={`context-menu ${show? 'visible' : ''}`}
      style={{
        top: `${position.frmTop}px`,
        left: `${position.frmLeft}px`,
      }}
    >
      <div className="option" onClick={() => console.log('behavior for option1')} >Edit</div>
      <div className="option" onClick={options?.option1.behavior}>Delete</div>
    </div>
  );
};

export default Menu;
