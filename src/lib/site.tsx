"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Langue, Profil, Texte, Vue } from "@/data/resume";

/* Langue et profil affichés. Ils vivent dans l'adresse (?lang=en&profil=ia)
   pour qu'un lien envoyé à un recruteur ouvre directement la bonne version. */

const PROFILS_VALIDES: Vue[] = ["tout", "ia", "electrique", "projet"];

type Site = {
  langue: Langue;
  vue: Vue;
  changerLangue: (l: Langue) => void;
  changerVue: (v: Vue) => void;
  t: (x: string | Texte) => string;
  visible: (profils?: Profil[]) => boolean;
};

const Contexte = createContext<Site | null>(null);

function ecrireAdresse(langue: Langue, vue: Vue) {
  const p = new URLSearchParams(window.location.search);
  if (langue === "fr") p.delete("lang");
  else p.set("lang", langue);
  if (vue === "tout") p.delete("profil");
  else p.set("profil", vue);
  const q = p.toString();
  window.history.replaceState(null, "", q ? `?${q}` : window.location.pathname);
}

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [langue, setLangue] = useState<Langue>("fr");
  const [vue, setVue] = useState<Vue>("tout");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const l = p.get("lang");
    const v = p.get("profil") as Vue | null;
    if (l === "en") setLangue("en");
    if (v && PROFILS_VALIDES.includes(v)) setVue(v);
  }, []);

  useEffect(() => {
    document.documentElement.lang = langue;
  }, [langue]);

  const site: Site = {
    langue,
    vue,
    changerLangue: (l) => {
      setLangue(l);
      ecrireAdresse(l, vue);
    },
    changerVue: (v) => {
      setVue(v);
      ecrireAdresse(langue, v);
    },
    t: (x) => (typeof x === "string" ? x : x[langue]),
    visible: (profils) => vue === "tout" || !profils || profils.includes(vue as Profil),
  };

  return <Contexte.Provider value={site}>{children}</Contexte.Provider>;
}

export function useSite() {
  const s = useContext(Contexte);
  if (!s) throw new Error("useSite doit être utilisé dans SiteProvider");
  return s;
}
