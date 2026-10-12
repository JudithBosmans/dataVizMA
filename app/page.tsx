"use client";

import { useMemo } from "react";
import { DotCanvas } from "./components/DotCanvas";
import { TagList } from "./components/TagList";
import { computeTagCounts } from "./lib/data";
import { useMorphState } from "./lib/useMorphState";

// --- Easy to change copy -------------------------------------------------
const TITLE = "Morning Routines";
const INTRO = "16 people shared their essentials to a good morning routine. Tap a dot to see the person's essentials or a category for the general consensus.";
// -------------------------------------------------------------------------

export default function Home() {
    const tags = useMemo(() => computeTagCounts(), []);
    const { activeTag, setActiveTag, clearTag, layout } = useMorphState();

    return (
        <main className="morning">
            <section className="morning__panel">
                <header className="morning__intro">
                    <h1 className="morning__title">{TITLE}</h1>
                    <p className="morning__lead">{INTRO}</p>
                </header>
                <TagList tags={tags} activeTag={activeTag} onSelect={setActiveTag} />
            </section>

            <section className="morning__stage">
                <DotCanvas layout={layout} activeTag={activeTag} onReset={clearTag} />
            </section>
        </main>
    );
}
