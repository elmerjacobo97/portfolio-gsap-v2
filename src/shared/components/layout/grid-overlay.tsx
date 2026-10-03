/**
 * The visible 12-column bed. Fixed, so it MUST stay outside #smooth-wrapper
 * once ScrollSmoother lands in Phase 2 — a transformed ancestor would make it
 * scroll with the content instead of the viewport.
 */
export function GridOverlay() {
	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 z-0 flex justify-center"
		>
			<div className="grid-page h-full">
				{Array.from({ length: 12 }, (_, i) => (
					<div
						key={i}
						className={
							i < 4
								? "border-rule/45 h-full border-r"
								: "border-rule/45 hidden h-full border-r md:block"
						}
					/>
				))}
			</div>
		</div>
	);
}
