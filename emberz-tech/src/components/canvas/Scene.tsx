import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { LogoMesh } from "./LogoMesh";

function SceneReadyNotifier({ onLoaded }: { onLoaded: () => void }) {
  useEffect(() => {
    onLoaded();
  }, [onLoaded]);
  return null;
}

export function Scene({ 
  activeIndex, 
  onLoaded 
}: { 
  activeIndex: number; 
  onLoaded: () => void;
}) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 40 }}
        dpr={[1, 1.75]}
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
        <directionalLight position={[10, 10, 5]} intensity={3.0} color="#e0f2fe" />
        <directionalLight position={[-10, -10, -5]} intensity={2.0} color="#38bdf8" />
        <directionalLight position={[0, -5, -2]} intensity={1.2} color="#1e293b" />
        <pointLight position={[0, 0, 4]} intensity={5.0} distance={12} color="#e3c091" />

        <Suspense fallback={null}>
          <LogoMesh activeIndex={activeIndex} />
          <SceneReadyNotifier onLoaded={onLoaded} />
        </Suspense>
      </Canvas>
    </div>
  );
}