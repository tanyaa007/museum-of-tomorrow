import { Canvas } from '@react-three/fiber';
import { Component, useState, type ReactNode } from 'react';
import { useInView } from '../hooks/useInView';
import { useIsMobile } from '../hooks/useMediaQuery';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { isWebGLAvailable } from '../lib/webgl';

interface Props {
  children: ReactNode;
  /** Accessible description of the scene. */
  label: string;
  className?: string;
  cameraPosition?: [number, number, number];
  fov?: number;
  /** Mount immediately instead of waiting until the scene is near the viewport. */
  eager?: boolean;
}

function SceneFallback() {
  return (
    <div className="scene-fallback" aria-hidden="true">
      <span className="scene-fallback__orb" />
      <span className="scene-fallback__ring scene-fallback__ring--a" />
      <span className="scene-fallback__ring scene-fallback__ring--b" />
    </div>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn('3D scene failed to render; showing a static fallback instead.', error);
  }

  render() {
    return this.state.failed ? <SceneFallback /> : this.props.children;
  }
}

/**
 * Wraps a React Three Fiber canvas with:
 *  - lazy mounting (only once the scene is near the viewport)
 *  - pausing when offscreen or when reduced motion is requested
 *  - a graceful CSS fallback when WebGL is unavailable or the scene throws
 */
export function SceneCanvas({
  children,
  label,
  className = '',
  cameraPosition = [0, 0, 5],
  fov = 45,
  eager = false,
}: Props) {
  const [ref, inView] = useInView<HTMLDivElement>({ rootMargin: '300px' });
  const [supported] = useState(() => isWebGLAvailable());
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();

  const mounted = eager || inView;
  const running = inView && !reduced;

  return (
    <div ref={ref} className={`scene ${className}`} role="img" aria-label={label}>
      {!supported ? (
        <SceneFallback />
      ) : mounted ? (
        <SceneBoundary>
          <Canvas
            dpr={isMobile ? [1, 1.25] : [1, 1.75]}
            frameloop={running ? 'always' : 'demand'}
            camera={{ position: cameraPosition, fov }}
            gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
              gl.domElement.addEventListener('webglcontextlost', (e) => {
                e.preventDefault();
              });
            }}
          >
            {children}
          </Canvas>
        </SceneBoundary>
      ) : null}
    </div>
  );
}
