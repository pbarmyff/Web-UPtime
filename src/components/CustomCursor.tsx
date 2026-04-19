"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);

  const cursorX = useSpring(0, { damping: 30, stiffness: 300, mass: 0.5 });
  const cursorY = useSpring(0, { damping: 30, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    if (isDesktop) {
      window.addEventListener("mousemove", moveCursor);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY, isDesktop]);

  if (!isDesktop) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-brand-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}
