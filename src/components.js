import { getSite, getUI, getLang, localizePath, otherLanguagePath } from './data.js';

export const el = (tag, className = '', html = '') => {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (html !== undefined && html !== null) n.innerHTML = html;
  return n;
};

export function routeLink(label, path, className=''){
  const a = el('a', className, label);
  a.href = localizePath(path);
  a.dataset.route = 'true';
  return a;
}

export function externalLink(label, href, className=''){
  const a = el('a', className, label);
  a.href = href;
  if(href.startsWith('http')){ a.target='_blank'; a.rel='noreferrer'; }
  return a;
}

export function Header(currentBasePath){
  const ui = getUI();
  const lang = getLang();
  const header = el('header','site-header');
  const inner = el('div','header-inner');
  inner.append(routeLink(ui.brand,'/','brand'));

  const toggle = el('button','menu-toggle',ui.menu);
  toggle.type='button';
  toggle.setAttribute('aria-expanded','false');

  const nav = el('nav','main-nav');
  [[ui.home,'/'],[ui.guideline,'/guideline'],[ui.principles,'/principles-extended'],[ui.resources,'/resources']].forEach(([label,path])=>{
    const a=routeLink(label,path,'nav-link');
    if(currentBasePath===path) a.classList.add('active');
    nav.append(a);
  });
  const langLink = el('a','language-link',ui.language);
  langLink.href = otherLanguagePath();
  langLink.dataset.route = 'true';
  langLink.setAttribute('aria-label', lang === 'en' ? 'Português' : 'English');
  nav.append(langLink);

  toggle.addEventListener('click',()=>{
    const open=header.classList.toggle('menu-open');
    document.body.classList.toggle('menu-open-lock',open);
    toggle.setAttribute('aria-expanded',String(open));
    toggle.textContent=open?ui.close:ui.menu;
  });
  inner.append(toggle,nav); header.append(inner); return header;
}

export function PrinciplesHeader(){
  const ui = getUI();
  const lang = getLang();
  const header = el('header','site-header principles-minimal-header');
  const inner = el('div','header-inner principles-minimal-inner');
  inner.append(routeLink(ui.brand,'/','brand'));
  const langLink = el('a','language-link',lang === 'en' ? 'PT/BR' : 'EN');
  langLink.href = otherLanguagePath();
  langLink.dataset.route = 'true';
  langLink.setAttribute('aria-label', lang === 'en' ? 'Português' : 'English');
  inner.append(langLink);
  header.append(inner);
  return header;
}

