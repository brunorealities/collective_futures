import { getSite, getUI, getLang, basePath, localizePath, syncDocumentLanguage } from './data.js';
import { Header, PrinciplesHeader, Footer, HomeFooterTicker, PrinciplesToc, Section, SectionHeading, Button, Marquee, ImageFrame, DiagramFrame, ValueGrid, ShortPrinciples, GuidelineShortPrinciples, PrincipleTeasers, ExtendedPrinciples, PosterCarousel, FloatingToc, GuidelineLogo, Manifesto, RulesMetrics, Safeguards, GovernanceKit, AsciiHero, ComparativeTable, el, closeLightbox, observeReveals, wireFloatingToc, initAsciiHero } from './components.js';

const app=document.querySelector('#app');

function syncHeaderScrollState(){
  document.documentElement.classList.toggle('header-scrolled', window.scrollY > 2);
}
window.addEventListener('scroll', syncHeaderScrollState, {passive:true});
syncHeaderScrollState();

function paragraphs(items,className='prose'){
  const wrap=el('div',className);(Array.isArray(items)?items:[items]).filter(Boolean).forEach(p=>wrap.append(el('p','',p)));return wrap;
}

function scrollToHash(){
  const id=decodeURIComponent(location.hash.replace(/^#/,''));if(!id){scrollTo({top:0,behavior:'instant'});return;}const target=document.getElementById(id);if(target)target.scrollIntoView({behavior:'smooth',block:'start'});
}

function shell(content,path){
  syncDocumentLanguage();document.body.classList.remove('menu-open-lock');const ui=getUI();app.innerHTML='';
  const header=Header(path);
  app.append(header,content,Footer());
  document.title=path==='/'?'COLLECTIVE FUTURES':`COLLECTIVE FUTURES — ${ui[path.slice(1)]||path.slice(1)}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content',getLang()==='en'?'COLLECTIVE FUTURES — A Guideline of Ethical AI for Communities':'COLLECTIVE FUTURES — Um Guia de IA Ética para Comunidades');
  requestAnimationFrame(()=>{syncHeaderScrollState();observeReveals();wireFloatingToc();initAsciiHero(app);requestAnimationFrame(()=>{scrollToHash();syncHeaderScrollState();})});
}

function Home(){
  const site=getSite(),ui=getUI();const main=el('main','page page-home');
  const hero=AsciiHero();

  const intro=Section('cream','intro');const introInner=el('div','container home-intro reveal');
  const introKey=getLang()==='pt'?'O Guia Collective Futures':'The Collective Futures Guideline';
  const introHtml=site.home.intro.replace(introKey,`<strong>${introKey}</strong>`);
  introInner.append(el('p','home-intro-text',introHtml));intro.append(introInner);

  const who=Section('black','who');const whoInner=el('div','container who-grid');const whoCopy=el('div','who-copy reveal');whoCopy.append(SectionHeading(ui.whoTitle),el('p','who-text',site.home.who),Button(ui.whoButton,'/guideline','light'));
  const diagramSrc=getLang()==='pt'?site.images.ptDiagramPoster:site.images.diagram;const whoDiagram=DiagramFrame(diagramSrc,{home:true});whoDiagram.classList.add('who-diagram','reveal');whoInner.append(whoCopy,whoDiagram);who.append(whoInner);

  const values=Section('brown','values');const valuesInner=el('div','container');valuesInner.append(SectionHeading(ui.valuesTitle),el('p','values-intro reveal',site.home.valuesIntro),ValueGrid());const valuesActions=el('div','section-actions reveal');valuesActions.append(Button(ui.valuesButton,'/guideline','dark'));valuesInner.append(valuesActions);values.append(valuesInner);

  const declaration=Section('brown','declaration');const decInner=el('div','container declaration-inner reveal');decInner.append(el('blockquote','declaration-text',site.home.declaration));declaration.append(decInner);

  const posters=Section('cream','posters');const posterInner=el('div','container');posterInner.append(SectionHeading(ui.postersTitle),PosterCarousel());posters.append(posterInner);

  const about=Section('black','about');const aboutInner=el('div','container about-grid reveal');const aboutHead=SectionHeading(ui.aboutTitle);const aboutCopy=el('div','about-copy');aboutCopy.innerHTML=`<p>${site.home.about}</p><p class="authors">${site.home.authors}</p>`;aboutInner.append(aboutHead,aboutCopy);about.append(aboutInner);

  const seed=Section('green','seed');const seedInner=el('div','container seed-grid reveal');const seedCopy=el('div','seed-copy');seedCopy.append(SectionHeading(ui.seedTitle),el('p','seed-text',site.home.seed));
  const form=el('form','seed-form');form.action='https://formsubmit.co/contato@rito.cc';form.method='POST';form.innerHTML=`<input type="hidden" name="_subject" value="Collective Futures — Website contact"><input type="hidden" name="_captcha" value="false"><label><span>${ui.email}</span><input type="email" name="email" required></label><label><span>${ui.message}</span><textarea name="message" rows="7" required></textarea></label><button type="submit" class="button button-dark">${ui.send}</button>`;seedInner.append(seedCopy,form);seed.append(seedInner);

  main.append(hero,intro,who,values,declaration,posters,about,seed);return main;
}

function Guideline(){
  const site=getSite(),ui=getUI();const main=el('main','page guideline-page');
  const content=el('div','guideline-content');

  const top=Section('black','guideline-top');top.classList.add('principles-logo-cover');
  const topInner=el('div','container principles-logo-cover-inner');topInner.append(el('h1','sr-only',getLang()==='pt'?'COLLECTIVE FUTURES — Um Guia de IA Ética para Comunidades':'COLLECTIVE FUTURES — A Guideline of Ethical AI for Communities'),GuidelineLogo());top.append(topInner);
  const toc=PrinciplesToc();

  const overview=Section('cream','overview');const ov=el('div','container editorial-grid');ov.append(SectionHeading(ui.overview),paragraphs(site.guideline.overview,'prose prose-large'));const ovValues=el('div','overview-values reveal');ovValues.append(el('p','overview-values-intro',site.guideline.overviewValues.intro));const ul=el('ul','overview-values-list');site.guideline.overviewValues.bullets.forEach(b=>ul.append(el('li','',b)));ovValues.append(ul);ov.append(el('div','editorial-spacer'),ovValues);overview.append(ov);

  const who=Section('brown','who');const wg=el('div','container editorial-grid');const whoText=paragraphs(site.guideline.who,'prose');whoText.append(el('blockquote','inline-declaration',site.guideline.declaration));wg.append(SectionHeading(ui.who),whoText);who.append(wg);

  const diagram=Section('black','diagram');const dg=el('div','container diagram-section');
  const guideDiagram=DiagramFrame(getLang()==='pt'?site.images.ptDiagramPoster:site.images.diagram,{home:false});guideDiagram.classList.add('guideline-diagram','reveal');
  dg.append(SectionHeading(getLang()==='pt'?'VALORES E PRINCÍPIOS PRÁTICOS':'VALUES AND PRACTICAL PRINCIPLES',getLang()==='en'?'DIAGRAM':''),guideDiagram);diagram.append(dg);

  const values=Section('brown','values');const vg=el('div','container');vg.append(SectionHeading(ui.values),ValueGrid());values.append(vg);

  const principles=Section('black','principles');const pg=el('div','container');pg.append(GuidelineShortPrinciples());principles.append(pg);
  const principleTeaser=Section('cream','principles-teaser');const ptg=el('div','container');
  const extendedTeaserTitle=getLang()==='pt'?'PRINCÍPIOS':'PRACTICAL PRINCIPLES';
  const extendedTeaserDeck=getLang()==='pt'?'VERSÃO ESTENDIDA COM EXEMPLOS DE APLICAÇÃO':'EXTENDED VERSION WITH APPLICATION EXAMPLES';
  ptg.append(SectionHeading(extendedTeaserTitle,extendedTeaserDeck),PrincipleTeasers(2,true));principleTeaser.append(ptg);

  const manifesto=Section('brown','manifesto');const mg=el('div','container manifesto-section');mg.append(SectionHeading('MANIFESTO',ui.manifesto),Manifesto(site.guideline.manifesto));manifesto.append(mg);

  const resources=Section('green','resources');const rg=el('div','container resources-brief reveal');
  const resourcesCopy=el('div','resources-brief-copy');
  resourcesCopy.append(SectionHeading(ui.resourcesSection),el('p','resources-brief-text',site.guideline.resources),Button(ui.openResources,'/resources','dark'));
  const teaser=el('div','resources-teaser-posters');
  site.posters.slice(0,3).forEach((src,i)=>{const fig=el('figure','resources-teaser-poster');const img=el('img');img.src=src;img.alt=`Poster teaser ${i+1}`;img.loading='lazy';fig.append(img);teaser.append(fig);});
  rg.append(resourcesCopy,teaser);resources.append(rg);

  const conclusion=Section('cream','conclusion');const cg=el('div','container conclusion-grid');
  const expected=el('div','conclusion-block conclusion-expected reveal');expected.append(el('h3','conclusion-subtitle title-subsection',ui.expectedOutcomes),paragraphs(site.guideline.conclusion,'prose conclusion-copy'));
  const final=el('div','final-message conclusion-block reveal');final.append(el('h3','final-message-title title-subsection',ui.finalMessage),paragraphs(site.guideline.final,'prose'));
  cg.append(SectionHeading(ui.conclusion),expected,final);conclusion.append(cg);

  const about=Section('black','about');const aboutInner=el('div','container about-grid reveal');const aboutHead=SectionHeading(ui.aboutTitle);const aboutCopy=el('div','about-copy');aboutCopy.innerHTML=`<p>${site.home.about}</p><p class="authors">${site.home.authors}</p>`;aboutInner.append(aboutHead,aboutCopy);about.append(aboutInner);

  content.append(overview,who,diagram,values,principles,principleTeaser,manifesto,resources,conclusion,about);
  main.append(top,toc,content);return main;
}

function Principles(){
  const ui=getUI();const main=el('main','page principles-page');
  const hero=Section('black','principles-top');hero.classList.add('principles-page-intro');
  const hi=el('div','container principles-page-intro-inner reveal');
  const title=getLang()==='pt'?'PRINCÍPIOS':'PRACTICAL PRINCIPLES';
  const deck=getLang()==='pt'?'VERSÃO ESTENDIDA COM EXEMPLOS DE APLICAÇÃO':'EXTENDED VERSION WITH APPLICATION EXAMPLES';
  hi.append(SectionHeading(title,deck,{level:1,size:'page'}));hero.append(hi);
  const list=Section('cream','extended-list');const li=el('div','container');li.append(PrincipleTeasers(null,false));list.append(li);
  const table=Section('green','comparative');const ti=el('div','container');ti.append(SectionHeading(getLang()==='en'?'PRACTICAL PRINCIPLES - COMPARATIVE TABLE':'PRINCÍPIOS PRÁTICOS - TABELA COMPARATIVA'));if(getSite().comparativeTable){ti.append(ComparativeTable(getSite().comparativeTable));}else{ti.append(ImageFrame(getSite().images.comparative,'Practical Principles Comparative Table','comparative-image reveal'));}table.append(ti);
  main.append(hero,list,table);return main;
}

function Resources(){
  const site=getSite(),ui=getUI();const main=el('main','page resources-page');
  const hero=Section('black','resources-top');const hi=el('div','container resources-hero reveal');hi.append(SectionHeading(ui.resourcesPageTitle,'',{level:1,size:'page'}),el('nav','resources-toc',`<a href="#posters">${ui.postersToPollinate}</a><a href="#rules">${ui.rulesMetrics}</a><a href="#safeguards">${ui.safeguards}</a><a href="#kit">${ui.governanceKit}</a><a href="#license">${ui.license}</a>`));hero.append(hi);

  const posters=Section('cream','posters');const pi=el('div','container');pi.append(SectionHeading(ui.postersToPollinate),PosterCarousel());posters.append(pi);
  const rules=Section('green','rules');const ri=el('div','container');const rulesHeading=getLang()==='pt'?SectionHeading('PRINCÍPIOS PRÁTICOS','REGRAS & MÉTRICAS'):SectionHeading('PRACTICAL PRINCIPLES','RULES & METRICS');ri.append(rulesHeading,el('p','resources-intro reveal',site.resources.intro),RulesMetrics());rules.append(ri);
  const safeguards=Section('cream','safeguards');const si=el('div','container');si.append(SectionHeading(ui.safeguards));if(site.resources.safeguardsIntro)si.append(el('p','resources-intro reveal',site.resources.safeguardsIntro));si.append(Safeguards());safeguards.append(si);
  const kit=Section('brown','kit');const ki=el('div','container');ki.append(SectionHeading(ui.governanceKit),el('p','resources-intro reveal',site.resources.kitIntro),GovernanceKit());kit.append(ki);
  const license=Section('cream','license');const lc=el('div','container license-card reveal');lc.append(SectionHeading(ui.license),el('blockquote','license-text',site.resources.license));license.append(lc);
  main.append(hero,posters,rules,safeguards,kit,license);return main;
}

const routes={'/':Home,'/guideline':Guideline,'/principles-extended':Principles,'/resources':Resources};
function render(){const p=basePath();const fn=routes[p]||Home;shell(fn(),routes[p]?p:'/');}

document.addEventListener('click',e=>{
  const a=e.target.closest('a[data-route="true"]');if(!a)return;const url=new URL(a.href,location.origin);if(url.origin!==location.origin)return;e.preventDefault();history.pushState({},'',url.pathname+url.hash);render();
});
document.addEventListener('click',e=>{if(e.target.id==='lightbox')closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeLightbox()});
window.addEventListener('popstate',render);render();
