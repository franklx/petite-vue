/**
* @vue/shared v3.5.3
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Pe(t, e) {
  const n = new Set(t.split(","));
  return (s) => n.has(s);
}
const je = () => {
}, Ne = Object.assign, Ve = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, Ke = Object.prototype.hasOwnProperty, pt = (t, e) => Ke.call(t, e), w = Array.isArray, ft = (t) => Pt(t) === "[object Map]", Wt = (t) => Pt(t) === "[object Date]", q = (t) => typeof t == "function", L = (t) => typeof t == "string", B = (t) => typeof t == "symbol", R = (t) => t !== null && typeof t == "object", Le = (t) => (R(t) || q(t)) && q(t.then) && q(t.catch), Be = Object.prototype.toString, Pt = (t) => Be.call(t), ke = (t) => Pt(t).slice(8, -1), jt = (t) => L(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, le = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, ze = /-(\w)/g, He = le(
  (t) => t.replace(ze, (e, n) => n ? n.toUpperCase() : "")
), We = /\B([A-Z])/g, fe = le(
  (t) => t.replace(We, "-$1").toLowerCase()
), k = (t, e) => !Object.is(t, e), Ft = (t) => {
  const e = L(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
function ae(t) {
  if (w(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const s = t[n], r = L(s) ? Ye(s) : ae(s);
      if (r)
        for (const i in r)
          e[i] = r[i];
    }
    return e;
  } else if (L(t) || R(t))
    return t;
}
const Fe = /;(?![^(]*\))/g, qe = /:([^]+)/, Je = /\/\*[^]*?\*\//g;
function Ye(t) {
  const e = {};
  return t.replace(Je, "").split(Fe).forEach((n) => {
    if (n) {
      const s = n.split(qe);
      s.length > 1 && (e[s[0].trim()] = s[1].trim());
    }
  }), e;
}
function ue(t) {
  let e = "";
  if (L(t))
    e = t;
  else if (w(t))
    for (let n = 0; n < t.length; n++) {
      const s = ue(t[n]);
      s && (e += s + " ");
    }
  else if (R(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
function Ge(t, e) {
  if (t.length !== e.length) return !1;
  let n = !0;
  for (let s = 0; n && s < t.length; s++)
    n = J(t[s], e[s]);
  return n;
}
function J(t, e) {
  if (t === e) return !0;
  let n = Wt(t), s = Wt(e);
  if (n || s)
    return n && s ? t.getTime() === e.getTime() : !1;
  if (n = B(t), s = B(e), n || s)
    return t === e;
  if (n = w(t), s = w(e), n || s)
    return n && s ? Ge(t, e) : !1;
  if (n = R(t), s = R(e), n || s) {
    if (!n || !s)
      return !1;
    const r = Object.keys(t).length, i = Object.keys(e).length;
    if (r !== i)
      return !1;
    for (const o in t) {
      const c = t.hasOwnProperty(o), l = e.hasOwnProperty(o);
      if (c && !l || !c && l || !J(t[o], e[o]))
        return !1;
    }
  }
  return String(t) === String(e);
}
function yt(t, e) {
  return t.findIndex((n) => J(n, e));
}
/**
* @vue/reactivity v3.5.3
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let d;
const _t = /* @__PURE__ */ new WeakSet();
class Et {
  constructor(e) {
    this.fn = e, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.nextEffect = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, _t.has(this) && (_t.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || (this.flags |= 8, this.nextEffect = U, U = this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, qt(this), pe(this);
    const e = d, n = O;
    d = this, O = !0;
    try {
      return this.fn();
    } finally {
      de(this), d = e, O = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let e = this.deps; e; e = e.nextDep)
        Kt(e);
      this.deps = this.depsTail = void 0, qt(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? _t.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Rt(this) && this.run();
  }
  get dirty() {
    return Rt(this);
  }
}
let he = 0, U;
function Nt() {
  he++;
}
function Vt() {
  if (--he > 0)
    return;
  let t;
  for (; U; ) {
    let e = U;
    for (U = void 0; e; ) {
      const n = e.nextEffect;
      if (e.nextEffect = void 0, e.flags &= -9, e.flags & 1)
        try {
          e.trigger();
        } catch (s) {
          t || (t = s);
        }
      e = n;
    }
  }
  if (t) throw t;
}
function pe(t) {
  for (let e = t.deps; e; e = e.nextDep)
    e.version = -1, e.prevActiveLink = e.dep.activeLink, e.dep.activeLink = e;
}
function de(t) {
  let e, n = t.depsTail;
  for (let s = n; s; s = s.prevDep)
    s.version === -1 ? (s === n && (n = s.prevDep), Kt(s), Ue(s)) : e = s, s.dep.activeLink = s.prevActiveLink, s.prevActiveLink = void 0;
  t.deps = e, t.depsTail = n;
}
function Rt(t) {
  for (let e = t.deps; e; e = e.nextDep)
    if (e.dep.version !== e.version || e.dep.computed && Ze(e.dep.computed) === !1 || e.dep.version !== e.version)
      return !0;
  return !!t._dirty;
}
function Ze(t) {
  if (t.flags & 2)
    return !1;
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === dt))
    return;
  t.globalVersion = dt;
  const e = t.dep;
  if (t.flags |= 2, e.version > 0 && !t.isSSR && !Rt(t)) {
    t.flags &= -3;
    return;
  }
  const n = d, s = O;
  d = t, O = !0;
  try {
    pe(t);
    const r = t.fn(t._value);
    (e.version === 0 || k(r, t._value)) && (t._value = r, e.version++);
  } catch (r) {
    throw e.version++, r;
  } finally {
    d = n, O = s, de(t), t.flags &= -3;
  }
}
function Kt(t) {
  const { dep: e, prevSub: n, nextSub: s } = t;
  if (n && (n.nextSub = s, t.prevSub = void 0), s && (s.prevSub = n, t.nextSub = void 0), e.subs === t && (e.subs = n), !e.subs && e.computed) {
    e.computed.flags &= -5;
    for (let r = e.computed.deps; r; r = r.nextDep)
      Kt(r);
  }
}
function Ue(t) {
  const { prevDep: e, nextDep: n } = t;
  e && (e.nextDep = n, t.prevDep = void 0), n && (n.prevDep = e, t.nextDep = void 0);
}
function Qe(t, e) {
  t.effect instanceof Et && (t = t.effect.fn);
  const n = new Et(t);
  e && Ne(n, e);
  try {
    n.run();
  } catch (r) {
    throw n.stop(), r;
  }
  const s = n.run.bind(n);
  return s.effect = n, s;
}
function Xe(t) {
  t.effect.stop();
}
let O = !0;
const me = [];
function tn() {
  me.push(O), O = !1;
}
function en() {
  const t = me.pop();
  O = t === void 0 ? !0 : t;
}
function qt(t) {
  const { cleanup: e } = t;
  if (t.cleanup = void 0, e) {
    const n = d;
    d = void 0;
    try {
      e();
    } finally {
      d = n;
    }
  }
}
let dt = 0;
class nn {
  constructor(e) {
    this.computed = e, this.version = 0, this.activeLink = void 0, this.subs = void 0;
  }
  track(e) {
    if (!d || !O || d === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== d)
      n = this.activeLink = {
        dep: this,
        sub: d,
        version: this.version,
        nextDep: void 0,
        prevDep: void 0,
        nextSub: void 0,
        prevSub: void 0,
        prevActiveLink: void 0
      }, d.deps ? (n.prevDep = d.depsTail, d.depsTail.nextDep = n, d.depsTail = n) : d.deps = d.depsTail = n, d.flags & 4 && ge(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const s = n.nextDep;
      s.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = s), n.prevDep = d.depsTail, n.nextDep = void 0, d.depsTail.nextDep = n, d.depsTail = n, d.deps === n && (d.deps = s);
    }
    return n;
  }
  trigger(e) {
    this.version++, dt++, this.notify(e);
  }
  notify(e) {
    Nt();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify();
    } finally {
      Vt();
    }
  }
}
function ge(t) {
  const e = t.dep.computed;
  if (e && !t.dep.subs) {
    e.flags |= 20;
    for (let s = e.deps; s; s = s.nextDep)
      ge(s);
  }
  const n = t.dep.subs;
  n !== t && (t.prevSub = n, n && (n.nextSub = t)), t.dep.subs = t;
}
const Tt = /* @__PURE__ */ new WeakMap(), K = Symbol(
  ""
), At = Symbol(
  ""
), Q = Symbol(
  ""
);
function S(t, e, n) {
  if (O && d) {
    let s = Tt.get(t);
    s || Tt.set(t, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = new nn()), r.track();
  }
}
function j(t, e, n, s, r, i) {
  const o = Tt.get(t);
  if (!o) {
    dt++;
    return;
  }
  let c = [];
  if (e === "clear")
    c = [...o.values()];
  else {
    const l = w(t), a = l && jt(n);
    if (l && n === "length") {
      const f = Number(s);
      o.forEach((u, h) => {
        (h === "length" || h === Q || !B(h) && h >= f) && c.push(u);
      });
    } else {
      const f = (u) => u && c.push(u);
      switch (n !== void 0 && f(o.get(n)), a && f(o.get(Q)), e) {
        case "add":
          l ? a && f(o.get("length")) : (f(o.get(K)), ft(t) && f(o.get(At)));
          break;
        case "delete":
          l || (f(o.get(K)), ft(t) && f(o.get(At)));
          break;
        case "set":
          ft(t) && f(o.get(K));
          break;
      }
    }
  }
  Nt();
  for (const l of c)
    l.trigger();
  Vt();
}
function W(t) {
  const e = m(t);
  return e === t ? e : (S(e, "iterate", Q), z(t) ? e : e.map(E));
}
function Lt(t) {
  return S(t = m(t), "iterate", Q), t;
}
const sn = {
  __proto__: null,
  [Symbol.iterator]() {
    return wt(this, Symbol.iterator, E);
  },
  concat(...t) {
    return W(this).concat(
      ...t.map((e) => w(e) ? W(e) : e)
    );
  },
  entries() {
    return wt(this, "entries", (t) => (t[1] = E(t[1]), t));
  },
  every(t, e) {
    return I(this, "every", t, e, void 0, arguments);
  },
  filter(t, e) {
    return I(this, "filter", t, e, (n) => n.map(E), arguments);
  },
  find(t, e) {
    return I(this, "find", t, e, E, arguments);
  },
  findIndex(t, e) {
    return I(this, "findIndex", t, e, void 0, arguments);
  },
  findLast(t, e) {
    return I(this, "findLast", t, e, E, arguments);
  },
  findLastIndex(t, e) {
    return I(this, "findLastIndex", t, e, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, e) {
    return I(this, "forEach", t, e, void 0, arguments);
  },
  includes(...t) {
    return xt(this, "includes", t);
  },
  indexOf(...t) {
    return xt(this, "indexOf", t);
  },
  join(t) {
    return W(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return xt(this, "lastIndexOf", t);
  },
  map(t, e) {
    return I(this, "map", t, e, void 0, arguments);
  },
  pop() {
    return Z(this, "pop");
  },
  push(...t) {
    return Z(this, "push", t);
  },
  reduce(t, ...e) {
    return Jt(this, "reduce", t, e);
  },
  reduceRight(t, ...e) {
    return Jt(this, "reduceRight", t, e);
  },
  shift() {
    return Z(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, e) {
    return I(this, "some", t, e, void 0, arguments);
  },
  splice(...t) {
    return Z(this, "splice", t);
  },
  toReversed() {
    return W(this).toReversed();
  },
  toSorted(t) {
    return W(this).toSorted(t);
  },
  toSpliced(...t) {
    return W(this).toSpliced(...t);
  },
  unshift(...t) {
    return Z(this, "unshift", t);
  },
  values() {
    return wt(this, "values", E);
  }
};
function wt(t, e, n) {
  const s = Lt(t), r = s[e]();
  return s !== t && !z(t) && (r._next = r.next, r.next = () => {
    const i = r._next();
    return i.value && (i.value = n(i.value)), i;
  }), r;
}
const rn = Array.prototype;
function I(t, e, n, s, r, i) {
  const o = Lt(t), c = o !== t && !z(t), l = o[e];
  if (l !== rn[e]) {
    const u = l.apply(t, i);
    return c ? E(u) : u;
  }
  let a = n;
  o !== t && (c ? a = function(u, h) {
    return n.call(this, E(u), h, t);
  } : n.length > 2 && (a = function(u, h) {
    return n.call(this, u, h, t);
  }));
  const f = l.call(o, a, s);
  return c && r ? r(f) : f;
}
function Jt(t, e, n, s) {
  const r = Lt(t);
  let i = n;
  return r !== t && (z(t) ? n.length > 3 && (i = function(o, c, l) {
    return n.call(this, o, c, l, t);
  }) : i = function(o, c, l) {
    return n.call(this, o, E(c), l, t);
  }), r[e](i, ...s);
}
function xt(t, e, n) {
  const s = m(t);
  S(s, "iterate", Q);
  const r = s[e](...n);
  return (r === -1 || r === !1) && Sn(n[0]) ? (n[0] = m(n[0]), s[e](...n)) : r;
}
function Z(t, e, n = []) {
  tn(), Nt();
  const s = m(t)[e].apply(t, n);
  return Vt(), en(), s;
}
const on = /* @__PURE__ */ Pe("__proto__,__v_isRef,__isVue"), ve = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(B)
);
function cn(t) {
  B(t) || (t = String(t));
  const e = m(this);
  return S(e, "has", t), e.hasOwnProperty(t);
}
class be {
  constructor(e = !1, n = !1) {
    this._isReadonly = e, this._isShallow = n;
  }
  get(e, n, s) {
    const r = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return s === (r ? i ? _n : we : i ? yn : _e).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(s) ? e : void 0;
    const o = w(e);
    if (!r) {
      let l;
      if (o && (l = sn[n]))
        return l;
      if (n === "hasOwnProperty")
        return cn;
    }
    const c = Reflect.get(
      e,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Y(e) ? e : s
    );
    return (B(n) ? ve.has(n) : on(n)) || (r || S(e, "get", n), i) ? c : Y(c) ? o && jt(n) ? c : c.value : R(c) ? r ? xe(c) : tt(c) : c;
  }
}
class ln extends be {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, s, r) {
    let i = e[n];
    if (!this._isShallow) {
      const l = G(i);
      if (!z(s) && !G(s) && (i = m(i), s = m(s)), !w(e) && Y(i) && !Y(s))
        return l ? !1 : (i.value = s, !0);
    }
    const o = w(e) && jt(n) ? Number(n) < e.length : pt(e, n), c = Reflect.set(
      e,
      n,
      s,
      Y(e) ? e : r
    );
    return e === m(r) && (o ? k(s, i) && j(e, "set", n, s) : j(e, "add", n, s)), c;
  }
  deleteProperty(e, n) {
    const s = pt(e, n);
    e[n];
    const r = Reflect.deleteProperty(e, n);
    return r && s && j(e, "delete", n, void 0), r;
  }
  has(e, n) {
    const s = Reflect.has(e, n);
    return (!B(n) || !ve.has(n)) && S(e, "has", n), s;
  }
  ownKeys(e) {
    return S(
      e,
      "iterate",
      w(e) ? "length" : K
    ), Reflect.ownKeys(e);
  }
}
class fn extends be {
  constructor(e = !1) {
    super(!0, e);
  }
  set(e, n) {
    return !0;
  }
  deleteProperty(e, n) {
    return !0;
  }
}
const an = /* @__PURE__ */ new ln(), un = /* @__PURE__ */ new fn(), Bt = (t) => t, gt = (t) => Reflect.getPrototypeOf(t);
function rt(t, e, n = !1, s = !1) {
  t = t.__v_raw;
  const r = m(t), i = m(e);
  n || (k(e, i) && S(r, "get", e), S(r, "get", i));
  const { has: o } = gt(r), c = s ? Bt : n ? kt : E;
  if (o.call(r, e))
    return c(t.get(e));
  if (o.call(r, i))
    return c(t.get(i));
  t !== r && t.get(e);
}
function it(t, e = !1) {
  const n = this.__v_raw, s = m(n), r = m(t);
  return e || (k(t, r) && S(s, "has", t), S(s, "has", r)), t === r ? n.has(t) : n.has(t) || n.has(r);
}
function ot(t, e = !1) {
  return t = t.__v_raw, !e && S(m(t), "iterate", K), Reflect.get(t, "size", t);
}
function Yt(t, e = !1) {
  !e && !z(t) && !G(t) && (t = m(t));
  const n = m(this);
  return gt(n).has.call(n, t) || (n.add(t), j(n, "add", t, t)), this;
}
function Gt(t, e, n = !1) {
  !n && !z(e) && !G(e) && (e = m(e));
  const s = m(this), { has: r, get: i } = gt(s);
  let o = r.call(s, t);
  o || (t = m(t), o = r.call(s, t));
  const c = i.call(s, t);
  return s.set(t, e), o ? k(e, c) && j(s, "set", t, e) : j(s, "add", t, e), this;
}
function Zt(t) {
  const e = m(this), { has: n, get: s } = gt(e);
  let r = n.call(e, t);
  r || (t = m(t), r = n.call(e, t)), s && s.call(e, t);
  const i = e.delete(t);
  return r && j(e, "delete", t, void 0), i;
}
function Ut() {
  const t = m(this), e = t.size !== 0, n = t.clear();
  return e && j(t, "clear", void 0, void 0), n;
}
function ct(t, e) {
  return function(s, r) {
    const i = this, o = i.__v_raw, c = m(o), l = e ? Bt : t ? kt : E;
    return !t && S(c, "iterate", K), o.forEach((a, f) => s.call(r, l(a), l(f), i));
  };
}
function lt(t, e, n) {
  return function(...s) {
    const r = this.__v_raw, i = m(r), o = ft(i), c = t === "entries" || t === Symbol.iterator && o, l = t === "keys" && o, a = r[t](...s), f = n ? Bt : e ? kt : E;
    return !e && S(
      i,
      "iterate",
      l ? At : K
    ), {
      // iterator protocol
      next() {
        const { value: u, done: h } = a.next();
        return h ? { value: u, done: h } : {
          value: c ? [f(u[0]), f(u[1])] : f(u),
          done: h
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function D(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function hn() {
  const t = {
    get(i) {
      return rt(this, i);
    },
    get size() {
      return ot(this);
    },
    has: it,
    add: Yt,
    set: Gt,
    delete: Zt,
    clear: Ut,
    forEach: ct(!1, !1)
  }, e = {
    get(i) {
      return rt(this, i, !1, !0);
    },
    get size() {
      return ot(this);
    },
    has: it,
    add(i) {
      return Yt.call(this, i, !0);
    },
    set(i, o) {
      return Gt.call(this, i, o, !0);
    },
    delete: Zt,
    clear: Ut,
    forEach: ct(!1, !0)
  }, n = {
    get(i) {
      return rt(this, i, !0);
    },
    get size() {
      return ot(this, !0);
    },
    has(i) {
      return it.call(this, i, !0);
    },
    add: D("add"),
    set: D("set"),
    delete: D("delete"),
    clear: D("clear"),
    forEach: ct(!0, !1)
  }, s = {
    get(i) {
      return rt(this, i, !0, !0);
    },
    get size() {
      return ot(this, !0);
    },
    has(i) {
      return it.call(this, i, !0);
    },
    add: D("add"),
    set: D("set"),
    delete: D("delete"),
    clear: D("clear"),
    forEach: ct(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    t[i] = lt(i, !1, !1), n[i] = lt(i, !0, !1), e[i] = lt(i, !1, !0), s[i] = lt(
      i,
      !0,
      !0
    );
  }), [
    t,
    n,
    e,
    s
  ];
}
const [
  pn,
  dn,
  mn,
  gn
] = /* @__PURE__ */ hn();
function ye(t, e) {
  const n = e ? t ? gn : mn : t ? dn : pn;
  return (s, r, i) => r === "__v_isReactive" ? !t : r === "__v_isReadonly" ? t : r === "__v_raw" ? s : Reflect.get(
    pt(n, r) && r in s ? n : s,
    r,
    i
  );
}
const vn = {
  get: /* @__PURE__ */ ye(!1, !1)
}, bn = {
  get: /* @__PURE__ */ ye(!0, !1)
}, _e = /* @__PURE__ */ new WeakMap(), yn = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), _n = /* @__PURE__ */ new WeakMap();
function wn(t) {
  switch (t) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function xn(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : wn(ke(t));
}
function tt(t) {
  return G(t) ? t : Se(
    t,
    !1,
    an,
    vn,
    _e
  );
}
function xe(t) {
  return Se(
    t,
    !0,
    un,
    bn,
    we
  );
}
function Se(t, e, n, s, r) {
  if (!R(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const i = r.get(t);
  if (i)
    return i;
  const o = xn(t);
  if (o === 0)
    return t;
  const c = new Proxy(
    t,
    o === 2 ? s : n
  );
  return r.set(t, c), c;
}
function at(t) {
  return G(t) ? at(t.__v_raw) : !!(t && t.__v_isReactive);
}
function G(t) {
  return !!(t && t.__v_isReadonly);
}
function z(t) {
  return !!(t && t.__v_isShallow);
}
function Sn(t) {
  return t ? !!t.__v_raw : !1;
}
function m(t) {
  const e = t && t.__v_raw;
  return e ? m(e) : t;
}
const E = (t) => R(t) ? tt(t) : t, kt = (t) => R(t) ? xe(t) : t;
function Y(t) {
  return t ? t.__v_isRef === !0 : !1;
}
let Ot = !1;
const mt = [], En = Promise.resolve(), et = (t) => En.then(t), Qt = (t) => {
  mt.includes(t) || mt.push(t), Ot || (Ot = !0, et(Rn));
}, Rn = () => {
  for (const t of mt)
    t();
  mt.length = 0, Ot = !1;
}, Tn = /^(spellcheck|draggable|form|list|type|onclick)$/, It = ({
  el: t,
  get: e,
  effect: n,
  arg: s,
  modifiers: r
}) => {
  let i;
  t.className && (t._class = t.className), n(() => {
    let o = e();
    if (s)
      r?.camel && (s = He(s)), St(t, s, o, i);
    else {
      for (const c in o)
        St(t, c, o[c], i && i[c]);
      for (const c in i)
        (!o || !(c in o)) && St(t, c, null);
    }
    i = o;
  });
}, St = (t, e, n, s) => {
  if (e === "class")
    t.setAttribute(
      "class",
      ue(t._class ? [t._class, n] : n) || ""
    );
  else if (e === "style") {
    n = ae(n);
    const { style: r } = t;
    if (!n)
      t.removeAttribute("style");
    else if (L(n))
      n !== s && (r.cssText = n);
    else {
      for (const i in n)
        $t(r, i, n[i]);
      if (s && !L(s))
        for (const i in s)
          n[i] == null && $t(r, i, "");
    }
  } else !(t instanceof SVGElement) && e in t && !Tn.test(e) ? (t[e] = n, e === "value" && (t._value = n)) : e === "true-value" ? t._trueValue = n : e === "false-value" ? t._falseValue = n : n != null ? t.setAttribute(e, n) : t.removeAttribute(e);
}, Xt = /\s*!important$/, $t = (t, e, n) => {
  w(n) ? n.forEach((s) => $t(t, e, s)) : e.startsWith("--") ? t.setProperty(e, n) : Xt.test(n) ? t.setProperty(
    fe(e),
    n.replace(Xt, ""),
    "important"
  ) : t[e] = n;
}, P = (t, e) => {
  const n = t.getAttribute(e);
  return n != null && t.removeAttribute(e), n;
}, M = (t, e, n, s) => {
  t.addEventListener(e, n, s);
}, An = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/, On = ["ctrl", "shift", "alt", "meta"], In = {
  stop: (t) => t.stopPropagation(),
  prevent: (t) => t.preventDefault(),
  self: (t) => t.target !== t.currentTarget,
  ctrl: (t) => !t.ctrlKey,
  shift: (t) => !t.shiftKey,
  alt: (t) => !t.altKey,
  meta: (t) => !t.metaKey,
  left: (t) => "button" in t && t.button !== 0,
  middle: (t) => "button" in t && t.button !== 1,
  right: (t) => "button" in t && t.button !== 2,
  exact: (t, e) => On.some((n) => t[`${n}Key`] && !e[n])
}, Ee = ({ el: t, get: e, exp: n, arg: s, modifiers: r }) => {
  if (!s)
    return;
  let i = An.test(n) ? e(`(e => ${n}(e))`) : e(`($event => { ${n} })`);
  if (s === "vue:mounted") {
    et(i);
    return;
  } else if (s === "vue:unmounted")
    return () => i();
  if (r) {
    s === "click" && (r.right && (s = "contextmenu"), r.middle && (s = "mouseup"));
    const o = i;
    i = (c) => {
      if (!("key" in c && !(fe(c.key) in r))) {
        for (const l in r) {
          const a = In[l];
          if (a && a(c, r))
            return;
        }
        return o(c);
      }
    };
  }
  M(t, s, i, r);
}, $n = ({ el: t, get: e, effect: n }) => {
  const s = t.style.display;
  n(() => {
    t.style.display = e() ? s : "none";
  });
}, Re = ({ el: t, get: e, effect: n }) => {
  n(() => {
    t.textContent = Te(e());
  });
}, Te = (t) => t == null ? "" : R(t) ? JSON.stringify(t, null, 2) : String(t), Dn = ({ el: t, modifiers: e, get: n, effect: s }) => {
  s(() => {
    t.innerHTML = n(), e?.script && et(() => {
      const r = t.querySelectorAll("script");
      for (const i of r) {
        const o = document.createElement("script");
        i.type && (o.type = i.type), i.src && (o.src = i.src), i.text && (o.text = i.text), i.parentElement?.insertBefore(o, i), i.remove();
      }
    });
  });
}, Cn = ({ el: t, exp: e, get: n, effect: s, modifiers: r }) => {
  const i = t.type, o = n(`(val) => { ${e} = val }`), { trim: c, number: l = i === "number" || i === "range" } = r || {};
  if (t.tagName === "SELECT") {
    const a = t;
    M(t, "change", () => {
      const f = Array.prototype.filter.call(a.options, (u) => u.selected).map(
        (u) => l ? Ft(C(u)) : C(u)
      );
      o(a.multiple ? f : f[0]);
    }), s(() => {
      const f = n(), u = a.multiple;
      for (let h = 0, g = a.options.length; h < g; h++) {
        const p = a.options[h], x = C(p);
        if (u)
          w(f) ? p.selected = yt(f, x) > -1 : p.selected = f.has(x);
        else if (J(C(p), f)) {
          a.selectedIndex !== h && (a.selectedIndex = h);
          return;
        }
      }
      !u && a.selectedIndex !== -1 && (a.selectedIndex = -1);
    });
  } else if (i === "checkbox") {
    M(t, "change", () => {
      const f = n(), u = t.checked;
      if (w(f)) {
        const h = C(t), g = yt(f, h), p = g !== -1;
        if (u && !p)
          o(f.concat(h));
        else if (!u && p) {
          const x = [...f];
          x.splice(g, 1), o(x);
        }
      } else
        o(te(t, u));
    });
    let a;
    s(() => {
      const f = n();
      w(f) ? t.checked = yt(f, C(t)) > -1 : f !== a && (t.checked = J(
        f,
        te(t, !0)
      )), a = f;
    });
  } else if (i === "radio") {
    M(t, "change", () => {
      o(C(t));
    });
    let a;
    s(() => {
      const f = n();
      f !== a && (t.checked = J(f, C(t)));
    });
  } else {
    const a = (f) => c ? f.trim() : l ? Ft(f) : f;
    M(t, "compositionstart", Mn), M(t, "compositionend", Pn), M(t, r?.lazy ? "change" : "input", () => {
      t.composing || o(a(t.value));
    }), c && M(t, "change", () => {
      t.value = t.value.trim();
    }), s(() => {
      if (t.composing)
        return;
      const f = t.value, u = n();
      document.activeElement === t && a(f) === u || f !== u && (t.value = u);
    });
  }
}, C = (t) => "_value" in t ? t._value : t.value, te = (t, e) => {
  const n = e ? "_trueValue" : "_falseValue";
  return n in t ? t[n] : e;
}, Mn = (t) => {
  t.target.composing = !0;
}, Pn = (t) => {
  const e = t.target;
  e.composing && (e.composing = !1, jn(e, "input"));
}, jn = (t, e) => {
  const n = document.createEvent("HTMLEvents");
  n.initEvent(e, !0, !0), t.dispatchEvent(n);
}, ee = /* @__PURE__ */ Object.create(null), X = (t, e, n) => Ae(t, `return(${e})`, n), Ae = (t, e, n) => {
  const s = ee[e] || (ee[e] = Nn(e));
  try {
    return s(t, n);
  } catch (r) {
    console.error(r);
  }
}, Nn = (t) => {
  try {
    return new Function("$data", "$el", `with($data){${t}}`);
  } catch (e) {
    return console.error(`${e.message} in expression: ${t}`), () => {
    };
  }
}, Vn = ({ el: t, ctx: e, exp: n, effect: s }) => {
  et(() => s(() => Ae(e.scope, n, t)));
}, Kn = {
  bind: It,
  on: Ee,
  show: $n,
  text: Re,
  html: Dn,
  model: Cn,
  effect: Vn
}, Ln = (t, e, n) => {
  const s = t.parentElement ? t.parentElement : t.parentNode, r = new Comment("v-if");
  s && s.insertBefore(r, t);
  const i = [
    {
      exp: e,
      el: t
    }
  ];
  let o, c;
  for (; (o = t.nextElementSibling) && (c = null, P(o, "v-else") === "" || (c = P(o, "v-else-if"))); )
    s && s.removeChild(o), i.push({ exp: c, el: o });
  const l = t.nextSibling;
  s && s.removeChild(t);
  let a, f = -1;
  const u = () => {
    a && (s && s.insertBefore(r, a.el), a.remove(), a = void 0);
  };
  return n.effect(() => {
    for (let h = 0; h < i.length; h++) {
      const { exp: g, el: p } = i[h];
      if (!g || X(n.scope, g)) {
        h !== f && (u(), a = new zt(p, n), a.insert(s, r), s && s.removeChild(r), f = h);
        return;
      }
    }
    f = -1, u();
  }), l;
}, Bn = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, ne = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, kn = /^\(|\)$/g, zn = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/, Hn = (t, e, n) => {
  const s = e.match(Bn);
  if (!s)
    return;
  const r = t.nextSibling, i = t.parentElement, o = new Text("");
  i.insertBefore(o, t), i.removeChild(t);
  const c = s[2].trim();
  let l = s[1].trim().replace(kn, "").trim(), a, f = !1, u, h, g = "key", p = t.getAttribute(g) || t.getAttribute(g = ":key") || t.getAttribute(g = "v-bind:key");
  p && (t.removeAttribute(g), g === "key" && (p = JSON.stringify(p)));
  let x;
  (x = l.match(ne)) && (l = l.replace(ne, "").trim(), u = x[1].trim(), x[2] && (h = x[2].trim())), (x = l.match(zn)) && (a = x[1].split(",").map((y) => y.trim()), f = l[0] === "[");
  let nt = !1, N, st, vt;
  const Me = (y) => {
    const T = /* @__PURE__ */ new Map(), v = [];
    if (w(y))
      for (let b = 0; b < y.length; b++)
        v.push(bt(T, y[b], b));
    else if (typeof y == "number")
      for (let b = 0; b < y; b++)
        v.push(bt(T, b + 1, b));
    else if (R(y)) {
      let b = 0;
      for (const _ in y)
        v.push(bt(T, y[_], b++, _));
    }
    return [v, T];
  }, bt = (y, T, v, b) => {
    const _ = {};
    a ? a.forEach(
      (V, $) => _[V] = T[f ? $ : V]
    ) : _[l] = T, b ? (u && (_[u] = b), h && (_[h] = v)) : u && (_[u] = v);
    const H = $e(n, _), A = p ? X(H.scope, p) : v;
    return y.set(A, v), H.key = A, H;
  }, Ht = (y, T) => {
    const v = new zt(t, y);
    return v.key = y.key, v.insert(i, T), v;
  };
  return n.effect(() => {
    const y = X(n.scope, c), T = vt;
    if ([st, vt] = Me(y), !nt)
      N = st.map((v) => Ht(v, o)), nt = !0;
    else {
      for (let A = 0; A < N.length; A++)
        vt.has(N[A].key) || N[A].remove();
      const v = [];
      let b = st.length, _, H;
      for (; b--; ) {
        const A = st[b], V = T.get(A.key);
        let $;
        V == null ? $ = Ht(
          A,
          _ ? _.el : o
        ) : ($ = N[V], Object.assign($.ctx.scope, A.scope), V !== b && (N[V + 1] !== _ || // If the next has moved, it must move too
        H === _) && (H = $, $.insert(i, _ ? _.el : o))), v.unshift(_ = $);
      }
      N = v;
    }
  }), r;
}, Dt = ({
  el: t,
  ctx: {
    scope: { $refs: e }
  },
  get: n,
  effect: s
}) => {
  let r;
  return s(() => {
    const i = n();
    e[i] = t, r && i !== r && delete e[r], r = i;
  }), () => {
    r && delete e[r];
  };
}, Wn = /^(?:v-|:|@)/, Fn = /\.([\w-]+)/g;
let Ct = !1;
const Oe = (t, e) => {
  const n = e, s = t.nodeType;
  if (s === 1) {
    const r = t;
    if (r.hasAttribute("v-pre"))
      return;
    P(r, "v-cloak");
    let i;
    if (i = P(r, "v-if"))
      return Ln(r, i, e);
    if (i = P(r, "v-for"))
      return Hn(r, i, e);
    if ((i = P(r, "v-scope")) || i === "") {
      const l = i ? X(e.scope, i, r) : {};
      l.$root = r, e = $e(e, l), l.$template && qn(r, l.$template);
    }
    const o = P(r, "v-once") != null;
    o && (Ct = !0), (i = P(r, "ref")) && (e !== n && ut(r, Dt, `"${i}"`, n), ut(r, Dt, `"${i}"`, e)), se(r, e);
    const c = [];
    for (const { name: l, value: a } of [...r.attributes])
      Wn.test(l) && l !== "v-cloak" && (l === "v-model" ? c.unshift([l, a]) : l[0] === "@" || /^v-on\b/.test(l) ? c.push([l, a]) : re(r, l, a, e));
    for (const [l, a] of c)
      re(r, l, a, e);
    o && (Ct = !1);
  } else if (s === 3) {
    const r = t.data;
    if (r.includes(e.delimiters[0])) {
      let i = [], o = 0, c;
      for (; c = e.delimitersRE.exec(r); ) {
        const l = r.slice(o, c.index);
        l && i.push(JSON.stringify(l)), i.push(`$s(${c[1]})`), o = c.index + c[0].length;
      }
      o < r.length && i.push(JSON.stringify(r.slice(o))), ut(t, Re, i.join("+"), e);
    }
  } else s === 11 && se(t, e);
}, se = (t, e) => {
  let n = t.firstChild;
  for (; n; )
    n = Oe(n, e) || n.nextSibling;
}, re = (t, e, n, s) => {
  let r, i, o;
  const c = e;
  if (e = e.replace(Fn, (l, a) => ((o || (o = {}))[a] = !0, "")), e[0] === ":")
    r = It, i = e.slice(1);
  else if (e[0] === "@")
    r = Ee, i = e.slice(1);
  else {
    const l = e.indexOf(":"), a = l > 0 ? e.slice(2, l) : e.slice(2);
    r = Kn[a] || s.dirs[a], i = l > 0 ? e.slice(l + 1) : void 0;
  }
  r && (r === It && i === "ref" && (r = Dt), ut(t, r, n, s, i, o), t.removeAttribute(c));
}, ut = (t, e, n, s, r, i) => {
  const c = e({
    el: t,
    get: (l = n) => X(s.scope, l, t),
    effect: s.effect,
    ctx: s,
    exp: n,
    arg: r,
    modifiers: i
  });
  c && s.cleanups.push(c);
}, qn = (t, e) => {
  if (e[0] === "#") {
    const n = document.querySelector(e);
    t.appendChild(n.content.cloneNode(!0));
    return;
  }
  t.innerHTML = e.replace(/<[\/\s]*template\s*>/ig, "");
}, Ie = (t) => {
  const e = {
    delimiters: ["{{", "}}"],
    delimitersRE: /\{\{([^]+?)\}\}/g,
    ...t,
    scope: t ? t.scope : tt({}),
    dirs: t ? t.dirs : {},
    effects: [],
    blocks: [],
    cleanups: [],
    effect: (n) => {
      if (Ct)
        return Qt(n), n;
      const s = Qe(n, {
        scheduler: () => Qt(s)
      });
      return e.effects.push(s), s;
    }
  };
  return e;
}, $e = (t, e = {}) => {
  const n = t.scope, s = Object.create(n);
  Object.defineProperties(s, Object.getOwnPropertyDescriptors(e)), s.$refs = Object.create(n.$refs);
  const r = tt(
    new Proxy(s, {
      set(i, o, c, l) {
        return l === r && !pt(i, o) ? Reflect.set(n, o, c) : Reflect.set(i, o, c, l);
      }
    })
  );
  return De(r), {
    ...t,
    scope: r
  };
}, De = (t) => {
  for (const e of Object.keys(t))
    typeof t[e] == "function" && (t[e] = t[e].bind(t));
};
class zt {
  template;
  ctx;
  key;
  parentCtx;
  isFragment;
  start;
  end;
  get el() {
    return this.start || this.template;
  }
  constructor(e, n, s = !1) {
    this.isFragment = e instanceof HTMLTemplateElement, s ? this.template = e : this.isFragment ? this.template = e.content.cloneNode(
      !0
    ) : this.template = e.cloneNode(!0), s ? this.ctx = n : (this.parentCtx = n, n.blocks.push(this), this.ctx = Ie(n)), Oe(this.template, this.ctx);
  }
  insert(e, n = null) {
    if (this.isFragment)
      if (this.start) {
        let s = this.start, r;
        for (; s && (r = s.nextSibling, e.insertBefore(s, n), s !== this.end); )
          s = r;
      } else
        this.start = new Text(""), this.end = new Text(""), e.insertBefore(this.end, n), e.insertBefore(this.start, this.end), e.insertBefore(this.template, this.end);
    else
      e.insertBefore(this.template, n);
  }
  remove() {
    if (this.parentCtx && Ve(this.parentCtx.blocks, this), this.start) {
      const e = this.start.parentNode;
      let n = this.start, s;
      for (; n && (s = n.nextSibling, e.removeChild(n), n !== this.end); )
        n = s;
    } else
      try {
        this.template.isConnected && this.template.parentNode.removeChild(this.template);
      } catch (e) {
        console.log("petite-vue: Unable to remove template"), console.log(e), console.log(this.template);
      }
    this.teardown();
  }
  teardown() {
    this.ctx.blocks.forEach((e) => {
      e.teardown();
    }), this.ctx.effects.forEach(Xe), this.ctx.cleanups.forEach((e) => e());
  }
}
function ht(t, e, n) {
  let s;
  try {
    s = n ? t(...n) : t();
  } catch (r) {
    Ce(r, e);
  }
  return s;
}
function Mt(t, e, n) {
  if (q(t)) {
    const r = ht(t, e, n);
    return r && Le(r) && r.catch((i) => {
      Ce(i, e);
    }), r;
  }
  const s = [];
  for (let r = 0; r < t.length; r++)
    s.push(Mt(t[r], e, n));
  return s;
}
function Ce(t, e) {
  console.error(new Error(`[@vue-reactivity/watch]: ${e}`)), console.error(t);
}
function Jn(t) {
  console.warn(Yn(t));
}
function Yn(t) {
  return new Error(`[reactivue]: ${t}`);
}
const ie = {};
function Gn(t, e, n) {
  return Zn(t, e, n);
}
function Zn(t, e, { immediate: n, deep: s, flush: r } = {}) {
  let i, o = !1, c = !1;
  if (at(t) ? (i = () => t, s = !0) : w(t) ? (c = !0, o = t.some(at), i = () => t.map((p) => Y(p) ? p.value : at(p) ? F(p) : q(p) ? ht(p, "watch getter") : Jn("invalid source"))) : q(t) ? e ? i = () => ht(t, "watch getter") : i = () => (l && l(), Mt(
    t,
    "watch callback",
    [a]
  )) : i = je, e && s) {
    const p = i;
    i = () => F(p());
  }
  let l, a = (p) => {
    l = g.onStop = () => {
      ht(p, "watch cleanup");
    };
  }, f = c ? [] : ie;
  const u = () => {
    if (g.dirty)
      if (e) {
        const p = g.run();
        (s || o || (c ? p.some(
          (x, nt) => k(x, f[nt])
        ) : k(p, f))) && (l && l(), Mt(e, "watch value", [
          p,
          // pass undefined as the old value when it's changed for the first time
          f === ie ? void 0 : f,
          a
        ]), f = p);
      } else
        g.run();
  };
  u.allowRecurse = !!e;
  let h;
  r === "sync" ? h = u : h = () => {
    u();
  };
  const g = new Et(i);
  return g.scheduler = h, e ? n ? u() : f = g.run() : g.run(), () => g.stop();
}
function F(t, e = /* @__PURE__ */ new Set()) {
  if (!R(t) || e.has(t))
    return t;
  if (e.add(t), w(t))
    for (let n = 0; n < t.length; n++)
      F(t[n], e);
  else if (t instanceof Map)
    t.forEach((n, s) => {
      F(t.get(s), e);
    });
  else if (t instanceof Set)
    t.forEach((n) => {
      F(n, e);
    });
  else
    for (const n of Object.keys(t))
      F(t[n], e);
  return t;
}
const oe = (t) => t.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&"), Un = (t) => {
  const e = Ie();
  if (t && (e.scope = tt(t), De(e.scope), t.$delimiters)) {
    const [s, r] = e.delimiters = t.$delimiters;
    e.delimitersRE = new RegExp(
      oe(s) + "([^]+?)" + oe(r),
      "g"
    );
  }
  e.scope.$s = Te, e.scope.$nextTick = et, e.scope.$refs = /* @__PURE__ */ Object.create(null), e.scope.$watch = Gn;
  let n;
  return {
    directive(s, r) {
      return r ? (e.dirs[s] = r, this) : e.dirs[s];
    },
    use(s, r = {}) {
      return s.install(this, r), this;
    },
    mount(s) {
      if (typeof s == "string" && (s = document.querySelector(s), !s))
        return;
      s = s || document.documentElement;
      let r;
      return s.hasAttribute("v-scope") ? r = [s] : r = [...s.querySelectorAll("[v-scope]")].filter(
        (i) => !i.matches("[v-scope] [v-scope]")
      ), r.length || (r = [s]), n = r.map((i) => new zt(i, e, !0)), this;
    },
    unmount() {
      n.forEach((s) => s.teardown());
    }
  };
}, Qn = "0.4.8", ce = document.currentScript;
ce && ce.hasAttribute("init") && Un().mount();
export {
  Un as createApp,
  Qe as effect,
  et as nextTick,
  tt as reactive,
  Qn as version
};
