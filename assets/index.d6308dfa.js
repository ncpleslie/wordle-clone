import{j as f,r as c,m as E,o as w,C as T,a as S,R as U,b as I}from"./vendor.aed7bed9.js";const _=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function r(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerpolicy&&(a.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?a.credentials="include":s.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(s){if(s.ep)return;s.ep=!0;const a=r(s);fetch(s.href,a)}};_();const $="_app_1ete3_1",N="_game_1ete3_1";var b={app:$,game:N};const n=f.exports.jsx,u=f.exports.jsxs,h=f.exports.Fragment,G=c.exports.memo(o=>n("div",{className:`character-box 
        ${o.usedLocationIncorrect&&"incorrect-location"} 
          ${o.usedLocationCorrect&&"correct-location"} 
          ${o.notUsed&&"not-used"}
          ${o.invalid&&"invalid"}
          `,children:n("p",{className:"character-box__text",children:o.character})})),R=o=>u("div",{className:"max-w-sm rounded overflow-hidden shadow-lg px-6 py-4 text-center bg-red-100 border border-red-400",children:[n("h1",{className:"font-bold text-xl mb-2",children:"An error has occurred while loading this application"}),o.message&&u("p",{children:["Reason: ",o.message]})]});class O{constructor(e,r,t){this.word=e.toUpperCase(),this.tries=r,this.lang=t,console.log("Word is: ",e)}word;tries;lang}class v{constructor(e){this.character=e}character;usedLocationCorrect=!1;usedLocationIncorrect=!1;notUsed=!1;invalid=!1}class l{error;won;static forNotAWord(){return l.createSubmitResponse("Not a word!",!0)}static forLost(e){return l.createSubmitResponse(e,!0)}static forWon(){return l.createSubmitResponse("You win!",!1)}static createSubmitResponse(e,r){const t=new l;return r?t.error=e:t.won="You win!",t}}const W="modulepreload",L={},A="/wordle-clone/",y=function(e,r){return!r||r.length===0?e():Promise.all(r.map(t=>{if(t=`${A}${t}`,t in L)return;L[t]=!0;const s=t.endsWith(".css"),a=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${a}`))return;const i=document.createElement("link");if(i.rel=s?"stylesheet":W,s||(i.as="script",i.crossOrigin=""),i.href=t,document.head.appendChild(i),s)return new Promise((k,K)=>{i.addEventListener("load",k),i.addEventListener("error",K)})})).then(()=>e())};class j{constructor(e,r,t){this.wordLength=e,this.tries=r,this.lang=t}wordLength;tries;lang}class P{constructor(e,r,t,s=!1){this.character=e,this.order=r,this.row=t,this.special=s,this.usedLocationKnown=!1,this.usedLocationUnknown=!1,this.notUsed=!1}character;order;row;special;usedLocationKnown;usedLocationUnknown;notUsed}class C{static loadingElement="loading-root";static toastElement="toast-root"}class d{static async generateKeyboard(e){return(await d.getKeyboard(e))?.reduce((t,s)=>(t[s.character.toUpperCase()]=s,t),{})}static async getConfig(){const e=await y(()=>import("./config.639d2aae.js"),[]);return new j(e.wordLength,e.tries,e.lang)}static async getKeyboard(e){return(await y(()=>import("./keyboard.f1bf6d36.js"),[])).default[e].map(s=>new P(s.character,s.order,s.row,s.special))}static async getRandomWord(e,r){const t=await d.getDictionary(r),s=t[e].length,a=t[e][Math.floor(Math.random()*(s-0))];return/^[a-z]+$/i.test(a)?a:d.getRandomWord(e,r)}static async isWord(e,r){return(await d.getDictionary(r))[e.length.toString()].includes(e.toLowerCase())}static removeLoadingIndicator(){document.getElementById(C.loadingElement)?.remove()}static async getDictionary(e){return(await y(()=>import("./dictionary.4017dd85.js"),[])).default[e]}}class p{row=0;constructor(e,r){this.options=e,this.guesses=r}guesses;options;addGuess(e){this.guesses[this.row].length>=this.options.word.length||this.guesses[this.row].push(new v(e))}async submit(){const e=this.options.word.length,r=this.guesses[this.row].length;if(r===0||r%e!=0||this.row>=this.options.tries)return;const t=this.guesses[this.row].reduce((s,a)=>`${s}${a.character}`,"");if(!await d.isWord(t,this.options.lang)){for(let s=0;s<r;s++)this.guesses[this.row][s].invalid=!0;return l.forNotAWord()}for(let s=0;s<r;s++){const a=this.guesses[this.row][s].character,i=this.options.word.split("");if(a===i[s]){this.guesses[this.row][s].usedLocationCorrect=!0;continue}if(i.includes(a)){this.guesses[this.row][s].usedLocationIncorrect=!0;continue}this.guesses[this.row][s].notUsed=!0}if(t===this.options.word)return l.forWon();if(this.row++,this.row>=this.options.tries)return l.forLost(this.options.word)}undo(){this.guesses[this.row]?.pop()}static async createGameService(){const e=await d.getConfig(),r=await d.getRandomWord(e.wordLength,e.lang),t=new O(r,e.tries,e.lang),s=[...Array(t.tries)].map(()=>Array(0));return new p(t,s)}}var g;(function(o){o.Enter="ENTER",o.Backspace="<"})(g||(g={}));class M{timer;constructor(e,r){E(this),this.guesses=[],this.game=e,this.keyboard=r}game;guesses;keyboard;showToast=!1;toastMessage="";toastTimeoutInMs=2500;getGuessByIndex(e){return this.guesses.length===0||this.guesses.length<=e?new v(""):this.guesses[e]}getTotalTries(){return this.game.options.tries}getWordLength(){return this.game.options.word.length}async onKeyClicked(e){if(e===g.Enter){const r=await this.game.submit();r?.error&&this.displayToast(r.error),r?.won&&this.displayToast(r.won),this.updateGuessesState(),this.guesses.forEach(t=>{t.usedLocationCorrect&&this.setKeyLocationKnown(t.character),t.usedLocationIncorrect&&this.setKeyLocationUnknown(t.character),t.notUsed&&this.setKeyNotUsed(t.character)}),this.updateKeyboardState();return}if(e===g.Backspace){this.game.undo(),this.updateGuessesState();return}this.game.addGuess(e),this.updateGuessesState()}setKeyLocationKnown(e){!this.keyboard||(this.keyboard[e].usedLocationKnown=!0)}setKeyLocationUnknown(e){!this.keyboard||(this.keyboard[e].usedLocationUnknown=!0)}setKeyNotUsed(e){!this.keyboard||(this.keyboard[e].notUsed=!0)}displayToast(e,r=2500){this.timer&&(clearTimeout(this.timer),this.timer=void 0),this.showToast=!0,this.toastMessage=e,this.toastTimeoutInMs=r,this.showToast&&(this.timer=setTimeout(()=>this.hideToast(),r))}hideToast(){this.showToast=!1}updateGuessesState(){this.guesses=this.game.guesses.flat()}updateKeyboardState(){this.keyboard={...this.keyboard}}}const m=c.exports.createContext(null),B=o=>{const[e,r]=c.exports.useState(null),[t,s]=c.exports.useState(null);return c.exports.useEffect(()=>{t||(async()=>{try{const a=await p.createGameService(),i=await d.generateKeyboard(a.options.lang);s(new M(a,i))}catch(a){r(a)}})()},[]),e?(d.removeLoadingIndicator(),n("div",{className:"flex justify-center items-center m-10",children:n(R,{message:e.message})})):t?(d.removeLoadingIndicator(),n(m.Provider,{value:t,children:o.children})):n(h,{})},D=w(()=>{const o=c.exports.useContext(m);return o?n("div",{className:`gameboard grid-cols-${o.getWordLength()}`,children:[...Array(o.getWordLength()*o.getTotalTries())].map((e,r)=>{const t=o.getGuessByIndex(r);return n(G,{character:t.character,usedLocationCorrect:t.usedLocationCorrect,usedLocationIncorrect:t.usedLocationIncorrect,notUsed:t.notUsed,invalid:t.invalid},r)})}):n(h,{})});class z{static sourceCodeUrl="https://github.com/ncpleslie/wordle-clone"}const F=()=>n("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24",width:"24px",height:"24px",children:n("path",{d:"M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.5,4.7,2.2,8.9,6.3,10.5C8.7,21.4,9,21.2,9,20.8v-1.6c0,0-0.4,0.1-0.9,0.1 c-1.4,0-2-1.2-2.1-1.9c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1 c0.4,0,0.7-0.1,0.9-0.2c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6 c0,0,1.4,0,2.8,1.3C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4 c0.7,0.8,1.2,1.8,1.2,3c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v2.6c0,0.3,0.3,0.6,0.7,0.5c3.7-1.5,6.3-5.1,6.3-9.3 C22,6.1,16.9,1.4,10.9,2.1z"})}),V=()=>u("nav",{className:"border w-full text-center p-2 shadow grid grid-cols-3 justify-center",children:[n("h1",{className:"font-bold col-start-2",children:"Another Wordle Clone"}),u("a",{href:z.sourceCodeUrl,className:"flex flex-row gap-1 items-center ml-auto",children:[n(F,{}),"Source Code"]})]});const q=c.exports.memo(o=>{const e=()=>{o.onKeyClicked(o.character)};return n("button",{className:`key ${o.usedLocationUnknown&&"used-and-unknown"} ${o.usedLocationKnown&&"used-and-known"} ${o.notUsed&&"not-used"} ${o.special&&"special"}`,onClick:e,children:n("p",{className:"key__text",children:o.character.toUpperCase()})})});const Y=w(()=>{const o=c.exports.useContext(m);if(!o)return n(h,{});const e=c.exports.useCallback(async t=>{await o.onKeyClicked(t)},[o.onKeyClicked]);let r=0;return n("div",{children:n("div",{className:"keyboard",children:Object.keys(o.keyboard).map(t=>{const s=n(q,{character:t,usedLocationKnown:o.keyboard[t].usedLocationKnown,usedLocationUnknown:o.keyboard[t].usedLocationUnknown,onKeyClicked:e,notUsed:o.keyboard[t].notUsed,special:o.keyboard[t].special},t);return o.keyboard[t].row!==r?(r=o.keyboard[t].row,u(c.exports.Fragment,{children:[n("div",{className:"keyboard__break"}),s]},t)):s})})})});const J=w(()=>{const o=c.exports.useContext(m);if(!o)return n(h,{});const e=c.exports.useRef(null),r=n(T,{in:o.showToast,timeout:o.toastTimeoutInMs,classNames:"slide",mountOnEnter:!0,unmountOnExit:!0,nodeRef:e,children:n("div",{ref:e,className:"toast",children:n("div",{className:"toast-content",children:n("p",{children:o.toastMessage})})})});return n(h,{children:S.exports.createPortal(r,document.getElementById(C.toastElement))})}),Q=()=>n(h,{children:u(B,{children:[u("div",{className:b.app,children:[n(V,{}),u("div",{className:b.game,children:[n(D,{}),n(Y,{})]})]}),n(J,{})]})});window.addEventListener("resize",x,!1);x();function x(){document.body.style.setProperty("--vh",window.innerHeight+"px")}U.render(n(I.StrictMode,{children:n(Q,{})}),document.getElementById("root"));
