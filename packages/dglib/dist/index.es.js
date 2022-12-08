var Iu = Object.defineProperty;
var Tu = (e, t, n) => t in e ? Iu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var j = (e, t, n) => (Tu(e, typeof t != "symbol" ? t + "" : t, n), n);
const be = {};
function Nu(e) {
  be.context = e;
}
const Mu = (e, t) => e === t, Se = Symbol("solid-proxy"), fn = Symbol("solid-track"), Lt = {
  equals: Mu
};
let ei = ci;
const Me = 1, _t = 2, ti = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var J = null;
let qe = null, Q = null, ae = null, Ie = null, vn = 0;
function Kt(e, t) {
  const n = Q, r = J, i = e.length === 0, u = i ? ti : {
    owned: null,
    cleanups: null,
    context: null,
    owner: t || r
  }, l = i ? e : () => e(() => Te(() => Bn(u)));
  J = u, Q = null;
  try {
    return it(l, !0);
  } finally {
    Q = n, J = r;
  }
}
function ue(e, t) {
  t = t ? Object.assign({}, Lt, t) : Lt;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0
  }, r = (i) => (typeof i == "function" && (i = i(n.value)), si(n, i));
  return [ai.bind(n), r];
}
function W(e, t, n) {
  const r = Sn(e, t, !1, Me);
  xt(r);
}
function jt(e, t, n) {
  ei = qu;
  const r = Sn(e, t, !1, Me);
  r.user = !0, Ie ? Ie.push(r) : xt(r);
}
function Be(e, t, n) {
  n = n ? Object.assign({}, Lt, n) : Lt;
  const r = Sn(e, t, !0, 0);
  return r.observers = null, r.observerSlots = null, r.comparator = n.equals || void 0, xt(r), ai.bind(r);
}
function ni(e) {
  return it(e, !1);
}
function Te(e) {
  const t = Q;
  Q = null;
  try {
    return e();
  } finally {
    Q = t;
  }
}
function Ft(e) {
  return J === null || (J.cleanups === null ? J.cleanups = [e] : J.cleanups.push(e)), e;
}
function ri() {
  return Q;
}
function ii() {
  return J;
}
function ui(e, t) {
  const n = Symbol("context");
  return {
    id: n,
    Provider: Uu(n),
    defaultValue: e
  };
}
function li(e) {
  let t;
  return (t = di(J, e.id)) !== void 0 ? t : e.defaultValue;
}
function oi(e) {
  const t = Be(e), n = Be(() => hn(t()));
  return n.toArray = () => {
    const r = n();
    return Array.isArray(r) ? r : r != null ? [r] : [];
  }, n;
}
function ai() {
  const e = qe;
  if (this.sources && (this.state || e))
    if (this.state === Me || e)
      xt(this);
    else {
      const t = ae;
      ae = null, it(() => zt(this), !1), ae = t;
    }
  if (Q) {
    const t = this.observers ? this.observers.length : 0;
    Q.sources ? (Q.sources.push(this), Q.sourceSlots.push(t)) : (Q.sources = [this], Q.sourceSlots = [t]), this.observers ? (this.observers.push(Q), this.observerSlots.push(Q.sources.length - 1)) : (this.observers = [Q], this.observerSlots = [Q.sources.length - 1]);
  }
  return this.value;
}
function si(e, t, n) {
  let r = e.value;
  return (!e.comparator || !e.comparator(r, t)) && (e.value = t, e.observers && e.observers.length && it(() => {
    for (let i = 0; i < e.observers.length; i += 1) {
      const u = e.observers[i], l = qe && qe.running;
      l && qe.disposed.has(u), (l && !u.tState || !l && !u.state) && (u.pure ? ae.push(u) : Ie.push(u), u.observers && fi(u)), l || (u.state = Me);
    }
    if (ae.length > 1e6)
      throw ae = [], new Error();
  }, !1)), t;
}
function xt(e) {
  if (!e.fn)
    return;
  Bn(e);
  const t = J, n = Q, r = vn;
  Q = J = e, Ru(e, e.value, r), Q = n, J = t;
}
function Ru(e, t, n) {
  let r;
  try {
    r = e.fn(t);
  } catch (i) {
    e.pure && (e.state = Me), hi(i);
  }
  (!e.updatedAt || e.updatedAt <= n) && (e.updatedAt != null && "observers" in e ? si(e, r) : e.value = r, e.updatedAt = n);
}
function Sn(e, t, n, r = Me, i) {
  const u = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: J,
    context: null,
    pure: n
  };
  return J === null || J !== ti && (J.owned ? J.owned.push(u) : J.owned = [u]), u;
}
function Ot(e) {
  const t = qe;
  if (e.state === 0 || t)
    return;
  if (e.state === _t || t)
    return zt(e);
  if (e.suspense && Te(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const n = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < vn); )
    (e.state || t) && n.push(e);
  for (let r = n.length - 1; r >= 0; r--)
    if (e = n[r], e.state === Me || t)
      xt(e);
    else if (e.state === _t || t) {
      const i = ae;
      ae = null, it(() => zt(e, n[0]), !1), ae = i;
    }
}
function it(e, t) {
  if (ae)
    return e();
  let n = !1;
  t || (ae = []), Ie ? n = !0 : Ie = [], vn++;
  try {
    const r = e();
    return ju(n), r;
  } catch (r) {
    ae || (Ie = null), hi(r);
  }
}
function ju(e) {
  if (ae && (ci(ae), ae = null), e)
    return;
  const t = Ie;
  Ie = null, t.length && it(() => ei(t), !1);
}
function ci(e) {
  for (let t = 0; t < e.length; t++)
    Ot(e[t]);
}
function qu(e) {
  let t, n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? e[n++] = r : Ot(r);
  }
  for (be.context && Nu(), t = 0; t < n; t++)
    Ot(e[t]);
}
function zt(e, t) {
  const n = qe;
  e.state = 0;
  for (let r = 0; r < e.sources.length; r += 1) {
    const i = e.sources[r];
    i.sources && (i.state === Me || n ? i !== t && Ot(i) : (i.state === _t || n) && zt(i, t));
  }
}
function fi(e) {
  const t = qe;
  for (let n = 0; n < e.observers.length; n += 1) {
    const r = e.observers[n];
    (!r.state || t) && (r.state = _t, r.pure ? ae.push(r) : Ie.push(r), r.observers && fi(r));
  }
}
function Bn(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(), r = e.sourceSlots.pop(), i = n.observers;
      if (i && i.length) {
        const u = i.pop(), l = n.observerSlots.pop();
        r < i.length && (u.sourceSlots[l] = r, i[r] = u, n.observerSlots[r] = l);
      }
    }
  if (e.owned) {
    for (t = 0; t < e.owned.length; t++)
      Bn(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = 0; t < e.cleanups.length; t++)
      e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function Hu(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function hi(e) {
  throw e = Hu(e), e;
}
function di(e, t) {
  return e ? e.context && e.context[t] !== void 0 ? e.context[t] : di(e.owner, t) : void 0;
}
function hn(e) {
  if (typeof e == "function" && !e.length)
    return hn(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const r = hn(e[n]);
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r);
    }
    return t;
  }
  return e;
}
function Uu(e, t) {
  return function(r) {
    let i;
    return W(() => i = Te(() => (J.context = {
      [e]: r.value
    }, oi(() => r.children))), void 0), i;
  };
}
const Vu = Symbol("fallback");
function Xn(e) {
  for (let t = 0; t < e.length; t++)
    e[t]();
}
function Wu(e, t, n = {}) {
  let r = [], i = [], u = [], l = 0, o = t.length > 1 ? [] : null;
  return Ft(() => Xn(u)), () => {
    let a = e() || [], s, c;
    return a[fn], Te(() => {
      let D = a.length, p, g, x, k, y, B, w, L, z;
      if (D === 0)
        l !== 0 && (Xn(u), u = [], r = [], i = [], l = 0, o && (o = [])), n.fallback && (r = [Vu], i[0] = Kt((F) => (u[0] = F, n.fallback())), l = 1);
      else if (l === 0) {
        for (i = new Array(D), c = 0; c < D; c++)
          r[c] = a[c], i[c] = Kt(d);
        l = D;
      } else {
        for (x = new Array(D), k = new Array(D), o && (y = new Array(D)), B = 0, w = Math.min(l, D); B < w && r[B] === a[B]; B++)
          ;
        for (w = l - 1, L = D - 1; w >= B && L >= B && r[w] === a[L]; w--, L--)
          x[L] = i[w], k[L] = u[w], o && (y[L] = o[w]);
        for (p = /* @__PURE__ */ new Map(), g = new Array(L + 1), c = L; c >= B; c--)
          z = a[c], s = p.get(z), g[c] = s === void 0 ? -1 : s, p.set(z, c);
        for (s = B; s <= w; s++)
          z = r[s], c = p.get(z), c !== void 0 && c !== -1 ? (x[c] = i[s], k[c] = u[s], o && (y[c] = o[s]), c = g[c], p.set(z, c)) : u[s]();
        for (c = B; c < D; c++)
          c in x ? (i[c] = x[c], u[c] = k[c], o && (o[c] = y[c], o[c](c))) : i[c] = Kt(d);
        i = i.slice(0, l = D), r = a.slice(0);
      }
      return i;
    });
    function d(D) {
      if (u[c] = D, o) {
        const [p, g] = ue(c);
        return o[c] = g, t(a[c], p);
      }
      return t(a[c]);
    }
  };
}
function A(e, t) {
  return Te(() => e(t || {}));
}
function kt() {
  return !0;
}
const pi = {
  get(e, t, n) {
    return t === Se ? n : e.get(t);
  },
  has(e, t) {
    return e.has(t);
  },
  set: kt,
  deleteProperty: kt,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: kt,
      deleteProperty: kt
    };
  },
  ownKeys(e) {
    return e.keys();
  }
};
function Xt(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function Pt(...e) {
  if (e.some((n) => n && (Se in n || typeof n == "function")))
    return new Proxy({
      get(n) {
        for (let r = e.length - 1; r >= 0; r--) {
          const i = Xt(e[r])[n];
          if (i !== void 0)
            return i;
        }
      },
      has(n) {
        for (let r = e.length - 1; r >= 0; r--)
          if (n in Xt(e[r]))
            return !0;
        return !1;
      },
      keys() {
        const n = [];
        for (let r = 0; r < e.length; r++)
          n.push(...Object.keys(Xt(e[r])));
        return [...new Set(n)];
      }
    }, pi);
  const t = {};
  for (let n = e.length - 1; n >= 0; n--)
    if (e[n]) {
      const r = Object.getOwnPropertyDescriptors(e[n]);
      for (const i in r)
        i in t || Object.defineProperty(t, i, {
          enumerable: !0,
          get() {
            for (let u = e.length - 1; u >= 0; u--) {
              const l = (e[u] || {})[i];
              if (l !== void 0)
                return l;
            }
          }
        });
    }
  return t;
}
function gi(e, ...t) {
  const n = new Set(t.flat()), r = Object.getOwnPropertyDescriptors(e), i = Se in e;
  i || t.push(Object.keys(r).filter((l) => !n.has(l)));
  const u = t.map((l) => {
    const o = {};
    for (let a = 0; a < l.length; a++) {
      const s = l[a];
      !i && !(s in e) || Object.defineProperty(o, s, r[s] ? r[s] : {
        get() {
          return e[s];
        },
        set() {
          return !0;
        },
        enumerable: !0
      });
    }
    return o;
  });
  return i && u.push(new Proxy({
    get(l) {
      return n.has(l) ? void 0 : e[l];
    },
    has(l) {
      return n.has(l) ? !1 : l in e;
    },
    keys() {
      return Object.keys(e).filter((l) => !n.has(l));
    }
  }, pi)), u;
}
let Yu = 0;
function Qu() {
  const e = be.context;
  return e ? `${e.id}${e.count++}` : `cl-${Yu++}`;
}
function Ze(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback
  };
  return Be(Wu(() => e.each, e.children, t || void 0));
}
function $e(e) {
  let t = !1;
  const n = e.keyed, r = Be(() => e.when, void 0, {
    equals: (i, u) => t ? i === u : !i == !u
  });
  return Be(() => {
    const i = r();
    if (i) {
      const u = e.children, l = typeof u == "function" && u.length > 0;
      return t = n || l, l ? Te(() => u(i)) : u;
    }
    return e.fallback;
  });
}
function $n(e) {
  let t = !1, n = !1;
  const r = oi(() => e.children), i = Be(() => {
    let u = r();
    Array.isArray(u) || (u = [u]);
    for (let l = 0; l < u.length; l++) {
      const o = u[l].when;
      if (o)
        return n = !!u[l].keyed, [l, o, u[l]];
    }
    return [-1];
  }, void 0, {
    equals: (u, l) => u[0] === l[0] && (t ? u[1] === l[1] : !u[1] == !l[1]) && u[2] === l[2]
  });
  return Be(() => {
    const [u, l, o] = i();
    if (u < 0)
      return e.fallback;
    const a = o.children, s = typeof a == "function" && a.length > 0;
    return t = n || s, s ? Te(() => a(l)) : a;
  });
}
function He(e) {
  return e;
}
const Ku = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"], Xu = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...Ku]), Gu = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]), Zu = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  className: "class",
  htmlFor: "for"
}), Gn = /* @__PURE__ */ Object.assign(/* @__PURE__ */ Object.create(null), {
  class: "className",
  formnovalidate: "formNoValidate",
  ismap: "isMap",
  nomodule: "noModule",
  playsinline: "playsInline",
  readonly: "readOnly"
}), Ju = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]), el = {
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace"
};
function tl(e, t, n) {
  let r = n.length, i = t.length, u = r, l = 0, o = 0, a = t[i - 1].nextSibling, s = null;
  for (; l < i || o < u; ) {
    if (t[l] === n[o]) {
      l++, o++;
      continue;
    }
    for (; t[i - 1] === n[u - 1]; )
      i--, u--;
    if (i === l) {
      const c = u < r ? o ? n[o - 1].nextSibling : n[u - o] : a;
      for (; o < u; )
        e.insertBefore(n[o++], c);
    } else if (u === o)
      for (; l < i; )
        (!s || !s.has(t[l])) && t[l].remove(), l++;
    else if (t[l] === n[u - 1] && n[o] === t[i - 1]) {
      const c = t[--i].nextSibling;
      e.insertBefore(n[o++], t[l++].nextSibling), e.insertBefore(n[--u], c), t[i] = n[u];
    } else {
      if (!s) {
        s = /* @__PURE__ */ new Map();
        let d = o;
        for (; d < u; )
          s.set(n[d], d++);
      }
      const c = s.get(t[l]);
      if (c != null)
        if (o < c && c < u) {
          let d = l, D = 1, p;
          for (; ++d < i && d < u && !((p = s.get(t[d])) == null || p !== c + D); )
            D++;
          if (D > c - o) {
            const g = t[l];
            for (; o < c; )
              e.insertBefore(n[o++], g);
          } else
            e.replaceChild(n[o++], t[l++]);
        } else
          l++;
      else
        t[l++].remove();
    }
  }
}
const Zn = "_$DX_DELEGATE";
function S(e, t, n) {
  const r = document.createElement("template");
  r.innerHTML = e;
  let i = r.content.firstChild;
  return n && (i = i.firstChild), i;
}
function ut(e, t = window.document) {
  const n = t[Zn] || (t[Zn] = /* @__PURE__ */ new Set());
  for (let r = 0, i = e.length; r < i; r++) {
    const u = e[r];
    n.has(u) || (n.add(u), t.addEventListener(u, ol));
  }
}
function ve(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function nl(e, t, n, r) {
  r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r);
}
function rl(e, t) {
  t == null ? e.removeAttribute("class") : e.className = t;
}
function mi(e, t, n, r) {
  if (r)
    Array.isArray(n) ? (e[`$$${t}`] = n[0], e[`$$${t}Data`] = n[1]) : e[`$$${t}`] = n;
  else if (Array.isArray(n)) {
    const i = n[0];
    e.addEventListener(t, n[0] = (u) => i.call(e, n[1], u));
  } else
    e.addEventListener(t, n);
}
function qt(e, t, n = {}) {
  const r = Object.keys(t || {}), i = Object.keys(n);
  let u, l;
  for (u = 0, l = i.length; u < l; u++) {
    const o = i[u];
    !o || o === "undefined" || t[o] || (Jn(e, o, !1), delete n[o]);
  }
  for (u = 0, l = r.length; u < l; u++) {
    const o = r[u], a = !!t[o];
    !o || o === "undefined" || n[o] === a || !a || (Jn(e, o, !0), n[o] = a);
  }
  return n;
}
function il(e, t, n) {
  if (!t)
    return n ? ve(e, "style") : t;
  const r = e.style;
  if (typeof t == "string")
    return r.cssText = t;
  typeof n == "string" && (r.cssText = n = void 0), n || (n = {}), t || (t = {});
  let i, u;
  for (u in n)
    t[u] == null && r.removeProperty(u), delete n[u];
  for (u in t)
    i = t[u], i !== n[u] && (r.setProperty(u, i), n[u] = i);
  return n;
}
function Ln(e, t = {}, n, r) {
  const i = {};
  return r || W(() => i.children = rt(e, t.children, i.children)), W(() => t.ref && t.ref(e)), W(() => ul(e, t, n, !0, i, !0)), i;
}
function nt(e, t, n) {
  return Te(() => e(t, n));
}
function E(e, t, n, r) {
  if (n !== void 0 && !r && (r = []), typeof t != "function")
    return rt(e, t, r, n);
  W((i) => rt(e, t(), i, n), r);
}
function ul(e, t, n, r, i = {}, u = !1) {
  t || (t = {});
  for (const l in i)
    if (!(l in t)) {
      if (l === "children")
        continue;
      i[l] = er(e, l, null, i[l], n, u);
    }
  for (const l in t) {
    if (l === "children") {
      r || rt(e, t.children);
      continue;
    }
    const o = t[l];
    i[l] = er(e, l, o, i[l], n, u);
  }
}
function ll(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase());
}
function Jn(e, t, n) {
  const r = t.trim().split(/\s+/);
  for (let i = 0, u = r.length; i < u; i++)
    e.classList.toggle(r[i], n);
}
function er(e, t, n, r, i, u) {
  let l, o, a;
  if (t === "style")
    return il(e, n, r);
  if (t === "classList")
    return qt(e, n, r);
  if (n === r)
    return r;
  if (t === "ref")
    u || n(e);
  else if (t.slice(0, 3) === "on:") {
    const s = t.slice(3);
    r && e.removeEventListener(s, r), n && e.addEventListener(s, n);
  } else if (t.slice(0, 10) === "oncapture:") {
    const s = t.slice(10);
    r && e.removeEventListener(s, r, !0), n && e.addEventListener(s, n, !0);
  } else if (t.slice(0, 2) === "on") {
    const s = t.slice(2).toLowerCase(), c = Ju.has(s);
    if (!c && r) {
      const d = Array.isArray(r) ? r[0] : r;
      e.removeEventListener(s, d);
    }
    (c || n) && (mi(e, s, n, c), c && ut([s]));
  } else if ((a = Gu.has(t)) || !i && (Gn[t] || (o = Xu.has(t))) || (l = e.nodeName.includes("-")))
    t === "class" || t === "className" ? rl(e, n) : l && !o && !a ? e[ll(t)] = n : e[Gn[t] || t] = n;
  else {
    const s = i && t.indexOf(":") > -1 && el[t.split(":")[0]];
    s ? nl(e, s, t, n) : ve(e, Zu[t] || t, n);
  }
  return n;
}
function ol(e) {
  const t = `$$${e.type}`;
  let n = e.composedPath && e.composedPath()[0] || e.target;
  for (e.target !== n && Object.defineProperty(e, "target", {
    configurable: !0,
    value: n
  }), Object.defineProperty(e, "currentTarget", {
    configurable: !0,
    get() {
      return n || document;
    }
  }), be.registry && !be.done && (be.done = !0, document.querySelectorAll("[id^=pl-]").forEach((r) => r.remove())); n !== null; ) {
    const r = n[t];
    if (r && !n.disabled) {
      const i = n[`${t}Data`];
      if (i !== void 0 ? r.call(n, i, e) : r.call(n, e), e.cancelBubble)
        return;
    }
    n = n.host && n.host !== n && n.host instanceof Node ? n.host : n.parentNode;
  }
}
function rt(e, t, n, r, i) {
  for (be.context && !n && (n = [...e.childNodes]); typeof n == "function"; )
    n = n();
  if (t === n)
    return n;
  const u = typeof t, l = r !== void 0;
  if (e = l && n[0] && n[0].parentNode || e, u === "string" || u === "number") {
    if (be.context)
      return n;
    if (u === "number" && (t = t.toString()), l) {
      let o = n[0];
      o && o.nodeType === 3 ? o.data = t : o = document.createTextNode(t), n = Xe(e, n, r, o);
    } else
      n !== "" && typeof n == "string" ? n = e.firstChild.data = t : n = e.textContent = t;
  } else if (t == null || u === "boolean") {
    if (be.context)
      return n;
    n = Xe(e, n, r);
  } else {
    if (u === "function")
      return W(() => {
        let o = t();
        for (; typeof o == "function"; )
          o = o();
        n = rt(e, o, n, r);
      }), () => n;
    if (Array.isArray(t)) {
      const o = [], a = n && Array.isArray(n);
      if (dn(o, t, n, i))
        return W(() => n = rt(e, o, n, r, !0)), () => n;
      if (be.context) {
        if (!o.length)
          return n;
        for (let s = 0; s < o.length; s++)
          if (o[s].parentNode)
            return n = o;
      }
      if (o.length === 0) {
        if (n = Xe(e, n, r), l)
          return n;
      } else
        a ? n.length === 0 ? tr(e, o, r) : tl(e, n, o) : (n && Xe(e), tr(e, o));
      n = o;
    } else if (t instanceof Node) {
      if (be.context && t.parentNode)
        return n = l ? [t] : t;
      if (Array.isArray(n)) {
        if (l)
          return n = Xe(e, n, r, t);
        Xe(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild ? e.appendChild(t) : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function dn(e, t, n, r) {
  let i = !1;
  for (let u = 0, l = t.length; u < l; u++) {
    let o = t[u], a = n && n[u];
    if (o instanceof Node)
      e.push(o);
    else if (!(o == null || o === !0 || o === !1))
      if (Array.isArray(o))
        i = dn(e, o, a) || i;
      else if (typeof o == "function")
        if (r) {
          for (; typeof o == "function"; )
            o = o();
          i = dn(e, Array.isArray(o) ? o : [o], Array.isArray(a) ? a : [a]) || i;
        } else
          e.push(o), i = !0;
      else {
        const s = String(o);
        a && a.nodeType === 3 && a.data === s ? e.push(a) : e.push(document.createTextNode(s));
      }
  }
  return i;
}
function tr(e, t, n = null) {
  for (let r = 0, i = t.length; r < i; r++)
    e.insertBefore(t[r], n);
}
function Xe(e, t, n, r) {
  if (n === void 0)
    return e.textContent = "";
  const i = r || document.createTextNode("");
  if (t.length) {
    let u = !1;
    for (let l = t.length - 1; l >= 0; l--) {
      const o = t[l];
      if (i !== o) {
        const a = o.parentNode === e;
        !u && !l ? a ? e.replaceChild(i, o) : e.insertBefore(i, n) : a && o.remove();
      } else
        u = !0;
    }
  } else
    e.insertBefore(i, n);
  return [i];
}
function al(e) {
  return e !== null && (typeof e == "object" || typeof e == "function");
}
function nr(e, ...t) {
  return typeof e == "function" ? e(...t) : e;
}
var sl = Object.entries, cl = Object.keys;
function fl(e) {
  const t = { ...e }, n = {}, r = /* @__PURE__ */ new Map(), i = (o) => {
    const a = r.get(o);
    if (a)
      return a[0]();
    const s = ue(t[o], {
      name: typeof o == "string" ? o : void 0
    });
    return r.set(o, s), delete t[o], s[0]();
  }, u = (o, a) => {
    const s = r.get(o);
    if (s)
      return s[1](a);
    o in t && (t[o] = nr(a, [t[o]]));
  };
  for (const o of cl(e))
    n[o] = void 0, Object.defineProperty(n, o, {
      get: i.bind(void 0, o)
    });
  return [n, (o, a) => (al(o) ? Te(() => {
    ni(() => {
      for (const [s, c] of sl(nr(o, n)))
        u(s, () => c);
    });
  }) : u(o, a), n)];
}
var hl = (e) => ii() ? Ft(e) : e;
function dl(e, t, n, r) {
  return e.addEventListener(t, n, r), hl(e.removeEventListener.bind(e, t, n, r));
}
function rr() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}
function pl() {
  const [e, t] = fl(rr());
  return dl(window, "resize", () => t(rr())), e;
}
const pn = Symbol("store-raw"), Dt = Symbol("store-node"), gl = Symbol("store-name");
function Di(e, t) {
  let n = e[Se];
  if (!n && (Object.defineProperty(e, Se, {
    value: n = new Proxy(e, yl)
  }), !Array.isArray(e))) {
    const r = Object.keys(e), i = Object.getOwnPropertyDescriptors(e);
    for (let u = 0, l = r.length; u < l; u++) {
      const o = r[u];
      if (i[o].get) {
        const a = i[o].get.bind(n);
        Object.defineProperty(e, o, {
          enumerable: i[o].enumerable,
          get: a
        });
      }
    }
  }
  return n;
}
function It(e) {
  let t;
  return e != null && typeof e == "object" && (e[Se] || !(t = Object.getPrototypeOf(e)) || t === Object.prototype || Array.isArray(e));
}
function yt(e, t = /* @__PURE__ */ new Set()) {
  let n, r, i, u;
  if (n = e != null && e[pn])
    return n;
  if (!It(e) || t.has(e))
    return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? e = e.slice(0) : t.add(e);
    for (let l = 0, o = e.length; l < o; l++)
      i = e[l], (r = yt(i, t)) !== i && (e[l] = r);
  } else {
    Object.isFrozen(e) ? e = Object.assign({}, e) : t.add(e);
    const l = Object.keys(e), o = Object.getOwnPropertyDescriptors(e);
    for (let a = 0, s = l.length; a < s; a++)
      u = l[a], !o[u].get && (i = e[u], (r = yt(i, t)) !== i && (e[u] = r));
  }
  return e;
}
function _n(e) {
  let t = e[Dt];
  return t || Object.defineProperty(e, Dt, {
    value: t = {}
  }), t;
}
function gn(e, t, n) {
  return e[t] || (e[t] = Fi(n));
}
function ml(e, t) {
  const n = Reflect.getOwnPropertyDescriptor(e, t);
  return !n || n.get || !n.configurable || t === Se || t === Dt || t === gl || (delete n.value, delete n.writable, n.get = () => e[Se][t]), n;
}
function yi(e) {
  if (ri()) {
    const t = _n(e);
    (t._ || (t._ = Fi()))();
  }
}
function Dl(e) {
  return yi(e), Reflect.ownKeys(e);
}
function Fi(e) {
  const [t, n] = ue(e, {
    equals: !1,
    internal: !0
  });
  return t.$ = n, t;
}
const yl = {
  get(e, t, n) {
    if (t === pn)
      return e;
    if (t === Se)
      return n;
    if (t === fn)
      return yi(e), n;
    const r = _n(e), i = r.hasOwnProperty(t);
    let u = i ? r[t]() : e[t];
    if (t === Dt || t === "__proto__")
      return u;
    if (!i) {
      const l = Object.getOwnPropertyDescriptor(e, t);
      ri() && (typeof u != "function" || e.hasOwnProperty(t)) && !(l && l.get) && (u = gn(r, t, u)());
    }
    return It(u) ? Di(u) : u;
  },
  has(e, t) {
    return t === pn || t === Se || t === fn || t === Dt || t === "__proto__" ? !0 : (this.get(e, t, e), t in e);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: Dl,
  getOwnPropertyDescriptor: ml
};
function Tt(e, t, n, r = !1) {
  if (!r && e[t] === n)
    return;
  const i = e[t], u = e.length;
  n === void 0 ? delete e[t] : e[t] = n;
  let l = _n(e), o;
  (o = gn(l, t, i)) && o.$(() => n), Array.isArray(e) && e.length !== u && (o = gn(l, "length", u)) && o.$(e.length), (o = l._) && o.$();
}
function xi(e, t) {
  const n = Object.keys(t);
  for (let r = 0; r < n.length; r += 1) {
    const i = n[r];
    Tt(e, i, t[i]);
  }
}
function Fl(e, t) {
  if (typeof t == "function" && (t = t(e)), t = yt(t), Array.isArray(t)) {
    if (e === t)
      return;
    let n = 0, r = t.length;
    for (; n < r; n++) {
      const i = t[n];
      e[n] !== i && Tt(e, n, i);
    }
    Tt(e, "length", r);
  } else
    xi(e, t);
}
function dt(e, t, n = []) {
  let r, i = e;
  if (t.length > 1) {
    r = t.shift();
    const l = typeof r, o = Array.isArray(e);
    if (Array.isArray(r)) {
      for (let a = 0; a < r.length; a++)
        dt(e, [r[a]].concat(t), n);
      return;
    } else if (o && l === "function") {
      for (let a = 0; a < e.length; a++)
        r(e[a], a) && dt(e, [a].concat(t), n);
      return;
    } else if (o && l === "object") {
      const {
        from: a = 0,
        to: s = e.length - 1,
        by: c = 1
      } = r;
      for (let d = a; d <= s; d += c)
        dt(e, [d].concat(t), n);
      return;
    } else if (t.length > 1) {
      dt(e[r], t, [r].concat(n));
      return;
    }
    i = e[r], n = [r].concat(n);
  }
  let u = t[0];
  typeof u == "function" && (u = u(i, n), u === i) || r === void 0 && u == null || (u = yt(u), r === void 0 || It(i) && It(u) && !Array.isArray(u) ? xi(i, u) : Tt(e, r, u));
}
function bi(...[e, t]) {
  const n = yt(e || {}), r = Array.isArray(n), i = Di(n);
  function u(...l) {
    ni(() => {
      r && l.length === 1 ? Fl(n, l[0]) : dt(n, l);
    });
  }
  return [i, u];
}
const xl = /^\/+|\/+$/g;
function ir(e, t = !1) {
  const n = e.replace(xl, "");
  return n ? t || /^[?#]/.test(n) ? n : "/" + n : "";
}
function bl(e, t) {
  if (e == null)
    throw new Error(t);
  return e;
}
const Cl = ui(), Al = ui(), On = () => bl(li(Cl), "Make sure your app is wrapped in a <Router />"), kl = () => li(Al) || On().base, wl = (e) => {
  const t = kl();
  return Be(() => t.resolvePath(e()));
}, El = (e) => {
  const t = On();
  return Be(() => {
    const n = e();
    return n !== void 0 ? t.renderPath(n) : n;
  });
}, zn = () => On().location, vl = /* @__PURE__ */ S("<a link></a>");
function Sl(e) {
  e = Pt({
    inactiveClass: "inactive",
    activeClass: "active"
  }, e);
  const [, t] = gi(e, ["href", "state", "class", "activeClass", "inactiveClass", "end"]), n = wl(() => e.href), r = El(n), i = zn(), u = Be(() => {
    const l = n();
    if (l === void 0)
      return !1;
    const o = ir(l.split(/[?#]/, 1)[0]).toLowerCase(), a = ir(i.pathname).toLowerCase();
    return e.end ? o === a : a.startsWith(o);
  });
  return (() => {
    const l = vl.cloneNode(!0);
    return Ln(l, Pt(t, {
      get href() {
        return r() || e.href;
      },
      get state() {
        return JSON.stringify(e.state);
      },
      get classList() {
        return {
          ...e.class && {
            [e.class]: !0
          },
          [e.inactiveClass]: !u(),
          [e.activeClass]: u(),
          ...t.classList
        };
      },
      get ["aria-current"]() {
        return u() ? "page" : void 0;
      }
    }), !1, !1), l;
  })();
}
const Bl = "([a-z]{2,3}|\\*)", $l = "(?:-([a-z]{4}|\\*))", Ll = "(?:-([a-z]{2}|\\*))", _l = "(?:-(([0-9][a-z0-9]{3}|[a-z0-9]{5,8})|\\*))", Ol = new RegExp(
  `^${Bl}${$l}?${Ll}?${_l}?$`,
  "i"
);
class pt {
  constructor(t) {
    const n = Ol.exec(t.replace(/_/g, "-"));
    if (!n) {
      this.isWellFormed = !1;
      return;
    }
    let [, r, i, u, l] = n;
    r && (this.language = r.toLowerCase()), i && (this.script = i[0].toUpperCase() + i.slice(1)), u && (this.region = u.toUpperCase()), this.variant = l, this.isWellFormed = !0;
  }
  isEqual(t) {
    return this.language === t.language && this.script === t.script && this.region === t.region && this.variant === t.variant;
  }
  matches(t, n = !1, r = !1) {
    return (this.language === t.language || n && this.language === void 0 || r && t.language === void 0) && (this.script === t.script || n && this.script === void 0 || r && t.script === void 0) && (this.region === t.region || n && this.region === void 0 || r && t.region === void 0) && (this.variant === t.variant || n && this.variant === void 0 || r && t.variant === void 0);
  }
  toString() {
    return [this.language, this.script, this.region, this.variant].filter((t) => t !== void 0).join("-");
  }
  clearVariants() {
    this.variant = void 0;
  }
  clearRegion() {
    this.region = void 0;
  }
  addLikelySubtags() {
    const t = Pl(this.toString().toLowerCase());
    return t ? (this.language = t.language, this.script = t.script, this.region = t.region, this.variant = t.variant, !0) : !1;
  }
}
const ur = {
  ar: "ar-arab-eg",
  "az-arab": "az-arab-ir",
  "az-ir": "az-arab-ir",
  be: "be-cyrl-by",
  da: "da-latn-dk",
  el: "el-grek-gr",
  en: "en-latn-us",
  fa: "fa-arab-ir",
  ja: "ja-jpan-jp",
  ko: "ko-kore-kr",
  pt: "pt-latn-br",
  sr: "sr-cyrl-rs",
  "sr-ru": "sr-latn-ru",
  sv: "sv-latn-se",
  ta: "ta-taml-in",
  uk: "uk-cyrl-ua",
  zh: "zh-hans-cn",
  "zh-hant": "zh-hant-tw",
  "zh-hk": "zh-hant-hk",
  "zh-mo": "zh-hant-mo",
  "zh-tw": "zh-hant-tw",
  "zh-gb": "zh-hant-gb",
  "zh-us": "zh-hant-us"
}, zl = [
  "az",
  "bg",
  "cs",
  "de",
  "es",
  "fi",
  "fr",
  "hu",
  "it",
  "lt",
  "lv",
  "nl",
  "pl",
  "ro",
  "ru"
];
function Pl(e) {
  if (Object.prototype.hasOwnProperty.call(ur, e))
    return new pt(ur[e]);
  const t = new pt(e);
  return t.language && zl.includes(t.language) ? (t.region = t.language.toUpperCase(), t) : null;
}
function Il(e, t, n) {
  const r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Map();
  for (let u of t)
    new pt(u).isWellFormed && i.set(u, new pt(u));
  e:
    for (const u of e) {
      const l = u.toLowerCase(), o = new pt(l);
      if (o.language !== void 0) {
        for (const a of i.keys())
          if (l === a.toLowerCase()) {
            if (r.add(a), i.delete(a), n === "lookup")
              return Array.from(r);
            if (n === "filtering")
              continue;
            continue e;
          }
        for (const [a, s] of i.entries())
          if (s.matches(o, !0, !1)) {
            if (r.add(a), i.delete(a), n === "lookup")
              return Array.from(r);
            if (n === "filtering")
              continue;
            continue e;
          }
        if (o.addLikelySubtags()) {
          for (const [a, s] of i.entries())
            if (s.matches(o, !0, !1)) {
              if (r.add(a), i.delete(a), n === "lookup")
                return Array.from(r);
              if (n === "filtering")
                continue;
              continue e;
            }
        }
        o.clearVariants();
        for (const [a, s] of i.entries())
          if (s.matches(o, !0, !0)) {
            if (r.add(a), i.delete(a), n === "lookup")
              return Array.from(r);
            if (n === "filtering")
              continue;
            continue e;
          }
        if (o.clearRegion(), o.addLikelySubtags()) {
          for (const [a, s] of i.entries())
            if (s.matches(o, !0, !1)) {
              if (r.add(a), i.delete(a), n === "lookup")
                return Array.from(r);
              if (n === "filtering")
                continue;
              continue e;
            }
        }
        o.clearRegion();
        for (const [a, s] of i.entries())
          if (s.matches(o, !0, !0)) {
            if (r.add(a), i.delete(a), n === "lookup")
              return Array.from(r);
            if (n === "filtering")
              continue;
            continue e;
          }
      }
    }
  return Array.from(r);
}
function Tl(e, t, { strategy: n = "filtering", defaultLocale: r } = {}) {
  const i = Il(
    Array.from(
      e != null ? e : []
    ).map(String),
    Array.from(
      t != null ? t : []
    ).map(String),
    n
  );
  if (n === "lookup") {
    if (r === void 0)
      throw new Error(
        "defaultLocale cannot be undefined for strategy `lookup`"
      );
    i.length === 0 && i.push(r);
  } else
    r && !i.includes(r) && i.push(r);
  return i;
}
const Nl = /* @__PURE__ */ S('<div class="flex justify-center items-center"><code>Datagrove</code></div>'), Ml = /* @__PURE__ */ S("<div></div>"), Rl = () => Nl.cloneNode(!0), [lr, jl] = ue(Ml.cloneNode(!0)), [mn, Ht] = ue(!1);
class ql {
  constructor(t, n, r) {
    j(this, "lang", "en");
    this.page = t, this.topSection = n, this.loc = r;
  }
  get topTab() {
    return ze.root.children[this.topSection];
  }
}
class kd {
  constructor() {
    j(this, "loaded", !1);
  }
}
class Hl {
  constructor() {
    j(this, "title", Rl);
    j(this, "href", "https://www.datagrove.com");
    j(this, "sitemap", []);
    j(this, "language", {});
    j(this, "root", { name: "/", path: "/", children: [] });
    j(this, "path", /* @__PURE__ */ new Map());
    j(this, "home");
    j(this, "search", []);
  }
}
const [Nt, Ci] = ue([]), [Mt, Ai] = ue([]);
function Ul(e) {
  Ci([ki(e), ...Nt()]);
}
function Vl(e) {
  const t = Nt();
  t.splice(e, 1), Ci(t);
}
function ki(e) {
  const t = Mt(), n = t.splice(e, 1)[0];
  return Ai(t), n;
}
function Wl(e) {
  Ai([e, ...Mt()]);
}
function Yl(e) {
  return e.length == 0 ? [] : (e = e.toLowerCase(), ze.search.filter((n) => n.title.indexOf(e) != -1));
}
class wd {
  constructor() {
    j(this, "recent", []);
  }
}
const Ed = /* @__PURE__ */ new Set(["ar"]), [ze, Ql] = bi(new Hl()), or = () => {
  var a;
  const e = zn(), n = (a = ze.root.children) != null ? a : [], r = e.pathname.split("/");
  r.shift();
  let i = r.length > 0 ? r[0] : "en", u = r.length > 1 ? parseInt(r[1]) : 0;
  u >= n.length && (u = 0);
  let l = ze.home;
  if (r.length <= 2, r.length > 2) {
    i = r[1];
    const s = e.pathname.substring(i.length + 1);
    l = ze.path.get(s);
  }
  const o = new ql(l != null ? l : ze.home, u, e);
  return console.log("page", o), o;
};
function vd(e, t) {
  var i;
  t || (t = Tl(
    navigator.languages,
    Object.keys(e.language),
    { defaultLocale: "en", strategy: "lookup" }
  )[0]), console.log("locale", t);
  const n = (u) => u.children ? n(u.children[0]) : u, r = (u, l) => {
    var o, a;
    if (u.path) {
      let s = "/" + t + `/${l}` + u.path;
      e.search.push({
        title: u.name.toLocaleLowerCase(),
        href: s
      }), e.path.set(s, u);
    }
    for (let s of (o = u.children) != null ? o : [])
      s.parent = (a = s.parent) != null ? a : u, r(s, l);
  };
  e.root = { name: "/", children: e.sitemap }, e.home = (i = e.home) != null ? i : n(e.root);
  for (let u = 0; u < e.root.children.length; u++)
    r(e.root.children[u], u);
  Ql(e), console.log(e);
}
function Kl(e, t) {
  var n;
  (n = window == null ? void 0 : window.top) == null || n.postMessage({ method: e, params: t }, "*");
}
window.onmessage = function(e) {
  e.data == "hello" && alert("It works!");
};
var je = /* @__PURE__ */ ((e) => (e[e.adaptive = 0] = "adaptive", e[e.none = 1] = "none", e[e.full = 2] = "full", e[e.split = 3] = "split", e))(je || {}), Xl = /* @__PURE__ */ ((e) => (e[e.adaptive = 0] = "adaptive", e[e.none = 1] = "none", e[e.display = 2] = "display", e))(Xl || {});
const [Gt, Gl] = ue(0), [ar, Zl] = ue(0), wi = pl(), Pn = () => wi.width < 650, Ne = () => Pn() ? Gt() == 1 ? 1 : 2 : Gt() == 0 ? wi.width > 850 ? 3 : 1 : Gt(), Ei = () => ar() == 0 ? !Pn() : ar() == 2, Jl = () => {
  console.log("no sitemap"), Gl(Ne() == 1 ? 3 : 1);
}, eo = () => {
  console.log("no pagemap"), Zl(Ei() ? 1 : 2);
};
class to {
  constructor() {
    j(this, "length", 0);
  }
}
class Sd {
  constructor() {
    j(this, "query", new to());
    j(this, "anchor", 0);
    j(this, "runway", []);
  }
}
class no {
  constructor() {
    j(this, "open", !1);
    j(this, "app", "");
    j(this, "closed", !1);
    j(this, "width", 300);
    j(this, "width2", 300);
    j(this, "closed2", !1);
    j(this, "folder");
    j(this, "found");
    j(this, "recentSearch", []);
    j(this, "crumb", []);
  }
}
class Bd {
  constructor() {
    j(this, "html", "");
  }
}
class $d {
  constructor() {
    j(this, "item", []);
  }
  reorder(t) {
  }
}
async function Ld(e) {
}
const [_d, Od] = bi(new no());
var Rt = (e, t) => {
  let n = !1, r, i;
  const u = (...o) => {
    i = o, !n && (n = !0, r = setTimeout(() => {
      e(...i), n = !1;
    }, t));
  }, l = () => {
    clearTimeout(r), n = !1;
  };
  return ii() && Ft(l), Object.assign(u, { clear: l });
};
const ro = /* @__PURE__ */ S('<div class="w-full  hover:bg-neutral-500  group flex items-center justify-center flex-col cursor-col-resize  "><div class="cursor-col-resize"></div></div>'), io = /* @__PURE__ */ S('<div class=" w-full h-full min-h-0 font-sans"><div class=" relative h-full w-full overflow-y-auto  flex  bg-color-black"></div></div>'), uo = (e) => {
  let t = e.size(), n = 0, r = 0;
  const [i, u] = ue(!1), l = (p) => {
    t = e.size(), n = p.clientX, r = p.clientY, u(!0);
  }, o = (p) => {
    t = e.size();
    const g = p.touches[0];
    n = g.clientX, r = g.clientY, u(!0);
  }, a = () => {
    u(!1);
  }, s = (p, g) => {
    e.onResize(t + p - n, g - r);
  }, c = Rt((p) => {
    s(p.clientX, p.clientY);
  }, 10), d = Rt((p) => {
    const g = p.touches[0];
    s(g.clientX, g.clientY);
  }, 10), D = (p) => {
    e.ref(p), p.addEventListener("mousedown", l), p.addEventListener("touchstart", o), Ft(() => {
      p.removeEventListener("mousedown", l), p.removeEventListener("touchstart", o);
    });
  };
  return jt(() => {
    i() ? (window.addEventListener("mousemove", c), window.addEventListener("mouseup", a), window.addEventListener("touchmove", d), window.addEventListener("touchend", a)) : (window.removeEventListener("mousemove", c), window.removeEventListener("mouseup", a), window.removeEventListener("touchmove", d), window.removeEventListener("touchend", a));
  }), (() => {
    const p = ro.cloneNode(!0), g = p.firstChild;
    return nt(D, p), W((x) => {
      const k = !!i(), y = {
        "fixed inset-0 z-10": i(),
        hidden: !i()
      };
      return k !== x._v$ && p.classList.toggle("bg-neutral-500", x._v$ = k), x._v$2 = qt(g, y, x._v$2), x;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), p;
  })();
}, lo = (e) => {
  let t, n;
  const r = (l, o) => {
    e.setLeft(l);
  }, i = () => {
    var l;
    return (l = e.children) != null ? l : [][0];
  }, u = () => {
    var l;
    return (l = e.children) != null ? l : [][1];
  };
  return (() => {
    const l = io.cloneNode(!0), o = l.firstChild, a = n;
    return typeof a == "function" ? nt(a, l) : n = l, l.style.setProperty("display", "grid"), E(o, i), E(l, A(uo, {
      ref(s) {
        const c = t;
        typeof c == "function" ? c(s) : t = s;
      },
      get size() {
        return e.left;
      },
      onResize: r
    }), null), E(l, u, null), W(() => l.style.setProperty("grid-template-columns", `${e.left()}px 12px 1fr`)), l;
  })();
}, oo = /* @__PURE__ */ S("<svg></svg>"), ie = (e) => {
  const [t, n] = gi(e, ["path"]);
  return (() => {
    const r = oo.cloneNode(!0);
    return Ln(r, Pt({
      get viewBox() {
        return t.path.mini ? "0 0 20 20" : "0 0 24 24";
      },
      get fill() {
        return t.path.outline ? "none" : "currentColor";
      },
      get stroke() {
        return t.path.outline ? "currentColor" : "none";
      },
      get ["stroke-width"]() {
        return t.path.outline ? 1.5 : void 0;
      }
    }, n), !0, !0), E(r, () => t.path.path), r;
  })();
}, ao = /* @__PURE__ */ S('<svg><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"></path></svg>', 4, !0), so = /* @__PURE__ */ S('<svg><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path></svg>', 4, !0), co = /* @__PURE__ */ S('<svg><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"></path></svg>', 4, !0), fo = /* @__PURE__ */ S('<svg><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>', 4, !0), ho = /* @__PURE__ */ S('<svg><path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"></path></svg>', 4, !0), po = /* @__PURE__ */ S('<svg><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>', 4, !0), go = {
  path: () => ao.cloneNode(!0),
  outline: !0,
  mini: !1
}, mo = {
  path: () => so.cloneNode(!0),
  outline: !0,
  mini: !1
}, Do = {
  path: () => co.cloneNode(!0),
  outline: !0,
  mini: !1
}, yo = {
  path: () => fo.cloneNode(!0),
  outline: !0,
  mini: !1
}, Fo = {
  path: () => ho.cloneNode(!0),
  outline: !0,
  mini: !1
}, vi = {
  path: () => po.cloneNode(!0),
  outline: !0,
  mini: !1
}, xo = /* @__PURE__ */ S('<svg><path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd"></path></svg>', 4, !0), bo = /* @__PURE__ */ S('<svg><path fill-rule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clip-rule="evenodd"></path></svg>', 4, !0), Co = /* @__PURE__ */ S('<svg><path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clip-rule="evenodd"></path></svg>', 4, !0), Ao = /* @__PURE__ */ S('<svg><path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 00-2.282.819l-.922 1.597a1.875 1.875 0 00.432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 000 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 00-.432 2.385l.922 1.597a1.875 1.875 0 002.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 002.28-.819l.923-1.597a1.875 1.875 0 00-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 000-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 00-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 00-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 00-1.85-1.567h-1.843zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd"></path></svg>', 4, !0), ko = /* @__PURE__ */ S('<svg><path fill-rule="evenodd" d="M9 2.25a.75.75 0 01.75.75v1.506a49.38 49.38 0 015.343.371.75.75 0 11-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 01-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 11-1.07 1.052A18.902 18.902 0 019 13.687a18.823 18.823 0 01-5.656 4.482.75.75 0 11-.688-1.333 17.323 17.323 0 005.396-4.353A18.72 18.72 0 015.89 8.598a.75.75 0 011.388-.568A17.21 17.21 0 009 11.224a17.17 17.17 0 002.391-5.165 48.038 48.038 0 00-8.298.307.75.75 0 01-.186-1.489 49.159 49.159 0 015.343-.371V3A.75.75 0 019 2.25zM15.75 9a.75.75 0 01.68.433l5.25 11.25a.75.75 0 01-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 01-1.36-.634l5.25-11.25A.75.75 0 0115.75 9zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726z" clip-rule="evenodd"></path></svg>', 4, !0), wo = /* @__PURE__ */ S('<svg><path fill-rule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clip-rule="evenodd"></path></svg>', 4, !0), Eo = /* @__PURE__ */ S('<svg><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"></path></svg>', 4, !0), vo = /* @__PURE__ */ S('<svg><path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"></path></svg>', 4, !0), So = /* @__PURE__ */ S('<svg><path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"></path></svg>', 4, !0), Bo = /* @__PURE__ */ S('<svg><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path></svg>', 4, !0), $o = {
  path: () => xo.cloneNode(!0),
  outline: !1,
  mini: !1
}, Si = {
  path: () => bo.cloneNode(!0),
  outline: !1,
  mini: !1
}, In = {
  path: () => Co.cloneNode(!0),
  outline: !1,
  mini: !1
}, Lo = {
  path: () => Ao.cloneNode(!0),
  outline: !1,
  mini: !1
}, _o = {
  path: () => ko.cloneNode(!0),
  outline: !1,
  mini: !1
}, Oo = {
  path: () => wo.cloneNode(!0),
  outline: !1,
  mini: !1
}, zo = {
  path: () => Eo.cloneNode(!0),
  outline: !1,
  mini: !1
}, Po = {
  path: () => [vo.cloneNode(!0), So.cloneNode(!0)],
  outline: !1,
  mini: !1
}, Io = {
  path: () => Bo.cloneNode(!0),
  outline: !1,
  mini: !1
}, To = /* @__PURE__ */ S('<kbd class="h-6 w-6 border border-transparent mr-1 white dark:bg-neutral-800 text-neutral-500 p-0 inline-flex justify-center items-center  text text-center rounded"></kbd>');
function Ge(e) {
  return (() => {
    const t = To.cloneNode(!0);
    return Ln(t, e, !1, !1), t;
  })();
}
const No = /* @__PURE__ */ S('<li class="m-2"></li>'), Mo = /* @__PURE__ */ S('<h3><button class="w-full text-solid-dark dark:text-solid-light text-left relative flex items-center justify-between py-2"></button></h3>'), Ro = /* @__PURE__ */ S('<ul class="opacity-100 md:border-l border-solid-lightitem dark:border-solid-darkitem" style="list-none transition: opacity 250ms ease-in-out 0s; animation: 250ms ease-in-out 0s 1 normal none running nav-fadein;"></ul>'), jo = /* @__PURE__ */ S("<li></li>");
function qo(e) {
  const [t, n] = ue(e.startCollapsed || !1), r = Qu();
  return (() => {
    const i = No.cloneNode(!0);
    return E(i, A(Ho, {
      get collapsed() {
        return t();
      },
      onClick: () => n((u) => !u),
      panelId: r,
      get children() {
        return e.header;
      }
    }), null), E(i, A($e, {
      get when() {
        return !t();
      },
      get children() {
        return A(Uo, {
          id: r,
          get children() {
            return e.children;
          }
        });
      }
    }), null), W(() => i.value = e.header), i;
  })();
}
function Ho(e) {
  return (() => {
    const t = Mo.cloneNode(!0), n = t.firstChild;
    return mi(n, "click", e.onClick, !0), E(n, () => e.children, null), E(n, A(ie, {
      path: In,
      get class() {
        return `transition w-6 h-6 text-solid-lightaction dark:text-solid-darkaction transform ${e.collapsed ? "" : "rotate-90"}`;
      }
    }), null), t;
  })();
}
function Uo(e) {
  return (() => {
    const t = Ro.cloneNode(!0);
    return E(t, () => e.children), W(() => ve(t, "id", e.id)), t;
  })();
}
function Vo(e) {
  return (() => {
    const t = jo.cloneNode(!0);
    return E(t, A(Sl, Pt({
      class: "p-2 text-base w-full rounded-lg md:(rounded-r-xl rounded-l-none) text-left relative flex items-center justify-between transition"
    }, e, {
      inactiveClass: "hover:bg-solid-light hover:dark:bg-solid-darkbg",
      activeClass: "text-white font-semibold bg-solid-accent active",
      end: !0,
      get children() {
        return e.children;
      }
    }))), t;
  })();
}
ut(["click"]);
const Wo = /* @__PURE__ */ S("<ul></ul>"), Yo = /* @__PURE__ */ S('<ul class="flex flex-col gap-4"></ul>'), Qo = /* @__PURE__ */ S('<li><h2 class="pl-2 text-solid-dark dark:text-white font-bold text-xl"></h2></li>'), Ko = /* @__PURE__ */ S('<div class="w-full mt-2 flex border border-solid-lightborder dark:border-solid-darkitem rounded-md"> </div>'), Xo = /* @__PURE__ */ S('<a class="flex-1 inline-flex w-full p-2 items-center justify-center whitespace-nowrap first:rounded-l-md border-r border-solid-lightborder dark:border-solid-darkitem hover:text-blue-500 hover:underline last:(rounded-r-md border-0)"></a>');
function Bi(e) {
  zn();
  function t(r) {
    return r.children == null;
  }
  const n = (r) => !1;
  return A(Ze, {
    get each() {
      return e.pages;
    },
    children: (r) => [A($e, {
      get when() {
        return t(r);
      },
      get children() {
        return A(Vo, {
          get href() {
            return "/" + e.page.lang + `/${e.page.topSection}` + r.path;
          },
          get title() {
            return r.name;
          },
          get children() {
            return r.name;
          }
        });
      }
    }), A($e, {
      get when() {
        return r.children;
      },
      get children() {
        const i = Wo.cloneNode(!0);
        return E(i, A(qo, {
          get header() {
            return r.name;
          },
          get startCollapsed() {
            return n();
          },
          get children() {
            return A(Bi, {
              get pages() {
                var u;
                return (u = r.children) != null ? u : [];
              },
              get page() {
                return e.page;
              }
            });
          }
        })), i;
      }
    })]
  });
}
function Go(e) {
  return (() => {
    const t = Yo.cloneNode(!0);
    return E(t, A(Ze, {
      get each() {
        var n;
        return (n = e.page.topTab.children) != null ? n : [];
      },
      children: (n, r) => (() => {
        const i = Qo.cloneNode(!0), u = i.firstChild;
        return E(u, () => n.name), E(i, A(Bi, {
          get page() {
            return e.page;
          },
          get pages() {
            var l;
            return (l = n.children) != null ? l : [];
          }
        }), null), i;
      })()
    })), t;
  })();
}
const Zo = (e) => {
  const t = () => ze.root.children;
  return (() => {
    const n = Ko.cloneNode(!0);
    return n.firstChild, E(n, A(Ze, {
      get each() {
        return t();
      },
      children: (r, i) => (() => {
        const u = Xo.cloneNode(!0);
        return E(u, () => r.name), W((l) => {
          const o = {
            "bg-solid-light dark:bg-solid-dark font-semibold": i() == e.page.topSection
          }, a = "/" + e.page.lang + "/" + i();
          return l._v$ = qt(u, o, l._v$), a !== l._v$2 && ve(u, "href", l._v$2 = a), l;
        }, {
          _v$: void 0,
          _v$2: void 0
        }), u;
      })()
    }), null), n;
  })();
}, Jo = /* @__PURE__ */ S('<div class="flex text-black dark:bg-solid-darkitem dark:text-white p-2 mr-2 rounded-md"><select aria-label="Select language" class="flex-1  dark:bg-solid-darkitem text-black dark:text-white "></select></div>'), ea = /* @__PURE__ */ S("<option><span>&nbsp;&nbsp;&nbsp;</span></option>"), ta = (e) => (() => {
  const t = Jo.cloneNode(!0), n = t.firstChild;
  return E(t, () => e.children, n), n.$$input = (r) => {
    const i = r.currentTarget.value;
    e.onchange(i);
  }, E(n, () => Object.entries(e.entries).map(([r, i]) => (() => {
    const u = ea.cloneNode(!0), l = u.firstChild, o = l.firstChild;
    return u.value = r, E(l, i, o), u;
  })())), W(() => n.value = e.value), t;
})();
ut(["input"]);
const na = /* @__PURE__ */ S('<button type="button"></button>'), ra = /* @__PURE__ */ S('<div aria-label="preferences" class="p-4 border-t border-solid-lightitem dark:border-solid-darkitem"><div class="flex items-center"><div class="flex-1"></div><div class="flex-none"></div></div><div class="flex"><div class="flex-1"></div></div></div>'), ia = /* @__PURE__ */ S('<div class="mt-2 border border-solid-lightitem bg-solid-light dark:bg-solid-dark dark:border-solid-darkitem rounded-lg"><button type="button" class="flex items-center justify-between p-2 w-full cursor-pointer"><div class="flex items-center gap-2 font-semibold"><div class="bg-solid-lightitem dark:bg-solid-darkitem rounded-lg p-1"></div>Preferences</div></button></div>'), [ft, ua] = ue(!0), la = () => (() => {
  const e = na.cloneNode(!0);
  return e.$$click = () => {
    const t = document.querySelector("html");
    ua(!ft()), ft() ? t.classList.add("dark") : t.classList.remove("dark"), Kl("dark", ft());
  }, E(e, A($e, {
    get when() {
      return ft();
    },
    get fallback() {
      return A(ie, {
        path: zo,
        class: "w-6 h-6"
      });
    },
    get children() {
      return A(ie, {
        path: Io,
        class: "w-6 h-6"
      });
    }
  })), W(() => ve(e, "aria-label", `Use ${ft() ? "light" : "dark"} mode`)), e;
})(), oa = (e) => A(ta, {
  get entries() {
    return ze.language;
  },
  get value() {
    return e.page.lang;
  },
  onchange: (n) => {
  },
  get children() {
    return e.children;
  }
}), aa = (e) => {
  const [t, n] = ue(!0);
  return (() => {
    const r = ia.cloneNode(!0), i = r.firstChild, u = i.firstChild, l = u.firstChild;
    return i.$$click = () => n((o) => !o), E(l, A(ie, {
      path: Lo,
      class: "w-4 h-4"
    })), E(i, A(ie, {
      path: In,
      get class() {
        return `w-6 h-6 text-solid-lightaction dark:text-solid-darkaction transform transition ${t() ? "" : "rotate-90"}`;
      }
    }), null), E(r, A($e, {
      get when() {
        return !t();
      },
      get children() {
        const o = ra.cloneNode(!0), a = o.firstChild, s = a.firstChild, c = s.nextSibling;
        return E(s, A(oa, {
          get page() {
            return e.page;
          },
          get children() {
            return A(ie, {
              class: "h-5 w-5",
              path: _o
            });
          }
        })), E(c, A(la, {})), o;
      }
    }), null), r;
  })();
};
ut(["click"]);
const sa = /* @__PURE__ */ S('<div class="pb-16 pt-2"><div class="flex items-center"><div class="flex-1 "></div></div><div class="mt-4"></div></div>'), ca = /* @__PURE__ */ S('<button class=" flex mt-2 mb-2 p-2 w-full border-solid-lightitem dark:border-solid-darkitem border rounded-md dark:bg-solid-dark"><input readonly class=" flex-1 focus:outline-none dark:bg-solid-dark" placeholder="Search" type="search"></button>'), fa = /* @__PURE__ */ S('<div class="w-full p-2"><div class=" flex p-2 w-full border-solid-lightitem dark:border-solid-darkitem border rounded-md dark:bg-solid-dark"><input autofocus class=" flex-1 focus:outline-none dark:bg-solid-dark" placeholder="Search" type="search"></div></div>'), ha = /* @__PURE__ */ S('<div class="w-full hover:bg-blue-500 rounded-r-lg p-2 flex"><a class="flex-1"></a><button type="button" class="text-neutral-500 hover:text-black dark:hover:text-white"></button></div>'), da = /* @__PURE__ */ S('<div class="w-full hover:bg-blue-500 rounded-r-lg p-2 flex"><a class="flex-1"></a><button type="button" class="mx-2 text-neutral-500 hover:text-black dark:hover:text-white"></button><button type="button" class="text-neutral-500 hover:text-black dark:hover:text-white"></button></div>'), pa = /* @__PURE__ */ S('<div class="pr-2"><div class="w-full hover:bg-blue-500 rounded-r-lg p-2 flex"><a class="flex-1 mx-2"> </a></div></div>'), ga = /* @__PURE__ */ S('<div class="w-full uppercase m-2 text-solid-dark dark:text-solid-light text-left relative flex items-center justify-between py-2">Recent</div>'), ma = /* @__PURE__ */ S('<div class="w-full m-2 uppercase text-solid-dark dark:text-solid-light text-left relative flex items-center justify-between py-2 flex-1">Favorites</div>'), Da = /* @__PURE__ */ S('<div class="h-full w-full flex flex-col"><div class="flex-1 overflow-auto"></div><div class="text-sm text-neutral-500 flex items-center"> to select<!> to navigate <!> to close</div></div>'), sr = (e) => A($n, {
  get children() {
    return [A(He, {
      get when() {
        return mn();
      },
      get children() {
        return A(ka, {});
      }
    }), A(He, {
      when: !0,
      get children() {
        const t = sa.cloneNode(!0), n = t.firstChild, r = n.firstChild, i = n.nextSibling;
        return E(t, () => ze.title({}), n), E(r, A(Zo, {
          get page() {
            return e.page;
          }
        })), E(t, A(aa, {
          get page() {
            return e.page;
          }
        }), i), E(t, A(ya, {}), i), E(i, A(Go, {
          get page() {
            return e.page;
          }
        })), t;
      }
    })];
  }
});
function ya() {
  return (() => {
    const e = ca.cloneNode(!0), t = e.firstChild;
    return e.$$click = () => {
      console.log("search"), Ht(!0);
    }, E(e, A($i, {}), t), E(e, A(Ge, {
      children: "\u2318"
    }), null), E(e, A(Ge, {
      children: "K"
    }), null), e;
  })();
}
const $i = () => A(ie, {
  class: "mr-2  h-5 w-5 flex-none text-neutral-500",
  path: yo
}), [cr, Fa] = ue([]), xa = () => {
  const e = (t) => {
    const n = t.currentTarget.value;
    console.log("search", n), Fa(Yl(n));
  };
  return (() => {
    const t = fa.cloneNode(!0), n = t.firstChild, r = n.firstChild;
    return n.$$click = () => {
      console.log("search"), Ht(!0);
    }, E(n, A($i, {}), r), r.$$input = e, t;
  })();
}, ba = (e) => {
  const t = () => {
    Vl(e.index);
  };
  return (() => {
    const n = ha.cloneNode(!0), r = n.firstChild, i = r.nextSibling;
    return E(r, () => e.result.title), i.$$click = t, E(i, A(ie, {
      class: "h-6 w-6",
      path: vi
    })), W((u) => {
      const l = e.result.href, o = e.result.title;
      return l !== u._v$ && ve(r, "href", u._v$ = l), o !== u._v$2 && ve(i, "title", u._v$2 = o), u;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), n;
  })();
}, Ca = (e) => {
  const t = () => {
    Ul(e.index);
  }, n = () => {
    ki(e.index);
  };
  return (() => {
    const r = da.cloneNode(!0), i = r.firstChild, u = i.nextSibling, l = u.nextSibling;
    return E(i, () => e.result.title), u.$$click = t, E(u, A(ie, {
      class: "h-6 w-6",
      path: Fo
    })), l.$$click = n, E(l, A(ie, {
      class: "h-6 w-6",
      path: vi
    })), W((o) => {
      const a = e.result.href, s = e.result.title, c = e.result.title;
      return a !== o._v$3 && ve(i, "href", o._v$3 = a), s !== o._v$4 && ve(u, "title", o._v$4 = s), c !== o._v$5 && ve(l, "title", o._v$5 = c), o;
    }, {
      _v$3: void 0,
      _v$4: void 0,
      _v$5: void 0
    }), r;
  })();
}, Aa = (e) => {
  const t = () => {
    Wl(e.result), location.href = e.result.href, Ht(!1);
  };
  return (() => {
    const n = pa.cloneNode(!0), r = n.firstChild, i = r.firstChild;
    return i.firstChild, i.$$click = t, E(i, () => e.result.title, null), n;
  })();
}, ka = () => (() => {
  const e = Da.cloneNode(!0), t = e.firstChild, n = t.nextSibling, r = n.firstChild, i = r.nextSibling, u = i.nextSibling, l = u.nextSibling;
  return l.nextSibling, E(e, A(xa, {}), t), E(t, A($n, {
    get children() {
      return [A(He, {
        get when() {
          return cr().length;
        },
        get children() {
          return A(Ze, {
            get each() {
              return cr();
            },
            children: (o, a) => A(Aa, {
              result: o
            })
          });
        }
      }), A(He, {
        when: !0,
        get children() {
          return [A($e, {
            get when() {
              return Mt().length;
            },
            get children() {
              return [ga.cloneNode(!0), A(Ze, {
                get each() {
                  return Mt();
                },
                children: (o, a) => A(Ca, {
                  result: o,
                  get index() {
                    return a();
                  }
                })
              })];
            }
          }), A($e, {
            get when() {
              return Nt().length;
            },
            get children() {
              return [ma.cloneNode(!0), A(Ze, {
                get each() {
                  return Nt();
                },
                children: (o, a) => A(ba, {
                  result: o,
                  get index() {
                    return a();
                  }
                })
              })];
            }
          })];
        }
      })];
    }
  })), E(n, A(Ge, {
    get children() {
      return A(ie, {
        path: mo
      });
    }
  }), r), E(n, A(Ge, {
    get children() {
      return A(ie, {
        path: Do
      });
    }
  }), i), E(n, A(Ge, {
    get children() {
      return A(ie, {
        path: go
      });
    }
  }), i), E(n, A(Ge, {
    children: "Esc"
  }), l), e;
})();
ut(["click", "input"]);
function fr(e) {
  if (e)
    throw e;
}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var Li = function(t) {
  return t != null && t.constructor != null && typeof t.constructor.isBuffer == "function" && t.constructor.isBuffer(t);
}, St = Object.prototype.hasOwnProperty, _i = Object.prototype.toString, hr = Object.defineProperty, dr = Object.getOwnPropertyDescriptor, pr = function(t) {
  return typeof Array.isArray == "function" ? Array.isArray(t) : _i.call(t) === "[object Array]";
}, gr = function(t) {
  if (!t || _i.call(t) !== "[object Object]")
    return !1;
  var n = St.call(t, "constructor"), r = t.constructor && t.constructor.prototype && St.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !n && !r)
    return !1;
  var i;
  for (i in t)
    ;
  return typeof i > "u" || St.call(t, i);
}, mr = function(t, n) {
  hr && n.name === "__proto__" ? hr(t, n.name, {
    enumerable: !0,
    configurable: !0,
    value: n.newValue,
    writable: !0
  }) : t[n.name] = n.newValue;
}, Dr = function(t, n) {
  if (n === "__proto__")
    if (St.call(t, n)) {
      if (dr)
        return dr(t, n).value;
    } else
      return;
  return t[n];
}, yr = function e() {
  var t, n, r, i, u, l, o = arguments[0], a = 1, s = arguments.length, c = !1;
  for (typeof o == "boolean" && (c = o, o = arguments[1] || {}, a = 2), (o == null || typeof o != "object" && typeof o != "function") && (o = {}); a < s; ++a)
    if (t = arguments[a], t != null)
      for (n in t)
        r = Dr(o, n), i = Dr(t, n), o !== i && (c && i && (gr(i) || (u = pr(i))) ? (u ? (u = !1, l = r && pr(r) ? r : []) : l = r && gr(r) ? r : {}, mr(o, { name: n, newValue: e(c, l, i) })) : typeof i < "u" && mr(o, { name: n, newValue: i }));
  return o;
};
function Dn(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function wa() {
  const e = [], t = { run: n, use: r };
  return t;
  function n(...i) {
    let u = -1;
    const l = i.pop();
    if (typeof l != "function")
      throw new TypeError("Expected function as last argument, not " + l);
    o(null, ...i);
    function o(a, ...s) {
      const c = e[++u];
      let d = -1;
      if (a) {
        l(a);
        return;
      }
      for (; ++d < i.length; )
        (s[d] === null || s[d] === void 0) && (s[d] = i[d]);
      i = s, c ? Ea(c, o)(...s) : l(null, ...s);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError(
        "Expected `middelware` to be a function, not " + i
      );
    return e.push(i), t;
  }
}
function Ea(e, t) {
  let n;
  return r;
  function r(...l) {
    const o = e.length > l.length;
    let a;
    o && l.push(i);
    try {
      a = e.apply(this, l);
    } catch (s) {
      const c = s;
      if (o && n)
        throw c;
      return i(c);
    }
    o || (a instanceof Promise ? a.then(u, i) : a instanceof Error ? i(a) : u(a));
  }
  function i(l, ...o) {
    n || (n = !0, t(l, ...o));
  }
  function u(l) {
    i(null, l);
  }
}
function gt(e) {
  return !e || typeof e != "object" ? "" : "position" in e || "type" in e ? Fr(e.position) : "start" in e || "end" in e ? Fr(e) : "line" in e || "column" in e ? yn(e) : "";
}
function yn(e) {
  return xr(e && e.line) + ":" + xr(e && e.column);
}
function Fr(e) {
  return yn(e && e.start) + "-" + yn(e && e.end);
}
function xr(e) {
  return e && typeof e == "number" ? e : 1;
}
class ye extends Error {
  constructor(t, n, r) {
    const i = [null, null];
    let u = {
      start: { line: null, column: null },
      end: { line: null, column: null }
    };
    if (super(), typeof n == "string" && (r = n, n = void 0), typeof r == "string") {
      const l = r.indexOf(":");
      l === -1 ? i[1] = r : (i[0] = r.slice(0, l), i[1] = r.slice(l + 1));
    }
    n && ("type" in n || "position" in n ? n.position && (u = n.position) : "start" in n || "end" in n ? u = n : ("line" in n || "column" in n) && (u.start = n)), this.name = gt(n) || "1:1", this.message = typeof t == "object" ? t.message : t, this.stack = typeof t == "object" ? t.stack : "", this.reason = this.message, this.fatal, this.line = u.start.line, this.column = u.start.column, this.source = i[0], this.ruleId = i[1], this.position = u, this.actual, this.expected, this.file, this.url, this.note;
  }
}
ye.prototype.file = "";
ye.prototype.name = "";
ye.prototype.reason = "";
ye.prototype.message = "";
ye.prototype.stack = "";
ye.prototype.fatal = null;
ye.prototype.column = null;
ye.prototype.line = null;
ye.prototype.source = null;
ye.prototype.ruleId = null;
ye.prototype.position = null;
const ke = { basename: va, dirname: Sa, extname: Ba, join: $a, sep: "/" };
function va(e, t) {
  if (t !== void 0 && typeof t != "string")
    throw new TypeError('"ext" argument must be a string');
  bt(e);
  let n = 0, r = -1, i = e.length, u;
  if (t === void 0 || t.length === 0 || t.length > e.length) {
    for (; i--; )
      if (e.charCodeAt(i) === 47) {
        if (u) {
          n = i + 1;
          break;
        }
      } else
        r < 0 && (u = !0, r = i + 1);
    return r < 0 ? "" : e.slice(n, r);
  }
  if (t === e)
    return "";
  let l = -1, o = t.length - 1;
  for (; i--; )
    if (e.charCodeAt(i) === 47) {
      if (u) {
        n = i + 1;
        break;
      }
    } else
      l < 0 && (u = !0, l = i + 1), o > -1 && (e.charCodeAt(i) === t.charCodeAt(o--) ? o < 0 && (r = i) : (o = -1, r = l));
  return n === r ? r = l : r < 0 && (r = e.length), e.slice(n, r);
}
function Sa(e) {
  if (bt(e), e.length === 0)
    return ".";
  let t = -1, n = e.length, r;
  for (; --n; )
    if (e.charCodeAt(n) === 47) {
      if (r) {
        t = n;
        break;
      }
    } else
      r || (r = !0);
  return t < 0 ? e.charCodeAt(0) === 47 ? "/" : "." : t === 1 && e.charCodeAt(0) === 47 ? "//" : e.slice(0, t);
}
function Ba(e) {
  bt(e);
  let t = e.length, n = -1, r = 0, i = -1, u = 0, l;
  for (; t--; ) {
    const o = e.charCodeAt(t);
    if (o === 47) {
      if (l) {
        r = t + 1;
        break;
      }
      continue;
    }
    n < 0 && (l = !0, n = t + 1), o === 46 ? i < 0 ? i = t : u !== 1 && (u = 1) : i > -1 && (u = -1);
  }
  return i < 0 || n < 0 || u === 0 || u === 1 && i === n - 1 && i === r + 1 ? "" : e.slice(i, n);
}
function $a(...e) {
  let t = -1, n;
  for (; ++t < e.length; )
    bt(e[t]), e[t] && (n = n === void 0 ? e[t] : n + "/" + e[t]);
  return n === void 0 ? "." : La(n);
}
function La(e) {
  bt(e);
  const t = e.charCodeAt(0) === 47;
  let n = _a(e, !t);
  return n.length === 0 && !t && (n = "."), n.length > 0 && e.charCodeAt(e.length - 1) === 47 && (n += "/"), t ? "/" + n : n;
}
function _a(e, t) {
  let n = "", r = 0, i = -1, u = 0, l = -1, o, a;
  for (; ++l <= e.length; ) {
    if (l < e.length)
      o = e.charCodeAt(l);
    else {
      if (o === 47)
        break;
      o = 47;
    }
    if (o === 47) {
      if (!(i === l - 1 || u === 1))
        if (i !== l - 1 && u === 2) {
          if (n.length < 2 || r !== 2 || n.charCodeAt(n.length - 1) !== 46 || n.charCodeAt(n.length - 2) !== 46) {
            if (n.length > 2) {
              if (a = n.lastIndexOf("/"), a !== n.length - 1) {
                a < 0 ? (n = "", r = 0) : (n = n.slice(0, a), r = n.length - 1 - n.lastIndexOf("/")), i = l, u = 0;
                continue;
              }
            } else if (n.length > 0) {
              n = "", r = 0, i = l, u = 0;
              continue;
            }
          }
          t && (n = n.length > 0 ? n + "/.." : "..", r = 2);
        } else
          n.length > 0 ? n += "/" + e.slice(i + 1, l) : n = e.slice(i + 1, l), r = l - i - 1;
      i = l, u = 0;
    } else
      o === 46 && u > -1 ? u++ : u = -1;
  }
  return n;
}
function bt(e) {
  if (typeof e != "string")
    throw new TypeError(
      "Path must be a string. Received " + JSON.stringify(e)
    );
}
const Oa = { cwd: za };
function za() {
  return "/";
}
function Fn(e) {
  return e !== null && typeof e == "object" && e.href && e.origin;
}
function Pa(e) {
  if (typeof e == "string")
    e = new URL(e);
  else if (!Fn(e)) {
    const t = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' + e + "`"
    );
    throw t.code = "ERR_INVALID_ARG_TYPE", t;
  }
  if (e.protocol !== "file:") {
    const t = new TypeError("The URL must be of scheme file");
    throw t.code = "ERR_INVALID_URL_SCHEME", t;
  }
  return Ia(e);
}
function Ia(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw r.code = "ERR_INVALID_FILE_URL_HOST", r;
  }
  const t = e.pathname;
  let n = -1;
  for (; ++n < t.length; )
    if (t.charCodeAt(n) === 37 && t.charCodeAt(n + 1) === 50) {
      const r = t.charCodeAt(n + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw i.code = "ERR_INVALID_FILE_URL_PATH", i;
      }
    }
  return decodeURIComponent(t);
}
const Zt = ["history", "path", "basename", "stem", "extname", "dirname"];
class Ta {
  constructor(t) {
    let n;
    t ? typeof t == "string" || Li(t) ? n = { value: t } : Fn(t) ? n = { path: t } : n = t : n = {}, this.data = {}, this.messages = [], this.history = [], this.cwd = Oa.cwd(), this.value, this.stored, this.result, this.map;
    let r = -1;
    for (; ++r < Zt.length; ) {
      const u = Zt[r];
      u in n && n[u] !== void 0 && (this[u] = u === "history" ? [...n[u]] : n[u]);
    }
    let i;
    for (i in n)
      Zt.includes(i) || (this[i] = n[i]);
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(t) {
    Fn(t) && (t = Pa(t)), en(t, "path"), this.path !== t && this.history.push(t);
  }
  get dirname() {
    return typeof this.path == "string" ? ke.dirname(this.path) : void 0;
  }
  set dirname(t) {
    br(this.basename, "dirname"), this.path = ke.join(t || "", this.basename);
  }
  get basename() {
    return typeof this.path == "string" ? ke.basename(this.path) : void 0;
  }
  set basename(t) {
    en(t, "basename"), Jt(t, "basename"), this.path = ke.join(this.dirname || "", t);
  }
  get extname() {
    return typeof this.path == "string" ? ke.extname(this.path) : void 0;
  }
  set extname(t) {
    if (Jt(t, "extname"), br(this.dirname, "extname"), t) {
      if (t.charCodeAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (t.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = ke.join(this.dirname, this.stem + (t || ""));
  }
  get stem() {
    return typeof this.path == "string" ? ke.basename(this.path, this.extname) : void 0;
  }
  set stem(t) {
    en(t, "stem"), Jt(t, "stem"), this.path = ke.join(this.dirname || "", t + (this.extname || ""));
  }
  toString(t) {
    return (this.value || "").toString(t);
  }
  message(t, n, r) {
    const i = new ye(t, n, r);
    return this.path && (i.name = this.path + ":" + i.name, i.file = this.path), i.fatal = !1, this.messages.push(i), i;
  }
  info(t, n, r) {
    const i = this.message(t, n, r);
    return i.fatal = null, i;
  }
  fail(t, n, r) {
    const i = this.message(t, n, r);
    throw i.fatal = !0, i;
  }
}
function Jt(e, t) {
  if (e && e.includes(ke.sep))
    throw new Error(
      "`" + t + "` cannot be a path: did not expect `" + ke.sep + "`"
    );
}
function en(e, t) {
  if (!e)
    throw new Error("`" + t + "` cannot be empty");
}
function br(e, t) {
  if (!e)
    throw new Error("Setting `" + t + "` requires `path` to be set too");
}
const Na = zi().freeze(), Oi = {}.hasOwnProperty;
function zi() {
  const e = wa(), t = [];
  let n = {}, r, i = -1;
  return u.data = l, u.Parser = void 0, u.Compiler = void 0, u.freeze = o, u.attachers = t, u.use = a, u.parse = s, u.stringify = c, u.run = d, u.runSync = D, u.process = p, u.processSync = g, u;
  function u() {
    const x = zi();
    let k = -1;
    for (; ++k < t.length; )
      x.use(...t[k]);
    return x.data(yr(!0, {}, n)), x;
  }
  function l(x, k) {
    return typeof x == "string" ? arguments.length === 2 ? (rn("data", r), n[x] = k, u) : Oi.call(n, x) && n[x] || null : x ? (rn("data", r), n = x, u) : n;
  }
  function o() {
    if (r)
      return u;
    for (; ++i < t.length; ) {
      const [x, ...k] = t[i];
      if (k[0] === !1)
        continue;
      k[0] === !0 && (k[0] = void 0);
      const y = x.call(u, ...k);
      typeof y == "function" && e.use(y);
    }
    return r = !0, i = Number.POSITIVE_INFINITY, u;
  }
  function a(x, ...k) {
    let y;
    if (rn("use", r), x != null)
      if (typeof x == "function")
        z(x, ...k);
      else if (typeof x == "object")
        Array.isArray(x) ? L(x) : w(x);
      else
        throw new TypeError("Expected usable value, not `" + x + "`");
    return y && (n.settings = Object.assign(n.settings || {}, y)), u;
    function B(F) {
      if (typeof F == "function")
        z(F);
      else if (typeof F == "object")
        if (Array.isArray(F)) {
          const [_, ...N] = F;
          z(_, ...N);
        } else
          w(F);
      else
        throw new TypeError("Expected usable value, not `" + F + "`");
    }
    function w(F) {
      L(F.plugins), F.settings && (y = Object.assign(y || {}, F.settings));
    }
    function L(F) {
      let _ = -1;
      if (F != null)
        if (Array.isArray(F))
          for (; ++_ < F.length; ) {
            const N = F[_];
            B(N);
          }
        else
          throw new TypeError("Expected a list of plugins, not `" + F + "`");
    }
    function z(F, _) {
      let N = -1, M;
      for (; ++N < t.length; )
        if (t[N][0] === F) {
          M = t[N];
          break;
        }
      M ? (Dn(M[1]) && Dn(_) && (_ = yr(!0, M[1], _)), M[1] = _) : t.push([...arguments]);
    }
  }
  function s(x) {
    u.freeze();
    const k = ht(x), y = u.Parser;
    return tn("parse", y), Cr(y, "parse") ? new y(String(k), k).parse() : y(String(k), k);
  }
  function c(x, k) {
    u.freeze();
    const y = ht(k), B = u.Compiler;
    return nn("stringify", B), Ar(x), Cr(B, "compile") ? new B(x, y).compile() : B(x, y);
  }
  function d(x, k, y) {
    if (Ar(x), u.freeze(), !y && typeof k == "function" && (y = k, k = void 0), !y)
      return new Promise(B);
    B(null, y);
    function B(w, L) {
      e.run(x, ht(k), z);
      function z(F, _, N) {
        _ = _ || x, F ? L(F) : w ? w(_) : y(null, _, N);
      }
    }
  }
  function D(x, k) {
    let y, B;
    return u.run(x, k, w), kr("runSync", "run", B), y;
    function w(L, z) {
      fr(L), y = z, B = !0;
    }
  }
  function p(x, k) {
    if (u.freeze(), tn("process", u.Parser), nn("process", u.Compiler), !k)
      return new Promise(y);
    y(null, k);
    function y(B, w) {
      const L = ht(x);
      u.run(u.parse(L), L, (F, _, N) => {
        if (F || !_ || !N)
          z(F);
        else {
          const M = u.stringify(_, N);
          M == null || (ja(M) ? N.value = M : N.result = M), z(F, N);
        }
      });
      function z(F, _) {
        F || !_ ? w(F) : B ? B(_) : k(null, _);
      }
    }
  }
  function g(x) {
    let k;
    u.freeze(), tn("processSync", u.Parser), nn("processSync", u.Compiler);
    const y = ht(x);
    return u.process(y, B), kr("processSync", "process", k), y;
    function B(w) {
      k = !0, fr(w);
    }
  }
}
function Cr(e, t) {
  return typeof e == "function" && e.prototype && (Ma(e.prototype) || t in e.prototype);
}
function Ma(e) {
  let t;
  for (t in e)
    if (Oi.call(e, t))
      return !0;
  return !1;
}
function tn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `Parser`");
}
function nn(e, t) {
  if (typeof t != "function")
    throw new TypeError("Cannot `" + e + "` without `Compiler`");
}
function rn(e, t) {
  if (t)
    throw new Error(
      "Cannot call `" + e + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Ar(e) {
  if (!Dn(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function kr(e, t, n) {
  if (!n)
    throw new Error(
      "`" + e + "` finished async. Use `" + t + "` instead"
    );
}
function ht(e) {
  return Ra(e) ? e : new Ta(e);
}
function Ra(e) {
  return Boolean(
    e && typeof e == "object" && "message" in e && "messages" in e
  );
}
function ja(e) {
  return typeof e == "string" || Li(e);
}
function qa(e, t) {
  var { includeImageAlt: n = !0 } = t || {};
  return Pi(e, n);
}
function Pi(e, t) {
  return e && typeof e == "object" && (e.value || (t ? e.alt : "") || "children" in e && wr(e.children, t) || Array.isArray(e) && wr(e, t)) || "";
}
function wr(e, t) {
  for (var n = [], r = -1; ++r < e.length; )
    n[r] = Pi(e[r], t);
  return n.join("");
}
function Le(e, t, n, r) {
  const i = e.length;
  let u = 0, l;
  if (t < 0 ? t = -t > i ? 0 : i + t : t = t > i ? i : t, n = n > 0 ? n : 0, r.length < 1e4)
    l = Array.from(r), l.unshift(t, n), [].splice.apply(e, l);
  else
    for (n && [].splice.apply(e, [t, n]); u < r.length; )
      l = r.slice(u, u + 1e4), l.unshift(t, 0), [].splice.apply(e, l), u += 1e4, t += 1e4;
}
function me(e, t) {
  return e.length > 0 ? (Le(e, e.length, 0, t), e) : t;
}
const Er = {}.hasOwnProperty;
function Ha(e) {
  const t = {};
  let n = -1;
  for (; ++n < e.length; )
    Ua(t, e[n]);
  return t;
}
function Ua(e, t) {
  let n;
  for (n in t) {
    const i = (Er.call(e, n) ? e[n] : void 0) || (e[n] = {}), u = t[n];
    let l;
    for (l in u) {
      Er.call(i, l) || (i[l] = []);
      const o = u[l];
      Va(
        i[l],
        Array.isArray(o) ? o : o ? [o] : []
      );
    }
  }
}
function Va(e, t) {
  let n = -1;
  const r = [];
  for (; ++n < t.length; )
    (t[n].add === "after" ? e : r).push(t[n]);
  Le(e, 0, 0, r);
}
const Wa = /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/, Ee = Re(/[A-Za-z]/), xn = Re(/\d/), Ya = Re(/[\dA-Fa-f]/), de = Re(/[\dA-Za-z]/), Qa = Re(/[!-/:-@[-`{-~]/), vr = Re(/[#-'*+\--9=?A-Z^-~]/);
function bn(e) {
  return e !== null && (e < 32 || e === 127);
}
function De(e) {
  return e !== null && (e < 0 || e === 32);
}
function O(e) {
  return e !== null && e < -2;
}
function K(e) {
  return e === -2 || e === -1 || e === 32;
}
const Ka = Re(/\s/), Xa = Re(Wa);
function Re(e) {
  return t;
  function t(n) {
    return n !== null && e.test(String.fromCharCode(n));
  }
}
function q(e, t, n, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let u = 0;
  return l;
  function l(a) {
    return K(a) ? (e.enter(n), o(a)) : t(a);
  }
  function o(a) {
    return K(a) && u++ < i ? (e.consume(a), o) : (e.exit(n), t(a));
  }
}
const Ga = {
  tokenize: Za
};
function Za(e) {
  const t = e.attempt(
    this.parser.constructs.contentInitial,
    r,
    i
  );
  let n;
  return t;
  function r(o) {
    if (o === null) {
      e.consume(o);
      return;
    }
    return e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), q(e, t, "linePrefix");
  }
  function i(o) {
    return e.enter("paragraph"), u(o);
  }
  function u(o) {
    const a = e.enter("chunkText", {
      contentType: "text",
      previous: n
    });
    return n && (n.next = a), n = a, l(o);
  }
  function l(o) {
    if (o === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(o);
      return;
    }
    return O(o) ? (e.consume(o), e.exit("chunkText"), u) : (e.consume(o), l);
  }
}
const Ja = {
  tokenize: es
}, Sr = {
  tokenize: ts
};
function es(e) {
  const t = this, n = [];
  let r = 0, i, u, l;
  return o;
  function o(w) {
    if (r < n.length) {
      const L = n[r];
      return t.containerState = L[1], e.attempt(
        L[0].continuation,
        a,
        s
      )(w);
    }
    return s(w);
  }
  function a(w) {
    if (r++, t.containerState._closeFlow) {
      t.containerState._closeFlow = void 0, i && B();
      const L = t.events.length;
      let z = L, F;
      for (; z--; )
        if (t.events[z][0] === "exit" && t.events[z][1].type === "chunkFlow") {
          F = t.events[z][1].end;
          break;
        }
      y(r);
      let _ = L;
      for (; _ < t.events.length; )
        t.events[_][1].end = Object.assign({}, F), _++;
      return Le(
        t.events,
        z + 1,
        0,
        t.events.slice(L)
      ), t.events.length = _, s(w);
    }
    return o(w);
  }
  function s(w) {
    if (r === n.length) {
      if (!i)
        return D(w);
      if (i.currentConstruct && i.currentConstruct.concrete)
        return g(w);
      t.interrupt = Boolean(
        i.currentConstruct && !i._gfmTableDynamicInterruptHack
      );
    }
    return t.containerState = {}, e.check(
      Sr,
      c,
      d
    )(w);
  }
  function c(w) {
    return i && B(), y(r), D(w);
  }
  function d(w) {
    return t.parser.lazy[t.now().line] = r !== n.length, l = t.now().offset, g(w);
  }
  function D(w) {
    return t.containerState = {}, e.attempt(
      Sr,
      p,
      g
    )(w);
  }
  function p(w) {
    return r++, n.push([t.currentConstruct, t.containerState]), D(w);
  }
  function g(w) {
    if (w === null) {
      i && B(), y(0), e.consume(w);
      return;
    }
    return i = i || t.parser.flow(t.now()), e.enter("chunkFlow", {
      contentType: "flow",
      previous: u,
      _tokenizer: i
    }), x(w);
  }
  function x(w) {
    if (w === null) {
      k(e.exit("chunkFlow"), !0), y(0), e.consume(w);
      return;
    }
    return O(w) ? (e.consume(w), k(e.exit("chunkFlow")), r = 0, t.interrupt = void 0, o) : (e.consume(w), x);
  }
  function k(w, L) {
    const z = t.sliceStream(w);
    if (L && z.push(null), w.previous = u, u && (u.next = w), u = w, i.defineSkip(w.start), i.write(z), t.parser.lazy[w.start.line]) {
      let F = i.events.length;
      for (; F--; )
        if (i.events[F][1].start.offset < l && (!i.events[F][1].end || i.events[F][1].end.offset > l))
          return;
      const _ = t.events.length;
      let N = _, M, ne;
      for (; N--; )
        if (t.events[N][0] === "exit" && t.events[N][1].type === "chunkFlow") {
          if (M) {
            ne = t.events[N][1].end;
            break;
          }
          M = !0;
        }
      for (y(r), F = _; F < t.events.length; )
        t.events[F][1].end = Object.assign({}, ne), F++;
      Le(
        t.events,
        N + 1,
        0,
        t.events.slice(_)
      ), t.events.length = F;
    }
  }
  function y(w) {
    let L = n.length;
    for (; L-- > w; ) {
      const z = n[L];
      t.containerState = z[1], z[0].exit.call(t, e);
    }
    n.length = w;
  }
  function B() {
    i.write([null]), u = void 0, i = void 0, t.containerState._closeFlow = void 0;
  }
}
function ts(e, t, n) {
  return q(
    e,
    e.attempt(this.parser.constructs.document, t, n),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function Br(e) {
  if (e === null || De(e) || Ka(e))
    return 1;
  if (Xa(e))
    return 2;
}
function Tn(e, t, n) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const u = e[i].resolveAll;
    u && !r.includes(u) && (t = u(t, n), r.push(u));
  }
  return t;
}
const Cn = {
  name: "attention",
  tokenize: rs,
  resolveAll: ns
};
function ns(e, t) {
  let n = -1, r, i, u, l, o, a, s, c;
  for (; ++n < e.length; )
    if (e[n][0] === "enter" && e[n][1].type === "attentionSequence" && e[n][1]._close) {
      for (r = n; r--; )
        if (e[r][0] === "exit" && e[r][1].type === "attentionSequence" && e[r][1]._open && t.sliceSerialize(e[r][1]).charCodeAt(0) === t.sliceSerialize(e[n][1]).charCodeAt(0)) {
          if ((e[r][1]._close || e[n][1]._open) && (e[n][1].end.offset - e[n][1].start.offset) % 3 && !((e[r][1].end.offset - e[r][1].start.offset + e[n][1].end.offset - e[n][1].start.offset) % 3))
            continue;
          a = e[r][1].end.offset - e[r][1].start.offset > 1 && e[n][1].end.offset - e[n][1].start.offset > 1 ? 2 : 1;
          const d = Object.assign({}, e[r][1].end), D = Object.assign({}, e[n][1].start);
          $r(d, -a), $r(D, a), l = {
            type: a > 1 ? "strongSequence" : "emphasisSequence",
            start: d,
            end: Object.assign({}, e[r][1].end)
          }, o = {
            type: a > 1 ? "strongSequence" : "emphasisSequence",
            start: Object.assign({}, e[n][1].start),
            end: D
          }, u = {
            type: a > 1 ? "strongText" : "emphasisText",
            start: Object.assign({}, e[r][1].end),
            end: Object.assign({}, e[n][1].start)
          }, i = {
            type: a > 1 ? "strong" : "emphasis",
            start: Object.assign({}, l.start),
            end: Object.assign({}, o.end)
          }, e[r][1].end = Object.assign({}, l.start), e[n][1].start = Object.assign({}, o.end), s = [], e[r][1].end.offset - e[r][1].start.offset && (s = me(s, [
            ["enter", e[r][1], t],
            ["exit", e[r][1], t]
          ])), s = me(s, [
            ["enter", i, t],
            ["enter", l, t],
            ["exit", l, t],
            ["enter", u, t]
          ]), s = me(
            s,
            Tn(
              t.parser.constructs.insideSpan.null,
              e.slice(r + 1, n),
              t
            )
          ), s = me(s, [
            ["exit", u, t],
            ["enter", o, t],
            ["exit", o, t],
            ["exit", i, t]
          ]), e[n][1].end.offset - e[n][1].start.offset ? (c = 2, s = me(s, [
            ["enter", e[n][1], t],
            ["exit", e[n][1], t]
          ])) : c = 0, Le(e, r - 1, n - r + 3, s), n = r + s.length - c - 2;
          break;
        }
    }
  for (n = -1; ++n < e.length; )
    e[n][1].type === "attentionSequence" && (e[n][1].type = "data");
  return e;
}
function rs(e, t) {
  const n = this.parser.constructs.attentionMarkers.null, r = this.previous, i = Br(r);
  let u;
  return l;
  function l(a) {
    return e.enter("attentionSequence"), u = a, o(a);
  }
  function o(a) {
    if (a === u)
      return e.consume(a), o;
    const s = e.exit("attentionSequence"), c = Br(a), d = !c || c === 2 && i || n.includes(a), D = !i || i === 2 && c || n.includes(r);
    return s._open = Boolean(u === 42 ? d : d && (i || !D)), s._close = Boolean(u === 42 ? D : D && (c || !d)), t(a);
  }
}
function $r(e, t) {
  e.column += t, e.offset += t, e._bufferIndex += t;
}
const is = {
  name: "autolink",
  tokenize: us
};
function us(e, t, n) {
  let r = 1;
  return i;
  function i(g) {
    return e.enter("autolink"), e.enter("autolinkMarker"), e.consume(g), e.exit("autolinkMarker"), e.enter("autolinkProtocol"), u;
  }
  function u(g) {
    return Ee(g) ? (e.consume(g), l) : vr(g) ? s(g) : n(g);
  }
  function l(g) {
    return g === 43 || g === 45 || g === 46 || de(g) ? o(g) : s(g);
  }
  function o(g) {
    return g === 58 ? (e.consume(g), a) : (g === 43 || g === 45 || g === 46 || de(g)) && r++ < 32 ? (e.consume(g), o) : s(g);
  }
  function a(g) {
    return g === 62 ? (e.exit("autolinkProtocol"), p(g)) : g === null || g === 32 || g === 60 || bn(g) ? n(g) : (e.consume(g), a);
  }
  function s(g) {
    return g === 64 ? (e.consume(g), r = 0, c) : vr(g) ? (e.consume(g), s) : n(g);
  }
  function c(g) {
    return de(g) ? d(g) : n(g);
  }
  function d(g) {
    return g === 46 ? (e.consume(g), r = 0, c) : g === 62 ? (e.exit("autolinkProtocol").type = "autolinkEmail", p(g)) : D(g);
  }
  function D(g) {
    return (g === 45 || de(g)) && r++ < 63 ? (e.consume(g), g === 45 ? D : d) : n(g);
  }
  function p(g) {
    return e.enter("autolinkMarker"), e.consume(g), e.exit("autolinkMarker"), e.exit("autolink"), t;
  }
}
const Ut = {
  tokenize: ls,
  partial: !0
};
function ls(e, t, n) {
  return q(e, r, "linePrefix");
  function r(i) {
    return i === null || O(i) ? t(i) : n(i);
  }
}
const Ii = {
  name: "blockQuote",
  tokenize: os,
  continuation: {
    tokenize: as
  },
  exit: ss
};
function os(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    if (l === 62) {
      const o = r.containerState;
      return o.open || (e.enter("blockQuote", {
        _container: !0
      }), o.open = !0), e.enter("blockQuotePrefix"), e.enter("blockQuoteMarker"), e.consume(l), e.exit("blockQuoteMarker"), u;
    }
    return n(l);
  }
  function u(l) {
    return K(l) ? (e.enter("blockQuotePrefixWhitespace"), e.consume(l), e.exit("blockQuotePrefixWhitespace"), e.exit("blockQuotePrefix"), t) : (e.exit("blockQuotePrefix"), t(l));
  }
}
function as(e, t, n) {
  return q(
    e,
    e.attempt(Ii, t, n),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function ss(e) {
  e.exit("blockQuote");
}
const Ti = {
  name: "characterEscape",
  tokenize: cs
};
function cs(e, t, n) {
  return r;
  function r(u) {
    return e.enter("characterEscape"), e.enter("escapeMarker"), e.consume(u), e.exit("escapeMarker"), i;
  }
  function i(u) {
    return Qa(u) ? (e.enter("characterEscapeValue"), e.consume(u), e.exit("characterEscapeValue"), e.exit("characterEscape"), t) : n(u);
  }
}
const Lr = document.createElement("i");
function Nn(e) {
  const t = "&" + e + ";";
  Lr.innerHTML = t;
  const n = Lr.textContent;
  return n.charCodeAt(n.length - 1) === 59 && e !== "semi" || n === t ? !1 : n;
}
const Ni = {
  name: "characterReference",
  tokenize: fs
};
function fs(e, t, n) {
  const r = this;
  let i = 0, u, l;
  return o;
  function o(d) {
    return e.enter("characterReference"), e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), a;
  }
  function a(d) {
    return d === 35 ? (e.enter("characterReferenceMarkerNumeric"), e.consume(d), e.exit("characterReferenceMarkerNumeric"), s) : (e.enter("characterReferenceValue"), u = 31, l = de, c(d));
  }
  function s(d) {
    return d === 88 || d === 120 ? (e.enter("characterReferenceMarkerHexadecimal"), e.consume(d), e.exit("characterReferenceMarkerHexadecimal"), e.enter("characterReferenceValue"), u = 6, l = Ya, c) : (e.enter("characterReferenceValue"), u = 7, l = xn, c(d));
  }
  function c(d) {
    let D;
    return d === 59 && i ? (D = e.exit("characterReferenceValue"), l === de && !Nn(r.sliceSerialize(D)) ? n(d) : (e.enter("characterReferenceMarker"), e.consume(d), e.exit("characterReferenceMarker"), e.exit("characterReference"), t)) : l(d) && i++ < u ? (e.consume(d), c) : n(d);
  }
}
const _r = {
  name: "codeFenced",
  tokenize: hs,
  concrete: !0
};
function hs(e, t, n) {
  const r = this, i = {
    tokenize: z,
    partial: !0
  }, u = {
    tokenize: L,
    partial: !0
  }, l = this.events[this.events.length - 1], o = l && l[1].type === "linePrefix" ? l[2].sliceSerialize(l[1], !0).length : 0;
  let a = 0, s;
  return c;
  function c(F) {
    return e.enter("codeFenced"), e.enter("codeFencedFence"), e.enter("codeFencedFenceSequence"), s = F, d(F);
  }
  function d(F) {
    return F === s ? (e.consume(F), a++, d) : (e.exit("codeFencedFenceSequence"), a < 3 ? n(F) : q(e, D, "whitespace")(F));
  }
  function D(F) {
    return F === null || O(F) ? k(F) : (e.enter("codeFencedFenceInfo"), e.enter("chunkString", {
      contentType: "string"
    }), p(F));
  }
  function p(F) {
    return F === null || De(F) ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), q(e, g, "whitespace")(F)) : F === 96 && F === s ? n(F) : (e.consume(F), p);
  }
  function g(F) {
    return F === null || O(F) ? k(F) : (e.enter("codeFencedFenceMeta"), e.enter("chunkString", {
      contentType: "string"
    }), x(F));
  }
  function x(F) {
    return F === null || O(F) ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), k(F)) : F === 96 && F === s ? n(F) : (e.consume(F), x);
  }
  function k(F) {
    return e.exit("codeFencedFence"), r.interrupt ? t(F) : y(F);
  }
  function y(F) {
    return F === null ? w(F) : O(F) ? e.attempt(
      u,
      e.attempt(
        i,
        w,
        o ? q(
          e,
          y,
          "linePrefix",
          o + 1
        ) : y
      ),
      w
    )(F) : (e.enter("codeFlowValue"), B(F));
  }
  function B(F) {
    return F === null || O(F) ? (e.exit("codeFlowValue"), y(F)) : (e.consume(F), B);
  }
  function w(F) {
    return e.exit("codeFenced"), t(F);
  }
  function L(F, _, N) {
    const M = this;
    return ne;
    function ne($) {
      return F.enter("lineEnding"), F.consume($), F.exit("lineEnding"), v;
    }
    function v($) {
      return M.parser.lazy[M.now().line] ? N($) : _($);
    }
  }
  function z(F, _, N) {
    let M = 0;
    return q(
      F,
      ne,
      "linePrefix",
      this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
    function ne(T) {
      return F.enter("codeFencedFence"), F.enter("codeFencedFenceSequence"), v(T);
    }
    function v(T) {
      return T === s ? (F.consume(T), M++, v) : M < a ? N(T) : (F.exit("codeFencedFenceSequence"), q(F, $, "whitespace")(T));
    }
    function $(T) {
      return T === null || O(T) ? (F.exit("codeFencedFence"), _(T)) : N(T);
    }
  }
}
const un = {
  name: "codeIndented",
  tokenize: ps
}, ds = {
  tokenize: gs,
  partial: !0
};
function ps(e, t, n) {
  const r = this;
  return i;
  function i(s) {
    return e.enter("codeIndented"), q(e, u, "linePrefix", 4 + 1)(s);
  }
  function u(s) {
    const c = r.events[r.events.length - 1];
    return c && c[1].type === "linePrefix" && c[2].sliceSerialize(c[1], !0).length >= 4 ? l(s) : n(s);
  }
  function l(s) {
    return s === null ? a(s) : O(s) ? e.attempt(ds, l, a)(s) : (e.enter("codeFlowValue"), o(s));
  }
  function o(s) {
    return s === null || O(s) ? (e.exit("codeFlowValue"), l(s)) : (e.consume(s), o);
  }
  function a(s) {
    return e.exit("codeIndented"), t(s);
  }
}
function gs(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line] ? n(l) : O(l) ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), i) : q(e, u, "linePrefix", 4 + 1)(l);
  }
  function u(l) {
    const o = r.events[r.events.length - 1];
    return o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(l) : O(l) ? i(l) : n(l);
  }
}
const ms = {
  name: "codeText",
  tokenize: Fs,
  resolve: Ds,
  previous: ys
};
function Ds(e) {
  let t = e.length - 4, n = 3, r, i;
  if ((e[n][1].type === "lineEnding" || e[n][1].type === "space") && (e[t][1].type === "lineEnding" || e[t][1].type === "space")) {
    for (r = n; ++r < t; )
      if (e[r][1].type === "codeTextData") {
        e[n][1].type = "codeTextPadding", e[t][1].type = "codeTextPadding", n += 2, t -= 2;
        break;
      }
  }
  for (r = n - 1, t++; ++r <= t; )
    i === void 0 ? r !== t && e[r][1].type !== "lineEnding" && (i = r) : (r === t || e[r][1].type === "lineEnding") && (e[i][1].type = "codeTextData", r !== i + 2 && (e[i][1].end = e[r - 1][1].end, e.splice(i + 2, r - i - 2), t -= r - i - 2, r = i + 2), i = void 0);
  return e;
}
function ys(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === "characterEscape";
}
function Fs(e, t, n) {
  let r = 0, i, u;
  return l;
  function l(d) {
    return e.enter("codeText"), e.enter("codeTextSequence"), o(d);
  }
  function o(d) {
    return d === 96 ? (e.consume(d), r++, o) : (e.exit("codeTextSequence"), a(d));
  }
  function a(d) {
    return d === null ? n(d) : d === 96 ? (u = e.enter("codeTextSequence"), i = 0, c(d)) : d === 32 ? (e.enter("space"), e.consume(d), e.exit("space"), a) : O(d) ? (e.enter("lineEnding"), e.consume(d), e.exit("lineEnding"), a) : (e.enter("codeTextData"), s(d));
  }
  function s(d) {
    return d === null || d === 32 || d === 96 || O(d) ? (e.exit("codeTextData"), a(d)) : (e.consume(d), s);
  }
  function c(d) {
    return d === 96 ? (e.consume(d), i++, c) : i === r ? (e.exit("codeTextSequence"), e.exit("codeText"), t(d)) : (u.type = "codeTextData", s(d));
  }
}
function Mi(e) {
  const t = {};
  let n = -1, r, i, u, l, o, a, s;
  for (; ++n < e.length; ) {
    for (; n in t; )
      n = t[n];
    if (r = e[n], n && r[1].type === "chunkFlow" && e[n - 1][1].type === "listItemPrefix" && (a = r[1]._tokenizer.events, u = 0, u < a.length && a[u][1].type === "lineEndingBlank" && (u += 2), u < a.length && a[u][1].type === "content"))
      for (; ++u < a.length && a[u][1].type !== "content"; )
        a[u][1].type === "chunkText" && (a[u][1]._isInFirstContentOfListItem = !0, u++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(t, xs(e, n)), n = t[n], s = !0);
    else if (r[1]._container) {
      for (u = n, i = void 0; u-- && (l = e[u], l[1].type === "lineEnding" || l[1].type === "lineEndingBlank"); )
        l[0] === "enter" && (i && (e[i][1].type = "lineEndingBlank"), l[1].type = "lineEnding", i = u);
      i && (r[1].end = Object.assign({}, e[i][1].start), o = e.slice(i, n), o.unshift(r), Le(e, i, n - i + 1, o));
    }
  }
  return !s;
}
function xs(e, t) {
  const n = e[t][1], r = e[t][2];
  let i = t - 1;
  const u = [], l = n._tokenizer || r.parser[n.contentType](n.start), o = l.events, a = [], s = {};
  let c, d, D = -1, p = n, g = 0, x = 0;
  const k = [x];
  for (; p; ) {
    for (; e[++i][1] !== p; )
      ;
    u.push(i), p._tokenizer || (c = r.sliceStream(p), p.next || c.push(null), d && l.defineSkip(p.start), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = !0), l.write(c), p._isInFirstContentOfListItem && (l._gfmTasklistFirstContentOfListItem = void 0)), d = p, p = p.next;
  }
  for (p = n; ++D < o.length; )
    o[D][0] === "exit" && o[D - 1][0] === "enter" && o[D][1].type === o[D - 1][1].type && o[D][1].start.line !== o[D][1].end.line && (x = D + 1, k.push(x), p._tokenizer = void 0, p.previous = void 0, p = p.next);
  for (l.events = [], p ? (p._tokenizer = void 0, p.previous = void 0) : k.pop(), D = k.length; D--; ) {
    const y = o.slice(k[D], k[D + 1]), B = u.pop();
    a.unshift([B, B + y.length - 1]), Le(e, B, 2, y);
  }
  for (D = -1; ++D < a.length; )
    s[g + a[D][0]] = g + a[D][1], g += a[D][1] - a[D][0] - 1;
  return s;
}
const bs = {
  tokenize: ks,
  resolve: As
}, Cs = {
  tokenize: ws,
  partial: !0
};
function As(e) {
  return Mi(e), e;
}
function ks(e, t) {
  let n;
  return r;
  function r(o) {
    return e.enter("content"), n = e.enter("chunkContent", {
      contentType: "content"
    }), i(o);
  }
  function i(o) {
    return o === null ? u(o) : O(o) ? e.check(
      Cs,
      l,
      u
    )(o) : (e.consume(o), i);
  }
  function u(o) {
    return e.exit("chunkContent"), e.exit("content"), t(o);
  }
  function l(o) {
    return e.consume(o), e.exit("chunkContent"), n.next = e.enter("chunkContent", {
      contentType: "content",
      previous: n
    }), n = n.next, i;
  }
}
function ws(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.exit("chunkContent"), e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), q(e, u, "linePrefix");
  }
  function u(l) {
    if (l === null || O(l))
      return n(l);
    const o = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") && o && o[1].type === "linePrefix" && o[2].sliceSerialize(o[1], !0).length >= 4 ? t(l) : e.interrupt(r.parser.constructs.flow, n, t)(l);
  }
}
function Ri(e, t, n, r, i, u, l, o, a) {
  const s = a || Number.POSITIVE_INFINITY;
  let c = 0;
  return d;
  function d(y) {
    return y === 60 ? (e.enter(r), e.enter(i), e.enter(u), e.consume(y), e.exit(u), D) : y === null || y === 41 || bn(y) ? n(y) : (e.enter(r), e.enter(l), e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), x(y));
  }
  function D(y) {
    return y === 62 ? (e.enter(u), e.consume(y), e.exit(u), e.exit(i), e.exit(r), t) : (e.enter(o), e.enter("chunkString", {
      contentType: "string"
    }), p(y));
  }
  function p(y) {
    return y === 62 ? (e.exit("chunkString"), e.exit(o), D(y)) : y === null || y === 60 || O(y) ? n(y) : (e.consume(y), y === 92 ? g : p);
  }
  function g(y) {
    return y === 60 || y === 62 || y === 92 ? (e.consume(y), p) : p(y);
  }
  function x(y) {
    return y === 40 ? ++c > s ? n(y) : (e.consume(y), x) : y === 41 ? c-- ? (e.consume(y), x) : (e.exit("chunkString"), e.exit(o), e.exit(l), e.exit(r), t(y)) : y === null || De(y) ? c ? n(y) : (e.exit("chunkString"), e.exit(o), e.exit(l), e.exit(r), t(y)) : bn(y) ? n(y) : (e.consume(y), y === 92 ? k : x);
  }
  function k(y) {
    return y === 40 || y === 41 || y === 92 ? (e.consume(y), x) : x(y);
  }
}
function ji(e, t, n, r, i, u) {
  const l = this;
  let o = 0, a;
  return s;
  function s(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(u), c;
  }
  function c(p) {
    return p === null || p === 91 || p === 93 && !a || p === 94 && !o && "_hiddenFootnoteSupport" in l.parser.constructs || o > 999 ? n(p) : p === 93 ? (e.exit(u), e.enter(i), e.consume(p), e.exit(i), e.exit(r), t) : O(p) ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), c) : (e.enter("chunkString", {
      contentType: "string"
    }), d(p));
  }
  function d(p) {
    return p === null || p === 91 || p === 93 || O(p) || o++ > 999 ? (e.exit("chunkString"), c(p)) : (e.consume(p), a = a || !K(p), p === 92 ? D : d);
  }
  function D(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), o++, d) : d(p);
  }
}
function qi(e, t, n, r, i, u) {
  let l;
  return o;
  function o(D) {
    return e.enter(r), e.enter(i), e.consume(D), e.exit(i), l = D === 40 ? 41 : D, a;
  }
  function a(D) {
    return D === l ? (e.enter(i), e.consume(D), e.exit(i), e.exit(r), t) : (e.enter(u), s(D));
  }
  function s(D) {
    return D === l ? (e.exit(u), a(l)) : D === null ? n(D) : O(D) ? (e.enter("lineEnding"), e.consume(D), e.exit("lineEnding"), q(e, s, "linePrefix")) : (e.enter("chunkString", {
      contentType: "string"
    }), c(D));
  }
  function c(D) {
    return D === l || D === null || O(D) ? (e.exit("chunkString"), s(D)) : (e.consume(D), D === 92 ? d : c);
  }
  function d(D) {
    return D === l || D === 92 ? (e.consume(D), c) : c(D);
  }
}
function mt(e, t) {
  let n;
  return r;
  function r(i) {
    return O(i) ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), n = !0, r) : K(i) ? q(
      e,
      r,
      n ? "linePrefix" : "lineSuffix"
    )(i) : t(i);
  }
}
function Je(e) {
  return e.replace(/[\t\n\r ]+/g, " ").replace(/^ | $/g, "").toLowerCase().toUpperCase();
}
const Es = {
  name: "definition",
  tokenize: Ss
}, vs = {
  tokenize: Bs,
  partial: !0
};
function Ss(e, t, n) {
  const r = this;
  let i;
  return u;
  function u(a) {
    return e.enter("definition"), ji.call(
      r,
      e,
      l,
      n,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(a);
  }
  function l(a) {
    return i = Je(
      r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
    ), a === 58 ? (e.enter("definitionMarker"), e.consume(a), e.exit("definitionMarker"), mt(
      e,
      Ri(
        e,
        e.attempt(
          vs,
          q(e, o, "whitespace"),
          q(e, o, "whitespace")
        ),
        n,
        "definitionDestination",
        "definitionDestinationLiteral",
        "definitionDestinationLiteralMarker",
        "definitionDestinationRaw",
        "definitionDestinationString"
      )
    )) : n(a);
  }
  function o(a) {
    return a === null || O(a) ? (e.exit("definition"), r.parser.defined.includes(i) || r.parser.defined.push(i), t(a)) : n(a);
  }
}
function Bs(e, t, n) {
  return r;
  function r(l) {
    return De(l) ? mt(e, i)(l) : n(l);
  }
  function i(l) {
    return l === 34 || l === 39 || l === 40 ? qi(
      e,
      q(e, u, "whitespace"),
      n,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString"
    )(l) : n(l);
  }
  function u(l) {
    return l === null || O(l) ? t(l) : n(l);
  }
}
const $s = {
  name: "hardBreakEscape",
  tokenize: Ls
};
function Ls(e, t, n) {
  return r;
  function r(u) {
    return e.enter("hardBreakEscape"), e.enter("escapeMarker"), e.consume(u), i;
  }
  function i(u) {
    return O(u) ? (e.exit("escapeMarker"), e.exit("hardBreakEscape"), t(u)) : n(u);
  }
}
const _s = {
  name: "headingAtx",
  tokenize: zs,
  resolve: Os
};
function Os(e, t) {
  let n = e.length - 2, r = 3, i, u;
  return e[r][1].type === "whitespace" && (r += 2), n - 2 > r && e[n][1].type === "whitespace" && (n -= 2), e[n][1].type === "atxHeadingSequence" && (r === n - 1 || n - 4 > r && e[n - 2][1].type === "whitespace") && (n -= r + 1 === n ? 2 : 4), n > r && (i = {
    type: "atxHeadingText",
    start: e[r][1].start,
    end: e[n][1].end
  }, u = {
    type: "chunkText",
    start: e[r][1].start,
    end: e[n][1].end,
    contentType: "text"
  }, Le(e, r, n - r + 1, [
    ["enter", i, t],
    ["enter", u, t],
    ["exit", u, t],
    ["exit", i, t]
  ])), e;
}
function zs(e, t, n) {
  const r = this;
  let i = 0;
  return u;
  function u(c) {
    return e.enter("atxHeading"), e.enter("atxHeadingSequence"), l(c);
  }
  function l(c) {
    return c === 35 && i++ < 6 ? (e.consume(c), l) : c === null || De(c) ? (e.exit("atxHeadingSequence"), r.interrupt ? t(c) : o(c)) : n(c);
  }
  function o(c) {
    return c === 35 ? (e.enter("atxHeadingSequence"), a(c)) : c === null || O(c) ? (e.exit("atxHeading"), t(c)) : K(c) ? q(e, o, "whitespace")(c) : (e.enter("atxHeadingText"), s(c));
  }
  function a(c) {
    return c === 35 ? (e.consume(c), a) : (e.exit("atxHeadingSequence"), o(c));
  }
  function s(c) {
    return c === null || c === 35 || De(c) ? (e.exit("atxHeadingText"), o(c)) : (e.consume(c), s);
  }
}
const Ps = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], Or = ["pre", "script", "style", "textarea"], Is = {
  name: "htmlFlow",
  tokenize: Ms,
  resolveTo: Ns,
  concrete: !0
}, Ts = {
  tokenize: Rs,
  partial: !0
};
function Ns(e) {
  let t = e.length;
  for (; t-- && !(e[t][0] === "enter" && e[t][1].type === "htmlFlow"); )
    ;
  return t > 1 && e[t - 2][1].type === "linePrefix" && (e[t][1].start = e[t - 2][1].start, e[t + 1][1].start = e[t - 2][1].start, e.splice(t - 2, 2)), e;
}
function Ms(e, t, n) {
  const r = this;
  let i, u, l, o, a;
  return s;
  function s(f) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(f), c;
  }
  function c(f) {
    return f === 33 ? (e.consume(f), d) : f === 47 ? (e.consume(f), g) : f === 63 ? (e.consume(f), i = 3, r.interrupt ? t : ce) : Ee(f) ? (e.consume(f), l = String.fromCharCode(f), u = !0, x) : n(f);
  }
  function d(f) {
    return f === 45 ? (e.consume(f), i = 2, D) : f === 91 ? (e.consume(f), i = 5, l = "CDATA[", o = 0, p) : Ee(f) ? (e.consume(f), i = 4, r.interrupt ? t : ce) : n(f);
  }
  function D(f) {
    return f === 45 ? (e.consume(f), r.interrupt ? t : ce) : n(f);
  }
  function p(f) {
    return f === l.charCodeAt(o++) ? (e.consume(f), o === l.length ? r.interrupt ? t : v : p) : n(f);
  }
  function g(f) {
    return Ee(f) ? (e.consume(f), l = String.fromCharCode(f), x) : n(f);
  }
  function x(f) {
    return f === null || f === 47 || f === 62 || De(f) ? f !== 47 && u && Or.includes(l.toLowerCase()) ? (i = 1, r.interrupt ? t(f) : v(f)) : Ps.includes(l.toLowerCase()) ? (i = 6, f === 47 ? (e.consume(f), k) : r.interrupt ? t(f) : v(f)) : (i = 7, r.interrupt && !r.parser.lazy[r.now().line] ? n(f) : u ? B(f) : y(f)) : f === 45 || de(f) ? (e.consume(f), l += String.fromCharCode(f), x) : n(f);
  }
  function k(f) {
    return f === 62 ? (e.consume(f), r.interrupt ? t : v) : n(f);
  }
  function y(f) {
    return K(f) ? (e.consume(f), y) : M(f);
  }
  function B(f) {
    return f === 47 ? (e.consume(f), M) : f === 58 || f === 95 || Ee(f) ? (e.consume(f), w) : K(f) ? (e.consume(f), B) : M(f);
  }
  function w(f) {
    return f === 45 || f === 46 || f === 58 || f === 95 || de(f) ? (e.consume(f), w) : L(f);
  }
  function L(f) {
    return f === 61 ? (e.consume(f), z) : K(f) ? (e.consume(f), L) : B(f);
  }
  function z(f) {
    return f === null || f === 60 || f === 61 || f === 62 || f === 96 ? n(f) : f === 34 || f === 39 ? (e.consume(f), a = f, F) : K(f) ? (e.consume(f), z) : (a = null, _(f));
  }
  function F(f) {
    return f === null || O(f) ? n(f) : f === a ? (e.consume(f), N) : (e.consume(f), F);
  }
  function _(f) {
    return f === null || f === 34 || f === 39 || f === 60 || f === 61 || f === 62 || f === 96 || De(f) ? L(f) : (e.consume(f), _);
  }
  function N(f) {
    return f === 47 || f === 62 || K(f) ? B(f) : n(f);
  }
  function M(f) {
    return f === 62 ? (e.consume(f), ne) : n(f);
  }
  function ne(f) {
    return K(f) ? (e.consume(f), ne) : f === null || O(f) ? v(f) : n(f);
  }
  function v(f) {
    return f === 45 && i === 2 ? (e.consume(f), pe) : f === 60 && i === 1 ? (e.consume(f), Ce) : f === 62 && i === 4 ? (e.consume(f), G) : f === 63 && i === 3 ? (e.consume(f), ce) : f === 93 && i === 5 ? (e.consume(f), re) : O(f) && (i === 6 || i === 7) ? e.check(
      Ts,
      G,
      $
    )(f) : f === null || O(f) ? $(f) : (e.consume(f), v);
  }
  function $(f) {
    return e.exit("htmlFlowData"), T(f);
  }
  function T(f) {
    return f === null ? h(f) : O(f) ? e.attempt(
      {
        tokenize: oe,
        partial: !0
      },
      T,
      h
    )(f) : (e.enter("htmlFlowData"), v(f));
  }
  function oe(f, Ve, at) {
    return We;
    function We(Ae) {
      return f.enter("lineEnding"), f.consume(Ae), f.exit("lineEnding"), Z;
    }
    function Z(Ae) {
      return r.parser.lazy[r.now().line] ? at(Ae) : Ve(Ae);
    }
  }
  function pe(f) {
    return f === 45 ? (e.consume(f), ce) : v(f);
  }
  function Ce(f) {
    return f === 47 ? (e.consume(f), l = "", xe) : v(f);
  }
  function xe(f) {
    return f === 62 && Or.includes(l.toLowerCase()) ? (e.consume(f), G) : Ee(f) && l.length < 8 ? (e.consume(f), l += String.fromCharCode(f), xe) : v(f);
  }
  function re(f) {
    return f === 93 ? (e.consume(f), ce) : v(f);
  }
  function ce(f) {
    return f === 62 ? (e.consume(f), G) : f === 45 && i === 2 ? (e.consume(f), ce) : v(f);
  }
  function G(f) {
    return f === null || O(f) ? (e.exit("htmlFlowData"), h(f)) : (e.consume(f), G);
  }
  function h(f) {
    return e.exit("htmlFlow"), t(f);
  }
}
function Rs(e, t, n) {
  return r;
  function r(i) {
    return e.exit("htmlFlowData"), e.enter("lineEndingBlank"), e.consume(i), e.exit("lineEndingBlank"), e.attempt(Ut, t, n);
  }
}
const js = {
  name: "htmlText",
  tokenize: qs
};
function qs(e, t, n) {
  const r = this;
  let i, u, l, o;
  return a;
  function a(h) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(h), s;
  }
  function s(h) {
    return h === 33 ? (e.consume(h), c) : h === 47 ? (e.consume(h), _) : h === 63 ? (e.consume(h), z) : Ee(h) ? (e.consume(h), ne) : n(h);
  }
  function c(h) {
    return h === 45 ? (e.consume(h), d) : h === 91 ? (e.consume(h), u = "CDATA[", l = 0, k) : Ee(h) ? (e.consume(h), L) : n(h);
  }
  function d(h) {
    return h === 45 ? (e.consume(h), D) : n(h);
  }
  function D(h) {
    return h === null || h === 62 ? n(h) : h === 45 ? (e.consume(h), p) : g(h);
  }
  function p(h) {
    return h === null || h === 62 ? n(h) : g(h);
  }
  function g(h) {
    return h === null ? n(h) : h === 45 ? (e.consume(h), x) : O(h) ? (o = g, re(h)) : (e.consume(h), g);
  }
  function x(h) {
    return h === 45 ? (e.consume(h), G) : g(h);
  }
  function k(h) {
    return h === u.charCodeAt(l++) ? (e.consume(h), l === u.length ? y : k) : n(h);
  }
  function y(h) {
    return h === null ? n(h) : h === 93 ? (e.consume(h), B) : O(h) ? (o = y, re(h)) : (e.consume(h), y);
  }
  function B(h) {
    return h === 93 ? (e.consume(h), w) : y(h);
  }
  function w(h) {
    return h === 62 ? G(h) : h === 93 ? (e.consume(h), w) : y(h);
  }
  function L(h) {
    return h === null || h === 62 ? G(h) : O(h) ? (o = L, re(h)) : (e.consume(h), L);
  }
  function z(h) {
    return h === null ? n(h) : h === 63 ? (e.consume(h), F) : O(h) ? (o = z, re(h)) : (e.consume(h), z);
  }
  function F(h) {
    return h === 62 ? G(h) : z(h);
  }
  function _(h) {
    return Ee(h) ? (e.consume(h), N) : n(h);
  }
  function N(h) {
    return h === 45 || de(h) ? (e.consume(h), N) : M(h);
  }
  function M(h) {
    return O(h) ? (o = M, re(h)) : K(h) ? (e.consume(h), M) : G(h);
  }
  function ne(h) {
    return h === 45 || de(h) ? (e.consume(h), ne) : h === 47 || h === 62 || De(h) ? v(h) : n(h);
  }
  function v(h) {
    return h === 47 ? (e.consume(h), G) : h === 58 || h === 95 || Ee(h) ? (e.consume(h), $) : O(h) ? (o = v, re(h)) : K(h) ? (e.consume(h), v) : G(h);
  }
  function $(h) {
    return h === 45 || h === 46 || h === 58 || h === 95 || de(h) ? (e.consume(h), $) : T(h);
  }
  function T(h) {
    return h === 61 ? (e.consume(h), oe) : O(h) ? (o = T, re(h)) : K(h) ? (e.consume(h), T) : v(h);
  }
  function oe(h) {
    return h === null || h === 60 || h === 61 || h === 62 || h === 96 ? n(h) : h === 34 || h === 39 ? (e.consume(h), i = h, pe) : O(h) ? (o = oe, re(h)) : K(h) ? (e.consume(h), oe) : (e.consume(h), i = void 0, xe);
  }
  function pe(h) {
    return h === i ? (e.consume(h), Ce) : h === null ? n(h) : O(h) ? (o = pe, re(h)) : (e.consume(h), pe);
  }
  function Ce(h) {
    return h === 62 || h === 47 || De(h) ? v(h) : n(h);
  }
  function xe(h) {
    return h === null || h === 34 || h === 39 || h === 60 || h === 61 || h === 96 ? n(h) : h === 62 || De(h) ? v(h) : (e.consume(h), xe);
  }
  function re(h) {
    return e.exit("htmlTextData"), e.enter("lineEnding"), e.consume(h), e.exit("lineEnding"), q(
      e,
      ce,
      "linePrefix",
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
  }
  function ce(h) {
    return e.enter("htmlTextData"), o(h);
  }
  function G(h) {
    return h === 62 ? (e.consume(h), e.exit("htmlTextData"), e.exit("htmlText"), t) : n(h);
  }
}
const Mn = {
  name: "labelEnd",
  tokenize: Qs,
  resolveTo: Ys,
  resolveAll: Ws
}, Hs = {
  tokenize: Ks
}, Us = {
  tokenize: Xs
}, Vs = {
  tokenize: Gs
};
function Ws(e) {
  let t = -1, n;
  for (; ++t < e.length; )
    n = e[t][1], (n.type === "labelImage" || n.type === "labelLink" || n.type === "labelEnd") && (e.splice(t + 1, n.type === "labelImage" ? 4 : 2), n.type = "data", t++);
  return e;
}
function Ys(e, t) {
  let n = e.length, r = 0, i, u, l, o;
  for (; n--; )
    if (i = e[n][1], u) {
      if (i.type === "link" || i.type === "labelLink" && i._inactive)
        break;
      e[n][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (l) {
      if (e[n][0] === "enter" && (i.type === "labelImage" || i.type === "labelLink") && !i._balanced && (u = n, i.type !== "labelLink")) {
        r = 2;
        break;
      }
    } else
      i.type === "labelEnd" && (l = n);
  const a = {
    type: e[u][1].type === "labelLink" ? "link" : "image",
    start: Object.assign({}, e[u][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  }, s = {
    type: "label",
    start: Object.assign({}, e[u][1].start),
    end: Object.assign({}, e[l][1].end)
  }, c = {
    type: "labelText",
    start: Object.assign({}, e[u + r + 2][1].end),
    end: Object.assign({}, e[l - 2][1].start)
  };
  return o = [
    ["enter", a, t],
    ["enter", s, t]
  ], o = me(o, e.slice(u + 1, u + r + 3)), o = me(o, [["enter", c, t]]), o = me(
    o,
    Tn(
      t.parser.constructs.insideSpan.null,
      e.slice(u + r + 4, l - 3),
      t
    )
  ), o = me(o, [
    ["exit", c, t],
    e[l - 2],
    e[l - 1],
    ["exit", s, t]
  ]), o = me(o, e.slice(l + 1)), o = me(o, [["exit", a, t]]), Le(e, u, e.length, o), e;
}
function Qs(e, t, n) {
  const r = this;
  let i = r.events.length, u, l;
  for (; i--; )
    if ((r.events[i][1].type === "labelImage" || r.events[i][1].type === "labelLink") && !r.events[i][1]._balanced) {
      u = r.events[i][1];
      break;
    }
  return o;
  function o(c) {
    return u ? u._inactive ? s(c) : (l = r.parser.defined.includes(
      Je(
        r.sliceSerialize({
          start: u.end,
          end: r.now()
        })
      )
    ), e.enter("labelEnd"), e.enter("labelMarker"), e.consume(c), e.exit("labelMarker"), e.exit("labelEnd"), a) : n(c);
  }
  function a(c) {
    return c === 40 ? e.attempt(
      Hs,
      t,
      l ? t : s
    )(c) : c === 91 ? e.attempt(
      Us,
      t,
      l ? e.attempt(Vs, t, s) : s
    )(c) : l ? t(c) : s(c);
  }
  function s(c) {
    return u._balanced = !0, n(c);
  }
}
function Ks(e, t, n) {
  return r;
  function r(a) {
    return e.enter("resource"), e.enter("resourceMarker"), e.consume(a), e.exit("resourceMarker"), mt(e, i);
  }
  function i(a) {
    return a === 41 ? o(a) : Ri(
      e,
      u,
      n,
      "resourceDestination",
      "resourceDestinationLiteral",
      "resourceDestinationLiteralMarker",
      "resourceDestinationRaw",
      "resourceDestinationString",
      32
    )(a);
  }
  function u(a) {
    return De(a) ? mt(e, l)(a) : o(a);
  }
  function l(a) {
    return a === 34 || a === 39 || a === 40 ? qi(
      e,
      mt(e, o),
      n,
      "resourceTitle",
      "resourceTitleMarker",
      "resourceTitleString"
    )(a) : o(a);
  }
  function o(a) {
    return a === 41 ? (e.enter("resourceMarker"), e.consume(a), e.exit("resourceMarker"), e.exit("resource"), t) : n(a);
  }
}
function Xs(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return ji.call(
      r,
      e,
      u,
      n,
      "reference",
      "referenceMarker",
      "referenceString"
    )(l);
  }
  function u(l) {
    return r.parser.defined.includes(
      Je(
        r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1)
      )
    ) ? t(l) : n(l);
  }
}
function Gs(e, t, n) {
  return r;
  function r(u) {
    return e.enter("reference"), e.enter("referenceMarker"), e.consume(u), e.exit("referenceMarker"), i;
  }
  function i(u) {
    return u === 93 ? (e.enter("referenceMarker"), e.consume(u), e.exit("referenceMarker"), e.exit("reference"), t) : n(u);
  }
}
const Zs = {
  name: "labelStartImage",
  tokenize: Js,
  resolveAll: Mn.resolveAll
};
function Js(e, t, n) {
  const r = this;
  return i;
  function i(o) {
    return e.enter("labelImage"), e.enter("labelImageMarker"), e.consume(o), e.exit("labelImageMarker"), u;
  }
  function u(o) {
    return o === 91 ? (e.enter("labelMarker"), e.consume(o), e.exit("labelMarker"), e.exit("labelImage"), l) : n(o);
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(o) : t(o);
  }
}
const ec = {
  name: "labelStartLink",
  tokenize: tc,
  resolveAll: Mn.resolveAll
};
function tc(e, t, n) {
  const r = this;
  return i;
  function i(l) {
    return e.enter("labelLink"), e.enter("labelMarker"), e.consume(l), e.exit("labelMarker"), e.exit("labelLink"), u;
  }
  function u(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs ? n(l) : t(l);
  }
}
const ln = {
  name: "lineEnding",
  tokenize: nc
};
function nc(e, t) {
  return n;
  function n(r) {
    return e.enter("lineEnding"), e.consume(r), e.exit("lineEnding"), q(e, t, "linePrefix");
  }
}
const Bt = {
  name: "thematicBreak",
  tokenize: rc
};
function rc(e, t, n) {
  let r = 0, i;
  return u;
  function u(a) {
    return e.enter("thematicBreak"), i = a, l(a);
  }
  function l(a) {
    return a === i ? (e.enter("thematicBreakSequence"), o(a)) : K(a) ? q(e, l, "whitespace")(a) : r < 3 || a !== null && !O(a) ? n(a) : (e.exit("thematicBreak"), t(a));
  }
  function o(a) {
    return a === i ? (e.consume(a), r++, o) : (e.exit("thematicBreakSequence"), l(a));
  }
}
const fe = {
  name: "list",
  tokenize: lc,
  continuation: {
    tokenize: oc
  },
  exit: sc
}, ic = {
  tokenize: cc,
  partial: !0
}, uc = {
  tokenize: ac,
  partial: !0
};
function lc(e, t, n) {
  const r = this, i = r.events[r.events.length - 1];
  let u = i && i[1].type === "linePrefix" ? i[2].sliceSerialize(i[1], !0).length : 0, l = 0;
  return o;
  function o(p) {
    const g = r.containerState.type || (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (g === "listUnordered" ? !r.containerState.marker || p === r.containerState.marker : xn(p)) {
      if (r.containerState.type || (r.containerState.type = g, e.enter(g, {
        _container: !0
      })), g === "listUnordered")
        return e.enter("listItemPrefix"), p === 42 || p === 45 ? e.check(Bt, n, s)(p) : s(p);
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), a(p);
    }
    return n(p);
  }
  function a(p) {
    return xn(p) && ++l < 10 ? (e.consume(p), a) : (!r.interrupt || l < 2) && (r.containerState.marker ? p === r.containerState.marker : p === 41 || p === 46) ? (e.exit("listItemValue"), s(p)) : n(p);
  }
  function s(p) {
    return e.enter("listItemMarker"), e.consume(p), e.exit("listItemMarker"), r.containerState.marker = r.containerState.marker || p, e.check(
      Ut,
      r.interrupt ? n : c,
      e.attempt(
        ic,
        D,
        d
      )
    );
  }
  function c(p) {
    return r.containerState.initialBlankLine = !0, u++, D(p);
  }
  function d(p) {
    return K(p) ? (e.enter("listItemPrefixWhitespace"), e.consume(p), e.exit("listItemPrefixWhitespace"), D) : n(p);
  }
  function D(p) {
    return r.containerState.size = u + r.sliceSerialize(e.exit("listItemPrefix"), !0).length, t(p);
  }
}
function oc(e, t, n) {
  const r = this;
  return r.containerState._closeFlow = void 0, e.check(Ut, i, u);
  function i(o) {
    return r.containerState.furtherBlankLines = r.containerState.furtherBlankLines || r.containerState.initialBlankLine, q(
      e,
      t,
      "listItemIndent",
      r.containerState.size + 1
    )(o);
  }
  function u(o) {
    return r.containerState.furtherBlankLines || !K(o) ? (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, l(o)) : (r.containerState.furtherBlankLines = void 0, r.containerState.initialBlankLine = void 0, e.attempt(uc, t, l)(o));
  }
  function l(o) {
    return r.containerState._closeFlow = !0, r.interrupt = void 0, q(
      e,
      e.attempt(fe, t, n),
      "linePrefix",
      r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    )(o);
  }
}
function ac(e, t, n) {
  const r = this;
  return q(
    e,
    i,
    "listItemIndent",
    r.containerState.size + 1
  );
  function i(u) {
    const l = r.events[r.events.length - 1];
    return l && l[1].type === "listItemIndent" && l[2].sliceSerialize(l[1], !0).length === r.containerState.size ? t(u) : n(u);
  }
}
function sc(e) {
  e.exit(this.containerState.type);
}
function cc(e, t, n) {
  const r = this;
  return q(
    e,
    i,
    "listItemPrefixWhitespace",
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1
  );
  function i(u) {
    const l = r.events[r.events.length - 1];
    return !K(u) && l && l[1].type === "listItemPrefixWhitespace" ? t(u) : n(u);
  }
}
const zr = {
  name: "setextUnderline",
  tokenize: hc,
  resolveTo: fc
};
function fc(e, t) {
  let n = e.length, r, i, u;
  for (; n--; )
    if (e[n][0] === "enter") {
      if (e[n][1].type === "content") {
        r = n;
        break;
      }
      e[n][1].type === "paragraph" && (i = n);
    } else
      e[n][1].type === "content" && e.splice(n, 1), !u && e[n][1].type === "definition" && (u = n);
  const l = {
    type: "setextHeading",
    start: Object.assign({}, e[i][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  };
  return e[i][1].type = "setextHeadingText", u ? (e.splice(i, 0, ["enter", l, t]), e.splice(u + 1, 0, ["exit", e[r][1], t]), e[r][1].end = Object.assign({}, e[u][1].end)) : e[r][1] = l, e.push(["exit", l, t]), e;
}
function hc(e, t, n) {
  const r = this;
  let i = r.events.length, u, l;
  for (; i--; )
    if (r.events[i][1].type !== "lineEnding" && r.events[i][1].type !== "linePrefix" && r.events[i][1].type !== "content") {
      l = r.events[i][1].type === "paragraph";
      break;
    }
  return o;
  function o(c) {
    return !r.parser.lazy[r.now().line] && (r.interrupt || l) ? (e.enter("setextHeadingLine"), e.enter("setextHeadingLineSequence"), u = c, a(c)) : n(c);
  }
  function a(c) {
    return c === u ? (e.consume(c), a) : (e.exit("setextHeadingLineSequence"), q(e, s, "lineSuffix")(c));
  }
  function s(c) {
    return c === null || O(c) ? (e.exit("setextHeadingLine"), t(c)) : n(c);
  }
}
const dc = {
  tokenize: pc
};
function pc(e) {
  const t = this, n = e.attempt(
    Ut,
    r,
    e.attempt(
      this.parser.constructs.flowInitial,
      i,
      q(
        e,
        e.attempt(
          this.parser.constructs.flow,
          i,
          e.attempt(bs, i)
        ),
        "linePrefix"
      )
    )
  );
  return n;
  function r(u) {
    if (u === null) {
      e.consume(u);
      return;
    }
    return e.enter("lineEndingBlank"), e.consume(u), e.exit("lineEndingBlank"), t.currentConstruct = void 0, n;
  }
  function i(u) {
    if (u === null) {
      e.consume(u);
      return;
    }
    return e.enter("lineEnding"), e.consume(u), e.exit("lineEnding"), t.currentConstruct = void 0, n;
  }
}
const gc = {
  resolveAll: Ui()
}, mc = Hi("string"), Dc = Hi("text");
function Hi(e) {
  return {
    tokenize: t,
    resolveAll: Ui(
      e === "text" ? yc : void 0
    )
  };
  function t(n) {
    const r = this, i = this.parser.constructs[e], u = n.attempt(i, l, o);
    return l;
    function l(c) {
      return s(c) ? u(c) : o(c);
    }
    function o(c) {
      if (c === null) {
        n.consume(c);
        return;
      }
      return n.enter("data"), n.consume(c), a;
    }
    function a(c) {
      return s(c) ? (n.exit("data"), u(c)) : (n.consume(c), a);
    }
    function s(c) {
      if (c === null)
        return !0;
      const d = i[c];
      let D = -1;
      if (d)
        for (; ++D < d.length; ) {
          const p = d[D];
          if (!p.previous || p.previous.call(r, r.previous))
            return !0;
        }
      return !1;
    }
  }
}
function Ui(e) {
  return t;
  function t(n, r) {
    let i = -1, u;
    for (; ++i <= n.length; )
      u === void 0 ? n[i] && n[i][1].type === "data" && (u = i, i++) : (!n[i] || n[i][1].type !== "data") && (i !== u + 2 && (n[u][1].end = n[i - 1][1].end, n.splice(u + 2, i - u - 2), i = u + 2), u = void 0);
    return e ? e(n, r) : n;
  }
}
function yc(e, t) {
  let n = 0;
  for (; ++n <= e.length; )
    if ((n === e.length || e[n][1].type === "lineEnding") && e[n - 1][1].type === "data") {
      const r = e[n - 1][1], i = t.sliceStream(r);
      let u = i.length, l = -1, o = 0, a;
      for (; u--; ) {
        const s = i[u];
        if (typeof s == "string") {
          for (l = s.length; s.charCodeAt(l - 1) === 32; )
            o++, l--;
          if (l)
            break;
          l = -1;
        } else if (s === -2)
          a = !0, o++;
        else if (s !== -1) {
          u++;
          break;
        }
      }
      if (o) {
        const s = {
          type: n === e.length || a || o < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            line: r.end.line,
            column: r.end.column - o,
            offset: r.end.offset - o,
            _index: r.start._index + u,
            _bufferIndex: u ? l : r.start._bufferIndex + l
          },
          end: Object.assign({}, r.end)
        };
        r.end = Object.assign({}, s.start), r.start.offset === r.end.offset ? Object.assign(r, s) : (e.splice(
          n,
          0,
          ["enter", s, t],
          ["exit", s, t]
        ), n += 2);
      }
      n++;
    }
  return e;
}
function Fc(e, t, n) {
  let r = Object.assign(
    n ? Object.assign({}, n) : {
      line: 1,
      column: 1,
      offset: 0
    },
    {
      _index: 0,
      _bufferIndex: -1
    }
  );
  const i = {}, u = [];
  let l = [], o = [];
  const a = {
    consume: B,
    enter: w,
    exit: L,
    attempt: _(z),
    check: _(F),
    interrupt: _(F, {
      interrupt: !0
    })
  }, s = {
    previous: null,
    code: null,
    containerState: {},
    events: [],
    parser: e,
    sliceStream: p,
    sliceSerialize: D,
    now: g,
    defineSkip: x,
    write: d
  };
  let c = t.tokenize.call(s, a);
  return t.resolveAll && u.push(t), s;
  function d(v) {
    return l = me(l, v), k(), l[l.length - 1] !== null ? [] : (N(t, 0), s.events = Tn(u, s.events, s), s.events);
  }
  function D(v, $) {
    return bc(p(v), $);
  }
  function p(v) {
    return xc(l, v);
  }
  function g() {
    return Object.assign({}, r);
  }
  function x(v) {
    i[v.line] = v.column, ne();
  }
  function k() {
    let v;
    for (; r._index < l.length; ) {
      const $ = l[r._index];
      if (typeof $ == "string")
        for (v = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0); r._index === v && r._bufferIndex < $.length; )
          y($.charCodeAt(r._bufferIndex));
      else
        y($);
    }
  }
  function y(v) {
    c = c(v);
  }
  function B(v) {
    O(v) ? (r.line++, r.column = 1, r.offset += v === -3 ? 2 : 1, ne()) : v !== -1 && (r.column++, r.offset++), r._bufferIndex < 0 ? r._index++ : (r._bufferIndex++, r._bufferIndex === l[r._index].length && (r._bufferIndex = -1, r._index++)), s.previous = v;
  }
  function w(v, $) {
    const T = $ || {};
    return T.type = v, T.start = g(), s.events.push(["enter", T, s]), o.push(T), T;
  }
  function L(v) {
    const $ = o.pop();
    return $.end = g(), s.events.push(["exit", $, s]), $;
  }
  function z(v, $) {
    N(v, $.from);
  }
  function F(v, $) {
    $.restore();
  }
  function _(v, $) {
    return T;
    function T(oe, pe, Ce) {
      let xe, re, ce, G;
      return Array.isArray(oe) ? f(oe) : "tokenize" in oe ? f([oe]) : h(oe);
      function h(Z) {
        return Ae;
        function Ae(_e) {
          const Ye = _e !== null && Z[_e], Qe = _e !== null && Z.null, Yt = [
            ...Array.isArray(Ye) ? Ye : Ye ? [Ye] : [],
            ...Array.isArray(Qe) ? Qe : Qe ? [Qe] : []
          ];
          return f(Yt)(_e);
        }
      }
      function f(Z) {
        return xe = Z, re = 0, Z.length === 0 ? Ce : Ve(Z[re]);
      }
      function Ve(Z) {
        return Ae;
        function Ae(_e) {
          return G = M(), ce = Z, Z.partial || (s.currentConstruct = Z), Z.name && s.parser.constructs.disable.null.includes(Z.name) ? We() : Z.tokenize.call(
            $ ? Object.assign(Object.create(s), $) : s,
            a,
            at,
            We
          )(_e);
        }
      }
      function at(Z) {
        return v(ce, G), pe;
      }
      function We(Z) {
        return G.restore(), ++re < xe.length ? Ve(xe[re]) : Ce;
      }
    }
  }
  function N(v, $) {
    v.resolveAll && !u.includes(v) && u.push(v), v.resolve && Le(
      s.events,
      $,
      s.events.length - $,
      v.resolve(s.events.slice($), s)
    ), v.resolveTo && (s.events = v.resolveTo(s.events, s));
  }
  function M() {
    const v = g(), $ = s.previous, T = s.currentConstruct, oe = s.events.length, pe = Array.from(o);
    return {
      restore: Ce,
      from: oe
    };
    function Ce() {
      r = v, s.previous = $, s.currentConstruct = T, s.events.length = oe, o = pe, ne();
    }
  }
  function ne() {
    r.line in i && r.column < 2 && (r.column = i[r.line], r.offset += i[r.line] - 1);
  }
}
function xc(e, t) {
  const n = t.start._index, r = t.start._bufferIndex, i = t.end._index, u = t.end._bufferIndex;
  let l;
  return n === i ? l = [e[n].slice(r, u)] : (l = e.slice(n, i), r > -1 && (l[0] = l[0].slice(r)), u > 0 && l.push(e[i].slice(0, u))), l;
}
function bc(e, t) {
  let n = -1;
  const r = [];
  let i;
  for (; ++n < e.length; ) {
    const u = e[n];
    let l;
    if (typeof u == "string")
      l = u;
    else
      switch (u) {
        case -5: {
          l = "\r";
          break;
        }
        case -4: {
          l = `
`;
          break;
        }
        case -3: {
          l = `\r
`;
          break;
        }
        case -2: {
          l = t ? " " : "	";
          break;
        }
        case -1: {
          if (!t && i)
            continue;
          l = " ";
          break;
        }
        default:
          l = String.fromCharCode(u);
      }
    i = u === -2, r.push(l);
  }
  return r.join("");
}
const Cc = {
  [42]: fe,
  [43]: fe,
  [45]: fe,
  [48]: fe,
  [49]: fe,
  [50]: fe,
  [51]: fe,
  [52]: fe,
  [53]: fe,
  [54]: fe,
  [55]: fe,
  [56]: fe,
  [57]: fe,
  [62]: Ii
}, Ac = {
  [91]: Es
}, kc = {
  [-2]: un,
  [-1]: un,
  [32]: un
}, wc = {
  [35]: _s,
  [42]: Bt,
  [45]: [zr, Bt],
  [60]: Is,
  [61]: zr,
  [95]: Bt,
  [96]: _r,
  [126]: _r
}, Ec = {
  [38]: Ni,
  [92]: Ti
}, vc = {
  [-5]: ln,
  [-4]: ln,
  [-3]: ln,
  [33]: Zs,
  [38]: Ni,
  [42]: Cn,
  [60]: [is, js],
  [91]: ec,
  [92]: [$s, Ti],
  [93]: Mn,
  [95]: Cn,
  [96]: ms
}, Sc = {
  null: [Cn, gc]
}, Bc = {
  null: [42, 95]
}, $c = {
  null: []
}, Lc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  document: Cc,
  contentInitial: Ac,
  flowInitial: kc,
  flow: wc,
  string: Ec,
  text: vc,
  insideSpan: Sc,
  attentionMarkers: Bc,
  disable: $c
}, Symbol.toStringTag, { value: "Module" }));
function _c(e = {}) {
  const t = Ha(
    [Lc].concat(e.extensions || [])
  ), n = {
    defined: [],
    lazy: {},
    constructs: t,
    content: r(Ga),
    document: r(Ja),
    flow: r(dc),
    string: r(mc),
    text: r(Dc)
  };
  return n;
  function r(i) {
    return u;
    function u(l) {
      return Fc(n, i, l);
    }
  }
}
const Pr = /[\0\t\n\r]/g;
function Oc() {
  let e = 1, t = "", n = !0, r;
  return i;
  function i(u, l, o) {
    const a = [];
    let s, c, d, D, p;
    for (u = t + u.toString(l), d = 0, t = "", n && (u.charCodeAt(0) === 65279 && d++, n = void 0); d < u.length; ) {
      if (Pr.lastIndex = d, s = Pr.exec(u), D = s && s.index !== void 0 ? s.index : u.length, p = u.charCodeAt(D), !s) {
        t = u.slice(d);
        break;
      }
      if (p === 10 && d === D && r)
        a.push(-3), r = void 0;
      else
        switch (r && (a.push(-5), r = void 0), d < D && (a.push(u.slice(d, D)), e += D - d), p) {
          case 0: {
            a.push(65533), e++;
            break;
          }
          case 9: {
            for (c = Math.ceil(e / 4) * 4, a.push(-2); e++ < c; )
              a.push(-1);
            break;
          }
          case 10: {
            a.push(-4), e = 1;
            break;
          }
          default:
            r = !0, e = 1;
        }
      d = D + 1;
    }
    return o && (r && a.push(-5), t && a.push(t), a.push(null)), a;
  }
}
function zc(e) {
  for (; !Mi(e); )
    ;
  return e;
}
function Vi(e, t) {
  const n = Number.parseInt(e, t);
  return n < 9 || n === 11 || n > 13 && n < 32 || n > 126 && n < 160 || n > 55295 && n < 57344 || n > 64975 && n < 65008 || (n & 65535) === 65535 || (n & 65535) === 65534 || n > 1114111 ? "\uFFFD" : String.fromCharCode(n);
}
const Pc = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function Ic(e) {
  return e.replace(Pc, Tc);
}
function Tc(e, t, n) {
  if (t)
    return t;
  if (n.charCodeAt(0) === 35) {
    const i = n.charCodeAt(1), u = i === 120 || i === 88;
    return Vi(n.slice(u ? 2 : 1), u ? 16 : 10);
  }
  return Nn(n) || e;
}
const An = {}.hasOwnProperty, Nc = function(e, t, n) {
  return typeof t != "string" && (n = t, t = void 0), Mc(n)(
    zc(
      _c(n).document().write(Oc()(e, t, !0))
    )
  );
};
function Mc(e = {}) {
  const t = Wi(
    {
      transforms: [],
      canContainEols: [
        "emphasis",
        "fragment",
        "heading",
        "paragraph",
        "strong"
      ],
      enter: {
        autolink: a(Qn),
        autolinkProtocol: $,
        autolinkEmail: $,
        atxHeading: a(Vn),
        blockQuote: a(Eu),
        characterEscape: $,
        characterReference: $,
        codeFenced: a(Un),
        codeFencedFenceInfo: s,
        codeFencedFenceMeta: s,
        codeIndented: a(Un, s),
        codeText: a(vu, s),
        codeTextData: $,
        data: $,
        codeFlowValue: $,
        definition: a(Su),
        definitionDestinationString: s,
        definitionLabelString: s,
        definitionTitleString: s,
        emphasis: a(Bu),
        hardBreakEscape: a(Wn),
        hardBreakTrailing: a(Wn),
        htmlFlow: a(Yn, s),
        htmlFlowData: $,
        htmlText: a(Yn, s),
        htmlTextData: $,
        image: a($u),
        label: s,
        link: a(Qn),
        listItem: a(Lu),
        listItemValue: x,
        listOrdered: a(Kn, g),
        listUnordered: a(Kn),
        paragraph: a(_u),
        reference: Z,
        referenceString: s,
        resourceDestinationString: s,
        resourceTitleString: s,
        setextHeading: a(Vn),
        strong: a(Ou),
        thematicBreak: a(Pu)
      },
      exit: {
        atxHeading: d(),
        atxHeadingSequence: N,
        autolink: d(),
        autolinkEmail: Yt,
        autolinkProtocol: Qe,
        blockQuote: d(),
        characterEscapeValue: T,
        characterReferenceMarkerHexadecimal: _e,
        characterReferenceMarkerNumeric: _e,
        characterReferenceValue: Ye,
        codeFenced: d(w),
        codeFencedFence: B,
        codeFencedFenceInfo: k,
        codeFencedFenceMeta: y,
        codeFlowValue: T,
        codeIndented: d(L),
        codeText: d(re),
        codeTextData: T,
        data: T,
        definition: d(),
        definitionDestinationString: _,
        definitionLabelString: z,
        definitionTitleString: F,
        emphasis: d(),
        hardBreakEscape: d(pe),
        hardBreakTrailing: d(pe),
        htmlFlow: d(Ce),
        htmlFlowData: T,
        htmlText: d(xe),
        htmlTextData: T,
        image: d(G),
        label: f,
        labelText: h,
        lineEnding: oe,
        link: d(ce),
        listItem: d(),
        listOrdered: d(),
        listUnordered: d(),
        paragraph: d(),
        referenceString: Ae,
        resourceDestinationString: Ve,
        resourceTitleString: at,
        resource: We,
        setextHeading: d(v),
        setextHeadingLineSequence: ne,
        setextHeadingText: M,
        strong: d(),
        thematicBreak: d()
      }
    },
    e.mdastExtensions || []
  ), n = {};
  return r;
  function r(m) {
    let C = {
      type: "root",
      children: []
    };
    const P = [C], R = [], ge = [], st = {
      stack: P,
      tokenStack: R,
      config: t,
      enter: c,
      exit: D,
      buffer: s,
      resume: p,
      setData: u,
      getData: l
    };
    let H = -1;
    for (; ++H < m.length; )
      if (m[H][1].type === "listOrdered" || m[H][1].type === "listUnordered")
        if (m[H][0] === "enter")
          ge.push(H);
        else {
          const le = ge.pop();
          H = i(m, le, H);
        }
    for (H = -1; ++H < m.length; ) {
      const le = t[m[H][0]];
      An.call(le, m[H][1].type) && le[m[H][1].type].call(
        Object.assign(
          {
            sliceSerialize: m[H][2].sliceSerialize
          },
          st
        ),
        m[H][1]
      );
    }
    if (R.length > 0) {
      const le = R[R.length - 1];
      (le[1] || Ir).call(st, void 0, le[0]);
    }
    for (C.position = {
      start: o(
        m.length > 0 ? m[0][1].start : {
          line: 1,
          column: 1,
          offset: 0
        }
      ),
      end: o(
        m.length > 0 ? m[m.length - 2][1].end : {
          line: 1,
          column: 1,
          offset: 0
        }
      )
    }, H = -1; ++H < t.transforms.length; )
      C = t.transforms[H](C) || C;
    return C;
  }
  function i(m, C, P) {
    let R = C - 1, ge = -1, st = !1, H, le, Ke, ct;
    for (; ++R <= P; ) {
      const V = m[R];
      if (V[1].type === "listUnordered" || V[1].type === "listOrdered" || V[1].type === "blockQuote" ? (V[0] === "enter" ? ge++ : ge--, ct = void 0) : V[1].type === "lineEndingBlank" ? V[0] === "enter" && (H && !ct && !ge && !Ke && (Ke = R), ct = void 0) : V[1].type === "linePrefix" || V[1].type === "listItemValue" || V[1].type === "listItemMarker" || V[1].type === "listItemPrefix" || V[1].type === "listItemPrefixWhitespace" || (ct = void 0), !ge && V[0] === "enter" && V[1].type === "listItemPrefix" || ge === -1 && V[0] === "exit" && (V[1].type === "listUnordered" || V[1].type === "listOrdered")) {
        if (H) {
          let Qt = R;
          for (le = void 0; Qt--; ) {
            const Oe = m[Qt];
            if (Oe[1].type === "lineEnding" || Oe[1].type === "lineEndingBlank") {
              if (Oe[0] === "exit")
                continue;
              le && (m[le][1].type = "lineEndingBlank", st = !0), Oe[1].type = "lineEnding", le = Qt;
            } else if (!(Oe[1].type === "linePrefix" || Oe[1].type === "blockQuotePrefix" || Oe[1].type === "blockQuotePrefixWhitespace" || Oe[1].type === "blockQuoteMarker" || Oe[1].type === "listItemIndent"))
              break;
          }
          Ke && (!le || Ke < le) && (H._spread = !0), H.end = Object.assign(
            {},
            le ? m[le][1].start : V[1].end
          ), m.splice(le || R, 0, ["exit", H, V[2]]), R++, P++;
        }
        V[1].type === "listItemPrefix" && (H = {
          type: "listItem",
          _spread: !1,
          start: Object.assign({}, V[1].start)
        }, m.splice(R, 0, ["enter", H, V[2]]), R++, P++, Ke = void 0, ct = !0);
      }
    }
    return m[C][1]._spread = st, P;
  }
  function u(m, C) {
    n[m] = C;
  }
  function l(m) {
    return n[m];
  }
  function o(m) {
    return {
      line: m.line,
      column: m.column,
      offset: m.offset
    };
  }
  function a(m, C) {
    return P;
    function P(R) {
      c.call(this, m(R), R), C && C.call(this, R);
    }
  }
  function s() {
    this.stack.push({
      type: "fragment",
      children: []
    });
  }
  function c(m, C, P) {
    return this.stack[this.stack.length - 1].children.push(m), this.stack.push(m), this.tokenStack.push([C, P]), m.position = {
      start: o(C.start)
    }, m;
  }
  function d(m) {
    return C;
    function C(P) {
      m && m.call(this, P), D.call(this, P);
    }
  }
  function D(m, C) {
    const P = this.stack.pop(), R = this.tokenStack.pop();
    if (R)
      R[0].type !== m.type && (C ? C.call(this, m, R[0]) : (R[1] || Ir).call(this, m, R[0]));
    else
      throw new Error(
        "Cannot close `" + m.type + "` (" + gt({
          start: m.start,
          end: m.end
        }) + "): it\u2019s not open"
      );
    return P.position.end = o(m.end), P;
  }
  function p() {
    return qa(this.stack.pop());
  }
  function g() {
    u("expectingFirstListItemValue", !0);
  }
  function x(m) {
    if (l("expectingFirstListItemValue")) {
      const C = this.stack[this.stack.length - 2];
      C.start = Number.parseInt(this.sliceSerialize(m), 10), u("expectingFirstListItemValue");
    }
  }
  function k() {
    const m = this.resume(), C = this.stack[this.stack.length - 1];
    C.lang = m;
  }
  function y() {
    const m = this.resume(), C = this.stack[this.stack.length - 1];
    C.meta = m;
  }
  function B() {
    l("flowCodeInside") || (this.buffer(), u("flowCodeInside", !0));
  }
  function w() {
    const m = this.resume(), C = this.stack[this.stack.length - 1];
    C.value = m.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, ""), u("flowCodeInside");
  }
  function L() {
    const m = this.resume(), C = this.stack[this.stack.length - 1];
    C.value = m.replace(/(\r?\n|\r)$/g, "");
  }
  function z(m) {
    const C = this.resume(), P = this.stack[this.stack.length - 1];
    P.label = C, P.identifier = Je(
      this.sliceSerialize(m)
    ).toLowerCase();
  }
  function F() {
    const m = this.resume(), C = this.stack[this.stack.length - 1];
    C.title = m;
  }
  function _() {
    const m = this.resume(), C = this.stack[this.stack.length - 1];
    C.url = m;
  }
  function N(m) {
    const C = this.stack[this.stack.length - 1];
    if (!C.depth) {
      const P = this.sliceSerialize(m).length;
      C.depth = P;
    }
  }
  function M() {
    u("setextHeadingSlurpLineEnding", !0);
  }
  function ne(m) {
    const C = this.stack[this.stack.length - 1];
    C.depth = this.sliceSerialize(m).charCodeAt(0) === 61 ? 1 : 2;
  }
  function v() {
    u("setextHeadingSlurpLineEnding");
  }
  function $(m) {
    const C = this.stack[this.stack.length - 1];
    let P = C.children[C.children.length - 1];
    (!P || P.type !== "text") && (P = zu(), P.position = {
      start: o(m.start)
    }, C.children.push(P)), this.stack.push(P);
  }
  function T(m) {
    const C = this.stack.pop();
    C.value += this.sliceSerialize(m), C.position.end = o(m.end);
  }
  function oe(m) {
    const C = this.stack[this.stack.length - 1];
    if (l("atHardBreak")) {
      const P = C.children[C.children.length - 1];
      P.position.end = o(m.end), u("atHardBreak");
      return;
    }
    !l("setextHeadingSlurpLineEnding") && t.canContainEols.includes(C.type) && ($.call(this, m), T.call(this, m));
  }
  function pe() {
    u("atHardBreak", !0);
  }
  function Ce() {
    const m = this.resume(), C = this.stack[this.stack.length - 1];
    C.value = m;
  }
  function xe() {
    const m = this.resume(), C = this.stack[this.stack.length - 1];
    C.value = m;
  }
  function re() {
    const m = this.resume(), C = this.stack[this.stack.length - 1];
    C.value = m;
  }
  function ce() {
    const m = this.stack[this.stack.length - 1];
    l("inReference") ? (m.type += "Reference", m.referenceType = l("referenceType") || "shortcut", delete m.url, delete m.title) : (delete m.identifier, delete m.label), u("referenceType");
  }
  function G() {
    const m = this.stack[this.stack.length - 1];
    l("inReference") ? (m.type += "Reference", m.referenceType = l("referenceType") || "shortcut", delete m.url, delete m.title) : (delete m.identifier, delete m.label), u("referenceType");
  }
  function h(m) {
    const C = this.stack[this.stack.length - 2], P = this.sliceSerialize(m);
    C.label = Ic(P), C.identifier = Je(P).toLowerCase();
  }
  function f() {
    const m = this.stack[this.stack.length - 1], C = this.resume(), P = this.stack[this.stack.length - 1];
    u("inReference", !0), P.type === "link" ? P.children = m.children : P.alt = C;
  }
  function Ve() {
    const m = this.resume(), C = this.stack[this.stack.length - 1];
    C.url = m;
  }
  function at() {
    const m = this.resume(), C = this.stack[this.stack.length - 1];
    C.title = m;
  }
  function We() {
    u("inReference");
  }
  function Z() {
    u("referenceType", "collapsed");
  }
  function Ae(m) {
    const C = this.resume(), P = this.stack[this.stack.length - 1];
    P.label = C, P.identifier = Je(
      this.sliceSerialize(m)
    ).toLowerCase(), u("referenceType", "full");
  }
  function _e(m) {
    u("characterReferenceType", m.type);
  }
  function Ye(m) {
    const C = this.sliceSerialize(m), P = l("characterReferenceType");
    let R;
    P ? (R = Vi(
      C,
      P === "characterReferenceMarkerNumeric" ? 10 : 16
    ), u("characterReferenceType")) : R = Nn(C);
    const ge = this.stack.pop();
    ge.value += R, ge.position.end = o(m.end);
  }
  function Qe(m) {
    T.call(this, m);
    const C = this.stack[this.stack.length - 1];
    C.url = this.sliceSerialize(m);
  }
  function Yt(m) {
    T.call(this, m);
    const C = this.stack[this.stack.length - 1];
    C.url = "mailto:" + this.sliceSerialize(m);
  }
  function Eu() {
    return {
      type: "blockquote",
      children: []
    };
  }
  function Un() {
    return {
      type: "code",
      lang: null,
      meta: null,
      value: ""
    };
  }
  function vu() {
    return {
      type: "inlineCode",
      value: ""
    };
  }
  function Su() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: ""
    };
  }
  function Bu() {
    return {
      type: "emphasis",
      children: []
    };
  }
  function Vn() {
    return {
      type: "heading",
      depth: void 0,
      children: []
    };
  }
  function Wn() {
    return {
      type: "break"
    };
  }
  function Yn() {
    return {
      type: "html",
      value: ""
    };
  }
  function $u() {
    return {
      type: "image",
      title: null,
      url: "",
      alt: null
    };
  }
  function Qn() {
    return {
      type: "link",
      title: null,
      url: "",
      children: []
    };
  }
  function Kn(m) {
    return {
      type: "list",
      ordered: m.type === "listOrdered",
      start: null,
      spread: m._spread,
      children: []
    };
  }
  function Lu(m) {
    return {
      type: "listItem",
      spread: m._spread,
      checked: null,
      children: []
    };
  }
  function _u() {
    return {
      type: "paragraph",
      children: []
    };
  }
  function Ou() {
    return {
      type: "strong",
      children: []
    };
  }
  function zu() {
    return {
      type: "text",
      value: ""
    };
  }
  function Pu() {
    return {
      type: "thematicBreak"
    };
  }
}
function Wi(e, t) {
  let n = -1;
  for (; ++n < t.length; ) {
    const r = t[n];
    Array.isArray(r) ? Wi(e, r) : Rc(e, r);
  }
  return e;
}
function Rc(e, t) {
  let n;
  for (n in t)
    if (An.call(t, n)) {
      const r = n === "canContainEols" || n === "transforms", u = (An.call(e, n) ? e[n] : void 0) || (e[n] = r ? [] : {}), l = t[n];
      l && (r ? e[n] = [...u, ...l] : Object.assign(u, l));
    }
}
function Ir(e, t) {
  throw e ? new Error(
    "Cannot close `" + e.type + "` (" + gt({
      start: e.start,
      end: e.end
    }) + "): a different token (`" + t.type + "`, " + gt({
      start: t.start,
      end: t.end
    }) + ") is open"
  ) : new Error(
    "Cannot close document, a token (`" + t.type + "`, " + gt({
      start: t.start,
      end: t.end
    }) + ") is still open"
  );
}
function jc(e) {
  Object.assign(this, { Parser: (n) => {
    const r = this.data("settings");
    return Nc(
      n,
      Object.assign({}, r, e, {
        extensions: this.data("micromarkExtensions") || [],
        mdastExtensions: this.data("fromMarkdownExtensions") || []
      })
    );
  } });
}
var ee = function(e, t, n) {
  var r = { type: String(e) };
  return n == null && (typeof t == "string" || Array.isArray(t)) ? n = t : Object.assign(r, t), Array.isArray(n) ? r.children = n : n != null && (r.value = String(n)), r;
};
const $t = {}.hasOwnProperty;
function qc(e, t) {
  const n = t.data || {};
  return "value" in t && !($t.call(n, "hName") || $t.call(n, "hProperties") || $t.call(n, "hChildren")) ? e.augment(t, ee("text", t.value)) : e(t, "div", se(e, t));
}
function Yi(e, t, n) {
  const r = t && t.type;
  let i;
  if (!r)
    throw new Error("Expected node, got `" + t + "`");
  return $t.call(e.handlers, r) ? i = e.handlers[r] : e.passThrough && e.passThrough.includes(r) ? i = Hc : i = e.unknownHandler, (typeof i == "function" ? i : qc)(e, t, n);
}
function Hc(e, t) {
  return "children" in t ? { ...t, children: se(e, t) } : t;
}
function se(e, t) {
  const n = [];
  if ("children" in t) {
    const r = t.children;
    let i = -1;
    for (; ++i < r.length; ) {
      const u = Yi(e, r[i], t);
      if (u) {
        if (i && r[i - 1].type === "break" && (!Array.isArray(u) && u.type === "text" && (u.value = u.value.replace(/^\s+/, "")), !Array.isArray(u) && u.type === "element")) {
          const l = u.children[0];
          l && l.type === "text" && (l.value = l.value.replace(/^\s+/, ""));
        }
        Array.isArray(u) ? n.push(...u) : n.push(u);
      }
    }
  }
  return n;
}
const Vt = function(e) {
  if (e == null)
    return Yc;
  if (typeof e == "string")
    return Wc(e);
  if (typeof e == "object")
    return Array.isArray(e) ? Uc(e) : Vc(e);
  if (typeof e == "function")
    return Wt(e);
  throw new Error("Expected function, string, or object as test");
};
function Uc(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = Vt(e[n]);
  return Wt(r);
  function r(...i) {
    let u = -1;
    for (; ++u < t.length; )
      if (t[u].call(this, ...i))
        return !0;
    return !1;
  }
}
function Vc(e) {
  return Wt(t);
  function t(n) {
    let r;
    for (r in e)
      if (n[r] !== e[r])
        return !1;
    return !0;
  }
}
function Wc(e) {
  return Wt(t);
  function t(n) {
    return n && n.type === e;
  }
}
function Wt(e) {
  return t;
  function t(...n) {
    return Boolean(e.call(this, ...n));
  }
}
function Yc() {
  return !0;
}
const Qc = !0, Kc = "skip", Tr = !1, Xc = function(e, t, n, r) {
  typeof t == "function" && typeof n != "function" && (r = n, n = t, t = null);
  const i = Vt(t), u = r ? -1 : 1;
  l(e, null, [])();
  function l(o, a, s) {
    const c = typeof o == "object" && o !== null ? o : {};
    let d;
    return typeof c.type == "string" && (d = typeof c.tagName == "string" ? c.tagName : typeof c.name == "string" ? c.name : void 0, Object.defineProperty(D, "name", {
      value: "node (" + (c.type + (d ? "<" + d + ">" : "")) + ")"
    })), D;
    function D() {
      let p = [], g, x, k;
      if ((!t || i(o, a, s[s.length - 1] || null)) && (p = Gc(n(o, s)), p[0] === Tr))
        return p;
      if (o.children && p[0] !== Kc)
        for (x = (r ? o.children.length : -1) + u, k = s.concat(o); x > -1 && x < o.children.length; ) {
          if (g = l(o.children[x], x, k)(), g[0] === Tr)
            return g;
          x = typeof g[1] == "number" ? g[1] : x + u;
        }
      return p;
    }
  }
};
function Gc(e) {
  return Array.isArray(e) ? e : typeof e == "number" ? [Qc, e] : [e];
}
const Rn = function(e, t, n, r) {
  typeof t == "function" && typeof n != "function" && (r = n, n = t, t = null), Xc(e, t, i, r);
  function i(u, l) {
    const o = l[l.length - 1];
    return n(
      u,
      o ? o.children.indexOf(u) : null,
      o
    );
  }
}, Qi = Xi("start"), Ki = Xi("end");
function Xi(e) {
  return t;
  function t(n) {
    const r = n && n.position && n.position[e] || {};
    return {
      line: r.line || null,
      column: r.column || null,
      offset: r.offset > -1 ? r.offset : null
    };
  }
}
function Zc(e) {
  return !e || !e.position || !e.position.start || !e.position.start.line || !e.position.start.column || !e.position.end || !e.position.end.line || !e.position.end.column;
}
const Nr = {}.hasOwnProperty;
function Jc(e) {
  const t = /* @__PURE__ */ Object.create(null);
  if (!e || !e.type)
    throw new Error("mdast-util-definitions expected node");
  return Rn(e, "definition", (r) => {
    const i = Mr(r.identifier);
    i && !Nr.call(t, i) && (t[i] = r);
  }), n;
  function n(r) {
    const i = Mr(r);
    return i && Nr.call(t, i) ? t[i] : null;
  }
}
function Mr(e) {
  return String(e || "").toUpperCase();
}
function lt(e) {
  const t = [];
  let n = -1, r = 0, i = 0;
  for (; ++n < e.length; ) {
    const u = e.charCodeAt(n);
    let l = "";
    if (u === 37 && de(e.charCodeAt(n + 1)) && de(e.charCodeAt(n + 2)))
      i = 2;
    else if (u < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(u)) || (l = String.fromCharCode(u));
    else if (u > 55295 && u < 57344) {
      const o = e.charCodeAt(n + 1);
      u < 56320 && o > 56319 && o < 57344 ? (l = String.fromCharCode(u, o), i = 1) : l = "\uFFFD";
    } else
      l = String.fromCharCode(u);
    l && (t.push(e.slice(r, n), encodeURIComponent(l)), r = n + i + 1, l = ""), i && (n += i, i = 0);
  }
  return t.join("") + e.slice(r);
}
function Pe(e, t) {
  const n = [];
  let r = -1;
  for (t && n.push(ee("text", `
`)); ++r < e.length; )
    r && n.push(ee("text", `
`)), n.push(e[r]);
  return t && e.length > 0 && n.push(ee("text", `
`)), n;
}
function ef(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.footnoteOrder.length; ) {
    const r = e.footnoteById[e.footnoteOrder[t].toUpperCase()];
    if (!r)
      continue;
    const i = se(e, r), u = String(r.identifier), l = lt(u.toLowerCase());
    let o = 0;
    const a = [];
    for (; ++o <= e.footnoteCounts[u]; ) {
      const d = {
        type: "element",
        tagName: "a",
        properties: {
          href: "#" + e.clobberPrefix + "fnref-" + l + (o > 1 ? "-" + o : ""),
          dataFootnoteBackref: !0,
          className: ["data-footnote-backref"],
          ariaLabel: e.footnoteBackLabel
        },
        children: [{ type: "text", value: "\u21A9" }]
      };
      o > 1 && d.children.push({
        type: "element",
        tagName: "sup",
        children: [{ type: "text", value: String(o) }]
      }), a.length > 0 && a.push({ type: "text", value: " " }), a.push(d);
    }
    const s = i[i.length - 1];
    if (s && s.type === "element" && s.tagName === "p") {
      const d = s.children[s.children.length - 1];
      d && d.type === "text" ? d.value += " " : s.children.push({ type: "text", value: " " }), s.children.push(...a);
    } else
      i.push(...a);
    const c = {
      type: "element",
      tagName: "li",
      properties: { id: e.clobberPrefix + "fn-" + l },
      children: Pe(i, !0)
    };
    r.position && (c.position = r.position), n.push(c);
  }
  return n.length === 0 ? null : {
    type: "element",
    tagName: "section",
    properties: { dataFootnotes: !0, className: ["footnotes"] },
    children: [
      {
        type: "element",
        tagName: e.footnoteLabelTagName,
        properties: {
          ...JSON.parse(JSON.stringify(e.footnoteLabelProperties)),
          id: "footnote-label"
        },
        children: [ee("text", e.footnoteLabel)]
      },
      { type: "text", value: `
` },
      {
        type: "element",
        tagName: "ol",
        properties: {},
        children: Pe(n, !0)
      },
      { type: "text", value: `
` }
    ]
  };
}
function tf(e, t) {
  return e(t, "blockquote", Pe(se(e, t), !0));
}
function nf(e, t) {
  return [e(t, "br"), ee("text", `
`)];
}
function rf(e, t) {
  const n = t.value ? t.value + `
` : "", r = t.lang && t.lang.match(/^[^ \t]+(?=[ \t]|$)/), i = {};
  r && (i.className = ["language-" + r]);
  const u = e(t, "code", i, [ee("text", n)]);
  return t.meta && (u.data = { meta: t.meta }), e(t.position, "pre", [u]);
}
function uf(e, t) {
  return e(t, "del", se(e, t));
}
function lf(e, t) {
  return e(t, "em", se(e, t));
}
function Gi(e, t) {
  const n = String(t.identifier), r = lt(n.toLowerCase()), i = e.footnoteOrder.indexOf(n);
  let u;
  i === -1 ? (e.footnoteOrder.push(n), e.footnoteCounts[n] = 1, u = e.footnoteOrder.length) : (e.footnoteCounts[n]++, u = i + 1);
  const l = e.footnoteCounts[n];
  return e(t, "sup", [
    e(
      t.position,
      "a",
      {
        href: "#" + e.clobberPrefix + "fn-" + r,
        id: e.clobberPrefix + "fnref-" + r + (l > 1 ? "-" + l : ""),
        dataFootnoteRef: !0,
        ariaDescribedBy: "footnote-label"
      },
      [ee("text", String(u))]
    )
  ]);
}
function of(e, t) {
  const n = e.footnoteById;
  let r = 1;
  for (; r in n; )
    r++;
  const i = String(r);
  return n[i] = {
    type: "footnoteDefinition",
    identifier: i,
    children: [{ type: "paragraph", children: t.children }],
    position: t.position
  }, Gi(e, {
    type: "footnoteReference",
    identifier: i,
    position: t.position
  });
}
function af(e, t) {
  return e(t, "h" + t.depth, se(e, t));
}
function sf(e, t) {
  return e.dangerous ? e.augment(t, ee("raw", t.value)) : null;
}
function Zi(e, t) {
  const n = t.referenceType;
  let r = "]";
  if (n === "collapsed" ? r += "[]" : n === "full" && (r += "[" + (t.label || t.identifier) + "]"), t.type === "imageReference")
    return ee("text", "![" + t.alt + r);
  const i = se(e, t), u = i[0];
  u && u.type === "text" ? u.value = "[" + u.value : i.unshift(ee("text", "["));
  const l = i[i.length - 1];
  return l && l.type === "text" ? l.value += r : i.push(ee("text", r)), i;
}
function cf(e, t) {
  const n = e.definition(t.identifier);
  if (!n)
    return Zi(e, t);
  const r = { src: lt(n.url || ""), alt: t.alt };
  return n.title !== null && n.title !== void 0 && (r.title = n.title), e(t, "img", r);
}
function ff(e, t) {
  const n = { src: lt(t.url), alt: t.alt };
  return t.title !== null && t.title !== void 0 && (n.title = t.title), e(t, "img", n);
}
function hf(e, t) {
  return e(t, "code", [ee("text", t.value.replace(/\r?\n|\r/g, " "))]);
}
function df(e, t) {
  const n = e.definition(t.identifier);
  if (!n)
    return Zi(e, t);
  const r = { href: lt(n.url || "") };
  return n.title !== null && n.title !== void 0 && (r.title = n.title), e(t, "a", r, se(e, t));
}
function pf(e, t) {
  const n = { href: lt(t.url) };
  return t.title !== null && t.title !== void 0 && (n.title = t.title), e(t, "a", n, se(e, t));
}
function gf(e, t, n) {
  const r = se(e, t), i = n ? mf(n) : Ji(t), u = {}, l = [];
  if (typeof t.checked == "boolean") {
    let s;
    r[0] && r[0].type === "element" && r[0].tagName === "p" ? s = r[0] : (s = e(null, "p", []), r.unshift(s)), s.children.length > 0 && s.children.unshift(ee("text", " ")), s.children.unshift(
      e(null, "input", {
        type: "checkbox",
        checked: t.checked,
        disabled: !0
      })
    ), u.className = ["task-list-item"];
  }
  let o = -1;
  for (; ++o < r.length; ) {
    const s = r[o];
    (i || o !== 0 || s.type !== "element" || s.tagName !== "p") && l.push(ee("text", `
`)), s.type === "element" && s.tagName === "p" && !i ? l.push(...s.children) : l.push(s);
  }
  const a = r[r.length - 1];
  return a && (i || !("tagName" in a) || a.tagName !== "p") && l.push(ee("text", `
`)), e(t, "li", u, l);
}
function mf(e) {
  let t = e.spread;
  const n = e.children;
  let r = -1;
  for (; !t && ++r < n.length; )
    t = Ji(n[r]);
  return Boolean(t);
}
function Ji(e) {
  const t = e.spread;
  return t == null ? e.children.length > 1 : t;
}
function Df(e, t) {
  const n = {}, r = t.ordered ? "ol" : "ul", i = se(e, t);
  let u = -1;
  for (typeof t.start == "number" && t.start !== 1 && (n.start = t.start); ++u < i.length; ) {
    const l = i[u];
    if (l.type === "element" && l.tagName === "li" && l.properties && Array.isArray(l.properties.className) && l.properties.className.includes("task-list-item")) {
      n.className = ["contains-task-list"];
      break;
    }
  }
  return e(t, r, n, Pe(i, !0));
}
function yf(e, t) {
  return e(t, "p", se(e, t));
}
function Ff(e, t) {
  return e.augment(t, ee("root", Pe(se(e, t))));
}
function xf(e, t) {
  return e(t, "strong", se(e, t));
}
function bf(e, t) {
  const n = t.children;
  let r = -1;
  const i = t.align || [], u = [];
  for (; ++r < n.length; ) {
    const l = n[r].children, o = r === 0 ? "th" : "td", a = [];
    let s = -1;
    const c = t.align ? i.length : l.length;
    for (; ++s < c; ) {
      const d = l[s];
      a.push(
        e(d, o, { align: i[s] }, d ? se(e, d) : [])
      );
    }
    u[r] = e(n[r], "tr", Pe(a, !0));
  }
  return e(
    t,
    "table",
    Pe(
      [e(u[0].position, "thead", Pe([u[0]], !0))].concat(
        u[1] ? e(
          {
            start: Qi(u[1]),
            end: Ki(u[u.length - 1])
          },
          "tbody",
          Pe(u.slice(1), !0)
        ) : []
      ),
      !0
    )
  );
}
const Rr = 9, jr = 32;
function Cf(e) {
  const t = String(e), n = /\r?\n|\r/g;
  let r = n.exec(t), i = 0;
  const u = [];
  for (; r; )
    u.push(
      qr(t.slice(i, r.index), i > 0, !0),
      r[0]
    ), i = r.index + r[0].length, r = n.exec(t);
  return u.push(qr(t.slice(i), i > 0, !1)), u.join("");
}
function qr(e, t, n) {
  let r = 0, i = e.length;
  if (t) {
    let u = e.codePointAt(r);
    for (; u === Rr || u === jr; )
      r++, u = e.codePointAt(r);
  }
  if (n) {
    let u = e.codePointAt(i - 1);
    for (; u === Rr || u === jr; )
      i--, u = e.codePointAt(i - 1);
  }
  return i > r ? e.slice(r, i) : "";
}
function Af(e, t) {
  return e.augment(t, ee("text", Cf(String(t.value))));
}
function kf(e, t) {
  return e(t, "hr");
}
const wf = {
  blockquote: tf,
  break: nf,
  code: rf,
  delete: uf,
  emphasis: lf,
  footnoteReference: Gi,
  footnote: of,
  heading: af,
  html: sf,
  imageReference: cf,
  image: ff,
  inlineCode: hf,
  linkReference: df,
  link: pf,
  listItem: gf,
  list: Df,
  paragraph: yf,
  root: Ff,
  strong: xf,
  table: bf,
  text: Af,
  thematicBreak: kf,
  toml: wt,
  yaml: wt,
  definition: wt,
  footnoteDefinition: wt
};
function wt() {
  return null;
}
const Ef = {}.hasOwnProperty;
function vf(e, t) {
  const n = t || {}, r = n.allowDangerousHtml || !1, i = {};
  return l.dangerous = r, l.clobberPrefix = n.clobberPrefix === void 0 || n.clobberPrefix === null ? "user-content-" : n.clobberPrefix, l.footnoteLabel = n.footnoteLabel || "Footnotes", l.footnoteLabelTagName = n.footnoteLabelTagName || "h2", l.footnoteLabelProperties = n.footnoteLabelProperties || {
    className: ["sr-only"]
  }, l.footnoteBackLabel = n.footnoteBackLabel || "Back to content", l.definition = Jc(e), l.footnoteById = i, l.footnoteOrder = [], l.footnoteCounts = {}, l.augment = u, l.handlers = { ...wf, ...n.handlers }, l.unknownHandler = n.unknownHandler, l.passThrough = n.passThrough, Rn(e, "footnoteDefinition", (o) => {
    const a = String(o.identifier).toUpperCase();
    Ef.call(i, a) || (i[a] = o);
  }), l;
  function u(o, a) {
    if (o && "data" in o && o.data) {
      const s = o.data;
      s.hName && (a.type !== "element" && (a = {
        type: "element",
        tagName: "",
        properties: {},
        children: []
      }), a.tagName = s.hName), a.type === "element" && s.hProperties && (a.properties = { ...a.properties, ...s.hProperties }), "children" in a && a.children && s.hChildren && (a.children = s.hChildren);
    }
    if (o) {
      const s = "type" in o ? o : { position: o };
      Zc(s) || (a.position = { start: Qi(s), end: Ki(s) });
    }
    return a;
  }
  function l(o, a, s, c) {
    return Array.isArray(s) && (c = s, s = {}), u(o, {
      type: "element",
      tagName: a,
      properties: s || {},
      children: c || []
    });
  }
}
function eu(e, t) {
  const n = vf(e, t), r = Yi(n, e, null), i = ef(n);
  return i && r.children.push(ee("text", `
`), i), Array.isArray(r) ? { type: "root", children: r } : r;
}
const Sf = function(e, t) {
  return e && "run" in e ? $f(e, t) : Lf(e || t);
}, Bf = Sf;
function $f(e, t) {
  return (n, r, i) => {
    e.run(eu(n, t), r, (u) => {
      i(u);
    });
  };
}
function Lf(e) {
  return (t) => eu(t, e);
}
const tu = {
  strip: ["script"],
  clobberPrefix: "user-content-",
  clobber: ["name", "id"],
  ancestors: {
    tbody: ["table"],
    tfoot: ["table"],
    thead: ["table"],
    td: ["table"],
    th: ["table"],
    tr: ["table"]
  },
  protocols: {
    href: ["http", "https", "mailto", "xmpp", "irc", "ircs"],
    cite: ["http", "https"],
    src: ["http", "https"],
    longDesc: ["http", "https"]
  },
  tagNames: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "br",
    "b",
    "i",
    "strong",
    "em",
    "a",
    "pre",
    "code",
    "img",
    "tt",
    "div",
    "ins",
    "del",
    "sup",
    "sub",
    "p",
    "ol",
    "ul",
    "table",
    "thead",
    "tbody",
    "tfoot",
    "blockquote",
    "dl",
    "dt",
    "dd",
    "kbd",
    "q",
    "samp",
    "var",
    "hr",
    "ruby",
    "rt",
    "rp",
    "li",
    "tr",
    "td",
    "th",
    "s",
    "strike",
    "summary",
    "details",
    "caption",
    "figure",
    "figcaption",
    "abbr",
    "bdo",
    "cite",
    "dfn",
    "mark",
    "small",
    "span",
    "time",
    "wbr",
    "input"
  ],
  attributes: {
    a: ["href"],
    img: ["src", "longDesc"],
    input: [
      ["type", "checkbox"],
      ["disabled", !0]
    ],
    li: [["className", "task-list-item"]],
    div: ["itemScope", "itemType"],
    blockquote: ["cite"],
    del: ["cite"],
    ins: ["cite"],
    q: ["cite"],
    "*": [
      "abbr",
      "accept",
      "acceptCharset",
      "accessKey",
      "action",
      "align",
      "alt",
      "ariaDescribedBy",
      "ariaHidden",
      "ariaLabel",
      "ariaLabelledBy",
      "axis",
      "border",
      "cellPadding",
      "cellSpacing",
      "char",
      "charOff",
      "charSet",
      "checked",
      "clear",
      "cols",
      "colSpan",
      "color",
      "compact",
      "coords",
      "dateTime",
      "dir",
      "disabled",
      "encType",
      "htmlFor",
      "frame",
      "headers",
      "height",
      "hrefLang",
      "hSpace",
      "isMap",
      "id",
      "label",
      "lang",
      "maxLength",
      "media",
      "method",
      "multiple",
      "name",
      "noHref",
      "noShade",
      "noWrap",
      "open",
      "prompt",
      "readOnly",
      "rel",
      "rev",
      "rows",
      "rowSpan",
      "rules",
      "scope",
      "selected",
      "shape",
      "size",
      "span",
      "start",
      "summary",
      "tabIndex",
      "target",
      "title",
      "type",
      "useMap",
      "vAlign",
      "value",
      "vSpace",
      "width",
      "itemProp"
    ]
  },
  required: {
    input: {
      type: "checkbox",
      disabled: !0
    }
  }
};
var we = {}.hasOwnProperty, _f = [].push, on = {
  root: { children: Hr },
  doctype: zf,
  comment: Pf,
  element: {
    tagName: ru,
    properties: If,
    children: Hr
  },
  text: { value: Mf },
  "*": { data: Ur, position: Ur }
};
function Of(e, t) {
  var n = { type: "root", children: [] }, r;
  return e && typeof e == "object" && e.type && (r = nu(Object.assign({}, tu, t || {}), e, []), r && (Array.isArray(r) ? r.length === 1 ? n = r[0] : n.children = r : n = r)), n;
}
function nu(e, t, n) {
  var r = t && t.type, i = { type: t.type }, u, l, o, a, s;
  if (we.call(on, r) && (l = on[r], typeof l == "function" && (l = l(e, t)), l)) {
    u = !0, o = Object.assign({}, l, on["*"]);
    for (s in o)
      we.call(o, s) && (a = o[s](e, t[s], t, n), a === !1 ? (u = null, i[s] = t[s]) : a != null && (i[s] = a));
  }
  return u ? i : i.type === "element" && !e.strip.includes(i.tagName) ? i.children : null;
}
function Hr(e, t, n, r) {
  var i = [], u = -1, l;
  if (Array.isArray(t)) {
    for (n.type === "element" && r.push(n.tagName); ++u < t.length; )
      l = nu(e, t[u], r), l && ("length" in l ? _f.apply(i, l) : i.push(l));
    n.type === "element" && r.pop();
  }
  return i;
}
function zf(e) {
  return e.allowDoctypes ? { name: Tf } : null;
}
function Pf(e) {
  return e.allowComments ? { value: Nf } : null;
}
function If(e, t, n, r) {
  var i = ru(e, n.tagName, n, r), u = e.required || {}, l = t || {}, o = Object.assign(
    {},
    Vr(e.attributes["*"]),
    Vr(
      i && we.call(e.attributes, i) ? e.attributes[i] : []
    )
  ), a = {}, s, c, d;
  for (d in l)
    if (we.call(l, d)) {
      if (we.call(o, d))
        s = o[d];
      else if (qf(d) && we.call(o, "data*"))
        s = o["data*"];
      else
        continue;
      c = l[d], c = Array.isArray(c) ? Rf(e, c, d, s) : iu(e, c, d, s), c != null && (a[d] = c);
    }
  if (i && we.call(u, i))
    for (d in u[i])
      we.call(a, d) || (a[d] = u[i][d]);
  return a;
}
function Tf() {
  return "html";
}
function ru(e, t, n, r) {
  var i = typeof t == "string" ? t : "", u = -1;
  if (!i || i === "*" || !e.tagNames.includes(i))
    return !1;
  if (we.call(e.ancestors, i)) {
    for (; ++u < e.ancestors[i].length; )
      if (r.includes(e.ancestors[i][u]))
        return i;
    return !1;
  }
  return i;
}
function Nf(e, t) {
  var n = typeof t == "string" ? t : "", r = n.indexOf("-->");
  return r < 0 ? n : n.slice(0, r);
}
function Mf(e, t) {
  return typeof t == "string" ? t : "";
}
function Ur(e, t) {
  return t;
}
function Rf(e, t, n, r) {
  for (var i = -1, u = [], l; ++i < t.length; )
    l = iu(e, t[i], n, r), l != null && u.push(l);
  return u;
}
function iu(e, t, n, r) {
  if ((typeof t == "boolean" || typeof t == "number" || typeof t == "string") && jf(e, t, n) && (r.length === 0 || r.includes(t)))
    return e.clobber.includes(n) ? e.clobberPrefix + t : t;
}
function jf(e, t, n) {
  var r = String(t), i = r.indexOf(":"), u = r.indexOf("?"), l = r.indexOf("#"), o = r.indexOf("/"), a = we.call(e.protocols, n) ? e.protocols[n].concat() : [], s = -1;
  if (a.length === 0 || i < 0 || o > -1 && i > o || u > -1 && i > u || l > -1 && i > l)
    return !0;
  for (; ++s < a.length; )
    if (i === a[s].length && r.slice(0, a[s].length) === a[s])
      return !0;
  return !1;
}
function Vr(e) {
  for (var t = {}, n = -1, r; ++n < e.length; )
    r = e[n], Array.isArray(r) ? t[r[0]] = r.slice(1) : t[r] = [];
  return t;
}
function qf(e) {
  return e.length > 4 && e.slice(0, 4).toLowerCase() === "data";
}
function Hf(e = tu) {
  return (t) => Of(t, e);
}
class Ct {
  constructor(t, n, r) {
    this.property = t, this.normal = n, r && (this.space = r);
  }
}
Ct.prototype.property = {};
Ct.prototype.normal = {};
Ct.prototype.space = null;
function uu(e, t) {
  const n = {}, r = {};
  let i = -1;
  for (; ++i < e.length; )
    Object.assign(n, e[i].property), Object.assign(r, e[i].normal);
  return new Ct(n, r, t);
}
function kn(e) {
  return e.toLowerCase();
}
class Fe {
  constructor(t, n) {
    this.property = t, this.attribute = n;
  }
}
Fe.prototype.space = null;
Fe.prototype.boolean = !1;
Fe.prototype.booleanish = !1;
Fe.prototype.overloadedBoolean = !1;
Fe.prototype.number = !1;
Fe.prototype.commaSeparated = !1;
Fe.prototype.spaceSeparated = !1;
Fe.prototype.commaOrSpaceSeparated = !1;
Fe.prototype.mustUseProperty = !1;
Fe.prototype.defined = !1;
let Uf = 0;
const I = Ue(), Y = Ue(), lu = Ue(), b = Ue(), U = Ue(), et = Ue(), he = Ue();
function Ue() {
  return 2 ** ++Uf;
}
const wn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  boolean: I,
  booleanish: Y,
  overloadedBoolean: lu,
  number: b,
  spaceSeparated: U,
  commaSeparated: et,
  commaOrSpaceSeparated: he
}, Symbol.toStringTag, { value: "Module" })), an = Object.keys(wn);
class jn extends Fe {
  constructor(t, n, r, i) {
    let u = -1;
    if (super(t, n), Wr(this, "space", i), typeof r == "number")
      for (; ++u < an.length; ) {
        const l = an[u];
        Wr(this, an[u], (r & wn[l]) === wn[l]);
      }
  }
}
jn.prototype.defined = !0;
function Wr(e, t, n) {
  n && (e[t] = n);
}
const Vf = {}.hasOwnProperty;
function ot(e) {
  const t = {}, n = {};
  let r;
  for (r in e.properties)
    if (Vf.call(e.properties, r)) {
      const i = e.properties[r], u = new jn(
        r,
        e.transform(e.attributes || {}, r),
        i,
        e.space
      );
      e.mustUseProperty && e.mustUseProperty.includes(r) && (u.mustUseProperty = !0), t[r] = u, n[kn(r)] = r, n[kn(u.attribute)] = r;
    }
  return new Ct(t, n, e.space);
}
const ou = ot({
  space: "xlink",
  transform(e, t) {
    return "xlink:" + t.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null
  }
}), au = ot({
  space: "xml",
  transform(e, t) {
    return "xml:" + t.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null }
});
function su(e, t) {
  return t in e ? e[t] : t;
}
function cu(e, t) {
  return su(e, t.toLowerCase());
}
const fu = ot({
  space: "xmlns",
  attributes: { xmlnsxlink: "xmlns:xlink" },
  transform: cu,
  properties: { xmlns: null, xmlnsXLink: null }
}), hu = ot({
  transform(e, t) {
    return t === "role" ? t : "aria-" + t.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: Y,
    ariaAutoComplete: null,
    ariaBusy: Y,
    ariaChecked: Y,
    ariaColCount: b,
    ariaColIndex: b,
    ariaColSpan: b,
    ariaControls: U,
    ariaCurrent: null,
    ariaDescribedBy: U,
    ariaDetails: null,
    ariaDisabled: Y,
    ariaDropEffect: U,
    ariaErrorMessage: null,
    ariaExpanded: Y,
    ariaFlowTo: U,
    ariaGrabbed: Y,
    ariaHasPopup: null,
    ariaHidden: Y,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: U,
    ariaLevel: b,
    ariaLive: null,
    ariaModal: Y,
    ariaMultiLine: Y,
    ariaMultiSelectable: Y,
    ariaOrientation: null,
    ariaOwns: U,
    ariaPlaceholder: null,
    ariaPosInSet: b,
    ariaPressed: Y,
    ariaReadOnly: Y,
    ariaRelevant: null,
    ariaRequired: Y,
    ariaRoleDescription: U,
    ariaRowCount: b,
    ariaRowIndex: b,
    ariaRowSpan: b,
    ariaSelected: Y,
    ariaSetSize: b,
    ariaSort: null,
    ariaValueMax: b,
    ariaValueMin: b,
    ariaValueNow: b,
    ariaValueText: null,
    role: null
  }
}), Wf = ot({
  space: "html",
  attributes: {
    acceptcharset: "accept-charset",
    classname: "class",
    htmlfor: "for",
    httpequiv: "http-equiv"
  },
  transform: cu,
  mustUseProperty: ["checked", "multiple", "muted", "selected"],
  properties: {
    abbr: null,
    accept: et,
    acceptCharset: U,
    accessKey: U,
    action: null,
    allow: null,
    allowFullScreen: I,
    allowPaymentRequest: I,
    allowUserMedia: I,
    alt: null,
    as: null,
    async: I,
    autoCapitalize: null,
    autoComplete: U,
    autoFocus: I,
    autoPlay: I,
    capture: I,
    charSet: null,
    checked: I,
    cite: null,
    className: U,
    cols: b,
    colSpan: null,
    content: null,
    contentEditable: Y,
    controls: I,
    controlsList: U,
    coords: b | et,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: I,
    defer: I,
    dir: null,
    dirName: null,
    disabled: I,
    download: lu,
    draggable: Y,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: I,
    formTarget: null,
    headers: U,
    height: b,
    hidden: I,
    high: b,
    href: null,
    hrefLang: null,
    htmlFor: U,
    httpEquiv: U,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: I,
    itemId: null,
    itemProp: U,
    itemRef: U,
    itemScope: I,
    itemType: U,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: I,
    low: b,
    manifest: null,
    max: null,
    maxLength: b,
    media: null,
    method: null,
    min: null,
    minLength: b,
    multiple: I,
    muted: I,
    name: null,
    nonce: null,
    noModule: I,
    noValidate: I,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: I,
    optimum: b,
    pattern: null,
    ping: U,
    placeholder: null,
    playsInline: I,
    poster: null,
    preload: null,
    readOnly: I,
    referrerPolicy: null,
    rel: U,
    required: I,
    reversed: I,
    rows: b,
    rowSpan: b,
    sandbox: U,
    scope: null,
    scoped: I,
    seamless: I,
    selected: I,
    shape: null,
    size: b,
    sizes: null,
    slot: null,
    span: b,
    spellCheck: Y,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: b,
    step: null,
    style: null,
    tabIndex: b,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: I,
    useMap: null,
    value: Y,
    width: b,
    wrap: null,
    align: null,
    aLink: null,
    archive: U,
    axis: null,
    background: null,
    bgColor: null,
    border: b,
    borderColor: null,
    bottomMargin: b,
    cellPadding: null,
    cellSpacing: null,
    char: null,
    charOff: null,
    classId: null,
    clear: null,
    code: null,
    codeBase: null,
    codeType: null,
    color: null,
    compact: I,
    declare: I,
    event: null,
    face: null,
    frame: null,
    frameBorder: null,
    hSpace: b,
    leftMargin: b,
    link: null,
    longDesc: null,
    lowSrc: null,
    marginHeight: b,
    marginWidth: b,
    noResize: I,
    noHref: I,
    noShade: I,
    noWrap: I,
    object: null,
    profile: null,
    prompt: null,
    rev: null,
    rightMargin: b,
    rules: null,
    scheme: null,
    scrolling: Y,
    standby: null,
    summary: null,
    text: null,
    topMargin: b,
    valueType: null,
    version: null,
    vAlign: null,
    vLink: null,
    vSpace: b,
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: I,
    disableRemotePlayback: I,
    prefix: null,
    property: null,
    results: b,
    security: null,
    unselectable: null
  }
}), Yf = ot({
  space: "svg",
  attributes: {
    accentHeight: "accent-height",
    alignmentBaseline: "alignment-baseline",
    arabicForm: "arabic-form",
    baselineShift: "baseline-shift",
    capHeight: "cap-height",
    className: "class",
    clipPath: "clip-path",
    clipRule: "clip-rule",
    colorInterpolation: "color-interpolation",
    colorInterpolationFilters: "color-interpolation-filters",
    colorProfile: "color-profile",
    colorRendering: "color-rendering",
    crossOrigin: "crossorigin",
    dataType: "datatype",
    dominantBaseline: "dominant-baseline",
    enableBackground: "enable-background",
    fillOpacity: "fill-opacity",
    fillRule: "fill-rule",
    floodColor: "flood-color",
    floodOpacity: "flood-opacity",
    fontFamily: "font-family",
    fontSize: "font-size",
    fontSizeAdjust: "font-size-adjust",
    fontStretch: "font-stretch",
    fontStyle: "font-style",
    fontVariant: "font-variant",
    fontWeight: "font-weight",
    glyphName: "glyph-name",
    glyphOrientationHorizontal: "glyph-orientation-horizontal",
    glyphOrientationVertical: "glyph-orientation-vertical",
    hrefLang: "hreflang",
    horizAdvX: "horiz-adv-x",
    horizOriginX: "horiz-origin-x",
    horizOriginY: "horiz-origin-y",
    imageRendering: "image-rendering",
    letterSpacing: "letter-spacing",
    lightingColor: "lighting-color",
    markerEnd: "marker-end",
    markerMid: "marker-mid",
    markerStart: "marker-start",
    navDown: "nav-down",
    navDownLeft: "nav-down-left",
    navDownRight: "nav-down-right",
    navLeft: "nav-left",
    navNext: "nav-next",
    navPrev: "nav-prev",
    navRight: "nav-right",
    navUp: "nav-up",
    navUpLeft: "nav-up-left",
    navUpRight: "nav-up-right",
    onAbort: "onabort",
    onActivate: "onactivate",
    onAfterPrint: "onafterprint",
    onBeforePrint: "onbeforeprint",
    onBegin: "onbegin",
    onCancel: "oncancel",
    onCanPlay: "oncanplay",
    onCanPlayThrough: "oncanplaythrough",
    onChange: "onchange",
    onClick: "onclick",
    onClose: "onclose",
    onCopy: "oncopy",
    onCueChange: "oncuechange",
    onCut: "oncut",
    onDblClick: "ondblclick",
    onDrag: "ondrag",
    onDragEnd: "ondragend",
    onDragEnter: "ondragenter",
    onDragExit: "ondragexit",
    onDragLeave: "ondragleave",
    onDragOver: "ondragover",
    onDragStart: "ondragstart",
    onDrop: "ondrop",
    onDurationChange: "ondurationchange",
    onEmptied: "onemptied",
    onEnd: "onend",
    onEnded: "onended",
    onError: "onerror",
    onFocus: "onfocus",
    onFocusIn: "onfocusin",
    onFocusOut: "onfocusout",
    onHashChange: "onhashchange",
    onInput: "oninput",
    onInvalid: "oninvalid",
    onKeyDown: "onkeydown",
    onKeyPress: "onkeypress",
    onKeyUp: "onkeyup",
    onLoad: "onload",
    onLoadedData: "onloadeddata",
    onLoadedMetadata: "onloadedmetadata",
    onLoadStart: "onloadstart",
    onMessage: "onmessage",
    onMouseDown: "onmousedown",
    onMouseEnter: "onmouseenter",
    onMouseLeave: "onmouseleave",
    onMouseMove: "onmousemove",
    onMouseOut: "onmouseout",
    onMouseOver: "onmouseover",
    onMouseUp: "onmouseup",
    onMouseWheel: "onmousewheel",
    onOffline: "onoffline",
    onOnline: "ononline",
    onPageHide: "onpagehide",
    onPageShow: "onpageshow",
    onPaste: "onpaste",
    onPause: "onpause",
    onPlay: "onplay",
    onPlaying: "onplaying",
    onPopState: "onpopstate",
    onProgress: "onprogress",
    onRateChange: "onratechange",
    onRepeat: "onrepeat",
    onReset: "onreset",
    onResize: "onresize",
    onScroll: "onscroll",
    onSeeked: "onseeked",
    onSeeking: "onseeking",
    onSelect: "onselect",
    onShow: "onshow",
    onStalled: "onstalled",
    onStorage: "onstorage",
    onSubmit: "onsubmit",
    onSuspend: "onsuspend",
    onTimeUpdate: "ontimeupdate",
    onToggle: "ontoggle",
    onUnload: "onunload",
    onVolumeChange: "onvolumechange",
    onWaiting: "onwaiting",
    onZoom: "onzoom",
    overlinePosition: "overline-position",
    overlineThickness: "overline-thickness",
    paintOrder: "paint-order",
    panose1: "panose-1",
    pointerEvents: "pointer-events",
    referrerPolicy: "referrerpolicy",
    renderingIntent: "rendering-intent",
    shapeRendering: "shape-rendering",
    stopColor: "stop-color",
    stopOpacity: "stop-opacity",
    strikethroughPosition: "strikethrough-position",
    strikethroughThickness: "strikethrough-thickness",
    strokeDashArray: "stroke-dasharray",
    strokeDashOffset: "stroke-dashoffset",
    strokeLineCap: "stroke-linecap",
    strokeLineJoin: "stroke-linejoin",
    strokeMiterLimit: "stroke-miterlimit",
    strokeOpacity: "stroke-opacity",
    strokeWidth: "stroke-width",
    tabIndex: "tabindex",
    textAnchor: "text-anchor",
    textDecoration: "text-decoration",
    textRendering: "text-rendering",
    typeOf: "typeof",
    underlinePosition: "underline-position",
    underlineThickness: "underline-thickness",
    unicodeBidi: "unicode-bidi",
    unicodeRange: "unicode-range",
    unitsPerEm: "units-per-em",
    vAlphabetic: "v-alphabetic",
    vHanging: "v-hanging",
    vIdeographic: "v-ideographic",
    vMathematical: "v-mathematical",
    vectorEffect: "vector-effect",
    vertAdvY: "vert-adv-y",
    vertOriginX: "vert-origin-x",
    vertOriginY: "vert-origin-y",
    wordSpacing: "word-spacing",
    writingMode: "writing-mode",
    xHeight: "x-height",
    playbackOrder: "playbackorder",
    timelineBegin: "timelinebegin"
  },
  transform: su,
  properties: {
    about: he,
    accentHeight: b,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: b,
    amplitude: b,
    arabicForm: null,
    ascent: b,
    attributeName: null,
    attributeType: null,
    azimuth: b,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: b,
    by: null,
    calcMode: null,
    capHeight: b,
    className: U,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: b,
    diffuseConstant: b,
    direction: null,
    display: null,
    dur: null,
    divisor: b,
    dominantBaseline: null,
    download: I,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: b,
    enableBackground: null,
    end: null,
    event: null,
    exponent: b,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: b,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: et,
    g2: et,
    glyphName: et,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: b,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: b,
    horizOriginX: b,
    horizOriginY: b,
    id: null,
    ideographic: b,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: b,
    k: b,
    k1: b,
    k2: b,
    k3: b,
    k4: b,
    kernelMatrix: he,
    kernelUnitLength: null,
    keyPoints: null,
    keySplines: null,
    keyTimes: null,
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: b,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: b,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: b,
    overlineThickness: b,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: b,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: U,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: b,
    pointsAtY: b,
    pointsAtZ: b,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: he,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: he,
    rev: he,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: he,
    requiredFeatures: he,
    requiredFonts: he,
    requiredFormats: he,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: b,
    specularExponent: b,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: b,
    strikethroughThickness: b,
    string: null,
    stroke: null,
    strokeDashArray: he,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: b,
    strokeOpacity: b,
    strokeWidth: null,
    style: null,
    surfaceScale: b,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: he,
    tabIndex: b,
    tableValues: null,
    target: null,
    targetX: b,
    targetY: b,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: he,
    to: null,
    transform: null,
    u1: null,
    u2: null,
    underlinePosition: b,
    underlineThickness: b,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: b,
    values: null,
    vAlphabetic: b,
    vMathematical: b,
    vectorEffect: null,
    vHanging: b,
    vIdeographic: b,
    version: null,
    vertAdvY: b,
    vertOriginX: b,
    vertOriginY: b,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: b,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null
  }
}), Qf = /^data[-\w.:]+$/i, Yr = /-[a-z]/g, Kf = /[A-Z]/g;
function Xf(e, t) {
  const n = kn(t);
  let r = t, i = Fe;
  if (n in e.normal)
    return e.property[e.normal[n]];
  if (n.length > 4 && n.slice(0, 4) === "data" && Qf.test(t)) {
    if (t.charAt(4) === "-") {
      const u = t.slice(5).replace(Yr, Zf);
      r = "data" + u.charAt(0).toUpperCase() + u.slice(1);
    } else {
      const u = t.slice(4);
      if (!Yr.test(u)) {
        let l = u.replace(Kf, Gf);
        l.charAt(0) !== "-" && (l = "-" + l), t = "data" + l;
      }
    }
    i = jn;
  }
  return new i(r, t);
}
function Gf(e) {
  return "-" + e.toLowerCase();
}
function Zf(e) {
  return e.charAt(1).toUpperCase();
}
const Jf = uu([au, ou, fu, hu, Wf], "html"), du = uu([au, ou, fu, hu, Yf], "svg"), eh = [
  "area",
  "base",
  "basefont",
  "bgsound",
  "br",
  "col",
  "command",
  "embed",
  "frame",
  "hr",
  "image",
  "img",
  "input",
  "isindex",
  "keygen",
  "link",
  "menuitem",
  "meta",
  "nextid",
  "param",
  "source",
  "track",
  "wbr"
], te = function(e, t, n, r, i) {
  const u = pu(t);
  if (n != null && (typeof n != "number" || n < 0 || n === Number.POSITIVE_INFINITY))
    throw new Error("Expected positive finite index for child node");
  if (r != null && (!r.type || !r.children))
    throw new Error("Expected parent node");
  if (!e || !e.type || typeof e.type != "string")
    return !1;
  if (r == null != (n == null))
    throw new Error("Expected both parent and index");
  return u.call(i, e, n, r);
}, pu = function(e) {
  if (e == null)
    return qn;
  if (typeof e == "string")
    return nh(e);
  if (typeof e == "object")
    return th(e);
  if (typeof e == "function")
    return gu(e);
  throw new Error("Expected function, string, or array as test");
};
function th(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t[n] = pu(e[n]);
  return gu(r);
  function r(...i) {
    let u = -1;
    for (; ++u < t.length; )
      if (t[u].call(this, ...i))
        return !0;
    return !1;
  }
}
function nh(e) {
  return t;
  function t(n) {
    return qn(n) && n.tagName === e;
  }
}
function gu(e) {
  return t;
  function t(n, ...r) {
    return qn(n) && Boolean(e.call(this, n, ...r));
  }
}
function qn(e) {
  return Boolean(
    e && typeof e == "object" && e.type === "element" && typeof e.tagName == "string"
  );
}
const At = Vt("comment");
function mu(e) {
  var t = e && typeof e == "object" && e.type === "text" ? e.value || "" : e;
  return typeof t == "string" && t.replace(/[ \t\n\f\r]/g, "") === "";
}
const X = yu(1), Du = yu(-1);
function yu(e) {
  return t;
  function t(n, r, i) {
    const u = n && n.children;
    let l = r + e, o = u && u[l];
    if (!i)
      for (; o && mu(o); )
        l += e, o = u[l];
    return o;
  }
}
const rh = Vt("text");
function Fu(e) {
  return rh(e) && mu(e.value.charAt(0));
}
const ih = {}.hasOwnProperty;
function xu(e) {
  return t;
  function t(n, r, i) {
    return ih.call(e, n.tagName) && e[n.tagName](n, r, i);
  }
}
const Hn = xu({
  html: uh,
  head: sn,
  body: lh,
  p: oh,
  li: ah,
  dt: sh,
  dd: ch,
  rt: Qr,
  rp: Qr,
  optgroup: fh,
  option: hh,
  menuitem: dh,
  colgroup: sn,
  caption: sn,
  thead: ph,
  tbody: gh,
  tfoot: mh,
  tr: Dh,
  td: Kr,
  th: Kr
});
function sn(e, t, n) {
  const r = X(n, t, !0);
  return !r || !At(r) && !Fu(r);
}
function uh(e, t, n) {
  const r = X(n, t);
  return !r || !At(r);
}
function lh(e, t, n) {
  const r = X(n, t);
  return !r || !At(r);
}
function oh(e, t, n) {
  const r = X(n, t);
  return r ? te(r, [
    "address",
    "article",
    "aside",
    "blockquote",
    "details",
    "div",
    "dl",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "header",
    "hgroup",
    "hr",
    "main",
    "menu",
    "nav",
    "ol",
    "p",
    "pre",
    "section",
    "table",
    "ul"
  ]) : !n || !te(n, [
    "a",
    "audio",
    "del",
    "ins",
    "map",
    "noscript",
    "video"
  ]);
}
function ah(e, t, n) {
  const r = X(n, t);
  return !r || te(r, "li");
}
function sh(e, t, n) {
  const r = X(n, t);
  return r && te(r, ["dt", "dd"]);
}
function ch(e, t, n) {
  const r = X(n, t);
  return !r || te(r, ["dt", "dd"]);
}
function Qr(e, t, n) {
  const r = X(n, t);
  return !r || te(r, ["rp", "rt"]);
}
function fh(e, t, n) {
  const r = X(n, t);
  return !r || te(r, "optgroup");
}
function hh(e, t, n) {
  const r = X(n, t);
  return !r || te(r, ["option", "optgroup"]);
}
function dh(e, t, n) {
  const r = X(n, t);
  return !r || te(r, ["menuitem", "hr", "menu"]);
}
function ph(e, t, n) {
  const r = X(n, t);
  return r && te(r, ["tbody", "tfoot"]);
}
function gh(e, t, n) {
  const r = X(n, t);
  return !r || te(r, ["tbody", "tfoot"]);
}
function mh(e, t, n) {
  return !X(n, t);
}
function Dh(e, t, n) {
  const r = X(n, t);
  return !r || te(r, "tr");
}
function Kr(e, t, n) {
  const r = X(n, t);
  return !r || te(r, ["td", "th"]);
}
const yh = xu({
  html: Fh,
  head: xh,
  body: bh,
  colgroup: Ch,
  tbody: Ah
});
function Fh(e) {
  const t = X(e, -1);
  return !t || !At(t);
}
function xh(e) {
  const t = e.children, n = [];
  let r = -1, i;
  for (; ++r < t.length; )
    if (i = t[r], te(i, ["title", "base"])) {
      if (n.includes(i.tagName))
        return !1;
      n.push(i.tagName);
    }
  return t.length > 0;
}
function bh(e) {
  const t = X(e, -1, !0);
  return !t || !At(t) && !Fu(t) && !te(t, ["meta", "link", "script", "style", "template"]);
}
function Ch(e, t, n) {
  const r = Du(n, t), i = X(e, -1, !0);
  return te(r, "colgroup") && Hn(r, n.children.indexOf(r), n) ? !1 : i && te(i, "col");
}
function Ah(e, t, n) {
  const r = Du(n, t), i = X(e, -1);
  return te(r, ["thead", "tbody"]) && Hn(r, n.children.indexOf(r), n) ? !1 : i && te(i, "tr");
}
const kh = { opening: yh, closing: Hn };
function wh(e) {
  return e.join(" ").trim();
}
function Eh(e, t) {
  const n = t || {};
  return (e[e.length - 1] === "" ? [...e, ""] : e).join(
    (n.padRight ? " " : "") + "," + (n.padLeft === !1 ? "" : " ")
  ).trim();
}
function vh(e, t) {
  if (e = e.replace(
    t.subset ? Sh(t.subset) : /["&'<>`]/g,
    r
  ), t.subset || t.escapeOnly)
    return e;
  return e.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, n).replace(
    /[\x01-\t\v\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,
    r
  );
  function n(i, u, l) {
    return t.format(
      (i.charCodeAt(0) - 55296) * 1024 + i.charCodeAt(1) - 56320 + 65536,
      l.charCodeAt(u + 2),
      t
    );
  }
  function r(i, u, l) {
    return t.format(
      i.charCodeAt(0),
      l.charCodeAt(u + 1),
      t
    );
  }
}
function Sh(e) {
  const t = [];
  let n = -1;
  for (; ++n < e.length; )
    t.push(e[n].replace(/[|\\{}()[\]^$+*?.]/g, "\\$&"));
  return new RegExp("(?:" + t.join("|") + ")", "g");
}
function Bh(e, t, n) {
  const r = "&#x" + e.toString(16).toUpperCase();
  return n && t && !/[\dA-Fa-f]/.test(String.fromCharCode(t)) ? r : r + ";";
}
function $h(e, t, n) {
  const r = "&#" + String(e);
  return n && t && !/\d/.test(String.fromCharCode(t)) ? r : r + ";";
}
const Lh = [
  "AElig",
  "AMP",
  "Aacute",
  "Acirc",
  "Agrave",
  "Aring",
  "Atilde",
  "Auml",
  "COPY",
  "Ccedil",
  "ETH",
  "Eacute",
  "Ecirc",
  "Egrave",
  "Euml",
  "GT",
  "Iacute",
  "Icirc",
  "Igrave",
  "Iuml",
  "LT",
  "Ntilde",
  "Oacute",
  "Ocirc",
  "Ograve",
  "Oslash",
  "Otilde",
  "Ouml",
  "QUOT",
  "REG",
  "THORN",
  "Uacute",
  "Ucirc",
  "Ugrave",
  "Uuml",
  "Yacute",
  "aacute",
  "acirc",
  "acute",
  "aelig",
  "agrave",
  "amp",
  "aring",
  "atilde",
  "auml",
  "brvbar",
  "ccedil",
  "cedil",
  "cent",
  "copy",
  "curren",
  "deg",
  "divide",
  "eacute",
  "ecirc",
  "egrave",
  "eth",
  "euml",
  "frac12",
  "frac14",
  "frac34",
  "gt",
  "iacute",
  "icirc",
  "iexcl",
  "igrave",
  "iquest",
  "iuml",
  "laquo",
  "lt",
  "macr",
  "micro",
  "middot",
  "nbsp",
  "not",
  "ntilde",
  "oacute",
  "ocirc",
  "ograve",
  "ordf",
  "ordm",
  "oslash",
  "otilde",
  "ouml",
  "para",
  "plusmn",
  "pound",
  "quot",
  "raquo",
  "reg",
  "sect",
  "shy",
  "sup1",
  "sup2",
  "sup3",
  "szlig",
  "thorn",
  "times",
  "uacute",
  "ucirc",
  "ugrave",
  "uml",
  "uuml",
  "yacute",
  "yen",
  "yuml"
], cn = {
  nbsp: "\xA0",
  iexcl: "\xA1",
  cent: "\xA2",
  pound: "\xA3",
  curren: "\xA4",
  yen: "\xA5",
  brvbar: "\xA6",
  sect: "\xA7",
  uml: "\xA8",
  copy: "\xA9",
  ordf: "\xAA",
  laquo: "\xAB",
  not: "\xAC",
  shy: "\xAD",
  reg: "\xAE",
  macr: "\xAF",
  deg: "\xB0",
  plusmn: "\xB1",
  sup2: "\xB2",
  sup3: "\xB3",
  acute: "\xB4",
  micro: "\xB5",
  para: "\xB6",
  middot: "\xB7",
  cedil: "\xB8",
  sup1: "\xB9",
  ordm: "\xBA",
  raquo: "\xBB",
  frac14: "\xBC",
  frac12: "\xBD",
  frac34: "\xBE",
  iquest: "\xBF",
  Agrave: "\xC0",
  Aacute: "\xC1",
  Acirc: "\xC2",
  Atilde: "\xC3",
  Auml: "\xC4",
  Aring: "\xC5",
  AElig: "\xC6",
  Ccedil: "\xC7",
  Egrave: "\xC8",
  Eacute: "\xC9",
  Ecirc: "\xCA",
  Euml: "\xCB",
  Igrave: "\xCC",
  Iacute: "\xCD",
  Icirc: "\xCE",
  Iuml: "\xCF",
  ETH: "\xD0",
  Ntilde: "\xD1",
  Ograve: "\xD2",
  Oacute: "\xD3",
  Ocirc: "\xD4",
  Otilde: "\xD5",
  Ouml: "\xD6",
  times: "\xD7",
  Oslash: "\xD8",
  Ugrave: "\xD9",
  Uacute: "\xDA",
  Ucirc: "\xDB",
  Uuml: "\xDC",
  Yacute: "\xDD",
  THORN: "\xDE",
  szlig: "\xDF",
  agrave: "\xE0",
  aacute: "\xE1",
  acirc: "\xE2",
  atilde: "\xE3",
  auml: "\xE4",
  aring: "\xE5",
  aelig: "\xE6",
  ccedil: "\xE7",
  egrave: "\xE8",
  eacute: "\xE9",
  ecirc: "\xEA",
  euml: "\xEB",
  igrave: "\xEC",
  iacute: "\xED",
  icirc: "\xEE",
  iuml: "\xEF",
  eth: "\xF0",
  ntilde: "\xF1",
  ograve: "\xF2",
  oacute: "\xF3",
  ocirc: "\xF4",
  otilde: "\xF5",
  ouml: "\xF6",
  divide: "\xF7",
  oslash: "\xF8",
  ugrave: "\xF9",
  uacute: "\xFA",
  ucirc: "\xFB",
  uuml: "\xFC",
  yacute: "\xFD",
  thorn: "\xFE",
  yuml: "\xFF",
  fnof: "\u0192",
  Alpha: "\u0391",
  Beta: "\u0392",
  Gamma: "\u0393",
  Delta: "\u0394",
  Epsilon: "\u0395",
  Zeta: "\u0396",
  Eta: "\u0397",
  Theta: "\u0398",
  Iota: "\u0399",
  Kappa: "\u039A",
  Lambda: "\u039B",
  Mu: "\u039C",
  Nu: "\u039D",
  Xi: "\u039E",
  Omicron: "\u039F",
  Pi: "\u03A0",
  Rho: "\u03A1",
  Sigma: "\u03A3",
  Tau: "\u03A4",
  Upsilon: "\u03A5",
  Phi: "\u03A6",
  Chi: "\u03A7",
  Psi: "\u03A8",
  Omega: "\u03A9",
  alpha: "\u03B1",
  beta: "\u03B2",
  gamma: "\u03B3",
  delta: "\u03B4",
  epsilon: "\u03B5",
  zeta: "\u03B6",
  eta: "\u03B7",
  theta: "\u03B8",
  iota: "\u03B9",
  kappa: "\u03BA",
  lambda: "\u03BB",
  mu: "\u03BC",
  nu: "\u03BD",
  xi: "\u03BE",
  omicron: "\u03BF",
  pi: "\u03C0",
  rho: "\u03C1",
  sigmaf: "\u03C2",
  sigma: "\u03C3",
  tau: "\u03C4",
  upsilon: "\u03C5",
  phi: "\u03C6",
  chi: "\u03C7",
  psi: "\u03C8",
  omega: "\u03C9",
  thetasym: "\u03D1",
  upsih: "\u03D2",
  piv: "\u03D6",
  bull: "\u2022",
  hellip: "\u2026",
  prime: "\u2032",
  Prime: "\u2033",
  oline: "\u203E",
  frasl: "\u2044",
  weierp: "\u2118",
  image: "\u2111",
  real: "\u211C",
  trade: "\u2122",
  alefsym: "\u2135",
  larr: "\u2190",
  uarr: "\u2191",
  rarr: "\u2192",
  darr: "\u2193",
  harr: "\u2194",
  crarr: "\u21B5",
  lArr: "\u21D0",
  uArr: "\u21D1",
  rArr: "\u21D2",
  dArr: "\u21D3",
  hArr: "\u21D4",
  forall: "\u2200",
  part: "\u2202",
  exist: "\u2203",
  empty: "\u2205",
  nabla: "\u2207",
  isin: "\u2208",
  notin: "\u2209",
  ni: "\u220B",
  prod: "\u220F",
  sum: "\u2211",
  minus: "\u2212",
  lowast: "\u2217",
  radic: "\u221A",
  prop: "\u221D",
  infin: "\u221E",
  ang: "\u2220",
  and: "\u2227",
  or: "\u2228",
  cap: "\u2229",
  cup: "\u222A",
  int: "\u222B",
  there4: "\u2234",
  sim: "\u223C",
  cong: "\u2245",
  asymp: "\u2248",
  ne: "\u2260",
  equiv: "\u2261",
  le: "\u2264",
  ge: "\u2265",
  sub: "\u2282",
  sup: "\u2283",
  nsub: "\u2284",
  sube: "\u2286",
  supe: "\u2287",
  oplus: "\u2295",
  otimes: "\u2297",
  perp: "\u22A5",
  sdot: "\u22C5",
  lceil: "\u2308",
  rceil: "\u2309",
  lfloor: "\u230A",
  rfloor: "\u230B",
  lang: "\u2329",
  rang: "\u232A",
  loz: "\u25CA",
  spades: "\u2660",
  clubs: "\u2663",
  hearts: "\u2665",
  diams: "\u2666",
  quot: '"',
  amp: "&",
  lt: "<",
  gt: ">",
  OElig: "\u0152",
  oelig: "\u0153",
  Scaron: "\u0160",
  scaron: "\u0161",
  Yuml: "\u0178",
  circ: "\u02C6",
  tilde: "\u02DC",
  ensp: "\u2002",
  emsp: "\u2003",
  thinsp: "\u2009",
  zwnj: "\u200C",
  zwj: "\u200D",
  lrm: "\u200E",
  rlm: "\u200F",
  ndash: "\u2013",
  mdash: "\u2014",
  lsquo: "\u2018",
  rsquo: "\u2019",
  sbquo: "\u201A",
  ldquo: "\u201C",
  rdquo: "\u201D",
  bdquo: "\u201E",
  dagger: "\u2020",
  Dagger: "\u2021",
  permil: "\u2030",
  lsaquo: "\u2039",
  rsaquo: "\u203A",
  euro: "\u20AC"
}, _h = [
  "cent",
  "copy",
  "divide",
  "gt",
  "lt",
  "not",
  "para",
  "times"
], bu = {}.hasOwnProperty, En = {};
let Et;
for (Et in cn)
  bu.call(cn, Et) && (En[cn[Et]] = Et);
function Oh(e, t, n, r) {
  const i = String.fromCharCode(e);
  if (bu.call(En, i)) {
    const u = En[i], l = "&" + u;
    return n && Lh.includes(u) && !_h.includes(u) && (!r || t && t !== 61 && /[^\da-z]/i.test(String.fromCharCode(t))) ? l : l + ";";
  }
  return "";
}
function zh(e, t, n) {
  let r = Bh(e, t, n.omitOptionalSemicolons), i;
  if ((n.useNamedReferences || n.useShortestReferences) && (i = Oh(
    e,
    t,
    n.omitOptionalSemicolons,
    n.attribute
  )), (n.useShortestReferences || !i) && n.useShortestReferences) {
    const u = $h(e, t, n.omitOptionalSemicolons);
    u.length < r.length && (r = u);
  }
  return i && (!n.useShortestReferences || i.length < r.length) ? i : r;
}
function tt(e, t) {
  return vh(e, Object.assign({ format: zh }, t));
}
function Xr(e, t) {
  const n = String(e);
  if (typeof t != "string")
    throw new TypeError("Expected character");
  let r = 0, i = n.indexOf(t);
  for (; i !== -1; )
    r++, i = n.indexOf(t, i + t.length);
  return r;
}
const vt = {
  name: [
    [`	
\f\r &/=>`.split(""), `	
\f\r "&'/=>\``.split("")],
    [`\0	
\f\r "&'/<=>`.split(""), `\0	
\f\r "&'/<=>\``.split("")]
  ],
  unquoted: [
    [`	
\f\r &>`.split(""), `\0	
\f\r "&'<=>\``.split("")],
    [`\0	
\f\r "&'<=>\``.split(""), `\0	
\f\r "&'<=>\``.split("")]
  ],
  single: [
    ["&'".split(""), "\"&'`".split("")],
    ["\0&'".split(""), "\0\"&'`".split("")]
  ],
  double: [
    ['"&'.split(""), "\"&'`".split("")],
    ['\0"&'.split(""), "\0\"&'`".split("")]
  ]
};
function Ph(e, t) {
  return e.bogusComments ? "<?" + tt(
    t.value,
    Object.assign({}, e.entities, { subset: [">"] })
  ) + ">" : "<!--" + t.value.replace(/^>|^->|<!--|-->|--!>|<!-$/g, n) + "-->";
  function n(r) {
    return tt(
      r,
      Object.assign({}, e.entities, { subset: ["<", ">"] })
    );
  }
}
function Ih(e) {
  return "<!" + (e.upperDoctype ? "DOCTYPE" : "doctype") + (e.tightDoctype ? "" : " ") + "html>";
}
function Cu(e, t, n, r) {
  return r && r.type === "element" && (r.tagName === "script" || r.tagName === "style") ? t.value : tt(
    t.value,
    Object.assign({}, e.entities, { subset: ["<", "&"] })
  );
}
function Th(e, t, n, r) {
  return e.dangerous ? t.value : Cu(e, t, n, r);
}
const Gr = {
  comment: Ph,
  doctype: Ih,
  element: Mh,
  raw: Th,
  root: ku,
  text: Cu
}, Nh = {}.hasOwnProperty;
function Au(e, t, n, r) {
  if (!t || !t.type)
    throw new Error("Expected node, not `" + t + "`");
  if (!Nh.call(Gr, t.type))
    throw new Error("Cannot compile unknown node `" + t.type + "`");
  return Gr[t.type](e, t, n, r);
}
function ku(e, t) {
  const n = [], r = t && t.children || [];
  let i = -1;
  for (; ++i < r.length; )
    n[i] = Au(e, r[i], i, t);
  return n.join("");
}
function Mh(e, t, n, r) {
  const i = e.schema, u = i.space === "svg" ? void 0 : e.omit;
  let l = i.space === "svg" ? e.closeEmpty : e.voids.includes(t.tagName.toLowerCase());
  const o = [];
  let a;
  i.space === "html" && t.tagName === "svg" && (e.schema = du);
  const s = Rh(e, t.properties), c = ku(
    e,
    i.space === "html" && t.tagName === "template" ? t.content : t
  );
  return e.schema = i, c && (l = !1), (s || !u || !u.opening(t, n, r)) && (o.push("<", t.tagName, s ? " " + s : ""), l && (i.space === "svg" || e.close) && (a = s.charAt(s.length - 1), (!e.tightClose || a === "/" || a && a !== '"' && a !== "'") && o.push(" "), o.push("/")), o.push(">")), o.push(c), !l && (!u || !u.closing(t, n, r)) && o.push("</" + t.tagName + ">"), o.join("");
}
function Rh(e, t) {
  const n = [];
  let r = -1, i, u, l;
  for (i in t)
    t[i] !== void 0 && t[i] !== null && (u = jh(e, i, t[i]), u && n.push(u));
  for (; ++r < n.length; )
    l = e.tight ? n[r].charAt(n[r].length - 1) : null, r !== n.length - 1 && l !== '"' && l !== "'" && (n[r] += " ");
  return n.join("");
}
function jh(e, t, n) {
  const r = Xf(e.schema, t);
  let i = e.quote, u;
  if (r.overloadedBoolean && (n === r.attribute || n === "") ? n = !0 : (r.boolean || r.overloadedBoolean && typeof n != "string") && (n = Boolean(n)), n == null || n === !1 || typeof n == "number" && Number.isNaN(n))
    return "";
  const l = tt(
    r.attribute,
    Object.assign({}, e.entities, {
      subset: vt.name[e.schema.space === "html" ? e.valid : 1][e.safe]
    })
  );
  return n === !0 || (n = typeof n == "object" && "length" in n ? (r.commaSeparated ? Eh : wh)(n, {
    padLeft: !e.tightLists
  }) : String(n), e.collapseEmpty && !n) ? l : (e.unquoted && (u = tt(
    n,
    Object.assign({}, e.entities, {
      subset: vt.unquoted[e.valid][e.safe],
      attribute: !0
    })
  )), u !== n && (e.smart && Xr(n, i) > Xr(n, e.alternative) && (i = e.alternative), u = i + tt(
    n,
    Object.assign({}, e.entities, {
      subset: (i === "'" ? vt.single : vt.double)[e.schema.space === "html" ? e.valid : 1][e.safe],
      attribute: !0
    })
  ) + i), l + (u && "=" + u));
}
function qh(e, t = {}) {
  const n = t.quote || '"', r = n === '"' ? "'" : '"';
  if (n !== '"' && n !== "'")
    throw new Error("Invalid quote `" + n + "`, expected `'` or `\"`");
  const i = {
    valid: t.allowParseErrors ? 0 : 1,
    safe: t.allowDangerousCharacters ? 0 : 1,
    schema: t.space === "svg" ? du : Jf,
    omit: t.omitOptionalTags ? kh : void 0,
    quote: n,
    alternative: r,
    smart: t.quoteSmart,
    unquoted: t.preferUnquoted,
    tight: t.tightAttributes,
    upperDoctype: t.upperDoctype,
    tightDoctype: t.tightDoctype,
    bogusComments: t.bogusComments,
    tightLists: t.tightCommaSeparatedLists,
    tightClose: t.tightSelfClosing,
    collapseEmpty: t.collapseEmptyAttributes,
    dangerous: t.allowDangerousHtml,
    voids: t.voids || eh.concat(),
    entities: t.entities || {},
    close: t.closeSelfClosing,
    closeEmpty: t.closeEmptyElements
  };
  return Au(
    i,
    Array.isArray(e) ? { type: "root", children: e } : e,
    null,
    null
  );
}
function Hh(e) {
  const t = this.data("settings"), n = Object.assign({}, t, e);
  Object.assign(this, { Compiler: r });
  function r(i) {
    return qh(i, n);
  }
}
const Uh = /[\0-\x1F!-,\.\/:-@\[-\^`\{-\xA9\xAB-\xB4\xB6-\xB9\xBB-\xBF\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0378\u0379\u037E\u0380-\u0385\u0387\u038B\u038D\u03A2\u03F6\u0482\u0530\u0557\u0558\u055A-\u055F\u0589-\u0590\u05BE\u05C0\u05C3\u05C6\u05C8-\u05CF\u05EB-\u05EE\u05F3-\u060F\u061B-\u061F\u066A-\u066D\u06D4\u06DD\u06DE\u06E9\u06FD\u06FE\u0700-\u070F\u074B\u074C\u07B2-\u07BF\u07F6-\u07F9\u07FB\u07FC\u07FE\u07FF\u082E-\u083F\u085C-\u085F\u086B-\u089F\u08B5\u08C8-\u08D2\u08E2\u0964\u0965\u0970\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09F2-\u09FB\u09FD\u09FF\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF0-\u0AF8\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B54\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B70\u0B72-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BF0-\u0BFF\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C7F\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0CFF\u0D0D\u0D11\u0D45\u0D49\u0D4F-\u0D53\u0D58-\u0D5E\u0D64\u0D65\u0D70-\u0D79\u0D80\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF4-\u0E00\u0E3B-\u0E3F\u0E4F\u0E5A-\u0E80\u0E83\u0E85\u0E8B\u0EA4\u0EA6\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F01-\u0F17\u0F1A-\u0F1F\u0F2A-\u0F34\u0F36\u0F38\u0F3A-\u0F3D\u0F48\u0F6D-\u0F70\u0F85\u0F98\u0FBD-\u0FC5\u0FC7-\u0FFF\u104A-\u104F\u109E\u109F\u10C6\u10C8-\u10CC\u10CE\u10CF\u10FB\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u1360-\u137F\u1390-\u139F\u13F6\u13F7\u13FE-\u1400\u166D\u166E\u1680\u169B-\u169F\u16EB-\u16ED\u16F9-\u16FF\u170D\u1715-\u171F\u1735-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17D4-\u17D6\u17D8-\u17DB\u17DE\u17DF\u17EA-\u180A\u180E\u180F\u181A-\u181F\u1879-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u1945\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DA-\u19FF\u1A1C-\u1A1F\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1AA6\u1AA8-\u1AAF\u1AC1-\u1AFF\u1B4C-\u1B4F\u1B5A-\u1B6A\u1B74-\u1B7F\u1BF4-\u1BFF\u1C38-\u1C3F\u1C4A-\u1C4C\u1C7E\u1C7F\u1C89-\u1C8F\u1CBB\u1CBC\u1CC0-\u1CCF\u1CD3\u1CFB-\u1CFF\u1DFA\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FBD\u1FBF-\u1FC1\u1FC5\u1FCD-\u1FCF\u1FD4\u1FD5\u1FDC-\u1FDF\u1FED-\u1FF1\u1FF5\u1FFD-\u203E\u2041-\u2053\u2055-\u2070\u2072-\u207E\u2080-\u208F\u209D-\u20CF\u20F1-\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F-\u215F\u2189-\u24B5\u24EA-\u2BFF\u2C2F\u2C5F\u2CE5-\u2CEA\u2CF4-\u2CFF\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D70-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E00-\u2E2E\u2E30-\u3004\u3008-\u3020\u3030\u3036\u3037\u303D-\u3040\u3097\u3098\u309B\u309C\u30A0\u30FB\u3100-\u3104\u3130\u318F-\u319F\u31C0-\u31EF\u3200-\u33FF\u4DC0-\u4DFF\u9FFD-\u9FFF\uA48D-\uA4CF\uA4FE\uA4FF\uA60D-\uA60F\uA62C-\uA63F\uA673\uA67E\uA6F2-\uA716\uA720\uA721\uA789\uA78A\uA7C0\uA7C1\uA7CB-\uA7F4\uA828-\uA82B\uA82D-\uA83F\uA874-\uA87F\uA8C6-\uA8CF\uA8DA-\uA8DF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA954-\uA95F\uA97D-\uA97F\uA9C1-\uA9CE\uA9DA-\uA9DF\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A-\uAA5F\uAA77-\uAA79\uAAC3-\uAADA\uAADE\uAADF\uAAF0\uAAF1\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB5B\uAB6A-\uAB6F\uABEB\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uD7FF\uE000-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB29\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBB2-\uFBD2\uFD3E-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFC-\uFDFF\uFE10-\uFE1F\uFE30-\uFE32\uFE35-\uFE4C\uFE50-\uFE6F\uFE75\uFEFD-\uFF0F\uFF1A-\uFF20\uFF3B-\uFF3E\uFF40\uFF5B-\uFF65\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDD3F\uDD75-\uDDFC\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEE1-\uDEFF\uDF20-\uDF2C\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDF9F\uDFC4-\uDFC7\uDFD0\uDFD6-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCAF\uDCD4-\uDCD7\uDCFC-\uDCFF\uDD28-\uDD2F\uDD64-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56-\uDC5F\uDC77-\uDC7F\uDC9F-\uDCDF\uDCF3\uDCF6-\uDCFF\uDD16-\uDD1F\uDD3A-\uDD7F\uDDB8-\uDDBD\uDDC0-\uDDFF\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE36\uDE37\uDE3B-\uDE3E\uDE40-\uDE5F\uDE7D-\uDE7F\uDE9D-\uDEBF\uDEC8\uDEE7-\uDEFF\uDF36-\uDF3F\uDF56-\uDF5F\uDF73-\uDF7F\uDF92-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCFF\uDD28-\uDD2F\uDD3A-\uDE7F\uDEAA\uDEAD-\uDEAF\uDEB2-\uDEFF\uDF1D-\uDF26\uDF28-\uDF2F\uDF51-\uDFAF\uDFC5-\uDFDF\uDFF7-\uDFFF]|\uD804[\uDC47-\uDC65\uDC70-\uDC7E\uDCBB-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD40-\uDD43\uDD48-\uDD4F\uDD74\uDD75\uDD77-\uDD7F\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDFF\uDE12\uDE38-\uDE3D\uDE3F-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEA9-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD805[\uDC4B-\uDC4F\uDC5A-\uDC5D\uDC62-\uDC7F\uDCC6\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDC1-\uDDD7\uDDDE-\uDDFF\uDE41-\uDE43\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB9-\uDEBF\uDECA-\uDEFF\uDF1B\uDF1C\uDF2C-\uDF2F\uDF3A-\uDFFF]|\uD806[\uDC3B-\uDC9F\uDCEA-\uDCFE\uDD07\uDD08\uDD0A\uDD0B\uDD14\uDD17\uDD36\uDD39\uDD3A\uDD44-\uDD4F\uDD5A-\uDD9F\uDDA8\uDDA9\uDDD8\uDDD9\uDDE2\uDDE5-\uDDFF\uDE3F-\uDE46\uDE48-\uDE4F\uDE9A-\uDE9C\uDE9E-\uDEBF\uDEF9-\uDFFF]|\uD807[\uDC09\uDC37\uDC41-\uDC4F\uDC5A-\uDC71\uDC90\uDC91\uDCA8\uDCB7-\uDCFF\uDD07\uDD0A\uDD37-\uDD39\uDD3B\uDD3E\uDD48-\uDD4F\uDD5A-\uDD5F\uDD66\uDD69\uDD8F\uDD92\uDD99-\uDD9F\uDDAA-\uDEDF\uDEF7-\uDFAF\uDFB1-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD809[\uDC6F-\uDC7F\uDD44-\uDFFF]|[\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD824-\uD82B\uD82D\uD82E\uD830-\uD833\uD837\uD839\uD83D\uD83F\uD87B-\uD87D\uD87F\uD885-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDECF\uDEEE\uDEEF\uDEF5-\uDEFF\uDF37-\uDF3F\uDF44-\uDF4F\uDF5A-\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD81B[\uDC00-\uDE3F\uDE80-\uDEFF\uDF4B-\uDF4E\uDF88-\uDF8E\uDFA0-\uDFDF\uDFE2\uDFE5-\uDFEF\uDFF2-\uDFFF]|\uD821[\uDFF8-\uDFFF]|\uD823[\uDCD6-\uDCFF\uDD09-\uDFFF]|\uD82C[\uDD1F-\uDD4F\uDD53-\uDD63\uDD68-\uDD6F\uDEFC-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A-\uDC9C\uDC9F-\uDFFF]|\uD834[\uDC00-\uDD64\uDD6A-\uDD6C\uDD73-\uDD7A\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDE41\uDE45-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3\uDFCC\uDFCD]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD838[\uDC07\uDC19\uDC1A\uDC22\uDC25\uDC2B-\uDCFF\uDD2D-\uDD2F\uDD3E\uDD3F\uDD4A-\uDD4D\uDD4F-\uDEBF\uDEFA-\uDFFF]|\uD83A[\uDCC5-\uDCCF\uDCD7-\uDCFF\uDD4C-\uDD4F\uDD5A-\uDFFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDFFF]|\uD83C[\uDC00-\uDD2F\uDD4A-\uDD4F\uDD6A-\uDD6F\uDD8A-\uDFFF]|\uD83E[\uDC00-\uDFEF\uDFFA-\uDFFF]|\uD869[\uDEDE-\uDEFF]|\uD86D[\uDF35-\uDF3F]|\uD86E[\uDC1E\uDC1F]|\uD873[\uDEA2-\uDEAF]|\uD87A[\uDFE1-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uD884[\uDF4B-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]/g, Vh = Object.hasOwnProperty;
class Wh {
  constructor() {
    this.occurrences, this.reset();
  }
  slug(t, n) {
    const r = this;
    let i = Yh(t, n === !0);
    const u = i;
    for (; Vh.call(r.occurrences, i); )
      r.occurrences[u]++, i = u + "-" + r.occurrences[u];
    return r.occurrences[i] = 0, i;
  }
  reset() {
    this.occurrences = /* @__PURE__ */ Object.create(null);
  }
}
function Yh(e, t) {
  return typeof e != "string" ? "" : (t || (e = e.toLowerCase()), e.replace(Uh, "").replace(/ /g, "-"));
}
var Qh = {}.hasOwnProperty;
function Kh(e, t) {
  var n = t && e && typeof e == "object" && e.type === "element" && e.properties && Qh.call(e.properties, t) && e.properties[t];
  return n != null && n !== !1;
}
function Xh(e) {
  var t = e && e.type === "element" && e.tagName.toLowerCase() || "", n = t.length === 2 && t.charCodeAt(0) === 104 ? t.charCodeAt(1) : 0;
  return n > 48 && n < 55 ? n - 48 : null;
}
function Gh(e) {
  return "children" in e ? wu(e) : "value" in e ? e.value : "";
}
function Zh(e) {
  return e.type === "text" ? e.value : "children" in e ? wu(e) : "";
}
function wu(e) {
  let t = -1;
  const n = [];
  for (; ++t < e.children.length; )
    n[t] = Zh(e.children[t]);
  return n.join("");
}
const Zr = new Wh();
function Jh(e = {}) {
  const t = e.prefix || "";
  return (n) => {
    Zr.reset(), Rn(n, "element", (r) => {
      Xh(r) && r.properties && !Kh(r, "id") && (r.properties.id = t + Zr.slug(Gh(r)));
    });
  };
}
async function ed(e) {
  const t = await Na().use(jc).use(Bf).use(Hf).use(Hh).use(Jh).process(e != null ? e : "error");
  return String(t);
}
function td(e, t) {
  const n = [...e.querySelectorAll("h1, h2")], r = nd(n);
  t.innerHTML = r;
  const i = [...t.querySelectorAll("a")], u = ud(i);
  n.map((l) => u.observe(l));
}
function nd(e) {
  return `
          <ul class=' leading-6'>${e.map((i) => ({
    title: i.innerText,
    depth: parseInt(i.nodeName.replace(/\D/g, "")),
    id: i.getAttribute("id")
  })).map((i) => `
      <li class="dark:hover:text-white hover:underline header-link ${i.depth > 1 ? "pl-4" : "pl-2"}">
          <a class="" href="#${i.id}">${i.title}</a>
      </li>
      `).join("")}</ul>
      `;
}
function rd(e, t) {
  t.map((n) => {
    let r = n.getAttribute("href");
    n.classList.remove("is-active"), r === e && n.classList.add("is-active");
  });
}
function id(e, t, n) {
  e.forEach((r) => {
    const { target: i, isIntersecting: u, intersectionRatio: l } = r;
    if (u && l >= 1) {
      const o = `#${i.getAttribute("id")}`;
      rd(o, n);
    }
  });
}
function ud(e) {
  const t = {
    rootMargin: "0px 0px -200px 0px",
    threshold: 1
  }, n = (r, i) => id(r, i, e);
  return new IntersectionObserver(n, t);
}
const ld = /* @__PURE__ */ S('<button class="mr-4 flex-1 flex p-2 items-center rounded-md border border-solid-darkitem hover:border-solid-lightitem"><div class="flex-1 "><div class="uppercase text-neutral-500">PREVIOUS</div><div></div></div></button>'), od = /* @__PURE__ */ S('<button class="flex-1 ml-4 flex p-2 items-center rounded-md border border-solid-darkitem  hover:border-solid-lightitem"><div class="flex-1"><div class="uppercase text-neutral-500">NEXT</div><div></div></div></button>'), ad = /* @__PURE__ */ S('<main class="w-full "><article><div class="w-full pl-4 pt-4 pb-16 prose dark:prose-invert prose-neutral"><div class=""></div><div class="flex pt-4"></div></div></article><aside class="absolute right-0 z-10 not-prose dark:bg-gradient-to-r dark:from-neutral-900 dark:to-neutral-800 p-4 rounded-md from- text-sm bottom-16 ml-8 mt-12 mr-8 dark:text-neutral-400"><div class="text-white mb-2 pl-2 flex"><div class="flex-1">On this page</div></div><div id="aside" class=" "></div></aside></main>');
function sd(e) {
  const [t, n] = ue(null), [r, i] = ue(null);
  jt(() => {
    ed(e.md).then((o) => {
      r().innerHTML = o, td(r(), t());
    });
  });
  const u = () => "Fubar 1", l = () => "Snafu 2";
  return (() => {
    const o = ad.cloneNode(!0), a = o.firstChild, s = a.firstChild, c = s.firstChild, d = c.nextSibling, D = a.nextSibling, p = D.firstChild, g = p.nextSibling;
    return nt(i, c), E(d, A($e, {
      get when() {
        return u();
      },
      get children() {
        const x = ld.cloneNode(!0), k = x.firstChild, y = k.firstChild, B = y.nextSibling;
        return E(x, A(ie, {
          class: "h-8 w-8",
          path: Si
        }), k), E(B, u), x;
      }
    }), null), E(d, A($e, {
      get when() {
        return l();
      },
      get children() {
        const x = od.cloneNode(!0), k = x.firstChild, y = k.firstChild, B = y.nextSibling;
        return E(B, l), E(x, A(ie, {
          class: "h-8 w-8 flex-none",
          path: In
        }), null), x;
      }
    }), null), nt(n, g), W(() => D.classList.toggle("hidden", !Ei())), o;
  })();
}
const cd = /* @__PURE__ */ S('<div class="h-full w-full"><div class="relative h-full w-full z-50 opacity-50"></div></div>'), fd = /* @__PURE__ */ S('<div class="absolute right-0 w-full h-screen overflow-hidden"><div class="w-full h-full  overflow-y-scroll"></div></div>'), hd = /* @__PURE__ */ S('<div class="w-full h-screen overflow-hidden dark:bg-gradient-to-r dark:from-neutral-900 dark:to-neutral-800"><div class="w-full h-full overflow-y-scroll"></div></div>'), dd = /* @__PURE__ */ S('<div class="w-full h-full px-2 overflow-y-scroll"></div>'), pd = /* @__PURE__ */ S('<div class="absolute   bottom-0 z-10 dark:bg-gradient-to-r dark:from-neutral-800 dark:to-neutral-900   flex items-start"><p contenteditable class="pt-2 align-middle focus:outline-none rounded-md flex-1"></p></div>'), gd = /* @__PURE__ */ S('<div class=" h-full w-full overflow-hidden"></div>'), md = (e) => (() => {
  const t = cd.cloneNode(!0), n = t.firstChild;
  return n.$$click = () => {
    Ht(!1);
  }, E(t, () => e.children, null), W(() => n.style.setProperty("display", e.when ? "block" : "none")), t;
})();
var Jr;
const Dd = (Jr = document.getElementById("editor")) == null ? void 0 : Jr.innerText;
async function yd(e) {
  return e + `\r
\r
` + Dd;
}
const zd = () => {
  jt(() => {
    const u = or();
    yd(u.page.path).then((l) => {
      console.log("md", l, u.loc.pathname), jl(A(sd, {
        get md() {
          return u.loc.pathname;
        }
      }));
    });
  });
  const [e, t] = ue(300), n = () => {
    const u = Ne() == je.split ? e() : 0;
    return console.log("left", u), u;
  }, r = () => {
    const u = Ne() == je.split ? `calc(100% - ${e()}px )` : "calc(100%)";
    return console.log("width", Ne(), e()), u;
  }, i = or();
  return (() => {
    const u = gd.cloneNode(!0);
    return E(u, A($n, {
      get children() {
        return [A(He, {
          get when() {
            return Ne() == je.full;
          },
          get children() {
            const l = fd.cloneNode(!0), o = l.firstChild;
            return E(o, A(sr, {
              page: i
            })), l;
          }
        }), A(He, {
          get when() {
            return Pn() || Ne() == je.none;
          },
          get children() {
            return lr();
          }
        }), A(He, {
          get when() {
            return Ne() == je.split;
          },
          get children() {
            return A(lo, {
              left: e,
              setLeft: t,
              get children() {
                return [(() => {
                  const l = hd.cloneNode(!0), o = l.firstChild;
                  return E(o, A(sr, {
                    page: i
                  })), l;
                })(), A(md, {
                  get when() {
                    return mn();
                  },
                  get children() {
                    const l = dd.cloneNode(!0);
                    return E(l, lr), l;
                  }
                })];
              }
            });
          }
        })];
      }
    }), null), E(u, A($e, {
      get when() {
        return !mn();
      },
      get children() {
        const l = pd.cloneNode(!0), o = l.firstChild;
        return E(l, A(ie, {
          get path() {
            return Ne() == je.full ? Si : $o;
          },
          class: "h-6 w-6 m-2 flex-none text-blue-700 hover:text-blue-500",
          onclick: () => Jl()
        }), o), E(l, A(ie, {
          path: Oo,
          class: "h-6 w-6 m-2 flex-none text-blue-700 hover:text-blue-500",
          onclick: () => eo()
        }), null), E(l, A(ie, {
          class: " h-6 y-6 m-2 hover:text-blue-500 right-8 top-8 z-10 text-blue-700",
          path: Po
        }), null), W((a) => {
          const s = `${n()}px`, c = r();
          return s !== a._v$ && l.style.setProperty("left", a._v$ = s), c !== a._v$2 && l.style.setProperty("width", a._v$2 = c), a;
        }, {
          _v$: void 0,
          _v$2: void 0
        }), l;
      }
    }), null), u;
  })();
};
ut(["click"]);
const Fd = /* @__PURE__ */ S("<div><div>hello, </div></div>"), Pd = (e) => (() => {
  const t = Fd.cloneNode(!0), n = t.firstChild;
  return n.firstChild, E(n, () => e.name, null), E(t, () => e.children, null), t;
})(), xd = /* @__PURE__ */ S('<div class="w-full  hover:bg-neutral-500  group flex items-center justify-center flex-col cursor-col-resize  "><div class="cursor-col-resize"></div></div>'), bd = /* @__PURE__ */ S('<div class=" w-full h-full min-h-0 font-sans"><div class=" relative h-full w-full overflow-y-auto  flex  bg-color-black"></div></div>'), Cd = (e) => {
  let t = e.size(), n = 0, r = 0;
  const [i, u] = ue(!1), l = (p) => {
    t = e.size(), n = p.clientX, r = p.clientY, u(!0);
  }, o = (p) => {
    t = e.size();
    const g = p.touches[0];
    n = g.clientX, r = g.clientY, u(!0);
  }, a = () => {
    u(!1);
  }, s = (p, g) => {
    e.onResize(t + p - n, g - r);
  }, c = Rt((p) => {
    s(p.clientX, p.clientY);
  }, 10), d = Rt((p) => {
    const g = p.touches[0];
    s(g.clientX, g.clientY);
  }, 10), D = (p) => {
    e.ref(p), p.addEventListener("mousedown", l), p.addEventListener("touchstart", o), Ft(() => {
      p.removeEventListener("mousedown", l), p.removeEventListener("touchstart", o);
    });
  };
  return jt(() => {
    i() ? (window.addEventListener("mousemove", c), window.addEventListener("mouseup", a), window.addEventListener("touchmove", d), window.addEventListener("touchend", a)) : (window.removeEventListener("mousemove", c), window.removeEventListener("mouseup", a), window.removeEventListener("touchmove", d), window.removeEventListener("touchend", a));
  }), (() => {
    const p = xd.cloneNode(!0), g = p.firstChild;
    return nt(D, p), W((x) => {
      const k = !!i(), y = {
        "fixed inset-0 z-10": i(),
        hidden: !i()
      };
      return k !== x._v$ && p.classList.toggle("bg-neutral-500", x._v$ = k), x._v$2 = qt(g, y, x._v$2), x;
    }, {
      _v$: void 0,
      _v$2: void 0
    }), p;
  })();
}, Id = ({
  children: e,
  left: t,
  setLeft: n
}) => {
  let r, i;
  const u = (l, o) => {
    console.log("changeLeft", t(), l), n(l);
  };
  return (() => {
    const l = bd.cloneNode(!0), o = l.firstChild, a = i;
    return typeof a == "function" ? nt(a, l) : i = l, l.style.setProperty("display", "grid"), E(o, () => e[0]), E(l, A(Cd, {
      ref(s) {
        const c = r;
        typeof c == "function" ? c(s) : r = s;
      },
      size: t,
      onResize: u
    }), null), E(l, () => e[1], null), W(() => l.style.setProperty("grid-template-columns", `${t()}px 12px 1fr`)), l;
  })();
};
export {
  wd as BrowseState,
  Sd as Cursor,
  md as Disable,
  $d as FolderLens,
  Cd as GridResizer,
  Pd as Hello,
  kd as Language,
  zd as Layout,
  no as LayoutStore,
  ql as PageDescription,
  to as Query,
  Bd as RichText,
  Xl as ShowPagemap,
  je as ShowSitemap,
  Hl as SiteStore,
  Id as Splitter,
  Ul as addFavorite,
  Wl as addRecent,
  Kl as dgos,
  Nt as favorites,
  Yl as fetchResults,
  _d as layout,
  Pn as mobile,
  or as pageDescription,
  ar as pagemap,
  Mt as recent,
  Vl as removeFavorite,
  ki as removeRecent,
  Ed as rtlLanguages,
  mn as searchMode,
  Ci as setFavorites,
  Od as setLayout,
  Zl as setPagemap,
  Ai as setRecent,
  Ht as setSearchMode,
  vd as setSite,
  Ql as setSite2,
  Ne as showSitemap,
  Ei as showToc,
  ze as site,
  eo as togglePagemap,
  Jl as toggleSitemap,
  Ld as update,
  wi as windowSize
};
