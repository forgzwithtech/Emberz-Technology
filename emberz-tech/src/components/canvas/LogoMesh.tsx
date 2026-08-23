import { useRef, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Float, Center } from "@react-three/drei";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import * as THREE from "three";

import gsap from "gsap"; 
import { useGSAP } from "@gsap/react";
import logoSvgUrl from "../../assets/emberz-logo.svg?url";

const EXTRUDE_DEPTH = 12;
const BEVEL_SIZE = 1.0;

function pointInPolygon(point: THREE.Vector2, polyPoints: THREE.Vector2[]) {
  let inside = false;
  for (let i = 0, j = polyPoints.length - 1; i < polyPoints.length; j = i++) {
    const xi = polyPoints[i].x;
    const yi = polyPoints[i].y;
    const xj = polyPoints[j].x;
    const yj = polyPoints[j].y;
    const intersect =
      yi > point.y !== yj > point.y && point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function resolveHoles(rawShapes: THREE.Shape[]) {
  const withMeta = rawShapes.map((shape) => {
    const points = shape.getPoints();
    const box = new THREE.Box2().setFromPoints(points);
    const area = (box.max.x - box.min.x) * (box.max.y - box.min.y);
    return { shape, points, box, area };
  });

  const parentIndex = new Array(withMeta.length).fill(-1);

  for (let i = 0; i < withMeta.length; i++) {
    for (let j = 0; j < withMeta.length; j++) {
      if (i === j || parentIndex[i] !== -1) continue;
      const inner = withMeta[i];
      const outer = withMeta[j];
      if (outer.area <= inner.area) continue;
      const fits =
        inner.box.min.x >= outer.box.min.x && inner.box.max.x <= outer.box.max.x &&
        inner.box.min.y >= outer.box.min.y && inner.box.max.y <= outer.box.max.y;
      if (fits && pointInPolygon(inner.points[0], outer.points)) {
        parentIndex[i] = j;
      }
    }
  }

  const topLevel: THREE.Shape[] = [];
  withMeta.forEach((m, i) => {
    if (parentIndex[i] === -1) topLevel.push(m.shape);
    else withMeta[parentIndex[i]].shape.holes.push(m.shape);
  });
  return topLevel;
}

function useLogoGeometry() {
  const data = useLoader(SVGLoader, logoSvgUrl);
  return useMemo(() => {
    const rawShapes: THREE.Shape[] = [];
    data.paths.forEach((path) => {
      SVGLoader.createShapes(path).forEach((s) => {
        if (s.getPoints().length > 4) rawShapes.push(s);
      });
    });
    const shapes = resolveHoles(rawShapes);
    return shapes.map((shape) => {
      return new THREE.ExtrudeGeometry(shape, {
        depth: EXTRUDE_DEPTH,
        bevelEnabled: true,
        bevelThickness: BEVEL_SIZE,
        bevelSize: BEVEL_SIZE * 0.4,
        bevelSegments: 4,
        curveSegments: 16,
      });
    });
  }, [data]);
}

function AmbientMark({ position, color, scale, speed, rotationOffset }: any) {
  const geometries = useLogoGeometry();
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = rotationOffset + t * speed;
    groupRef.current.rotation.x = rotationOffset + Math.sin(t * speed) * 0.5;
  });

  return (
    <Float speed={speed * 2} rotationIntensity={0.5} floatIntensity={2}>
      <Center position={position} ref={groupRef} scale={scale}>
        {geometries.map((geom, i) => (
          <mesh key={i} geometry={geom}>
            <meshBasicMaterial color={color} transparent opacity={0.15} wireframe={i % 2 === 0} />
          </mesh>
        ))}
      </Center>
    </Float>
  );
}

