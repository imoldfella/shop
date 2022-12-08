const x = {};
let P = _;
const y = 1, A = 2, R = {
  owned: null,
  cleanups: null,
  context: null,
  owner: null
};
var p = null;
let d = null, c = null, g = null, T = 0;
function S(e, s, t) {
  const i = H(e, s, !1, y);
  D(i);
}
function W(e) {
  try {
    return e();
  } finally {
  }
}
function F(e, s, t) {
  let i = e.value;
  return (!e.comparator || !e.comparator(i, s)) && (e.value = s, e.observers && e.observers.length && b(() => {
    for (let l = 0; l < e.observers.length; l += 1) {
      const f = e.observers[l], o = d && d.running;
      o && d.disposed.has(f), (o && !f.tState || !o && !f.state) && (f.pure ? c.push(f) : g.push(f), f.observers && $(f)), o || (f.state = y);
    }
    if (c.length > 1e6)
      throw c = [], new Error();
  }, !1)), s;
}
function D(e) {
  if (!e.fn)
    return;
  I(e);
  const s = p, t = T;
  p = e, G(e, e.value, t), p = s;
}
function G(e, s, t) {
  let i;
  try {
    i = e.fn(s);
  } catch (l) {
    e.pure && (e.state = y), M(l);
  }
  (!e.updatedAt || e.updatedAt <= t) && (e.updatedAt != null && "observers" in e ? F(e, i) : e.value = i, e.updatedAt = t);
}
function H(e, s, t, i = y, l) {
  const f = {
    fn: e,
    state: i,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: s,
    owner: p,
    context: null,
    pure: t
  };
  return p === null || p !== R && (p.owned ? p.owned.push(f) : p.owned = [f]), f;
}
function L(e) {
  const s = d;
  if (e.state === 0 || s)
    return;
  if (e.state === A || s)
    return m(e);
  if (e.suspense && W(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < T); )
    (e.state || s) && t.push(e);
  for (let i = t.length - 1; i >= 0; i--)
    if (e = t[i], e.state === y || s)
      D(e);
    else if (e.state === A || s) {
      const l = c;
      c = null, b(() => m(e, t[0]), !1), c = l;
    }
}
function b(e, s) {
  if (c)
    return e();
  let t = !1;
  s || (c = []), g ? t = !0 : g = [], T++;
  try {
    const i = e();
    return Q(t), i;
  } catch (i) {
    c || (g = null), M(i);
  }
}
function Q(e) {
  if (c && (_(c), c = null), e)
    return;
  const s = g;
  g = null, s.length && b(() => P(s), !1);
}
function _(e) {
  for (let s = 0; s < e.length; s++)
    L(e[s]);
}
function m(e, s) {
  const t = d;
  e.state = 0;
  for (let i = 0; i < e.sources.length; i += 1) {
    const l = e.sources[i];
    l.sources && (l.state === y || t ? l !== s && L(l) : (l.state === A || t) && m(l, s));
  }
}
function $(e) {
  const s = d;
  for (let t = 0; t < e.observers.length; t += 1) {
    const i = e.observers[t];
    (!i.state || s) && (i.state = A, i.pure ? c.push(i) : g.push(i), i.observers && $(i));
  }
}
function I(e) {
  let s;
  if (e.sources)
    for (; e.sources.length; ) {
      const t = e.sources.pop(), i = e.sourceSlots.pop(), l = t.observers;
      if (l && l.length) {
        const f = l.pop(), o = t.observerSlots.pop();
        i < l.length && (f.sourceSlots[o] = i, l[i] = f, t.observerSlots[i] = o);
      }
    }
  if (e.owned) {
    for (s = 0; s < e.owned.length; s++)
      I(e.owned[s]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (s = 0; s < e.cleanups.length; s++)
      e.cleanups[s]();
    e.cleanups = null;
  }
  e.state = 0, e.context = null;
}
function V(e) {
  return e instanceof Error || typeof e == "string" ? e : new Error("Unknown error");
}
function M(e) {
  throw e = V(e), e;
}
function j(e, s, t) {
  let i = t.length, l = s.length, f = i, o = 0, n = 0, u = s[l - 1].nextSibling, r = null;
  for (; o < l || n < f; ) {
    if (s[o] === t[n]) {
      o++, n++;
      continue;
    }
    for (; s[l - 1] === t[f - 1]; )
      l--, f--;
    if (l === o) {
      const h = f < i ? n ? t[n - 1].nextSibling : t[f - n] : u;
      for (; n < f; )
        e.insertBefore(t[n++], h);
    } else if (f === n)
      for (; o < l; )
        (!r || !r.has(s[o])) && s[o].remove(), o++;
    else if (s[o] === t[f - 1] && t[n] === s[l - 1]) {
      const h = s[--l].nextSibling;
      e.insertBefore(t[n++], s[o++].nextSibling), e.insertBefore(t[--f], h), s[l] = t[f];
    } else {
      if (!r) {
        r = /* @__PURE__ */ new Map();
        let a = n;
        for (; a < f; )
          r.set(t[a], a++);
      }
      const h = r.get(s[o]);
      if (h != null)
        if (n < h && h < f) {
          let a = o, E = 1, B;
          for (; ++a < l && a < f && !((B = r.get(s[a])) == null || B !== h + E); )
            E++;
          if (E > h - n) {
            const O = s[o];
            for (; n < h; )
              e.insertBefore(t[n++], O);
          } else
            e.replaceChild(t[n++], s[o++]);
        } else
          o++;
      else
        s[o++].remove();
    }
  }
}
function q(e, s, t) {
  const i = document.createElement("template");
  i.innerHTML = e;
  let l = i.content.firstChild;
  return t && (l = l.firstChild), l;
}
function v(e, s, t, i) {
  if (t !== void 0 && !i && (i = []), typeof s != "function")
    return C(e, s, i, t);
  S((l) => C(e, s(), l, t), i);
}
function C(e, s, t, i, l) {
  for (x.context && !t && (t = [...e.childNodes]); typeof t == "function"; )
    t = t();
  if (s === t)
    return t;
  const f = typeof s, o = i !== void 0;
  if (e = o && t[0] && t[0].parentNode || e, f === "string" || f === "number") {
    if (x.context)
      return t;
    if (f === "number" && (s = s.toString()), o) {
      let n = t[0];
      n && n.nodeType === 3 ? n.data = s : n = document.createTextNode(s), t = w(e, t, i, n);
    } else
      t !== "" && typeof t == "string" ? t = e.firstChild.data = s : t = e.textContent = s;
  } else if (s == null || f === "boolean") {
    if (x.context)
      return t;
    t = w(e, t, i);
  } else {
    if (f === "function")
      return S(() => {
        let n = s();
        for (; typeof n == "function"; )
          n = n();
        t = C(e, n, t, i);
      }), () => t;
    if (Array.isArray(s)) {
      const n = [], u = t && Array.isArray(t);
      if (N(n, s, t, l))
        return S(() => t = C(e, n, t, i, !0)), () => t;
      if (x.context) {
        if (!n.length)
          return t;
        for (let r = 0; r < n.length; r++)
          if (n[r].parentNode)
            return t = n;
      }
      if (n.length === 0) {
        if (t = w(e, t, i), o)
          return t;
      } else
        u ? t.length === 0 ? U(e, n, i) : j(e, t, n) : (t && w(e), U(e, n));
      t = n;
    } else if (s instanceof Node) {
      if (x.context && s.parentNode)
        return t = o ? [s] : s;
      if (Array.isArray(t)) {
        if (o)
          return t = w(e, t, i, s);
        w(e, t, null, s);
      } else
        t == null || t === "" || !e.firstChild ? e.appendChild(s) : e.replaceChild(s, e.firstChild);
      t = s;
    }
  }
  return t;
}
function N(e, s, t, i) {
  let l = !1;
  for (let f = 0, o = s.length; f < o; f++) {
    let n = s[f], u = t && t[f];
    if (n instanceof Node)
      e.push(n);
    else if (!(n == null || n === !0 || n === !1))
      if (Array.isArray(n))
        l = N(e, n, u) || l;
      else if (typeof n == "function")
        if (i) {
          for (; typeof n == "function"; )
            n = n();
          l = N(e, Array.isArray(n) ? n : [n], Array.isArray(u) ? u : [u]) || l;
        } else
          e.push(n), l = !0;
      else {
        const r = String(n);
        u && u.nodeType === 3 && u.data === r ? e.push(u) : e.push(document.createTextNode(r));
      }
  }
  return l;
}
function U(e, s, t = null) {
  for (let i = 0, l = s.length; i < l; i++)
    e.insertBefore(s[i], t);
}
function w(e, s, t, i) {
  if (t === void 0)
    return e.textContent = "";
  const l = i || document.createTextNode("");
  if (s.length) {
    let f = !1;
    for (let o = s.length - 1; o >= 0; o--) {
      const n = s[o];
      if (l !== n) {
        const u = n.parentNode === e;
        !f && !o ? u ? e.replaceChild(l, n) : e.insertBefore(l, t) : u && n.remove();
      } else
        f = !0;
    }
  } else
    e.insertBefore(l, t);
  return [l];
}
const J = /* @__PURE__ */ q("<div><div>hello, </div></div>"), K = (e) => (() => {
  const s = J.cloneNode(!0), t = s.firstChild;
  return t.firstChild, v(t, () => e.name, null), v(s, () => e.children, null), s;
})();
export {
  K as hellowWorld
};
