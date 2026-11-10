import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { AdditiveBlending, type Points } from 'three';
import { getGlowTexture } from '../lib/glowTexture';
import { mulberry32 } from '../lib/random';

interface Props {
  count?: number;
  radius?: number;
  inner?: number;
  size?: number;
  color?: string;
  seed?: number;
  /** 0 freezes the field (used for reduced motion). */
  speed?: number;
}

/** A shell of drifting points around the origin. One draw call. */
export function ParticleField({
  count = 500,
  radius = 7,
  inner = 2.4,
  size = 0.025,
  color = '#67F7FF',
  seed = 7,
  speed = 1,
}: Props) {
  const ref = useRef<Points>(null);
  const texture = useMemo(() => getGlowTexture(), []);

  const positions = useMemo(() => {
    const rand = mulberry32(seed);
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = inner + Math.cbrt(rand()) * (radius - inner);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count, radius, inner, seed]);

  useFrame((_, delta) => {
    if (!ref.current || speed <= 0) return;
    const d = Math.min(delta, 0.05);
    ref.current.rotation.y += d * 0.02 * speed;
    ref.current.rotation.x += d * 0.006 * speed;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        map={texture}
        transparent
        opacity={0.85}
        sizeAttenuation
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
