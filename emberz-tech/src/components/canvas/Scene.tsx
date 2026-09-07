import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { LogoMesh } from "./LogoMesh";

export function Scene({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 40 }}
        dpr={[1, 1.75]} // Clamps device pixel ratio to prevent laggy 3x/4x mobile rendering
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        <ambientLight intensity={0.7} />
        
        {/* Crisp directional lighting acting as a fast zero-network environment */}
        <directionalLight position={[10, 10, 5]} intensity={3.0} color="#e0f2fe" />
        <directionalLight position={[-10, -10, -5]} intensity={2.0} color="#38bdf8" />
        <directionalLight position={[0, -5, -2]} intensity={1.2} color="#1e293b" />
        
        {/* Warm core highlight */}
        <pointLight position={[0, 0, 4]} intensity={5.0} distance={12} color="#e3c091" />

        <Suspense fallback={null}>
          <LogoMesh activeIndex={activeIndex} />
        </Suspense>
      </Canvas>
    </div>
  );
}