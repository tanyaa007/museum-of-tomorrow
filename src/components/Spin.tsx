import { useFrame } from '@react-three/fiber';
import { useRef, type ReactNode } from 'react';
import type { Group } from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SpinProps {
  speed?: number;
  axis?: 'x' | 'y' | 'z';
  children: ReactNode;
}

/** Rotates its children at a constant rate. Frozen under reduced motion. */
export function Spin({ speed = 0.3, axis = 'y', children }: SpinProps) {
  const ref = useRef<Group>(null);
  const reduced = useReducedMotion();

  useFrame((_, delta) => {
    if (reduced || !ref.current) return;
    ref.current.rotation[axis] += Math.min(delta, 0.05) * speed;
  });

  return <group ref={ref}>{children}</group>;
}

interface PulseProps {
  amount?: number;
  rate?: number;
  children: ReactNode;
}

/** Gently breathes the scale of its children. Frozen under reduced motion. */
export function Pulse({ amount = 0.06, rate = 1.6, children }: PulseProps) {
  const ref = useRef<Group>(null);
  const reduced = useReducedMotion();

  useFrame((state) => {
    if (reduced || !ref.current) return;
    ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * rate) * amount);
  });

  return <group ref={ref}>{children}</group>;
}
