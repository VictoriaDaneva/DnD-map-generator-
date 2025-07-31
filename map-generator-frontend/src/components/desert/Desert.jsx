import { useEffect, useState, useRef } from "react";
import "./Desert.css";
import Sidebar from "../itemsSidebar/ItemsSidebar";
export default function Desert() {
  const [isEntering, setIsEntering] = useState(true);
  const [placedItems, setPlacedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isDraggingItem, setIsDraggingItem] = useState(false);
  const [mouseDownPosition, setMouseDownPosition] = useState(null);

  const containerRef = useRef(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Black fade-in effect
  useEffect(() => {
    const timer = setTimeout(() => setIsEntering(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const allowDrop = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    const json = e.dataTransfer.getData("application/json");
    const itemIndex = e.dataTransfer.getData("itemIndex");

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (json) {
      const itemData = JSON.parse(json);
      const newItem = {
        ...itemData,
        x,
        y,
        id: Date.now(),
        size: 60,
        rotation: 0,
      };
      setPlacedItems((prev) => [...prev, newItem]);
    } else if (itemIndex) {
      setPlacedItems((prev) =>
        prev.map((item, i) => (i == itemIndex ? { ...item, x, y } : item))
      );
    }
  };

  const updateItem = (id, updates) => {
    setPlacedItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const deleteItem = (id) => {
    setPlacedItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItemId(null);
  };

  // Drag logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      const item = placedItems.find((i) => i.id === selectedItemId);
      const container = containerRef.current;
      if (!item || !container) return;

      const rect = container.getBoundingClientRect();

      // Start dragging only after slight mouse move
      if (mouseDownPosition && !isDraggingItem) {
        const dx = Math.abs(e.clientX - mouseDownPosition.x);
        const dy = Math.abs(e.clientY - mouseDownPosition.y);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 4) {
          setIsDraggingItem(true);
        }
      }

      // Handle item drag movement
      if (isDraggingItem) {
        const newX = e.clientX - rect.left - dragOffset.current.x;
        const newY = e.clientY - rect.top - dragOffset.current.y;
        setPlacedItems((prev) =>
          prev.map((p) => (p.id === item.id ? { ...p, x: newX, y: newY } : p))
        );
      }
    };

    const handleMouseUp = () => {
      setIsDraggingItem(false);
      setMouseDownPosition(null);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingItem, selectedItemId, mouseDownPosition, placedItems]);

  return (
    <>
      <div
        ref={containerRef}
        className="background-desert"
        onDrop={handleDrop}
        onDragOver={allowDrop}
        onMouseDown={(e) => {
          // If clicked outside any control or item wrapper, deselect
          if (!e.target.closest(".dropped-wrapper")) {
            setSelectedItemId(null);
          }
        }}
      >
        <Sidebar />
        {placedItems.map((item) => (
          <div
            key={item.id}
            className="dropped-wrapper"
            style={{
              left: item.x,
              top: item.y,
              width: `${item.size}px`,
              height: `${item.size}px`,
            }}
            onMouseDown={(e) => {
              e.stopPropagation();
              setSelectedItemId(item.id);
              const rect = e.currentTarget.getBoundingClientRect();
              dragOffset.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              };
              setMouseDownPosition({ x: e.clientX, y: e.clientY });
            }}
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

            {selectedItemId === item.id && (
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
        ))}
      </div>
      <div className={`page-fade-in ${isEntering ? "" : "hidden"}`}></div>
    </>
  );
}