export function PrinciplesToc(){
  const lang=getLang();
  const wrap=el('section','principles-toc-section');
  const inner=el('div','container principles-toc-inner');
  inner.append(el('div','principles-toc-kicker',lang==='en'?'TABLE OF CONTENTS':'SUMÁRIO'));
  const grid=el('div','principles-toc-grid');
  const cards = lang==='en' ? [
    {title:'OVERVIEW', path:'/guideline#overview', subtitles:['THE GUIDELINE','WHO IS IT FOR']},
    {title:'VALUES AND<br>PRINCIPLES', path:'/guideline#diagram', subtitles:['DIAGRAM','SHORT VIEW']},
    {title:'PRACTICAL<br>PRINCIPLES', path:'/guideline#short-principles', subtitles:['EXTENDED VIEW WITH<br>APPLICATION EXAMPLES']},
    {title:'MANIFESTO', path:'/guideline#manifesto', subtitles:['ETHICAL AI FOR<br>COLLECTIVE FUTURES']},
    {title:'RESOURCES', path:'/guideline#resources', subtitles:['OPERATIONAL KIT','POSTERS TO POLLINATE']},
    {title:'CONCLUSION', path:'/guideline#conclusion', subtitles:['EXPECTED OUTCOMES','FINAL MESSAGE']}
  ] : [
    {title:'VISÃO GERAL', path:'/guideline#overview', subtitles:['O GUIA','PARA QUEM']},
    {title:'VALORES E<br>PRINCÍPIOS', path:'/guideline#diagram', subtitles:['VISÃO CURTA']},
    {title:'PRINCÍPIOS<br>PRÁTICOS', path:'/guideline#short-principles', subtitles:['VISÃO ESTENDIDA COM<br>EXEMPLOS DE APLICAÇÃO']},
    {title:'MANIFESTO', path:'/guideline#manifesto', subtitles:['IA ÉTICA PARA<br>FUTUROS COLETIVOS']},
    {title:'RECURSOS', path:'/guideline#resources', subtitles:['KIT OPERACIONAL','PÔSTERES PARA POLINIZAR']},
    {title:'CONCLUSÃO', path:'/guideline#conclusion', subtitles:['RESULTADOS ESPERADOS','MENSAGEM FINAL']}
  ];
  cards.forEach(card=>{
    const article=el('article','principles-toc-card');
    const title=el('h3','principles-toc-card-title title-card');
    title.append(routeLink(card.title,card.path,'principles-toc-title-link'));
    article.append(title);
    const subtitles=el('div','principles-toc-card-links');
    card.subtitles.forEach(label=>subtitles.append(el('span','principles-toc-card-subtitle',label)));
    article.append(subtitles);grid.append(article);
  });
  inner.append(grid);wrap.append(inner);return wrap;
}

export function HomeFooterTicker(){
  const outer=el('div','home-footer-ticker');
  const track=el('div','home-footer-ticker-track');
  const phrase=()=>{
    const span=el('span','home-footer-ticker-item');
    span.append(document.createTextNode('COLLECTIVE FUTURES: A Guideline of Ethical AI for Communities. [2025] A project by UNEARTHODOX and RITO, licenced under '));
    const cc=externalLink('CC BY-NC 4.0','https://creativecommons.org/licenses/by-nc/4.0/','home-footer-ticker-link');
    span.append(cc,document.createTextNode('.'));
    return span;
  };
  for(let i=0;i<4;i++) track.append(phrase());
  outer.append(track);return outer;
}

export function Footer(){
  const ui=getUI(), site=getSite();
  const footer=el('footer','site-footer');
  const top=el('div','footer-top');
  top.append(el('p','footer-copy',ui.footer));
  const cc=externalLink('', 'https://creativecommons.org/licenses/by-nc/4.0/','footer-license-link');
  const ccImg=el('img','footer-license'); ccImg.src=site.images.license; ccImg.alt='CC BY-NC 4.0'; cc.append(ccImg); top.append(cc);

  const bottom=el('div','footer-bottom');
  const logos=el('div','footer-logos');
  const u=externalLink('','https://unearthodox.org','partner-link'); const uiImg=el('img','partner-logo');uiImg.src=site.images.unearthodox;uiImg.alt='Unearthodox';u.append(uiImg);
  const r=externalLink('','https://rito.cc','partner-link'); const rImg=el('img','partner-logo');rImg.src=site.images.rito;rImg.alt='Rito';r.append(rImg); logos.append(u,r);
  const contact=el('div','footer-contact');
  contact.append(externalLink('@_unearthodox','https://www.instagram.com/_unearthodox/','footer-contact-link'),externalLink('@rito.cc','https://www.instagram.com/rito.cc/','footer-contact-link'),externalLink('contato@rito.cc','mailto:contato@rito.cc','footer-contact-link'));
  bottom.append(logos,contact); footer.append(top,bottom); return footer;
}

export function Section(theme='cream', id=''){
  const s=el('section',`section theme-${theme}`); if(id)s.id=id; return s;
}

