"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({
	label,
	lightLabel,
	darkLabel,
}: {
	label: string;
	lightLabel: string;
	darkLabel: string;
}) {
	const mounted = useSyncExternalStore(
		() => () => {},
		() => true,
		() => false,
	);
	const { resolvedTheme, setTheme } = useTheme();

	// Keep the server and first client render identical while next-themes reads
	// localStorage. The dark fallback also matches the initial visual theme.
	const currentTheme = mounted && resolvedTheme === "light" ? "light" : "dark";
	const nextTheme = currentTheme === "light" ? "dark" : "light";
	const nextLabel = nextTheme === "light" ? lightLabel : darkLabel;

	return (
		<button
			type="button"
			aria-label={`${label}: ${nextLabel}`}
			title={nextLabel}
			onClick={() => setTheme(nextTheme)}
			className="text-text-dim hover:text-accent inline-flex size-10 items-center justify-center rounded-none transition-colors duration-200"
		>
			{currentTheme === "light" ? (
				<Moon
					aria-hidden
					size={16}
					strokeWidth={1.5}
					strokeLinecap="square"
					strokeLinejoin="miter"
				/>
			) : (
				<Sun
					aria-hidden
					size={16}
					strokeWidth={1.5}
					strokeLinecap="square"
					strokeLinejoin="miter"
				/>
			)}
		</button>
	);
}
