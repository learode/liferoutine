import React from "react";
import { MenuOptions } from "./ContextMenu.interface";

import './ContextMenu.scss';

const Menu = ({options, className, position}: MenuOptions) => {


    return (
        <div className={`context-menu ${className}`} style={{
            top: `${position.frmTop}px`,
            left: `${position.frmLeft}px`,
        }}>
            <div className="option">Edit</div>
            <div className="option">Delete</div>
        </div>
    )

}


export default Menu;
