import { Float, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import { useLayoutEffect, useMemo, useRef } from 'react';
import {
  AdditiveBlending,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  DoubleSide,
  Object3D,
  SphereGeometry,
  type InstancedMesh,
} from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { mulberry32 } from '../lib/random';
import type { ExhibitVariant } from '../data/exhibits';
import { GlowSprite } from './GlowSprite';
import { ParticleField } from './ParticleField';
import { Pulse, Spin } from './Spin';

// Shared geometry, reused by every instance of the objects below.
const UNIT_SPHERE = new SphereGeometry(1, 12, 12);

interface ObjectProps {
  color: string;
  accent: string;
}

/* ---------------------------------------------------------------- ORB */
function OrbObject({ color, accent }: ObjectProps) {
  return (
    <group>
      <Spin speed={0.25}>
        <mesh>
          <icosahedronGeometry args={[1, 2]} />
          <meshPhysicalMaterial
            color="#0f1a3a"
            emissive={color}
            emissiveIntensity={0.25}
            roughness={0.15}
            metalness={0.2}
            clearcoat={1}
            transparent
            opacity={0.75}
          />
        </mesh>
        <mesh scale={0.55}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color={accent} wireframe />
        </mesh>
      </Spin>
      <Pulse>
        <mesh scale={0.22} geometry={UNIT_SPHERE}>
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </Pulse>
      <GlowSprite color={color} scale={3.4} opacity={0.7} />
      <group rotation={[1.1, 0.3, 0]}>
        <Spin axis="z" speed={0.5}>
          <mesh>
            <torusGeometry args={[1.5, 0.01, 8, 96]} />
            <meshBasicMaterial color={accent} transparent opacity={0.8} />
          </mesh>
          <mesh position={[1.5, 0, 0]} scale={0.05} geometry={UNIT_SPHERE}>
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>
        </Spin>
      </group>
    </group>
  );
}

/* --------------------------------------------------------------- CORE */
function CoreObject({ color, accent }: ObjectProps) {
  const fins = useMemo(() => Array.from({ length: 8 }, (_, i) => (i / 8) * Math.PI * 2), []);
  return (
    <group>
      <Pulse amount={0.08} rate={2}>
        <mesh scale={0.6} geometry={UNIT_SPHERE}>
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
      </Pulse>
      <GlowSprite color={color} scale={4.4} opacity={0.85} />
      <GlowSprite color="#A58BFF" scale={6} opacity={0.18} />

      {[
        { r: 1.0, axis: 'x' as const, speed: 0.6 },
        { r: 1.25, axis: 'y' as const, speed: -0.45 },
        { r: 1.5, axis: 'z' as const, speed: 0.3 },
      ].map(({ r, axis, speed }) => (
        <Spin key={r} axis={axis} speed={speed}>
          <mesh rotation={axis === 'x' ? [0, Math.PI / 2, 0] : axis === 'y' ? [Math.PI / 2, 0, 0] : [0, 0, 0]}>
            <torusGeometry args={[r, 0.035, 12, 96]} />
            <meshStandardMaterial color="#1B2440" metalness={0.8} roughness={0.25} emissive={color} emissiveIntensity={0.25} />
          </mesh>
        </Spin>
      ))}

      <Spin speed={0.2}>
        {fins.map((a) => (
          <mesh key={a} position={[Math.cos(a) * 0.82, 0, Math.sin(a) * 0.82]} rotation={[0, -a, 0]}>
            <boxGeometry args={[0.3, 0.02, 0.05]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} />
          </mesh>
        ))}
      </Spin>
    </group>
  );
}

/* -------------------------------------------------------------- DRONE */
const ROTORS: [number, number, number][] = [
  [0.85, 0.08, 0.85],
  [-0.85, 0.08, 0.85],
  [0.85, 0.08, -0.85],
  [-0.85, 0.08, -0.85],
];

function DroneObject({ color, accent }: ObjectProps) {
  return (
    <group rotation={[0.35, 0.5, 0]}>
      <mesh scale={[1, 0.55, 1]}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshStandardMaterial color="#27324F" metalness={0.65} roughness={0.3} flatShading />
      </mesh>
      <mesh position={[0, 0.02, 0.52]} geometry={UNIT_SPHERE} scale={0.13}>
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
      <GlowSprite color={accent} scale={0.9} opacity={0.8} />

      <mesh rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[2.4, 0.06, 0.1]} />
        <meshStandardMaterial color="#34406A" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 4, 0]}>
        <boxGeometry args={[2.4, 0.06, 0.1]} />
        <meshStandardMaterial color="#34406A" metalness={0.6} roughness={0.35} />
      </mesh>

      {ROTORS.map((p, i) => (
        <group key={i} position={p}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 12]} />
            <meshStandardMaterial color="#1B2440" metalness={0.7} roughness={0.3} />
          </mesh>
          <Spin speed={i % 2 ? 30 : -30}>
            <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.3, 0.012, 6, 48]} />
              <meshBasicMaterial color={color} transparent opacity={0.7} />
            </mesh>
            <mesh position={[0, 0.09, 0]}>
              <boxGeometry args={[0.6, 0.01, 0.04]} />
              <meshBasicMaterial color={color} transparent opacity={0.9} />
            </mesh>
          </Spin>
        </group>
      ))}

      <mesh position={[0, -0.85, 0]}>
        <coneGeometry args={[0.6, 1.4, 32, 1, true]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={0.12}
          side={DoubleSide}
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------- NEURAL */
const NODE_COUNT = 56;

function NeuralObject({ color, accent }: ObjectProps) {
  const { points, lineGeo } = useMemo(() => {
    const rand = mulberry32(11);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const pts: [number, number, number][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const rad = 1.15 + (rand() - 0.5) * 0.35;
      pts.push([Math.cos(theta) * r * rad, y * rad, Math.sin(theta) * r * rad]);
    }
    const seg: number[] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i][0] - pts[j][0];
        const dy = pts[i][1] - pts[j][1];
        const dz = pts[i][2] - pts[j][2];
        if (dx * dx + dy * dy + dz * dz < 0.64) seg.push(...pts[i], ...pts[j]);
      }
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(new Float32Array(seg), 3));
    return { points: pts, lineGeo: geo };
  }, []);

  const instanced = useRef<InstancedMesh>(null);

  useLayoutEffect(() => {
    const mesh = instanced.current;
    if (!mesh) return;
    const dummy = new Object3D();
    points.forEach((p, i) => {
      dummy.position.set(p[0], p[1], p[2]);
      dummy.scale.setScalar(0.035 + (i % 5) * 0.01);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [points]);

  return (
    <group>
      <Spin speed={0.18}>
        <lineSegments geometry={lineGeo}>
          <lineBasicMaterial color={color} transparent opacity={0.45} />
        </lineSegments>
        <instancedMesh ref={instanced} args={[UNIT_SPHERE, undefined, NODE_COUNT]}>
          <meshBasicMaterial color={accent} toneMapped={false} />
        </instancedMesh>
      </Spin>
      <Pulse amount={0.1} rate={1.4}>
        <mesh scale={0.18} geometry={UNIT_SPHERE}>
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      </Pulse>
      <GlowSprite color={color} scale={3.2} opacity={0.55} />
    </group>
  );
}

/* --------------------------------------------------------------- EDEN */
function EdenObject({ color, accent }: ObjectProps) {
  const reduced = useReducedMotion();
  const stalks = useMemo(() => {
    const rand = mulberry32(5);
    return Array.from({ length: 12 }, (_, i) => ({
      angle: (i / 12) * Math.PI * 2 + rand() * 0.3,
      lean: 0.25 + rand() * 0.55,
      h: 0.7 + rand() * 0.7,
      r: 0.25 + rand() * 0.55,
      s: 0.05 + rand() * 0.05,
    }));
  }, []);

  return (
    <group position={[0, -0.1, 0]}>
      <mesh position={[0, -0.95, 0]}>
        <cylinderGeometry args={[1.35, 1.5, 0.14, 48]} />
        <meshStandardMaterial color="#0B1020" metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[1.45, 32, 32]} />
        <meshPhysicalMaterial color="#9fffe0" transparent opacity={0.07} roughness={0} depthWrite={false} />
      </mesh>

      <Spin speed={0.2}>
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.5, 48, 48]} />
          <MeshDistortMaterial
            color="#0d3b33"
            emissive={color}
            emissiveIntensity={0.8}
            distort={0.35}
            speed={reduced ? 0 : 1.6}
            roughness={0.3}
          />
        </mesh>
        {stalks.map((s, i) => (
          <group
            key={i}
            position={[Math.cos(s.angle) * s.r, -0.88, Math.sin(s.angle) * s.r]}
            rotation={[0, -s.angle, 0]}
          >
            <group rotation={[0, 0, -s.lean]}>
              <mesh position={[0, s.h / 2, 0]}>
                <cylinderGeometry args={[0.01, 0.028, s.h, 6]} />
                <meshStandardMaterial color="#10453b" emissive={color} emissiveIntensity={0.25} />
              </mesh>
              <mesh position={[0, s.h, 0]} scale={s.s} geometry={UNIT_SPHERE}>
                <meshBasicMaterial color={i % 3 === 0 ? accent : color} toneMapped={false} />
              </mesh>
            </group>
          </group>
        ))}
      </Spin>
      <GlowSprite color={color} scale={3.4} opacity={0.4} />
    </group>
  );
}

