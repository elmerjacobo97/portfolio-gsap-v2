import { ArrowLink } from "@/components/ui/ArrowLink";
import { getProject } from "@/data/projects";
import { now } from "@/data/now";
import type { Dictionary } from "@/i18n/dictionary";
import type { Locale } from "@/i18n/config";
import { t } from "@/i18n/t";
import { SectionHeader } from "./SectionHeader";

export function Now({
	dict,
	locale,
}: {
	dict: Dictionary["now"];
	locale: Locale;
}) {
	return (
		<section
			id="now"
			aria-label={dict.title}
			className="border-rule border-t py-[var(--spacing-section)]"
		>
			<div className="grid-page">
				<SectionHeader index={dict.index} title={dict.title} lead={dict.lead} />
			</div>

			<div className="grid-page mt-16 md:mt-20">
				<div className="border-rule col-span-12 border-t lg:col-span-10 lg:col-start-2">
					{now.map((item) => {
						const project = getProject(item.slug);
						if (!project) return null;

						const href = project.liveUrl ?? project.repoUrl;

						return (
							<article
								key={item.slug}
								className="border-rule grid grid-cols-12 gap-x-[var(--spacing-gutter)] gap-y-6 border-b py-8 md:py-10"
							>
								<div className="col-span-12 md:col-span-3">
									<p className="u-meta text-accent">{item.code}</p>
									<p className="u-label text-text-dim mt-2">
										{t(item.kind, locale)}
									</p>
								</div>

								<div className="col-span-12 md:col-span-6">
									<h3 className="text-h2 u-wide">{t(project.title, locale)}</h3>
									<p className="text-body text-text-secondary mt-4 max-w-[48ch]">
										{t(project.summary, locale)}
									</p>
								</div>

								{href ? (
									<ArrowLink
										href={href}
										external
										className="u-meta text-accent col-span-12 self-end md:col-span-3 md:justify-self-end"
									>
										{dict.openLink}
									</ArrowLink>
								) : null}
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