export function SectionHeading(title, subtitle='', options={}){
  if(subtitle && typeof subtitle === 'object'){
    options=subtitle;
    subtitle=options.subtitle || '';
  }
  const level=Math.min(4,Math.max(1,Number(options.level || 2)));
  const size=options.size || (level===1?'page':level===2?'section':level===3?'subsection':'detail');
  const tag=`h${level}`;
  const extra=options.className ? ` ${options.className}` : '';
  const h=el('div',`section-heading heading-${size} reveal${extra}`);
  if(title) h.append(el(tag,`section-title title-${size}`,title));
  if(subtitle) h.append(el('p','section-subtitle',subtitle));
  return h;
}

export function Button(label,path,variant='dark'){
  return routeLink(label,path,`button button-${variant}`);
}

export function Marquee(text){
  const outer=el('div','marquee');
  const track=el('div','marquee-track');
  const phrase=`${text}  ✦  `;
  track.innerHTML=Array(8).fill(`<span>${phrase}</span>`).join(''); outer.append(track); return outer;
}

export function ImageFrame(src, alt='', className=''){
  const f=el('figure',`image-frame ${className}`); const img=el('img'); img.src=src; img.alt=alt; img.loading='lazy'; f.append(img); return f;
}

export function DiagramFrame(src, {home=false}={}){
  const lang=getLang();
  const f=el('figure',`image-frame diagram-art ${home?'diagram-art-home':'diagram-art-guide'} diagram-art-${lang}`);
  f.style.cursor='pointer';
  f.setAttribute('title', lang==='en'?'Click to expand':'Clique para ampliar');
  f.onclick=(e)=>{
    e.preventDefault();
    openLightbox(src, lang==='en'?'Collective Futures Diagram':'Diagrama Collective Futures');
  };
  const img=el('img');img.src=src;img.alt='Collective Futures diagram';img.loading='lazy';f.append(img);

  if(home){
    f.append(el('span','diagram-mask diagram-mask-top',''),el('span','diagram-mask diagram-mask-site',''));
  }else{
    f.append(el('span','diagram-mask diagram-mask-top',''));
    const copy=el('div','diagram-updated-copy');
    copy.innerHTML=lang==='en'
      ? '<strong>COLLECTIVE FUTURES: A Guideline of Ethical AI for Communities. [2026]</strong><br>A project by RITO, in partnership with UNEARTHODOX, licensed under CC BY-NC 4.0.'
      : '<strong>COLLECTIVE FUTURES: Um Guia de IA Ética para Comunidades. [2026]</strong><br>Um projeto da RITO, em parceria com a UNEARTHODOX, licenciado sob CC BY-NC 4.0.';
    f.append(copy);
  }

  if(lang==='en'){
    f.append(el('span','diagram-mask diagram-mask-principle6',''));
    f.append(el('div','diagram-principle6','Harm Prevention and<br>Material Responsibility'));
  }
  return f;
}

export function ValueGrid(){
  const site=getSite(); const grid=el('div','value-grid');
  site.values.forEach((v,i)=>{
    const card=el('article','value-card reveal');
    const icon=el('img','value-icon');icon.src=v.icon;icon.alt='';
    card.append(el('div','value-index',String(i+1)),icon,el('h3','value-title title-card',v.name),el('p','value-copy',v.description));
    grid.append(card);
  });
  return grid;
}

export function ShortPrinciples(){
  const site=getSite();
  const groups=[];
  site.principles.forEach(p=>{
    const value=p.value;
    let g=groups.find(x=>x.value===value);
    if(!g){g={value,items:[]};groups.push(g);} g.items.push(p);
  });
  const wrap=el('div','short-principles');
  groups.forEach(g=>{
    const group=el('section','principle-group reveal');
    group.append(el('h3','principle-group-title title-subsection',g.value));
    const items=el('div','principle-group-items');
    g.items.forEach(p=>{
      const item=el('article','principle-short');
      item.innerHTML=`<div class="principle-short-number">${p.id}</div><div><h4 class="title-card">${p.shortName||p.name}</h4><p>${p.short}</p></div>`;
      items.append(item);
    });
    group.append(items);wrap.append(group);
  });
  return wrap;
}


