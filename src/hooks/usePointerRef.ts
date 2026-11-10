import { useEffect, useRef } from 'react';

/**
 * Normalised pointer position (-1..1) kept in a ref so it never causes re-renders.
 * The listener is removed on unmount, and disabled entirely when `enabled` is false.
 */
export function usePointerRef(enabled = true) {
  const ref = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) {
      ref.current.x = 0;
      ref.current.y = 0;
      return;
    }
    const onMove = (e: PointerEvent) => {
      ref.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ref.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [enabled]);

  return ref;
}
