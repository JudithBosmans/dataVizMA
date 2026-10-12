"use client";

import { AnimatePresence, motion } from "motion/react";
import type { Person } from "../lib/data";

type TooltipProps = {
    person: Person | null;
    // Normalised position (0..1) of the dot the tooltip points at.
    x: number;
    y: number;
};

/**
 * Floating label shown while a dot is hovered or focused.
 * Positioned over the (square) canvas using the dot's normalised coordinates.
 * Flips to the opposite side near the canvas edges so it stays on screen.
 */
export function Tooltip({ person, x, y }: TooltipProps) {
    const flipX = x > 0.6; // show to the left when near the right edge
    const flipY = y < 0.25; // show below when near the top edge

    return (
        <AnimatePresence>
            {person && (
                <motion.div
                    key={person.name}
                    role="tooltip"
                    className="morning-tooltip"
                    style={{
                        left: `${x * 100}%`,
                        top: `${y * 100}%`,
                        transform: `translate(${flipX ? "-100%" : "0"}, ${flipY ? "0.75rem" : "-100%"}) translate(${flipX ? "-0.75rem" : "0.75rem"}, ${flipY ? "0" : "-0.75rem"})`,
                    }}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.16, ease: "easeOut" }}
                >
                    <p className="morning-tooltip__name">{person.name}</p>
                    <ul className="morning-tooltip__items">
                        {person.items.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