export function GuidelineShortPrinciples(){
  const site=getSite(), lang=getLang();
  const groups=[];
  site.principles.forEach(p=>{
    let g=groups.find(x=>x.value===p.value);
    if(!g){g={value:p.value,items:[]};groups.push(g);}
    g.items.push(p);
  });
  const wrap=el('div','guideline-short-principles reveal');
  wrap.id='short-principles';
  const head=el('div','guideline-short-head');
  head.append(el('h2','guideline-short-title title-section',lang==='pt'?'PRINCÍPIOS PRÁTICOS':'PRACTICAL PRINCIPLES'));
  const meta=el('div','guideline-short-meta');
  meta.append(el('span','guideline-short-eyebrow',lang==='pt'?'(diretrizes éticas)':'(ethical guidelines)'),el('strong','guideline-short-label',lang==='pt'?'VISÃO CURTA':'SHORT VIEW'));
  head.append(meta); wrap.append(head);

  const grid=el('div','guideline-short-grid');
  groups.forEach(g=>{
    const group=el('section','guideline-short-group');
    group.append(el('h3','guideline-short-value title-subsection',g.value));
    const list=el('div','guideline-short-items');
    g.items.forEach(p=>{
      const item=el('article','guideline-short-item');
      item.append(el('h4','guideline-short-principle title-card',`${p.id}. ${p.shortName||p.name}`),el('p','guideline-short-copy',p.short));
      list.append(item);
    });
    group.append(list);grid.append(group);
  });
  wrap.append(grid);return wrap;
}

export function PrincipleTeasers(limit=2, showButton=true){
  const site=getSite(), ui=getUI(), lang=getLang();
  const wrap=el('div','principle-teasers');
  const principles=(typeof limit==='number' ? site.principles.slice(0,limit) : site.principles);
  principles.forEach((p,index)=>{
    const value=site.values.find(v=>v.name===p.value) || site.values[0];
    const article=el('article','principle-teaser reveal');
    const top=el('div','principle-teaser-top');
    top.append(el('div','principle-teaser-value',p.value),el('h3','principle-teaser-title title-subsection',`${p.id}. ${p.name}`));
    if(value?.icon){const icon=el('img','principle-teaser-icon');icon.src=value.icon;icon.alt='';top.append(icon);}
    article.append(top);

    const layout=el('div','principle-teaser-layout');
    const left=el('div','principle-teaser-copy');
    left.innerHTML=`<div class="principle-teaser-block"><h4 class="title-detail">${ui.description}</h4><p>${p.description}</p></div><div class="principle-teaser-block principle-teaser-justification"><h4 class="title-detail">${ui.justification}</h4><p>${p.justification}</p></div>`;
    const right=el('div','principle-teaser-example');
    right.append(el('h4','principle-teaser-example-title title-detail',ui.example));
    const card=el('div','principle-teaser-example-card');
    card.append(el('p','principle-teaser-example-copy',p.example));
    if(p.image){const img=el('img','principle-teaser-image');img.src=p.image;img.alt=`${ui.example}: ${p.name}`;img.loading='lazy';card.append(img);}
    right.append(card); layout.append(left,right); article.append(layout); wrap.append(article);
  });
  if(showButton){
    const actions=el('div','principle-teaser-actions reveal');
    actions.append(Button(lang==='pt'?'ABRIR SEÇÃO COMPLETA':'OPEN FULL SESSION','/principles-extended','dark'));
    wrap.append(actions);
  }
  return wrap;
}

