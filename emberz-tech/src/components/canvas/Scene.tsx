import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { LogoMesh } from "./LogoMesh";

// TypeScript needs to know that this component accepts an activeIndex number
export function Scene({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        
        {/* Cool blue studio lights for the chrome reflections */}
        <directionalLight position={[10, 10, 5]} intensity={2.5} color="#e0f2fe" />
        <directionalLight position={[-10, -10, -5]} intensity={1.5} color="#38bdf8" />
        
        {/* Warm light hitting the front to emphasize the Emberz theme */}
        <pointLight position={[0, 0, 5]} intensity={4.0} distance={10} color="#ffaa00" />

        {/* Environment map makes the metal look real instead of flat */}
        <Environment preset="city" />

        <Suspense fallback={null}>
          {/* Pass the index down to the 3D logo so it animates */}
          <LogoMesh activeIndex={activeIndex} />
        </Suspense>
      </Canvas>
    </div>
  );
}