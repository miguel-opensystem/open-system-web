"use client";

import { motion, useReducedMotion } from "framer-motion";

const blobs = [
  {
    className:
      "left-[8%] top-[-18%] h-[46rem] w-[46rem] bg-[radial-gradient(circle,rgba(10,132,255,0.16),transparent_66%)]",
    drift: { x: [0, 120, -60, 0], y: [0, 80, 40, 0] },
    duration: 34,
  },
  {
    className:
      "right-[-12%] top-[22%] h-[40rem] w-[40rem] bg-[radial-gradient(circle,rgba(94,92,230,0.13),transparent_66%)]",
    drift: { x: [0, -140, 60, 0], y: [0, 100, -60, 0] },
    duration: 42,
  },
  {
    className:
      "left-[-14%] top-[58%] h-[44rem] w-[44rem] bg-[radial-gradient(circle,rgba(6,182,212,0.13),transparent_66%)]",
    drift: { x: [0, 160, 40, 0], y: [0, -90, -40, 0] },
    duration: 38,
  },
  {
    className:
      "right-[6%] bottom-[-16%] h-[42rem] w-[42rem] bg-[radial-gradient(circle,rgba(5,5,5,0.07),transparent_66%)]",
    drift: { x: [0, -90, 70, 0], y: [0, -70, 50, 0] },
    duration: 46,
  },
];

export function MeshBackground() {
  const reduced = useReducedMotion();

  return (
    <div
      className="grain pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--background)]"
      aria-hidden="true"
    >
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${blob.className}`}
          animate={reduced ? undefined : blob.drift}
          transition={{
            duration: blob.duration,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
