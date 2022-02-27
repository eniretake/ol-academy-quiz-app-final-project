import React, { useEffect } from "react";
import "./ContextMenu.scss";

const ContextMenu = (props) => {
  const handleDelete = () => {
    props.removeItem(props.id);
    props.showCallback(false);
  };

  useEffect(() => {
    const hideContextMenu = (e) => {
      if (!props.attemptItemRef.current?.contains(e.target) && props.show) {
        props.showCallback(false);
      }
    };
    window.addEventListener("click", hideContextMenu);
    return () => {
      window.removeEventListener("click", hideContextMenu);
    };
  });

  return (
    <div
      className="menu"
      style={{ top: props.locationStyles.y, left: props.locationStyles.x }}
    >
      <div className="delete-button" onClick={() => handleDelete()}>
        <span>&#x2717;</span>
        <span className="delete-text">delete</span>
      </div>
    </div>
  );
};

export default ContextMenu;