/* ------------------------------------------------------------ QUANTUM */
function QuantumObject({ color, accent }: ObjectProps) {
  const { outer, inner, links } = useMemo(() => {
    const o = new BoxGeometry(1.8, 1.8, 1.8);
    const i = new BoxGeometry(0.9, 0.9, 0.9);
    const arr: number[] = [];
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        for (const sz of [-1, 1]) {
          arr.push(sx * 0.9, sy * 0.9, sz * 0.9, sx * 0.45, sy * 0.45, sz * 0.45);
        }
      }
    }
    const l = new BufferGeometry();
    l.setAttribute('position', new BufferAttribute(new Float32Array(arr), 3));
    return { outer: o, inner: i, links: l };
  }, []);

  return (
    <group>
      <Spin speed={0.25}>
        <lineSegments>
          <edgesGeometry args={[outer]} />
          <lineBasicMaterial color={color} />
        </lineSegments>
        <lineSegments>
          <edgesGeometry args={[inner]} />
          <lineBasicMaterial color={accent} />
        </lineSegments>
        <lineSegments geometry={links}>
          <lineBasicMaterial color={color} transparent opacity={0.45} />
        </lineSegments>
      </Spin>

      <Spin axis="x" speed={-0.5}>
        <mesh scale={0.3}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={accent} wireframe />
        </mesh>
      </Spin>
      <Pulse amount={0.12} rate={2.2}>
        <mesh scale={0.1} geometry={UNIT_SPHERE}>
          <meshBasicMaterial color="#F3F7FF" toneMapped={false} />
        </mesh>
      </Pulse>
      <GlowSprite color={color} scale={3.4} opacity={0.5} />

      {[0, 1, 2].map((i) => (
        <group key={i} rotation={[i * 1.05, i * 0.7, i * 0.4]}>
          <Spin axis="z" speed={0.9 + i * 0.25}>
            <mesh position={[1.55, 0, 0]} scale={0.055} geometry={UNIT_SPHERE}>
              <meshBasicMaterial color={accent} toneMapped={false} />
            </mesh>
          </Spin>
        </group>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------ WRAPPER */
interface ExhibitSceneProps {
  variant: ExhibitVariant;
  color: string;
  accent: string;
  /** Lets the visitor drag to rotate (used in the detail modal). */
  interactive?: boolean;
}

function ExhibitObject({ variant, color, accent }: Omit<ExhibitSceneProps, 'interactive'>) {
  switch (variant) {
    case 'orb':
      return <OrbObject color={color} accent={accent} />;
    case 'core':
      return <CoreObject color={color} accent={accent} />;
    case 'drone':
      return <DroneObject color={color} accent={accent} />;
    case 'neural':
      return <NeuralObject color={color} accent={accent} />;
    case 'eden':
      return <EdenObject color={color} accent={accent} />;
    case 'quantum':
      return <QuantumObject color={color} accent={accent} />;
  }
}

export function ExhibitScene({ variant, color, accent, interactive = false }: ExhibitSceneProps) {
  const reduced = useReducedMotion();

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 4, 5]} intensity={1.6} />
      <pointLight position={[-4, -2, 3]} intensity={25} color={accent} />
      <pointLight position={[3, 2, -3]} intensity={18} color={color} />

      <Float
        speed={reduced ? 0 : 1.4}
        rotationIntensity={reduced ? 0 : 0.25}
        floatIntensity={reduced ? 0 : 0.6}
      >
        <ExhibitObject variant={variant} color={color} accent={accent} />
      </Float>

      <ParticleField count={interactive ? 260 : 120} radius={4.2} inner={1.9} size={0.02} color={color} speed={reduced ? 0 : 1} />

      {interactive && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          autoRotate={!reduced}
          autoRotateSpeed={0.8}
        />
      )}
    </>
  );
}
