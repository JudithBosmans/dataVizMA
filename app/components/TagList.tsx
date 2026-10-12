"use client";

import type { TagCount } from "../lib/data";

type TagListProps = {
    tags: TagCount[];
    activeTag: string | null;
    onSelect: (tag: string) => void;
};

/**
 * Clickable list of tags with their (data-derived) counts.
 * Each tag is a real <button> so it is keyboard accessible out of the box.
 */
export function TagList({ tags, activeTag, onSelect }: TagListProps) {
    return (
        <ul className="tag-list">
            {tags.map(({ tag, count }) => {
                const isActive = tag === activeTag;
                return (
                    <li key={tag}>
                        <button
                            type="button"
                            className={`tag-list__tag${isActive ? " tag-list__tag--active" : ""}`}
                            aria-pressed={isActive}
                            onClick={() => onSelect(tag)}
                        >
                            <span className="tag-list__label">{tag}</span>
                            <span className="tag-list__count">{count}</span>
                        </button>
                    </li>
                );
            })}
        </ul>
    );
}
