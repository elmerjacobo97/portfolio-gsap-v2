import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * Legacy blog component, restyled for this site's flat/hairline language.
 * The type only changes the label's voice — no extra colors beyond the tokens.
 */
export function Callout({
	type = "info",
	title,
	children,
}: {
	type?: "info" | "success" | "warning" | string;
	title?: string;
	children?: ReactNode;
}) {
	return (
		<aside className="border-rule bg-surface-inset my-8 border p-5 md:p-6">
			<p className="u-label mb-3">
				<span
					className={cn(
						type === "success" && "text-accent",
						type === "warning" && "text-text",
					)}
				>
					{title ?? type}
				</span>
			</p>
			<div className="text-body text-text-secondary space-y-3">
				{children}
			</div>
		</aside>
	);
}