export function LogoMesh({ activeIndex }: { activeIndex: number }) {
  const geometries = useLogoGeometry(); 
  const animGroupRef = useRef<THREE.Group>(null!);
  const bgGroupRef = useRef<THREE.Group>(null!);

useGSAP(() => {
    if (!animGroupRef.current) return;
    
    // Normalize rotation so if we leave the infinite spin, it doesn't spin backward wildly to reach 0
    animGroupRef.current.rotation.y = animGroupRef.current.rotation.y % (Math.PI * 2);

    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)"
    }, (context) => {
      // @ts-ignore
      let { isMobile } = context.conditions;

      // Kill any leftover infinite spin tweens when changing screens
      gsap.killTweensOf(animGroupRef.current.rotation);

      if (activeIndex === 0) {
        // SCREEN 0: Hero 
        const targetScale = isMobile ? 0.005 : 0.0085; 
        const targetY = isMobile ? 0.4 : 0.2; 
        
        gsap.to(animGroupRef.current.position, { x: 0, y: targetY, z: 0, duration: 1.2, ease: "power3.inOut" });
        gsap.to(animGroupRef.current.scale, { x: targetScale, y: targetScale, z: targetScale, duration: 1.2, ease: "power3.inOut" });
        gsap.to(animGroupRef.current.rotation, { x: 0, y: 0, z: 0, duration: 1.2, ease: "power3.inOut" });
      
      } else if (activeIndex >= 9) {
        // SCREEN 9: Contact Form (Infinite 360 Spin)
        const targetX = isMobile ? 0 : 3.5; 
        const targetY = isMobile ? 2.2 : 0; 
        const targetZ = 0;
        const targetScale = isMobile ? 0.004 : 0.01; 
        
        gsap.to(animGroupRef.current.position, { x: targetX, y: targetY, z: targetZ, duration: 1.5, ease: "expo.inOut" });
        gsap.to(animGroupRef.current.scale, { x: targetScale, y: targetScale, z: targetScale, duration: 1.5, ease: "expo.inOut" });
        
        // Tilt slightly on the X and Z axis to catch light
        gsap.to(animGroupRef.current.rotation, { x: 0.1, z: 0.05, duration: 1.5, ease: "expo.inOut" });
        
        // Infinite 360 degree spin on the Y axis
        gsap.to(animGroupRef.current.rotation, { 
          y: "+=6.283185", // Exactly 360 degrees in radians
          duration: 12, 
          ease: "none",
          repeat: -1 
        });

      } else if (activeIndex >= 5) {
        // SCREENS 5-8: Labs 
        const targetX = isMobile ? 0 : 3.5; 
        const targetY = isMobile ? -3.2 : -1.8; 
        const targetZ = isMobile ? -3 : -1;
        const targetScale = isMobile ? 0.003 : 0.007; 
        
        gsap.to(animGroupRef.current.position, { x: targetX, y: targetY, z: targetZ, duration: 1.2, ease: "power4.inOut" });
        gsap.to(animGroupRef.current.scale, { x: targetScale, y: targetScale, z: targetScale, duration: 1.2, ease: "power4.inOut" });
        gsap.to(animGroupRef.current.rotation, { x: isMobile ? 0.4 : 0.5, y: isMobile ? 0 : -0.5, z: isMobile ? 0 : 0.2, duration: 1.2, ease: "power4.inOut" });

      } else if (activeIndex >= 1) {
        // SCREENS 1-4: Capabilities 
        const targetX = isMobile ? 0 : 3.2; 
        const targetY = isMobile ? 3.0 : 1.6; 
        const targetZ = isMobile ? -3 : -2;
        const targetScale = isMobile ? 0.0025 : 0.0055; 
        
        gsap.to(animGroupRef.current.position, { x: targetX, y: targetY, z: targetZ, duration: 1.2, ease: "power3.inOut" });
        gsap.to(animGroupRef.current.scale, { x: targetScale, y: targetScale, z: targetScale, duration: 1.2, ease: "power3.inOut" });
        gsap.to(animGroupRef.current.rotation, { x: 0.1, y: isMobile ? 0 : -0.25, z: 0.03, duration: 1.2, ease: "power3.inOut" });
      }
    });

    if (bgGroupRef.current) {
      const isHero = activeIndex === 0;
      gsap.to(bgGroupRef.current.scale, { x: isHero ? 1 : 0, y: isHero ? 1 : 0, z: isHero ? 1 : 0, duration: 1.0, ease: "power3.inOut" });
      gsap.to(bgGroupRef.current.position, { z: isHero ? 0 : -20, duration: 1.2, ease: "power3.inOut" });
    }

    return () => mm.revert();
  }, [activeIndex]);

  return (
    <group>
      {/* Background Ambience */}
      <group ref={bgGroupRef}>
        <AmbientMark position={[-6, 4, -8]} color="#00f0ff" scale={[0.004, -0.004, 0.004]} speed={0.2} rotationOffset={1} />
        <AmbientMark position={[7, -3, -12]} color="#ffaa00" scale={[0.005, -0.005, 0.005]} speed={0.15} rotationOffset={3} />
        <AmbientMark position={[-6, -4.5, -10]} color="#38bdf8" scale={[0.003, -0.003, 0.003]} speed={0.3} rotationOffset={0.5} />
        <AmbientMark position={[7, 4.5, -15]} color="#0055ff" scale={[0.006, -0.006, 0.006]} speed={0.1} rotationOffset={2} />
      </group>

      {/* Main 3D Logo */}
      <group ref={animGroupRef}>
        <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
          <Center scale={[1, -1, 1]}> 
            {geometries.map((geometry, i) => (
              <mesh key={`main-${i}`} geometry={geometry} castShadow receiveShadow>
                <meshStandardMaterial attach="material-0" color="#5b748a" emissive="#ff8800" emissiveIntensity={0.25} metalness={0.8} roughness={0.2} />
                <meshPhysicalMaterial attach="material-1" color="#0f141c" metalness={1.0} roughness={0.1} clearcoat={1.0} />
              </mesh>
            ))}
          </Center>
        </Float>
      </group>
    </group>
  );
}