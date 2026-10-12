"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { people } from "../lib/data";
import { shapes } from "../lib/shapes";
import type { DotLayout } from "../lib/useMorphState";
import { Tooltip } from "./Tooltip";

const VIEW = 100; // SVG viewBox is 0 0 100 100 (normalised coords * 100)

// All dots share one radius (in viewBox units).
const DOT_RADIUS = 2;

type DotCanvasProps = {
    layout: DotLayout[];
    activeTag: string | null;
    onReset: () => void;
};

export function DotCanvas({ layout, activeTag, onReset }: DotCanvasProps) {
    const prefersReduced = useReducedMotion();
    const [hovered, setHovered] = useState<number | null>(null);

    const activeShape = activeTag ? shapes[activeTag] : null;

    // Calm spring morph with a gentle stagger (disabled for reduced motion).
    const dotTransition = (i: number) =>
        prefersReduced
            ? { duration: 0 }
            : { type: "spring" as const, stiffness: 55, damping: 16, mass: 1, delay: i * 0.02 };

    const hoveredPerson = hovered !== null ? people[hovered] : null;
    const hoveredPos = hovered !== null ? layout[hovered] : null;

    return (
        <div className="dot-canvas">
            <svg viewBox={`0 0 ${VIEW} ${VIEW}`} className="dot-canvas__svg" role="group" aria-label="Dots representing 16 people">
                <defs>
                    <filter id="dot-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="1.4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Click empty space to return to the circle. */}
                <rect x="0" y="0" width={VIEW} height={VIEW} fill="transparent" onClick={onReset} />

                {/* Constellation lines appear only while a tag is active. */}
                <AnimatePresence>
                    {activeShape && (
                        <motion.g
                            key={activeTag}
                            className="dot-canvas__lines"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: prefersReduced ? 0 : 0.5, ease: "easeOut" }}
                        >
                            {activeShape.lines.map(([a, b], idx) => (
                                <line
                                    key={idx}
                                    x1={activeShape.points[a].x * VIEW}
                                    y1={activeShape.points[a].y * VIEW}
                                    x2={activeShape.points[b].x * VIEW}
                                    y2={activeShape.points[b].y * VIEW}
                                />
                            ))}
                        </motion.g>
                    )}
                </AnimatePresence>

                {/* The 16 dots. */}
                {layout.map((dot, i) => {
                    const isHovered = hovered === i;
                    const fill = dot.colored
                        ? "var(--accent)"
                        : activeTag
                            ? "var(--dot-faded)"
                            : "var(--dot)";

                    return (
                        <motion.circle
                            key={people[i].name}
                            className={`dot${dot.colored ? " dot--colored" : ""}${isHovered ? " dot--hovered" : ""}`}
                            tabIndex={0}
                            role="img"
                            aria-label={`${people[i].name}: ${people[i].items.join(", ")}`}
                            style={{ cursor: "pointer" }}
                            filter={dot.colored ? "url(#dot-glow)" : undefined}
                            initial={false}
                            animate={{
                                cx: dot.x * VIEW,
                                cy: dot.y * VIEW,
                                r: DOT_RADIUS * (isHovered ? 1.35 : 1),
                                fill,
                                opacity: dot.colored || !activeTag ? 1 : 0.55,
                            }}
                            transition={dotTransition(i)}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered((h) => (h === i ? null : h))}
                            onFocus={() => setHovered(i)}
                            onBlur={() => setHovered((h) => (h === i ? null : h))}
                        />
                    );
                })}
            </svg>

            {hoveredPerson && hoveredPos && (
                <Tooltip person={hoveredPerson} x={hoveredPos.x} y={hoveredPos.y} />
            )}
        </div>
    );
}
