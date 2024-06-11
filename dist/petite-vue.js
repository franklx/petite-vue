/**
* @vue/shared v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Re(t, e) {
  const n = new Set(t.split(","));
  return (s) => n.has(s);
}
const Qt = () => {
}, Ie = Object.assign, Oe = (t, e) => {
  const n = t.indexOf(e);
  n > -1 && t.splice(n, 1);
}, $e = Object.prototype.hasOwnProperty, W = (t, e) => $e.call(t, e), w = Array.isArray, et = (t) => xt(t) === "[object Map]", Lt = (t) => xt(t) === "[object Date]", B = (t) => typeof t == "function", j = (t) => typeof t == "string", K = (t) => typeof t == "symbol", S = (t) => t !== null && typeof t == "object", Ce = (t) => (S(t) || B(t)) && B(t.then) && B(t.catch), Te = Object.prototype.toString, xt = (t) => Te.call(t), Ae = (t) => xt(t).slice(8, -1), Rt = (t) => j(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Xt = (t) => {
  const e = /* @__PURE__ */ Object.create(null);
  return (n) => e[n] || (e[n] = t(n));
}, Me = /-(\w)/g, Le = Xt((t) => t.replace(Me, (e, n) => n ? n.toUpperCase() : "")), Pe = /\B([A-Z])/g, te = Xt(
  (t) => t.replace(Pe, "-$1").toLowerCase()
), H = (t, e) => !Object.is(t, e), Pt = (t) => {
  const e = j(t) ? Number(t) : NaN;
  return isNaN(e) ? t : e;
};
function ee(t) {
  if (w(t)) {
    const e = {};
    for (let n = 0; n < t.length; n++) {
      const s = t[n], r = j(s) ? Ve(s) : ee(s);
      if (r)
        for (const i in r)
          e[i] = r[i];
    }
    return e;
  } else if (j(t) || S(t))
    return t;
}
const Ne = /;(?![^(]*\))/g, je = /:([^]+)/, Ke = /\/\*[^]*?\*\//g;
function Ve(t) {
  const e = {};
  return t.replace(Ke, "").split(Ne).forEach((n) => {
    if (n) {
      const s = n.split(je);
      s.length > 1 && (e[s[0].trim()] = s[1].trim());
    }
  }), e;
}
function ne(t) {
  let e = "";
  if (j(t))
    e = t;
  else if (w(t))
    for (let n = 0; n < t.length; n++) {
      const s = ne(t[n]);
      s && (e += s + " ");
    }
  else if (S(t))
    for (const n in t)
      t[n] && (e += n + " ");
  return e.trim();
}
function ke(t, e) {
  if (t.length !== e.length)
    return !1;
  let n = !0;
  for (let s = 0; n && s < t.length; s++)
    n = z(t[s], e[s]);
  return n;
}
function z(t, e) {
  if (t === e)
    return !0;
  let n = Lt(t), s = Lt(e);
  if (n || s)
    return n && s ? t.getTime() === e.getTime() : !1;
  if (n = K(t), s = K(e), n || s)
    return t === e;
  if (n = w(t), s = w(e), n || s)
    return n && s ? ke(t, e) : !1;
  if (n = S(t), s = S(e), n || s) {
    if (!n || !s)
      return !1;
    const r = Object.keys(t).length, i = Object.keys(e).length;
    if (r !== i)
      return !1;
    for (const o in t) {
      const c = t.hasOwnProperty(o), l = e.hasOwnProperty(o);
      if (c && !l || !c && l || !z(t[o], e[o]))
        return !1;
    }
  }
  return String(t) === String(e);
}
function ut(t, e) {
  return t.findIndex((n) => z(n, e));
}
/**
* @vue/reactivity v3.4.27
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Be;
function se(t, e = Be) {
  e && e.active && e.effects.push(t);
}
let D;
class dt {
  constructor(e, n, s, r) {
    this.fn = e, this.trigger = n, this.scheduler = s, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, se(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, oe();
      for (let e = 0; e < this._depsLength; e++) {
        const n = this.deps[e];
        if (n.computed && (ze(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), ce();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(e) {
    this._dirtyLevel = e ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let e = P, n = D;
    try {
      return P = !0, D = this, this._runnings++, Nt(this), this.fn();
    } finally {
      jt(this), this._runnings--, D = n, P = e;
    }
  }
  stop() {
    this.active && (Nt(this), jt(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function ze(t) {
  return t.value;
}
function Nt(t) {
  t._trackId++, t._depsLength = 0;
}
function jt(t) {
  if (t.deps.length > t._depsLength) {
    for (let e = t._depsLength; e < t.deps.length; e++)
      re(t.deps[e], t);
    t.deps.length = t._depsLength;
  }
}
function re(t, e) {
  const n = t.get(e);
  n !== void 0 && e._trackId !== n && (t.delete(e), t.size === 0 && t.cleanup());
}
function He(t, e) {
  t.effect instanceof dt && (t = t.effect.fn);
  const n = new dt(t, Qt, () => {
    n.dirty && n.run();
  });
  e && (Ie(n, e), e.scope && se(n, e.scope)), (!e || !e.lazy) && n.run();
  const s = n.run.bind(n);
  return s.effect = n, s;
}
function De(t) {
  t.effect.stop();
}
let P = !0, pt = 0;
const ie = [];
function oe() {
  ie.push(P), P = !1;
}
function ce() {
  const t = ie.pop();
  P = t === void 0 ? !0 : t;
}
function It() {
  pt++;
}
function Ot() {
  for (pt--; !pt && mt.length; )
    mt.shift()();
}
function We(t, e, n) {
  if (e.get(t) !== t._trackId) {
    e.set(t, t._trackId);
    const s = t.deps[t._depsLength];
    s !== e ? (s && re(s, t), t.deps[t._depsLength++] = e) : t._depsLength++;
  }
}
const mt = [];
function qe(t, e, n) {
  It();
  for (const s of t.keys()) {
    let r;
    s._dirtyLevel < e && (r ?? (r = t.get(s) === s._trackId)) && (s._shouldSchedule || (s._shouldSchedule = s._dirtyLevel === 0), s._dirtyLevel = e), s._shouldSchedule && (r ?? (r = t.get(s) === s._trackId)) && (s.trigger(), (!s._runnings || s.allowRecurse) && s._dirtyLevel !== 2 && (s._shouldSchedule = !1, s.scheduler && mt.push(s.scheduler)));
  }
  Ot();
}
const Fe = (t, e) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = t, n.computed = e, n;
}, gt = /* @__PURE__ */ new WeakMap(), N = Symbol(""), _t = Symbol("");
function v(t, e, n) {
  if (P && D) {
    let s = gt.get(t);
    s || gt.set(t, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = Fe(() => s.delete(n))), We(
      D,
      r
    );
  }
}
function A(t, e, n, s, r, i) {
  const o = gt.get(t);
  if (!o)
    return;
  let c = [];
  if (e === "clear")
    c = [...o.values()];
  else if (n === "length" && w(t)) {
    const l = Number(s);
    o.forEach((a, f) => {
      (f === "length" || !K(f) && f >= l) && c.push(a);
    });
  } else
    switch (n !== void 0 && c.push(o.get(n)), e) {
      case "add":
        w(t) ? Rt(n) && c.push(o.get("length")) : (c.push(o.get(N)), et(t) && c.push(o.get(_t)));
        break;
      case "delete":
        w(t) || (c.push(o.get(N)), et(t) && c.push(o.get(_t)));
        break;
      case "set":
        et(t) && c.push(o.get(N));
        break;
    }
  It();
  for (const l of c)
    l && qe(
      l,
      4
    );
  Ot();
}
const Je = /* @__PURE__ */ Re("__proto__,__v_isRef,__isVue"), le = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(K)
), Kt = /* @__PURE__ */ Ge();
function Ge() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((e) => {
    t[e] = function(...n) {
      const s = p(this);
      for (let i = 0, o = this.length; i < o; i++)
        v(s, "get", i + "");
      const r = s[e](...n);
      return r === -1 || r === !1 ? s[e](...n.map(p)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
    t[e] = function(...n) {
      oe(), It();
      const s = p(this)[e].apply(this, n);
      return Ot(), ce(), s;
    };
  }), t;
}
function Ze(t) {
  K(t) || (t = String(t));
  const e = p(this);
  return v(e, "has", t), e.hasOwnProperty(t);
}
class fe {
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
      return s === (r ? i ? fn : he : i ? ln : ue).get(e) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(e) === Object.getPrototypeOf(s) ? e : void 0;
    const o = w(e);
    if (!r) {
      if (o && W(Kt, n))
        return Reflect.get(Kt, n, s);
      if (n === "hasOwnProperty")
        return Ze;
    }
    const c = Reflect.get(e, n, s);
    return (K(n) ? le.has(n) : Je(n)) || (r || v(e, "get", n), i) ? c : ot(c) ? o && Rt(n) ? c : c.value : S(c) ? r ? de(c) : F(c) : c;
  }
}
class Ue extends fe {
  constructor(e = !1) {
    super(!1, e);
  }
  set(e, n, s, r) {
    let i = e[n];
    if (!this._isShallow) {
      const l = it(i);
      if (!hn(s) && !it(s) && (i = p(i), s = p(s)), !w(e) && ot(i) && !ot(s))
        return l ? !1 : (i.value = s, !0);
    }
    const o = w(e) && Rt(n) ? Number(n) < e.length : W(e, n), c = Reflect.set(e, n, s, r);
    return e === p(r) && (o ? H(s, i) && A(e, "set", n, s) : A(e, "add", n, s)), c;
  }
  deleteProperty(e, n) {
    const s = W(e, n);
    e[n];
    const r = Reflect.deleteProperty(e, n);
    return r && s && A(e, "delete", n, void 0), r;
  }
  has(e, n) {
    const s = Reflect.has(e, n);
    return (!K(n) || !le.has(n)) && v(e, "has", n), s;
  }
  ownKeys(e) {
    return v(
      e,
      "iterate",
      w(e) ? "length" : N
    ), Reflect.ownKeys(e);
  }
}
class Ye extends fe {
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
const Qe = /* @__PURE__ */ new Ue(), Xe = /* @__PURE__ */ new Ye(), $t = (t) => t, lt = (t) => Reflect.getPrototypeOf(t);
function U(t, e, n = !1, s = !1) {
  t = t.__v_raw;
  const r = p(t), i = p(e);
  n || (H(e, i) && v(r, "get", e), v(r, "get", i));
  const { has: o } = lt(r), c = s ? $t : n ? Tt : Ct;
  if (o.call(r, e))
    return c(t.get(e));
  if (o.call(r, i))
    return c(t.get(i));
  t !== r && t.get(e);
}
function Y(t, e = !1) {
  const n = this.__v_raw, s = p(n), r = p(t);
  return e || (H(t, r) && v(s, "has", t), v(s, "has", r)), t === r ? n.has(t) : n.has(t) || n.has(r);
}
function Q(t, e = !1) {
  return t = t.__v_raw, !e && v(p(t), "iterate", N), Reflect.get(t, "size", t);
}
function Vt(t) {
  t = p(t);
  const e = p(this);
  return lt(e).has.call(e, t) || (e.add(t), A(e, "add", t, t)), this;
}
function kt(t, e) {
  e = p(e);
  const n = p(this), { has: s, get: r } = lt(n);
  let i = s.call(n, t);
  i || (t = p(t), i = s.call(n, t));
  const o = r.call(n, t);
  return n.set(t, e), i ? H(e, o) && A(n, "set", t, e) : A(n, "add", t, e), this;
}
function Bt(t) {
  const e = p(this), { has: n, get: s } = lt(e);
  let r = n.call(e, t);
  r || (t = p(t), r = n.call(e, t)), s && s.call(e, t);
  const i = e.delete(t);
  return r && A(e, "delete", t, void 0), i;
}
function zt() {
  const t = p(this), e = t.size !== 0, n = t.clear();
  return e && A(t, "clear", void 0, void 0), n;
}
function X(t, e) {
  return function(s, r) {
    const i = this, o = i.__v_raw, c = p(o), l = e ? $t : t ? Tt : Ct;
    return !t && v(c, "iterate", N), o.forEach((a, f) => s.call(r, l(a), l(f), i));
  };
}
function tt(t, e, n) {
  return function(...s) {
    const r = this.__v_raw, i = p(r), o = et(i), c = t === "entries" || t === Symbol.iterator && o, l = t === "keys" && o, a = r[t](...s), f = n ? $t : e ? Tt : Ct;
    return !e && v(
      i,
      "iterate",
      l ? _t : N
    ), {
      // iterator protocol
      next() {
        const { value: u, done: d } = a.next();
        return d ? { value: u, done: d } : {
          value: c ? [f(u[0]), f(u[1])] : f(u),
          done: d
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function O(t) {
  return function(...e) {
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function tn() {
  const t = {
    get(i) {
      return U(this, i);
    },
    get size() {
      return Q(this);
    },
    has: Y,
    add: Vt,
    set: kt,
    delete: Bt,
    clear: zt,
    forEach: X(!1, !1)
  }, e = {
    get(i) {
      return U(this, i, !1, !0);
    },
    get size() {
      return Q(this);
    },
    has: Y,
    add: Vt,
    set: kt,
    delete: Bt,
    clear: zt,
    forEach: X(!1, !0)
  }, n = {
    get(i) {
      return U(this, i, !0);
    },
    get size() {
      return Q(this, !0);
    },
    has(i) {
      return Y.call(this, i, !0);
    },
    add: O("add"),
    set: O("set"),
    delete: O("delete"),
    clear: O("clear"),
    forEach: X(!0, !1)
  }, s = {
    get(i) {
      return U(this, i, !0, !0);
    },
    get size() {
      return Q(this, !0);
    },
    has(i) {
      return Y.call(this, i, !0);
    },
    add: O("add"),
    set: O("set"),
    delete: O("delete"),
    clear: O("clear"),
    forEach: X(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((i) => {
    t[i] = tt(i, !1, !1), n[i] = tt(i, !0, !1), e[i] = tt(i, !1, !0), s[i] = tt(
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
  en,
  nn,
  sn,
  rn
] = /* @__PURE__ */ tn();
function ae(t, e) {
  const n = e ? t ? rn : sn : t ? nn : en;
  return (s, r, i) => r === "__v_isReactive" ? !t : r === "__v_isReadonly" ? t : r === "__v_raw" ? s : Reflect.get(
    W(n, r) && r in s ? n : s,
    r,
    i
  );
}
const on = {
  get: /* @__PURE__ */ ae(!1, !1)
}, cn = {
  get: /* @__PURE__ */ ae(!0, !1)
}, ue = /* @__PURE__ */ new WeakMap(), ln = /* @__PURE__ */ new WeakMap(), he = /* @__PURE__ */ new WeakMap(), fn = /* @__PURE__ */ new WeakMap();
function an(t) {
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
function un(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : an(Ae(t));
}
function F(t) {
  return it(t) ? t : pe(
    t,
    !1,
    Qe,
    on,
    ue
  );
}
function de(t) {
  return pe(
    t,
    !0,
    Xe,
    cn,
    he
  );
}
function pe(t, e, n, s, r) {
  if (!S(t) || t.__v_raw && !(e && t.__v_isReactive))
    return t;
  const i = r.get(t);
  if (i)
    return i;
  const o = un(t);
  if (o === 0)
    return t;
  const c = new Proxy(
    t,
    o === 2 ? s : n
  );
  return r.set(t, c), c;
}
function nt(t) {
  return it(t) ? nt(t.__v_raw) : !!(t && t.__v_isReactive);
}
function it(t) {
  return !!(t && t.__v_isReadonly);
}
function hn(t) {
  return !!(t && t.__v_isShallow);
}
function p(t) {
  const e = t && t.__v_raw;
  return e ? p(e) : t;
}
const Ct = (t) => S(t) ? F(t) : t, Tt = (t) => S(t) ? de(t) : t;
function ot(t) {
  return !!(t && t.__v_isRef === !0);
}
let wt = !1;
const ct = [], dn = Promise.resolve(), J = (t) => dn.then(t), Ht = (t) => {
  ct.includes(t) || ct.push(t), wt || (wt = !0, J(pn));
}, pn = () => {
  for (const t of ct)
    t();
  ct.length = 0, wt = !1;
}, mn = /^(spellcheck|draggable|form|list|type|onclick)$/, yt = ({
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
      r?.camel && (s = Le(s)), ht(t, s, o, i);
    else {
      for (const c in o)
        ht(t, c, o[c], i && i[c]);
      for (const c in i)
        (!o || !(c in o)) && ht(t, c, null);
    }
    i = o;
  });
}, ht = (t, e, n, s) => {
  if (e === "class")
    t.setAttribute(
      "class",
      ne(t._class ? [t._class, n] : n) || ""
    );
  else if (e === "style") {
    n = ee(n);
    const { style: r } = t;
    if (!n)
      t.removeAttribute("style");
    else if (j(n))
      n !== s && (r.cssText = n);
    else {
      for (const i in n)
        bt(r, i, n[i]);
      if (s && !j(s))
        for (const i in s)
          n[i] == null && bt(r, i, "");
    }
  } else
    !(t instanceof SVGElement) && e in t && !mn.test(e) ? (t[e] = n, e === "value" && (t._value = n)) : e === "true-value" ? t._trueValue = n : e === "false-value" ? t._falseValue = n : n != null ? t.setAttribute(e, n) : t.removeAttribute(e);
}, Dt = /\s*!important$/, bt = (t, e, n) => {
  w(n) ? n.forEach((s) => bt(t, e, s)) : e.startsWith("--") ? t.setProperty(e, n) : Dt.test(n) ? t.setProperty(
    te(e),
    n.replace(Dt, ""),
    "important"
  ) : t[e] = n;
}, T = (t, e) => {
  const n = t.getAttribute(e);
  return n != null && t.removeAttribute(e), n;
}, C = (t, e, n, s) => {
  t.addEventListener(e, n, s);
}, gn = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/, _n = ["ctrl", "shift", "alt", "meta"], wn = {
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
  exact: (t, e) => _n.some((n) => t[`${n}Key`] && !e[n])
}, me = ({ el: t, get: e, exp: n, arg: s, modifiers: r }) => {
  if (!s)
    return;
  let i = gn.test(n) ? e(`(e => ${n}(e))`) : e(`($event => { ${n} })`);
  if (s === "vue:mounted") {
    J(i);
    return;
  } else if (s === "vue:unmounted")
    return () => i();
  if (r) {
    s === "click" && (r.right && (s = "contextmenu"), r.middle && (s = "mouseup"));
    const o = i;
    i = (c) => {
      if (!("key" in c && !(te(c.key) in r))) {
        for (const l in r) {
          const a = wn[l];
          if (a && a(c, r))
            return;
        }
        return o(c);
      }
    };
  }
  C(t, s, i, r);
}, yn = ({ el: t, get: e, effect: n }) => {
  const s = t.style.display;
  n(() => {
    t.style.display = e() ? s : "none";
  });
}, ge = ({ el: t, get: e, effect: n }) => {
  n(() => {
    t.textContent = _e(e());
  });
}, _e = (t) => t == null ? "" : S(t) ? JSON.stringify(t, null, 2) : String(t), bn = ({ el: t, modifiers: e, get: n, effect: s }) => {
  s(() => {
    t.innerHTML = n(), e?.script && J(() => {
      const r = t.querySelectorAll("script");
      for (const i of r) {
        const o = document.createElement("script");
        i.type && (o.type = i.type), i.src && (o.src = i.src), i.text && (o.text = i.text), i.parentElement?.insertBefore(o, i), i.remove();
      }
    });
  });
}, En = ({ el: t, exp: e, get: n, effect: s, modifiers: r }) => {
  const i = t.type, o = n(`(val) => { ${e} = val }`), { trim: c, number: l = i === "number" || i === "range" } = r || {};
  if (t.tagName === "SELECT") {
    const a = t;
    C(t, "change", () => {
      const f = Array.prototype.filter.call(a.options, (u) => u.selected).map(
        (u) => l ? Pt($(u)) : $(u)
      );
      o(a.multiple ? f : f[0]);
    }), s(() => {
      const f = n(), u = a.multiple;
      for (let d = 0, m = a.options.length; d < m; d++) {
        const h = a.options[d], E = $(h);
        if (u)
          w(f) ? h.selected = ut(f, E) > -1 : h.selected = f.has(E);
        else if (z($(h), f)) {
          a.selectedIndex !== d && (a.selectedIndex = d);
          return;
        }
      }
      !u && a.selectedIndex !== -1 && (a.selectedIndex = -1);
    });
  } else if (i === "checkbox") {
    C(t, "change", () => {
      const f = n(), u = t.checked;
      if (w(f)) {
        const d = $(t), m = ut(f, d), h = m !== -1;
        if (u && !h)
          o(f.concat(d));
        else if (!u && h) {
          const E = [...f];
          E.splice(m, 1), o(E);
        }
      } else
        o(Wt(t, u));
    });
    let a;
    s(() => {
      const f = n();
      w(f) ? t.checked = ut(f, $(t)) > -1 : f !== a && (t.checked = z(
        f,
        Wt(t, !0)
      )), a = f;
    });
  } else if (i === "radio") {
    C(t, "change", () => {
      o($(t));
    });
    let a;
    s(() => {
      const f = n();
      f !== a && (t.checked = z(f, $(t)));
    });
  } else {
    const a = (f) => c ? f.trim() : l ? Pt(f) : f;
    C(t, "compositionstart", Sn), C(t, "compositionend", vn), C(t, r?.lazy ? "change" : "input", () => {
      t.composing || o(a(t.value));
    }), c && C(t, "change", () => {
      t.value = t.value.trim();
    }), s(() => {
      if (t.composing)
        return;
      const f = t.value, u = n();
      document.activeElement === t && a(f) === u || f !== u && (t.value = u);
    });
  }
}, $ = (t) => "_value" in t ? t._value : t.value, Wt = (t, e) => {
  const n = e ? "_trueValue" : "_falseValue";
  return n in t ? t[n] : e;
}, Sn = (t) => {
  t.target.composing = !0;
}, vn = (t) => {
  const e = t.target;
  e.composing && (e.composing = !1, xn(e, "input"));
}, xn = (t, e) => {
  const n = document.createEvent("HTMLEvents");
  n.initEvent(e, !0, !0), t.dispatchEvent(n);
}, qt = /* @__PURE__ */ Object.create(null), q = (t, e, n) => we(t, `return(${e})`, n), we = (t, e, n) => {
  const s = qt[e] || (qt[e] = Rn(e));
  try {
    return s(t, n);
  } catch (r) {
    console.error(r);
  }
}, Rn = (t) => {
  try {
    return new Function("$data", "$el", `with($data){${t}}`);
  } catch (e) {
    return console.error(`${e.message} in expression: ${t}`), () => {
    };
  }
}, In = ({ el: t, ctx: e, exp: n, effect: s }) => {
  J(() => s(() => we(e.scope, n, t)));
}, On = {
  bind: yt,
  on: me,
  show: yn,
  text: ge,
  html: bn,
  model: En,
  effect: In
}, $n = (t, e, n) => {
  const s = t.parentElement ? t.parentElement : t.parentNode, r = new Comment("v-if");
  s && s.insertBefore(r, t);
  const i = [
    {
      exp: e,
      el: t
    }
  ];
  let o, c;
  for (; (o = t.nextElementSibling) && (c = null, T(o, "v-else") === "" || (c = T(o, "v-else-if"))); )
    s && s.removeChild(o), i.push({ exp: c, el: o });
  const l = t.nextSibling;
  s && s.removeChild(t);
  let a, f = -1;
  const u = () => {
    a && (s && s.insertBefore(r, a.el), a.remove(), a = void 0);
  };
  return n.effect(() => {
    for (let d = 0; d < i.length; d++) {
      const { exp: m, el: h } = i[d];
      if (!m || q(n.scope, m)) {
        d !== f && (u(), a = new At(h, n), a.insert(s, r), s && s.removeChild(r), f = d);
        return;
      }
    }
    f = -1, u();
  }), l;
}, Cn = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, Ft = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, Tn = /^\(|\)$/g, An = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/, Mn = (t, e, n) => {
  const s = e.match(Cn);
  if (!s)
    return;
  const r = t.nextSibling, i = t.parentElement, o = new Text("");
  i.insertBefore(o, t), i.removeChild(t);
  const c = s[2].trim();
  let l = s[1].trim().replace(Tn, "").trim(), a, f = !1, u, d, m = "key", h = t.getAttribute(m) || t.getAttribute(m = ":key") || t.getAttribute(m = "v-bind:key");
  h && (t.removeAttribute(m), m === "key" && (h = JSON.stringify(h)));
  let E;
  (E = l.match(Ft)) && (l = l.replace(Ft, "").trim(), u = E[1].trim(), E[2] && (d = E[2].trim())), (E = l.match(An)) && (a = E[1].split(",").map((y) => y.trim()), f = l[0] === "[");
  let G = !1, M, Z, ft;
  const xe = (y) => {
    const x = /* @__PURE__ */ new Map(), g = [];
    if (w(y))
      for (let _ = 0; _ < y.length; _++)
        g.push(at(x, y[_], _));
    else if (typeof y == "number")
      for (let _ = 0; _ < y; _++)
        g.push(at(x, _ + 1, _));
    else if (S(y)) {
      let _ = 0;
      for (const b in y)
        g.push(at(x, y[b], _++, b));
    }
    return [g, x];
  }, at = (y, x, g, _) => {
    const b = {};
    a ? a.forEach(
      (L, I) => b[L] = x[f ? I : L]
    ) : b[l] = x, _ ? (u && (b[u] = _), d && (b[d] = g)) : u && (b[u] = g);
    const V = Ee(n, b), R = h ? q(V.scope, h) : g;
    return y.set(R, g), V.key = R, V;
  }, Mt = (y, x) => {
    const g = new At(t, y);
    return g.key = y.key, g.insert(i, x), g;
  };
  return n.effect(() => {
    const y = q(n.scope, c), x = ft;
    if ([Z, ft] = xe(y), !G)
      M = Z.map((g) => Mt(g, o)), G = !0;
    else {
      for (let R = 0; R < M.length; R++)
        ft.has(M[R].key) || M[R].remove();
      const g = [];
      let _ = Z.length, b, V;
      for (; _--; ) {
        const R = Z[_], L = x.get(R.key);
        let I;
        L == null ? I = Mt(
          R,
          b ? b.el : o
        ) : (I = M[L], Object.assign(I.ctx.scope, R.scope), L !== _ && (M[L + 1] !== b || // If the next has moved, it must move too
        V === b) && (V = I, I.insert(i, b ? b.el : o))), g.unshift(b = I);
      }
      M = g;
    }
  }), r;
}, Et = ({
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
}, Ln = /^(?:v-|:|@)/, Pn = /\.([\w-]+)/g;
let St = !1;
const ye = (t, e) => {
  const n = e, s = t.nodeType;
  if (s === 1) {
    const r = t;
    if (r.hasAttribute("v-pre"))
      return;
    T(r, "v-cloak");
    let i;
    if (i = T(r, "v-if"))
      return $n(r, i, e);
    if (i = T(r, "v-for"))
      return Mn(r, i, e);
    if ((i = T(r, "v-scope")) || i === "") {
      const l = i ? q(e.scope, i, r) : {};
      l.$root = r, e = Ee(e, l), l.$template && Nn(r, l.$template);
    }
    const o = T(r, "v-once") != null;
    o && (St = !0), (i = T(r, "ref")) && (e !== n && st(r, Et, `"${i}"`, n), st(r, Et, `"${i}"`, e)), Jt(r, e);
    const c = [];
    for (const { name: l, value: a } of [...r.attributes])
      Ln.test(l) && l !== "v-cloak" && (l === "v-model" ? c.unshift([l, a]) : l[0] === "@" || /^v-on\b/.test(l) ? c.push([l, a]) : Gt(r, l, a, e));
    for (const [l, a] of c)
      Gt(r, l, a, e);
    o && (St = !1);
  } else if (s === 3) {
    const r = t.data;
    if (r.includes(e.delimiters[0])) {
      let i = [], o = 0, c;
      for (; c = e.delimitersRE.exec(r); ) {
        const l = r.slice(o, c.index);
        l && i.push(JSON.stringify(l)), i.push(`$s(${c[1]})`), o = c.index + c[0].length;
      }
      o < r.length && i.push(JSON.stringify(r.slice(o))), st(t, ge, i.join("+"), e);
    }
  } else
    s === 11 && Jt(t, e);
}, Jt = (t, e) => {
  let n = t.firstChild;
  for (; n; )
    n = ye(n, e) || n.nextSibling;
}, Gt = (t, e, n, s) => {
  let r, i, o;
  const c = e;
  if (e = e.replace(Pn, (l, a) => ((o || (o = {}))[a] = !0, "")), e[0] === ":")
    r = yt, i = e.slice(1);
  else if (e[0] === "@")
    r = me, i = e.slice(1);
  else {
    const l = e.indexOf(":"), a = l > 0 ? e.slice(2, l) : e.slice(2);
    r = On[a] || s.dirs[a], i = l > 0 ? e.slice(l + 1) : void 0;
  }
  r && (r === yt && i === "ref" && (r = Et), st(t, r, n, s, i, o), t.removeAttribute(c));
}, st = (t, e, n, s, r, i) => {
  const c = e({
    el: t,
    get: (l = n) => q(s.scope, l, t),
    effect: s.effect,
    ctx: s,
    exp: n,
    arg: r,
    modifiers: i
  });
  c && s.cleanups.push(c);
}, Nn = (t, e) => {
  if (e[0] === "#") {
    const n = document.querySelector(e);
    t.appendChild(n.content.cloneNode(!0));
    return;
  }
  t.innerHTML = e.replace(/<[\/\s]*template\s*>/ig, "");
}, be = (t) => {
  const e = {
    delimiters: ["{{", "}}"],
    delimitersRE: /\{\{([^]+?)\}\}/g,
    ...t,
    scope: t ? t.scope : F({}),
    dirs: t ? t.dirs : {},
    effects: [],
    blocks: [],
    cleanups: [],
    effect: (n) => {
      if (St)
        return Ht(n), n;
      const s = He(n, {
        scheduler: () => Ht(s)
      });
      return e.effects.push(s), s;
    }
  };
  return e;
}, Ee = (t, e = {}) => {
  const n = t.scope, s = Object.create(n);
  Object.defineProperties(s, Object.getOwnPropertyDescriptors(e)), s.$refs = Object.create(n.$refs);
  const r = F(
    new Proxy(s, {
      set(i, o, c, l) {
        return l === r && !W(i, o) ? Reflect.set(n, o, c) : Reflect.set(i, o, c, l);
      }
    })
  );
  return Se(r), {
    ...t,
    scope: r
  };
}, Se = (t) => {
  for (const e of Object.keys(t))
    typeof t[e] == "function" && (t[e] = t[e].bind(t));
};
class At {
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
    ) : this.template = e.cloneNode(!0), s ? this.ctx = n : (this.parentCtx = n, n.blocks.push(this), this.ctx = be(n)), ye(this.template, this.ctx);
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
    if (this.parentCtx && Oe(this.parentCtx.blocks, this), this.start) {
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
    }), this.ctx.effects.forEach(De), this.ctx.cleanups.forEach((e) => e());
  }
}
function rt(t, e, n) {
  let s;
  try {
    s = n ? t(...n) : t();
  } catch (r) {
    ve(r, e);
  }
  return s;
}
function vt(t, e, n) {
  if (B(t)) {
    const r = rt(t, e, n);
    return r && Ce(r) && r.catch((i) => {
      ve(i, e);
    }), r;
  }
  const s = [];
  for (let r = 0; r < t.length; r++)
    s.push(vt(t[r], e, n));
  return s;
}
function ve(t, e) {
  console.error(new Error(`[@vue-reactivity/watch]: ${e}`)), console.error(t);
}
function jn(t) {
  console.warn(Kn(t));
}
function Kn(t) {
  return new Error(`[reactivue]: ${t}`);
}
const Zt = {};
function Vn(t, e, n) {
  return kn(t, e, n);
}
function kn(t, e, { immediate: n, deep: s, flush: r } = {}) {
  let i, o = !1, c = !1;
  if (nt(t) ? (i = () => t, s = !0) : w(t) ? (c = !0, o = t.some(nt), i = () => t.map((h) => ot(h) ? h.value : nt(h) ? k(h) : B(h) ? rt(h, "watch getter") : jn("invalid source"))) : B(t) ? e ? i = () => rt(t, "watch getter") : i = () => (l && l(), vt(
    t,
    "watch callback",
    [a]
  )) : i = Qt, e && s) {
    const h = i;
    i = () => k(h());
  }
  let l, a = (h) => {
    l = m.onStop = () => {
      rt(h, "watch cleanup");
    };
  }, f = c ? [] : Zt;
  const u = () => {
    if (m.active)
      if (e) {
        const h = m.run();
        (s || o || (c ? h.some(
          (E, G) => H(E, f[G])
        ) : H(h, f))) && (l && l(), vt(e, "watch value", [
          h,
          // pass undefined as the old value when it's changed for the first time
          f === Zt ? void 0 : f,
          a
        ]), f = h);
      } else
        m.run();
  };
  u.allowRecurse = !!e;
  let d;
  r === "sync" ? d = u : d = () => {
    u();
  };
  const m = new dt(i, d);
  return e ? n ? u() : f = m.run() : m.run(), () => m.stop();
}
function k(t, e = /* @__PURE__ */ new Set()) {
  if (!S(t) || e.has(t))
    return t;
  if (e.add(t), w(t))
    for (let n = 0; n < t.length; n++)
      k(t[n], e);
  else if (t instanceof Map)
    t.forEach((n, s) => {
      k(t.get(s), e);
    });
  else if (t instanceof Set)
    t.forEach((n) => {
      k(n, e);
    });
  else
    for (const n of Object.keys(t))
      k(t[n], e);
  return t;
}
const Ut = (t) => t.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&"), Bn = (t) => {
  const e = be();
  if (t && (e.scope = F(t), Se(e.scope), t.$delimiters)) {
    const [s, r] = e.delimiters = t.$delimiters;
    e.delimitersRE = new RegExp(
      Ut(s) + "([^]+?)" + Ut(r),
      "g"
    );
  }
  e.scope.$s = _e, e.scope.$nextTick = J, e.scope.$refs = /* @__PURE__ */ Object.create(null), e.scope.$watch = Vn;
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
      ), r.length || (r = [s]), n = r.map((i) => new At(i, e, !0)), this;
    },
    unmount() {
      n.forEach((s) => s.teardown());
    }
  };
}, zn = "0.4.8", Yt = document.currentScript;
Yt && Yt.hasAttribute("init") && Bn().mount();
export {
  Bn as createApp,
  He as effect,
  J as nextTick,
  F as reactive,
  zn as version
};
