import React from "react";
import "./Item.css";

export default function Item({
  item,
  isSelected,
  onMouseDown,
  updateItem,
  deleteItem,
}) {
  return (
    <div
      className="dropped-wrapper"
      style={{
        left: item.x,
        top: item.y,
        width: `${item.size}px`,
        height: `${item.size}px`,
      }}
      onMouseDown={(e) => onMouseDown(e, item.id)}
    >
      <img
        src={item.src}
        alt={item.name}
        className="dropped-item"
        style={{
          width: "100%",
          height: "100%",
          transform: `rotate(${item.rotation || 0}deg)`,
        }}
      />

      {isSelected && (
        <div className="controls">
          <button
            onClick={() =>
              updateItem(item.id, {
                rotation: (item.rotation - 15 + 360) % 360,
              })
            }
            title="Rotate Left"
          >
            ↺
          </button>
          <button
            onClick={() =>
              updateItem(item.id, {
                rotation: (item.rotation + 15) % 360,
              })
            }
            title="Rotate Right"
          >
            ↻
          </button>
          <button
            onClick={() =>
              updateItem(item.id, {
                size: Math.min(item.size + 10, 150),
              })
            }
            title="Increase Size"
          >
            ＋
          </button>
          <button
            onClick={() =>
              updateItem(item.id, {
                size: Math.max(item.size - 10, 30),
              })
            }
            title="Decrease Size"
          >
            －
          </button>
          <button
            className="delete-button"
            onClick={() => deleteItem(item.id)}
            title="Delete Item"
          >
            🗑️
          </button>
        </div>
      )}
    </div>
  );
}
