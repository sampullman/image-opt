(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".o-image[data-v-f697f219]{display:flex;justify-content:center;align-items:center;width:100%;height:100%;padding:4px;position:relative}.o-asset[data-v-f697f219]{width:100%;height:100%;background-size:cover;background-position:center;-o-object-fit:contain;object-fit:contain;-o-object-position:center;object-position:center}.o-default[data-v-f697f219]{width:32px;height:32px}.o-spinner{display:inline-flex;align-items:center}.o-spinner .dot{width:var(--2454e84c);height:var(--2454e84c);border-radius:50%;background-color:var(--05e43051);animation:scale .6s ease alternate infinite}.o-spinner .dot:not(:first-child){margin-left:calc(var(--2454e84c) / 4)}.o-spinner .dot:nth-of-type(2){animation-delay:.2s}.o-spinner .dot:nth-of-type(3){animation-delay:.4s}@keyframes scale{0%{transform:scale(0)}to{transform:scale(1)}}.o-upload-wrap{display:flex;justify-content:center;align-items:center;border:1px solid #bdbfc2}.o-upload-form{position:relative;height:100%;width:100%}.o-upload-background{display:flex;justify-content:center;align-items:center;position:absolute;top:0;width:100%;height:100%;background-color:transparent;background-size:contain;background-position:center;padding:0}.o-upload{cursor:pointer;opacity:0;position:absolute;left:0;top:0;width:100%;height:100%}.o-upload-button{display:flex;flex-direction:row;color:#000;text-align:left;pointer-events:none;font-size:16px;line-height:22px;font-weight:300}.o-upload-left{display:flex;justify-content:center;align-items:center;width:50%;border-right:1px solid #bdbfc2;position:relative}.o-upload-image{position:absolute}.o-upload-right{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:0 40px;width:50%}.o-upload-title{font-weight:600}.o-upload-subtitle{align-items:center;font-size:10px;line-height:16px;font-weight:300;display:inline;margin-top:8px}.o-upload-subtitle span{margin:0 3px;color:#3a86ff}:scope.has-file{border:#3a86ff}:scope.dragging{border-color:#3a86ff}:scope.dragging .file-upload-left{border-color:#3a86ff}.o-upload-spinner{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}.o-upload-button,.o-upload-spinner{z-index:10;position:absolute;width:100%;height:100%}.o-upload-button .loader,.o-upload-spinner .loader{margin:0}.o-upload-button img,.o-upload-spinner img{width:32px;margin-bottom:6px}.o-button{font-weight:500;font-size:15px;letter-spacing:1.5px;margin-top:12px;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;cursor:pointer;text-align:center;border-radius:6px;transition:background-color .15s ease;min-width:100px;position:relative;height:38px;padding:0 32px;background-color:#3a86ff;color:#fff}.o-button:hover:not(:disabled){background-color:#3a86ffe6}.o-button:focus:not(:disabled){box-shadow:none;background-color:#3a86ffcc}.o-button.disabled{background-color:#9e9ea1;color:#fff;cursor:not-allowed;-webkit-user-select:none;-moz-user-select:none;user-select:none}.o-button .o-hidden{visibility:hidden}.o-button .o-animate{width:100%;height:100%;position:absolute}.o-button .o-spinner{position:absolute;display:flex;justify-content:center;align-items:center;left:0;top:0;right:0;bottom:0}.optimizer[data-v-24e73325]{display:flex;flex-direction:column;justify-content:center;align-items:center}.opt-wrap[data-v-24e73325]{width:480px;max-width:95%}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const { defineComponent: we, toRefs: Ye, computed: rr, openBlock: M, createElementBlock: D, normalizeStyle: Wn, pushScopeId: tr, popScopeId: ar, createElementVNode: j, useCssVars: or, ref: re, normalizeClass: qe, renderSlot: ir, createBlock: ur, createCommentVNode: ye, toDisplayString: Se, createVNode: ze, unref: bn } = window.Vue;
const _n = (r) => (tr("data-v-f697f219"), r = r(), ar(), r), sr = { class: "o-image" }, lr = ["src"], cr = { key: 2, xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", class: "o-image-default" }, fr = [_n(() => j("path", { fill: "currentColor", d: "M19 14a3 3 0 1 0-3-3a3 3 0 0 0 3 3Zm0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1Z" }, null, -1)), _n(() => j("path", { fill: "currentColor", d: "M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 22H6v-6l5-5l5.59 5.59a2 2 0 0 0 2.82 0L21 19l5 5Zm0-4.83l-3.59-3.59a2 2 0 0 0-2.82 0L18 19.17l-5.59-5.59a2 2 0 0 0-2.82 0L6 17.17V6h20Z" }, null, -1))], Pn = (r, f) => {
  const h = r.__vccOpts || r;
  for (const [m, g] of f) h[m] = g;
  return h;
}, pr = Pn(we({ __name: "Image", props: { asset: { default: null }, asImg: { type: Boolean }, contentHash: { default: void 0 } }, setup(r) {
  const f = r, { asset: h, contentHash: m } = Ye(f), g = rr(() => {
    const y = m.value;
    return (h.value ?? "") + (y ? `?${y}` : "");
  });
  return (y, d) => (M(), D("div", sr, [y.asImg && g.value ? (M(), D("img", { key: 0, src: g.value, class: "o-asset" }, null, 8, lr)) : g.value ? (M(), D("div", { key: 1, style: Wn({ backgroundImage: `url(${g.value})` }), class: "o-asset" }, null, 4)) : (M(), D("svg", cr, fr))]));
} }), [["__scopeId", "data-v-f697f219"]]);
var oe = ((r) => (r.Png = "image/png", r.Jpeg = "image/jpeg", r))(oe || {});
const An = Object.values(oe);
async function dr(r) {
  const f = URL.createObjectURL(r);
  try {
    return await async function(h) {
      const m = new Image();
      m.decoding = "async", m.src = h;
      const g = new Promise((y, d) => {
        m.onload = () => y(), m.onerror = () => d(Error("Image loading error"));
      });
      return m.decode && await m.decode().catch(() => null), await g, m;
    }(f);
  } finally {
    URL.revokeObjectURL(f);
  }
}
async function gr(r) {
  const f = "createImageBitmap" in self ? createImageBitmap(r) : dr(r);
  return function(h) {
    const m = h.width, g = h.height, y = h.width, d = h.height, _ = document.createElement("canvas");
    _.width = m, _.height = g;
    const E = _.getContext("2d");
    if (!E) throw new Error("Could not create canvas context");
    return E.drawImage(h, 0, 0, y, d, 0, 0, m, g), E.getImageData(0, 0, m, g);
  }(await f);
}
const Ze = (r) => {
  if (r) return new URL(r);
};
var Ne, mr = (Ne = import.meta.url, function(r, f) {
  var h, m;
  (r = (r = r || {}) !== void 0 ? r : {}).ready = new Promise(function(e, n) {
    h = e, m = n;
  });
  var g, y = {};
  for (g in r) r.hasOwnProperty(g) && (y[g] = r[g]);
  var d, _ = "./this.program", E = function(e, n) {
    throw n;
  }, O = !0, v = "";
  v = self.location.href, Ne && (v = Ne), v = v.indexOf("blob:") !== 0 ? v.substr(0, v.lastIndexOf("/") + 1) : "", d = function(e) {
    var n = new XMLHttpRequest();
    return n.open("GET", e, !1), n.responseType = "arraybuffer", n.send(null), new Uint8Array(n.response);
  };
  var C, z = r.print || console.log.bind(console), U = r.printErr || console.warn.bind(console);
  for (g in y) y.hasOwnProperty(g) && (r[g] = y[g]);
  y = null, r.arguments && r.arguments, r.thisProgram && (_ = r.thisProgram), r.quit && (E = r.quit), r.wasmBinary && (C = r.wasmBinary);
  var q, G = r.noExitRuntime || !0;
  typeof WebAssembly != "object" && Ce("no native wasm support detected");
  var F = !1, S = new TextDecoder("utf8");
  function W(e, n) {
    if (!e) return "";
    for (var t = e + n, a = e; !(a >= t) && x[a]; ) ++a;
    return S.decode(x.subarray(e, a));
  }
  var R, P, x, K, H, L, J, ce, se, te, be = new TextDecoder("utf-16le");
  function _e(e, n) {
    for (var t = e, a = t >> 1, o = a + n / 2; !(a >= o) && H[a]; ) ++a;
    return t = a << 1, be.decode(x.subarray(e, t));
  }
  function Ae(e, n, t) {
    if (t === void 0 && (t = 2147483647), t < 2) return 0;
    for (var a = n, o = (t -= 2) < 2 * e.length ? t / 2 : e.length, u = 0; u < o; ++u) {
      var c = e.charCodeAt(u);
      K[n >> 1] = c, n += 2;
    }
    return K[n >> 1] = 0, n - a;
  }
  function Te(e) {
    return 2 * e.length;
  }
  function Ee(e, n) {
    for (var t = 0, a = ""; !(t >= n / 4); ) {
      var o = L[e + 4 * t >> 2];
      if (o == 0) break;
      if (++t, o >= 65536) {
        var u = o - 65536;
        a += String.fromCharCode(55296 | u >> 10, 56320 | 1023 & u);
      } else a += String.fromCharCode(o);
    }
    return a;
  }
  function Mn(e, n, t) {
    if (t === void 0 && (t = 2147483647), t < 4) return 0;
    for (var a = n, o = a + t - 4, u = 0; u < e.length; ++u) {
      var c = e.charCodeAt(u);
      if (c >= 55296 && c <= 57343 && (c = 65536 + ((1023 & c) << 10) | 1023 & e.charCodeAt(++u)), L[n >> 2] = c, (n += 4) + 4 > o) break;
    }
    return L[n >> 2] = 0, n - a;
  }
  function Bn(e) {
    for (var n = 0, t = 0; t < e.length; ++t) {
      var a = e.charCodeAt(t);
      a >= 55296 && a <= 57343 && ++t, n += 4;
    }
    return n;
  }
  function $e(e) {
    R = e, r.HEAP8 = P = new Int8Array(e), r.HEAP16 = K = new Int16Array(e), r.HEAP32 = L = new Int32Array(e), r.HEAPU8 = x = new Uint8Array(e), r.HEAPU16 = H = new Uint16Array(e), r.HEAPU32 = J = new Uint32Array(e), r.HEAPF32 = ce = new Float32Array(e), r.HEAPF64 = se = new Float64Array(e);
  }
  r.INITIAL_MEMORY;
  var ae, Le, Qe = [], Ke = [], Xe = [], ie = 0, fe = null;
  function Ce(e) {
    r.onAbort && r.onAbort(e), U(e += ""), F = !0, e = "abort(" + e + "). Build with -s ASSERTIONS=1 for more info.";
    var n = new WebAssembly.RuntimeError(e);
    throw m(n), n;
  }
  function en(e) {
    try {
      if (e == ae && C) return new Uint8Array(C);
      if (d) return d(e);
      throw "both async and sync fetching of the wasm failed";
    } catch (n) {
      Ce(n);
    }
  }
  function Oe(e) {
    for (; e.length > 0; ) {
      var n = e.shift();
      if (typeof n != "function") {
        var t = n.func;
        typeof t == "number" ? n.arg === void 0 ? te.get(t)() : te.get(t)(n.arg) : t(n.arg === void 0 ? null : n.arg);
      } else n(r);
    }
  }
  r.preloadedImages = {}, r.preloadedAudios = {}, r.locateFile && (ae.startsWith("data:application/octet-stream;base64,") || (Le = ae, ae = r.locateFile ? r.locateFile(Le, v) : v + Le));
  var Dn = 0, ke = {};
  function nn(e) {
    for (; e.length; ) {
      var n = e.pop();
      e.pop()(n);
    }
  }
  function We(e) {
    return this.fromWireType(J[e >> 2]);
  }
  var le = {}, ue = {}, Pe = {}, Hn = 48, Vn = 57;
  function rn(e) {
    if (e === void 0) return "_unknown";
    var n = (e = e.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
    return n >= Hn && n <= Vn ? "_" + e : e;
  }
  function tn(e, n) {
    return e = rn(e), new Function("body", "return function " + e + `() {
    "use strict";    return body.apply(this, arguments);
};
`)(n);
  }
  function je(e, n) {
    var t = tn(n, function(a) {
      this.name = n, this.message = a;
      var o = new Error(a).stack;
      o !== void 0 && (this.stack = this.toString() + `
` + o.replace(/^Error(:[^\n]*)?\n/, ""));
    });
    return t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.prototype.toString = function() {
      return this.message === void 0 ? this.name : this.name + ": " + this.message;
    }, t;
  }
  var an = void 0;
  function on(e) {
    throw new an(e);
  }
  function un(e, n, t) {
    function a(s) {
      var l = t(s);
      l.length !== e.length && on("Mismatched type converter count");
      for (var p = 0; p < e.length; ++p) ee(e[p], l[p]);
    }
    e.forEach(function(s) {
      Pe[s] = n;
    });
    var o = new Array(n.length), u = [], c = 0;
    n.forEach(function(s, l) {
      ue.hasOwnProperty(s) ? o[l] = ue[s] : (u.push(s), le.hasOwnProperty(s) || (le[s] = []), le[s].push(function() {
        o[l] = ue[s], ++c === u.length && a(o);
      }));
    }), u.length === 0 && a(o);
  }
  function Me(e) {
    switch (e) {
      case 1:
        return 0;
      case 2:
        return 1;
      case 4:
        return 2;
      case 8:
        return 3;
      default:
        throw new TypeError("Unknown type size: " + e);
    }
  }
  var sn = void 0;
  function B(e) {
    for (var n = "", t = e; x[t]; ) n += sn[x[t++]];
    return n;
  }
  var ln = void 0;
  function V(e) {
    throw new ln(e);
  }
  function ee(e, n, t) {
    if (t = t || {}, !("argPackAdvance" in n)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
    var a = n.name;
    if (e || V('type "' + a + '" must have a positive integer typeid pointer'), ue.hasOwnProperty(e)) {
      if (t.ignoreDuplicateRegistrations) return;
      V("Cannot register type '" + a + "' twice");
    }
    if (ue[e] = n, delete Pe[e], le.hasOwnProperty(e)) {
      var o = le[e];
      delete le[e], o.forEach(function(u) {
        u();
      });
    }
  }
  var Be = [], Y = [{}, { value: void 0 }, { value: null }, { value: !0 }, { value: !1 }];
  function cn(e) {
    e > 4 && --Y[e].refcount == 0 && (Y[e] = void 0, Be.push(e));
  }
  function Nn() {
    for (var e = 0, n = 5; n < Y.length; ++n) Y[n] !== void 0 && ++e;
    return e;
  }
  function qn() {
    for (var e = 5; e < Y.length; ++e) if (Y[e] !== void 0) return Y[e];
    return null;
  }
  function Re(e) {
    switch (e) {
      case void 0:
        return 1;
      case null:
        return 2;
      case !0:
        return 3;
      case !1:
        return 4;
      default:
        var n = Be.length ? Be.pop() : Y.length;
        return Y[n] = { refcount: 1, value: e }, n;
    }
  }
  function De(e) {
    if (e === null) return "null";
    var n = typeof e;
    return n === "object" || n === "array" || n === "function" ? e.toString() : "" + e;
  }
  function Gn(e, n) {
    switch (n) {
      case 2:
        return function(t) {
          return this.fromWireType(ce[t >> 2]);
        };
      case 3:
        return function(t) {
          return this.fromWireType(se[t >> 3]);
        };
      default:
        throw new TypeError("Unknown float type: " + e);
    }
  }
  function Jn(e, n, t, a, o) {
    var u = n.length;
    u < 2 && V("argTypes array size mismatch! Must at least get return value and 'this' types!");
    for (var c = n[1] !== null && t !== null, s = !1, l = 1; l < n.length; ++l) if (n[l] !== null && n[l].destructorFunction === void 0) {
      s = !0;
      break;
    }
    var p = n[0].name !== "void", w = "", T = "";
    for (l = 0; l < u - 2; ++l) w += (l !== 0 ? ", " : "") + "arg" + l, T += (l !== 0 ? ", " : "") + "arg" + l + "Wired";
    var b = "return function " + rn(e) + "(" + w + `) {
if (arguments.length !== ` + (u - 2) + `) {
throwBindingError('function ` + e + " called with ' + arguments.length + ' arguments, expected " + (u - 2) + ` args!');
}
`;
    s && (b += `var destructors = [];
`);
    var A = s ? "destructors" : "null", I = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"], N = [V, a, o, nn, n[0], n[1]];
    for (c && (b += "var thisWired = classParam.toWireType(" + A + `, this);
`), l = 0; l < u - 2; ++l) b += "var arg" + l + "Wired = argType" + l + ".toWireType(" + A + ", arg" + l + "); // " + n[l + 2].name + `
`, I.push("argType" + l), N.push(n[l + 2]);
    if (c && (T = "thisWired" + (T.length > 0 ? ", " : "") + T), b += (p ? "var rv = " : "") + "invoker(fn" + (T.length > 0 ? ", " : "") + T + `);
`, s) b += `runDestructors(destructors);
`;
    else for (l = c ? 1 : 2; l < n.length; ++l) {
      var Z = l === 1 ? "thisWired" : "arg" + (l - 2) + "Wired";
      n[l].destructorFunction !== null && (b += Z + "_dtor(" + Z + "); // " + n[l].name + `
`, I.push(Z + "_dtor"), N.push(n[l].destructorFunction));
    }
    return p && (b += `var ret = retType.fromWireType(rv);
return ret;
`), b += `}
`, I.push(b), function(k, Ue) {
      if (!(k instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof k + " which is not a function");
      var yn = tn(k.name || "unknownFunctionName", function() {
      });
      yn.prototype = k.prototype;
      var hn = new yn(), wn = k.apply(hn, Ue);
      return wn instanceof Object ? wn : hn;
    }(Function, I).apply(null, N);
  }
  function Yn(e, n, t) {
    r.hasOwnProperty(e) ? ((t === void 0 || r[e].overloadTable !== void 0 && r[e].overloadTable[t] !== void 0) && V("Cannot register public name '" + e + "' twice"), function(a, o, u) {
      if (a[o].overloadTable === void 0) {
        var c = a[o];
        a[o] = function() {
          return a[o].overloadTable.hasOwnProperty(arguments.length) || V("Function '" + u + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + a[o].overloadTable + ")!"), a[o].overloadTable[arguments.length].apply(this, arguments);
        }, a[o].overloadTable = [], a[o].overloadTable[c.argCount] = c;
      }
    }(r, e, e), r.hasOwnProperty(t) && V("Cannot register multiple overloads of a function with the same number of arguments (" + t + ")!"), r[e].overloadTable[t] = n) : (r[e] = n, t !== void 0 && (r[e].numArguments = t));
  }
  function Zn(e, n, t) {
    return e.includes("j") ? function(a, o, u) {
      var c = r["dynCall_" + a];
      return u && u.length ? c.apply(null, [o].concat(u)) : c.call(null, o);
    }(e, n, t) : te.get(n).apply(null, t);
  }
  function pe(e, n) {
    var t, a, o, u = (e = B(e)).includes("j") ? (t = e, a = n, o = [], function() {
      o.length = arguments.length;
      for (var c = 0; c < arguments.length; c++) o[c] = arguments[c];
      return Zn(t, a, o);
    }) : te.get(n);
    return typeof u != "function" && V("unknown function pointer with signature " + e + ": " + n), u;
  }
  var fn = void 0;
  function pn(e) {
    var n = vn(e), t = B(n);
    return ne(n), t;
  }
  function $n(e, n, t) {
    switch (n) {
      case 0:
        return t ? function(a) {
          return P[a];
        } : function(a) {
          return x[a];
        };
      case 1:
        return t ? function(a) {
          return K[a >> 1];
        } : function(a) {
          return H[a >> 1];
        };
      case 2:
        return t ? function(a) {
          return L[a >> 2];
        } : function(a) {
          return J[a >> 2];
        };
      default:
        throw new TypeError("Unknown integer type: " + e);
    }
  }
  var Qn = {};
  function dn() {
    return typeof globalThis == "object" ? globalThis : Function("return this")();
  }
  function Kn(e, n) {
    var t = ue[e];
    return t === void 0 && V(n + " has unknown type " + pn(e)), t;
  }
  var gn = {};
  function Xn(e) {
    try {
      return q.grow(e - R.byteLength + 65535 >>> 16), $e(q.buffer), 1;
    } catch {
    }
  }
  var mn = {};
  function de() {
    if (!de.strings) {
      var e = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: _ || "./this.program" };
      for (var n in mn) e[n] = mn[n];
      var t = [];
      for (var n in e) t.push(n + "=" + e[n]);
      de.strings = t;
    }
    return de.strings;
  }
  var xe = { mappings: {}, buffers: [null, [], []], printChar: function(e, n) {
    var t = xe.buffers[e];
    n === 0 || n === 10 ? ((e === 1 ? z : U)(function(a, o, u) {
      for (var c = o + u, s = o; a[s] && !(s >= c); ) ++s;
      return S.decode(a.subarray ? a.subarray(o, s) : new Uint8Array(a.slice(o, s)));
    }(t, 0)), t.length = 0) : t.push(n);
  }, varargs: void 0, get: function() {
    return xe.varargs += 4, L[xe.varargs - 4 >> 2];
  }, getStr: function(e) {
    return W(e);
  }, get64: function(e, n) {
    return e;
  } };
  an = r.InternalError = je(Error, "InternalError"), function() {
    for (var e = new Array(256), n = 0; n < 256; ++n) e[n] = String.fromCharCode(n);
    sn = e;
  }(), ln = r.BindingError = je(Error, "BindingError"), r.count_emval_handles = Nn, r.get_first_emval = qn, fn = r.UnboundTypeError = je(Error, "UnboundTypeError");
  var er = { B: function(e, n) {
  }, l: function(e) {
    var n = ke[e];
    delete ke[e];
    var t = n.rawConstructor, a = n.rawDestructor, o = n.fields;
    un([e], o.map(function(u) {
      return u.getterReturnType;
    }).concat(o.map(function(u) {
      return u.setterArgumentType;
    })), function(u) {
      var c = {};
      return o.forEach(function(s, l) {
        var p = s.fieldName, w = u[l], T = s.getter, b = s.getterContext, A = u[l + o.length], I = s.setter, N = s.setterContext;
        c[p] = { read: function(Z) {
          return w.fromWireType(T(b, Z));
        }, write: function(Z, k) {
          var Ue = [];
          I(N, Z, A.toWireType(Ue, k)), nn(Ue);
        } };
      }), [{ name: n.name, fromWireType: function(s) {
        var l = {};
        for (var p in c) l[p] = c[p].read(s);
        return a(s), l;
      }, toWireType: function(s, l) {
        for (var p in c) if (!(p in l)) throw new TypeError('Missing field:  "' + p + '"');
        var w = t();
        for (p in c) c[p].write(w, l[p]);
        return s !== null && s.push(a, w), w;
      }, argPackAdvance: 8, readValueFromPointer: We, destructorFunction: a }];
    });
  }, p: function(e, n, t, a, o) {
  }, y: function(e, n, t, a, o) {
    var u = Me(t);
    ee(e, { name: n = B(n), fromWireType: function(c) {
      return !!c;
    }, toWireType: function(c, s) {
      return s ? a : o;
    }, argPackAdvance: 8, readValueFromPointer: function(c) {
      var s;
      if (t === 1) s = P;
      else if (t === 2) s = K;
      else {
        if (t !== 4) throw new TypeError("Unknown boolean type size: " + n);
        s = L;
      }
      return this.fromWireType(s[c >> u]);
    }, destructorFunction: null });
  }, x: function(e, n) {
    ee(e, { name: n = B(n), fromWireType: function(t) {
      var a = Y[t].value;
      return cn(t), a;
    }, toWireType: function(t, a) {
      return Re(a);
    }, argPackAdvance: 8, readValueFromPointer: We, destructorFunction: null });
  }, i: function(e, n, t) {
    var a = Me(t);
    ee(e, { name: n = B(n), fromWireType: function(o) {
      return o;
    }, toWireType: function(o, u) {
      if (typeof u != "number" && typeof u != "boolean") throw new TypeError('Cannot convert "' + De(u) + '" to ' + this.name);
      return u;
    }, argPackAdvance: 8, readValueFromPointer: Gn(n, a), destructorFunction: null });
  }, f: function(e, n, t, a, o, u) {
    var c = function(s, l) {
      for (var p = [], w = 0; w < s; w++) p.push(L[(l >> 2) + w]);
      return p;
    }(n, t);
    e = B(e), o = pe(a, o), Yn(e, function() {
      (function(s, l) {
        var p = [], w = {};
        throw l.forEach(function T(b) {
          w[b] || ue[b] || (Pe[b] ? Pe[b].forEach(T) : (p.push(b), w[b] = !0));
        }), new fn(s + ": " + p.map(pn).join([", "]));
      })("Cannot call " + e + " due to unbound types", c);
    }, n - 1), un([], c, function(s) {
      var l = [s[0], null].concat(s.slice(1));
      return function(p, w, T) {
        r.hasOwnProperty(p) || on("Replacing nonexistant public symbol"), r[p].overloadTable !== void 0 && T !== void 0 ? r[p].overloadTable[T] = w : (r[p] = w, r[p].argCount = T);
      }(e, Jn(e, l, null, o, u), n - 1), [];
    });
  }, c: function(e, n, t, a, o) {
    n = B(n), o === -1 && (o = 4294967295);
    var u = Me(t), c = function(p) {
      return p;
    };
    if (a === 0) {
      var s = 32 - 8 * t;
      c = function(p) {
        return p << s >>> s;
      };
    }
    var l = n.includes("unsigned");
    ee(e, { name: n, fromWireType: c, toWireType: function(p, w) {
      if (typeof w != "number" && typeof w != "boolean") throw new TypeError('Cannot convert "' + De(w) + '" to ' + this.name);
      if (w < a || w > o) throw new TypeError('Passing a number "' + De(w) + '" from JS side to C/C++ side to an argument of type "' + n + '", which is outside the valid range [' + a + ", " + o + "]!");
      return l ? w >>> 0 : 0 | w;
    }, argPackAdvance: 8, readValueFromPointer: $n(n, u, a !== 0), destructorFunction: null });
  }, b: function(e, n, t) {
    var a = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][n];
    function o(u) {
      var c = J, s = c[u >>= 2], l = c[u + 1];
      return new a(R, l, s);
    }
    ee(e, { name: t = B(t), fromWireType: o, argPackAdvance: 8, readValueFromPointer: o }, { ignoreDuplicateRegistrations: !0 });
  }, j: function(e, n) {
    var t = (n = B(n)) === "std::string";
    ee(e, { name: n, fromWireType: function(a) {
      var o, u = J[a >> 2];
      if (t) for (var c = a + 4, s = 0; s <= u; ++s) {
        var l = a + 4 + s;
        if (s == u || x[l] == 0) {
          var p = W(c, l - c);
          o === void 0 ? o = p : (o += "\0", o += p), c = l + 1;
        }
      }
      else {
        var w = new Array(u);
        for (s = 0; s < u; ++s) w[s] = String.fromCharCode(x[a + 4 + s]);
        o = w.join("");
      }
      return ne(a), o;
    }, toWireType: function(a, o) {
      var u;
      o instanceof ArrayBuffer && (o = new Uint8Array(o));
      var c = typeof o == "string";
      c || o instanceof Uint8Array || o instanceof Uint8ClampedArray || o instanceof Int8Array || V("Cannot pass non-string to std::string"), u = t && c ? function() {
        return function(T) {
          for (var b = 0, A = 0; A < T.length; ++A) {
            var I = T.charCodeAt(A);
            I >= 55296 && I <= 57343 && (I = 65536 + ((1023 & I) << 10) | 1023 & T.charCodeAt(++A)), I <= 127 ? ++b : b += I <= 2047 ? 2 : I <= 65535 ? 3 : 4;
          }
          return b;
        }(o);
      } : function() {
        return o.length;
      };
      var s = u(), l = He(4 + s + 1);
      if (J[l >> 2] = s, t && c) (function(T, b, A, I) {
        if (!(I > 0)) return 0;
        for (var N = A + I - 1, Z = 0; Z < T.length; ++Z) {
          var k = T.charCodeAt(Z);
          if (k >= 55296 && k <= 57343 && (k = 65536 + ((1023 & k) << 10) | 1023 & T.charCodeAt(++Z)), k <= 127) {
            if (A >= N) break;
            b[A++] = k;
          } else if (k <= 2047) {
            if (A + 1 >= N) break;
            b[A++] = 192 | k >> 6, b[A++] = 128 | 63 & k;
          } else if (k <= 65535) {
            if (A + 2 >= N) break;
            b[A++] = 224 | k >> 12, b[A++] = 128 | k >> 6 & 63, b[A++] = 128 | 63 & k;
          } else {
            if (A + 3 >= N) break;
            b[A++] = 240 | k >> 18, b[A++] = 128 | k >> 12 & 63, b[A++] = 128 | k >> 6 & 63, b[A++] = 128 | 63 & k;
          }
        }
        b[A] = 0;
      })(o, x, l + 4, s + 1);
      else if (c) for (var p = 0; p < s; ++p) {
        var w = o.charCodeAt(p);
        w > 255 && (ne(l), V("String has UTF-16 code units that do not fit in 8 bits")), x[l + 4 + p] = w;
      }
      else for (p = 0; p < s; ++p) x[l + 4 + p] = o[p];
      return a !== null && a.push(ne, l), l;
    }, argPackAdvance: 8, readValueFromPointer: We, destructorFunction: function(a) {
      ne(a);
    } });
  }, e: function(e, n, t) {
    var a, o, u, c, s;
    t = B(t), n === 2 ? (a = _e, o = Ae, c = Te, u = function() {
      return H;
    }, s = 1) : n === 4 && (a = Ee, o = Mn, c = Bn, u = function() {
      return J;
    }, s = 2), ee(e, { name: t, fromWireType: function(l) {
      for (var p, w = J[l >> 2], T = u(), b = l + 4, A = 0; A <= w; ++A) {
        var I = l + 4 + A * n;
        if (A == w || T[I >> s] == 0) {
          var N = a(b, I - b);
          p === void 0 ? p = N : (p += "\0", p += N), b = I + n;
        }
      }
      return ne(l), p;
    }, toWireType: function(l, p) {
      typeof p != "string" && V("Cannot pass non-string to C++ string type " + t);
      var w = c(p), T = He(4 + w + n);
      return J[T >> 2] = w >> s, o(p, T + 4, w + n), l !== null && l.push(ne, T), T;
    }, argPackAdvance: 8, readValueFromPointer: We, destructorFunction: function(l) {
      ne(l);
    } });
  }, m: function(e, n, t, a, o, u) {
    ke[e] = { name: B(n), rawConstructor: pe(t, a), rawDestructor: pe(o, u), fields: [] };
  }, a: function(e, n, t, a, o, u, c, s, l, p) {
    ke[e].fields.push({ fieldName: B(n), getterReturnType: t, getter: pe(a, o), getterContext: u, setterArgumentType: c, setter: pe(s, l), setterContext: p });
  }, z: function(e, n) {
    ee(e, { isVoid: !0, name: n = B(n), argPackAdvance: 0, fromWireType: function() {
    }, toWireType: function(t, a) {
    } });
  }, g: cn, u: function(e) {
    return e === 0 ? Re(dn()) : (e = (t = Qn[n = e]) === void 0 ? B(n) : t, Re(dn()[e]));
    var n, t;
  }, k: function(e) {
    e > 4 && (Y[e].refcount += 1);
  }, n: function(e, n, t, a) {
    e = function(u) {
      return u || V("Cannot use deleted val. handle = " + u), Y[u].value;
    }(e);
    var o = gn[n];
    return o || (o = function(u) {
      for (var c = "", s = 0; s < u; ++s) c += (s !== 0 ? ", " : "") + "arg" + s;
      var l = "return function emval_allocator_" + u + `(constructor, argTypes, args) {
`;
      for (s = 0; s < u; ++s) l += "var argType" + s + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + s + '], "parameter ' + s + `");
var arg` + s + " = argType" + s + `.readValueFromPointer(args);
args += argType` + s + `['argPackAdvance'];
`;
      return l += "var obj = new constructor(" + c + `);
return __emval_register(obj);
}
`, new Function("requireRegisteredType", "Module", "__emval_register", l)(Kn, r, Re);
    }(n), gn[n] = o), o(e, t, a);
  }, h: function() {
    Ce();
  }, r: function(e, n, t) {
    x.copyWithin(e, n, n + t);
  }, d: function(e) {
    var n, t, a = x.length, o = 2147483648;
    if ((e >>>= 0) > o) return !1;
    for (var u = 1; u <= 4; u *= 2) {
      var c = a * (1 + 0.2 / u);
      if (c = Math.min(c, e + 100663296), Xn(Math.min(o, ((n = Math.max(e, c)) % (t = 65536) > 0 && (n += t - n % t), n)))) return !0;
    }
    return !1;
  }, s: function(e, n) {
    var t = 0;
    return de().forEach(function(a, o) {
      var u = n + t;
      L[e + 4 * o >> 2] = u, function(c, s, l) {
        for (var p = 0; p < c.length; ++p) P[0 | s++] = c.charCodeAt(p);
        P[0 | s] = 0;
      }(a, u), t += a.length + 1;
    }), 0;
  }, t: function(e, n) {
    var t = de();
    L[e >> 2] = t.length;
    var a = 0;
    return t.forEach(function(o) {
      a += o.length + 1;
    }), L[n >> 2] = a, 0;
  }, A: function(e) {
    (function(n, t) {
      G || Dn > 0 || (r.onExit && r.onExit(n), F = !0), E(n, new nr(n));
    })(e);
  }, w: function(e) {
    return 0;
  }, o: function(e, n, t, a, o) {
  }, v: function(e, n, t, a) {
    for (var o = 0, u = 0; u < t; u++) {
      for (var c = L[n + 8 * u >> 2], s = L[n + (8 * u + 4) >> 2], l = 0; l < s; l++) xe.printChar(e, x[c + l]);
      o += s;
    }
    return L[a >> 2] = o, 0;
  }, q: function(e) {
  } };
  (function(e) {
    var n = { a: er };
    function t(u, c) {
      var s, l = u.exports;
      r.asm = l, $e((q = r.asm.C).buffer), te = r.asm.I, s = r.asm.D, Ke.unshift(s), function(p) {
        if (ie--, r.monitorRunDependencies && r.monitorRunDependencies(ie), ie == 0 && fe) {
          var w = fe;
          fe = null, w();
        }
      }();
    }
    function a(u) {
      t(u.instance);
    }
    function o(u) {
      return (!C && O && typeof fetch == "function" ? fetch(ae, { credentials: "same-origin" }).then(function(c) {
        if (!c.ok) throw "failed to load wasm binary file at '" + ae + "'";
        return c.arrayBuffer();
      }).catch(function() {
        return en(ae);
      }) : Promise.resolve().then(function() {
        return en(ae);
      })).then(function(c) {
        return WebAssembly.instantiate(c, n);
      }).then(u, function(c) {
        U("failed to asynchronously prepare wasm: " + c), Ce(c);
      });
    }
    if (ie++, r.monitorRunDependencies && r.monitorRunDependencies(ie), r.instantiateWasm) try {
      return r.instantiateWasm(n, t);
    } catch (u) {
      return U("Module.instantiateWasm callback failed with error: " + u), !1;
    }
    (function(u) {
      return C || typeof WebAssembly.instantiateStreaming != "function" || typeof fetch != "function" ? o(a) : fetch(u, { credentials: "same-origin" }).then(function(c) {
        return WebAssembly.instantiateStreaming(c, n).then(a, function(s) {
          return U("wasm streaming compile failed: " + s), U("falling back to ArrayBuffer instantiation"), o(a);
        });
      });
    })(e).catch(m);
  })(f), r.___wasm_call_ctors = function() {
    return (r.___wasm_call_ctors = r.asm.D).apply(null, arguments);
  };
  var Ie, He = r._malloc = function() {
    return (He = r._malloc = r.asm.E).apply(null, arguments);
  }, ne = r._free = function() {
    return (ne = r._free = r.asm.F).apply(null, arguments);
  }, vn = r.___getTypeName = function() {
    return (vn = r.___getTypeName = r.asm.G).apply(null, arguments);
  };
  function nr(e) {
    this.name = "ExitStatus", this.message = "Program terminated with exit(" + e + ")", this.status = e;
  }
  function Ve(e) {
    function n() {
      Ie || (Ie = !0, r.calledRun = !0, F || (Oe(Ke), h(r), r.onRuntimeInitialized && r.onRuntimeInitialized(), function() {
        if (r.postRun) for (typeof r.postRun == "function" && (r.postRun = [r.postRun]); r.postRun.length; ) t = r.postRun.shift(), Xe.unshift(t);
        var t;
        Oe(Xe);
      }()));
    }
    ie > 0 || (function() {
      if (r.preRun) for (typeof r.preRun == "function" && (r.preRun = [r.preRun]); r.preRun.length; ) t = r.preRun.shift(), Qe.unshift(t);
      var t;
      Oe(Qe);
    }(), ie > 0 || (r.setStatus ? (r.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        r.setStatus("");
      }, 1), n();
    }, 1)) : n()));
  }
  if (r.___embind_register_native_and_builtin_types = function() {
    return (r.___embind_register_native_and_builtin_types = r.asm.H).apply(null, arguments);
  }, r.dynCall_jiji = function() {
    return (r.dynCall_jiji = r.asm.J).apply(null, arguments);
  }, fe = function e() {
    Ie || Ve(), Ie || (fe = e);
  }, r.run = Ve, r.preInit) for (typeof r.preInit == "function" && (r.preInit = [r.preInit]); r.preInit.length > 0; ) r.preInit.pop()();
  return Ve(), r.ready;
}), Rn = ((r) => (r[r.GRAYSCALE = 1] = "GRAYSCALE", r[r.RGB = 2] = "RGB", r[r.YCbCr = 3] = "YCbCr", r))(Rn || {});
const vr = { quality: 75, baseline: !1, arithmetic: !1, progressive: !0, optimize_coding: !0, smoothing: 0, color_space: Rn.YCbCr, quant_table: 3, trellis_multipass: !1, trellis_opt_zero: !1, trellis_opt_table: !1, trellis_loops: 1, auto_subsample: !0, chroma_subsample: 2, separate_chroma_quality: !1, chroma_quality: 75 };
let Ge;
const xn = async (r) => {
  Ge || (Ge = await mr({}, Ze(r)));
}, In = (r, f) => Ge.encode(r.data, r.width, r.height, f);
let X;
const Un = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Un.decode();
let ge = null;
function Je() {
  return ge !== null && ge.byteLength !== 0 || (ge = new Uint8Array(X.memory.buffer)), ge;
}
let Tn = 0, En, me = null;
function Cn() {
  return me !== null && me.byteLength !== 0 || (me = new Int32Array(X.memory.buffer)), me;
}
function yr(r, f, h) {
  try {
    const E = X.__wbindgen_add_to_stack_pointer(-16), O = function(C, z) {
      const U = z(1 * C.length, 1) >>> 0;
      return Je().set(C, U / 1), Tn = C.length, U;
    }(r, X.__wbindgen_malloc), v = Tn;
    X.optimize(E, O, v, f, h);
    var m = Cn()[E / 4 + 0], g = Cn()[E / 4 + 1], y = (d = m, _ = g, d >>>= 0, Je().subarray(d / 1, d / 1 + _)).slice();
    return X.__wbindgen_free(m, 1 * g, 1), y;
  } finally {
    X.__wbindgen_add_to_stack_pointer(16);
  }
  var d, _;
}
function hr() {
  const r = { wbg: {} };
  return r.wbg.__wbindgen_throw = function(f, h) {
    throw new Error((m = f, g = h, m >>>= 0, Un.decode(Je().subarray(m, m + g))));
    var m, g;
  }, r;
}
async function Fn(r) {
  if (X !== void 0) return X;
  if (r === void 0) throw new Error("oxipng WASM missing");
  const f = hr();
  (typeof r == "string" || typeof Request == "function" && r instanceof Request || typeof URL == "function" && r instanceof URL) && (r = fetch(r));
  const { instance: h, module: m } = await async function(g, y) {
    if (typeof Response == "function" && g instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming == "function") try {
        return await WebAssembly.instantiateStreaming(g, y);
      } catch (_) {
        if (g.headers.get("Content-Type") == "application/wasm") throw _;
        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", _);
      }
      const d = await g.arrayBuffer();
      return await WebAssembly.instantiate(d, y);
    }
    {
      const d = await WebAssembly.instantiate(g, y);
      return d instanceof WebAssembly.Instance ? { instance: d, module: g } : d;
    }
  }(await r, f);
  return function(g, y) {
    return X = g.exports, Fn.__wbindgen_wasm_module = y, me = null, ge = null, X;
  }(h, m);
}
const Sn = async (r) => {
  En || (En = await Fn(Ze(r)));
}, zn = (r, f) => yr(new Uint8Array(r), (f == null ? void 0 : f.level) ?? 3, (f == null ? void 0 : f.interlace) ?? !1);
var $ = ((r) => (r.Complete = "complete", r.Error = "error", r))($ || {});
let Q;
const Ln = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Ln.decode();
let kn, ve = null;
function wr(r, f) {
  return r >>>= 0, Ln.decode((ve !== null && ve.byteLength !== 0 || (ve = new Uint8Array(Q.memory.buffer)), ve).subarray(r, r + f));
}
async function On(r) {
  if (Q !== void 0) return Q;
  const f = function() {
    const y = { env: { memory: new WebAssembly.Memory({ initial: 256, maximum: 1e4, shared: !0 }) }, wasi: {}, wasi_snapshot_preview1: { fd_prestat_get: (d, _) => 8, fd_close: (d) => 8, fd_seek: (d, _, E, O) => 8, fd_write: (d, _, E, O) => 8, proc_exit(d) {
      throw new i(d);
    } }, wbg: {} };
    return y.wbg.__wbindgen_throw = function(d, _) {
      throw new Error(wr(d, _));
    }, y;
  }(), h = await fetch(r), { instance: m, module: g } = await async function(y, d) {
    if (typeof Response == "function" && y instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming == "function") try {
        return await WebAssembly.instantiateStreaming(y, d);
      } catch (E) {
        if (y.headers.get("Content-Type") == "application/wasm") throw E;
        console.warn("`WebAssembly.instantiateStreaming`:\n", E);
      }
      const _ = await y.arrayBuffer();
      return await WebAssembly.instantiate(_, d);
    }
    {
      const _ = await WebAssembly.instantiate(y, d);
      return _ instanceof WebAssembly.Instance ? { instance: _, module: y } : _;
    }
  }(h, f);
  return function(y, d) {
    return Q = y.exports, On.__wbindgen_wasm_module = d, ve = null, Q;
  }(m, g);
}
const br = async (r) => {
  kn || (kn = await On(Ze(r)));
}, Fe = (r, f) => r ?? f ? 1 : 0, _r = (r, f) => function(h, m, g, y, d, _, E, O, v, C, z) {
  const U = Q.malloc(h.length), q = Q.memory;
  new Uint8Array(q.buffer).set(h, U);
  let G = Q.malloc(8);
  const F = Q.encode(U, m, g, 2, 2, G, d, _, E, O, v, C, z);
  let S = new Uint32Array(q.buffer.slice(G, G + 8));
  console.log(G, S, F);
  const W = new Uint8Array(q.buffer.slice(F, F + S[0]));
  return Q.free(U), Q.free(G), Q.free(F), W;
}(new Uint8Array(r.data), r.width, r.height, 0, (f == null ? void 0 : f.quality) ?? 80, (f == null ? void 0 : f.progressiveLevel) ?? 2, Fe(f == null ? void 0 : f.optimizeCoding, !0), Fe(f == null ? void 0 : f.adaptiveQuantization, !0), Fe(f == null ? void 0 : f.standardQuantTables, !1), Fe(f == null ? void 0 : f.fancyDownsampling, !1), (f == null ? void 0 : f.dctMethod) ?? 0);
var he = ((r) => (r.Oxipng = "oxipng", r.Mozjpeg = "mozjpeg", r.Jpegli = "jpegli", r))(he || {});
self.onmessage = async (r) => {
  const { file: f, init: h, options: m } = r.data ?? {};
  if (!f) return;
  const { buffer: g, data: y } = f;
  switch (h.optimizer) {
    case he.Oxipng:
      try {
        if (!g) return void self.postMessage({ type: $.Error, output: "Invalid PNG data" });
        await Sn(h.oxipngWasm);
        const d = zn(g, m);
        self.postMessage({ type: $.Complete, output: d });
      } catch (d) {
        self.postMessage({ type: $.Error, output: d });
      }
      break;
    case he.Mozjpeg:
      try {
        if (!y) return void self.postMessage({ type: $.Error, output: "Invalid JPG data" });
        await xn(h.mozjpegWasm);
        const d = In(y, m);
        self.postMessage({ type: $.Complete, output: d });
      } catch (d) {
        self.postMessage({ type: $.Error, output: d });
      }
      break;
    case he.Jpegli:
      try {
        if (!y) return void self.postMessage({ type: $.Error, output: "Invalid PNG data" });
        await br(h.jpegliWasm);
        const d = _r(y, m);
        self.postMessage({ type: $.Complete, output: d });
      } catch (d) {
        self.postMessage({ type: $.Error, output: d });
      }
      break;
    default:
      console.log("Error: unknown worker command", r.data), self.postMessage({ type: $.Error, output: "Unknown command" });
  }
};
const Ar = async (r, f, h, m, g) => {
  const y = await r.file.arrayBuffer();
  return f && window.Worker ? new Promise((d, _) => {
    const E = ((C) => {
      console.log("WORKER", C);
      const z = `import ${JSON.stringify(new URL(C))}`, U = new Blob([z], { type: "application/javascript" }), q = URL.createObjectURL(U), G = new Worker(q, { type: "module", name: "optimize-worker" });
      return G.addEventListener("error", (F) => {
        URL.revokeObjectURL(q);
      }), G;
    })(f);
    E.onmessage = (C) => {
      C.data.type === $.Complete ? d(C.data.output) : _(C.data.output || "Worker failed to optimize");
    };
    const O = { ...g }, v = { init: { ...h, assetType: r.type, optimizer: m }, file: { buffer: y, data: r.data }, options: O };
    E.postMessage(v);
  }) : (async (d, _, E) => {
    const { data: O, file: v } = d;
    if (_ === oe.Png) {
      const C = new Uint8Array(await v.arrayBuffer());
      return zn(C, E);
    }
    if (_ == oe.Jpeg) return In(O, E);
  })(r, r.type, g);
}, Tr = [j("span", { class: "dot" }, null, -1), j("span", { class: "dot" }, null, -1), j("span", { class: "dot" }, null, -1)], jn = we({ __name: "Spinner", props: { size: { default: 10 }, color: { default: "#fff" } }, setup(r, { expose: f }) {
  or((m) => ({ "2454e84c": m.size + "px", "05e43051": m.color }));
  const h = re();
  return f({ wrapper: h }), (m, g) => (M(), D("div", { ref_key: "wrapper", ref: h, class: "o-spinner" }, Tr, 512));
} }), Er = ["id"], Cr = ["for"], kr = { class: "o-upload-left" }, Wr = j("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", class: "o-upload-image" }, [j("path", { fill: "currentColor", d: "m6 18l1.41 1.41L15 11.83V30h2V11.83l7.59 7.58L26 18L16 8L6 18zM6 8V4h20v4h2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4z" })], -1), Pr = { class: "o-upload-right" }, Rr = { class: "o-upload-title" }, xr = ["innerHTML"], Ir = { key: 0, class: "o-upload-spinner" }, Ur = ["id", "accept", "disabled"], Fr = we({ __name: "UploadFile", props: { id: { default: "" }, title: { default: void 0 }, subtitle: { default: void 0 }, isDisabled: { type: Boolean, default: !1 }, preview: { default: null }, loading: { type: Boolean, default: !1 }, accept: { default: "image/*" }, width: { default: "100%" }, height: { default: "182px" } }, emits: ["file-select"], setup(r, { emit: f }) {
  const h = f, m = re(!1), g = re(), y = (v) => {
    var C;
    if (v && v.target && v.type === "input") {
      const z = v.target.files;
      z && (g.value = z[0], h("file-select", g.value));
    } else if (v && v.type === "drop") {
      const z = (C = v.dataTransfer) == null ? void 0 : C.files;
      z && (g.value = z[0], h("file-select", g.value));
    }
    m.value = !1;
  }, d = (v) => {
    v.preventDefault(), m.value = !0;
  }, _ = (v) => {
    v.preventDefault(), m.value = !1;
  }, E = (v) => {
    v.preventDefault(), y(v);
  }, O = (v) => {
    v && v.target && (v.target.value = "");
  };
  return (v, C) => (M(), D("div", { class: qe({ "o-upload-wrap": !0, dragging: m.value }), style: Wn({ width: v.width, height: v.height }) }, [j("form", { id: v.id, class: "o-upload-form", action: "", enctype: "multipart/form-data", onDrop: E, onDragenter: d, onDragleave: _, onDragend: _, onInput: y }, [j("label", { class: "o-upload-area", for: `image-upload-input${v.id}` }, [ir(v.$slots, "default", {}, () => [v.loading ? ye("", !0) : (M(), D("div", { key: 0, class: qe(["o-upload-button", { "has-file": !!v.preview }]) }, [j("div", kr, [Wr, v.preview ? (M(), ur(pr, { key: 0, asset: v.preview, class: "o-upload-background" }, null, 8, ["asset"])) : ye("", !0)]), j("div", Pr, [j("div", Rr, Se(v.title), 1), j("div", { class: "o-upload-subtitle", innerHTML: v.subtitle }, null, 8, xr)])], 2))]), v.loading ? (M(), D("div", Ir, [ze(jn, { size: 24, color: "#3a86ff" })])) : ye("", !0)], 8, Cr), j("input", { id: `o-upload-input${v.id}`, class: "o-upload", type: "file", accept: v.accept, disabled: v.isDisabled, onClick: O }, null, 8, Ur)], 40, Er)], 6));
} }), Sr = ["disabled"], zr = { key: 0, class: "o-animate" }, Lr = { key: 1 }, Or = { key: 2, class: "o-hidden" }, jr = we({ __name: "OButton", props: { text: { default: "" }, disabled: { type: Boolean, default: !1 }, animate: { type: Boolean, default: !1 } }, emits: ["click"], setup(r, { emit: f }) {
  const h = f, m = r, { disabled: g } = Ye(m), y = (d) => {
    g.value || h("click", d);
  };
  return (d, _) => (M(), D("button", { class: qe(["o-button", bn(g) && "disabled"]), disabled: bn(g), onClick: y }, [d.animate ? (M(), D("div", zr, [ze(jn, { class: "o-spinner" })])) : (M(), D("div", Lr, Se(d.text), 1)), d.animate ? (M(), D("div", Or, Se(d.text), 1)) : ye("", !0)], 10, Sr));
} }), Mr = { class: "optimizer" }, Br = { class: "opt-wrap" }, Dr = { key: 0, class: "error" }, Hr = Pn(we({ __name: "Optimizer", props: { mozjpegWasm: {}, oxipngWasm: {}, jpegliWasm: {}, workerUrl: {} }, setup(r) {
  const f = re(), h = re(""), m = re(!1), g = re(), y = re({}), d = re(he.Jpegli), _ = r, { jpegliWasm: E, mozjpegWasm: O, oxipngWasm: v, workerUrl: C } = Ye(_), z = () => ({ mozjpegWasm: O.value, oxipngWasm: v.value, jpegliWasm: E.value }), U = { FILE_TYPE: "Unsupported file type", unknown: "Unknown error occurred" }, q = async (F) => {
    if (F) {
      g.value = void 0, f.value = void 0;
      try {
        const S = await async function(W, R) {
          const P = [], x = W.types ?? An, K = R.type, { ext: H, size: L } = W, J = L ?? 0;
          J && R.size > J && P.push("FILE_SIZE_BIG");
          const ce = R.name.split(".").pop();
          if ((!H || ce && H.includes(ce)) && x.includes(K) || P.push("FILE_TYPE"), P.length) throw { fileErrors: P };
          try {
            if ((R.type || "").includes("image")) {
              const se = await gr(R), { minWidth: te, minHeight: be, maxWidth: _e, maxHeight: Ae } = W, { width: Te = 0, height: Ee = 0 } = se ?? {};
              if (te && Te < te && P.push("Image width too small"), be && Ee < be && P.push("Image height too small"), _e && Te > _e && P.push("Image width too large"), Ae && Ee > Ae && P.push("Image height too large"), !P.length) return { file: R, type: K, data: se };
            }
          } catch {
            P.push("FILE_TYPE");
          }
          throw { fileErrors: P || ["unknown"] };
        }({ size: 1e7, types: An }, F);
        ((W) => {
          const R = new FileReader();
          R.readAsDataURL(W.file), R.onload = () => {
            var P;
            h.value = ((P = R.result) == null ? void 0 : P.toString()) ?? "";
          }, g.value = W;
        })(S), m.value = !0, await ((W) => {
          const { assetType: R, mozjpegWasm: P, oxipngWasm: x } = W;
          return R === oe.Png ? Sn(x) : R === oe.Jpeg ? xn(P) : void 0;
        })({ ...z(), assetType: S.type, optimizer: d.value }), y.value = ((W) => W.type === oe.Png ? { level: 3 } : W.type === oe.Jpeg ? { ...vr } : {})(S), m.value = !1;
      } catch (S) {
        console.log(S);
        const W = S.fileErrors[0];
        f.value = W;
      }
    }
  }, G = async () => {
    const F = g.value;
    if (!m.value && !f.value && F) {
      m.value = !0;
      try {
        const S = await Ar(F, C.value, z(), d.value, y.value);
        S ? ((W, R, P) => {
          const x = new Blob([R], { type: P }), K = window.navigator;
          if (K.msSaveOrOpenBlob) K.msSaveBlob(x, W);
          else {
            const H = window.document.createElement("a");
            H.href = window.URL.createObjectURL(x), H.download = W, document.body.appendChild(H), H.click(), document.body.removeChild(H);
          }
        })(F.file.name || "opt.png", S, F.type) : f.value = "";
      } catch (S) {
        console.log("Optimize error:", S);
      }
      m.value = !1;
    }
  };
  return (F, S) => {
    var R;
    return M(), D("div", Mr, [j("div", Br, [ze(Fr, { title: "Upload PNG/JPEG", subtitle: "Drag or click here", accept: "image/png,image/jpeg", preview: h.value, onFileSelect: q }, null, 8, ["preview"])]), f.value ? (M(), D("div", Dr, Se((W = f.value, U[W] ?? U.unknown)), 1)) : ye("", !0), ze(jr, { text: "Optimize", animate: m.value, disabled: !((R = g.value) != null && R.file), onClick: G }, null, 8, ["animate", "disabled"])]);
    var W;
  };
} }), [["__scopeId", "data-v-24e73325"]]);
window.Optimizer = Hr;
export {
  Hr as Optimizer
};
//# sourceMappingURL=image-opt.es.js.map
