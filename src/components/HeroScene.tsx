import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import { MathUtils, type Group } from 'three';
import { useIsMobile } from '../hooks/useMediaQuery';
import { usePointerRef } from '../hooks/usePointerRef';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { GlowSprite } from './GlowSprite';
import { ParticleField } from './ParticleField';
import { Pulse, Spin } from './Spin';

const RINGS = [
  { r: 1.95, tilt: [1.2, 0.2, 0] as [number, number, number], speed: 0.22, color: '#67F7FF' },
  { r: 2.4, tilt: [0.55, 0, 0.65] as [number, number, number], speed: -0.16, color: '#A58BFF' },
  { r: 2.85, tilt: [1.42, 0.38, -0.28] as [number, number, number], speed: 0.11, color: '#526BFF' },
];

function Artifact({ reduced }: { reduced: boolean }) {
  const tilt = useRef<Group>(null);
  const bob = useRef<Group>(null);
  const pointer = usePointerRef(!reduced);
  const width = useThree((s) => s.size.width);
  const scale = MathUtils.clamp(width / 1280, 0.55, 1);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05);
    if (tilt.current) {
      tilt.current.rotation.y = MathUtils.damp(tilt.current.rotation.y, pointer.current.x * 0.35, 3, d);
      tilt.current.rotation.x = MathUtils.damp(tilt.current.rotation.x, -pointer.current.y * 0.2, 3, d);
    }
    if (bob.current && !reduced) {
      bob.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.1;
    }
  });

  return (
    <group scale={scale} position={[0, 0.35 * scale, 0]}>
      <group ref={tilt}>
        <group ref={bob}>
          {/* Main crystalline icosahedron shell */}
          <Spin speed={0.1}>
            <mesh>
              <icosahedronGeometry args={[1.15, 1]} />
              <meshPhysicalMaterial
                color="#091124"
                emissive="#3b52d4"
                emissiveIntensity={0.32}
                metalness={0.25}
                roughness={0.12}
                clearcoat={1}
                clearcoatRoughness={0.1}
                flatShading
                transparent
                opacity={0.78}
              />
            </mesh>
            <mesh>
              <icosahedronGeometry args={[1.17, 1]} />
              <meshBasicMaterial color="#67F7FF" wireframe transparent opacity={0.32} />
            </mesh>
          </Spin>

          {/* Inner counter-rotating faceted crystal core */}
          <Spin speed={-0.18}>
            <mesh scale={0.65}>
              <octahedronGeometry args={[1, 0]} />
              <meshStandardMaterial
                color="#121832"
                emissive="#A58BFF"
                emissiveIntensity={0.6}
                metalness={0.8}
                roughness={0.18}
                flatShading
              />
            </mesh>
            <mesh scale={0.66}>
              <octahedronGeometry args={[1, 0]} />
              <meshBasicMaterial color="#A58BFF" wireframe transparent opacity={0.5} />
            </mesh>
          </Spin>

          {/* Innermost pulsing chromatic core */}
          <Pulse amount={0.12} rate={2}>
            <mesh scale={0.28}>
              <sphereGeometry args={[1, 32, 32]} />
              <meshBasicMaterial color="#E0FFFF" toneMapped={false} />
            </mesh>
            <pointLight color="#67F7FF" intensity={15} distance={4.5} />
          </Pulse>

          {/* Ambient glow halos */}
          <GlowSprite color="#67F7FF" scale={5.8} opacity={0.52} />
          <GlowSprite color="#A58BFF" scale={8.8} opacity={0.26} />

          {/* Orbital rings with dual orbital tracking beacons */}
          {RINGS.map((ring) => (
            <group key={ring.r} rotation={ring.tilt}>
              <Spin axis="z" speed={ring.speed}>
                {/* Primary orbital track */}
                <mesh>
                  <torusGeometry args={[ring.r, 0.008, 10, 160]} />
                  <meshBasicMaterial color={ring.color} transparent opacity={0.72} />
                </mesh>
                {/* Secondary fine guide track */}
                <mesh>
                  <torusGeometry args={[ring.r * 1.02, 0.003, 6, 100]} />
                  <meshBasicMaterial color={ring.color} transparent opacity={0.28} />
                </mesh>
                {/* Primary beacon node */}
                <mesh position={[ring.r, 0, 0]}>
                  <sphereGeometry args={[0.055, 16, 16]} />
                  <meshBasicMaterial color={ring.color} toneMapped={false} />
                </mesh>
                {/* Secondary trailing beacon node */}
                <mesh position={[-ring.r * 0.707, ring.r * 0.707, 0]}>
                  <sphereGeometry args={[0.038, 12, 12]} />
                  <meshBasicMaterial color={ring.color} toneMapped={false} />
                </mesh>
              </Spin>
            </group>
          ))}

          {/* Equatorial astrolabe ring */}
          <group rotation={[Math.PI / 2.3, 0.2, 0]}>
            <Spin axis="z" speed={0.06}>
              <mesh>
                <torusGeometry args={[3.2, 0.005, 8, 180]} />
                <meshBasicMaterial color="#67F7FF" transparent opacity={0.35} />
              </mesh>
            </Spin>
          </group>
        </group>
      </group>
    </group>
  );
}

export function HeroScene() {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <>
      <fog attach="fog" args={['#05070D', 8.5, 19]} />
      <ambientLight intensity={0.38} />
      <directionalLight position={[5, 6, 4]} intensity={1.7} color="#E6EFFF" />
      <pointLight position={[-4, -1.5, 3]} intensity={38} color="#A58BFF" />
      <pointLight position={[3.5, 1.5, 4]} intensity={38} color="#67F7FF" />
      <pointLight position={[0, 3, -4]} intensity={20} color="#526BFF" />

      <Artifact reduced={reduced} />

      {/* Primary cosmic dust */}
      <ParticleField
        count={isMobile ? 260 : 650}
        radius={9.5}
        inner={2.7}
        size={0.032}
        speed={reduced ? 0 : 1}
      />
      {/* Radiant violet stardust */}
      <ParticleField
        count={isMobile ? 65 : 170}
        radius={6.8}
        inner={2.1}
        size={0.048}
        color="#A58BFF"
        seed={21}
        speed={reduced ? 0 : 1.5}
      />
      {/* Brilliant close glints */}
      <ParticleField
        count={isMobile ? 20 : 50}
        radius={4.5}
        inner={1.6}
        size={0.04}
        color="#DDFEFF"
        seed={42}
        speed={reduced ? 0 : 0.8}
      />
    </>
  );
}