export function ExtendedPrinciples(limit=null){
  const site=getSite(), ui=getUI(); const wrap=el('div','extended-principles extended-principles-static');
  const principles=(typeof limit==='number' ? site.principles.slice(0,limit) : site.principles);
  principles.forEach(p=>{
    const item=el('article','extended-principle open reveal');
    const head=el('div','extended-head extended-head-static');
    head.append(el('span','extended-number',p.id),el('span','extended-value',p.value),el('h3','extended-title title-subsection',p.name));
    const body=el('div','extended-body');
    const grid=el('div','extended-grid');
    const copy=el('div','extended-copy');
    copy.innerHTML=`<h4 class="title-detail">${ui.description}</h4><p>${p.description}</p><h4 class="title-detail">${ui.justification}</h4><p>${p.justification}</p><h4 class="title-detail">${ui.example}</h4><p>${p.example}</p>`;
    grid.append(copy);
    if(p.image) grid.append(ImageFrame(p.image,`${ui.example}: ${p.name}`,'extended-image'));
    body.append(grid); item.append(head,body); wrap.append(item);
  });
  return wrap;
}


export function ComparativeTable(rows=[]){
  const lang=getLang();
  const wrap=el('div','comparative-table reveal');
  const scroll=el('div','comparative-table-scroll');
  const table=document.createElement('table');
  table.className='comparative-table-element';
  const thead=document.createElement('thead');
  thead.innerHTML=lang==='en'
    ?'<tr><th>#</th><th>Principle</th><th>Focus</th><th>Scope</th><th>Objective</th></tr>'
    :'<tr><th>#</th><th>Princípio</th><th>Foco</th><th>Escopo</th><th>Objetivo</th></tr>';
  const tbody=document.createElement('tbody');
  rows.forEach(row=>{
    const tr=document.createElement('tr');
    tr.innerHTML='<td>'+row.id+'</td><td><strong>'+row.principle+'</strong></td><td>'+row.focus+'</td><td>'+row.scope+'</td><td>'+row.objective+'</td>';
    tbody.append(tr);
  });
  table.append(thead,tbody); scroll.append(table); wrap.append(scroll); return wrap;
}

export function openLightbox(src,alt=''){
  const box=document.querySelector('#lightbox');if(!box)return;
  box.innerHTML=`<button class="lightbox-close" aria-label="Close">×</button><img src="${src}" alt="${alt}">`;
  box.classList.add('open');box.setAttribute('aria-hidden','false');box.querySelector('.lightbox-close').onclick=closeLightbox;
}
export function closeLightbox(){const box=document.querySelector('#lightbox');if(box){box.classList.remove('open');box.setAttribute('aria-hidden','true');box.innerHTML='';}}

export function PosterCarousel(){
  const site=getSite(),ui=getUI();
  const shell=el('div','poster-carousel reveal');const prev=el('button','carousel-arrow','‹'), next=el('button','carousel-arrow','›');prev.type=next.type='button';
  const viewport=el('div','poster-viewport');const track=el('div','poster-track');viewport.append(track);
  site.posters.forEach((src,i)=>{
    const b=el('button','poster-card');b.type='button';b.setAttribute('aria-label',`${ui.postersTitle} ${i+1}`);const img=el('img');img.src=src;img.alt=`Collective Futures poster ${i+1}`;img.loading='lazy';b.append(img);b.onclick=()=>openLightbox(src,img.alt);track.append(b);
  });
  const amount=()=>Math.max(300,viewport.clientWidth*.8);prev.onclick=()=>viewport.scrollBy({left:-amount(),behavior:'smooth'});next.onclick=()=>viewport.scrollBy({left:amount(),behavior:'smooth'});
  shell.append(prev,viewport,next);return shell;
}

export function FloatingToc(items){
  const ui=getUI();const aside=el('aside','guideline-floating-nav');
  aside.append(el('div','floating-toc-title',ui.toc));const nav=el('nav','floating-toc-links');
  items.forEach(([label,href])=>{const a=routeLink(label,href,'floating-toc-link');const hash=href.includes('#')?href.split('#')[1]:'';if(hash)a.dataset.anchor=hash;nav.append(a);});
  aside.append(nav);return aside;
}

