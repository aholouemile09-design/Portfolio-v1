import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";
import { ReactLight } from "@/components/ui/svgs/reactLight";
import { NextjsIconDark } from "@/components/ui/svgs/nextjsIconDark";
import { Typescript } from "@/components/ui/svgs/typescript";
import { Nodejs } from "@/components/ui/svgs/nodejs";
import { Python } from "@/components/ui/svgs/python";

/* Tout le contenu du site. Chaque texte existe en français et en anglais ;
   « profils » limite un élément aux profils cités (absent : visible partout). */

export type Langue = "fr" | "en";
export type Profil = "ia" | "electrique" | "projet";
export type Vue = "tout" | Profil;
export type Texte = { fr: string; en: string };

// cv : le CV ciblé du profil (en anglais), produit par cv/generer_cv.py.
export const PROFILS: { cle: Vue; libelle: Texte; cv?: string }[] = [
  { cle: "tout", libelle: { fr: "Vue d'ensemble", en: "Overview" } },
  { cle: "ia", libelle: { fr: "IA et ML", en: "AI & ML" }, cv: "/cv/CV_Emile_Aholou_AI-ML.pdf" },
  {
    cle: "electrique",
    libelle: { fr: "Génie électrique", en: "Electrical engineering" },
    cv: "/cv/CV_Emile_Aholou_Electrical-Engineering.pdf",
  },
  {
    cle: "projet",
    libelle: { fr: "Gestion de projet", en: "Project management" },
    cv: "/cv/CV_Emile_Aholou_Project-Management.pdf",
  },
];

