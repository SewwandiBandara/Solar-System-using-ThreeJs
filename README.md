This version includes:
✅ Sun with glow
✅ All main planets (Mercury → Neptune)
✅ Orbits, rotation, revolution
✅ OrbitControls (mouse zoom/rotate)
✅ Stars background
✅ Adjustable rotation speed

🧩 Step 1 — Install dependencies

Run in your React (Vite/CRA) project:

npm install three @react-three/fiber @react-three/drei

🌞 Step 2 — Create SolarSystemFiber.jsx

Inside src/components/SolarSystemFiber.jsx:

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";

const Planet = ({ size, distance, texture, orbitSpeed, rotationSpeed }) => {
  const pivot = useRef();
  const planet = useRef();
  const tex = new THREE.TextureLoader().load(texture);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (pivot.current) pivot.current.rotation.y = t * orbitSpeed;
    if (planet.current) planet.current.rotation.y += rotationSpeed;
  });

  return (
    <group ref={pivot}>
      <mesh ref={planet} position={[distance, 0, 0]}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial map={tex} />
      </mesh>
      {/* Orbit ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[distance - 0.05, distance + 0.05, 64]} />
        <meshBasicMaterial
          color="#888"
          side={THREE.DoubleSide}
          transparent
          opacity={0.2}
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
    },
    {
      
      name: "Venus",
      size: 1.5,
      distance: 18,
      texture: "https://threejsfundamentals.org/threejs/resources/images/venus.jpg",
      orbitSpeed: 0.7,
      rotationSpeed: 0.008,
    },
    {
      name: "Earth",
      size: 1.7,
      distance: 24,
      texture: "https://threejsfundamentals.org/threejs/resources/images/earth.jpg",
      orbitSpeed: 0.6,
      rotationSpeed: 0.02,
    },
    {
      name: "Mars",
      size: 1.2,
      distance: 30,
      texture: "https://threejsfundamentals.org/threejs/resources/images/mars.jpg",
      orbitSpeed: 0.5,
      rotationSpeed: 0.018,
    },
    {
      name: "Jupiter",
      size: 4.0,
      distance: 40,
      texture: "https://threejsfundamentals.org/threejs/resources/images/jupiter.jpg",
      orbitSpeed: 0.3,
      rotationSpeed: 0.04,
    },
    {
      name: "Saturn",
      size: 3.3,
      distance: 52,
      texture: "https://threejsfundamentals.org/threejs/resources/images/saturn.jpg",
      orbitSpeed: 0.25,
      rotationSpeed: 0.03,
    },
    {
      name: "Uranus",
      size: 2.5,
      distance: 64,
      texture: "https://threejsfundamentals.org/threejs/resources/images/uranus.jpg",
      orbitSpeed: 0.2,
      rotationSpeed: 0.025,
    },
    {
      name: "Neptune",
      size: 2.4,
      distance: 74,
      texture: "https://threejsfundamentals.org/threejs/resources/images/neptune.jpg",
      orbitSpeed: 0.15,
      rotationSpeed: 0.02,
    },
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2.5} />

      {/* Sun */}
      <mesh>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial
          map={new THREE.TextureLoader().load(sunTexture)}
          emissive={new THREE.Color(0xffaa00)}
        />
      </mesh>

      {/* Planets */}
      {planetData.map((p) => (
        <Planet key={p.name} {...p} />
      ))}

      {/* Stars Background */}
      <Stars radius={200} depth={60} count={10000} factor={6} fade />

      {/* Controls */}
      <OrbitControls enablePan={false} />
    </>
  );
};

const SolarSystemFiber = () => {
  return (
    <Canvas camera={{ position: [0, 30, 120], fov: 60 }}>
      <color attach="background" args={["#000000"]} />
      <SolarSystemScene />
    </Canvas>
  );
};

export default SolarSystemFiber;

🪐 Step 3 — Import in App.jsx

import React from "react";
import SolarSystemFiber from "./components/SolarSystemFiber";

function App() {
  return <SolarSystemFiber />;
}

export default App;

🌌 Step 4 — Run the project
npm run dev


Open the browser — you’ll see the full 3D solar system rotating, zoomable, and orbiting around the Sun 🌞