export function GuidelineLogo(){
  const site=getSite(),lang=getLang();const wrap=el('div','guideline-logo reveal');
  if(lang==='en'){
    const img=el('img','guideline-logo-image');img.src=site.images.logoEn;img.alt='Collective Futures - Ethical AI for Communities';wrap.append(img);
  }else{
    const img=el('img','guideline-logo-image guideline-logo-pt-image');img.src=site.images.logoMarkTitle;img.alt='Collective Futures';wrap.append(img,el('div','guideline-logo-pt-subtitle','IA Ética para Comunidades'));
  }
  return wrap;
}

function boldFirstSentence(text){
  const m=text.match(/^(.+?[.!?:])\s+(.*)$/s);
  if(!m) return `<strong>${text}</strong>`;
  return `<strong>${m[1]}</strong> ${m[2]}`;
}
export function Manifesto(paragraphs){
  const wrap=el('div','manifesto-text reveal');
  paragraphs.forEach(p=>wrap.append(el('p','',boldFirstSentence(p))));return wrap;
}

function parseLabelledBody(text){
  const labels=['Rule','Verification','Metrics','Classification','Rights','Regra','Verificação','Métricas','Classificação','Direitos'];
  const re=new RegExp(`(${labels.join('|')}):`,'g');const ms=[...text.matchAll(re)];
  if(!ms.length)return [{label:'',text}];
  const out=[];
  ms.forEach((m,i)=>{const start=m.index+m[0].length;const end=i+1<ms.length?ms[i+1].index:text.length;out.push({label:m[1],text:text.slice(start,end).trim()});});return out;
}

export function RulesMetrics(){
  const site=getSite();const shell=el('div','rules-shell');const grid=el('div','rules-grid');
  site.resources.rules.forEach((r,i)=>{
    const card=el('article','rule-card reveal');
    card.innerHTML=`<div class="rule-number">${i+1}</div><h3 class="title-card">${r.title.replace(/^\d+\.\s*/,'')}</h3>`;
    const body=el('div','rule-body');
    parseLabelledBody(r.body).forEach(x=>body.append(el('p','rule-line',x.label?`<strong>${x.label}:</strong> ${x.text}`:x.text)));
    card.append(body);grid.append(card);
  });
  shell.append(grid);return shell;
}

export function Safeguards(){
  const site=getSite();const grid=el('div','safeguards-grid');site.resources.safeguards.forEach((s,i)=>{const c=el('article','safeguard-card reveal');c.innerHTML=`<div class="safeguard-number">${i+1}</div><h3 class="title-card">${s.title}</h3><p>${s.body}</p>`;grid.append(c);});return grid;
}

function kitIcon(index){
  const icons=[
    '<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="12" y="8" width="40" height="48" rx="3"/><path d="M20 20h24M20 30h24M20 40h16"/></svg>',
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M10 54V14M10 54h46"/><path d="M18 44l10-12 9 7 15-21"/><circle cx="18" cy="44" r="2"/><circle cx="28" cy="32" r="2"/><circle cx="37" cy="39" r="2"/><circle cx="52" cy="18" r="2"/></svg>',
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M48 20a20 20 0 1 0 3 21"/><path d="M48 10v14H34"/><path d="M18 32h28M32 18v28"/></svg>',
    '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M12 12h18c6 0 10 4 10 10v34H22c-6 0-10-4-10-10V12Z"/><path d="M52 12H38c-4 0-8 4-8 10v34h12c6 0 10-4 10-10V12Z"/></svg>'
  ];return icons[index%icons.length];
}
export function GovernanceKit(){
  const site=getSite();const grid=el('div','governance-grid');site.resources.kit.forEach((k,i)=>{const c=el('article','governance-card reveal');c.innerHTML=`<div class="governance-icon">${kitIcon(i)}</div><h3 class="title-card">${k.title}</h3><p>${k.body}</p>`;grid.append(c);});return grid;
}

