import type { Dictionary } from "@/i18n/dictionary";

export function Principles({ dict }: { dict: Dictionary["principles"] }) {
	return (
		<section
			id="principles"
			aria-labelledby="principles-title"
			className="border-rule bg-ink-900 text-text border-t"
		>
			<div className="grid-page py-[var(--spacing-section)]">
				<header className="col-span-12 lg:col-span-5">
					<p className="u-label text-accent mb-5">{dict.index}</p>
					<h2 id="principles-title" className="text-h1 u-wide max-w-[10ch]">
						{dict.title}
					</h2>
					<p className="text-lead text-chalk-200 mt-8 max-w-[38ch]">
						{dict.lead}
					</p>
				</header>

				<div className="border-rule col-span-12 mt-16 border-t lg:col-span-6 lg:col-start-7 lg:mt-0">
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
								<p className="text-body text-chalk-200 mt-3 max-w-[46ch]">
									{item.body}
								</p>
							</div>
						</article>
					))}
				</div>
			</div>
		</section>
	);
}
