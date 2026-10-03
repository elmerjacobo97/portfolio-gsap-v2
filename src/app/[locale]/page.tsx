import { notFound } from "next/navigation";

import { getDictionary } from "@/shared/i18n/get-dictionary";
import { hasLocale } from "@/shared/i18n/config";
import { About } from "@/features/portfolio/components/about";
import { Contact } from "@/features/contact/components/contact";
import { Faq } from "@/features/portfolio/components/faq";
// import { Testimonials } from "@/features/portfolio/components/testimonials";
import { Hero } from "@/features/portfolio/components/hero";
import { Experience } from "@/features/portfolio/components/experience";
import { Process } from "@/features/portfolio/components/process";
import { Services } from "@/features/portfolio/components/services";
import { Projects } from "@/features/portfolio/components/projects";
import { GithubActivity } from "@/features/portfolio/components/github-activity";

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
      <Projects dict={dict.projects} locale={locale} />
      <Experience dict={dict.experience} locale={locale} />
      <About dict={dict.about}>
        <GithubActivity dict={dict.projects} />
      </About>
      <Services dict={dict.services} locale={locale} />
      <Process dict={dict.process} locale={locale} />
      {/* <Testimonials dict={dict.testimonials} locale={locale} /> */}
      <Faq dict={dict.faq} locale={locale} />
      <Contact
        dict={dict.contact}
        closeLabel={dict.nav.close}
        locale={locale}
      />
    </main>
  );
}
