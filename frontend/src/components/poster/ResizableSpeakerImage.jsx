import React, { useState, useRef, useEffect } from 'react';

export function ResizableSpeakerImage({ src, alt, acc, defaultSize = 100 }) {
  const [size, setSize] = useState(defaultSize);
  
  // 1. Use state instead of a standard variable to trigger re-renders
  const [showHandle, setShowHandle] = useState(false); 
  
  const isResizing = useRef(false);
  const startPos = useRef({ x: 0, size: 0 });
  
  // 2. We use a ref to track this specific component to detect outside clicks
  const containerRef = useRef(null); 

  const handlePointerDown = (e) => {
    e.stopPropagation(); 
    isResizing.current = true;
    startPos.current = { x: e.clientX, size };
    e.target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isResizing.current) return;
    const delta = e.clientX - startPos.current.x;
    setSize(Math.max(50, startPos.current.size + delta)); 
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    isResizing.current = false;
    e.target.releasePointerCapture(e.pointerId);
  };

  // 3. This hides the handle if the user clicks anywhere else on the screen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowHandle(false);
      }
    };
    // Use mousedown/touchstart to catch clicks early
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={containerRef} // Attach the ref here
      style={{ position: 'relative', width: size, height: size, margin: '0 auto' }} 
      onClick={(e) => {
        e.stopPropagation(); // Prevents clicks from triggering parent elements
        setShowHandle(true); // Tell React to show the handle and re-render
      }}
    >
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${acc}` }} 
        />
      ) : (
        <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: `${acc}28`, border: `3px solid ${acc}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.36 }}>
          👤
        </div>
      )}
      
      {/* 4. Conditionally render based on the state variable */}
      {showHandle && (
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 16,
            height: 16,
            background: '#fff',
            border: `2px solid ${acc}`,
            borderRadius: '50%',
            cursor: 'nwse-resize',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            zIndex: 10,
            touchAction: 'none'
          }}
        />
      )}
    </div>
  );
}