var H = ((r) => (r.Complete = "complete", r.Error = "error", r))(H || {});
let I;
const ee = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && ee.decode();
let Z = null;
function Tt() {
  return Z !== null && Z.byteLength !== 0 || (Z = new Uint8Array(I.memory.buffer)), Z;
}
let $t = 0, $ = null;
function Kt() {
  return $ !== null && $.byteLength !== 0 || ($ = new Int32Array(I.memory.buffer)), $;
}
function We(r, U, R) {
  try {
    const _ = I.__wbindgen_add_to_stack_pointer(-16), st = function(x, ft) {
      const M = ft(1 * x.length, 1) >>> 0;
      return Tt().set(x, M / 1), $t = x.length, M;
    }(r, I.__wbindgen_malloc), S = $t;
    I.optimize(_, st, S, U, R);
    var b = Kt()[_ / 4 + 0], v = Kt()[_ / 4 + 1], A = (y = b, w = v, y >>>= 0, Tt().subarray(y / 1, y / 1 + w)).slice();
    return I.__wbindgen_free(b, 1 * v, 1), A;
  } finally {
    I.__wbindgen_add_to_stack_pointer(16);
  }
  var y, w;
}
function Re() {
  const r = { wbg: {} };
  return r.wbg.__wbindgen_throw = function(U, R) {
    throw new Error((b = U, v = R, b >>>= 0, ee.decode(Tt().subarray(b, b + v))));
    var b, v;
  }, r;
}
async function re(r) {
  if (I !== void 0) return I;
  if (r === void 0) throw new Error("oxipng WASM missing");
  const U = Re();
  (typeof r == "string" || typeof Request == "function" && r instanceof Request || typeof URL == "function" && r instanceof URL) && (r = fetch(r));
  const { instance: R, module: b } = await async function(v, A) {
    if (typeof Response == "function" && v instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming == "function") try {
        return await WebAssembly.instantiateStreaming(v, A);
      } catch (w) {
        if (v.headers.get("Content-Type") == "application/wasm") throw w;
        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", w);
      }
      const y = await v.arrayBuffer();
      return await WebAssembly.instantiate(y, A);
    }
    {
      const y = await WebAssembly.instantiate(v, A);
      return y instanceof WebAssembly.Instance ? { instance: y, module: v } : y;
    }
  }(await r, U);
  return function(v, A) {
    return I = v.exports, re.__wbindgen_wasm_module = A, $ = null, Z = null, I;
  }(R, b);
}
var ut = ((r) => (r.Png = "image/png", r.Jpeg = "image/jpeg", r))(ut || {});
Object.values(ut);
const Qt = (r) => {
  if (r) return new URL(r);
};
let te;
var At, ke = (At = import.meta.url, function(r, U) {
  var R, b;
  (r = (r = r || {}) !== void 0 ? r : {}).ready = new Promise(function(t, e) {
    R = t, b = e;
  });
  var v, A = {};
  for (v in r) r.hasOwnProperty(v) && (A[v] = r[v]);
  var y, w = "./this.program", _ = function(t, e) {
    throw e;
  }, st = !0, S = "";
  S = self.location.href, At && (S = At), S = S.indexOf("blob:") !== 0 ? S.substr(0, S.lastIndexOf("/") + 1) : "", y = function(t) {
    var e = new XMLHttpRequest();
    return e.open("GET", t, !1), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e.response);
  };
  var x, ft = r.print || console.log.bind(console), M = r.printErr || console.warn.bind(console);
  for (v in A) A.hasOwnProperty(v) && (r[v] = A[v]);
  A = null, r.arguments && r.arguments, r.thisProgram && (w = r.thisProgram), r.quit && (_ = r.quit), r.wasmBinary && (x = r.wasmBinary);
  var ct, oe = r.noExitRuntime || !0;
  typeof WebAssembly != "object" && Q("no native wasm support detected");
  var lt = !1, Et = new TextDecoder("utf8");
  function Ct(t, e) {
    if (!t) return "";
    for (var n = t + e, o = t; !(o >= n) && T[o]; ) ++o;
    return Et.decode(T.subarray(t, o));
  }
  var pt, V, T, q, K, E, O, Pt, Wt, z, ae = new TextDecoder("utf-16le");
  function ie(t, e) {
    for (var n = t, o = n >> 1, a = o + e / 2; !(o >= a) && K[o]; ) ++o;
    return n = o << 1, ae.decode(T.subarray(t, n));
  }
  function ue(t, e, n) {
    if (n === void 0 && (n = 2147483647), n < 2) return 0;
    for (var o = e, a = (n -= 2) < 2 * t.length ? n / 2 : t.length, i = 0; i < a; ++i) {
      var f = t.charCodeAt(i);
      q[e >> 1] = f, e += 2;
    }
    return q[e >> 1] = 0, e - o;
  }
  function se(t) {
    return 2 * t.length;
  }
  function fe(t, e) {
    for (var n = 0, o = ""; !(n >= e / 4); ) {
      var a = E[t + 4 * n >> 2];
      if (a == 0) break;
      if (++n, a >= 65536) {
        var i = a - 65536;
        o += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i);
      } else o += String.fromCharCode(a);
    }
    return o;
  }
  function ce(t, e, n) {
    if (n === void 0 && (n = 2147483647), n < 4) return 0;
    for (var o = e, a = o + n - 4, i = 0; i < t.length; ++i) {
      var f = t.charCodeAt(i);
      if (f >= 55296 && f <= 57343 && (f = 65536 + ((1023 & f) << 10) | 1023 & t.charCodeAt(++i)), E[e >> 2] = f, (e += 4) + 4 > a) break;
    }
    return E[e >> 2] = 0, e - o;
  }
  function le(t) {
    for (var e = 0, n = 0; n < t.length; ++n) {
      var o = t.charCodeAt(n);
      o >= 55296 && o <= 57343 && ++n, e += 4;
    }
    return e;
  }
  function Rt(t) {
    pt = t, r.HEAP8 = V = new Int8Array(t), r.HEAP16 = q = new Int16Array(t), r.HEAP32 = E = new Int32Array(t), r.HEAPU8 = T = new Uint8Array(t), r.HEAPU16 = K = new Uint16Array(t), r.HEAPU32 = O = new Uint32Array(t), r.HEAPF32 = Pt = new Float32Array(t), r.HEAPF64 = Wt = new Float64Array(t);
  }
  r.INITIAL_MEMORY;
  var B, dt, kt = [], Ft = [], It = [], L = 0, Y = null;
  function Q(t) {
    r.onAbort && r.onAbort(t), M(t += ""), lt = !0, t = "abort(" + t + "). Build with -s ASSERTIONS=1 for more info.";
    var e = new WebAssembly.RuntimeError(t);
    throw b(e), e;
  }
  function Ut(t) {
    try {
      if (t == B && x) return new Uint8Array(x);
      if (y) return y(t);
      throw "both async and sync fetching of the wasm failed";
    } catch (e) {
      Q(e);
    }
  }
  function gt(t) {
    for (; t.length > 0; ) {
      var e = t.shift();
      if (typeof e != "function") {
        var n = e.func;
        typeof n == "number" ? e.arg === void 0 ? z.get(n)() : z.get(n)(e.arg) : n(e.arg === void 0 ? null : e.arg);
      } else e(r);
    }
  }
  r.preloadedImages = {}, r.preloadedAudios = {}, r.locateFile && (B.startsWith("data:application/octet-stream;base64,") || (dt = B, B = r.locateFile ? r.locateFile(dt, S) : S + dt));
  var pe = 0, tt = {};
  function St(t) {
    for (; t.length; ) {
      var e = t.pop();
      t.pop()(e);
    }
  }
  function et(t) {
    return this.fromWireType(O[t >> 2]);
  }
  var N = {}, G = {}, rt = {}, de = 48, ge = 57;
  function xt(t) {
    if (t === void 0) return "_unknown";
    var e = (t = t.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
    return e >= de && e <= ge ? "_" + t : t;
  }
  function Mt(t, e) {
    return t = xt(t), new Function("body", "return function " + t + `() {
    "use strict";    return body.apply(this, arguments);
};
`)(e);
  }
  function vt(t, e) {
    var n = Mt(e, function(o) {
      this.name = e, this.message = o;
      var a = new Error(o).stack;
      a !== void 0 && (this.stack = this.toString() + `
` + a.replace(/^Error(:[^\n]*)?\n/, ""));
    });
    return n.prototype = Object.create(t.prototype), n.prototype.constructor = n, n.prototype.toString = function() {
      return this.message === void 0 ? this.name : this.name + ": " + this.message;
    }, n;
  }
  var Ot = void 0;
  function jt(t) {
    throw new Ot(t);
  }
  function Dt(t, e, n) {
    function o(u) {
      var s = n(u);
      s.length !== t.length && jt("Mismatched type converter count");
      for (var c = 0; c < t.length; ++c) j(t[c], s[c]);
    }
    t.forEach(function(u) {
      rt[u] = e;
    });
    var a = new Array(e.length), i = [], f = 0;
    e.forEach(function(u, s) {
      G.hasOwnProperty(u) ? a[s] = G[u] : (i.push(u), N.hasOwnProperty(u) || (N[u] = []), N[u].push(function() {
        a[s] = G[u], ++f === i.length && o(a);
      }));
    }), i.length === 0 && o(a);
  }
  function ht(t) {
    switch (t) {
      case 1:
        return 0;
      case 2:
        return 1;
      case 4:
        return 2;
      case 8:
        return 3;
      default:
        throw new TypeError("Unknown type size: " + t);
    }
  }
  var Bt = void 0;
  function C(t) {
    for (var e = "", n = t; T[n]; ) e += Bt[T[n++]];
    return e;
  }
  var Ht = void 0;
  function P(t) {
    throw new Ht(t);
  }
  function j(t, e, n) {
    if (n = n || {}, !("argPackAdvance" in e)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
    var o = e.name;
    if (t || P('type "' + o + '" must have a positive integer typeid pointer'), G.hasOwnProperty(t)) {
      if (n.ignoreDuplicateRegistrations) return;
      P("Cannot register type '" + o + "' twice");
    }
    if (G[t] = e, delete rt[t], N.hasOwnProperty(t)) {
      var a = N[t];
      delete N[t], a.forEach(function(i) {
        i();
      });
    }
  }
  var yt = [], k = [{}, { value: void 0 }, { value: null }, { value: !0 }, { value: !1 }];
  function Lt(t) {
    t > 4 && --k[t].refcount == 0 && (k[t] = void 0, yt.push(t));
  }
  function ve() {
    for (var t = 0, e = 5; e < k.length; ++e) k[e] !== void 0 && ++t;
    return t;
  }
  function he() {
    for (var t = 5; t < k.length; ++t) if (k[t] !== void 0) return k[t];
    return null;
  }
  function nt(t) {
    switch (t) {
      case void 0:
        return 1;
      case null:
        return 2;
      case !0:
        return 3;
      case !1:
        return 4;
      default:
        var e = yt.length ? yt.pop() : k.length;
        return k[e] = { refcount: 1, value: t }, e;
    }
  }
  function mt(t) {
    if (t === null) return "null";
    var e = typeof t;
    return e === "object" || e === "array" || e === "function" ? t.toString() : "" + t;
  }
  function ye(t, e) {
    switch (e) {
      case 2:
        return function(n) {
          return this.fromWireType(Pt[n >> 2]);
        };
      case 3:
        return function(n) {
          return this.fromWireType(Wt[n >> 3]);
        };
      default:
        throw new TypeError("Unknown float type: " + t);
    }
  }
  function me(t, e, n, o, a) {
    var i = e.length;
    i < 2 && P("argTypes array size mismatch! Must at least get return value and 'this' types!");
    for (var f = e[1] !== null && n !== null, u = !1, s = 1; s < e.length; ++s) if (e[s] !== null && e[s].destructorFunction === void 0) {
      u = !0;
      break;
    }
    var c = e[0].name !== "void", l = "", g = "";
    for (s = 0; s < i - 2; ++s) l += (s !== 0 ? ", " : "") + "arg" + s, g += (s !== 0 ? ", " : "") + "arg" + s + "Wired";
    var p = "return function " + xt(t) + "(" + l + `) {
if (arguments.length !== ` + (i - 2) + `) {
throwBindingError('function ` + t + " called with ' + arguments.length + ' arguments, expected " + (i - 2) + ` args!');
}
`;
    u && (p += `var destructors = [];
`);
    var d = u ? "destructors" : "null", m = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"], W = [P, o, a, St, e[0], e[1]];
    for (f && (p += "var thisWired = classParam.toWireType(" + d + `, this);
`), s = 0; s < i - 2; ++s) p += "var arg" + s + "Wired = argType" + s + ".toWireType(" + d + ", arg" + s + "); // " + e[s + 2].name + `
`, m.push("argType" + s), W.push(e[s + 2]);
    if (f && (g = "thisWired" + (g.length > 0 ? ", " : "") + g), p += (c ? "var rv = " : "") + "invoker(fn" + (g.length > 0 ? ", " : "") + g + `);
`, u) p += `runDestructors(destructors);
`;
    else for (s = f ? 1 : 2; s < e.length; ++s) {
      var F = s === 1 ? "thisWired" : "arg" + (s - 2) + "Wired";
      e[s].destructorFunction !== null && (p += F + "_dtor(" + F + "); // " + e[s].name + `
`, m.push(F + "_dtor"), W.push(e[s].destructorFunction));
    }
    return c && (p += `var ret = retType.fromWireType(rv);
return ret;
`), p += `}
`, m.push(p), function(h, it) {
      if (!(h instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof h + " which is not a function");
      var Jt = Mt(h.name || "unknownFunctionName", function() {
      });
      Jt.prototype = h.prototype;
      var Xt = new Jt(), Zt = h.apply(Xt, it);
      return Zt instanceof Object ? Zt : Xt;
    }(Function, m).apply(null, W);
  }
  function we(t, e, n) {
    r.hasOwnProperty(t) ? ((n === void 0 || r[t].overloadTable !== void 0 && r[t].overloadTable[n] !== void 0) && P("Cannot register public name '" + t + "' twice"), function(o, a, i) {
      if (o[a].overloadTable === void 0) {
        var f = o[a];
        o[a] = function() {
          return o[a].overloadTable.hasOwnProperty(arguments.length) || P("Function '" + i + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + o[a].overloadTable + ")!"), o[a].overloadTable[arguments.length].apply(this, arguments);
        }, o[a].overloadTable = [], o[a].overloadTable[f.argCount] = f;
      }
    }(r, t, t), r.hasOwnProperty(n) && P("Cannot register multiple overloads of a function with the same number of arguments (" + n + ")!"), r[t].overloadTable[n] = e) : (r[t] = e, n !== void 0 && (r[t].numArguments = n));
  }
  function be(t, e, n) {
    return t.includes("j") ? function(o, a, i) {
      var f = r["dynCall_" + o];
      return i && i.length ? f.apply(null, [a].concat(i)) : f.call(null, a);
    }(t, e, n) : z.get(e).apply(null, n);
  }
  function J(t, e) {
    var n, o, a, i = (t = C(t)).includes("j") ? (n = t, o = e, a = [], function() {
      a.length = arguments.length;
      for (var f = 0; f < arguments.length; f++) a[f] = arguments[f];
      return be(n, o, a);
    }) : z.get(e);
    return typeof i != "function" && P("unknown function pointer with signature " + t + ": " + e), i;
  }
  var Gt = void 0;
  function Nt(t) {
    var e = Yt(t), n = C(e);
    return D(e), n;
  }
  function Ae(t, e, n) {
    switch (e) {
      case 0:
        return n ? function(o) {
          return V[o];
        } : function(o) {
          return T[o];
        };
      case 1:
        return n ? function(o) {
          return q[o >> 1];
        } : function(o) {
          return K[o >> 1];
        };
      case 2:
        return n ? function(o) {
          return E[o >> 2];
        } : function(o) {
          return O[o >> 2];
        };
      default:
        throw new TypeError("Unknown integer type: " + t);
    }
  }
  var _e = {};
  function Vt() {
    return typeof globalThis == "object" ? globalThis : Function("return this")();
  }
  function Te(t, e) {
    var n = G[t];
    return n === void 0 && P(e + " has unknown type " + Nt(t)), n;
  }
  var qt = {};
  function Ee(t) {
    try {
      return ct.grow(t - pt.byteLength + 65535 >>> 16), Rt(ct.buffer), 1;
    } catch {
    }
  }
  var zt = {};
  function X() {
    if (!X.strings) {
      var t = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: w || "./this.program" };
      for (var e in zt) t[e] = zt[e];
      var n = [];
      for (var e in t) n.push(e + "=" + t[e]);
      X.strings = n;
    }
    return X.strings;
  }
  var ot = { mappings: {}, buffers: [null, [], []], printChar: function(t, e) {
    var n = ot.buffers[t];
    e === 0 || e === 10 ? ((t === 1 ? ft : M)(function(o, a, i) {
      for (var f = a + i, u = a; o[u] && !(u >= f); ) ++u;
      return Et.decode(o.subarray ? o.subarray(a, u) : new Uint8Array(o.slice(a, u)));
    }(n, 0)), n.length = 0) : n.push(e);
  }, varargs: void 0, get: function() {
    return ot.varargs += 4, E[ot.varargs - 4 >> 2];
  }, getStr: function(t) {
    return Ct(t);
  }, get64: function(t, e) {
    return t;
  } };
  Ot = r.InternalError = vt(Error, "InternalError"), function() {
    for (var t = new Array(256), e = 0; e < 256; ++e) t[e] = String.fromCharCode(e);
    Bt = t;
  }(), Ht = r.BindingError = vt(Error, "BindingError"), r.count_emval_handles = ve, r.get_first_emval = he, Gt = r.UnboundTypeError = vt(Error, "UnboundTypeError");
  var Ce = { B: function(t, e) {
  }, l: function(t) {
    var e = tt[t];
    delete tt[t];
    var n = e.rawConstructor, o = e.rawDestructor, a = e.fields;
    Dt([t], a.map(function(i) {
      return i.getterReturnType;
    }).concat(a.map(function(i) {
      return i.setterArgumentType;
    })), function(i) {
      var f = {};
      return a.forEach(function(u, s) {
        var c = u.fieldName, l = i[s], g = u.getter, p = u.getterContext, d = i[s + a.length], m = u.setter, W = u.setterContext;
        f[c] = { read: function(F) {
          return l.fromWireType(g(p, F));
        }, write: function(F, h) {
          var it = [];
          m(W, F, d.toWireType(it, h)), St(it);
        } };
      }), [{ name: e.name, fromWireType: function(u) {
        var s = {};
        for (var c in f) s[c] = f[c].read(u);
        return o(u), s;
      }, toWireType: function(u, s) {
        for (var c in f) if (!(c in s)) throw new TypeError('Missing field:  "' + c + '"');
        var l = n();
        for (c in f) f[c].write(l, s[c]);
        return u !== null && u.push(o, l), l;
      }, argPackAdvance: 8, readValueFromPointer: et, destructorFunction: o }];
    });
  }, p: function(t, e, n, o, a) {
  }, y: function(t, e, n, o, a) {
    var i = ht(n);
    j(t, { name: e = C(e), fromWireType: function(f) {
      return !!f;
    }, toWireType: function(f, u) {
      return u ? o : a;
    }, argPackAdvance: 8, readValueFromPointer: function(f) {
      var u;
      if (n === 1) u = V;
      else if (n === 2) u = q;
      else {
        if (n !== 4) throw new TypeError("Unknown boolean type size: " + e);
        u = E;
      }
      return this.fromWireType(u[f >> i]);
    }, destructorFunction: null });
  }, x: function(t, e) {
    j(t, { name: e = C(e), fromWireType: function(n) {
      var o = k[n].value;
      return Lt(n), o;
    }, toWireType: function(n, o) {
      return nt(o);
    }, argPackAdvance: 8, readValueFromPointer: et, destructorFunction: null });
  }, i: function(t, e, n) {
    var o = ht(n);
    j(t, { name: e = C(e), fromWireType: function(a) {
      return a;
    }, toWireType: function(a, i) {
      if (typeof i != "number" && typeof i != "boolean") throw new TypeError('Cannot convert "' + mt(i) + '" to ' + this.name);
      return i;
    }, argPackAdvance: 8, readValueFromPointer: ye(e, o), destructorFunction: null });
  }, f: function(t, e, n, o, a, i) {
    var f = function(u, s) {
      for (var c = [], l = 0; l < u; l++) c.push(E[(s >> 2) + l]);
      return c;
    }(e, n);
    t = C(t), a = J(o, a), we(t, function() {
      (function(u, s) {
        var c = [], l = {};
        throw s.forEach(function g(p) {
          l[p] || G[p] || (rt[p] ? rt[p].forEach(g) : (c.push(p), l[p] = !0));
        }), new Gt(u + ": " + c.map(Nt).join([", "]));
      })("Cannot call " + t + " due to unbound types", f);
    }, e - 1), Dt([], f, function(u) {
      var s = [u[0], null].concat(u.slice(1));
      return function(c, l, g) {
        r.hasOwnProperty(c) || jt("Replacing nonexistant public symbol"), r[c].overloadTable !== void 0 && g !== void 0 ? r[c].overloadTable[g] = l : (r[c] = l, r[c].argCount = g);
      }(t, me(t, s, null, a, i), e - 1), [];
    });
  }, c: function(t, e, n, o, a) {
    e = C(e), a === -1 && (a = 4294967295);
    var i = ht(n), f = function(c) {
      return c;
    };
    if (o === 0) {
      var u = 32 - 8 * n;
      f = function(c) {
        return c << u >>> u;
      };
    }
    var s = e.includes("unsigned");
    j(t, { name: e, fromWireType: f, toWireType: function(c, l) {
      if (typeof l != "number" && typeof l != "boolean") throw new TypeError('Cannot convert "' + mt(l) + '" to ' + this.name);
      if (l < o || l > a) throw new TypeError('Passing a number "' + mt(l) + '" from JS side to C/C++ side to an argument of type "' + e + '", which is outside the valid range [' + o + ", " + a + "]!");
      return s ? l >>> 0 : 0 | l;
    }, argPackAdvance: 8, readValueFromPointer: Ae(e, i, o !== 0), destructorFunction: null });
  }, b: function(t, e, n) {
    var o = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][e];
    function a(i) {
      var f = O, u = f[i >>= 2], s = f[i + 1];
      return new o(pt, s, u);
    }
    j(t, { name: n = C(n), fromWireType: a, argPackAdvance: 8, readValueFromPointer: a }, { ignoreDuplicateRegistrations: !0 });
  }, j: function(t, e) {
    var n = (e = C(e)) === "std::string";
    j(t, { name: e, fromWireType: function(o) {
      var a, i = O[o >> 2];
      if (n) for (var f = o + 4, u = 0; u <= i; ++u) {
        var s = o + 4 + u;
        if (u == i || T[s] == 0) {
          var c = Ct(f, s - f);
          a === void 0 ? a = c : (a += "\0", a += c), f = s + 1;
        }
      }
      else {
        var l = new Array(i);
        for (u = 0; u < i; ++u) l[u] = String.fromCharCode(T[o + 4 + u]);
        a = l.join("");
      }
      return D(o), a;
    }, toWireType: function(o, a) {
      var i;
      a instanceof ArrayBuffer && (a = new Uint8Array(a));
      var f = typeof a == "string";
      f || a instanceof Uint8Array || a instanceof Uint8ClampedArray || a instanceof Int8Array || P("Cannot pass non-string to std::string"), i = n && f ? function() {
        return function(g) {
          for (var p = 0, d = 0; d < g.length; ++d) {
            var m = g.charCodeAt(d);
            m >= 55296 && m <= 57343 && (m = 65536 + ((1023 & m) << 10) | 1023 & g.charCodeAt(++d)), m <= 127 ? ++p : p += m <= 2047 ? 2 : m <= 65535 ? 3 : 4;
          }
          return p;
        }(a);
      } : function() {
        return a.length;
      };
      var u = i(), s = wt(4 + u + 1);
      if (O[s >> 2] = u, n && f) (function(g, p, d, m) {
        if (!(m > 0)) return 0;
        for (var W = d + m - 1, F = 0; F < g.length; ++F) {
          var h = g.charCodeAt(F);
          if (h >= 55296 && h <= 57343 && (h = 65536 + ((1023 & h) << 10) | 1023 & g.charCodeAt(++F)), h <= 127) {
            if (d >= W) break;
            p[d++] = h;
          } else if (h <= 2047) {
            if (d + 1 >= W) break;
            p[d++] = 192 | h >> 6, p[d++] = 128 | 63 & h;
          } else if (h <= 65535) {
            if (d + 2 >= W) break;
            p[d++] = 224 | h >> 12, p[d++] = 128 | h >> 6 & 63, p[d++] = 128 | 63 & h;
          } else {
            if (d + 3 >= W) break;
            p[d++] = 240 | h >> 18, p[d++] = 128 | h >> 12 & 63, p[d++] = 128 | h >> 6 & 63, p[d++] = 128 | 63 & h;
          }
        }
        p[d] = 0;
      })(a, T, s + 4, u + 1);
      else if (f) for (var c = 0; c < u; ++c) {
        var l = a.charCodeAt(c);
        l > 255 && (D(s), P("String has UTF-16 code units that do not fit in 8 bits")), T[s + 4 + c] = l;
      }
      else for (c = 0; c < u; ++c) T[s + 4 + c] = a[c];
      return o !== null && o.push(D, s), s;
    }, argPackAdvance: 8, readValueFromPointer: et, destructorFunction: function(o) {
      D(o);
    } });
  }, e: function(t, e, n) {
    var o, a, i, f, u;
    n = C(n), e === 2 ? (o = ie, a = ue, f = se, i = function() {
      return K;
    }, u = 1) : e === 4 && (o = fe, a = ce, f = le, i = function() {
      return O;
    }, u = 2), j(t, { name: n, fromWireType: function(s) {
      for (var c, l = O[s >> 2], g = i(), p = s + 4, d = 0; d <= l; ++d) {
        var m = s + 4 + d * e;
        if (d == l || g[m >> u] == 0) {
          var W = o(p, m - p);
          c === void 0 ? c = W : (c += "\0", c += W), p = m + e;
        }
      }
      return D(s), c;
    }, toWireType: function(s, c) {
      typeof c != "string" && P("Cannot pass non-string to C++ string type " + n);
      var l = f(c), g = wt(4 + l + e);
      return O[g >> 2] = l >> u, a(c, g + 4, l + e), s !== null && s.push(D, g), g;
    }, argPackAdvance: 8, readValueFromPointer: et, destructorFunction: function(s) {
      D(s);
    } });
  }, m: function(t, e, n, o, a, i) {
    tt[t] = { name: C(e), rawConstructor: J(n, o), rawDestructor: J(a, i), fields: [] };
  }, a: function(t, e, n, o, a, i, f, u, s, c) {
    tt[t].fields.push({ fieldName: C(e), getterReturnType: n, getter: J(o, a), getterContext: i, setterArgumentType: f, setter: J(u, s), setterContext: c });
  }, z: function(t, e) {
    j(t, { isVoid: !0, name: e = C(e), argPackAdvance: 0, fromWireType: function() {
    }, toWireType: function(n, o) {
    } });
  }, g: Lt, u: function(t) {
    return t === 0 ? nt(Vt()) : (t = (n = _e[e = t]) === void 0 ? C(e) : n, nt(Vt()[t]));
    var e, n;
  }, k: function(t) {
    t > 4 && (k[t].refcount += 1);
  }, n: function(t, e, n, o) {
    t = function(i) {
      return i || P("Cannot use deleted val. handle = " + i), k[i].value;
    }(t);
    var a = qt[e];
    return a || (a = function(i) {
      for (var f = "", u = 0; u < i; ++u) f += (u !== 0 ? ", " : "") + "arg" + u;
      var s = "return function emval_allocator_" + i + `(constructor, argTypes, args) {
`;
      for (u = 0; u < i; ++u) s += "var argType" + u + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + u + '], "parameter ' + u + `");
var arg` + u + " = argType" + u + `.readValueFromPointer(args);
args += argType` + u + `['argPackAdvance'];
`;
      return s += "var obj = new constructor(" + f + `);
return __emval_register(obj);
}
`, new Function("requireRegisteredType", "Module", "__emval_register", s)(Te, r, nt);
    }(e), qt[e] = a), a(t, n, o);
  }, h: function() {
    Q();
  }, r: function(t, e, n) {
    T.copyWithin(t, e, e + n);
  }, d: function(t) {
    var e, n, o = T.length, a = 2147483648;
    if ((t >>>= 0) > a) return !1;
    for (var i = 1; i <= 4; i *= 2) {
      var f = o * (1 + 0.2 / i);
      if (f = Math.min(f, t + 100663296), Ee(Math.min(a, ((e = Math.max(t, f)) % (n = 65536) > 0 && (e += n - e % n), e)))) return !0;
    }
    return !1;
  }, s: function(t, e) {
    var n = 0;
    return X().forEach(function(o, a) {
      var i = e + n;
      E[t + 4 * a >> 2] = i, function(f, u, s) {
        for (var c = 0; c < f.length; ++c) V[0 | u++] = f.charCodeAt(c);
        V[0 | u] = 0;
      }(o, i), n += o.length + 1;
    }), 0;
  }, t: function(t, e) {
    var n = X();
    E[t >> 2] = n.length;
    var o = 0;
    return n.forEach(function(a) {
      o += a.length + 1;
    }), E[e >> 2] = o, 0;
  }, A: function(t) {
    (function(e, n) {
      oe || pe > 0 || (r.onExit && r.onExit(e), lt = !0), _(e, new Pe(e));
    })(t);
  }, w: function(t) {
    return 0;
  }, o: function(t, e, n, o, a) {
  }, v: function(t, e, n, o) {
    for (var a = 0, i = 0; i < n; i++) {
      for (var f = E[e + 8 * i >> 2], u = E[e + (8 * i + 4) >> 2], s = 0; s < u; s++) ot.printChar(t, T[f + s]);
      a += u;
    }
    return E[o >> 2] = a, 0;
  }, q: function(t) {
  } };
  (function(t) {
    var e = { a: Ce };
    function n(i, f) {
      var u, s = i.exports;
      r.asm = s, Rt((ct = r.asm.C).buffer), z = r.asm.I, u = r.asm.D, Ft.unshift(u), function(c) {
        if (L--, r.monitorRunDependencies && r.monitorRunDependencies(L), L == 0 && Y) {
          var l = Y;
          Y = null, l();
        }
      }();
    }
    function o(i) {
      n(i.instance);
    }
    function a(i) {
      return (!x && st && typeof fetch == "function" ? fetch(B, { credentials: "same-origin" }).then(function(f) {
        if (!f.ok) throw "failed to load wasm binary file at '" + B + "'";
        return f.arrayBuffer();
      }).catch(function() {
        return Ut(B);
      }) : Promise.resolve().then(function() {
        return Ut(B);
      })).then(function(f) {
        return WebAssembly.instantiate(f, e);
      }).then(i, function(f) {
        M("failed to asynchronously prepare wasm: " + f), Q(f);
      });
    }
    if (L++, r.monitorRunDependencies && r.monitorRunDependencies(L), r.instantiateWasm) try {
      return r.instantiateWasm(e, n);
    } catch (i) {
      return M("Module.instantiateWasm callback failed with error: " + i), !1;
    }
    (function(i) {
      return x || typeof WebAssembly.instantiateStreaming != "function" || typeof fetch != "function" ? a(o) : fetch(i, { credentials: "same-origin" }).then(function(f) {
        return WebAssembly.instantiateStreaming(f, e).then(o, function(u) {
          return M("wasm streaming compile failed: " + u), M("falling back to ArrayBuffer instantiation"), a(o);
        });
      });
    })(t).catch(b);
  })(U), r.___wasm_call_ctors = function() {
    return (r.___wasm_call_ctors = r.asm.D).apply(null, arguments);
  };
  var at, wt = r._malloc = function() {
    return (wt = r._malloc = r.asm.E).apply(null, arguments);
  }, D = r._free = function() {
    return (D = r._free = r.asm.F).apply(null, arguments);
  }, Yt = r.___getTypeName = function() {
    return (Yt = r.___getTypeName = r.asm.G).apply(null, arguments);
  };
  function Pe(t) {
    this.name = "ExitStatus", this.message = "Program terminated with exit(" + t + ")", this.status = t;
  }
  function bt(t) {
    function e() {
      at || (at = !0, r.calledRun = !0, lt || (gt(Ft), R(r), r.onRuntimeInitialized && r.onRuntimeInitialized(), function() {
        if (r.postRun) for (typeof r.postRun == "function" && (r.postRun = [r.postRun]); r.postRun.length; ) n = r.postRun.shift(), It.unshift(n);
        var n;
        gt(It);
      }()));
    }
    L > 0 || (function() {
      if (r.preRun) for (typeof r.preRun == "function" && (r.preRun = [r.preRun]); r.preRun.length; ) n = r.preRun.shift(), kt.unshift(n);
      var n;
      gt(kt);
    }(), L > 0 || (r.setStatus ? (r.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        r.setStatus("");
      }, 1), e();
    }, 1)) : e()));
  }
  if (r.___embind_register_native_and_builtin_types = function() {
    return (r.___embind_register_native_and_builtin_types = r.asm.H).apply(null, arguments);
  }, r.dynCall_jiji = function() {
    return (r.dynCall_jiji = r.asm.J).apply(null, arguments);
  }, Y = function t() {
    at || bt(), at || (Y = t);
  }, r.run = bt, r.preInit) for (typeof r.preInit == "function" && (r.preInit = [r.preInit]); r.preInit.length > 0; ) r.preInit.pop()();
  return bt(), r.ready;
}), ne = ((r) => (r[r.GRAYSCALE = 1] = "GRAYSCALE", r[r.RGB = 2] = "RGB", r[r.YCbCr = 3] = "YCbCr", r))(ne || {});
let _t;
ne.YCbCr;
self.onmessage = async (r) => {
  const { file: U, init: R, options: b } = r.data ?? {};
  if (!U) return;
  const { buffer: v, data: A } = U;
  switch (R.assetType) {
    case ut.Png:
      try {
        if (!v) return void self.postMessage({ type: H.Error, output: "Invalid PNG data" });
        await (async (w) => {
          te || (te = await re(Qt(w)));
        })(R.oxipngWasm);
        const y = ((w, _) => We(new Uint8Array(w), (_ == null ? void 0 : _.level) ?? 3, (_ == null ? void 0 : _.interlace) ?? !1))(v, b);
        self.postMessage({ type: H.Complete, output: y });
      } catch (y) {
        self.postMessage({ type: H.Error, output: y });
      }
      break;
    case ut.Jpeg:
      try {
        if (!A) return void self.postMessage({ type: H.Error, output: "Invalid JPG data" });
        await (async (w) => {
          _t || (_t = await ke({}, Qt(w)));
        })(R.mozjpegWasm);
        const y = ((w, _) => _t.encode(w.data, w.width, w.height, _))(A, b);
        self.postMessage({ type: H.Complete, output: y });
      } catch (y) {
        self.postMessage({ type: H.Error, output: y });
      }
      break;
    default:
      console.log("Error: unknown worker command", r.data), self.postMessage({ type: H.Error, output: "Unknown command" });
  }
};
//# sourceMappingURL=optimize-worker-CTLlZoSs.js.map
