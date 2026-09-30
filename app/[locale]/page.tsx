import { notFound } from "next/navigation";

import { getDictionary } from "@/i18n/get-dictionary";
import { hasLocale } from "@/i18n/config";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
// import { Testimonials } from "@/components/sections/Testimonials";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { GithubActivity } from "@/components/sections/GithubActivity";

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
