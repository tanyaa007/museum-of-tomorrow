import { useIsMobile } from '../hooks/useMediaQuery';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { GlowSprite } from './GlowSprite';
import { ParticleField } from './ParticleField';
import { Spin } from './Spin';

/** Restrained, slowly turning artifact for the closing section. */
export function CtaScene() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <>
      <fog attach="fog" args={['#05070D', 7, 15]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[3, 4, 4]} intensity={1.2} />
      <pointLight position={[-3, -2, 3]} intensity={30} color="#A58BFF" />
      <pointLight position={[3, 2, 3]} intensity={25} color="#67F7FF" />

      <Spin speed={0.08}>
        <mesh rotation={[0.4, 0.2, 0]}>
          <torusKnotGeometry args={[1.1, 0.26, 180, 24]} />
          <meshPhysicalMaterial
            color="#0B1228"
            emissive="#7952ff"
            emissiveIntensity={0.35}
            metalness={0.5}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        <mesh rotation={[0.4, 0.2, 0]}>
          <torusKnotGeometry args={[1.1, 0.285, 180, 24]} />
          <meshBasicMaterial color="#67F7FF" wireframe transparent opacity={0.24} />
        </mesh>
      </Spin>
      <GlowSprite color="#A58BFF" scale={6.5} opacity={0.35} />
      <GlowSprite color="#67F7FF" scale={4.5} opacity={0.2} />

      <ParticleField count={isMobile ? 120 : 320} radius={6} inner={2.4} size={0.025} speed={reduced ? 0 : 1} seed={33} />
    </>
  );
}
