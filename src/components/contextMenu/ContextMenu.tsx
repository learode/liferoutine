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
      console.log('useEffect, ', position)
      var showing = setTimeout(() => {
        setShow(true);
      }, 1000);
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
      <div className="option">Edit</div>
      <div className="option">Delete</div>
    </div>
  );
};

export default Menu;