export const DATA = {
  name: "Kossi Edem Emile Aholou",
  prenom: "Emile",
  initials: "EA",
  url: "https://oltavia.com",
  avatarUrl: "/emile.jpg",

  accroche: {
    tout: {
      fr: "Ingénieur électricien et gestionnaire de projet, je construis aujourd'hui des outils d'intelligence artificielle. Fondateur de Xodyia, à Edmonton.",
      en: "Electrical engineer and project manager, now building artificial intelligence tools. Founder of Xodyia, in Edmonton.",
    },
    ia: {
      fr: "Ingénieur de formation, je conçois des outils d'IA que les entreprises utilisent vraiment : recherche documentaire, tuteur IA, automatisation.",
      en: "Engineer by training, I design AI tools that businesses actually use: document search, AI tutoring, automation.",
    },
    electrique: {
      fr: "Ingénieur électricien : distribution d'énergie en moyenne et basse tension et projets solaires, de l'étude au chantier.",
      en: "Electrical engineer: medium- and low-voltage power distribution and solar projects, from design review to site delivery.",
    },
    projet: {
      fr: "Gestionnaire de projet depuis plus de 5 ans en énergie, construction et santé communautaire, au Togo puis au Canada.",
      en: "Project manager with 5+ years in energy, construction and community health, first in Togo, then in Canada.",
    },
  } satisfies Record<Vue, Texte>,

  resume: {
    tout: {
      fr: "Diplômé en génie électrique (équivalence WES : baccalauréat et maîtrise en ingénierie), j'ai dirigé des projets d'énergie et de construction au Togo, de la filiale solaire **ARESS Togo** aux réseaux de distribution de sa maison mère **CH2000**. Installé à Edmonton depuis 2024, je coordonne des programmes chez **Réseau Santé Alberta** et j'ai fondé **Xodyia**, une entreprise d'agents IA et d'automatisation pour les PME. Je travaille en français et en anglais.",
      en: "An electrical engineering graduate (WES equivalency: bachelor's and master's in engineering), I led energy and construction projects in Togo, from the solar subsidiary **ARESS Togo** to the distribution networks of its parent company **CH2000**. Based in Edmonton since 2024, I coordinate programs at **Réseau Santé Alberta** and founded **Xodyia**, an AI agents and automation company for small businesses. I work in both French and English.",
    },
    ia: {
      fr: "Je suis venu à l'IA avec un réflexe d'ingénieur : partir d'un vrai problème, livrer un outil qui fonctionne, et le tester. Chez **Xodyia**, j'ai conçu un répondeur qui répond uniquement à partir des documents d'une entreprise et refuse d'inventer, ainsi qu'un CRM qui applique la loi canadienne anti-pourriel. J'ai aussi construit **CodeGraft**, une plateforme d'apprentissage avec un tuteur IA. Je suis une formation structurée en apprentissage automatique : Python et données, puis modélisation et déploiement.",
      en: "I came to AI with an engineer's reflex: start from a real problem, ship a tool that works, and test it. At **Xodyia**, I designed an assistant that answers only from a company's own documents and refuses to make things up, and a CRM that enforces Canada's anti-spam law. I also built **CodeGraft**, a learning platform with an AI tutor. I am following a structured machine learning path: Python and data first, then modelling and deployment.",
    },
    electrique: {
      fr: "Ingénieur électricien de formation (équivalence WES : baccalauréat et maîtrise en ingénierie), j'ai commencé dans l'énergie solaire chez **ARESS Togo**, puis dirigé des projets de transport et de distribution d'énergie en moyenne et basse tension chez sa maison mère, **CH2000** : revue et approbation des études, encadrement d'équipes de 20 à 30 personnes, suivi du chantier jusqu'à la livraison. J'utilise AutoCAD Electrical, CANECO et MATLAB.",
      en: "An electrical engineer by training (WES equivalency: bachelor's and master's in engineering), I started in solar energy at **ARESS Togo**, then led medium- and low-voltage power transmission and distribution projects at its parent company, **CH2000**: reviewing and approving designs, leading teams of 20 to 30 people, and following sites through to delivery. I work with AutoCAD Electrical, CANECO and MATLAB.",
    },
    projet: {
      fr: "Je pilote des projets depuis plus de 5 ans : budgets, échéanciers, risques, fournisseurs et parties prenantes. Chez **CH2000**, j'ai réduit les délais de réalisation d'au moins 15 % ; chez **Desco**, j'ai réduit les dépassements budgétaires de 15 %. Aujourd'hui, je coordonne des programmes en santé communautaire chez **Réseau Santé Alberta**. J'ai suivi la formation préparatoire au PMP (36 heures) et je prépare la certification.",
      en: "I have been running projects for more than 5 years: budgets, schedules, risks, suppliers and stakeholders. At **CH2000**, I cut project completion times by at least 15%; at **Desco**, I reduced budget overruns by 15%. Today, I coordinate community health programs at **Réseau Santé Alberta**. I completed the 36-hour PMP preparation course and am preparing for the certification.",
    },
  } satisfies Record<Vue, Texte>,

  skills: [
    { name: "Python", icon: Python, apercu: true, profils: ["ia"] },
    { name: "TypeScript", icon: Typescript, apercu: true, profils: ["ia"] },
    { name: "JavaScript", profils: ["ia"] },
    { name: "Node.js", icon: Nodejs, profils: ["ia"] },
    { name: "React", icon: ReactLight, profils: ["ia"] },
    { name: "Next.js", icon: NextjsIconDark, apercu: true, profils: ["ia"] },
    { name: "SQL", profils: ["ia"] },
    { name: "Supabase", profils: ["ia"] },
    { name: "API Claude", apercu: true, profils: ["ia"] },
    { name: { fr: "Recherche d'information (BM25)", en: "Information retrieval (BM25)" }, profils: ["ia"] },
    { name: "Git", profils: ["ia"] },
    { name: "AutoCAD Electrical", apercu: true, profils: ["electrique"] },
    { name: "CANECO", apercu: true, profils: ["electrique"] },
    { name: "MATLAB", profils: ["electrique"] },
    { name: "LabVIEW", profils: ["electrique"] },
    { name: { fr: "Distribution MT/BT", en: "MV/LV distribution" }, profils: ["electrique"] },
    { name: { fr: "Énergie solaire", en: "Solar energy" }, profils: ["electrique"] },
    { name: { fr: "Lecture de plans et spécifications", en: "Drawings and specifications review" }, profils: ["electrique"] },
    { name: "MS Project", apercu: true, profils: ["projet", "electrique"] },
    { name: "Primavera P6", apercu: true, profils: ["projet", "electrique"] },
    { name: { fr: "Gestion des risques", en: "Risk management" }, apercu: true, profils: ["projet"] },
    { name: { fr: "Budgets et estimations", en: "Budgets and estimates" }, profils: ["projet", "electrique"] },
    { name: { fr: "Approvisionnement", en: "Procurement" }, profils: ["projet"] },
    { name: { fr: "Rapports d'avancement", en: "Status reporting" }, profils: ["projet"] },
    { name: { fr: "Parties prenantes", en: "Stakeholder management" }, profils: ["projet"] },
    { name: { fr: "Français et anglais", en: "French and English" }, apercu: true },
  ] as {
    name: string | Texte;
    icon?: React.ComponentType<{ className?: string }>;
    profils?: Profil[];
    apercu?: true; // retenue dans la vue d'ensemble
  }[],

  navbar: [{ href: "#hero", icon: HomeIcon, label: { fr: "Accueil", en: "Home" } }],

  contact: {
    email: "aholou.emile09@gmail.com",
    social: {
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/kossi-edem-emile-d-aholou-2023a5194/",
        icon: Icons.linkedin,
        navbar: true,
      },
      GitHub: {
        name: "GitHub",
        url: "https://github.com/aholouemile09-design",
        icon: Icons.github,
        navbar: true,
      },
      email: {
        name: "Email",
        url: "mailto:aholou.emile09@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Xodyia",
      href: "https://xodyia.com",
      title: { fr: "Fondateur", en: "Founder" },
      location: "Edmonton, Alberta",
      start: { fr: "sept. 2026", en: "Sep 2026" },
      end: null,
      description: {
        fr: "Entreprise d'agents IA et d'automatisation pour les PME. Conception de trois produits de démonstration (prise de rendez-vous, répondeur documentaire, suivi des demandes), d'un CRM de prospection conforme à la LCAP et de la stratégie commerciale.",
        en: "AI agents and automation company for small businesses. Designed three demo products (appointment booking, document-based answering assistant, enquiry follow-up), a prospecting CRM compliant with Canada's anti-spam law, and the go-to-market strategy.",
      },
    },
    {
      company: "Réseau Santé Alberta",
      href: "",
      title: { fr: "Agent de développement", en: "Development Agent" },
      location: "Edmonton, Alberta",
      start: { fr: "oct. 2024", en: "Oct 2024" },
      end: null,
      description: {
        fr: "Coordination des échéanciers de programmes, des communications avec les partenaires et des rapports d'avancement dans le centre de l'Alberta. Rédaction de la documentation destinée aux partenaires, en français et en anglais.",
        en: "Coordinate program schedules, partner communications and progress reporting across central Alberta. Prepare documentation for partner review, in French and English.",
      },
    },
    {
      company: "Desco",
      href: "",
      title: { fr: "Chef de projet, construction", en: "Construction Project Manager" },
      location: "Lomé, Togo",
      start: { fr: "janv. 2023", en: "Jan 2023" },
      end: { fr: "avr. 2024", en: "Apr 2024" },
      description: {
        fr: "Gestion de projets de construction en plusieurs phases : budgets, échéanciers, suivi des risques et rapports mensuels aux clients. Coordination des entrepreneurs et des consultants. Dépassements budgétaires réduits de 15 %.",
        en: "Managed multi-phase construction projects: budgets, schedules, risk tracking and monthly client reports. Coordinated contractors and consultants. Reduced budget overruns by 15%.",
      },
    },
    {
      company: "CH2000 (Conglomerate Horizon 2000)",
      href: "",
      title: {
        fr: "Engineering Manager, transport et distribution d'énergie",
        en: "Engineering Manager, Energy Transport & Distribution",
      },
      location: "Lomé, Togo",
      start: { fr: "janv. 2021", en: "Jan 2021" },
      end: { fr: "déc. 2022", en: "Dec 2022" },
      description: {
        fr: "Direction de projets de transport et de distribution d'énergie en moyenne et basse tension. Revue et approbation des études techniques, encadrement d'équipes de 20 à 30 personnes. Délais réduits d'au moins 15 %, productivité en hausse de 20 %, et un nouveau contrat obtenu auprès du même client.",
        en: "Led medium- and low-voltage power transmission and distribution projects. Reviewed and approved engineering designs, led teams of 20 to 30 people. Cut completion times by at least 15%, raised productivity by 20%, and won a follow-up contract with the same client.",
      },
    },
    {
      company: "ARESS Togo",
      href: "",
      title: { fr: "Coordonnateur de projets, énergie solaire", en: "Project Coordinator, Solar Energy" },
      location: "Lomé, Togo",
      start: { fr: "janv. 2019", en: "Jan 2019" },
      end: { fr: "déc. 2020", en: "Dec 2020" },
      description: {
        fr: "Coordination de projets d'énergie solaire au sein de la filiale solaire de CH2000 : estimations de coûts, conseil technique à la direction, protocoles de gestion des risques techniques.",
        en: "Coordinated solar energy projects within CH2000's solar subsidiary: cost estimates, technical advice to management, technical risk management protocols.",
      },
    },
  ] as {
    company: string;
    href: string;
    title: Texte;
    location: string;
    start: Texte;
    end: Texte | null;
    description: Texte;
  }[],

  education: [
    {
      school: {
        fr: "Institut de Formation Technique Supérieure (IFTS)",
        en: "Higher Institute of Technical Training (IFTS)",
      },
      href: "",
      degree: {
        fr: "Diplôme d'ingénieur en génie électrique · équivalence WES : baccalauréat et maîtrise en ingénierie",
        en: "Engineering diploma in electrical engineering · WES equivalency: bachelor's and master's in engineering",
      },
      dates: "2018",
    },
    {
      school: { fr: "Université Athabasca", en: "Athabasca University" },
      href: "https://www.athabascau.ca",
      degree: {
        fr: "6 cours du B.Sc. en informatique et systèmes d'information : Python, structures de données, algorithmes, algèbre linéaire",
        en: "6 courses of the B.Sc. in Computing and Information Systems: Python, data structures, algorithms, linear algebra",
      },
      dates: { fr: "2025 à 2026", en: "2025 to 2026" },
    },
  ] as { school: Texte; href: string; degree: Texte; dates: string | Texte }[],

  certifications: [
    {
      nom: {
        fr: "Formation préparatoire au PMP (36 heures) · certification en préparation",
        en: "PMP exam preparation course (36 hours) · certification in progress",
      },
      profils: ["projet"],
    },
    { nom: { fr: "SIMDUT 2015 (WHMIS)", en: "WHMIS 2015" }, profils: ["electrique", "projet"] },
    {
      nom: { fr: "Construction Safety Training System (CSTS)", en: "Construction Safety Training System (CSTS)" },
      profils: ["electrique", "projet"],
    },
  ] as { nom: Texte; profils?: Profil[] }[],

  projects: [
    {
      title: { fr: "Répondeur documentaire · Xodyia", en: "Document-based assistant · Xodyia" },
      dates: "2026",
      profils: ["ia"],
      description: {
        fr: "Un assistant qui répond aux clients d'une entreprise **uniquement à partir de ses documents**, et qui refuse d'inventer. Moteur de recherche BM25 écrit sans dépendance, bilingue, avec des sujets interdits qui déclenchent une passation à un humain. Validé par 75 tests, dont des questions pièges.",
        en: "An assistant that answers a company's customers **only from its own documents**, and refuses to make things up. Dependency-free BM25 search engine, bilingual, with ruled-out topics that trigger a hand-off to a human. Validated by 75 tests, including trick questions.",
      },
      technologies: ["JavaScript", "BM25", { fr: "Recherche d'information", en: "Information retrieval" }],
      image: "/projets/repondeur.jpg",
      links: [],
    },
    {
      title: { fr: "CodeGraft", en: "CodeGraft" },
      dates: "2026",
      profils: ["ia", "projet"],
      description: {
        fr: "Plateforme d'apprentissage en ligne : parcours en apprentissage automatique avec exercices, **tuteur IA branché sur l'API Claude** (règles pédagogiques, limitation des requêtes) et examen blanc PMP de 180 questions bilingues. Comptes utilisateurs et suivi de progression.",
        en: "Online learning platform: a machine learning path with exercises, an **AI tutor built on the Claude API** (teaching guardrails, rate limiting) and a 180-question bilingual PMP mock exam. User accounts and progress tracking.",
      },
      technologies: ["Next.js", "React", "Supabase", "API Claude"],
      image: "/projets/codegraft.jpg",
      links: [
        { type: "Site", href: "https://codegraft.vercel.app", icon: <Icons.globe className="size-3" /> },
        { type: "Code", href: "https://github.com/aholouemile09-design/ml-academy", icon: <Icons.github className="size-3" /> },
      ],
      href: "https://codegraft.vercel.app",
    },
    {
      title: { fr: "CRM de prospection · Xodyia", en: "Prospecting CRM · Xodyia" },
      dates: "2026",
      profils: ["ia", "projet"],
      description: {
        fr: "CRM conçu pour prospecter **dans le respect de la loi canadienne anti-pourriel (LCAP)** : il refuse tout contact sans base légale valide, gère les consentements, leur expiration et les oppositions. Import de listes Excel, détection des doublons, sauvegardes automatiques.",
        en: "A CRM built to prospect **within Canada's anti-spam law (CASL)**: it refuses any contact without a valid legal basis and tracks consent, its expiry and opt-outs. Excel list import, duplicate detection, automatic backups.",
      },
      technologies: ["Node.js", "SQLite", "Python"],
      links: [],
    },
    {
      title: { fr: "Démonstrations interactives · Xodyia", en: "Interactive demos · Xodyia" },
      dates: "2026",
      profils: ["ia"],
      description: {
        fr: "Trois démonstrations bilingues que les prospects essaient eux-mêmes, guidés pas à pas : prise de rendez-vous, répondeur documentaire, tri et relance des demandes. Un mode visite commentée sert aussi aux vidéos.",
        en: "Three bilingual demos that prospects try themselves, guided step by step: appointment booking, document-based answering, enquiry sorting and follow-up. A narrated tour mode also powers the videos.",
      },
      technologies: ["JavaScript", "HTML", "CSS"],
      image: "/projets/demonstrations.jpg",
      links: [],
    },
    {
      title: { fr: "Réseaux de distribution MT/BT · CH2000", en: "MV/LV distribution networks · CH2000" },
      dates: { fr: "2021 à 2022", en: "2021 to 2022" },
      profils: ["electrique", "projet"],
      description: {
        fr: "Projets de transport et de distribution d'énergie en moyenne et basse tension, de l'étude au chantier. Revue et approbation des études techniques, coordination d'équipes de 20 à 30 personnes sur plusieurs sites, **délais réduits d'au moins 15 %**.",
        en: "Medium- and low-voltage power transmission and distribution projects, from design to site. Reviewed and approved engineering studies, coordinated teams of 20 to 30 people across sites, **cut completion times by at least 15%**.",
      },
      technologies: ["AutoCAD Electrical", "CANECO", { fr: "MT/BT", en: "MV/LV" }],
      links: [],
    },
    {
      title: { fr: "Projets d'énergie solaire · ARESS Togo", en: "Solar energy projects · ARESS Togo" },
      dates: { fr: "2019 à 2020", en: "2019 to 2020" },
      profils: ["electrique", "projet"],
      description: {
        fr: "Coordination de projets solaires : estimations de coûts pour les projets à venir, conseil technique à la direction et mise en place de protocoles de gestion des risques techniques.",
        en: "Coordinated solar projects: cost estimates for upcoming projects, technical advice to management, and technical risk management protocols.",
      },
      technologies: [{ fr: "Énergie solaire", en: "Solar energy" }, { fr: "Estimation", en: "Estimating" }],
      links: [],
    },
    {
      title: { fr: "Chantiers de construction · Desco", en: "Construction projects · Desco" },
      dates: { fr: "2023 à 2024", en: "2023 to 2024" },
      profils: ["projet"],
      description: {
        fr: "Projets de construction en plusieurs phases : documentation de lancement, de planification et de clôture, revue des offres fournisseurs, rapports mensuels aux clients. **Dépassements budgétaires réduits de 15 %.**",
        en: "Multi-phase construction projects: initiation, planning and closeout documentation, vendor proposal reviews, monthly client reports. **Budget overruns reduced by 15%.**",
      },
      technologies: [{ fr: "Budgets", en: "Budgets" }, { fr: "Risques", en: "Risk" }, { fr: "Approvisionnement", en: "Procurement" }],
      links: [],
    },
    {
      title: { fr: "Lancement de Xodyia", en: "Launching Xodyia" },
      dates: "2026",
      profils: ["projet"],
      description: {
        fr: "Création d'une entreprise de bout en bout : incorporation en Alberta, cahier des charges et suivi du développement du site, plan de prospection, cadrage des premiers pilotes clients.",
        en: "Building a company end to end: incorporation in Alberta, website specifications and development oversight, prospecting plan, scoping of the first client pilots.",
      },
      technologies: [{ fr: "Planification", en: "Planning" }, { fr: "Parties prenantes", en: "Stakeholders" }],
      links: [],
    },
  ] as {
    title: Texte;
    dates: string | Texte;
    profils: Profil[];
    description: Texte;
    technologies: (string | Texte)[];
    links: { type: string; href: string; icon: React.ReactNode }[];
    href?: string;
    image?: string;
    video?: string;
  }[],
};

