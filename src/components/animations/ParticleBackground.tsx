'use client';

import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Particle {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  size: number;
  color: string;
}

function Particles({ mousePosition }: { mousePosition: React.MutableRefObject<THREE.Vector2> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 1500;

  const { geometry } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = ['#f97316', '#fb923c', '#fdba74', '#ffffff', '#ffedd5'];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      const color = new THREE.Color(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return { geometry: geo };
  }, []);

  const velocities = useMemo(() => {
    return Array.from({ length: particleCount }, () => ({
      x: (Math.random() - 0.5) * 0.01,
      y: (Math.random() - 0.5) * 0.01,
      z: (Math.random() - 0.5) * 0.005,
    }));
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Add wave motion
      positionAttribute.array[i3] += velocities[i].x + Math.sin(time + i * 0.01) * 0.002;
      positionAttribute.array[i3 + 1] += velocities[i].y + Math.cos(time + i * 0.01) * 0.002;
      positionAttribute.array[i3 + 2] += velocities[i].z;

      // Mouse interaction
      const dx = positionAttribute.array[i3] - mousePosition.current.x * 5;
      const dy = positionAttribute.array[i3 + 1] - mousePosition.current.y * 5;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) / 3;
        positionAttribute.array[i3] += dx * force * 0.01;
        positionAttribute.array[i3 + 1] += dy * force * 0.01;
      }

      // Wrap around
      if (positionAttribute.array[i3] > 10) positionAttribute.array[i3] = -10;
      if (positionAttribute.array[i3] < -10) positionAttribute.array[i3] = 10;
      if (positionAttribute.array[i3 + 1] > 10) positionAttribute.array[i3 + 1] = -10;
      if (positionAttribute.array[i3 + 1] < -10) positionAttribute.array[i3 + 1] = 10;
    }

    positionAttribute.needsUpdate = true;
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function FloatingShapes() {
  const groupRef = useRef<THREE.Group>(null);

  const shapes = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5 - 3,
      ] as [number, number, number],
      scale: Math.random() * 0.3 + 0.1,
      type: Math.floor(Math.random() * 3),
      speed: Math.random() * 0.5 + 0.2,
      offset: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    groupRef.current.children.forEach((child, i) => {
      const shape = shapes[i];
      child.rotation.x = time * shape.speed * 0.3;
      child.rotation.y = time * shape.speed * 0.5;
      child.position.y = shape.position[1] + Math.sin(time * shape.speed + shape.offset) * 0.5;
    });
  });

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <mesh key={i} position={shape.position} scale={shape.scale}>
          {shape.type === 0 && <icosahedronGeometry args={[1, 0]} />}
          {shape.type === 1 && <octahedronGeometry args={[1, 0]} />}
          {shape.type === 2 && <tetrahedronGeometry args={[1, 0]} />}
          <meshStandardMaterial
            color={i % 2 === 0 ? '#f97316' : '#fb923c'}
            transparent
            opacity={0.25}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ParticleBackground() {
  const mousePosition = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Particles mousePosition={mousePosition} />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}
