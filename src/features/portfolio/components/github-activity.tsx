import { ArrowLink } from "@/shared/components/ui/arrow-link";
import { site } from "@/shared/lib/site";
import type { Dictionary } from "@/shared/i18n/dictionary";

type Day = { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 };

const LEVEL_OPACITY = ["opacity-10", "opacity-30", "opacity-50", "opacity-75", "opacity-100"];

async function getContributions() {
	try {
		const res = await fetch(
			"https://github-contributions-api.jogruber.de/v4/elmerjacobo97?y=last",
			{ next: { revalidate: 86400 }, signal: AbortSignal.timeout(4000) },
		);
		if (!res.ok) return null;
		const data = (await res.json()) as {
			total: { lastYear: number };
			contributions: Day[];
		};
		return { total: data.total.lastYear, days: data.contributions };
	} catch {
		return null;
	}
}

export async function GithubActivity({ dict }: { dict: Dictionary["projects"] }) {
	const activity = await getContributions();
	if (!activity) return null;

	const profile = site.social.find((link) => link.label === "GitHub")?.href;
	const firstWeekday = new Date(`${activity.days[0].date}T00:00:00Z`).getUTCDay();
	const weeks = Math.ceil((firstWeekday + activity.days.length) / 7);

	return (
		<div className="border-rule mt-10 border-t pt-8">
			<div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
				<p className="u-label text-accent">{dict.activityLabel}</p>
				<p className="text-body text-text-secondary">
					<span className="text-text">{activity.total}</span> {dict.activitySummary}
				</p>
			</div>

			<div
				role="img"
				aria-label={`${activity.total} ${dict.activitySummary}`}
				className="mt-6 overflow-x-auto pb-2"
			>
				<div
					style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
					className="grid min-w-[40rem] grid-flow-col grid-rows-7 gap-[3px]"
				>
					{activity.days.map((day, index) => (
						<span
							key={day.date}
							title={`${day.date}: ${day.count}`}
							style={index === 0 ? { gridRowStart: firstWeekday + 1 } : undefined}
							className={`bg-accent-fill block aspect-square ${LEVEL_OPACITY[day.level]}`}
						/>
					))}
				</div>
			</div>

			{profile && (
				<ArrowLink href={profile} external className="mt-4">
					{dict.activityCta}
				</ArrowLink>
			)}
		</div>
	);
}