export function AsciiHero(){
  const site=getSite(),ui=getUI(),lang=getLang();const hero=el('section','hero-ascii');const frame=el('div','ascii-stage');
  const base=document.createElement('canvas');base.className='ascii-canvas ascii-base';base.dataset.source='/assets/faces-grid.webp';base.setAttribute('aria-hidden','true');
  const fx=document.createElement('canvas');fx.className='ascii-canvas ascii-fx';fx.setAttribute('aria-hidden','true');
  const overlay=el('div','hero-overlay reveal');
  overlay.append(el('h1','sr-only hero-semantic-title',`${ui.brand} — ${ui.heroSubtitle}`));
  if(lang==='en'){
    const img=el('img','hero-official-logo');img.src=site.images.logoEn;img.alt='Collective Futures - Ethical AI for Communities';overlay.append(img);
  }else{
    const img=el('img','hero-official-logo hero-pt-logo');img.src=site.images.logoMarkTitle;img.alt='Collective Futures';overlay.append(img,el('p','hero-pt-subtitle',ui.heroSubtitle));
  }
  frame.append(base,fx,overlay);hero.append(frame);return hero;
}

export function initAsciiHero(root=document){
  const base=root.querySelector('.ascii-base'),fx=root.querySelector('.ascii-fx');if(!base||!fx||base.dataset.ready==='1')return;base.dataset.ready='1';
  const frame=base.closest('.ascii-stage');const bctx=base.getContext('2d'),fctx=fx.getContext('2d');const sample=document.createElement('canvas');const sctx=sample.getContext('2d',{willReadFrequently:true});const img=new Image();img.decoding='async';
  const palette=['#4ec9f0','#53d2bd','#99d85c','#f4e342','#ffad33','#ff663f','#ef3e78','#7aa8c9'];
  const chars=' .,:-+=*#%@';
  const state={w:0,h:0,dpr:Math.min(devicePixelRatio||1,1.5),cols:0,rows:0,cw:0,ch:0,points:[],px:-9999,py:-9999,pulses:[],last:0,raf:0};
  const hash=(x,y)=>{const n=Math.sin(x*12.9898+y*78.233)*43758.5453;return n-Math.floor(n)};
  function fit(){const r=frame.getBoundingClientRect();state.w=Math.round(r.width);state.h=Math.round(r.height);for(const c of [base,fx]){c.width=Math.round(state.w*state.dpr);c.height=Math.round(state.h*state.dpr);c.style.width=`${state.w}px`;c.style.height=`${state.h}px`;}bctx.setTransform(state.dpr,0,0,state.dpr,0,0);fctx.setTransform(state.dpr,0,0,state.dpr,0,0);state.cols=Math.max(96,Math.min(156,Math.floor(state.w/10)));state.rows=Math.max(56,Math.min(92,Math.floor(state.h/12)));state.cw=state.w/state.cols;state.ch=state.h/state.rows;sample.width=state.cols;sample.height=state.rows;sctx.drawImage(img,0,0,state.cols,state.rows);const d=sctx.getImageData(0,0,state.cols,state.rows).data;state.points=[];for(let y=0;y<state.rows;y++)for(let x=0;x<state.cols;x++){const i=(y*state.cols+x)*4;const lum=(d[i]*.2126+d[i+1]*.7152+d[i+2]*.0722)/255;state.points.push({x,y,lum,face:Math.min(34,Math.floor(y/(state.rows/5))*7+Math.floor(x/(state.cols/7))),noise:hash(x,y)});}drawBase();}
  function charFor(p){const v=Math.max(0,Math.min(1,p.lum+p.noise*.035));return chars[Math.min(chars.length-1,Math.floor(v*(chars.length-1)))];}
  function drawBase(){bctx.clearRect(0,0,state.w,state.h);bctx.fillStyle='#070707';bctx.fillRect(0,0,state.w,state.h);bctx.textAlign='center';bctx.textBaseline='middle';bctx.font=`600 ${Math.max(6.5,state.ch*.64)}px IBM Plex Mono, monospace`;for(const p of state.points){const x=(p.x+.5)*state.cw,y=(p.y+.5)*state.ch;const a=.09+p.lum*.31;bctx.globalAlpha=a;bctx.fillStyle=p.face%4===0?palette[p.face%palette.length]:'#f4ecd9';bctx.fillText(charFor(p),x,y);}bctx.globalAlpha=1;}
  function pulse(x,y,force=false){const now=performance.now();if(!force&&now-state.last<48)return;state.last=now;state.pulses.push({x,y,t:now});if(state.pulses.length>9)state.pulses.shift();}
  function drawFx(now){fctx.clearRect(0,0,state.w,state.h);fctx.textAlign='center';fctx.textBaseline='middle';fctx.font=`700 ${Math.max(6.8,state.ch*.68)}px IBM Plex Mono, monospace`;for(const p of state.points){const x=(p.x+.5)*state.cw,y=(p.y+.5)*state.ch;const dist=Math.hypot(x-state.px,y-state.py);let strength=Math.exp(-(dist*dist)/(2*155*155))*.88;for(let i=state.pulses.length-1;i>=0;i--){const q=state.pulses[i],age=now-q.t;if(age>1250){state.pulses.splice(i,1);continue;}const radius=age*.48;const band=Math.abs(Math.hypot(x-q.x,y-q.y)-radius);strength+=Math.exp(-(band*band)/(2*88*88))*(1-age/1250)*.92;}if(strength<.055)continue;fctx.globalAlpha=Math.min(1,.24+strength);fctx.fillStyle=palette[p.face%palette.length];const wobble=Math.sin(now*.004+p.x*.5+p.y*.2)*1.1*strength;fctx.fillText(charFor(p),x+wobble,y);}fctx.globalAlpha=1;state.raf=requestAnimationFrame(drawFx);}
  frame.addEventListener('pointermove',e=>{const r=frame.getBoundingClientRect();state.px=e.clientX-r.left;state.py=e.clientY-r.top;pulse(state.px,state.py);},{passive:true});
  frame.addEventListener('pointerdown',e=>{const r=frame.getBoundingClientRect();pulse(e.clientX-r.left,e.clientY-r.top,true);},{passive:true});
  frame.addEventListener('pointerleave',()=>{state.px=state.py=-9999;});
  const ro=new ResizeObserver(()=>{clearTimeout(state.rt);state.rt=setTimeout(fit,140)});ro.observe(frame);
  img.onload=()=>{fit();state.raf=requestAnimationFrame(drawFx)};img.src=base.dataset.source;
}

export function observeReveals(scope=document){
  const nodes=[...scope.querySelectorAll('.reveal:not([data-seen])')];if(!nodes.length)return;const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');e.target.dataset.seen='1';io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -5%'});nodes.forEach(n=>io.observe(n));
}

export function wireFloatingToc(){
  const links=[...document.querySelectorAll('.floating-toc-link[data-anchor]')];if(!links.length)return;links.forEach(a=>a.addEventListener('click',e=>{const id=a.dataset.anchor;const target=document.getElementById(id);if(target){e.preventDefault();history.replaceState({},'',`${window.location.pathname}#${id}`);target.scrollIntoView({behavior:'smooth',block:'start'});}}));
  const sections=links.map(a=>document.getElementById(a.dataset.anchor)).filter(Boolean);const io=new IntersectionObserver(es=>{const hit=es.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(hit)links.forEach(a=>a.classList.toggle('active',a.dataset.anchor===hit.target.id));},{rootMargin:'-20% 0px -68%',threshold:[0,.1,.5]});sections.forEach(s=>io.observe(s));
}