/* Les libellés fixes de l'interface. */
export const UI = {
  bonjour: { fr: "Bonjour, je suis", en: "Hi, I'm" },
  apropos: { fr: "À propos", en: "About" },
  experience: { fr: "Expérience", en: "Work experience" },
  formation: { fr: "Formation", en: "Education" },
  certifications: { fr: "Formation continue", en: "Professional development" },
  competences: { fr: "Compétences", en: "Skills" },
  projetsBadge: { fr: "Réalisations", en: "Projects" },
  projetsTitre: { fr: "Ce que j'ai construit et dirigé", en: "What I have built and led" },
  projetsTexte: {
    fr: "Des outils d'IA aux réseaux électriques, une sélection de réalisations selon le profil choisi.",
    en: "From AI tools to power networks, a selection of work for the profile you picked.",
  },
  aujourdhui: { fr: "Aujourd'hui", en: "Present" },
  profil: { fr: "Afficher le profil", en: "Show profile" },
  contactBadge: { fr: "Contact", en: "Contact" },
  contactTitre: { fr: "Discutons", en: "Let's talk" },
  contactTexte: {
    fr: "Ouvert aux postes en IA et apprentissage automatique, en génie électrique et en gestion de projet, à Edmonton ou à distance.",
    en: "Open to roles in AI and machine learning, electrical engineering and project management, in Edmonton or remote.",
  },
  ecrire: { fr: "M'écrire", en: "Email me" },
  langue: { fr: "English", en: "Français" },
  cv: { fr: "Télécharger le CV (PDF, en anglais)", en: "Download CV (PDF)" },
  theme: { fr: "Thème", en: "Theme" },
} satisfies Record<string, Texte>;
