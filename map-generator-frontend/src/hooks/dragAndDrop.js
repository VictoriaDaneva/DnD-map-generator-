import { useEffect, useRef, useState } from "react";

export default function useDragAndDrop(
  containerRef,
  placedItems,
  setPlacedItems,
  selectedItemId,
  setSelectedItemId
) {
  const [isDraggingItem, setIsDraggingItem] = useState(false);
  const [mouseDownPosition, setMouseDownPosition] = useState(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e, itemId) => {
    e.stopPropagation();
    setSelectedItemId(itemId);
    const rect = e.currentTarget.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setMouseDownPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      const item = placedItems.find((i) => i.id === selectedItemId);
      const container = containerRef.current;
      if (!item || !container) return;

      const rect = container.getBoundingClientRect();

      if (mouseDownPosition && !isDraggingItem) {
        const dx = Math.abs(e.clientX - mouseDownPosition.x);
        const dy = Math.abs(e.clientY - mouseDownPosition.y);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 4) {
          setIsDraggingItem(true);
        }
      }

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

  return {
    handleMouseDown,
  };
}
