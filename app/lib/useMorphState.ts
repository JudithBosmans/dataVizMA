"use client";

import { useCallback, useMemo, useState } from "react";
import { people, peopleWithTag } from "./data";
import { shapes, type Shape, type ShapePoint } from "./shapes";

// Circle layout used for the default (resting) state. Normalised 0..1.
export const CIRCLE = { cx: 0.5, cy: 0.5, r: 0.38 };

export type DotLayout = {
    x: number; // normalised 0..1
    y: number; // normalised 0..1
    colored: boolean; // does this person carry the active tag?
};

/** Even circle positions, starting at the top (12 o'clock), clockwise. */
function circlePositions(): { x: number; y: number }[] {
    const n = people.length;
    return people.map((_, i) => {
        const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
        return {
            x: CIRCLE.cx + CIRCLE.r * Math.cos(angle),
            y: CIRCLE.cy + CIRCLE.r * Math.sin(angle),
        };
    });
}

const dist2 = (ax: number, ay: number, bx: number, by: number) =>
    (ax - bx) ** 2 + (ay - by) ** 2;

/** The point that anchors the coloured cluster: most prominent, then topmost. */
function anchorPoint(points: ShapePoint[]): number {
    let anchor = 0;
    points.forEach((p, i) => {
        const a = points[anchor];
        if (p.s > a.s || (p.s === a.s && (p.y < a.y || (p.y === a.y && p.x < a.x)))) {
            anchor = i;
        }
    });
    return anchor;
}

/**
 * Assign each person (dot) to a shape point index.
 * - Coloured people always form one GROUPED cluster: we anchor on a prominent
 *   point and take the `nColored` points nearest to it, so the colour is a
 *   solid blob with no faded holes. The faded dots fill the complementary
 *   (outer) region.
 * - Within each group we greedily match people to the nearest point so the
 *   morph keeps travel distances short and feels calm.
 * Returns pointIndex per personIndex.
 */
function assignDotsToShape(
    start: { x: number; y: number }[],
    shape: Shape,
    coloredIdx: number[],
): number[] {
    const { points } = shape;
    const nColored = coloredIdx.length;
    const anchor = anchorPoint(points);

    // Points sorted by distance to the anchor → coloured take the closest ones.
    const byDistance = points
        .map((p, i) => ({ i, d: dist2(p.x, p.y, points[anchor].x, points[anchor].y) }))
        .sort((a, b) => a.d - b.d || points[b.i].s - points[a.i].s)
        .map((p) => p.i);

    const coloredPoints = byDistance.slice(0, nColored);
    const otherPoints = byDistance.slice(nColored);

    const coloredSet = new Set(coloredIdx);
    const otherPeople = start.map((_, i) => i).filter((i) => !coloredSet.has(i));

    const result = new Array<number>(start.length);

    const greedy = (peopleIdx: number[], pointIdx: number[]) => {
        const available = new Set(pointIdx);
        for (const person of peopleIdx) {
            let best = -1;
            let bestD = Infinity;
            for (const pt of available) {
                const d = dist2(start[person].x, start[person].y, points[pt].x, points[pt].y);
                if (d < bestD) {
                    bestD = d;
                    best = pt;
                }
            }
            result[person] = best;
            available.delete(best);
        }
    };

    greedy(coloredIdx, coloredPoints);
    greedy(otherPeople, otherPoints);
    return result;
}

export function useMorphState() {
    const [activeTag, setActiveTagState] = useState<string | null>(null);

    const circle = useMemo(() => circlePositions(), []);

    // Toggle a tag: clicking the active tag again clears it.
    const setActiveTag = useCallback((tag: string | null) => {
        setActiveTagState((current) => (current === tag ? null : tag));
    }, []);

    const clearTag = useCallback(() => setActiveTagState(null), []);

    const layout = useMemo<DotLayout[]>(() => {
        // Resting state: neutral circle.
        if (!activeTag || !shapes[activeTag]) {
            return circle.map((p) => ({ x: p.x, y: p.y, colored: false }));
        }

        const shape = shapes[activeTag];
        const coloredIdx = peopleWithTag(activeTag);
        const coloredSet = new Set(coloredIdx);
        const assignment = assignDotsToShape(circle, shape, coloredIdx);

        return circle.map((_, person) => {
            const point = shape.points[assignment[person]];
            return {
                x: point.x,
                y: point.y,
                colored: coloredSet.has(person),
            };
        });
    }, [activeTag, circle]);

    return { activeTag, setActiveTag, clearTag, layout };
}
