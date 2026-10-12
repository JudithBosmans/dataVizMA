// ---------------------------------------------------------------------------
// Static dataset: the morning routines of 16 people.
// Each person becomes one dot in the visualisation.
// `items` are the raw things they listed; `tags` are the normalised categories.
// ---------------------------------------------------------------------------

export type Person = {
    name: string;
    items: string[];
    tags: string[];
};

export const people: Person[] = [
    { name: "Jorge", items: ["Meditation (allowing himself to do nothing for 20 min, be bored)"], tags: ["Meditation, prayer & breathing", "Needs calm"] },
    { name: "Keesha", items: ["Skincare", "Praying", "Breath exercises"], tags: ["Getting ready", "Meditation, prayer & breathing", "Needs calm"] },
    { name: "Widad", items: ["Change underwear", "Eyeliner"], tags: ["Shower & hygiene", "Getting ready"] },
    { name: "Larissa", items: ["Needs calm", "Toilet"], tags: ["Toilet", "Needs calm"] },
    { name: "Diede", items: ["Coffee", "Cigarette", "Meditation (drinks outside)"], tags: ["Coffee", "Cigarette", "Meditation, prayer & breathing", "Needs calm"] },
    { name: "Allison", items: ["Coffee", "Cigarette", "Music"], tags: ["Coffee", "Cigarette", "Music & podcasts", "Needs calm"] },
    { name: "Jana", items: ["Coffee", "Music"], tags: ["Coffee", "Music & podcasts"] },
    { name: "Clara", items: ["Coffee", "Shower", "Music"], tags: ["Coffee", "Shower & hygiene", "Music & podcasts"] },
    { name: "Chiara", items: ["Coffee", "Talk to dad", "Get up early"], tags: ["Coffee", "Talking", "Quiet start", "Needs calm"] },
    { name: "Hazel", items: ["Toilet", "Shower", "Outfit/accessories", "Makeup", "Music", "Dancing"], tags: ["Toilet", "Shower & hygiene", "Getting ready", "Music & podcasts", "Movement", "Needs calm"] },
    { name: "Violetta", items: ["Coffee", "Try to stay off phone", "Sit on sofa & talk", "Cigarette", "Music"], tags: ["Coffee", "Quiet start", "Talking", "Cigarette", "Music & podcasts", "Needs calm"] },
    { name: "June", items: ["Glass of water", "Open window", "Coffee", "Music"], tags: ["Food & drink", "Quiet start", "Coffee", "Music & podcasts", "Needs calm"] },
    { name: "Sara", items: ["Shower", "Coffee", "Podcast"], tags: ["Shower & hygiene", "Coffee", "Music & podcasts", "Needs calm"] },
    { name: "Emma", items: ["Coffee", "Music"], tags: ["Coffee", "Music & podcasts"] },
    { name: "Josipa", items: ["Coffee", "Stretches", "Breakfast"], tags: ["Coffee", "Movement", "Food & drink"] },
    { name: "Judith", items: ["Coffee", "Shower", "Skincare", "Music", "Toilet"], tags: ["Coffee", "Shower & hygiene", "Getting ready", "Music & podcasts", "Toilet"] },
];

export type TagCount = { tag: string; count: number };

/**
 * Count how many people carry each tag, derived straight from the data
 * (never hardcoded). Sorted by count descending, ties keep first-seen order.
 */
export function computeTagCounts(data: Person[] = people): TagCount[] {
    const counts = new Map<string, number>();
    const order: string[] = [];

    for (const person of data) {
        for (const tag of person.tags) {
            if (!counts.has(tag)) {
                counts.set(tag, 0);
                order.push(tag);
            }
            counts.set(tag, counts.get(tag)! + 1);
        }
    }

    return order
        .map((tag) => ({ tag, count: counts.get(tag)! }))
        .sort((a, b) => b.count - a.count || order.indexOf(a.tag) - order.indexOf(b.tag));
}

/** Indices of people who carry a given tag. */
export function peopleWithTag(tag: string, data: Person[] = people): number[] {
    const result: number[] = [];
    data.forEach((person, i) => {
        if (person.tags.includes(tag)) result.push(i);
    });
    return result;
}
