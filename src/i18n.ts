export type Lang = 'es' | 'en';
export type Route = 'home' | 'about' | 'contact';

export const getLang = (url: URL): Lang =>
  url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'es';

export const routes: Record<Route, Record<Lang, string>> = {
  home:     { es: '/',          en: '/en/' },
  about:    { es: '/nosotros',  en: '/en/about' },
  contact:  { es: '/contacto',  en: '/en/contact' },
};

export const homePath = routes.home;

const stripSlash = (path: string) => path.replace(/\/$/, '') || '/';

/** Ruta equivalente en el otro idioma; si no hay, la portada de ese idioma. */
export const translatePath = (url: URL, to: Lang): string => {
  const current = stripSlash(url.pathname);
  const match = Object.values(routes).find((r) => Object.values(r).some((p) => stripSlash(p) === current));
  return match ? match[to] : routes.home[to];
};

export const ui = {
  es: {
    nav: [
      { href: routes.home.es,     label: 'Inicio' },
      { href: routes.about.es,    label: 'Nosotros' },
      { href: '/#canales',        label: 'Canales' },
      { href: routes.contact.es,  label: 'Contacto' },
    ],
    homeLabel: 'Upsomedia - Inicio',
    openMenu: 'Abrir menú',
    cta: 'Hablemos',
    switchLabel: 'View in English',
    tagline: 'El medio de entretenimiento más curioso del mundo.',
    sections: 'Secciones',
    contact: 'Contacto',
    rights: 'Todos los derechos reservados.',
    madeIn: ['Hecho con', 'en Santiago, Chile'],
  },
  en: {
    nav: [
      { href: routes.home.en,     label: 'Home' },
      { href: routes.about.en,    label: 'About us' },
      { href: '/en/#canales',     label: 'Channels' },
      { href: routes.contact.en,  label: 'Contact us' },
    ],
    homeLabel: 'Upsomedia - Home',
    openMenu: 'Open menu',
    cta: "Let's talk",
    switchLabel: 'Ver en español',
    tagline: 'The most curious entertainment media company in the world.',
    sections: 'Sections',
    contact: 'Contact',
    rights: 'All rights reserved.',
    madeIn: ['Made with', 'in Santiago, Chile'],
  },
} as const;
