(()=>{"use strict";const e="https://react-learnwords-2022.herokuapp.com/",t=e=>({Authorization:`Bearer ${e}`,Accept:"application/json","Content-Type":"application/json"});class n{get token(){return JSON.parse(localStorage.getItem("token"))}get id(){return JSON.parse(localStorage.getItem("id"))}get name(){return JSON.parse(localStorage.getItem("name"))}get refreshToken(){return JSON.parse(localStorage.getItem("refreshToken"))}}document.addEventListener("DOMContentLoaded",(function(){const a=new URLSearchParams(document.location.search),d=a.get("page"),s=a.get("group");!function(e,t){document.querySelector(".text-group").innerText=e?`Раздел ${t}`:"Раздел 1",document.querySelector(".number-page").innerText=e||"1";const n=document.querySelector(".back-all"),a=document.querySelector(".back"),d=document.querySelector(".forward"),s=document.querySelector(".forward-all"),o=Number(e);1<o&&o<30&&(n.disabled=!1,a.disabled=!1,d.disabled=!1,s.disabled=!1),o<=1&&(n.disabled=!0,a.disabled=!0,d.disabled=!1,s.disabled=!1),o>=30&&(n.disabled=!1,a.disabled=!1,d.disabled=!0,s.disabled=!0)}(d,s);const o=document.querySelector(".link__audio-call"),c=document.querySelector(".link__sprint");let i;d&&s?(i={page:""+(Number(d)-1),group:""+(Number(s)-1)},o.href=`./audio-call.html?group=${s}&page=${d}`,c.href=`./sprint.html?group=${s}&page=${d}`):(i={page:"0",group:"0"},o.href="./audio-call.html?group=1&page=1",c.href="./sprint.html?group=1&page=1"),async function(a){const d=await async function(t){const n=await fetch(`${e}words?group=${t.group}&page=${t.page}`);return await n.json()}(a),s=new n,o=await async function(n,a){return n&&a?async function(n,a){return await fetch(`${e}users/${n}/words`,{method:"GET",headers:t(a)}).then((e=>e.json())).catch((e=>console.log(e.message)))}(n,a):null}(s.id,s.token),c=document.querySelector(".list-textbook"),i=document.createElement("div");i.classList.add("container"),c.append(i);for(let t=0;t<d.length;t++){const n=document.createElement("div");n.classList.add("list-textbook__elem"),n.setAttribute("data-id",`${d[t].id}`),i.append(n);const a=document.createElement("img");a.classList.add("list-textbook__elem__img"),a.src=`${e}${d[t].image}`,n.append(a);const c=document.createElement("div");c.classList.add("list-textbook__elem__words-container"),n.append(c);const r=document.createElement("div");r.classList.add("list-textbook__elem__word-container"),c.append(r);const l=document.createElement("div");l.classList.add("word-container__word"),l.innerText=`${d[t].word}`,r.append(l);const u=document.createElement("div");u.classList.add("word-container__transcription"),u.innerText=`${d[t].transcription}`,r.append(u);const m=document.createElementNS("http://www.w3.org/2000/svg","svg"),p=document.createElementNS("http://www.w3.org/2000/svg","use");m.classList.add("audio"),m.setAttribute("data-id",`${d[t].id}`),p.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","assets/ico/audio-mute.svg#Capa_1"),m.append(p),r.append(m);const g=document.createElement("div");g.classList.add("word-container__wordTranslate"),g.innerText=`${d[t].wordTranslate}`,r.append(g);const _=document.createElement("div");_.classList.add("list-textbook__elem__example"),c.append(_);const b=document.createElement("div");b.classList.add("example__text"),b.innerText=`${d[t].textExample}`,_.append(b);const x=document.createElement("div");x.classList.add("example__textTranslate"),x.innerText=`${d[t].textExampleTranslate}`,_.append(x);const L=document.createElement("div");L.classList.add("list-textbook__elem__meaning"),c.append(L);const w=document.createElement("div");w.classList.add("meaning__text"),w.innerText=`${d[t].textMeaning}`,L.append(w);const h=document.createElement("div");if(h.classList.add("meaning__textTranslate"),h.innerText=`${d[t].textMeaningTranslate}`,L.append(h),s.id){const e=document.createElement("div");e.classList.add("list-textbook__cont-button"),n.append(e);const a=document.createElement("button");a.classList.add("cont-button"),a.classList.add("cont-button__add"),a.innerText="Добавить в сложные слова",e.append(a);const s=document.createElement("button");s.classList.add("cont-button"),s.classList.add("cont-button__remove"),s.innerText="Убрать из сложных слов",s.disabled=!0,e.append(s);const c=document.createElement("button");if(c.classList.add("cont-button"),c.classList.add("cont-button__studied"),c.innerText="Изученно",e.append(c),!o)return;for(let e=0;e<o.length;e++)o[e].wordId===d[t].id&&("hard"===o[e].difficulty&&(n.classList.add("hard"),a.disabled=!0,s.disabled=!1),"studied"===o[e].difficulty&&(n.classList.add("studied"),a.disabled=!0,s.disabled=!0,c.disabled=!0))}}!function(){const e=document.querySelectorAll(".list-textbook__elem");let t=0;for(let n=0;n<e.length;n++)(e[n].classList.contains("hard")||e[n].classList.contains("studied"))&&t++;const n=document.querySelector(".main"),a=document.querySelector(".number-page");t==e.length?(n.classList.add("studied-page"),a.classList.add("pagination-studied")):a.classList.contains("pagination-studied")&&n.classList.contains("studied-page")&&(n.classList.remove("studied-page"),a.classList.remove("pagination-studied"))}()}(i)}))})();