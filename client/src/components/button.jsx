// rfc format using esv7 extension

import React from "react";
import "../styles/ButtonStyles.css" 


export default function Button({modifier, onClick}) {
    return <button className={`Button Button--${modifier}`} onClick={onClick}>Login</button>;
}
