import { useEffect, useRef } from 'react';

function clamp(value, min, max) {
  return Math.max(min, Math.min(value, max));
}

export default function MovableElement({
  elementId,
  position,
  onChange,
  selected,
  onSelect,
  children,
  absolute = false,
  resizable = false,
  defaultWidth,
  defaultHeight,
  minWidth = 48,
  minHeight = 48,
  wrapperStyle,
}) {
  const interactionRef = useRef(null);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const interaction = interactionRef.current;
      if (!interaction) return;

      event.preventDefault();

      const deltaX = event.clientX - interaction.startX;
      const deltaY = event.clientY - interaction.startY;

      if (interaction.mode === 'move') {
        onChange({
          x: interaction.origin.x + deltaX,
          y: interaction.origin.y + deltaY,
        });
        return;
      }

      const nextWidth = Math.max(minWidth, interaction.origin.width + deltaX);
      const nextHeight = Math.max(minHeight, interaction.origin.height + deltaY);
      onChange({
        width: Math.round(nextWidth),
        height: Math.round(nextHeight),
      });
    };

    const handlePointerUp = () => {
      interactionRef.current = null;
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [minHeight, minWidth, onChange]);

  const startDrag = (event) => {
    if (event.target.closest('[data-editor-chrome="true"]')) return;
    if (event.target.closest('input, textarea, select, button')) return;

    event.stopPropagation();
    event.preventDefault();
    onSelect?.();

    interactionRef.current = {
      mode: 'move',
      startX: event.clientX,
      startY: event.clientY,
      origin: {
        x: position?.x || 0,
        y: position?.y || 0,
      },
    };
  };

  const startResize = (event) => {
    event.stopPropagation();
    event.preventDefault();
    onSelect?.();

    interactionRef.current = {
      mode: 'resize',
      startX: event.clientX,
      startY: event.clientY,
      origin: {
        width: position?.width || defaultWidth || minWidth,
        height: position?.height || defaultHeight || minHeight,
      },
    };
  };

  const width = position?.width || defaultWidth;
  const height = position?.height || defaultHeight;

  return (
    <div
      data-element-id={elementId}
      onPointerDown={startDrag}
      onClick={(event) => {
        event.stopPropagation();
        onSelect?.();
      }}
      style={{
        position: absolute ? 'absolute' : 'relative',
        left: absolute ? position?.x || 0 : undefined,
        top: absolute ? position?.y || 0 : undefined,
        transform: absolute
          ? undefined
          : `translate(${position?.x || 0}px, ${position?.y || 0}px)`,
        width,
        height,
        cursor: 'grab',
        touchAction: 'none',
        userSelect: 'none',
        zIndex: selected ? 30 : 1,
        ...wrapperStyle,
      }}
    >
      {children}

      {selected ? (
        <div
          data-editor-chrome="true"
          style={{
            position: 'absolute',
            inset: -4,
            border: '1px dashed rgba(167, 139, 250, 0.9)',
            borderRadius: 8,
            pointerEvents: 'none',
          }}
        />
      ) : null}

      {selected && resizable ? (
        <button
          type="button"
          data-editor-chrome="true"
          onPointerDown={startResize}
          aria-label="Resize"
          style={{
            position: 'absolute',
            right: -7,
            bottom: -7,
            width: 14,
            height: 14,
            borderRadius: 999,
            border: '1px solid rgba(255,255,255,0.85)',
            background: '#6c63ff',
            boxShadow: '0 6px 16px rgba(0,0,0,0.22)',
            cursor: 'nwse-resize',
          }}
        />
      ) : null}
    </div>
  );
}
