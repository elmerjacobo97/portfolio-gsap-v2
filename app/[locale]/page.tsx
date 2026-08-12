import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale } from "@/i18n/config";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Now } from "@/components/sections/Now";
import { Process } from "@/components/sections/Process";
import { Principles } from "@/components/sections/Principles";
import { Proof } from "@/components/sections/Proof";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";

export default async function Home({
	params,
}: {
	params: Promise<{ locale: string }>;
}) {
	const { locale } = await params;
	if (!hasLocale(locale)) notFound();

	const dict = await getDictionary(locale);

	return (
		<main id="main">
			<Hero dict={dict.hero} />
			<Work dict={dict.work} locale={locale} />
			<Now dict={dict.now} locale={locale} />
			<About dict={dict.about} />
			<Services dict={dict.services} locale={locale} />
			<Process dict={dict.process} locale={locale} />
			<Principles dict={dict.principles} />
			<Proof dict={dict.proof} />
			<Contact
				dict={dict.contact}
				closeLabel={dict.nav.close}
				locale={locale}
			/>
		</main>
	);
}
