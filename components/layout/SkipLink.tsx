export function SkipLink({ label }: { label: string }) {
	return (
		<a
			href="#main"
			className="u-meta bg-accent-fill text-on-accent sr-only px-4 py-3 focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200]"
		>
			{label}
		</a>
	);
}
