"use client";

import React from "react";
import styles from "../../css/pallete.module.css";

function Pallete({ color1, color2, color3, color4,color5 }) {
  const ColorDiv = ({ colors }) => {
    return (
      <div className={styles.colorDiv} onClick={(e) => { navigator.clipboard.writeText(colors) }}>
        <div className="color"></div>
        <div className={styles.text}>{colors}</div>
        <style jsx>{`
          .color {
            flex: 2;
            min-height: 200px;
            background-color: #${colors};
          }
        `}</style>
      </div>
    );
  };
  return (
    <div>
      <div className={styles.palleteGrid}>
        <ColorDiv colors={color1} />
        <ColorDiv colors={color2} />
        <ColorDiv colors={color3} />
        <ColorDiv colors={color4} />
        <ColorDiv colors={color5} />
      </div>
    </div>
  );
}

export default Pallete;
