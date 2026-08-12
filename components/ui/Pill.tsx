import { cn } from "@/lib/cn";

/** Availability badge. The dot gets its pulse from GSAP in Phase 2. */
export function Pill({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<span
			className={cn(
				"border-rule u-label text-text inline-flex items-center gap-2.5 border px-3 py-1.5",
				className,
			)}
		>
			<span className="relative flex size-1.5">
				<span className="pill-dot bg-accent-fill absolute inset-0 rounded-full" />
				<span className="bg-accent-fill relative size-1.5 rounded-full" />
			</span>
			{children}
		</span>
	);
}
