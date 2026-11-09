// ===========================================================================
// SHAPES
// ---------------------------------------------------------------------------
// Every tag maps to one shape made of EXACTLY 16 points (one per person/dot).
// Coordinates are normalised: x and y go from 0 (left / top) to 1 (right /
// bottom), matching an SVG coordinate system (y points DOWN).
//
// HOW TO EDIT A SHAPE BY HAND:
//   • points[]  — move a dot by changing its { x, y }. Keep 16 entries.
//   • `s`       — PROMINENCE (not visual size — all dots render the same size).
//                 The coloured dots always form one contiguous cluster; that
//                 cluster is anchored on the run of points with the highest
//                 total `s`, so give the "silhouette-defining" corners a high
//                 value to pull the colour onto them.
//   • lines[]   — thin connecting lines, as pairs of point indexes, drawn in
//                 a loose "constellation" style. Points not referenced by any
//                 line simply float (nice for stars, drops, bubbles…).
//
// Prominence presets (tweak freely):
const K = 1.5; // Key corner  — strongest pull
const M = 1.0; // Mid point   — medium
const C = 0.65; // Curve point — weakest pull
// ===========================================================================

export type ShapePoint = { x: number; y: number; s: number };
export type Shape = {
    points: ShapePoint[]; // exactly 16
    lines: [number, number][];
};

