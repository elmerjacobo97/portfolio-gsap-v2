const WIDE = "lg:col-span-10 lg:col-start-2";
const LEFT = "lg:col-span-6 lg:col-start-1";
const RIGHT = "lg:col-span-6 lg:col-start-7";

export const PLACEMENTS = [WIDE, LEFT, RIGHT].flatMap((value) => value.split(" "));

/** Editorial grid slot for the nth visible post: wide first, then alternating. */
export function placement(index: number) {
	if (index === 0) return WIDE;
	return index % 2 === 1 ? LEFT : RIGHT;
}
