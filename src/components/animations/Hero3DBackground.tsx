'use client';

import { useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.PlaneGeometry>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color('#f97316') },
    uColor2: { value: new THREE.Color('#fb923c') },
    uColor3: { value: new THREE.Color('#fed7aa') },
  }), []);

  useFrame((state) => {
    if (geometryRef.current) {
      const positions = geometryRef.current.attributes.position;
      const time = state.clock.elapsedTime * 0.3;

      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = Math.sin(x * 2 + time) * 0.3 + Math.cos(y * 1.5 + time) * 0.2;
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 4, 0, 0]} position={[0, -2, -5]} scale={1.5}>
      <planeGeometry ref={geometryRef} args={[20, 20, 64, 64]} />
      <meshBasicMaterial
        color="#f97316"
        wireframe
        transparent
        opacity={0.15}
      />
    </mesh>
  );
}

function FloatingGeometry({ position, rotation, scale }: { position: [number, number, number]; rotation?: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.002;
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <mesh>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#f97316"
          transparent
          opacity={0.4}
          wireframe
        />
      </mesh>
    </group>
  );
}

function SphereField() {
  const pointsRef = useRef<THREE.Points>(null);

  const { geometry } = useMemo(() => {
    const count = 500;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 8 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const color = new THREE.Color();
      color.setHSL(0.08 + Math.random() * 0.05, 0.9, 0.6);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    return { geometry: geo };
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GradientSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        uniform float uTime;

        void main() {
          vec3 color1 = vec3(0.976, 0.451, 0.086); // #f97316
          vec3 color2 = vec3(0.984, 0.573, 0.235); // #fb923c
          vec3 color3 = vec3(1.0, 0.867, 0.667); // #fed7aa

          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          float pattern = sin(vPosition.x * 3.0 + uTime) * cos(vPosition.y * 3.0 + uTime) * 0.5 + 0.5;

          vec3 finalColor = mix(color1, color2, pattern);
          finalColor = mix(finalColor, color3, fresnel * 0.5);

          float alpha = 0.15 + fresnel * 0.2;

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame((state) => {
    if (shaderMaterial) {
      shaderMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -8]} scale={6} material={shaderMaterial}>
      <sphereGeometry args={[1, 64, 64]} />
    </mesh>
  );
}

export default function Hero3DBackground() {
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
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#f97316" />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#fb923c" />

        <SphereField />
        <GradientSphere />
        <WaveMesh />

        {/* Floating geometric shapes */}
        <FloatingGeometry position={[-5, 2, -3]} scale={0.4} />
        <FloatingGeometry position={[5, -1, -4]} scale={0.3} />
        <FloatingGeometry position={[-3, -2, -5]} scale={0.25} />
        <FloatingGeometry position={[4, 3, -6]} scale={0.35} />
      </Canvas>
    </div>
  );
}
