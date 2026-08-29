"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealVariant = "up" | "left" | "right" | "scale" | "pop";

const VARIANTS: Record<RevealVariant, Variants> = {
  up: {
    hidden: { opacity: 0, y: 44, filter: "blur(6px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  left: {
    hidden: { opacity: 0, x: -46 },
    show: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 46 },
    show: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.94 },
    show: { opacity: 1, scale: 1 },
  },
  pop: {
    hidden: { opacity: 0, y: 30, scale: 0.82 },
    show: { opacity: 1, y: 0, scale: 1 },
  },
};

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.14 }}
      variants={VARIANTS[variant]}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
