/**
* @vue/shared v3.4.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function at(e, t) {
  const n = new Set(e.split(","));
  return (s) => n.has(s);
}
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const Be = () => {
}, _e = Object.assign, ht = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, pt = Object.prototype.hasOwnProperty, Z = (e, t) => pt.call(e, t), _ = Array.isArray, te = (e) => ye(e) === "[object Map]", xe = (e) => ye(e) === "[object Date]", L = (e) => typeof e == "function", T = (e) => typeof e == "string", M = (e) => typeof e == "symbol", S = (e) => e !== null && typeof e == "object", dt = (e) => (S(e) || L(e)) && L(e.then) && L(e.catch), mt = Object.prototype.toString, ye = (e) => mt.call(e), gt = (e) => ye(e).slice(8, -1), Ee = (e) => T(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ke = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, _t = /-(\w)/g, yt = Ke((e) => e.replace(_t, (t, n) => n ? n.toUpperCase() : "")), Et = /\B([A-Z])/g, ze = Ke(
  (e) => e.replace(Et, "-$1").toLowerCase()
), re = (e, t) => !Object.is(e, t), Oe = (e) => {
  const t = T(e) ? Number(e) : NaN;
  return isNaN(t) ? e : t;
};
function He(e) {
  if (_(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], i = T(s) ? St(s) : He(s);
      if (i)
        for (const r in i)
          t[r] = i[r];
    }
    return t;
  } else if (T(e) || S(e))
    return e;
}
const bt = /;(?![^(]*\))/g, wt = /:([^]+)/, vt = /\/\*[^]*?\*\//g;
function St(e) {
  const t = {};
  return e.replace(vt, "").split(bt).forEach((n) => {
    if (n) {
      const s = n.split(wt);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function We(e) {
  let t = "";
  if (T(e))
    t = e;
  else if (_(e))
    for (let n = 0; n < e.length; n++) {
      const s = We(e[n]);
      s && (t += s + " ");
    }
  else if (S(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function xt(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = j(e[s], t[s]);
  return n;
}
function j(e, t) {
  if (e === t)
    return !0;
  let n = xe(e), s = xe(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = M(e), s = M(t), n || s)
    return e === t;
  if (n = _(e), s = _(t), n || s)
    return n && s ? xt(e, t) : !1;
  if (n = S(e), s = S(t), n || s) {
    if (!n || !s)
      return !1;
    const i = Object.keys(e).length, r = Object.keys(t).length;
    if (i !== r)
      return !1;
    for (const o in e) {
      const c = e.hasOwnProperty(o), l = t.hasOwnProperty(o);
      if (c && !l || !c && l || !j(e[o], t[o]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function ne(e, t) {
  return e.findIndex((n) => j(n, t));
}
/**
* @vue/reactivity v3.4.26
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function oe(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Ot;
function qe(e, t = Ot) {
  t && t.active && t.effects.push(e);
}
let P;
class ce {
  constructor(t, n, s, i) {
    this.fn = t, this.trigger = n, this.scheduler = s, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, qe(this, i);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, Ze();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (Rt(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), Ge();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = A, n = P;
    try {
      return A = !0, P = this, this._runnings++, Re(this), this.fn();
    } finally {
      Ne(this), this._runnings--, P = n, A = t;
    }
  }
  stop() {
    this.active && (Re(this), Ne(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Rt(e) {
  return e.value;
}
function Re(e) {
  e._trackId++, e._depsLength = 0;
}
function Ne(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      Fe(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function Fe(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
function Nt(e, t) {
  e.effect instanceof ce && (e = e.effect.fn);
  const n = new ce(e, Be, () => {
    n.dirty && n.run();
  });
  t && (_e(n, t), t.scope && qe(n, t.scope)), (!t || !t.lazy) && n.run();
  const s = n.run.bind(n);
  return s.effect = n, s;
}
function $t(e) {
  e.effect.stop();
}
let A = !0, le = 0;
const Je = [];
function Ze() {
  Je.push(A), A = !1;
}
function Ge() {
  const e = Je.pop();
  A = e === void 0 ? !0 : e;
}
function be() {
  le++;
}
function we() {
  for (le--; !le && fe.length; )
    fe.shift()();
}
function kt(e, t, n) {
  var s;
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const i = e.deps[e._depsLength];
    i !== t ? (i && Fe(i, e), e.deps[e._depsLength++] = t) : e._depsLength++, process.env.NODE_ENV !== "production" && ((s = e.onTrack) == null || s.call(e, _e({ effect: e }, n)));
  }
}
const fe = [];
function Ct(e, t, n) {
  var s;
  be();
  for (const i of e.keys()) {
    let r;
    i._dirtyLevel < t && (r ?? (r = e.get(i) === i._trackId)) && (i._shouldSchedule || (i._shouldSchedule = i._dirtyLevel === 0), i._dirtyLevel = t), i._shouldSchedule && (r ?? (r = e.get(i) === i._trackId)) && (process.env.NODE_ENV !== "production" && ((s = i.onTrigger) == null || s.call(i, _e({ effect: i }, n))), i.trigger(), (!i._runnings || i.allowRecurse) && i._dirtyLevel !== 2 && (i._shouldSchedule = !1, i.scheduler && fe.push(i.scheduler)));
  }
  we();
}
const At = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, ue = /* @__PURE__ */ new WeakMap(), W = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), $e = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
function D(e, t, n) {
  if (A && P) {
    let s = ue.get(e);
    s || ue.set(e, s = /* @__PURE__ */ new Map());
    let i = s.get(n);
    i || s.set(n, i = At(() => s.delete(n))), kt(
      P,
      i,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n
      } : void 0
    );
  }
}
function se(e, t, n, s, i, r) {
  const o = ue.get(e);
  if (!o)
    return;
  let c = [];
  if (t === "clear")
    c = [...o.values()];
  else if (n === "length" && _(e)) {
    const l = Number(s);
    o.forEach((f, u) => {
      (u === "length" || !M(u) && u >= l) && c.push(f);
    });
  } else
    switch (n !== void 0 && c.push(o.get(n)), t) {
      case "add":
        _(e) ? Ee(n) && c.push(o.get("length")) : (c.push(o.get(W)), te(e) && c.push(o.get($e)));
        break;
      case "delete":
        _(e) || (c.push(o.get(W)), te(e) && c.push(o.get($e)));
        break;
      case "set":
        te(e) && c.push(o.get(W));
        break;
    }
  be();
  for (const l of c)
    l && Ct(
      l,
      4,
      process.env.NODE_ENV !== "production" ? {
        target: e,
        type: t,
        key: n,
        newValue: s,
        oldValue: i,
        oldTarget: r
      } : void 0
    );
  we();
}
const Tt = /* @__PURE__ */ at("__proto__,__v_isRef,__isVue"), Ue = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(M)
), ke = /* @__PURE__ */ Mt();
function Mt() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = $(this);
      for (let r = 0, o = this.length; r < o; r++)
        D(s, "get", r + "");
      const i = s[t](...n);
      return i === -1 || i === !1 ? s[t](...n.map($)) : i;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Ze(), be();
      const s = $(this)[t].apply(this, n);
      return we(), Ge(), s;
    };
  }), e;
}
function It(e) {
  M(e) || (e = String(e));
  const t = $(this);
  return D(t, "has", e), t.hasOwnProperty(e);
}
class Ye {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    const i = this._isReadonly, r = this._isShallow;
    if (n === "__v_isReactive")
      return !i;
    if (n === "__v_isReadonly")
      return i;
    if (n === "__v_isShallow")
      return r;
    if (n === "__v_raw")
      return s === (i ? r ? Bt : Xe : r ? Dt : Qe).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const o = _(t);
    if (!i) {
      if (o && Z(ke, n))
        return Reflect.get(ke, n, s);
      if (n === "hasOwnProperty")
        return It;
    }
    const c = Reflect.get(t, n, s);
    return (M(n) ? Ue.has(n) : Tt(n)) || (i || D(t, "get", n), r) ? c : U(c) ? o && Ee(n) ? c : c.value : S(c) ? i ? Ht(c) : Q(c) : c;
  }
}
class Vt extends Ye {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, i) {
    let r = t[n];
    if (!this._isShallow) {
      const l = G(r);
      if (!Wt(s) && !G(s) && (r = $(r), s = $(s)), !_(t) && U(r) && !U(s))
        return l ? !1 : (r.value = s, !0);
    }
    const o = _(t) && Ee(n) ? Number(n) < t.length : Z(t, n), c = Reflect.set(t, n, s, i);
    return t === $(i) && (o ? re(s, r) && se(t, "set", n, s, r) : se(t, "add", n, s)), c;
  }
  deleteProperty(t, n) {
    const s = Z(t, n), i = t[n], r = Reflect.deleteProperty(t, n);
    return r && s && se(t, "delete", n, void 0, i), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!M(n) || !Ue.has(n)) && D(t, "has", n), s;
  }
  ownKeys(t) {
    return D(
      t,
      "iterate",
      _(t) ? "length" : W
    ), Reflect.ownKeys(t);
  }
}
class Lt extends Ye {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return process.env.NODE_ENV !== "production" && oe(
      `Set operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
  deleteProperty(t, n) {
    return process.env.NODE_ENV !== "production" && oe(
      `Delete operation on key "${String(n)}" failed: target is readonly.`,
      t
    ), !0;
  }
}
const jt = /* @__PURE__ */ new Vt(), Pt = /* @__PURE__ */ new Lt(), Qe = /* @__PURE__ */ new WeakMap(), Dt = /* @__PURE__ */ new WeakMap(), Xe = /* @__PURE__ */ new WeakMap(), Bt = /* @__PURE__ */ new WeakMap();
function Kt(e) {
  switch (e) {
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
function zt(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Kt(gt(e));
}
function Q(e) {
  return G(e) ? e : et(
    e,
    !1,
    jt,
    null,
    Qe
  );
}
function Ht(e) {
  return et(
    e,
    !0,
    Pt,
    null,
    Xe
  );
}
function et(e, t, n, s, i) {
  if (!S(e))
    return process.env.NODE_ENV !== "production" && oe(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = i.get(e);
  if (r)
    return r;
  const o = zt(e);
  if (o === 0)
    return e;
  const c = new Proxy(
    e,
    o === 2 ? s : n
  );
  return i.set(e, c), c;
}
function q(e) {
  return G(e) ? q(e.__v_raw) : !!(e && e.__v_isReactive);
}
function G(e) {
  return !!(e && e.__v_isReadonly);
}
function Wt(e) {
  return !!(e && e.__v_isShallow);
}
function $(e) {
  const t = e && e.__v_raw;
  return t ? $(t) : e;
}
function U(e) {
  return !!(e && e.__v_isRef === !0);
}
let ae = !1;
const Y = [], qt = Promise.resolve(), K = (e) => qt.then(e), Ce = (e) => {
  Y.includes(e) || Y.push(e), ae || (ae = !0, K(Ft));
}, Ft = () => {
  for (const e of Y)
    e();
  Y.length = 0, ae = !1;
}, Jt = /^(spellcheck|draggable|form|list|type|onclick)$/, he = ({
  el: e,
  get: t,
  effect: n,
  arg: s,
  modifiers: i
}) => {
  let r;
  e.className && (e._class = e.className), n(() => {
    let o = t();
    if (s)
      i?.camel && (s = yt(s)), ie(e, s, o, r);
    else {
      for (const c in o)
        ie(e, c, o[c], r && r[c]);
      for (const c in r)
        (!o || !(c in o)) && ie(e, c, null);
    }
    r = o;
  });
}, ie = (e, t, n, s) => {
  if (t === "class")
    e.setAttribute(
      "class",
      We(e._class ? [e._class, n] : n) || ""
    );
  else if (t === "style") {
    n = He(n);
    const { style: i } = e;
    if (!n)
      e.removeAttribute("style");
    else if (T(n))
      n !== s && (i.cssText = n);
    else {
      for (const r in n)
        pe(i, r, n[r]);
      if (s && !T(s))
        for (const r in s)
          n[r] == null && pe(i, r, "");
    }
  } else
    !(e instanceof SVGElement) && t in e && !Jt.test(t) ? (e[t] = n, t === "value" && (e._value = n)) : t === "true-value" ? e._trueValue = n : t === "false-value" ? e._falseValue = n : n != null ? e.setAttribute(t, n) : e.removeAttribute(t);
}, Ae = /\s*!important$/, pe = (e, t, n) => {
  _(n) ? n.forEach((s) => pe(e, t, s)) : t.startsWith("--") ? e.setProperty(t, n) : Ae.test(n) ? e.setProperty(
    ze(t),
    n.replace(Ae, ""),
    "important"
  ) : e[t] = n;
}, N = (e, t) => {
  const n = e.getAttribute(t);
  return n != null && e.removeAttribute(t), n;
}, R = (e, t, n, s) => {
  e.addEventListener(t, n, s);
}, Zt = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/, Gt = ["ctrl", "shift", "alt", "meta"], Ut = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => Gt.some((n) => e[`${n}Key`] && !t[n])
}, tt = ({ el: e, get: t, exp: n, arg: s, modifiers: i }) => {
  if (!s)
    return;
  let r = Zt.test(n) ? t(`(e => ${n}(e))`) : t(`($event => { ${n} })`);
  if (s === "vue:mounted") {
    K(r);
    return;
  } else if (s === "vue:unmounted")
    return () => r();
  if (i) {
    s === "click" && (i.right && (s = "contextmenu"), i.middle && (s = "mouseup"));
    const o = r;
    r = (c) => {
      if (!("key" in c && !(ze(c.key) in i))) {
        for (const l in i) {
          const f = Ut[l];
          if (f && f(c, i))
            return;
        }
        return o(c);
      }
    };
  }
  R(e, s, r, i);
}, Yt = ({ el: e, get: t, effect: n }) => {
  const s = e.style.display;
  n(() => {
    e.style.display = t() ? s : "none";
  });
}, nt = ({ el: e, get: t, effect: n }) => {
  n(() => {
    e.textContent = st(t());
  });
}, st = (e) => e == null ? "" : S(e) ? JSON.stringify(e, null, 2) : String(e), Qt = ({ el: e, modifiers: t, get: n, effect: s }) => {
  s(() => {
    e.innerHTML = n(), t?.script && K(() => {
      const i = e.querySelectorAll("script");
      for (const r of i) {
        const o = document.createElement("script");
        r.type && (o.type = r.type), r.src && (o.src = r.src), r.text && (o.text = r.text), r.parentElement?.insertBefore(o, r), r.remove();
      }
    });
  });
}, Xt = ({ el: e, exp: t, get: n, effect: s, modifiers: i }) => {
  const r = e.type, o = n(`(val) => { ${t} = val }`), { trim: c, number: l = r === "number" || r === "range" } = i || {};
  if (e.tagName === "SELECT") {
    const f = e;
    R(e, "change", () => {
      const u = Array.prototype.filter.call(f.options, (h) => h.selected).map(
        (h) => l ? Oe(O(h)) : O(h)
      );
      o(f.multiple ? u : u[0]);
    }), s(() => {
      const u = n(), h = f.multiple;
      for (let p = 0, d = f.options.length; p < d; p++) {
        const a = f.options[p], b = O(a);
        if (h)
          _(u) ? a.selected = ne(u, b) > -1 : a.selected = u.has(b);
        else if (j(O(a), u)) {
          f.selectedIndex !== p && (f.selectedIndex = p);
          return;
        }
      }
      !h && f.selectedIndex !== -1 && (f.selectedIndex = -1);
    });
  } else if (r === "checkbox") {
    R(e, "change", () => {
      const u = n(), h = e.checked;
      if (_(u)) {
        const p = O(e), d = ne(u, p), a = d !== -1;
        if (h && !a)
          o(u.concat(p));
        else if (!h && a) {
          const b = [...u];
          b.splice(d, 1), o(b);
        }
      } else
        o(Te(e, h));
    });
    let f;
    s(() => {
      const u = n();
      _(u) ? e.checked = ne(u, O(e)) > -1 : u !== f && (e.checked = j(
        u,
        Te(e, !0)
      )), f = u;
    });
  } else if (r === "radio") {
    R(e, "change", () => {
      o(O(e));
    });
    let f;
    s(() => {
      const u = n();
      u !== f && (e.checked = j(u, O(e)));
    });
  } else {
    const f = (u) => c ? u.trim() : l ? Oe(u) : u;
    R(e, "compositionstart", en), R(e, "compositionend", tn), R(e, i?.lazy ? "change" : "input", () => {
      e.composing || o(f(e.value));
    }), c && R(e, "change", () => {
      e.value = e.value.trim();
    }), s(() => {
      if (e.composing)
        return;
      const u = e.value, h = n();
      document.activeElement === e && f(u) === h || u !== h && (e.value = h);
    });
  }
}, O = (e) => "_value" in e ? e._value : e.value, Te = (e, t) => {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}, en = (e) => {
  e.target.composing = !0;
}, tn = (e) => {
  const t = e.target;
  t.composing && (t.composing = !1, nn(t, "input"));
}, nn = (e, t) => {
  const n = document.createEvent("HTMLEvents");
  n.initEvent(t, !0, !0), e.dispatchEvent(n);
}, Me = /* @__PURE__ */ Object.create(null), B = (e, t, n) => it(e, `return(${t})`, n), it = (e, t, n) => {
  const s = Me[t] || (Me[t] = sn(t));
  try {
    return s(e, n);
  } catch (i) {
    console.error(i);
  }
}, sn = (e) => {
  try {
    return new Function("$data", "$el", `with($data){${e}}`);
  } catch (t) {
    return console.error(`${t.message} in expression: ${e}`), () => {
    };
  }
}, rn = ({ el: e, ctx: t, exp: n, effect: s }) => {
  K(() => s(() => it(t.scope, n, e)));
}, on = {
  bind: he,
  on: tt,
  show: Yt,
  text: nt,
  html: Qt,
  model: Xt,
  effect: rn
}, cn = (e, t, n) => {
  const s = e.parentElement ? e.parentElement : e.parentNode, i = new Comment("v-if");
  s && s.insertBefore(i, e);
  const r = [
    {
      exp: t,
      el: e
    }
  ];
  let o, c;
  for (; (o = e.nextElementSibling) && (c = null, N(o, "v-else") === "" || (c = N(o, "v-else-if"))); )
    s && s.removeChild(o), r.push({ exp: c, el: o });
  const l = e.nextSibling;
  s && s.removeChild(e);
  let f, u = -1;
  const h = () => {
    f && (s && s.insertBefore(i, f.el), f.remove(), f = void 0);
  };
  return n.effect(() => {
    for (let p = 0; p < r.length; p++) {
      const { exp: d, el: a } = r[p];
      if (!d || B(n.scope, d)) {
        p !== u && (h(), f = new ve(a, n), f.insert(s, i), s && s.removeChild(i), u = p);
        return;
      }
    }
    u = -1, h();
  }), l;
}, ln = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/, Ie = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/, fn = /^\(|\)$/g, un = /^[{[]\s*((?:[\w_$]+\s*,?\s*)+)[\]}]$/, an = (e, t, n) => {
  const s = t.match(ln);
  if (!s)
    return;
  const i = e.nextSibling, r = e.parentElement, o = new Text("");
  r.insertBefore(o, e), r.removeChild(e);
  const c = s[2].trim();
  let l = s[1].trim().replace(fn, "").trim(), f, u = !1, h, p, d = "key", a = e.getAttribute(d) || e.getAttribute(d = ":key") || e.getAttribute(d = "v-bind:key");
  a && (e.removeAttribute(d), d === "key" && (a = JSON.stringify(a)));
  let b;
  (b = l.match(Ie)) && (l = l.replace(Ie, "").trim(), h = b[1].trim(), b[2] && (p = b[2].trim())), (b = l.match(un)) && (f = b[1].split(",").map((y) => y.trim()), u = l[0] === "[");
  let z = !1, k, H, X;
  const ut = (y) => {
    const w = /* @__PURE__ */ new Map(), m = [];
    if (_(y))
      for (let g = 0; g < y.length; g++)
        m.push(ee(w, y[g], g));
    else if (typeof y == "number")
      for (let g = 0; g < y; g++)
        m.push(ee(w, g + 1, g));
    else if (S(y)) {
      let g = 0;
      for (const E in y)
        m.push(ee(w, y[E], g++, E));
    }
    return [m, w];
  }, ee = (y, w, m, g) => {
    const E = {};
    f ? f.forEach(
      (C, x) => E[C] = w[u ? x : C]
    ) : E[l] = w, g ? (h && (E[h] = g), p && (E[p] = m)) : h && (E[h] = m);
    const I = ct(n, E), v = a ? B(I.scope, a) : m;
    return y.set(v, m), I.key = v, I;
  }, Se = (y, w) => {
    const m = new ve(e, y);
    return m.key = y.key, m.insert(r, w), m;
  };
  return n.effect(() => {
    const y = B(n.scope, c), w = X;
    if ([H, X] = ut(y), !z)
      k = H.map((m) => Se(m, o)), z = !0;
    else {
      for (let v = 0; v < k.length; v++)
        X.has(k[v].key) || k[v].remove();
      const m = [];
      let g = H.length, E, I;
      for (; g--; ) {
        const v = H[g], C = w.get(v.key);
        let x;
        C == null ? x = Se(
          v,
          E ? E.el : o
        ) : (x = k[C], Object.assign(x.ctx.scope, v.scope), C !== g && (k[C + 1] !== E || // If the next has moved, it must move too
        I === E) && (I = x, x.insert(r, E ? E.el : o))), m.unshift(E = x);
      }
      k = m;
    }
  }), i;
}, de = ({
  el: e,
  ctx: {
    scope: { $refs: t }
  },
  get: n,
  effect: s
}) => {
  let i;
  return s(() => {
    const r = n();
    t[r] = e, i && r !== i && delete t[i], i = r;
  }), () => {
    i && delete t[i];
  };
}, hn = /^(?:v-|:|@)/, pn = /\.([\w-]+)/g;
let me = !1;
const rt = (e, t) => {
  const n = t, s = e.nodeType;
  if (s === 1) {
    const i = e;
    if (i.hasAttribute("v-pre"))
      return;
    N(i, "v-cloak");
    let r;
    if (r = N(i, "v-if"))
      return cn(i, r, t);
    if (r = N(i, "v-for"))
      return an(i, r, t);
    if ((r = N(i, "v-scope")) || r === "") {
      const l = r ? B(t.scope, r, i) : {};
      l.$root = i, t = ct(t, l), l.$template && dn(i, l.$template);
    }
    const o = N(i, "v-once") != null;
    o && (me = !0), (r = N(i, "ref")) && (t !== n && F(i, de, `"${r}"`, n), F(i, de, `"${r}"`, t)), Ve(i, t);
    const c = [];
    for (const { name: l, value: f } of [...i.attributes])
      hn.test(l) && l !== "v-cloak" && (l === "v-model" ? c.unshift([l, f]) : l[0] === "@" || /^v-on\b/.test(l) ? c.push([l, f]) : Le(i, l, f, t));
    for (const [l, f] of c)
      Le(i, l, f, t);
    o && (me = !1);
  } else if (s === 3) {
    const i = e.data;
    if (i.includes(t.delimiters[0])) {
      let r = [], o = 0, c;
      for (; c = t.delimitersRE.exec(i); ) {
        const l = i.slice(o, c.index);
        l && r.push(JSON.stringify(l)), r.push(`$s(${c[1]})`), o = c.index + c[0].length;
      }
      o < i.length && r.push(JSON.stringify(i.slice(o))), F(e, nt, r.join("+"), t);
    }
  } else
    s === 11 && Ve(e, t);
}, Ve = (e, t) => {
  let n = e.firstChild;
  for (; n; )
    n = rt(n, t) || n.nextSibling;
}, Le = (e, t, n, s) => {
  let i, r, o;
  const c = t;
  if (t = t.replace(pn, (l, f) => ((o || (o = {}))[f] = !0, "")), t[0] === ":")
    i = he, r = t.slice(1);
  else if (t[0] === "@")
    i = tt, r = t.slice(1);
  else {
    const l = t.indexOf(":"), f = l > 0 ? t.slice(2, l) : t.slice(2);
    i = on[f] || s.dirs[f], r = l > 0 ? t.slice(l + 1) : void 0;
  }
  i && (i === he && r === "ref" && (i = de), F(e, i, n, s, r, o), e.removeAttribute(c));
}, F = (e, t, n, s, i, r) => {
  const c = t({
    el: e,
    get: (l = n) => B(s.scope, l, e),
    effect: s.effect,
    ctx: s,
    exp: n,
    arg: i,
    modifiers: r
  });
  c && s.cleanups.push(c);
}, dn = (e, t) => {
  if (t[0] === "#") {
    const n = document.querySelector(t);
    e.appendChild(n.content.cloneNode(!0));
    return;
  }
  e.innerHTML = t.replace(/<[\/\s]*template\s*>/ig, "");
}, ot = (e) => {
  const t = {
    delimiters: ["{{", "}}"],
    delimitersRE: /\{\{([^]+?)\}\}/g,
    ...e,
    scope: e ? e.scope : Q({}),
    dirs: e ? e.dirs : {},
    effects: [],
    blocks: [],
    cleanups: [],
    effect: (n) => {
      if (me)
        return Ce(n), n;
      const s = Nt(n, {
        scheduler: () => Ce(s)
      });
      return t.effects.push(s), s;
    }
  };
  return t;
}, ct = (e, t = {}) => {
  const n = e.scope, s = Object.create(n);
  Object.defineProperties(s, Object.getOwnPropertyDescriptors(t)), s.$refs = Object.create(n.$refs);
  const i = Q(
    new Proxy(s, {
      set(r, o, c, l) {
        return l === i && !Z(r, o) ? Reflect.set(n, o, c) : Reflect.set(r, o, c, l);
      }
    })
  );
  return lt(i), {
    ...e,
    scope: i
  };
}, lt = (e) => {
  for (const t of Object.keys(e))
    typeof e[t] == "function" && (e[t] = e[t].bind(e));
};
class ve {
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
  constructor(t, n, s = !1) {
    this.isFragment = t instanceof HTMLTemplateElement, s ? this.template = t : this.isFragment ? this.template = t.content.cloneNode(
      !0
    ) : this.template = t.cloneNode(!0), s ? this.ctx = n : (this.parentCtx = n, n.blocks.push(this), this.ctx = ot(n)), rt(this.template, this.ctx);
  }
  insert(t, n = null) {
    if (this.isFragment)
      if (this.start) {
        let s = this.start, i;
        for (; s && (i = s.nextSibling, t.insertBefore(s, n), s !== this.end); )
          s = i;
      } else
        this.start = new Text(""), this.end = new Text(""), t.insertBefore(this.end, n), t.insertBefore(this.start, this.end), t.insertBefore(this.template, this.end);
    else
      t.insertBefore(this.template, n);
  }
  remove() {
    if (this.parentCtx && ht(this.parentCtx.blocks, this), this.start) {
      const t = this.start.parentNode;
      let n = this.start, s;
      for (; n && (s = n.nextSibling, t.removeChild(n), n !== this.end); )
        n = s;
    } else
      try {
        this.template.isConnected && this.template.parentNode.removeChild(this.template);
      } catch (t) {
        console.log("petite-vue: Unable to remove template"), console.log(t), console.log(this.template);
      }
    this.teardown();
  }
  teardown() {
    this.ctx.blocks.forEach((t) => {
      t.teardown();
    }), this.ctx.effects.forEach($t), this.ctx.cleanups.forEach((t) => t());
  }
}
function J(e, t, n) {
  let s;
  try {
    s = n ? e(...n) : e();
  } catch (i) {
    ft(i, t);
  }
  return s;
}
function ge(e, t, n) {
  if (L(e)) {
    const i = J(e, t, n);
    return i && dt(i) && i.catch((r) => {
      ft(r, t);
    }), i;
  }
  const s = [];
  for (let i = 0; i < e.length; i++)
    s.push(ge(e[i], t, n));
  return s;
}
function ft(e, t) {
  console.error(new Error(`[@vue-reactivity/watch]: ${t}`)), console.error(e);
}
function mn(e) {
  console.warn(gn(e));
}
function gn(e) {
  return new Error(`[reactivue]: ${e}`);
}
const je = {};
function _n(e, t, n) {
  return yn(e, t, n);
}
function yn(e, t, { immediate: n, deep: s, flush: i } = {}) {
  let r, o = !1, c = !1;
  if (q(e) ? (r = () => e, s = !0) : _(e) ? (c = !0, o = e.some(q), r = () => e.map((a) => U(a) ? a.value : q(a) ? V(a) : L(a) ? J(a, "watch getter") : mn("invalid source"))) : L(e) ? t ? r = () => J(e, "watch getter") : r = () => (l && l(), ge(
    e,
    "watch callback",
    [f]
  )) : r = Be, t && s) {
    const a = r;
    r = () => V(a());
  }
  let l, f = (a) => {
    l = d.onStop = () => {
      J(a, "watch cleanup");
    };
  }, u = c ? [] : je;
  const h = () => {
    if (d.active)
      if (t) {
        const a = d.run();
        (s || o || (c ? a.some(
          (b, z) => re(b, u[z])
        ) : re(a, u))) && (l && l(), ge(t, "watch value", [
          a,
          // pass undefined as the old value when it's changed for the first time
          u === je ? void 0 : u,
          f
        ]), u = a);
      } else
        d.run();
  };
  h.allowRecurse = !!t;
  let p;
  i === "sync" ? p = h : p = () => {
    h();
  };
  const d = new ce(r, p);
  return t ? n ? h() : u = d.run() : d.run(), () => d.stop();
}
function V(e, t = /* @__PURE__ */ new Set()) {
  if (!S(e) || t.has(e))
    return e;
  if (t.add(e), _(e))
    for (let n = 0; n < e.length; n++)
      V(e[n], t);
  else if (e instanceof Map)
    e.forEach((n, s) => {
      V(e.get(s), t);
    });
  else if (e instanceof Set)
    e.forEach((n) => {
      V(n, t);
    });
  else
    for (const n of Object.keys(e))
      V(e[n], t);
  return e;
}
const Pe = (e) => e.replace(/[-.*+?^${}()|[\]\/\\]/g, "\\$&"), En = (e) => {
  const t = ot();
  if (e && (t.scope = Q(e), lt(t.scope), e.$delimiters)) {
    const [s, i] = t.delimiters = e.$delimiters;
    t.delimitersRE = new RegExp(
      Pe(s) + "([^]+?)" + Pe(i),
      "g"
    );
  }
  t.scope.$s = st, t.scope.$nextTick = K, t.scope.$refs = /* @__PURE__ */ Object.create(null), t.scope.$watch = _n;
  let n;
  return {
    directive(s, i) {
      return i ? (t.dirs[s] = i, this) : t.dirs[s];
    },
    use(s, i = {}) {
      return s.install(this, i), this;
    },
    mount(s) {
      if (typeof s == "string" && (s = document.querySelector(s), !s))
        return;
      s = s || document.documentElement;
      let i;
      return s.hasAttribute("v-scope") ? i = [s] : i = [...s.querySelectorAll("[v-scope]")].filter(
        (r) => !r.matches("[v-scope] [v-scope]")
      ), i.length || (i = [s]), n = i.map((r) => new ve(r, t, !0)), this;
    },
    unmount() {
      n.forEach((s) => s.teardown());
    }
  };
}, bn = "0.4.6", De = document.currentScript;
De && De.hasAttribute("init") && En().mount();
export {
  En as createApp,
  Nt as effect,
  K as nextTick,
  Q as reactive,
  bn as version
};
