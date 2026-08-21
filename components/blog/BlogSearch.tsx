"use client";

import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function normalize(value: string) {
	return value
		.toLocaleLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
}

export function BlogSearch({
	children,
	label,
	placeholder,
	clearLabel,
	noResults,
}: {
	children: React.ReactNode;
	label: string;
	placeholder: string;
	clearLabel: string;
	noResults: string;
}) {
	const rootRef = useRef<HTMLDivElement>(null);
	const [query, setQuery] = useState("");

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const normalizedQuery = normalize(query.trim());
		const cards = Array.from(
			root.querySelectorAll<HTMLElement>("[data-post-search]"),
		);
		let visible = 0;

		for (const card of cards) {
			const matches =
				!normalizedQuery ||
				normalize(card.dataset.postSearch ?? "").includes(normalizedQuery);
			card.hidden = !matches;
			card.setAttribute("aria-hidden", String(!matches));
			if (matches) visible += 1;
		}

		const noResultsMessage = root.querySelector<HTMLElement>(
			"[data-no-results]",
		);
		if (noResultsMessage) noResultsMessage.hidden = visible > 0;
	}, [query]);

	return (
		<div ref={rootRef}>
			<div className="grid-page mt-12 md:mt-16">
				<form
					role="search"
					onSubmit={(event) => event.preventDefault()}
					className="col-span-12 lg:col-span-10 lg:col-start-2"
				>
					<label htmlFor="blog-search" className="u-label text-accent">
						{label}
					</label>
					<div className="border-rule relative mt-3 flex items-center border-y bg-surface-inset">
						<Search
							aria-hidden
							size={18}
							strokeWidth={1.5}
							strokeLinecap="square"
							strokeLinejoin="miter"
							className="text-text-dim ml-4 shrink-0"
						/>
						<input
							id="blog-search"
							value={query}
							onChange={(event) => setQuery(event.target.value)}
							placeholder={placeholder}
							className="text-body text-text placeholder:text-text-dim min-h-12 min-w-0 flex-1 bg-transparent px-3 py-3 outline-none"
						/>
						{query ? (
							<button
								type="button"
								onClick={() => setQuery("")}
								aria-label={clearLabel}
								className="text-text-dim hover:text-accent mr-3 inline-flex shrink-0 p-2 transition-colors duration-200"
							>
								<X
									aria-hidden
									size={16}
									strokeWidth={1.5}
									strokeLinecap="square"
									strokeLinejoin="miter"
								/>
							</button>
						) : null}
					</div>
				</form>
			</div>

			{children}

			<p
				data-no-results
				hidden
				className="text-body text-text-secondary page-pad mt-16 md:mt-20"
			>
				{noResults}
			</p>
		</div>
	);
}
