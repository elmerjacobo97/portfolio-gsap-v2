import type { Project } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";
import { t } from "@/i18n/t";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Rule } from "@/components/ui/Rule";

export function CaseHeader({
	project,
	locale,
	dict,
}: {
	project: Project;
	locale: Locale;
	dict: Dictionary["work"];
}) {
	const facts = [
		{ label: dict.client, value: t(project.client, locale) },
		{ label: dict.year, value: String(project.year) },
		{ label: dict.role, value: t(project.role, locale) },
		{ label: dict.stack, value: project.stack.join(" · ") },
	];

	return (
		<header className="grid-page pt-40 pb-16">
			<p className="u-label text-accent col-span-12 mb-6">
				{dict.caseLabel} / {project.slug}
			</p>
			<h1 className="text-display u-wide col-span-12">
				{t(project.title, locale)}
			</h1>

			<p className="text-lead text-text-secondary col-span-12 mt-8 max-w-[46ch] lg:col-span-6">
				{t(project.tagline, locale)}
			</p>

			<p className="u-wide col-span-12 mt-8 text-right text-[clamp(4rem,12vw,11rem)] leading-[0.72] text-transparent [-webkit-text-stroke:1px_var(--color-outline)] lg:col-span-5 lg:col-start-8 lg:mt-0">
				{String(project.year).slice(-2)}
			</p>

			<Rule className="col-span-12 mt-16" />

			<dl className="col-span-12 mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
				{facts.map((fact) => (
					<div key={fact.label}>
						<dt className="u-label">{fact.label}</dt>
						<dd className="u-meta text-text mt-2">{fact.value}</dd>
					</div>
				))}
			</dl>

			{project.liveUrl || project.repoUrl ? (
				<div className="u-meta col-span-12 mt-10 flex flex-wrap gap-8">
					{project.liveUrl ? (
						<ArrowLink href={project.liveUrl} external>
							{dict.liveSite}
						</ArrowLink>
					) : null}
					{project.repoUrl ? (
						<ArrowLink href={project.repoUrl} external>
							{dict.repository}
						</ArrowLink>
					) : null}
				</div>
			) : null}
		</header>
	);
}
