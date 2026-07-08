"use client";
import { motion, useInView, type Variants } from "framer-motion";
import { type CSSProperties, type ElementType, type ReactNode, type RefObject } from "react";

const motionElements = {
  a: motion.a,
  div: motion.div,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  p: motion.p,
  span: motion.span,
} as const;

interface TimelineContentProps {
  as?: ElementType;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | null>;
  customVariants: Variants;
  className?: string;
  children?: ReactNode;
  style?: CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export function TimelineContent({
  as = "div",
  animationNum,
  timelineRef,
  customVariants,
  className,
  children,
  ...rest
}: TimelineContentProps) {
  const isInView = useInView(timelineRef as RefObject<HTMLElement>, {
    once: true,
    amount: 0.15,
  });

  const MotionEl =
    typeof as === "string" && as in motionElements
      ? motionElements[as as keyof typeof motionElements]
      : motion.div;

  return (
    <MotionEl
      className={className}
      custom={animationNum}
      variants={customVariants}
      animate={isInView ? "visible" : "hidden"}
      initial="hidden"
      {...rest}
    >
      {children}
    </MotionEl>
  );
}