// Keys MUST match the tag strings used in data.ts exactly.
export const shapes: Record<string, Shape> = {
    // -----------------------------------------------------------------------
    // COFFEE — mug with handle + rising steam
    // -----------------------------------------------------------------------
    Coffee: {
        points: [
            { x: 0.30, y: 0.38, s: K }, // 0  rim left
            { x: 0.60, y: 0.38, s: K }, // 1  rim right
            { x: 0.56, y: 0.74, s: K }, // 2  base right
            { x: 0.34, y: 0.74, s: K }, // 3  base left
            { x: 0.45, y: 0.37, s: C }, // 4  rim mid
            { x: 0.315, y: 0.56, s: C }, // 5  left side mid
            { x: 0.45, y: 0.75, s: C }, // 6  base mid
            { x: 0.585, y: 0.56, s: C }, // 7  right side mid
            { x: 0.62, y: 0.46, s: M }, // 8  handle top
            { x: 0.74, y: 0.46, s: C }, // 9  handle out top
            { x: 0.80, y: 0.56, s: K }, // 10 handle far
            { x: 0.74, y: 0.64, s: C }, // 11 handle out bottom
            { x: 0.62, y: 0.63, s: M }, // 12 handle bottom
            { x: 0.45, y: 0.30, s: C }, // 13 steam (just above rim)
            { x: 0.47, y: 0.22, s: M }, // 14 steam (mid)
            { x: 0.44, y: 0.14, s: C }, // 15 steam (top)
        ],
        lines: [
            [0, 4], [4, 1], [1, 7], [7, 2], [2, 6], [6, 3], [3, 5], [5, 0], // cup
            [1, 8], [8, 9], [9, 10], [10, 11], [11, 12], [12, 2], // handle
            [4, 13], [13, 14], [14, 15], // steam rising vertically from the cup
        ],
    },

    // -----------------------------------------------------------------------
    // NEEDS CALM — one full crescent moon (all 16 dots form the moon)
    // -----------------------------------------------------------------------
    "Needs calm": {
        points: [
            { x: 0.50, y: 0.17, s: K }, // 0  moon top
            { x: 0.62, y: 0.20, s: C }, // 1  outer edge
            { x: 0.71, y: 0.27, s: M }, // 2  outer edge
            { x: 0.78, y: 0.37, s: M }, // 3  outer edge
            { x: 0.80, y: 0.49, s: C }, // 4  outer edge
            { x: 0.76, y: 0.61, s: M }, // 5  outer edge
            { x: 0.68, y: 0.71, s: C }, // 6  outer edge
            { x: 0.59, y: 0.785, s: M }, // 7  outer edge
            { x: 0.50, y: 0.81, s: K }, // 8  moon bottom
            { x: 0.57, y: 0.71, s: C }, // 9  inner edge
            { x: 0.635, y: 0.60, s: M }, // 10 inner edge
            { x: 0.655, y: 0.48, s: K }, // 11 inner belly
            { x: 0.645, y: 0.37, s: C }, // 12 inner edge
            { x: 0.60, y: 0.28, s: M }, // 13 inner edge
            { x: 0.555, y: 0.225, s: C }, // 14 inner edge
            { x: 0.52, y: 0.19, s: C }, // 15 inner edge (back to top)
        ],
        lines: [
            // outer edge, top → bottom
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
            // inner edge, bottom → top (closes the crescent)
            [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 0],
        ],
    },

    // -----------------------------------------------------------------------
    // MUSIC & PODCASTS — eighth note: oval head + stem + ONE flag
    // (head is a clean 8-point loop; single tail only)
    // -----------------------------------------------------------------------
    "Music & podcasts": {
        points: [
            { x: 0.295, y: 0.72, s: K }, // 0  head left
            { x: 0.32, y: 0.665, s: C }, // 1  head
            { x: 0.385, y: 0.65, s: M }, // 2  head top
            { x: 0.45, y: 0.665, s: C }, // 3  head
            { x: 0.475, y: 0.72, s: M }, // 4  head right
            { x: 0.45, y: 0.775, s: C }, // 5  head
            { x: 0.385, y: 0.79, s: C }, // 6  head bottom
            { x: 0.32, y: 0.775, s: C }, // 7  head
            { x: 0.475, y: 0.62, s: M }, // 8  stem low
            { x: 0.485, y: 0.47, s: C }, // 9  stem mid
            { x: 0.49, y: 0.32, s: K }, // 10 stem top
            { x: 0.56, y: 0.31, s: M }, // 11 flag
            { x: 0.61, y: 0.38, s: K }, // 12 flag tip
            { x: 0.60, y: 0.46, s: M }, // 13 flag
            { x: 0.55, y: 0.50, s: C }, // 14 flag
            { x: 0.50, y: 0.50, s: C }, // 15 flag end
        ],
        lines: [
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0], // head (clean oval)
            [4, 8], [8, 9], [9, 10], // stem
            [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], // single flag
        ],
    },

    // -----------------------------------------------------------------------
    // SHOWER & HYGIENE — shower rose on an arm + falling drops
    // -----------------------------------------------------------------------
    "Shower & hygiene": {
        points: [
            { x: 0.66, y: 0.18, s: M }, // 0  pipe top
            { x: 0.66, y: 0.29, s: M }, // 1  pipe elbow
            { x: 0.58, y: 0.35, s: K }, // 2  rose right
            { x: 0.43, y: 0.34, s: M }, // 3  rose mid
            { x: 0.28, y: 0.35, s: K }, // 4  rose left
            { x: 0.33, y: 0.41, s: C }, // 5  rose underside
            { x: 0.43, y: 0.43, s: M }, // 6  rose underside
            { x: 0.53, y: 0.41, s: C }, // 7  rose underside
            { x: 0.32, y: 0.55, s: C }, // 8  drop
            { x: 0.32, y: 0.70, s: M }, // 9  drop
            { x: 0.43, y: 0.54, s: C }, // 10 drop
            { x: 0.43, y: 0.68, s: M }, // 11 drop
            { x: 0.43, y: 0.82, s: K }, // 12 drop
            { x: 0.54, y: 0.55, s: C }, // 13 drop
            { x: 0.54, y: 0.70, s: M }, // 14 drop
            { x: 0.54, y: 0.84, s: K }, // 15 drop
        ],
        lines: [
            [0, 1], [1, 2], // arm
            [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 2], // rose
            [8, 9], [10, 11], [11, 12], [13, 14], [14, 15], // drops
        ],
    },

    // -----------------------------------------------------------------------
    // CIGARETTE — cigarette lying flat with curling smoke
    // -----------------------------------------------------------------------
    Cigarette: {
        points: [
            { x: 0.22, y: 0.68, s: K }, // 0  lit end top
            { x: 0.58, y: 0.66, s: M }, // 1  right top
            { x: 0.58, y: 0.72, s: M }, // 2  right bottom
            { x: 0.22, y: 0.74, s: K }, // 3  lit end bottom
            { x: 0.50, y: 0.66, s: C }, // 4  filter band top
            { x: 0.50, y: 0.72, s: C }, // 5  filter band bottom
            { x: 0.19, y: 0.71, s: M }, // 6  ember
            { x: 0.60, y: 0.58, s: M }, // 7  smoke
            { x: 0.55, y: 0.50, s: C }, // 8  smoke
            { x: 0.60, y: 0.42, s: M }, // 9  smoke
            { x: 0.55, y: 0.34, s: C }, // 10 smoke
            { x: 0.60, y: 0.26, s: M }, // 11 smoke
            { x: 0.55, y: 0.19, s: K }, // 12 smoke top
            { x: 0.64, y: 0.46, s: C }, // 13 smoke wisp
            { x: 0.64, y: 0.30, s: C }, // 14 smoke wisp
            { x: 0.50, y: 0.14, s: C }, // 15 smoke wisp
        ],
        lines: [
            [0, 1], [1, 2], [2, 3], [3, 0], // body
            [4, 5], // filter band
            [0, 6], // ember at the lit end
            [1, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 12], // smoke
            [9, 13], [11, 14], [12, 15], // smoke wisps
        ],
    },

    // -----------------------------------------------------------------------
    // TOILET — simple side-view silhouette (tank + bowl + base)
    // -----------------------------------------------------------------------
    Toilet: {
        points: [
            { x: 0.30, y: 0.26, s: K }, // 0  tank top left
            { x: 0.44, y: 0.26, s: M }, // 1  tank top right
            { x: 0.44, y: 0.46, s: M }, // 2  tank bottom right
            { x: 0.30, y: 0.46, s: C }, // 3  tank bottom left
            { x: 0.44, y: 0.44, s: C }, // 4  seat back
            { x: 0.68, y: 0.46, s: K }, // 5  seat front
            { x: 0.70, y: 0.56, s: M }, // 6  bowl front
            { x: 0.56, y: 0.64, s: M }, // 7  bowl bottom
            { x: 0.44, y: 0.56, s: C }, // 8  bowl back
            { x: 0.48, y: 0.62, s: C }, // 9  pedestal top
            { x: 0.42, y: 0.80, s: M }, // 10 pedestal left
            { x: 0.36, y: 0.82, s: K }, // 11 base left
            { x: 0.64, y: 0.82, s: K }, // 12 base right
            { x: 0.58, y: 0.80, s: M }, // 13 pedestal right
            { x: 0.56, y: 0.44, s: C }, // 14 seat lid
            { x: 0.60, y: 0.50, s: C }, // 15 rim
        ],
        lines: [
            [0, 1], [1, 2], [2, 3], [3, 0], // tank
            [4, 5], [5, 6], [6, 7], [7, 8], [8, 4], // bowl + seat
            [8, 9], [9, 10], // bowl back down to pedestal
            [7, 10], [10, 11], [11, 12], [12, 13], [13, 6], // pedestal + base
            [4, 14], [14, 15], [15, 5], // seat lid + rim
        ],
    },

    // -----------------------------------------------------------------------
    // MEDITATION, PRAYER & BREATHING — person sitting in lotus
    // -----------------------------------------------------------------------
    "Meditation, prayer & breathing": {
        points: [
            { x: 0.46, y: 0.18, s: K }, // 0  head top
            { x: 0.52, y: 0.24, s: C }, // 1  head right
            { x: 0.46, y: 0.30, s: M }, // 2  head bottom
            { x: 0.40, y: 0.24, s: C }, // 3  head left
            { x: 0.33, y: 0.42, s: K }, // 4  shoulder left
            { x: 0.59, y: 0.42, s: K }, // 5  shoulder right
            { x: 0.30, y: 0.56, s: M }, // 6  arm left
            { x: 0.62, y: 0.56, s: M }, // 7  arm right
            { x: 0.28, y: 0.66, s: K }, // 8  knee left
            { x: 0.64, y: 0.66, s: K }, // 9  knee right
            { x: 0.42, y: 0.70, s: M }, // 10 shin left
            { x: 0.50, y: 0.70, s: M }, // 11 shin right
            { x: 0.46, y: 0.68, s: C }, // 12 base centre
            { x: 0.46, y: 0.40, s: M }, // 13 chest
            { x: 0.46, y: 0.54, s: C }, // 14 waist
            { x: 0.46, y: 0.60, s: C }, // 15 hands
        ],
        lines: [
            [0, 1], [1, 2], [2, 3], [3, 0], // head
            [2, 13], [13, 14], // spine
            [4, 13], [13, 5], // shoulders
            [4, 6], [6, 8], [5, 7], [7, 9], // arms
            [14, 15], [15, 12], // waist down to hands/base
            [8, 10], [10, 12], [12, 11], [11, 9], // crossed legs
        ],
    },

    // -----------------------------------------------------------------------
    // QUIET START — sun rising over a horizon line, with soft rays
    // -----------------------------------------------------------------------
    "Quiet start": {
        points: [
            { x: 0.18, y: 0.64, s: K }, // 0  horizon left
            { x: 0.34, y: 0.64, s: C }, // 1
            { x: 0.50, y: 0.64, s: M }, // 2  horizon mid
            { x: 0.66, y: 0.64, s: C }, // 3
            { x: 0.82, y: 0.64, s: K }, // 4  horizon right
            { x: 0.32, y: 0.64, s: M }, // 5  sun left
            { x: 0.355, y: 0.52, s: C }, // 6
            { x: 0.44, y: 0.47, s: C }, // 7
            { x: 0.50, y: 0.46, s: K }, // 8  sun top
            { x: 0.56, y: 0.47, s: C }, // 9
            { x: 0.645, y: 0.52, s: C }, // 10
            { x: 0.68, y: 0.64, s: M }, // 11 sun right
            { x: 0.50, y: 0.30, s: M }, // 12 ray up
            { x: 0.26, y: 0.40, s: C }, // 13 ray left
            { x: 0.74, y: 0.40, s: C }, // 14 ray right
            { x: 0.38, y: 0.33, s: C }, // 15 ray up-left
        ],
        lines: [
            [0, 1], [1, 2], [2, 3], [3, 4], // horizon
            [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], // sun arc
            [8, 12], [6, 13], [10, 14], [7, 15], // rays
        ],
    },

    // -----------------------------------------------------------------------
    // TALKING — speech bubble with a tail and three dots
    // -----------------------------------------------------------------------
    Talking: {
        points: [
            { x: 0.26, y: 0.28, s: K }, // 0  top left
            { x: 0.70, y: 0.28, s: K }, // 1  top right
            { x: 0.70, y: 0.56, s: M }, // 2  bottom right
            { x: 0.26, y: 0.56, s: M }, // 3  bottom left
            { x: 0.48, y: 0.27, s: C }, // 4  top mid
            { x: 0.71, y: 0.42, s: C }, // 5  right mid
            { x: 0.25, y: 0.42, s: C }, // 6  left mid
            { x: 0.38, y: 0.56, s: M }, // 7  tail top
            { x: 0.33, y: 0.68, s: K }, // 8  tail tip
            { x: 0.44, y: 0.57, s: C }, // 9  tail back
            { x: 0.38, y: 0.42, s: M }, // 10 dot
            { x: 0.48, y: 0.42, s: M }, // 11 dot
            { x: 0.58, y: 0.42, s: M }, // 12 dot
            { x: 0.48, y: 0.57, s: C }, // 13 bottom mid
            { x: 0.60, y: 0.28, s: C }, // 14 top edge
            { x: 0.60, y: 0.56, s: C }, // 15 bottom edge
        ],
        lines: [
            [0, 4], [4, 1], [1, 5], [5, 2], [2, 13], [13, 3], [3, 6], [6, 0], // bubble
            [7, 8], [8, 9], // tail
            [1, 14], [2, 15], // right edge points linked to corners
            [10, 11], [11, 12], // the "talking" dots
        ],
    },

    // -----------------------------------------------------------------------
    // MOVEMENT — running stick figure
    // -----------------------------------------------------------------------
    Movement: {
        points: [
            { x: 0.52, y: 0.18, s: K }, // 0  head top
            { x: 0.57, y: 0.23, s: C }, // 1  head right
            { x: 0.52, y: 0.28, s: M }, // 2  head bottom
            { x: 0.47, y: 0.23, s: C }, // 3  head left
            { x: 0.50, y: 0.30, s: M }, // 4  neck
            { x: 0.42, y: 0.52, s: K }, // 5  hip
            { x: 0.60, y: 0.38, s: M }, // 6  front elbow
            { x: 0.68, y: 0.34, s: K }, // 7  front hand
            { x: 0.38, y: 0.40, s: M }, // 8  back elbow
            { x: 0.30, y: 0.46, s: K }, // 9  back hand
            { x: 0.52, y: 0.64, s: M }, // 10 front knee
            { x: 0.60, y: 0.74, s: K }, // 11 front foot
            { x: 0.34, y: 0.64, s: M }, // 12 back knee
            { x: 0.26, y: 0.72, s: K }, // 13 back foot
            { x: 0.46, y: 0.41, s: C }, // 14 chest
            { x: 0.20, y: 0.40, s: C }, // 15 motion line
        ],
        lines: [
            [0, 1], [1, 2], [2, 3], [3, 0], // head
            [2, 4], [4, 14], [14, 5], // spine
            [4, 6], [6, 7], [4, 8], [8, 9], // arms
            [5, 10], [10, 11], [5, 12], [12, 13], // legs
            [9, 15], // trailing motion line off the back hand
        ],
    },

    // -----------------------------------------------------------------------
    // FOOD & DRINK — tall glass of water with a water line + bubbles
    // -----------------------------------------------------------------------
    "Food & drink": {
        points: [
            { x: 0.36, y: 0.30, s: K }, // 0  rim left
            { x: 0.60, y: 0.30, s: K }, // 1  rim right
            { x: 0.56, y: 0.78, s: K }, // 2  base right
            { x: 0.40, y: 0.78, s: K }, // 3  base left
            { x: 0.48, y: 0.30, s: C }, // 4  rim mid
            { x: 0.37, y: 0.46, s: C }, // 5  left upper
            { x: 0.39, y: 0.64, s: C }, // 6  left lower
            { x: 0.59, y: 0.46, s: C }, // 7  right upper
            { x: 0.57, y: 0.64, s: C }, // 8  right lower
            { x: 0.48, y: 0.78, s: C }, // 9  base mid
            { x: 0.385, y: 0.44, s: M }, // 10 water line left
            { x: 0.595, y: 0.44, s: M }, // 11 water line right
            { x: 0.49, y: 0.44, s: C }, // 12 water line mid
            { x: 0.45, y: 0.58, s: C }, // 13 bubble
            { x: 0.52, y: 0.66, s: C }, // 14 bubble
            { x: 0.47, y: 0.70, s: C }, // 15 bubble
        ],
        lines: [
            [0, 5], [5, 6], [6, 3], // left side
            [3, 9], [9, 2], // base
            [2, 8], [8, 7], [7, 1], // right side
            [1, 4], [4, 0], // rim
            [10, 12], [12, 11], // water line
            [13, 14], [14, 15], // bubbles rising
        ],
    },
};
