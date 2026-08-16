import type { Dictionary } from "@/i18n/dictionary";

export function Principles({ dict }: { dict: Dictionary["principles"] }) {
	return (
		<section
			id="principles"
			aria-labelledby="principles-title"
			className="border-rule border-t"
		>
			<div className="grid-page py-[var(--spacing-section)]">
				<header className="col-span-12 lg:col-span-5">
					<p className="u-label text-accent mb-5">{dict.index}</p>
					<h2 id="principles-title" className="text-h1 u-wide max-w-[10ch]">
						{dict.title}
					</h2>
					<p className="text-lead text-text-secondary mt-8 max-w-[38ch]">
						{dict.lead}
					</p>
				</header>

				<div className="border-rule bg-surface-inset relative col-span-12 mt-16 overflow-hidden border-x border-b lg:col-span-6 lg:col-start-7 lg:mt-0 lg:border-t lg:border-l-0">
					<span aria-hidden className="plate-bed absolute inset-0 opacity-40" />
					<div className="relative z-10 p-6 sm:p-10 lg:p-12">
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
