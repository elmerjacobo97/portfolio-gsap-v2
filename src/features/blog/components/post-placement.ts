const WIDE = "lg:col-span-10 lg:col-start-2";
const LEFT = "lg:col-span-6 lg:col-start-1";
const RIGHT = "lg:col-span-6 lg:col-start-7";

const TINTS = ["bg-surface-inset", "bg-surface-raised"];

export const PLACEMENTS = [WIDE, LEFT, RIGHT, ...TINTS].flatMap((value) =>
	value.split(" "),
);

/**
 * Editorial grid slot and background tint for the nth visible post: wide
 * first, then alternating sides. The tint alternates so neighbouring cards
 * read as separate items.
 */
export function placement(index: number) {
	const slot = index === 0 ? WIDE : index % 2 === 1 ? LEFT : RIGHT;
	return `${slot} ${TINTS[index % TINTS.length]}`;
}
