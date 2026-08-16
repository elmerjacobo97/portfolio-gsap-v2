import { ArrowLink } from "@/components/ui/ArrowLink";
import type { Dictionary } from "@/i18n/dictionary";
import { SectionHeader } from "./SectionHeader";

export function AISection({ dict }: { dict: Dictionary["ai"] }) {
	return (
		<section
			id="ai"
			aria-label={dict.title}
			className="border-rule bg-surface-inset text-text border-t"
		>
			<div className="grid-page py-[var(--spacing-section)]">
				<SectionHeader index={dict.index} title={dict.title} lead={dict.lead} />

				<div className="col-span-12 mt-16 grid gap-y-12 md:mt-20 lg:grid-cols-12 lg:gap-x-[var(--spacing-gutter)]">
					<div className="col-span-12 lg:col-span-4">
						<p className="u-label text-accent">{dict.positionLabel}</p>
						<h3 className="text-h2 u-wide mt-5 max-w-[14ch]">
							{dict.positionTitle}
						</h3>
						<p className="text-body text-text-secondary mt-6 max-w-[38ch]">
							{dict.positionBody}
						</p>
						<ArrowLink
							href="#contact"
							tone="action"
							direction="down"
							className="mt-8"
						>
							{dict.cta}
						</ArrowLink>
					</div>

					<div className="border-rule col-span-12 border-t lg:col-span-7 lg:col-start-6">
						{dict.items.map((item, index) => (
							<article
								key={item.title}
								className="border-rule grid grid-cols-[3rem_1fr] gap-5 border-b py-7 md:grid-cols-[4rem_1fr] md:gap-8"
							>
								<span aria-hidden className="u-meta text-accent">
									{String(index + 1).padStart(2, "0")}
								</span>
								<div>
									<h3 className="text-h3 u-wide">{item.title}</h3>
									<p className="text-body text-text-secondary mt-3 max-w-[46ch]">
										{item.body}
									</p>
								</div>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
