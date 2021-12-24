!function (t, e) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).sc = e()
}(this, function () {
    "use strict";
    var t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function e(t, e) {
        return t(e = {exports: {}}, e.exports), e.exports
    }

    function n(t) {
        return t && t.Math == Math && t
    }

    function f(t) {
        try {
            return !!t()
        } catch (t) {
            return !0
        }
    }

    function y(t, e) {
        return {enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: e}
    }

    function o(t) {
        return C.call(t).slice(8, -1)
    }

    function p(t) {
        if (null == t) throw TypeError("Can't call method on " + t);
        return t
    }

    function l(t) {
        return P(p(t))
    }

    function i(t, e) {
        if (!O(t)) return t;
        var n, r;
        if (e && "function" == typeof (n = t.toString) && !O(r = n.call(t))) return r;
        if ("function" == typeof (n = t.valueOf) && !O(r = n.call(t))) return r;
        if (!e && "function" == typeof (n = t.toString) && !O(r = n.call(t))) return r;
        throw TypeError("Can't convert object to primitive value")
    }

    function a(t) {
        return k ? E.createElement(t) : {}
    }

    function s(e, n) {
        try {
            M(v, e, n)
        } catch (t) {
            v[e] = n
        }
        return n
    }

    function c(t) {
        return "Symbol(" + String(void 0 === t ? "" : t) + ")_" + (++G + J).toString(36)
    }

    function r(t) {
        return H[t] || (H[t] = c(t))
    }

    var u, d, g, h = "object",
        v = n(typeof globalThis == h && globalThis) || n(typeof window == h && window) || n(typeof self == h && self) || n(typeof t == h && t) || Function("return this")(),
        S = !f(function () {
            return 7 != Object.defineProperty({}, "a", {
                get: function () {
                    return 7
                }
            }).a
        }), m = {}.propertyIsEnumerable, b = Object.getOwnPropertyDescriptor, A = {
            f: b && !m.call({1: 2}, 1) ? function (t) {
                var e = b(this, t);
                return !!e && e.enumerable
            } : m
        }, C = {}.toString, w = "".split, P = f(function () {
            return !Object("z").propertyIsEnumerable(0)
        }) ? function (t) {
            return "String" == o(t) ? w.call(t, "") : Object(t)
        } : Object, O = function (t) {
            return "object" == typeof t ? null !== t : "function" == typeof t
        }, T = {}.hasOwnProperty, x = function (t, e) {
            return T.call(t, e)
        }, E = v.document, k = O(E) && O(E.createElement), I = !S && !f(function () {
            return 7 != Object.defineProperty(a("div"), "a", {
                get: function () {
                    return 7
                }
            }).a
        }), j = Object.getOwnPropertyDescriptor, L = {
            f: S ? j : function (t, e) {
                if (t = l(t), e = i(e, !0), I) try {
                    return j(t, e)
                } catch (t) {
                }
                if (x(t, e)) return y(!A.f.call(t, e), t[e])
            }
        }, R = function (t) {
            if (!O(t)) throw TypeError(String(t) + " is not an object");
            return t
        }, N = Object.defineProperty, _ = {
            f: S ? N : function (t, e, n) {
                if (R(t), e = i(e, !0), R(n), I) try {
                    return N(t, e, n)
                } catch (t) {
                }
                if ("get" in n || "set" in n) throw TypeError("Accessors not supported");
                return "value" in n && (t[e] = n.value), t
            }
        }, M = S ? function (t, e, n) {
            return _.f(t, e, y(1, n))
        } : function (t, e, n) {
            return t[e] = n, t
        }, D = e(function (t) {
            var e = "__core-js_shared__", n = v[e] || s(e, {});
            (t.exports = function (t, e) {
                return n[t] || (n[t] = void 0 !== e ? e : {})
            })("versions", []).push({version: "3.2.1", mode: "global", copyright: "© 2019 Denis Pushkarev (zloirock.ru)"})
        }), B = D("native-function-to-string", Function.toString), F = v.WeakMap,
        V = "function" == typeof F && /native code/.test(B.call(F)), G = 0, J = Math.random(), H = D("keys"), W = {},
        U = v.WeakMap;
    if (V) {
        var $ = new U, q = $.get, z = $.has, Q = $.set;
        u = function (t, e) {
            return Q.call($, t, e), e
        }, d = function (t) {
            return q.call($, t) || {}
        }, g = function (t) {
            return z.call($, t)
        }
    } else {
        var X = r("state");
        W[X] = !0, u = function (t, e) {
            return M(t, X, e), e
        }, d = function (t) {
            return x(t, X) ? t[X] : {}
        }, g = function (t) {
            return x(t, X)
        }
    }

    function Y(t) {
        return "function" == typeof t ? t : void 0
    }

    function K(t, e) {
        return arguments.length < 2 ? Y(ht[t]) || Y(v[t]) : ht[t] && ht[t][e] || v[t] && v[t][e]
    }

    function Z(t) {
        return isNaN(t = +t) ? 0 : (0 < t ? yt : vt)(t)
    }

    function tt(t) {
        return 0 < t ? St(Z(t), 9007199254740991) : 0
    }

    function et(t, e) {
        var n = Z(t);
        return n < 0 ? mt(n + e, 0) : bt(n, e)
    }

    function nt(c) {
        return function (t, e, n) {
            var r, o = l(t), i = tt(o.length), a = et(n, i);
            if (c && e != e) {
                for (; a < i;) if ((r = o[a++]) != r) return !0
            } else for (; a < i; a++) if ((c || a in o) && o[a] === e) return c || a || 0;
            return !c && -1
        }
    }

    function rt(t, e) {
        var n, r = l(t), o = 0, i = [];
        for (n in r) !x(W, n) && x(r, n) && i.push(n);
        for (; e.length > o;) x(r, n = e[o++]) && (~Ct(i, n) || i.push(n));
        return i
    }

    function ot(t, e) {
        for (var n = xt(e), r = _.f, o = L.f, i = 0; i < n.length; i++) {
            var a = n[i];
            x(t, a) || r(t, a, o(e, a))
        }
    }

    function it(t, e) {
        var n = It[kt(t)];
        return n == Lt || n != jt && ("function" == typeof e ? f(e) : !!e)
    }

    function at(t, e) {
        var n, r, o, i, a, c = t.target, u = t.global, l = t.stat;
        if (n = u ? v : l ? v[c] || s(c, {}) : (v[c] || {}).prototype) for (r in e) {
            if (i = e[r], o = t.noTargetGet ? (a = Nt(n, r)) && a.value : n[r], !Rt(u ? r : c + (l ? "." : "#") + r, t.forced) && void 0 !== o) {
                if (typeof i == typeof o) continue;
                ot(i, o)
            }
            (t.sham || o && o.sham) && M(i, "sham", !0), gt(n, r, i, t)
        }
    }

    function ct(t) {
        if ("function" != typeof t) throw TypeError(String(t) + " is not a function");
        return t
    }

    function ut(t) {
        return Object(p(t))
    }

    function lt(t) {
        return Bt[t] || (Bt[t] = Mt && Dt[t] || (Mt ? Dt : c)("Symbol." + t))
    }

    function st(t, e) {
        var n;
        return _t(t) && ("function" != typeof (n = t.constructor) || n !== Array && !_t(n.prototype) ? O(n) && null === (n = n[Ft]) && (n = void 0) : n = void 0), new (void 0 === n ? Array : n)(0 === e ? 0 : e)
    }

    function ft(d) {
        var g = 1 == d, h = 2 == d, v = 3 == d, y = 4 == d, S = 6 == d, m = 5 == d || S;
        return function (t, e, n, r) {
            for (var o, i, a = ut(t), c = P(a), u = function (r, o, t) {
                if (ct(r), void 0 === o) return r;
                switch (t) {
                    case 0:
                        return function () {
                            return r.call(o)
                        };
                    case 1:
                        return function (t) {
                            return r.call(o, t)
                        };
                    case 2:
                        return function (t, e) {
                            return r.call(o, t, e)
                        };
                    case 3:
                        return function (t, e, n) {
                            return r.call(o, t, e, n)
                        }
                }
                return function () {
                    return r.apply(o, arguments)
                }
            }(e, n, 3), l = tt(c.length), s = 0, f = r || st, p = g ? f(t, l) : h ? f(t, 0) : void 0; s < l; s++) if ((m || s in c) && (i = u(o = c[s], s, a), d)) if (g) p[s] = i; else if (i) switch (d) {
                case 3:
                    return !0;
                case 5:
                    return o;
                case 6:
                    return s;
                case 2:
                    Vt.call(p, o)
            } else if (y) return !1;
            return S ? -1 : v || y ? y : p
        }
    }

    function pt(t, e) {
        var n = [][t];
        return !n || !f(function () {
            n.call(null, e || function () {
                throw 1
            }, 1)
        })
    }

    var dt = {
            set: u, get: d, has: g, enforce: function (t) {
                return g(t) ? d(t) : u(t, {})
            }, getterFor: function (n) {
                return function (t) {
                    var e;
                    if (!O(t) || (e = d(t)).type !== n) throw TypeError("Incompatible receiver, " + n + " required");
                    return e
                }
            }
        }, gt = e(function (t) {
            var e = dt.get, c = dt.enforce, u = String(B).split("toString");
            D("inspectSource", function (t) {
                return B.call(t)
            }), (t.exports = function (t, e, n, r) {
                var o = !!r && !!r.unsafe, i = !!r && !!r.enumerable, a = !!r && !!r.noTargetGet;
                "function" == typeof n && ("string" != typeof e || x(n, "name") || M(n, "name", e), c(n).source = u.join("string" == typeof e ? e : "")), t !== v ? (o ? !a && t[e] && (i = !0) : delete t[e], i ? t[e] = n : M(t, e, n)) : i ? t[e] = n : s(e, n)
            })(Function.prototype, "toString", function () {
                return "function" == typeof this && e(this).source || B.call(this)
            })
        }), ht = v, vt = Math.ceil, yt = Math.floor, St = Math.min, mt = Math.max, bt = Math.min,
        At = {includes: nt(!0), indexOf: nt(!1)}, Ct = At.indexOf,
        wt = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
        Pt = wt.concat("length", "prototype"), Ot = {
            f: Object.getOwnPropertyNames || function (t) {
                return rt(t, Pt)
            }
        }, Tt = {f: Object.getOwnPropertySymbols}, xt = K("Reflect", "ownKeys") || function (t) {
            var e = Ot.f(R(t)), n = Tt.f;
            return n ? e.concat(n(t)) : e
        }, Et = /#|\.prototype\./, kt = it.normalize = function (t) {
            return String(t).replace(Et, ".").toLowerCase()
        }, It = it.data = {}, jt = it.NATIVE = "N", Lt = it.POLYFILL = "P", Rt = it, Nt = L.f,
        _t = Array.isArray || function (t) {
            return "Array" == o(t)
        }, Mt = !!Object.getOwnPropertySymbols && !f(function () {
            return !String(Symbol())
        }), Dt = v.Symbol, Bt = D("wks"), Ft = lt("species"), Vt = [].push,
        Gt = {forEach: ft(0), map: ft(1), filter: ft(2), some: ft(3), every: ft(4), find: ft(5), findIndex: ft(6)},
        Jt = Gt.forEach, Ht = pt("forEach") ? function (t, e) {
            return Jt(this, t, 1 < arguments.length ? e : void 0)
        } : [].forEach;
    at({target: "Array", proto: !0, forced: [].forEach != Ht}, {forEach: Ht});

    function Wt() {
    }

    var Ut = Object.keys || function (t) {
        return rt(t, wt)
    }, $t = S ? Object.defineProperties : function (t, e) {
        R(t);
        for (var n, r = Ut(e), o = r.length, i = 0; i < o;) _.f(t, n = r[i++], e[n]);
        return t
    }, qt = K("document", "documentElement"), zt = r("IE_PROTO"), Qt = "prototype", Xt = function () {
        var t, e = a("iframe"), n = wt.length, r = "script";
        for (e.style.display = "none", qt.appendChild(e), e.src = String("javascript:"), (t = e.contentWindow.document).open(), t.write("<script>document.F=Object</" + r + ">"), t.close(), Xt = t.F; n--;) delete Xt[Qt][wt[n]];
        return Xt()
    }, Yt = Object.create || function (t, e) {
        var n;
        return null !== t ? (Wt[Qt] = R(t), n = new Wt, Wt[Qt] = null, n[zt] = t) : n = Xt(), void 0 === e ? n : $t(n, e)
    };
    W[zt] = !0;
    var Kt = lt("unscopables"), Zt = Array.prototype;
    null == Zt[Kt] && M(Zt, Kt, Yt(null));

    function te(t) {
        Zt[Kt][t] = !0
    }

    var ee, ne, re, oe = !f(function () {
        function t() {
        }

        return t.prototype.constructor = null, Object.getPrototypeOf(new t) !== t.prototype
    }), ie = r("IE_PROTO"), ae = Object.prototype, ce = oe ? Object.getPrototypeOf : function (t) {
        return t = ut(t), x(t, ie) ? t[ie] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? ae : null
    }, ue = lt("iterator"), le = !1;
    [].keys && ("next" in (re = [].keys()) ? (ne = ce(ce(re))) !== Object.prototype && (ee = ne) : le = !0), null == ee && (ee = {}), x(ee, ue) || M(ee, ue, function () {
        return this
    });

    function se(t, e, n) {
        t && !x(t = n ? t : t.prototype, he) && ge(t, he, {configurable: !0, value: e})
    }

    function fe() {
        return this
    }

    function pe(t, e, n, r, o, i, a) {
        function c(t) {
            if (t === o && h) return h;
            if (!me && t in d) return d[t];
            switch (t) {
                case"keys":
                case Ae:
                case Ce:
                    return function () {
                        return new n(this, t)
                    }
            }
            return function () {
                return new n(this)
            }
        }

        !function (t, e, n) {
            var r = e + " Iterator";
            t.prototype = Yt(ve, {next: y(1, n)}), se(t, r, !1)
        }(n, e, r);
        var u, l, s, f = e + " Iterator", p = !1, d = t.prototype, g = d[be] || d["@@iterator"] || o && d[o],
            h = !me && g || c(o), v = "Array" == e && d.entries || g;
        if (v && (u = ce(v.call(new t)), Se !== Object.prototype && u.next && (ce(u) !== Se && (ye ? ye(u, Se) : "function" != typeof u[be] && M(u, be, fe)), se(u, f, !0))), o == Ae && g && g.name !== Ae && (p = !0, h = function () {
            return g.call(this)
        }), d[be] !== h && M(d, be, h), o) if (l = {
            values: c(Ae),
            keys: i ? h : c("keys"),
            entries: c(Ce)
        }, a) for (s in l) !me && !p && s in d || gt(d, s, l[s]); else at({target: e, proto: !0, forced: me || p}, l);
        return l
    }

    var de = {IteratorPrototype: ee, BUGGY_SAFARI_ITERATORS: le}, ge = _.f, he = lt("toStringTag"),
        ve = de.IteratorPrototype, ye = Object.setPrototypeOf || ("__proto__" in {} ? function () {
            var n, r = !1, t = {};
            try {
                (n = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(t, []), r = t instanceof Array
            } catch (t) {
            }
            return function (t, e) {
                return R(t), function (t) {
                    if (!O(t) && null !== t) throw TypeError("Can't set " + String(t) + " as a prototype")
                }(e), r ? n.call(t, e) : t.__proto__ = e, t
            }
        }() : void 0), Se = de.IteratorPrototype, me = de.BUGGY_SAFARI_ITERATORS, be = lt("iterator"), Ae = "values",
        Ce = "entries", we = "Array Iterator", Pe = dt.set, Oe = dt.getterFor(we),
        Te = pe(Array, "Array", function (t, e) {
            Pe(this, {type: we, target: l(t), index: 0, kind: e})
        }, function () {
            var t = Oe(this), e = t.target, n = t.kind, r = t.index++;
            return !e || r >= e.length ? {value: t.target = void 0, done: !0} : "keys" == n ? {
                value: r,
                done: !1
            } : "values" == n ? {value: e[r], done: !1} : {value: [r, e[r]], done: !1}
        }, "values");
    te("keys"), te("values"), te("entries"), at({
        target: "Object",
        stat: !0,
        forced: !S,
        sham: !S
    }, {defineProperty: _.f});
    var xe = f(function () {
        Ut(1)
    });
    at({target: "Object", stat: !0, forced: xe}, {
        keys: function (t) {
            return Ut(ut(t))
        }
    });
    var Ee = lt("toStringTag"), ke = "Arguments" == o(function () {
        return arguments
    }()), Ie = {};
    Ie[lt("toStringTag")] = "z";
    var je = "[object z]" !== String(Ie) ? function () {
        return "[object " + function (t) {
            var e, n, r;
            return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (n = function (t, e) {
                try {
                    return t[e]
                } catch (t) {
                }
            }(e = Object(t), Ee)) ? n : ke ? o(e) : "Object" == (r = o(e)) && "function" == typeof e.callee ? "Arguments" : r
        }(this) + "]"
    } : Ie.toString, Le = Object.prototype;
    je !== Le.toString && gt(Le, "toString", je, {unsafe: !0}), at({
        target: "Reflect",
        stat: !0
    }, {
        get: function t(e, n) {
            var r, o, i = arguments.length < 3 ? e : arguments[2];
            return R(e) === i ? e[n] : (r = L.f(e, n)) ? x(r, "value") ? r.value : void 0 === r.get ? void 0 : r.get.call(i) : O(o = ce(e)) ? t(o, n, i) : void 0
        }
    });
    var Re = {
        CSSRuleList: 0,
        CSSStyleDeclaration: 0,
        CSSValueList: 0,
        ClientRectList: 0,
        DOMRectList: 0,
        DOMStringList: 0,
        DOMTokenList: 1,
        DataTransferItemList: 0,
        FileList: 0,
        HTMLAllCollection: 0,
        HTMLCollection: 0,
        HTMLFormElement: 0,
        HTMLSelectElement: 0,
        MediaList: 0,
        MimeTypeArray: 0,
        NamedNodeMap: 0,
        NodeList: 1,
        PaintRequestList: 0,
        Plugin: 0,
        PluginArray: 0,
        SVGLengthList: 0,
        SVGNumberList: 0,
        SVGPathSegList: 0,
        SVGPointList: 0,
        SVGStringList: 0,
        SVGTransformList: 0,
        SourceBufferList: 0,
        StyleSheetList: 0,
        TextTrackCueList: 0,
        TextTrackList: 0,
        TouchList: 0
    };
    for (var Ne in Re) {
        var _e = v[Ne], Me = _e && _e.prototype;
        if (Me && Me.forEach !== Ht) try {
            M(Me, "forEach", Ht)
        } catch (t) {
            Me.forEach = Ht
        }
    }
    var De = lt("iterator"), Be = lt("toStringTag"), Fe = Te.values;
    for (var Ve in Re) {
        var Ge = v[Ve], Je = Ge && Ge.prototype;
        if (Je) {
            if (Je[De] !== Fe) try {
                M(Je, De, Fe)
            } catch (t) {
                Je[De] = Fe
            }
            if (Je[Be] || M(Je, Be, Ve), Re[Ve]) for (var He in Te) if (Je[He] !== Te[He]) try {
                M(Je, He, Te[He])
            } catch (t) {
                Je[He] = Te[He]
            }
        }
    }

    function We(t, e, n) {
        var r = i(e);
        r in t ? _.f(t, r, y(0, n)) : t[r] = n
    }

    function Ue(e) {
        return !f(function () {
            var t = [];
            return (t.constructor = {})[qe] = function () {
                return {foo: 1}
            }, 1 !== t[e](Boolean).foo
        })
    }

    function $e(t) {
        if (!O(t)) return !1;
        var e = t[ze];
        return void 0 !== e ? !!e : _t(t)
    }

    var qe = lt("species"), ze = lt("isConcatSpreadable"), Qe = 9007199254740991, Xe = "Maximum allowed index exceeded",
        Ye = !f(function () {
            var t = [];
            return t[ze] = !1, t.concat()[0] !== t
        }), Ke = Ue("concat");
    at({target: "Array", proto: !0, forced: !Ye || !Ke}, {
        concat: function (t) {
            var e, n, r, o, i, a = arguments, c = ut(this), u = st(c, 0), l = 0;
            for (e = -1, r = arguments.length; e < r; e++) if ($e(i = -1 === e ? c : a[e])) {
                if (o = tt(i.length), Qe < l + o) throw TypeError(Xe);
                for (n = 0; n < o; n++, l++) n in i && We(u, l, i[n])
            } else {
                if (Qe <= l) throw TypeError(Xe);
                We(u, l++, i)
            }
            return u.length = l, u
        }
    });
    var Ze = Gt.findIndex, tn = "findIndex", en = !0;
    tn in [] && Array(1)[tn](function () {
        en = !1
    }), at({target: "Array", proto: !0, forced: en}, {
        findIndex: function (t, e) {
            return Ze(this, t, 1 < arguments.length ? e : void 0)
        }
    }), te(tn);
    var nn = At.includes;
    at({target: "Array", proto: !0}, {
        includes: function (t, e) {
            return nn(this, t, 1 < arguments.length ? e : void 0)
        }
    }), te("includes");
    var rn = [].join, on = P != Object, an = pt("join", ",");
    at({target: "Array", proto: !0, forced: on || an}, {
        join: function (t) {
            return rn.call(l(this), void 0 === t ? "," : t)
        }
    });
    var cn = lt("species"), un = [].slice, ln = Math.max;
    at({target: "Array", proto: !0, forced: !Ue("slice")}, {
        slice: function (t, e) {
            var n, r, o, i = l(this), a = tt(i.length), c = et(t, a), u = et(void 0 === e ? a : e, a);
            if (_t(i) && ("function" != typeof (n = i.constructor) || n !== Array && !_t(n.prototype) ? O(n) && null === (n = n[cn]) && (n = void 0) : n = void 0, n === Array || void 0 === n)) return un.call(i, c, u);
            for (r = new (void 0 === n ? Array : n)(ln(u - c, 0)), o = 0; c < u; c++, o++) c in i && We(r, o, i[c]);
            return r.length = o, r
        }
    });
    var sn = Math.max, fn = Math.min;
    at({target: "Array", proto: !0, forced: !Ue("splice")}, {
        splice: function (t, e) {
            var n, r, o, i, a, c, u = arguments, l = ut(this), s = tt(l.length), f = et(t, s), p = arguments.length;
            if (0 === p ? n = r = 0 : r = 1 === p ? (n = 0, s - f) : (n = p - 2, fn(sn(Z(e), 0), s - f)), 9007199254740991 < s + n - r) throw TypeError("Maximum allowed length exceeded");
            for (o = st(l, r), i = 0; i < r; i++) (a = f + i) in l && We(o, i, l[a]);
            if (n < (o.length = r)) {
                for (i = f; i < s - r; i++) c = i + n, (a = i + r) in l ? l[c] = l[a] : delete l[c];
                for (i = s; s - r + n < i; i--) delete l[i - 1]
            } else if (r < n) for (i = s - r; f < i; i--) c = i + n - 1, (a = i + r - 1) in l ? l[c] = l[a] : delete l[c];
            for (i = 0; i < n; i++) l[i + f] = u[i + 2];
            return l.length = s - r + n, o
        }
    });
    var pn = _.f, dn = Function.prototype, gn = dn.toString, hn = /^\s*function ([^ (]*)/;
    !S || "name" in dn || pn(dn, "name", {
        configurable: !0, get: function () {
            try {
                return gn.call(this).match(hn)[1]
            } catch (t) {
                return ""
            }
        }
    });
    var vn = Object.assign, yn = !vn || f(function () {
        var t = {}, e = {}, n = Symbol(), r = "abcdefghijklmnopqrst";
        return t[n] = 7, r.split("").forEach(function (t) {
            e[t] = t
        }), 7 != vn({}, t)[n] || Ut(vn({}, e)).join("") != r
    }) ? function (t, e) {
        for (var n = arguments, r = ut(t), o = arguments.length, i = 1, a = Tt.f, c = A.f; i < o;) for (var u, l = P(n[i++]), s = a ? Ut(l).concat(a(l)) : Ut(l), f = s.length, p = 0; p < f;) u = s[p++], S && !c.call(l, u) || (r[u] = l[u]);
        return r
    } : vn;
    at({target: "Object", stat: !0, forced: Object.assign !== yn}, {assign: yn});

    function Sn() {
        var t = R(this), e = "";
        return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), t.dotAll && (e += "s"), t.unicode && (e += "u"), t.sticky && (e += "y"), e
    }

    var mn, bn, An = RegExp.prototype.exec, Cn = String.prototype.replace, wn = An,
        Pn = (mn = /a/, bn = /b*/g, An.call(mn, "a"), An.call(bn, "a"), 0 !== mn.lastIndex || 0 !== bn.lastIndex),
        On = void 0 !== /()??/.exec("")[1];
    (Pn || On) && (wn = function (t) {
        var e, n, r, o, i = this;
        return On && (n = new RegExp("^" + i.source + "$(?!\\s)", Sn.call(i))), Pn && (e = i.lastIndex), r = An.call(i, t), Pn && r && (i.lastIndex = i.global ? r.index + r[0].length : e), On && r && 1 < r.length && Cn.call(r[0], n, function () {
            var t = arguments;
            for (o = 1; o < arguments.length - 2; o++) void 0 === t[o] && (r[o] = void 0)
        }), r
    });
    var Tn = wn;
    at({target: "RegExp", proto: !0, forced: /./.exec !== Tn}, {exec: Tn});

    function xn(t) {
        var e;
        return O(t) && (void 0 !== (e = t[En]) ? !!e : "RegExp" == o(t))
    }

    var En = lt("match"), kn = lt("match");
    at({
        target: "String", proto: !0, forced: !function (e) {
            var n = /./;
            try {
                "/./"[e](n)
            } catch (t) {
                try {
                    return n[kn] = !1, "/./"[e](n)
                } catch (t) {
                }
            }
            return !1
        }("includes")
    }, {
        includes: function (t, e) {
            return !!~String(p(this)).indexOf(function (t) {
                if (xn(t)) throw TypeError("The method doesn't accept regular expressions");
                return t
            }(t), 1 < arguments.length ? e : void 0)
        }
    });

    function In(n, t, e, r) {
        var o = lt(n), i = !f(function () {
            var t = {};
            return t[o] = function () {
                return 7
            }, 7 != ""[n](t)
        }), a = i && !f(function () {
            var t = !1, e = /a/;
            return e.exec = function () {
                return t = !0, null
            }, "split" === n && (e.constructor = {}, e.constructor[Nn] = function () {
                return e
            }), e[o](""), !t
        });
        if (!i || !a || "replace" === n && !_n || "split" === n && !Mn) {
            var c = /./[o], u = e(o, ""[n], function (t, e, n, r, o) {
                return e.exec === Tn ? i && !o ? {done: !0, value: c.call(e, n, r)} : {
                    done: !0,
                    value: t.call(n, e, r)
                } : {done: !1}
            }), l = u[0], s = u[1];
            gt(String.prototype, n, l), gt(RegExp.prototype, o, 2 == t ? function (t, e) {
                return s.call(t, this, e)
            } : function (t) {
                return s.call(t, this)
            }), r && M(RegExp.prototype[o], "sham", !0)
        }
    }

    function jn(c) {
        return function (t, e) {
            var n, r, o = String(p(t)), i = Z(e), a = o.length;
            return i < 0 || a <= i ? c ? "" : void 0 : (n = o.charCodeAt(i)) < 55296 || 56319 < n || i + 1 === a || (r = o.charCodeAt(i + 1)) < 56320 || 57343 < r ? c ? o.charAt(i) : n : c ? o.slice(i, i + 2) : r - 56320 + (n - 55296 << 10) + 65536
        }
    }

    function Ln(t, e, n) {
        return e + (n ? Bn(t, e).length : 1)
    }

    function Rn(t, e) {
        var n = t.exec;
        if ("function" == typeof n) {
            var r = n.call(t, e);
            if ("object" != typeof r) throw TypeError("RegExp exec method returned something other than an Object or null");
            return r
        }
        if ("RegExp" !== o(t)) throw TypeError("RegExp#exec called on incompatible receiver");
        return Tn.call(t, e)
    }

    var Nn = lt("species"), _n = !f(function () {
            var t = /./;
            return t.exec = function () {
                var t = [];
                return t.groups = {a: "7"}, t
            }, "7" !== "".replace(t, "$<a>")
        }), Mn = !f(function () {
            var t = /(?:)/, e = t.exec;
            t.exec = function () {
                return e.apply(this, arguments)
            };
            var n = "ab".split(t);
            return 2 !== n.length || "a" !== n[0] || "b" !== n[1]
        }), Dn = {codeAt: jn(!1), charAt: jn(!0)}, Bn = Dn.charAt, Fn = Math.max, Vn = Math.min, Gn = Math.floor,
        Jn = /\$([$&'`]|\d\d?|<[^>]*>)/g, Hn = /\$([$&'`]|\d\d?)/g;
    In("replace", 2, function (o, A, C) {
        return [function (t, e) {
            var n = p(this), r = null == t ? void 0 : t[o];
            return void 0 !== r ? r.call(t, n, e) : A.call(String(n), t, e)
        }, function (t, e) {
            var n = C(A, t, this, e);
            if (n.done) return n.value;
            var r = R(t), o = String(this), i = "function" == typeof e;
            i || (e = String(e));
            var a = r.global;
            if (a) {
                var c = r.unicode;
                r.lastIndex = 0
            }
            for (var u = []; ;) {
                var l = Rn(r, o);
                if (null === l) break;
                if (u.push(l), !a) break;
                "" === String(l[0]) && (r.lastIndex = Ln(o, tt(r.lastIndex), c))
            }
            for (var s, f = "", p = 0, d = 0; d < u.length; d++) {
                l = u[d];
                for (var g = String(l[0]), h = Fn(Vn(Z(l.index), o.length), 0), v = [], y = 1; y < l.length; y++) v.push(void 0 === (s = l[y]) ? s : String(s));
                var S = l.groups;
                if (i) {
                    var m = [g].concat(v, h, o);
                    void 0 !== S && m.push(S);
                    var b = String(e.apply(void 0, m))
                } else b = w(g, o, h, v, S, e);
                p <= h && (f += o.slice(p, h) + b, p = h + g.length)
            }
            return f + o.slice(p)
        }];

        function w(i, a, c, u, l, t) {
            var s = c + i.length, f = u.length, e = Hn;
            return void 0 !== l && (l = ut(l), e = Jn), A.call(t, e, function (t, e) {
                var n;
                switch (e.charAt(0)) {
                    case"$":
                        return "$";
                    case"&":
                        return i;
                    case"`":
                        return a.slice(0, c);
                    case"'":
                        return a.slice(s);
                    case"<":
                        n = l[e.slice(1, -1)];
                        break;
                    default:
                        var r = +e;
                        if (0 == r) return t;
                        if (f < r) {
                            var o = Gn(r / 10);
                            return 0 === o ? t : o <= f ? void 0 === u[o - 1] ? e.charAt(1) : u[o - 1] + e.charAt(1) : t
                        }
                        n = u[r - 1]
                }
                return void 0 === n ? "" : n
            })
        }
    });
    var Wn = lt("species"), Un = [].push, $n = Math.min, qn = 4294967295, zn = !f(function () {
        return !RegExp(qn, "y")
    });
    In("split", 2, function (o, v, y) {
        var S;
        return S = "c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1).length || 2 != "ab".split(/(?:ab)*/).length || 4 != ".".split(/(.?)(.?)/).length || 1 < ".".split(/()()/).length || "".split(/.?/).length ? function (t, e) {
            var n = String(p(this)), r = void 0 === e ? qn : e >>> 0;
            if (0 == r) return [];
            if (void 0 === t) return [n];
            if (!xn(t)) return v.call(n, t, r);
            for (var o, i, a, c = [], u = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""), l = 0, s = new RegExp(t.source, u + "g"); (o = Tn.call(s, n)) && !(l < (i = s.lastIndex) && (c.push(n.slice(l, o.index)), 1 < o.length && o.index < n.length && Un.apply(c, o.slice(1)), a = o[0].length, l = i, c.length >= r));) s.lastIndex === o.index && s.lastIndex++;
            return l === n.length ? !a && s.test("") || c.push("") : c.push(n.slice(l)), c.length > r ? c.slice(0, r) : c
        } : "0".split(void 0, 0).length ? function (t, e) {
            return void 0 === t && 0 === e ? [] : v.call(this, t, e)
        } : v, [function (t, e) {
            var n = p(this), r = null == t ? void 0 : t[o];
            return void 0 !== r ? r.call(t, n, e) : S.call(String(n), t, e)
        }, function (t, e) {
            var n = y(S, t, this, e, S !== v);
            if (n.done) return n.value;
            var r = R(t), o = String(this), i = function (t, e) {
                    var n, r = R(t).constructor;
                    return void 0 === r || null == (n = R(r)[Wn]) ? e : ct(n)
                }(r, RegExp), a = r.unicode,
                c = (r.ignoreCase ? "i" : "") + (r.multiline ? "m" : "") + (r.unicode ? "u" : "") + (zn ? "y" : "g"),
                u = new i(zn ? r : "^(?:" + r.source + ")", c), l = void 0 === e ? qn : e >>> 0;
            if (0 == l) return [];
            if (0 === o.length) return null === Rn(u, o) ? [o] : [];
            for (var s = 0, f = 0, p = []; f < o.length;) {
                u.lastIndex = zn ? f : 0;
                var d, g = Rn(u, zn ? o : o.slice(f));
                if (null === g || (d = $n(tt(u.lastIndex + (zn ? 0 : f)), o.length)) === s) f = Ln(o, f, a); else {
                    if (p.push(o.slice(s, f)), p.length === l) return p;
                    for (var h = 1; h <= g.length - 1; h++) if (p.push(g[h]), p.length === l) return p;
                    f = s = d
                }
            }
            return p.push(o.slice(s)), p
        }]
    }, !zn);
    var Qn = {
            _completes: [], _fail: function () {
            }
        }, Xn = {state: 0, data: {}}, Yn = {
            reportRecord: "/service/common/reportRecord",
            getCityIndividualToken: "/openPlatform/city/individualToken",
            verify: "/user/auth/verify",
            face: "/user/auth/face",
            isLogin: "/user/login/status",
            login: "/user/login/main"
        }, Kn = {SUCCESS: 0, FAILED: -1, NOT_SUPPORT: -2}, Zn = Date.prototype, tr = "Invalid Date", er = "toString",
        nr = Zn[er], rr = Zn.getTime;
    new Date(NaN) + "" != tr && gt(Zn, er, function () {
        var t = rr.call(this);
        return t == t ? nr.call(this) : tr
    });
    var or = "toString", ir = RegExp.prototype, ar = ir[or], cr = f(function () {
        return "/a/b" != ar.call({source: "a", flags: "b"})
    }), ur = ar.name != or;
    (cr || ur) && gt(RegExp.prototype, or, function () {
        var t = R(this), e = String(t.source), n = t.flags;
        return "/" + e + "/" + String(void 0 === n && t instanceof RegExp && !("flags" in ir) ? Sn.call(t) : n)
    }, {unsafe: !0});
    var lr = {};

    function sr() {
        return navigator.userAgent.toLocaleLowerCase().includes("szsmt")
    }

    function fr() {
        return navigator.userAgent.toLocaleLowerCase().includes("ntsmt")
    }

    function pr() {
        var t = navigator.userAgent.toLocaleLowerCase().split("smt_")[1];
        return t && t.includes("version:") ? t.split("version:")[1] : "0.0.0"
    }

    function dr(e) {
        sr() && "1.5.0" <= pr() || fr() && "1.2.0" <= pr() || !sr() && !fr() && navigator.userAgent.toLocaleLowerCase().includes("smt") && !fr() && !sr() ? function (t) {
            if (window.PASCWebViewBridge) t && t(window.PASCWebViewBridge); else if (window.PAJBCallbacks) t && window.PAJBCallbacks.push(t); else {
                t && (window.PAJBCallbacks = [t]);
                var e = document.createElement("iframe");
                e.style.display = "none", e.src = "pasc://__REQUEST__BRIDGE__INJECT__", document.documentElement.appendChild(e), setTimeout(function () {
                    document.documentElement.removeChild(e)
                }, 0)
            }
        }(function (t) {
            e && e(t), e = null
        }) : e && e(null)
    }

    function gr(o, t, e, n) {
        var i = 1 < arguments.length && void 0 !== t ? t : {}, a = 2 < arguments.length ? e : void 0,
            r = 3 < arguments.length ? n : void 0;
        dr(function (t) {
            if (t) {
                var e = JSON.parse(JSON.stringify(i));
                delete e.success, delete e.fail, delete e.complete, t.callHandler(o, e, function (t) {
                    var e = t.replace(/PASC\.app\./g, ""), n = JSON.parse(e);
                    n.code === Kn.SUCCESS && (n.message = n.message || "操作成功");
                    var r = n.code !== Kn.SUCCESS ? "错误" : "消息";
                    lr.debug && "PASC.app.webStatsEvent" !== o && alert("[Hybrid]：".concat(r, ": ").concat(JSON.stringify(n))), n.code !== Kn.SUCCESS ? i.fail && i.fail(n) : i.success && i.success(n), i.complete && i.complete(n), a && a(n)
                })
            } else if (r) r(); else {
                var n = o.replace("PASC.app.", "");
                lr.debug && alert("".concat(n, ": Api不存在")), console.error("".concat(n, ": Api不存在"))
            }
        })
    }

    function hr(n, r) {
        dr(function (t) {
            if (t) t.registerHandler(n, function (t) {
                if (r) {
                    var e = t;
                    try {
                        e = "string" == typeof t ? JSON.parse(t) : t
                    } catch (t) {
                        console.log("".concat(n, ": 接受数据格式异常"))
                    }
                    r(e)
                }
            }); else {
                var e = n.replace("PASC.app.", "");
                lr.debug && alert("".concat(e, ": Api不存在")), console.log("".concat(e, ": Api不存在"))
            }
        })
    }

    function vr(t) {
        var e = document.createElement("iframe");
        e.src = t, e.style.display = "none", document.body.appendChild(e), window.setTimeout(function () {
            document.body.removeChild(e)
        }, 1e3)
    }

    function yr() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
            e = 1 < arguments.length ? arguments[1] : void 0;
        if (window.smtinterface && window.smtinterface.onTitleChange) window.smtinterface.onTitleChange(JSON.stringify(t.title)); else {
            if (gr("PASC.app.setToolBar", t, e), t.leftBtns) for (var n = t.leftBtns, r = function (t) {
                var e = n[t];
                e.action && hr(e.action, function () {
                    e.callback && e.callback(e.title ? e.title : "")
                })
            }, o = 0; o < n.length; o++) r(o);
            if (t.rightBtns) {
                var i = t.rightBtns, a = function (t) {
                    var e = i[t];
                    e.action && hr(e.action, function () {
                        e.callback && e.callback(e.title ? e.title : "")
                    })
                };
                for (o = 0; o < i.length; o++) a(o)
            }
        }
    }

    function Sr(t, e) {
        t.shareTypes && Object.keys(t.shareTypes).length || (t.shareTypes = [{platformID: 0}, {platformID: 1}, {platformID: 2}, {platformID: 3}, {platformID: 4}, {platformID: 6}, {platformID: 7}, {platformID: 8}, {platformID: 999}]), gr("PASC.app.share", t, e)
    }

    function mr(t) {
        var e = ht.Symbol || (ht.Symbol = {});
        x(e, t) || kr(e, t, {value: Er.f(t)})
    }

    function br(t, e) {
        var n = Ur[t] = Yt(Br[Rr]);
        return _r(n, {type: Lr, tag: t, description: e}), S || (n.description = e), n
    }

    function Ar(e, t) {
        R(e);
        var n = l(t), r = Ut(n).concat(no(n));
        return Ir(r, function (t) {
            S && !eo.call(n, t) || to(e, t, n[t])
        }), e
    }

    function Cr(t, e) {
        var n = l(t), r = i(e, !0);
        if (n !== Dr || !x(Ur, r) || x($r, r)) {
            var o = Gr(n, r);
            return !o || !x(Ur, r) || x(n, jr) && n[jr][r] || (o.enumerable = !0), o
        }
    }

    function wr(t) {
        var e = Hr(l(t)), n = [];
        return Ir(e, function (t) {
            x(Ur, t) || x(W, t) || n.push(t)
        }), n
    }

    var Pr = Ot.f, Or = {}.toString,
        Tr = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        xr = {
            f: function (t) {
                return Tr && "[object Window]" == Or.call(t) ? function (t) {
                    try {
                        return Pr(t)
                    } catch (t) {
                        return Tr.slice()
                    }
                }(t) : Pr(l(t))
            }
        }, Er = {f: lt}, kr = _.f, Ir = Gt.forEach, jr = r("hidden"), Lr = "Symbol", Rr = "prototype",
        Nr = lt("toPrimitive"), _r = dt.set, Mr = dt.getterFor(Lr), Dr = Object[Rr], Br = v.Symbol, Fr = v.JSON,
        Vr = Fr && Fr.stringify, Gr = L.f, Jr = _.f, Hr = xr.f, Wr = A.f, Ur = D("symbols"), $r = D("op-symbols"),
        qr = D("string-to-symbol-registry"), zr = D("symbol-to-string-registry"), Qr = D("wks"), Xr = v.QObject,
        Yr = !Xr || !Xr[Rr] || !Xr[Rr].findChild, Kr = S && f(function () {
            return 7 != Yt(Jr({}, "a", {
                get: function () {
                    return Jr(this, "a", {value: 7}).a
                }
            })).a
        }) ? function (t, e, n) {
            var r = Gr(Dr, e);
            r && delete Dr[e], Jr(t, e, n), r && t !== Dr && Jr(Dr, e, r)
        } : Jr, Zr = Mt && "symbol" == typeof Br.iterator ? function (t) {
            return "symbol" == typeof t
        } : function (t) {
            return Object(t) instanceof Br
        }, to = function (t, e, n) {
            t === Dr && to($r, e, n), R(t);
            var r = i(e, !0);
            return R(n), x(Ur, r) ? (n.enumerable ? (x(t, jr) && t[jr][r] && (t[jr][r] = !1), n = Yt(n, {enumerable: y(0, !1)})) : (x(t, jr) || Jr(t, jr, y(1, {})), t[jr][r] = !0), Kr(t, r, n)) : Jr(t, r, n)
        }, eo = function (t) {
            var e = i(t, !0), n = Wr.call(this, e);
            return !(this === Dr && x(Ur, e) && !x($r, e)) && (!(n || !x(this, e) || !x(Ur, e) || x(this, jr) && this[jr][e]) || n)
        }, no = function (t) {
            var e = t === Dr, n = Hr(e ? $r : l(t)), r = [];
            return Ir(n, function (t) {
                !x(Ur, t) || e && !x(Dr, t) || r.push(Ur[t])
            }), r
        };
    Mt || (gt((Br = function (t) {
        if (this instanceof Br) throw TypeError("Symbol is not a constructor");
        var e = arguments.length && void 0 !== t ? String(t) : void 0, n = c(e), r = function (t) {
            this === Dr && r.call($r, t), x(this, jr) && x(this[jr], n) && (this[jr][n] = !1), Kr(this, n, y(1, t))
        };
        return S && Yr && Kr(Dr, n, {configurable: !0, set: r}), br(n, e)
    })[Rr], "toString", function () {
        return Mr(this).tag
    }), A.f = eo, _.f = to, L.f = Cr, Ot.f = xr.f = wr, Tt.f = no, S && (Jr(Br[Rr], "description", {
        configurable: !0,
        get: function () {
            return Mr(this).description
        }
    }), gt(Dr, "propertyIsEnumerable", eo, {unsafe: !0})), Er.f = function (t) {
        return br(lt(t), t)
    }), at({global: !0, wrap: !0, forced: !Mt, sham: !Mt}, {Symbol: Br}), Ir(Ut(Qr), function (t) {
        mr(t)
    }), at({target: Lr, stat: !0, forced: !Mt}, {
        for: function (t) {
            var e = String(t);
            if (x(qr, e)) return qr[e];
            var n = Br(e);
            return qr[e] = n, zr[n] = e, n
        }, keyFor: function (t) {
            if (!Zr(t)) throw TypeError(t + " is not a symbol");
            if (x(zr, t)) return zr[t]
        }, useSetter: function () {
            Yr = !0
        }, useSimple: function () {
            Yr = !1
        }
    }), at({target: "Object", stat: !0, forced: !Mt, sham: !S}, {
        create: function (t, e) {
            return void 0 === e ? Yt(t) : Ar(Yt(t), e)
        }, defineProperty: to, defineProperties: Ar, getOwnPropertyDescriptor: Cr
    }), at({target: "Object", stat: !0, forced: !Mt}, {
        getOwnPropertyNames: wr,
        getOwnPropertySymbols: no
    }), at({
        target: "Object", stat: !0, forced: f(function () {
            Tt.f(1)
        })
    }, {
        getOwnPropertySymbols: function (t) {
            return Tt.f(ut(t))
        }
    }), Fr && at({
        target: "JSON", stat: !0, forced: !Mt || f(function () {
            var t = Br();
            return "[null]" != Vr([t]) || "{}" != Vr({a: t}) || "{}" != Vr(Object(t))
        })
    }, {
        stringify: function (t) {
            for (var e, n, r = arguments, o = [t], i = 1; i < arguments.length;) o.push(r[i++]);
            if (n = e = o[1], (O(e) || void 0 !== t) && !Zr(t)) return _t(e) || (e = function (t, e) {
                if ("function" == typeof n && (e = n.call(this, t, e)), !Zr(e)) return e
            }), o[1] = e, Vr.apply(Fr, o)
        }
    }), Br[Rr][Nr] || M(Br[Rr], Nr, Br[Rr].valueOf), se(Br, Lr), W[jr] = !0;
    var ro = _.f, oo = v.Symbol;
    if (!(!S || "function" != typeof oo || "description" in oo.prototype && void 0 === oo().description)) {
        var io = {}, ao = function (t) {
            var e = arguments.length < 1 || void 0 === t ? void 0 : String(t),
                n = this instanceof ao ? new oo(e) : void 0 === e ? oo() : oo(e);
            return "" === e && (io[n] = !0), n
        };
        ot(ao, oo);
        var co = ao.prototype = oo.prototype;
        co.constructor = ao;
        var uo = co.toString, lo = "Symbol(test)" == String(oo("test")), so = /^Symbol\((.*)\)[^)]+$/;
        ro(co, "description", {
            configurable: !0, get: function () {
                var t = O(this) ? this.valueOf() : this, e = uo.call(t);
                if (x(io, t)) return "";
                var n = lo ? e.slice(7, -1) : e.replace(so, "$1");
                return "" === n ? void 0 : n
            }
        }), at({global: !0, forced: !0}, {Symbol: ao})
    }
    mr("iterator");
    var fo = Dn.charAt, po = "String Iterator", go = dt.set, ho = dt.getterFor(po);

    function vo(t, e) {
        gr("PASC.app.webCallback", t, e)
    }

    function yo(t, e) {
        gr("PASC.app.toast", t, e)
    }

    function So(t) {
        gr("PASC.app.close", {}, t, function () {
            window.paAccountApp && window.paAccountApp.goBack && window.smtinterface.goBack()
        })
    }

    function mo() {
        var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        gr("PASC.app.webStatsEvent", t, 1 < arguments.length ? arguments[1] : void 0, function () {
            window.smtinterface && window.smtinterface.onEvent && window.smtinterface.onEvent(t.eventId ? t.eventId : "", t.label ? t.label : "", t.params ? JSON.stringify(t.params) : "")
        })
    }

    pe(String, "String", function (t) {
        go(this, {type: po, string: String(t), index: 0})
    }, function () {
        var t, e = ho(this), n = e.string, r = e.index;
        return r >= n.length ? {value: void 0, done: !0} : (t = fo(n, r), e.index += t.length, {value: t, done: !1})
    });
    var bo = {
        CODE: Kn, addShareItem: function (t, e) {
            yr({
                rightBtns: [{
                    iconType: 0, title: "分享", action: "rightBtnAction0", callback: function () {
                        Sr(t, e)
                    }
                }]
            }, function (t) {
                0 !== t.code && e(t)
            })
        }, alert: function () {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            if (gr("PASC.app.alert", t, 1 < arguments.length ? arguments[1] : void 0), t.buttons) {
                var e = t.buttons, n = !0, r = !1, o = void 0;
                try {
                    for (var i, a = e[Symbol.iterator](); !(n = (i = a.next()).done); n = !0) {
                        var c = i.value;
                        if (c.action) hr(c.action, c.callback)
                    }
                } catch (t) {
                    r = !0, o = t
                } finally {
                    try {
                        n || null == a.return || a.return()
                    } finally {
                        if (r) throw o
                    }
                }
            }
        }, broadcast: function (t, e) {
            gr("PASC.app.broadcast", t, e)
        }, browseFile: function (t, e) {
            gr("PASC.app.browseFile", t, e)
        }, callPhone: function (t, e) {
            gr("PASC.app.callPhone", {phoneNum: t}, e, function () {
                vr("tel://".concat(t))
            })
        }, callbackToPreWebView: function (t, e) {
            vo({path: "webCallback", code: 0, message: "操作成功", data: t}, e)
        }, chooseImage: function () {
            var u = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                l = 1 < arguments.length ? arguments[1] : void 0;
            gr("PASC.app.ChooseImage", u, function (i) {
                var a = 0, c = [];
                0 == +i.code ? function t() {
                    var e = i.data.tempFiles[a], n = new XMLHttpRequest, r = !1, o = setTimeout(function () {
                        r = !0, n.abort()
                    }, 3e4);
                    n.open("GET", "".concat(e.path, "?imageType=").concat(u.resType || "base64"), !0), n.onreadystatechange = function () {
                        4 === n.readyState && (r || (clearTimeout(o), 200 === n.status ? c.push(n.response) : c.push(""), a <= i.data.tempFiles.length - 1 ? t() : l && l({
                            code: i.code,
                            data: c,
                            message: i.message
                        })))
                    }, n.send(), a++
                }() : l && l(i)
            })
        }, chooseVideo: function () {
            var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                c = 1 < arguments.length ? arguments[1] : void 0;
            gr("PASC.app.ChooseVideo", a, function (t) {
                var e, n, r, o, i = "";
                0 == +t.code ? (yo({
                    type: "loading",
                    text: "处理中，请稍候..."
                }), e = t.data.tempFilePath, n = new XMLHttpRequest, r = !1, o = setTimeout(function () {
                    yo({type: "hide"}), r = !0, n.abort()
                }, 3e4), n.open("GET", "".concat(e, "?videoType=").concat(a.resType || "base64"), !0), n.responseType = "blob" === a.resType ? "blob" : "text", n.onreadystatechange = function () {
                    yo({type: "hide"}), 4 === n.readyState && (r || (clearTimeout(o), 200 === n.status && (i = n.response), c && c({
                        code: t.code,
                        data: Object.assign(t.data, {videoData: i}),
                        message: t.message
                    })))
                }, n.send()) : c && c(t)
            })
        }, close: So, closeAllWebview: function (t) {
            gr("PASC.app.closeAllWebview", {}, t)
        }, closeWithBackHome: function (t, e) {
            gr("PASC.app.closeWithBackHome", {index: t}, e)
        }, config: function (r) {
            return "[object Object]" !== Object.prototype.toString.call(r) ? console.error("配置信息应为object，实际为".concat(Object.prototype.toString.call(r))) : (Xn.state = 0, lr = JSON.parse(JSON.stringify(r)), r.nativeApis = ["PASC.app.Router", "PASC.app.SMS", "PASC.app.GPS", "PASC.app.PhoneCall", "PASC.app.Notification", "PASC.app.Contact", "PASC.app.Navigation", "PASC.app.QRCode", "PASC.app.OpenLocation", "PASC.app.ReportRecord", "PASC.app.ChooseImage", "PASC.app.ChooseVideo", "PASC.app.Pay"], gr("PASC.app.initJSSDK", r, function (t) {
                if (0 === t.code) {
                    lr.debug && console.table({
                        appId: {value: r.appId},
                        initCode: {value: r.initCode}
                    }), Xn.state = 1, Xn.data = t;
                    for (var e = Qn._completes.length, n = 0; n < e; n++) Qn._completes[n]()
                } else Xn.state = -1, Qn._fail(t);
                Qn._completes = []
            }), !1)
        }, contact: function (t) {
            gr("PASC.app.Contact", {}, t)
        }, diskCache: function (t, e) {
            gr("PASC.app.diskCache", t, e)
        }, error: function (t) {
            -1 === Xn.state ? t(Xn.data) : Qn._fail = t
        }, face: function () {
            gr("PASC.app.Router", {
                path: "/user/auth/face",
                params: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
            }, 1 < arguments.length ? arguments[1] : void 0)
        }, faceCheck: function () {
            gr("PASC.app.Router", {
                path: "/user/auth/facecheck",
                params: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
            }, 1 < arguments.length ? arguments[1] : void 0)
        }, getAppVersion: pr, getDeviceInfo: function (t) {
            gr("PASC.app.getDeviceInfo", {}, t)
        }, getGpsInfo: function (t) {
            gr("PASC.app.getGpsInfo", {}, t)
        }, getUserInfo: function () {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                e = 1 < arguments.length ? arguments[1] : void 0;
            1 === arguments.length && "function" == typeof t && (e = t, t = {}), gr("PASC.app.getUserInfo", t, e, function () {
                vr("smt://app/getUserInfo?callback=".concat(t.callback))
            })
        }, getVideoData: function (t, e) {
            console.warn("getVideoData API已不建议使用，请使用chooseVideo获取视频数据"), yo({type: "text", text: "处理中，请稍后..."});
            var n = "", r = "获取失败", o = t.tempFilePath, i = new XMLHttpRequest, a = !1, c = setTimeout(function () {
                yo({type: "hide"}), a = !0, i.abort()
            }, 3e4);
            i.open("GET", "".concat(o, "?videoType=").concat(t.resType || "base64"), !0), i.responseType = "blob" === t.resType ? "blob" : "text", i.onreadystatechange = function () {
                yo({type: "hide"}), 4 === i.readyState && (a || (clearTimeout(c), 200 === i.status && (n = i.response, r = "获取成功"), e && e({
                    code: i.status,
                    data: n,
                    message: r
                })))
            }, i.send()
        }, goback: function (t) {
            gr("PASC.app.goback", {}, t)
        }, gps: function (t) {
            gr("PASC.app.GPS", {}, t)
        }, h5TokenInvalid: function (t, e) {
            gr("PASC.app.h5TokenInvalid", {errorCode: t}, e)
        }, handwrittenSigning: function () {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                e = 1 < arguments.length ? arguments[1] : void 0;
            console.log("已调用 handwrittenSigning"), gr("PASC.app.handwrittenSigning", t, e)
        }, imageChoose: function () {
            var u = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                l = 1 < arguments.length ? arguments[1] : void 0;
            gr("PASC.app.chooseImage", u, function (i) {
                var a = 0, c = [];
                0 == +i.code ? function t() {
                    var e = i.data.tempFiles[a], n = new XMLHttpRequest, r = !1, o = setTimeout(function () {
                        r = !0, n.abort()
                    }, 3e4);
                    n.open("GET", "".concat(e.path, "?imageType=").concat(u.resType || "base64"), !0), n.onreadystatechange = function () {
                        4 === n.readyState && (r || (clearTimeout(o), 200 === n.status ? c.push(n.response) : c.push(""), a <= i.data.tempFiles.length - 1 ? t() : l && l({
                            code: i.code,
                            data: c,
                            message: i.message
                        })))
                    }, n.send(), a++
                }() : l && l(i)
            })
        }, isExistApi: function (t, e) {
            var n = JSON.parse(JSON.stringify(t));
            Object.keys(Yn).includes(t.path) ? (n.routePath = Yn[n.path], delete n.path) : ["sms", "gps"].includes(n.path) ? n.path = "PASC.app.".concat(n.path.toUpperCase()) : n.path = "PASC.app.".concat(n.path), gr("PASC.app.isExistApi", n, e)
        }, isExistApis: function (t, e) {
            var n = [], r = [], o = JSON.parse(JSON.stringify(t));
            Array.isArray(t.paths) && t.paths.forEach(function (t) {
                Object.keys(Yn).includes(t) ? r.push(Yn[t]) : ["sms", "gps"].includes(t) ? n.push("PASC.app.".concat(t.toUpperCase())) : n.push("PASC.app.".concat(t))
            }), o.paths = n, o.routePaths = r, gr("PASC.app.isExistApis", o, e)
        }, isLogin: function (t) {
            gr("PASC.app.Router", {path: "/user/login/status"}, t)
        }, log: function (t, e) {
            gr("PASC.app.log", t, e)
        }, login: function () {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                e = 1 < arguments.length ? arguments[1] : void 0;
            1 === arguments.length && "function" == typeof t && (e = t, t = {}), gr("PASC.app.Router", {
                path: "/user/login/main",
                params: {subParams: t, isNoToken: !0},
                openType: 1
            }, e)
        }, logout: function (t) {
            gr("PASC.app.logout", {}, t)
        }, mapNavigation: function () {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
            gr("PASC.app.mapNavigation", t, 1 < arguments.length ? arguments[1] : void 0, function () {
                vr("smt://szyx/map?location=".concat(t.endAddress, "&long=").concat(t.endLongitude, "&lat=").concat(t.endLatitude, "&type=").concat(t.type))
            })
        }, memoryCache: function (t, e) {
            gr("PASC.app.memoryCache", t, e)
        }, nativeRoute: function () {
            gr("PASC.app.nativeRoute", 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, 1 < arguments.length ? arguments[1] : void 0)
        }, navigation: function () {
            gr("PASC.app.Navigation", 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, 1 < arguments.length ? arguments[1] : void 0)
        }, networkStatus: function (e, n) {
            gr("PASC.app.networkStatus", e, function (t) {
                n && n(t.data), e.action && dr(function (t) {
                    t ? t.registerHandler(e.action, function (t) {
                        n && n(t)
                    }) : alert("networkStatus: Api不存在")
                })
            })
        }, notification: function (t, e) {
            gr("PASC.app.Notification", t, e)
        },
      onBack: function (t, e) {
            1 === arguments.length && "function" == typeof t && (e = t, t = {closeBtn: !1});
            var n = [{iconType: 0, action: "leftBtnAction1", callback: e}];
            t.closeBtn && n.push({
                title: "关闭", action: "leftBtnAction2", callback: function () {
                    So()
                }
            }), yr({leftBtns: n})
        },
      onEnterApp: function (t) {
            hr("PASC.web.enterApp", t)
        }, onExitApp: function (t) {
            hr("PASC.web.exitApp", t)
        }, onFinishPage: function (t) {
            hr("PASC.web.finishPage", t)
        }, onStartPage: function (t) {
            hr("PASC.web.startPage", t)
        }, openLocation: function () {
            gr("PASC.app.OpenLocation", 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, 1 < arguments.length ? arguments[1] : void 0)
        }, openNewWebView: function (t, e) {
            gr("PASC.app.openNewWebView", t, e)
        }, openQRCode: function (t) {
            gr("PASC.app.openQRCode", {}, t)
        }, openSetting: function (t) {
            gr("PASC.app.openSetting", {}, t)
        }, pay: function () {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                e = 1 < arguments.length ? arguments[1] : void 0, n = "paymentResult";
            t && t.payId && (t.token = t.payId, delete t.payId), t.action = n, gr("PASC.app.Pay", t), hr(n, e)
        }, phoneCall: function (t, e) {
            gr("PASC.app.PhoneCall", {phoneNum: t}, e)
        }, playVideo: function (t, e) {
            gr("PASC.app.playVideo", {src: t.src, virtualSrc: t.virtualSrc}, e)
        }, previewImages: function (t, e) {
            gr("PASC.app.previewImages", t, e)
        }, qrCode: function (t) {
            gr("PASC.app.QRCode", {}, t)
        }, ready: function (t) {
            0 !== Xn.state ? t() : Qn._completes.push(t)
        }, reportRecord: function (t, e) {
            gr("PASC.app.Router", {path: "/service/common/reportRecord", params: {subParams: t}}, e)
        }, router: function () {
            gr("PASC.app.Router", 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, 1 < arguments.length ? arguments[1] : void 0)
        }, selectContact: function (t) {
            gr("PASC.app.selectContact", {}, t)
        }, sendSMS: function (t, e) {
            gr("PASC.app.sendSMS", t, e)
        }, setNavigationBarTitle: function (t, e) {
            yr({title: t}, e)
        }, setToolBar: yr, setWebView: function (t, e) {
            gr("PASC.app.setWebView", t, e)
        }, share: Sr, signText: function () {
            gr("PASC.app.startCASign", 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, 1 < arguments.length ? arguments[1] : void 0)
        }, sms: function (t, e) {
            gr("PASC.app.SMS", t, e)
        }, systemShare: function () {
            gr("PASC.app.systemShare", 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, 1 < arguments.length ? arguments[1] : void 0)
        }, toast: yo, toggleNavigationBar: function () {
            yr({isHide: 0 < arguments.length && void 0 !== arguments[0] && arguments[0]}, 1 < arguments.length ? arguments[1] : void 0)
        }, userAddressAuth: function (t, e) {
            gr("PASC.app.userAddressAuth", t, e)
        }, userAuth: function (t, e) {
            gr("PASC.app.userAuth", t, e)
        }, userEnterpriseAuth: function (t, e) {
            gr("PASC.app.userEnterpriseAuth", t, e)
        }, verify: function () {
            gr("PASC.app.Router", {
                path: "/user/auth/verify",
                params: 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
            }, 1 < arguments.length ? arguments[1] : void 0)
        }, videoChoose: function () {
            var a = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {},
                c = 1 < arguments.length ? arguments[1] : void 0;
            gr("PASC.app.chooseVideo", a, function (t) {
                var e, n, r, o, i = "";
                0 == +t.code ? (yo({
                    type: "loading",
                    text: "处理中，请稍候..."
                }), e = t.data.tempFilePath, n = new XMLHttpRequest, r = !1, o = setTimeout(function () {
                    yo({type: "hide"}), r = !0, n.abort()
                }, 3e4), n.open("GET", "".concat(e, "?videoType=").concat(a.resType || "base64"), !0), n.responseType = "blob" === a.resType ? "blob" : "text", n.onreadystatechange = function () {
                    yo({type: "hide"}), 4 === n.readyState && (r || (clearTimeout(o), 200 === n.status && (i = n.response), c && c({
                        code: t.code,
                        data: Object.assign(t.data, {videoData: i}),
                        message: t.message
                    })))
                }, n.send()) : c && c(t)
            })
        }, viewLocation: function () {
            gr("PASC.app.openLocation", 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}, 1 < arguments.length ? arguments[1] : void 0)
        }, webCallback: vo, webStatsEvent: mo
    };
    if (window.scLibOnLoadCallbacks) {
        for (var Ao = 0; Ao < window.scLibOnLoadCallbacks.length; Ao++) window.scLibOnLoadCallbacks[Ao](bo);
        window.scLibOnLoadCallbacks = null
    }
    var Co,
        wo = (Co = navigator.userAgent.toLocaleLowerCase()).includes("szsmt") ? "shenzhen" : Co.includes("ntsmt") ? "nantong" : Co.includes("smt") ? "base" : "";
    return window.Proxy ? bo = new Proxy(bo, {
        get: function (t, e, n) {
            try {
                mo({
                    eventId: "开放平台-jssdk-能力使用",
                    label: "调用能力",
                    map: {key: e, value: e}
                }), mo({
                    eventId: "开放平台-jssdk-能力使用",
                    label: "调用服务",
                    map: {key: document.title || window.location.href, value: document.title || window.location.href}
                })
            } catch (t) {
                console.error(t)
            }
            if (e in t) return wo || (lr.debug && alert("不在市民通APP内"), console.error("不在市民通APP内")), Reflect.get(t, e, n);
            throw lr.debug && alert("".concat(e, "方法暂不支持，请查阅文档")), new ReferenceError("".concat(e, "方法暂不支持，请查阅文档"))
        }
    }) : Object.keys(bo).forEach(function (t) {
        var e = bo[t];
        Object.defineProperty(bo, t, {
            get: function () {
                try {
                    mo({
                        eventId: "开放平台-jssdk-能力使用",
                        label: "调用能力",
                        map: {key: t, value: t}
                    }), mo({
                        eventId: "开放平台-jssdk-能力使用",
                        label: "调用服务",
                        map: {
                            key: document.title || window.location.href,
                            value: document.title || window.location.href
                        }
                    })
                } catch (t) {
                    console.error(t)
                }
                return wo || (lr.debug && alert("请在市民通APP内打开"), console.error("请在市民通APP内打开")), e
            }
        })
    }), bo
});
