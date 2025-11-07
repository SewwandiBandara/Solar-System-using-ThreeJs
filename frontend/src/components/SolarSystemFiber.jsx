import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, Trail } from "@react-three/drei";
import * as THREE from "three";

const Planet = ({ size, distance, texture, orbitSpeed, rotationSpeed, color }) => {
  const pivot = useRef();
  const planet = useRef();
  const tex = useMemo(() => new THREE.TextureLoader().load(texture), [texture]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pivot.current) pivot.current.rotation.y = t * orbitSpeed;
    if (planet.current) planet.current.rotation.y += rotationSpeed;
  });

  return (
    <group ref={pivot}>
      <Trail
        width={2}
        length={8}
        color={color}
        attenuation={(t) => t * t}
      >
        <mesh ref={planet} position={[distance, 0, 0]}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            map={tex}
            emissive={color}
            emissiveIntensity={0.3}
          />
          {/* Atmospheric glow */}
          <mesh scale={1.1}>
            <sphereGeometry args={[size, 32, 32]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.15}
              side={THREE.BackSide}
            />
          </mesh>
        </mesh>
      </Trail>
      {/* Colorful orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.05, distance + 0.05, 64]} />
        <meshBasicMaterial
          color={color}
          side={THREE.DoubleSide}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  );
};

const SolarSystemScene = () => {
  const sunTexture = "https://threejsfundamentals.org/threejs/resources/images/sun.jpg";
  const planetData = [
    {
      name: "Mercury",
      size: 0.8,
      distance: 14,
      texture: "https://threejsfundamentals.org/threejs/resources/images/mercury.jpg",
      orbitSpeed: 0.9,
      rotationSpeed: 0.01,
      color: "#ff6b35",
    },
    {
      name: "Venus",
      size: 1.5,
      distance: 18,
      texture: "https://threejsfundamentals.org/threejs/resources/images/venus.jpg",
      orbitSpeed: 0.7,
      rotationSpeed: 0.008,
      color: "#f7b801",
    },
    {
      name: "Earth",
      size: 1.7,
      distance: 24,
      texture: "https://threejsfundamentals.org/threejs/resources/images/earth.jpg",
      orbitSpeed: 0.6,
      rotationSpeed: 0.02,
      color: "#00b4d8",
    },
    {
      name: "Mars",
      size: 1.2,
      distance: 30,
      texture: "https://threejsfundamentals.org/threejs/resources/images/mars.jpg",
      orbitSpeed: 0.5,
      rotationSpeed: 0.018,
      color: "#ff4d6d",
    },
    {
      name: "Jupiter",
      size: 4.0,
      distance: 40,
      texture: "https://threejsfundamentals.org/threejs/resources/images/jupiter.jpg",
      orbitSpeed: 0.3,
      rotationSpeed: 0.04,
      color: "#ffb627",
    },
    {
      name: "Saturn",
      size: 3.3,
      distance: 52,
      texture: "https://threejsfundamentals.org/threejs/resources/images/saturn.jpg",
      orbitSpeed: 0.25,
      rotationSpeed: 0.03,
      color: "#ffd93d",
    },
    {
      name: "Uranus",
      size: 2.5,
      distance: 64,
      texture: "https://threejsfundamentals.org/threejs/resources/images/uranus.jpg",
      orbitSpeed: 0.2,
      rotationSpeed: 0.025,
      color: "#6bcfff",
    },
    {
      name: "Neptune",
      size: 2.4,
      distance: 74,
      texture: "https://threejsfundamentals.org/threejs/resources/images/neptune.jpg",
      orbitSpeed: 0.15,
      rotationSpeed: 0.02,
      color: "#4361ee",
    },
  ];

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.3} color="#ffffff" />
      <pointLight position={[0, 0, 0]} intensity={3.5} color="#ffaa00" />
      <pointLight position={[50, 50, 50]} intensity={0.5} color="#00d4ff" />
      <pointLight position={[-50, -50, -50]} intensity={0.3} color="#ff00ff" />

      {/* Sun with enhanced glow */}
      <mesh>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial
          map={new THREE.TextureLoader().load(sunTexture)}
          emissive={new THREE.Color(0xffa500)}
          emissiveIntensity={1.5}
        />
        {/* Sun outer glow */}
        <mesh scale={1.3}>
          <sphereGeometry args={[8, 32, 32]} />
          <meshBasicMaterial
            color="#ff6600"
            transparent
            opacity={0.3}
            side={THREE.BackSide}
          />
        </mesh>
        <mesh scale={1.5}>
          <sphereGeometry args={[8, 32, 32]} />
          <meshBasicMaterial
            color="#ffaa00"
            transparent
            opacity={0.15}
            side={THREE.BackSide}
          />
        </mesh>
      </mesh>

      {/* Planets */}
      {planetData.map((p) => (
        <Planet key={p.name} {...p} />
      ))}

      {/* Colorful Stars Background */}
      <Stars radius={200} depth={60} count={15000} factor={7} fade speed={0.5} />

      {/* Controls */}
      <OrbitControls enablePan={false} minDistance={20} maxDistance={200} />
    </>
  );
};

const SolarSystemFiber = () => {
  return (
    <Canvas
      camera={{ position: [0, 30, 120], fov: 60 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2
      }}
    >
      <color attach="background" args={["#0a0a1f"]} />
      <fog attach="fog" args={["#0a0a1f", 100, 250]} />
      <SolarSystemScene />
    </Canvas>
  );
};

export default SolarSystemFiber;
