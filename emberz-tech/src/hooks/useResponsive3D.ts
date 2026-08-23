import { useState, useEffect } from "react";

export function useResponsive3D() {
  const [viewportState, setViewportState] = useState({
    isMobile: false,
    cameraPosition: [0, 0, 5] as [number, number, number],
    modelScale: 1.5,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: Move camera back and shrink model to fit narrow screens
        setViewportState({
          isMobile: true,
          cameraPosition: [0, 0, 7.5],
          modelScale: 0.9,
        });
      } else {
        // Desktop
        setViewportState({
          isMobile: false,
          cameraPosition: [0, 0, 5],
          modelScale: 1.6,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return viewportState;
}