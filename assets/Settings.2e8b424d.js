import{r as o,o as u,e as g}from"./vendor.85ee4ff0.js";import{j as d,a,G as h,P as m,D as b,L as f}from"./index.de8000ff.js";const w=()=>Math.floor(100+Math.random()*900),c=e=>{const[r,n]=o.exports.useState(e.defaultValue),l=`dropdown-${w()}`,s=t=>{const i=t.target.value;n(i),e.onChange(i)};return d("div",{className:"flex flex-row justify-between shadow rounded-lg border border-gray-50",children:[a("label",{className:"w-full p-2",htmlFor:l,children:e.label}),a("select",{disabled:e.values.length<=1,id:l,className:"shadow-xl w-20 p-2 rounded-lg border border-gray-50 cursor-pointer  disabled:shadow disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed",value:r,onChange:s,children:e.values.map(t=>a("option",{value:t,children:t},`${t}-${l}`))})]})},v=u(({settingsConfig:e})=>{const r=o.exports.useContext(h),n=t=>{r?.setWordLength(parseInt(t))},l=t=>{r?.setTries(parseInt(t))},s=t=>{r?.setLang(t)};return d("div",{className:"w-72 h-52 my-10 mx-10 flex flex-col gap-2",children:[e.currentWordLength&&a(c,{onChange:n,values:e.wordLengths,defaultValue:e.currentWordLength,label:"Word Length"}),a("hr",{className:"border border-gray-300"}),e.currentTries&&a(c,{onChange:l,values:e.tries,defaultValue:e.currentTries,label:"Total Attempts"}),a("hr",{className:"border border-gray-300"}),e.currentLang&&a(c,{onChange:s,values:e.languages,defaultValue:e.currentLang,label:"Language"})]})}),x=()=>a("svg",{className:"w-6 h-6 text-black",fill:"currentColor",viewBox:"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",children:a("path",{fillRule:"evenodd",d:"M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",clipRule:"evenodd"})}),p=e=>{const r=g(),n=()=>{r(-1)};o.exports.useEffect(()=>(document.body.classList.add("overflow-hidden"),()=>{document.body.classList.remove("overflow-hidden")}),[]);const l=a("div",{onClick:n,className:"absolute inset-0 bg-black bg-opacity-75 w-full h-screen z-10 flex items-center justify-center",children:a("div",{onClick:s=>{s.stopPropagation()},children:d("div",{className:"bg-gray-200 drop-shadow rounded text-center w-full",children:[d("div",{className:"grid grid-cols-3 items-center p-2",children:[a("h2",{className:"font-bold col-start-2",children:e.title}),a("div",{onClick:n,className:"cursor-pointer  ml-auto",children:a(x,{})})]}),e.children]})})});return a(m,{id:b.modalElement,force:!0,children:l})},y=u(()=>{const e=o.exports.useContext(h),[r,n]=o.exports.useState(null),[l,s]=o.exports.useState(!1);return o.exports.useEffect(()=>{(async()=>{s(!0);const t=await e?.getSettings();t&&n(t),s(!1)})()},[]),d(p,{title:"Settings",children:[l&&a("div",{className:"p-4",children:a(f,{})}),!l&&r&&a(v,{settingsConfig:r})]})});export{y as default};
