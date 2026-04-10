import React, { useState, useRef } from 'react';
import { useEffect } from 'react';

// ── Drag & Drop Wrapper ─────────────────────────────────────
export function DraggableItem({ children, id, onPositionChange, initialPos }) {
  const [pos, setPos] = useState(initialPos || { x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  

  useEffect(() => {
    if (initialPos) {
      setPos(initialPos);
    }
  }, [initialPos]);
  
  const onPointerDown = (e) => {
    setIsDragging(true);
    // Calculate where inside the element the user clicked
    startPos.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
    e.target.setPointerCapture(e.pointerId);
    e.stopPropagation(); // Prevents parent drags if nested
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    setPos({
      x: e.clientX - startPos.current.x,
      y: e.clientY - startPos.current.y,
    });
  };

  const onPointerUp = (e) => {
  setIsDragging(false);
  e.target.releasePointerCapture(e.pointerId);

  const finalPos = {
    x: e.clientX - startPos.current.x,
    y: e.clientY - startPos.current.y,
  };

  setPos(finalPos);
  onPositionChange?.(id, finalPos);
};
   
  
  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        cursor: isDragging ? 'grabbing' : 'grab',
        display: 'inline-block',
        touchAction: 'none', // Prevents screen scrolling on mobile while dragging
        zIndex: isDragging ? 50 : 1, // Brings the dragged item to the front
      }}
    >
      {children}
    </div>
  );
}