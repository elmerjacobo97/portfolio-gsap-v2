import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";

/** Pure renderer of the typed blocks in `data/projects.ts`. */
export function CaseBody({
	project,
	locale,
}: {
	project: Project;
	locale: Locale;
}) {
	return (
		<div className="grid-page py-[var(--spacing-section)]">
			<div className="col-span-12">
				{project.body.map((block, i) => {
					const blockKey =
						block.kind === "list"
							? `list-${block.items.map((item) => item.es).join("|")}`
							: `${block.kind}-${block.text.es}`;

					if (block.kind === "heading") {
						const section = project.body
							.slice(0, i + 1)
							.filter((item) => item.kind === "heading").length;

						return (
							<div
								key={blockKey}
								className="border-rule mt-20 grid grid-cols-12 gap-x-[var(--spacing-gutter)] border-t pt-8 first:mt-0"
							>
								<span className="u-meta text-accent col-span-2 lg:col-span-1">
									{String(section).padStart(2, "0")}
								</span>
								<h2 className="text-h2 u-wide col-span-10 lg:col-span-7 lg:col-start-4">
									{block.text[locale]}
								</h2>
							</div>
						);
					}

					if (block.kind === "para") {
						return (
							<p
								key={blockKey}
								className="text-lead text-text-secondary mt-6 lg:ml-[25%] lg:max-w-[52ch]"
							>
								{block.text[locale]}
							</p>
						);
					}

					return (
						<ul
							key={blockKey}
							className="text-body text-text-secondary mt-8 space-y-0 lg:ml-[25%] lg:max-w-[58ch]"
						>
							{block.items.map((item) => (
								<li
									key={item[locale]}
									className="border-rule flex gap-4 border-t py-4"
								>
									<span aria-hidden className="text-accent shrink-0">
										/
									</span>
									{item[locale]}
								</li>
							))}
						</ul>
					);
				})}
			</div>
		</div>
	);
}
