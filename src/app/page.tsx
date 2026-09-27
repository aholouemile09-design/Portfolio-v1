/* eslint-disable @next/next/no-img-element */
"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA, PROFILS, UI } from "@/data/resume";
import { useSite } from "@/lib/site";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Markdown from "react-markdown";
import ContactSection from "@/components/section/contact-section";
import ProjectsSection from "@/components/section/projects-section";
import WorkSection from "@/components/section/work-section";
import { ArrowUpRight, Download } from "lucide-react";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  const { t, vue, changerVue, visible } = useSite();

  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFade delay={BLUR_FADE_DELAY} yOffset={8}>
                <h1 className="text-3xl font-semibold tracking-tighter sm:text-4xl lg:text-5xl">
                  {t(UI.bonjour)} {DATA.prenom}
                </h1>
              </BlurFade>
              {/* La clé relance l'apparition quand l'accroche change. */}
              <BlurFade key={t(DATA.accroche[vue])} delay={BLUR_FADE_DELAY}>
                <p className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl text-pretty">
                  {t(DATA.accroche[vue])}
                </p>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <Avatar className="size-24 md:size-32 border rounded-full shadow-lg ring-4 ring-muted">
                {DATA.avatarUrl && <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />}
                <AvatarFallback className="text-2xl font-semibold">{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>

          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <div
              role="tablist"
              aria-label={t(UI.profil)}
              className="grid grid-cols-2 sm:flex sm:w-fit gap-1 rounded-2xl border bg-muted/50 p-1"
            >
              {PROFILS.map((p) => (
                <button
                  key={p.cle}
                  role="tab"
                  type="button"
                  aria-selected={vue === p.cle}
                  onClick={() => changerVue(p.cle)}
                  className={cn(
                    "rounded-xl px-3 py-1.5 text-sm font-medium transition-colors cursor-pointer",
                    vue === p.cle
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {t(p.libelle)}
                </button>
              ))}
            </div>
          </BlurFade>

          {PROFILS.find((p) => p.cle === vue)?.cv && (
            <BlurFade key={vue} delay={BLUR_FADE_DELAY * 2}>
              <a
                href={PROFILS.find((p) => p.cle === vue)!.cv}
                download
                className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                <Download className="size-4" aria-hidden />
                {t(UI.cv)}
              </a>
            </BlurFade>
          )}
        </div>
      </section>

      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-xl font-bold">{t(UI.apropos)}</h2>
          </BlurFade>
          <BlurFade key={t(DATA.resume[vue])} delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>{t(DATA.resume[vue])}</Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">{t(UI.experience)}</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <WorkSection />
          </BlurFade>
        </div>
      </section>

      <section id="education">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">{t(UI.formation)}</h2>
          </BlurFade>
          <div className="flex flex-col gap-8">
            {DATA.education.map((education, index) => {
              const contenu = (
                <>
                  <div className="flex items-center gap-x-3 flex-1 min-w-0">
                    <div className="size-8 md:size-10 border rounded-full shadow ring-2 ring-border bg-muted flex-none grid place-items-center text-xs font-semibold text-muted-foreground">
                      {t(education.school).charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <div className="font-semibold leading-none flex items-center gap-2">
                        {t(education.school)}
                        {education.href && (
                          <ArrowUpRight
                            className="h-3.5 w-3.5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                            aria-hidden
                          />
                        )}
                      </div>
                      <div className="font-sans text-sm text-muted-foreground">{t(education.degree)}</div>
                    </div>
                  </div>
                  <div className="text-xs tabular-nums text-muted-foreground text-right flex-none">
                    {t(education.dates)}
                  </div>
                </>
              );
              return (
                <BlurFade key={education.school.fr} delay={BLUR_FADE_DELAY * 8 + index * 0.05}>
                  {education.href ? (
                    <Link
                      href={education.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-x-3 justify-between group"
                    >
                      {contenu}
                    </Link>
                  ) : (
                    <div className="flex items-center gap-x-3 justify-between">{contenu}</div>
                  )}
                </BlurFade>
              );
            })}
          </div>

          {DATA.certifications.some((c) => visible(c.profils)) && (
            <BlurFade delay={BLUR_FADE_DELAY * 9}>
              <div className="flex flex-col gap-2">
                <h3 className="text-sm font-semibold">{t(UI.certifications)}</h3>
                <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  {DATA.certifications
                    .filter((c) => visible(c.profils))
                    .map((c) => (
                      <li key={c.nom.fr} className="flex gap-2">
                        <span aria-hidden className="text-foreground">·</span>
                        {t(c.nom)}
                      </li>
                    ))}
                </ul>
              </div>
            </BlurFade>
          )}
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-xl font-bold">{t(UI.competences)}</h2>
          </BlurFade>
          <div key={vue} className="flex flex-wrap gap-2">
            {DATA.skills
              .filter((s) => (vue === "tout" ? s.apercu : visible(s.profils)))
              .map((skill, id) => (
                <BlurFade key={t(skill.name)} delay={BLUR_FADE_DELAY * 10 + id * 0.03}>
                  <div className="border bg-background border-border ring-2 ring-border/20 rounded-xl h-8 w-fit px-4 flex items-center gap-2">
                    {skill.icon && <skill.icon className="size-4 rounded overflow-hidden object-contain" />}
                    <span className="text-foreground text-sm font-medium">{t(skill.name)}</span>
                  </div>
                </BlurFade>
              ))}
          </div>
        </div>
      </section>

      <section id="projects">
        <BlurFade delay={BLUR_FADE_DELAY * 11}>
          <ProjectsSection />
        </BlurFade>
      </section>

      <section id="contact">
        <BlurFade delay={BLUR_FADE_DELAY * 16}>
          <ContactSection />
        </BlurFade>
      </section>
    </main>
  );
}
