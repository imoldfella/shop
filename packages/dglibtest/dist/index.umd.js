(function(w,p){typeof exports=="object"&&typeof module<"u"?p(exports):typeof define=="function"&&define.amd?define(["exports"],p):(w=typeof globalThis<"u"?globalThis:w||self,p(w.index={}))})(this,function(w){"use strict";const p={};let $=_;const y=1,C=2,j={owned:null,cleanups:null,context:null,owner:null};var a=null;let x=null,c=null,d=null,m=0;function E(e,i,t){const s=G(e,i,!1,y);B(s)}function I(e){try{return e()}finally{}}function R(e,i,t){let s=e.value;return(!e.comparator||!e.comparator(s,i))&&(e.value=i,e.observers&&e.observers.length&&T(()=>{for(let l=0;l<e.observers.length;l+=1){const f=e.observers[l],o=x&&x.running;o&&x.disposed.has(f),(o&&!f.tState||!o&&!f.state)&&(f.pure?c.push(f):d.push(f),f.observers&&M(f)),o||(f.state=y)}if(c.length>1e6)throw c=[],new Error},!1)),i}function B(e){if(!e.fn)return;D(e);const i=a,t=m;a=e,F(e,e.value,t),a=i}function F(e,i,t){let s;try{s=e.fn(i)}catch(l){e.pure&&(e.state=y),L(l)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?R(e,s):e.value=s,e.updatedAt=t)}function G(e,i,t,s=y,l){const f={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:i,owner:a,context:null,pure:t};return a===null||a!==j&&(a.owned?a.owned.push(f):a.owned=[f]),f}function U(e){const i=x;if(e.state===0||i)return;if(e.state===C||i)return b(e);if(e.suspense&&I(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<m);)(e.state||i)&&t.push(e);for(let s=t.length-1;s>=0;s--)if(e=t[s],e.state===y||i)B(e);else if(e.state===C||i){const l=c;c=null,T(()=>b(e,t[0]),!1),c=l}}function T(e,i){if(c)return e();let t=!1;i||(c=[]),d?t=!0:d=[],m++;try{const s=e();return H(t),s}catch(s){c||(d=null),L(s)}}function H(e){if(c&&(_(c),c=null),e)return;const i=d;d=null,i.length&&T(()=>$(i),!1)}function _(e){for(let i=0;i<e.length;i++)U(e[i])}function b(e,i){const t=x;e.state=0;for(let s=0;s<e.sources.length;s+=1){const l=e.sources[s];l.sources&&(l.state===y||t?l!==i&&U(l):(l.state===C||t)&&b(l,i))}}function M(e){const i=x;for(let t=0;t<e.observers.length;t+=1){const s=e.observers[t];(!s.state||i)&&(s.state=C,s.pure?c.push(s):d.push(s),s.observers&&M(s))}}function D(e){let i;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),s=e.sourceSlots.pop(),l=t.observers;if(l&&l.length){const f=l.pop(),o=t.observerSlots.pop();s<l.length&&(f.sourceSlots[o]=s,l[s]=f,t.observerSlots[s]=o)}}if(e.owned){for(i=0;i<e.owned.length;i++)D(e.owned[i]);e.owned=null}if(e.cleanups){for(i=0;i<e.cleanups.length;i++)e.cleanups[i]();e.cleanups=null}e.state=0,e.context=null}function Q(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function L(e){throw e=Q(e),e}function V(e,i,t){let s=t.length,l=i.length,f=s,o=0,n=0,u=i[l-1].nextSibling,r=null;for(;o<l||n<f;){if(i[o]===t[n]){o++,n++;continue}for(;i[l-1]===t[f-1];)l--,f--;if(l===o){const h=f<s?n?t[n-1].nextSibling:t[f-n]:u;for(;n<f;)e.insertBefore(t[n++],h)}else if(f===n)for(;o<l;)(!r||!r.has(i[o]))&&i[o].remove(),o++;else if(i[o]===t[f-1]&&t[n]===i[l-1]){const h=i[--l].nextSibling;e.insertBefore(t[n++],i[o++].nextSibling),e.insertBefore(t[--f],h),i[l]=t[f]}else{if(!r){r=new Map;let g=n;for(;g<f;)r.set(t[g],g++)}const h=r.get(i[o]);if(h!=null)if(n<h&&h<f){let g=o,v=1,W;for(;++g<l&&g<f&&!((W=r.get(i[g]))==null||W!==h+v);)v++;if(v>h-n){const X=i[o];for(;n<h;)e.insertBefore(t[n++],X)}else e.replaceChild(t[n++],i[o++])}else o++;else i[o++].remove()}}}function q(e,i,t){const s=document.createElement("template");s.innerHTML=e;let l=s.content.firstChild;return t&&(l=l.firstChild),l}function O(e,i,t,s){if(t!==void 0&&!s&&(s=[]),typeof i!="function")return S(e,i,s,t);E(l=>S(e,i(),l,t),s)}function S(e,i,t,s,l){for(p.context&&!t&&(t=[...e.childNodes]);typeof t=="function";)t=t();if(i===t)return t;const f=typeof i,o=s!==void 0;if(e=o&&t[0]&&t[0].parentNode||e,f==="string"||f==="number"){if(p.context)return t;if(f==="number"&&(i=i.toString()),o){let n=t[0];n&&n.nodeType===3?n.data=i:n=document.createTextNode(i),t=A(e,t,s,n)}else t!==""&&typeof t=="string"?t=e.firstChild.data=i:t=e.textContent=i}else if(i==null||f==="boolean"){if(p.context)return t;t=A(e,t,s)}else{if(f==="function")return E(()=>{let n=i();for(;typeof n=="function";)n=n();t=S(e,n,t,s)}),()=>t;if(Array.isArray(i)){const n=[],u=t&&Array.isArray(t);if(N(n,i,t,l))return E(()=>t=S(e,n,t,s,!0)),()=>t;if(p.context){if(!n.length)return t;for(let r=0;r<n.length;r++)if(n[r].parentNode)return t=n}if(n.length===0){if(t=A(e,t,s),o)return t}else u?t.length===0?P(e,n,s):V(e,t,n):(t&&A(e),P(e,n));t=n}else if(i instanceof Node){if(p.context&&i.parentNode)return t=o?[i]:i;if(Array.isArray(t)){if(o)return t=A(e,t,s,i);A(e,t,null,i)}else t==null||t===""||!e.firstChild?e.appendChild(i):e.replaceChild(i,e.firstChild);t=i}}return t}function N(e,i,t,s){let l=!1;for(let f=0,o=i.length;f<o;f++){let n=i[f],u=t&&t[f];if(n instanceof Node)e.push(n);else if(!(n==null||n===!0||n===!1))if(Array.isArray(n))l=N(e,n,u)||l;else if(typeof n=="function")if(s){for(;typeof n=="function";)n=n();l=N(e,Array.isArray(n)?n:[n],Array.isArray(u)?u:[u])||l}else e.push(n),l=!0;else{const r=String(n);u&&u.nodeType===3&&u.data===r?e.push(u):e.push(document.createTextNode(r))}}return l}function P(e,i,t=null){for(let s=0,l=i.length;s<l;s++)e.insertBefore(i[s],t)}function A(e,i,t,s){if(t===void 0)return e.textContent="";const l=s||document.createTextNode("");if(i.length){let f=!1;for(let o=i.length-1;o>=0;o--){const n=i[o];if(l!==n){const u=n.parentNode===e;!f&&!o?u?e.replaceChild(l,n):e.insertBefore(l,t):u&&n.remove()}else f=!0}}else e.insertBefore(l,t);return[l]}const J=q("<div><div>hello, </div></div>"),K=e=>(()=>{const i=J.cloneNode(!0),t=i.firstChild;return t.firstChild,O(t,()=>e.name,null),O(i,()=>e.children,null),i})();w.hellowWorld=K,Object.defineProperties(w,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
