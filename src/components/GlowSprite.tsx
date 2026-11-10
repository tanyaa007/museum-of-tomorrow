import { AdditiveBlending } from 'three';
import { getGlowTexture } from '../lib/glowTexture';

interface Props {
  color: string;
  scale?: number;
  opacity?: number;
}

/** A soft additive halo that fakes volumetric light around emissive objects. */
export function GlowSprite({ color, scale = 3, opacity = 0.8 }: Props) {
  return (
    <sprite scale={[scale, scale, 1]}>
      <spriteMaterial
        map={getGlowTexture()}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={AdditiveBlending}
        toneMapped={false}
      />
    </sprite>
  );
}
