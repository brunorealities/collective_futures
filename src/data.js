import { SITE_EN } from './content-en.js';
import { SITE_PT } from './content-pt.js';

export const CONTENT = { en: SITE_EN, pt: SITE_PT };

export const UI = {
  en: {
    brand: 'COLLECTIVE FUTURES',
    home: 'HOME', guideline: 'GUIDELINE', principles: 'PRINCIPLES', resources: 'RESOURCES',
    language: 'PT', menu: 'MENU', close: 'CLOSE',
    heroSubtitle: 'Ethical AI for Communities',
    heroMarquee: 'Collective Futures - Ethical AI for Communities',
    whoTitle: 'WHO IT IS FOR', whoButton: 'ACCESS THE GUIDELINE',
    valuesTitle: 'VALUES', valuesButton: 'VIEW FULL TEXT',
    postersTitle: 'Pollinate these ideas',
    aboutTitle: 'ABOUT',
    seedTitle: 'THIS IS A SEED FOR COLLECTIVE FUTURES!',
    email: 'E-MAIL', message: 'MESSAGE', send: 'SEND',
    toc: 'TABLE OF CONTENTS',
    overview: 'OVERVIEW', who: 'WHO IT IS FOR', diagram: 'DIAGRAM', values: 'VALUES',
    principlesShort: 'PRACTICAL PRINCIPLES', principlesExtended: 'PRINCIPLES (EXTENDED VIEW)',
    manifesto: 'ETHICAL AI FOR COLLECTIVE FUTURES', resourcesSection: 'RESOURCES',
    conclusion: 'CONCLUSION', expectedOutcomes: 'EXPECTED OUTCOMES IN COMMUNITIES', finalMessage: 'FINAL MESSAGE',
    openExtended: 'OPEN EXTENDED VIEW', openResources: 'OPEN RESOURCES',
    principlesPageTitle: 'PRACTICAL PRINCIPLES', principlesPageDeck: 'Extended view with application examples',
    description: 'Description', justification: 'Justification', example: 'Example of application',
    resourcesPageTitle: 'RESOURCES', postersToPollinate: 'POSTERS TO POLLINATE',
    rulesMetrics: 'PRACTICAL PRINCIPLES - RULES & METRICS', safeguards: 'ADDITIONAL SAFEGUARDS',
    governanceKit: 'SUGGESTED GOVERNANCE KIT', license: 'SHORT LICENSE DRAFT FOR COMMUNITY DATA',
    search: 'Search rules, metrics, verification…',
    footer: 'COLLECTIVE FUTURES: A Guideline of Ethical AI for Communities. [2026]<br>A RITO project, inspired by exploratory interviews conducted by <a href="https://unearthodox.org/" target="_blank" rel="noreferrer" class="unearthodox-credit"><img src="/assets/Unearthodox_Primary_Light_RGB.png" alt="Unearthodox" class="unearthodox-credit-logo"></a>, licensed under CC BY-NC 4.0.'
  },
  pt: {
    brand: 'COLLECTIVE FUTURES',
    home: 'INÍCIO', guideline: 'GUIA', principles: 'PRINCÍPIOS', resources: 'RECURSOS',
    language: 'EN', menu: 'MENU', close: 'FECHAR',
    heroSubtitle: 'IA Ética para Comunidades',
    heroMarquee: 'Collective Futures - IA Ética para Comunidades',
    whoTitle: 'PARA QUEM É', whoButton: 'ACESSAR O GUIA',
    valuesTitle: 'VALORES', valuesButton: 'VER TEXTO COMPLETO',
    postersTitle: 'Polinize estas ideias',
    aboutTitle: 'SOBRE',
    seedTitle: 'ESTA É UMA SEMENTE PARA FUTUROS COLETIVOS!',
    email: 'E-MAIL', message: 'MENSAGEM', send: 'ENVIAR',
    toc: 'SUMÁRIO',
    overview: 'VISÃO GERAL', who: 'PARA QUEM É', diagram: 'DIAGRAMA', values: 'VALORES',
    principlesShort: 'PRINCÍPIOS PRÁTICOS', principlesExtended: 'PRINCÍPIOS (VISÃO ESTENDIDA)',
    manifesto: 'IA ÉTICA PARA FUTUROS COLETIVOS', resourcesSection: 'RECURSOS',
    conclusion: 'CONCLUSÃO', expectedOutcomes: 'RESULTADOS ESPERADOS NAS COMUNIDADES', finalMessage: 'MENSAGEM FINAL',
    openExtended: 'ABRIR VISÃO ESTENDIDA', openResources: 'ABRIR RECURSOS',
    principlesPageTitle: 'PRINCÍPIOS PRÁTICOS', principlesPageDeck: 'Visão estendida com exemplos de aplicação',
    description: 'Descrição', justification: 'Justificativa', example: 'Exemplo de aplicação',
    resourcesPageTitle: 'RECURSOS', postersToPollinate: 'PÔSTERES PARA POLINIZAR',
    rulesMetrics: 'PRINCÍPIOS PRÁTICOS - REGRAS & MÉTRICAS', safeguards: 'SALVAGUARDAS ADICIONAIS',
    governanceKit: 'KIT DE GOVERNANÇA SUGERIDO', license: 'MINUTA CURTA DE LICENÇA PARA DADOS COMUNITÁRIOS',
    search: 'Buscar regras, métricas, verificações…',
    footer: 'COLLECTIVE FUTURES: Um Guia de IA Ética para Comunidades. [2026]<br>Um projeto da RITO, inspirado em entrevistas exploratórias conduzidas pela <a href="https://unearthodox.org/" target="_blank" rel="noreferrer" class="unearthodox-credit"><img src="/assets/Unearthodox_Primary_Light_RGB.png" alt="Unearthodox" class="unearthodox-credit-logo"></a>, licenciado sob CC BY-NC 4.0.'
  }
};

export function langFromPath(path = window.location.pathname){
  // English is the primary language at root; /en remains a compatibility alias.
  // Portuguese lives under /pt.
  if(path === '/pt' || path.startsWith('/pt/')) return 'pt';
  return 'en';
}

export function basePath(path = window.location.pathname){
  const lang = langFromPath(path);
  let p = path;
  if(lang === 'en') p = p.replace(/^\/en(?=\/|$)/, '');
  else p = p.replace(/^\/pt(?=\/|$)/, '');
  p = p.replace(/\/$/, '') || '/';
  return p;
}

export function localizePath(path, lang = langFromPath()){
  const clean = path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g,'')}`;
  if(lang === 'pt') return clean === '/' ? '/pt' : `/pt${clean}`;
  return clean;
}

export function otherLanguagePath(path = window.location.pathname){
  const lang = langFromPath(path);
  return localizePath(basePath(path), lang === 'pt' ? 'en' : 'pt') + window.location.hash;
}

export function getSite(){ return CONTENT[langFromPath()]; }
export function getUI(){ return UI[langFromPath()]; }
export function getLang(){ return langFromPath(); }

export function syncDocumentLanguage(){
  const lang = langFromPath();
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
}
