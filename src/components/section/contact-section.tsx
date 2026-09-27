"use client";

import { FlickeringGrid } from "@/components/magicui/flickering-grid";
import { DATA, UI } from "@/data/resume";
import { useSite } from "@/lib/site";

export default function ContactSection() {
  const { t } = useSite();
  return (
    <div className="border rounded-xl p-10 relative">
      <div className="absolute -top-4 border bg-primary z-10 rounded-xl px-4 py-1 left-1/2 -translate-x-1/2">
        <span className="text-background text-sm font-medium">{t(UI.contactBadge)}</span>
      </div>
      <div className="absolute inset-0 top-0 left-0 right-0 h-1/2 rounded-xl overflow-hidden">
        <FlickeringGrid
          className="h-full w-full"
          squareSize={2}
          gridGap={2}
          style={{
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />
      </div>
      <div className="relative flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t(UI.contactTitre)}</h2>
        <p className="mx-auto max-w-lg text-muted-foreground text-balance">{t(UI.contactTexte)}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${DATA.contact.email}`}
            className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t(UI.ecrire)}
          </a>
          <a
            href={DATA.contact.social.LinkedIn.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border px-5 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            LinkedIn
          </a>
        </div>
        <p className="text-sm text-muted-foreground">{DATA.contact.email}</p>
      </div>
    </div>
  );
}
