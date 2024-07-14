(function(){"use strict";try{if(typeof document<"u"){var e=document.createElement("style");e.appendChild(document.createTextNode(".o-image[data-v-f697f219]{display:flex;justify-content:center;align-items:center;width:100%;height:100%;padding:4px;position:relative}.o-asset[data-v-f697f219]{width:100%;height:100%;background-size:cover;background-position:center;-o-object-fit:contain;object-fit:contain;-o-object-position:center;object-position:center}.o-default[data-v-f697f219]{width:32px;height:32px}.o-spinner{display:inline-flex;align-items:center}.o-spinner .dot{width:var(--2454e84c);height:var(--2454e84c);border-radius:50%;background-color:var(--05e43051);animation:scale .6s ease alternate infinite}.o-spinner .dot:not(:first-child){margin-left:calc(var(--2454e84c) / 4)}.o-spinner .dot:nth-of-type(2){animation-delay:.2s}.o-spinner .dot:nth-of-type(3){animation-delay:.4s}@keyframes scale{0%{transform:scale(0)}to{transform:scale(1)}}.o-upload-wrap{display:flex;justify-content:center;align-items:center;border:1px solid #bdbfc2}.o-upload-form{position:relative;height:100%;width:100%}.o-upload-background{display:flex;justify-content:center;align-items:center;position:absolute;top:0;width:100%;height:100%;background-color:transparent;background-size:contain;background-position:center;padding:0}.o-upload{cursor:pointer;opacity:0;position:absolute;left:0;top:0;width:100%;height:100%}.o-upload-button{display:flex;flex-direction:row;color:#000;text-align:left;pointer-events:none;font-size:16px;line-height:22px;font-weight:300}.o-upload-left{display:flex;justify-content:center;align-items:center;width:50%;border-right:1px solid #bdbfc2;position:relative}.o-upload-image{position:absolute}.o-upload-right{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;padding:0 40px;width:50%}.o-upload-title{font-weight:600}.o-upload-subtitle{align-items:center;font-size:10px;line-height:16px;font-weight:300;display:inline;margin-top:8px}.o-upload-subtitle span{margin:0 3px;color:#3a86ff}:scope.has-file{border:#3a86ff}:scope.dragging{border-color:#3a86ff}:scope.dragging .file-upload-left{border-color:#3a86ff}.o-upload-spinner{display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}.o-upload-button,.o-upload-spinner{z-index:10;position:absolute;width:100%;height:100%}.o-upload-button .loader,.o-upload-spinner .loader{margin:0}.o-upload-button img,.o-upload-spinner img{width:32px;margin-bottom:6px}.o-button{font-weight:500;font-size:15px;letter-spacing:1.5px;margin-top:12px;display:inline-flex;align-items:center;justify-content:center;border:none;outline:none;cursor:pointer;text-align:center;border-radius:6px;transition:background-color .15s ease;min-width:100px;position:relative;height:38px;padding:0 32px;background-color:#3a86ff;color:#fff}.o-button:hover:not(:disabled){background-color:#3a86ffe6}.o-button:focus:not(:disabled){box-shadow:none;background-color:#3a86ffcc}.o-button.disabled{background-color:#9e9ea1;color:#fff;cursor:not-allowed;-webkit-user-select:none;-moz-user-select:none;user-select:none}.o-button .o-hidden{visibility:hidden}.o-button .o-animate{width:100%;height:100%;position:absolute}.o-button .o-spinner{position:absolute;display:flex;justify-content:center;align-items:center;left:0;top:0;right:0;bottom:0}.optimizer[data-v-a851d018]{display:flex;flex-direction:column;justify-content:center;align-items:center}.opt-wrap[data-v-a851d018]{width:480px;max-width:95%}")),document.head.appendChild(e)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const { defineComponent: mn, toRefs: Hn, computed: Ye, openBlock: L, createElementBlock: z, normalizeStyle: ye, pushScopeId: Ze, popScopeId: $e, createElementVNode: S, useCssVars: Xe, ref: en, normalizeClass: Dn, renderSlot: Ke, createBlock: Qe, createCommentVNode: gn, toDisplayString: Pn, createVNode: Rn, unref: pe } = window.Vue;
const de = (r) => (Ze("data-v-f697f219"), r = r(), $e(), r), nr = { class: "o-image" }, er = ["src"], rr = { key: 2, xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", class: "o-image-default" }, tr = [de(() => S("path", { fill: "currentColor", d: "M19 14a3 3 0 1 0-3-3a3 3 0 0 0 3 3Zm0-4a1 1 0 1 1-1 1a1 1 0 0 1 1-1Z" }, null, -1)), de(() => S("path", { fill: "currentColor", d: "M26 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 22H6v-6l5-5l5.59 5.59a2 2 0 0 0 2.82 0L21 19l5 5Zm0-4.83l-3.59-3.59a2 2 0 0 0-2.82 0L18 19.17l-5.59-5.59a2 2 0 0 0-2.82 0L6 17.17V6h20Z" }, null, -1))], we = (r, v) => {
  const h = r.__vccOpts || r;
  for (const [d, f] of v) h[d] = f;
  return h;
}, ar = we(mn({ __name: "Image", props: { asset: { default: null }, asImg: { type: Boolean }, contentHash: { default: void 0 } }, setup(r) {
  const v = r, { asset: h, contentHash: d } = Hn(v), f = Ye(() => {
    const w = d.value;
    return (h.value ?? "") + (w ? `?${w}` : "");
  });
  return (w, g) => (L(), z("div", nr, [w.asImg && f.value ? (L(), z("img", { key: 0, src: f.value, class: "o-asset" }, null, 8, er)) : f.value ? (L(), z("div", { key: 1, style: ye({ backgroundImage: `url(${f.value})` }), class: "o-asset" }, null, 4)) : (L(), z("svg", rr, tr))]));
} }), [["__scopeId", "data-v-f697f219"]]);
var Z = ((r) => (r.Png = "image/png", r.Jpeg = "image/jpeg", r))(Z || {});
const ve = Object.values(Z);
async function or(r) {
  const v = URL.createObjectURL(r);
  try {
    return await async function(h) {
      const d = new Image();
      d.decoding = "async", d.src = h;
      const f = new Promise((w, g) => {
        d.onload = () => w(), d.onerror = () => g(Error("Image loading error"));
      });
      return d.decode && await d.decode().catch(() => null), await f, d;
    }(v);
  } finally {
    URL.revokeObjectURL(v);
  }
}
async function ir(r) {
  const v = "createImageBitmap" in self ? createImageBitmap(r) : or(r);
  return function(h) {
    const d = h.width, f = h.height, w = h.width, g = h.height, A = document.createElement("canvas");
    A.width = d, A.height = f;
    const R = A.getContext("2d");
    if (!R) throw new Error("Could not create canvas context");
    return R.drawImage(h, 0, 0, w, g, 0, 0, d, f), R.getImageData(0, 0, d, f);
  }(await v);
}
const be = (r) => {
  if (r) return new URL(r);
};
var zn, ur = (zn = import.meta.url, function(r, v) {
  var h, d;
  (r = (r = r || {}) !== void 0 ? r : {}).ready = new Promise(function(n, e) {
    h = n, d = e;
  });
  var f, w = {};
  for (f in r) r.hasOwnProperty(f) && (w[f] = r[f]);
  var g, A = "./this.program", R = function(n, e) {
    throw e;
  }, q = !0, p = "";
  p = self.location.href, zn && (p = zn), p = p.indexOf("blob:") !== 0 ? p.substr(0, p.lastIndexOf("/") + 1) : "", g = function(n) {
    var e = new XMLHttpRequest();
    return e.open("GET", n, !1), e.responseType = "arraybuffer", e.send(null), new Uint8Array(e.response);
  };
  var I, D = r.print || console.log.bind(console), O = r.printErr || console.warn.bind(console);
  for (f in w) w.hasOwnProperty(f) && (r[f] = w[f]);
  w = null, r.arguments && r.arguments, r.thisProgram && (A = r.thisProgram), r.quit && (R = r.quit), r.wasmBinary && (I = r.wasmBinary);
  var x, F = r.noExitRuntime || !0;
  typeof WebAssembly != "object" && bn("no native wasm support detected");
  var k = !1, C = new TextDecoder("utf8");
  function W(n, e) {
    if (!n) return "";
    for (var t = n + e, a = n; !(a >= t) && E[a]; ) ++a;
    return C.decode(E.subarray(n, a));
  }
  var Y, G, E, rn, tn, U, j, sn, ln, Q, hn = new TextDecoder("utf-16le");
  function yn(n, e) {
    for (var t = n, a = t >> 1, o = a + e / 2; !(a >= o) && tn[a]; ) ++a;
    return t = a << 1, hn.decode(E.subarray(n, t));
  }
  function wn(n, e, t) {
    if (t === void 0 && (t = 2147483647), t < 2) return 0;
    for (var a = e, o = (t -= 2) < 2 * n.length ? t / 2 : n.length, i = 0; i < o; ++i) {
      var l = n.charCodeAt(i);
      rn[e >> 1] = l, e += 2;
    }
    return rn[e >> 1] = 0, e - a;
  }
  function Re(n) {
    return 2 * n.length;
  }
  function Ie(n, e) {
    for (var t = 0, a = ""; !(t >= e / 4); ) {
      var o = U[n + 4 * t >> 2];
      if (o == 0) break;
      if (++t, o >= 65536) {
        var i = o - 65536;
        a += String.fromCharCode(55296 | i >> 10, 56320 | 1023 & i);
      } else a += String.fromCharCode(o);
    }
    return a;
  }
  function Ue(n, e, t) {
    if (t === void 0 && (t = 2147483647), t < 4) return 0;
    for (var a = e, o = a + t - 4, i = 0; i < n.length; ++i) {
      var l = n.charCodeAt(i);
      if (l >= 55296 && l <= 57343 && (l = 65536 + ((1023 & l) << 10) | 1023 & n.charCodeAt(++i)), U[e >> 2] = l, (e += 4) + 4 > o) break;
    }
    return U[e >> 2] = 0, e - a;
  }
  function xe(n) {
    for (var e = 0, t = 0; t < n.length; ++t) {
      var a = n.charCodeAt(t);
      a >= 55296 && a <= 57343 && ++t, e += 4;
    }
    return e;
  }
  function Vn(n) {
    Y = n, r.HEAP8 = G = new Int8Array(n), r.HEAP16 = rn = new Int16Array(n), r.HEAP32 = U = new Int32Array(n), r.HEAPU8 = E = new Uint8Array(n), r.HEAPU16 = tn = new Uint16Array(n), r.HEAPU32 = j = new Uint32Array(n), r.HEAPF32 = sn = new Float32Array(n), r.HEAPF64 = ln = new Float64Array(n);
  }
  r.INITIAL_MEMORY;
  var nn, In, Nn = [], qn = [], Gn = [], an = 0, cn = null;
  function bn(n) {
    r.onAbort && r.onAbort(n), O(n += ""), k = !0, n = "abort(" + n + "). Build with -s ASSERTIONS=1 for more info.";
    var e = new WebAssembly.RuntimeError(n);
    throw d(e), e;
  }
  function Jn(n) {
    try {
      if (n == nn && I) return new Uint8Array(I);
      if (g) return g(n);
      throw "both async and sync fetching of the wasm failed";
    } catch (e) {
      bn(e);
    }
  }
  function Un(n) {
    for (; n.length > 0; ) {
      var e = n.shift();
      if (typeof e != "function") {
        var t = e.func;
        typeof t == "number" ? e.arg === void 0 ? Q.get(t)() : Q.get(t)(e.arg) : t(e.arg === void 0 ? null : e.arg);
      } else e(r);
    }
  }
  r.preloadedImages = {}, r.preloadedAudios = {}, r.locateFile && (nn.startsWith("data:application/octet-stream;base64,") || (In = nn, nn = r.locateFile ? r.locateFile(In, p) : p + In));
  var Fe = 0, _n = {};
  function Yn(n) {
    for (; n.length; ) {
      var e = n.pop();
      n.pop()(e);
    }
  }
  function Tn(n) {
    return this.fromWireType(j[n >> 2]);
  }
  var un = {}, on = {}, An = {}, Se = 48, Le = 57;
  function Zn(n) {
    if (n === void 0) return "_unknown";
    var e = (n = n.replace(/[^a-zA-Z0-9_]/g, "$")).charCodeAt(0);
    return e >= Se && e <= Le ? "_" + n : n;
  }
  function $n(n, e) {
    return n = Zn(n), new Function("body", "return function " + n + `() {
    "use strict";    return body.apply(this, arguments);
};
`)(e);
  }
  function xn(n, e) {
    var t = $n(e, function(a) {
      this.name = e, this.message = a;
      var o = new Error(a).stack;
      o !== void 0 && (this.stack = this.toString() + `
` + o.replace(/^Error(:[^\n]*)?\n/, ""));
    });
    return t.prototype = Object.create(n.prototype), t.prototype.constructor = t, t.prototype.toString = function() {
      return this.message === void 0 ? this.name : this.name + ": " + this.message;
    }, t;
  }
  var Xn = void 0;
  function Kn(n) {
    throw new Xn(n);
  }
  function Qn(n, e, t) {
    function a(u) {
      var s = t(u);
      s.length !== n.length && Kn("Mismatched type converter count");
      for (var c = 0; c < n.length; ++c) $(n[c], s[c]);
    }
    n.forEach(function(u) {
      An[u] = e;
    });
    var o = new Array(e.length), i = [], l = 0;
    e.forEach(function(u, s) {
      on.hasOwnProperty(u) ? o[s] = on[u] : (i.push(u), un.hasOwnProperty(u) || (un[u] = []), un[u].push(function() {
        o[s] = on[u], ++l === i.length && a(o);
      }));
    }), i.length === 0 && a(o);
  }
  function Fn(n) {
    switch (n) {
      case 1:
        return 0;
      case 2:
        return 1;
      case 4:
        return 2;
      case 8:
        return 3;
      default:
        throw new TypeError("Unknown type size: " + n);
    }
  }
  var ne = void 0;
  function B(n) {
    for (var e = "", t = n; E[t]; ) e += ne[E[t++]];
    return e;
  }
  var ee = void 0;
  function M(n) {
    throw new ee(n);
  }
  function $(n, e, t) {
    if (t = t || {}, !("argPackAdvance" in e)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
    var a = e.name;
    if (n || M('type "' + a + '" must have a positive integer typeid pointer'), on.hasOwnProperty(n)) {
      if (t.ignoreDuplicateRegistrations) return;
      M("Cannot register type '" + a + "' twice");
    }
    if (on[n] = e, delete An[n], un.hasOwnProperty(n)) {
      var o = un[n];
      delete un[n], o.forEach(function(i) {
        i();
      });
    }
  }
  var Sn = [], V = [{}, { value: void 0 }, { value: null }, { value: !0 }, { value: !1 }];
  function re(n) {
    n > 4 && --V[n].refcount == 0 && (V[n] = void 0, Sn.push(n));
  }
  function Oe() {
    for (var n = 0, e = 5; e < V.length; ++e) V[e] !== void 0 && ++n;
    return n;
  }
  function Be() {
    for (var n = 5; n < V.length; ++n) if (V[n] !== void 0) return V[n];
    return null;
  }
  function En(n) {
    switch (n) {
      case void 0:
        return 1;
      case null:
        return 2;
      case !0:
        return 3;
      case !1:
        return 4;
      default:
        var e = Sn.length ? Sn.pop() : V.length;
        return V[e] = { refcount: 1, value: n }, e;
    }
  }
  function Ln(n) {
    if (n === null) return "null";
    var e = typeof n;
    return e === "object" || e === "array" || e === "function" ? n.toString() : "" + n;
  }
  function ze(n, e) {
    switch (e) {
      case 2:
        return function(t) {
          return this.fromWireType(sn[t >> 2]);
        };
      case 3:
        return function(t) {
          return this.fromWireType(ln[t >> 3]);
        };
      default:
        throw new TypeError("Unknown float type: " + n);
    }
  }
  function De(n, e, t, a, o) {
    var i = e.length;
    i < 2 && M("argTypes array size mismatch! Must at least get return value and 'this' types!");
    for (var l = e[1] !== null && t !== null, u = !1, s = 1; s < e.length; ++s) if (e[s] !== null && e[s].destructorFunction === void 0) {
      u = !0;
      break;
    }
    var c = e[0].name !== "void", m = "", _ = "";
    for (s = 0; s < i - 2; ++s) m += (s !== 0 ? ", " : "") + "arg" + s, _ += (s !== 0 ? ", " : "") + "arg" + s + "Wired";
    var y = "return function " + Zn(n) + "(" + m + `) {
if (arguments.length !== ` + (i - 2) + `) {
throwBindingError('function ` + n + " called with ' + arguments.length + ' arguments, expected " + (i - 2) + ` args!');
}
`;
    u && (y += `var destructors = [];
`);
    var b = u ? "destructors" : "null", P = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"], H = [M, a, o, Yn, e[0], e[1]];
    for (l && (y += "var thisWired = classParam.toWireType(" + b + `, this);
`), s = 0; s < i - 2; ++s) y += "var arg" + s + "Wired = argType" + s + ".toWireType(" + b + ", arg" + s + "); // " + e[s + 2].name + `
`, P.push("argType" + s), H.push(e[s + 2]);
    if (l && (_ = "thisWired" + (_.length > 0 ? ", " : "") + _), y += (c ? "var rv = " : "") + "invoker(fn" + (_.length > 0 ? ", " : "") + _ + `);
`, u) y += `runDestructors(destructors);
`;
    else for (s = l ? 1 : 2; s < e.length; ++s) {
      var N = s === 1 ? "thisWired" : "arg" + (s - 2) + "Wired";
      e[s].destructorFunction !== null && (y += N + "_dtor(" + N + "); // " + e[s].name + `
`, P.push(N + "_dtor"), H.push(e[s].destructorFunction));
    }
    return c && (y += `var ret = retType.fromWireType(rv);
return ret;
`), y += `}
`, P.push(y), function(T, Wn) {
      if (!(T instanceof Function)) throw new TypeError("new_ called with constructor type " + typeof T + " which is not a function");
      var le = $n(T.name || "unknownFunctionName", function() {
      });
      le.prototype = T.prototype;
      var ce = new le(), fe = T.apply(ce, Wn);
      return fe instanceof Object ? fe : ce;
    }(Function, P).apply(null, H);
  }
  function je(n, e, t) {
    r.hasOwnProperty(n) ? ((t === void 0 || r[n].overloadTable !== void 0 && r[n].overloadTable[t] !== void 0) && M("Cannot register public name '" + n + "' twice"), function(a, o, i) {
      if (a[o].overloadTable === void 0) {
        var l = a[o];
        a[o] = function() {
          return a[o].overloadTable.hasOwnProperty(arguments.length) || M("Function '" + i + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + a[o].overloadTable + ")!"), a[o].overloadTable[arguments.length].apply(this, arguments);
        }, a[o].overloadTable = [], a[o].overloadTable[l.argCount] = l;
      }
    }(r, n, n), r.hasOwnProperty(t) && M("Cannot register multiple overloads of a function with the same number of arguments (" + t + ")!"), r[n].overloadTable[t] = e) : (r[n] = e, t !== void 0 && (r[n].numArguments = t));
  }
  function Me(n, e, t) {
    return n.includes("j") ? function(a, o, i) {
      var l = r["dynCall_" + a];
      return i && i.length ? l.apply(null, [o].concat(i)) : l.call(null, o);
    }(n, e, t) : Q.get(e).apply(null, t);
  }
  function fn(n, e) {
    var t, a, o, i = (n = B(n)).includes("j") ? (t = n, a = e, o = [], function() {
      o.length = arguments.length;
      for (var l = 0; l < arguments.length; l++) o[l] = arguments[l];
      return Me(t, a, o);
    }) : Q.get(e);
    return typeof i != "function" && M("unknown function pointer with signature " + n + ": " + e), i;
  }
  var te = void 0;
  function ae(n) {
    var e = se(n), t = B(e);
    return X(e), t;
  }
  function He(n, e, t) {
    switch (e) {
      case 0:
        return t ? function(a) {
          return G[a];
        } : function(a) {
          return E[a];
        };
      case 1:
        return t ? function(a) {
          return rn[a >> 1];
        } : function(a) {
          return tn[a >> 1];
        };
      case 2:
        return t ? function(a) {
          return U[a >> 2];
        } : function(a) {
          return j[a >> 2];
        };
      default:
        throw new TypeError("Unknown integer type: " + n);
    }
  }
  var Ve = {};
  function oe() {
    return typeof globalThis == "object" ? globalThis : Function("return this")();
  }
  function Ne(n, e) {
    var t = on[n];
    return t === void 0 && M(e + " has unknown type " + ae(n)), t;
  }
  var ie = {};
  function qe(n) {
    try {
      return x.grow(n - Y.byteLength + 65535 >>> 16), Vn(x.buffer), 1;
    } catch {
    }
  }
  var ue = {};
  function pn() {
    if (!pn.strings) {
      var n = { USER: "web_user", LOGNAME: "web_user", PATH: "/", PWD: "/", HOME: "/home/web_user", LANG: (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8", _: A || "./this.program" };
      for (var e in ue) n[e] = ue[e];
      var t = [];
      for (var e in n) t.push(e + "=" + n[e]);
      pn.strings = t;
    }
    return pn.strings;
  }
  var kn = { mappings: {}, buffers: [null, [], []], printChar: function(n, e) {
    var t = kn.buffers[n];
    e === 0 || e === 10 ? ((n === 1 ? D : O)(function(a, o, i) {
      for (var l = o + i, u = o; a[u] && !(u >= l); ) ++u;
      return C.decode(a.subarray ? a.subarray(o, u) : new Uint8Array(a.slice(o, u)));
    }(t, 0)), t.length = 0) : t.push(e);
  }, varargs: void 0, get: function() {
    return kn.varargs += 4, U[kn.varargs - 4 >> 2];
  }, getStr: function(n) {
    return W(n);
  }, get64: function(n, e) {
    return n;
  } };
  Xn = r.InternalError = xn(Error, "InternalError"), function() {
    for (var n = new Array(256), e = 0; e < 256; ++e) n[e] = String.fromCharCode(e);
    ne = n;
  }(), ee = r.BindingError = xn(Error, "BindingError"), r.count_emval_handles = Oe, r.get_first_emval = Be, te = r.UnboundTypeError = xn(Error, "UnboundTypeError");
  var Ge = { B: function(n, e) {
  }, l: function(n) {
    var e = _n[n];
    delete _n[n];
    var t = e.rawConstructor, a = e.rawDestructor, o = e.fields;
    Qn([n], o.map(function(i) {
      return i.getterReturnType;
    }).concat(o.map(function(i) {
      return i.setterArgumentType;
    })), function(i) {
      var l = {};
      return o.forEach(function(u, s) {
        var c = u.fieldName, m = i[s], _ = u.getter, y = u.getterContext, b = i[s + o.length], P = u.setter, H = u.setterContext;
        l[c] = { read: function(N) {
          return m.fromWireType(_(y, N));
        }, write: function(N, T) {
          var Wn = [];
          P(H, N, b.toWireType(Wn, T)), Yn(Wn);
        } };
      }), [{ name: e.name, fromWireType: function(u) {
        var s = {};
        for (var c in l) s[c] = l[c].read(u);
        return a(u), s;
      }, toWireType: function(u, s) {
        for (var c in l) if (!(c in s)) throw new TypeError('Missing field:  "' + c + '"');
        var m = t();
        for (c in l) l[c].write(m, s[c]);
        return u !== null && u.push(a, m), m;
      }, argPackAdvance: 8, readValueFromPointer: Tn, destructorFunction: a }];
    });
  }, p: function(n, e, t, a, o) {
  }, y: function(n, e, t, a, o) {
    var i = Fn(t);
    $(n, { name: e = B(e), fromWireType: function(l) {
      return !!l;
    }, toWireType: function(l, u) {
      return u ? a : o;
    }, argPackAdvance: 8, readValueFromPointer: function(l) {
      var u;
      if (t === 1) u = G;
      else if (t === 2) u = rn;
      else {
        if (t !== 4) throw new TypeError("Unknown boolean type size: " + e);
        u = U;
      }
      return this.fromWireType(u[l >> i]);
    }, destructorFunction: null });
  }, x: function(n, e) {
    $(n, { name: e = B(e), fromWireType: function(t) {
      var a = V[t].value;
      return re(t), a;
    }, toWireType: function(t, a) {
      return En(a);
    }, argPackAdvance: 8, readValueFromPointer: Tn, destructorFunction: null });
  }, i: function(n, e, t) {
    var a = Fn(t);
    $(n, { name: e = B(e), fromWireType: function(o) {
      return o;
    }, toWireType: function(o, i) {
      if (typeof i != "number" && typeof i != "boolean") throw new TypeError('Cannot convert "' + Ln(i) + '" to ' + this.name);
      return i;
    }, argPackAdvance: 8, readValueFromPointer: ze(e, a), destructorFunction: null });
  }, f: function(n, e, t, a, o, i) {
    var l = function(u, s) {
      for (var c = [], m = 0; m < u; m++) c.push(U[(s >> 2) + m]);
      return c;
    }(e, t);
    n = B(n), o = fn(a, o), je(n, function() {
      (function(u, s) {
        var c = [], m = {};
        throw s.forEach(function _(y) {
          m[y] || on[y] || (An[y] ? An[y].forEach(_) : (c.push(y), m[y] = !0));
        }), new te(u + ": " + c.map(ae).join([", "]));
      })("Cannot call " + n + " due to unbound types", l);
    }, e - 1), Qn([], l, function(u) {
      var s = [u[0], null].concat(u.slice(1));
      return function(c, m, _) {
        r.hasOwnProperty(c) || Kn("Replacing nonexistant public symbol"), r[c].overloadTable !== void 0 && _ !== void 0 ? r[c].overloadTable[_] = m : (r[c] = m, r[c].argCount = _);
      }(n, De(n, s, null, o, i), e - 1), [];
    });
  }, c: function(n, e, t, a, o) {
    e = B(e), o === -1 && (o = 4294967295);
    var i = Fn(t), l = function(c) {
      return c;
    };
    if (a === 0) {
      var u = 32 - 8 * t;
      l = function(c) {
        return c << u >>> u;
      };
    }
    var s = e.includes("unsigned");
    $(n, { name: e, fromWireType: l, toWireType: function(c, m) {
      if (typeof m != "number" && typeof m != "boolean") throw new TypeError('Cannot convert "' + Ln(m) + '" to ' + this.name);
      if (m < a || m > o) throw new TypeError('Passing a number "' + Ln(m) + '" from JS side to C/C++ side to an argument of type "' + e + '", which is outside the valid range [' + a + ", " + o + "]!");
      return s ? m >>> 0 : 0 | m;
    }, argPackAdvance: 8, readValueFromPointer: He(e, i, a !== 0), destructorFunction: null });
  }, b: function(n, e, t) {
    var a = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][e];
    function o(i) {
      var l = j, u = l[i >>= 2], s = l[i + 1];
      return new a(Y, s, u);
    }
    $(n, { name: t = B(t), fromWireType: o, argPackAdvance: 8, readValueFromPointer: o }, { ignoreDuplicateRegistrations: !0 });
  }, j: function(n, e) {
    var t = (e = B(e)) === "std::string";
    $(n, { name: e, fromWireType: function(a) {
      var o, i = j[a >> 2];
      if (t) for (var l = a + 4, u = 0; u <= i; ++u) {
        var s = a + 4 + u;
        if (u == i || E[s] == 0) {
          var c = W(l, s - l);
          o === void 0 ? o = c : (o += "\0", o += c), l = s + 1;
        }
      }
      else {
        var m = new Array(i);
        for (u = 0; u < i; ++u) m[u] = String.fromCharCode(E[a + 4 + u]);
        o = m.join("");
      }
      return X(a), o;
    }, toWireType: function(a, o) {
      var i;
      o instanceof ArrayBuffer && (o = new Uint8Array(o));
      var l = typeof o == "string";
      l || o instanceof Uint8Array || o instanceof Uint8ClampedArray || o instanceof Int8Array || M("Cannot pass non-string to std::string"), i = t && l ? function() {
        return function(_) {
          for (var y = 0, b = 0; b < _.length; ++b) {
            var P = _.charCodeAt(b);
            P >= 55296 && P <= 57343 && (P = 65536 + ((1023 & P) << 10) | 1023 & _.charCodeAt(++b)), P <= 127 ? ++y : y += P <= 2047 ? 2 : P <= 65535 ? 3 : 4;
          }
          return y;
        }(o);
      } : function() {
        return o.length;
      };
      var u = i(), s = On(4 + u + 1);
      if (j[s >> 2] = u, t && l) (function(_, y, b, P) {
        if (!(P > 0)) return 0;
        for (var H = b + P - 1, N = 0; N < _.length; ++N) {
          var T = _.charCodeAt(N);
          if (T >= 55296 && T <= 57343 && (T = 65536 + ((1023 & T) << 10) | 1023 & _.charCodeAt(++N)), T <= 127) {
            if (b >= H) break;
            y[b++] = T;
          } else if (T <= 2047) {
            if (b + 1 >= H) break;
            y[b++] = 192 | T >> 6, y[b++] = 128 | 63 & T;
          } else if (T <= 65535) {
            if (b + 2 >= H) break;
            y[b++] = 224 | T >> 12, y[b++] = 128 | T >> 6 & 63, y[b++] = 128 | 63 & T;
          } else {
            if (b + 3 >= H) break;
            y[b++] = 240 | T >> 18, y[b++] = 128 | T >> 12 & 63, y[b++] = 128 | T >> 6 & 63, y[b++] = 128 | 63 & T;
          }
        }
        y[b] = 0;
      })(o, E, s + 4, u + 1);
      else if (l) for (var c = 0; c < u; ++c) {
        var m = o.charCodeAt(c);
        m > 255 && (X(s), M("String has UTF-16 code units that do not fit in 8 bits")), E[s + 4 + c] = m;
      }
      else for (c = 0; c < u; ++c) E[s + 4 + c] = o[c];
      return a !== null && a.push(X, s), s;
    }, argPackAdvance: 8, readValueFromPointer: Tn, destructorFunction: function(a) {
      X(a);
    } });
  }, e: function(n, e, t) {
    var a, o, i, l, u;
    t = B(t), e === 2 ? (a = yn, o = wn, l = Re, i = function() {
      return tn;
    }, u = 1) : e === 4 && (a = Ie, o = Ue, l = xe, i = function() {
      return j;
    }, u = 2), $(n, { name: t, fromWireType: function(s) {
      for (var c, m = j[s >> 2], _ = i(), y = s + 4, b = 0; b <= m; ++b) {
        var P = s + 4 + b * e;
        if (b == m || _[P >> u] == 0) {
          var H = a(y, P - y);
          c === void 0 ? c = H : (c += "\0", c += H), y = P + e;
        }
      }
      return X(s), c;
    }, toWireType: function(s, c) {
      typeof c != "string" && M("Cannot pass non-string to C++ string type " + t);
      var m = l(c), _ = On(4 + m + e);
      return j[_ >> 2] = m >> u, o(c, _ + 4, m + e), s !== null && s.push(X, _), _;
    }, argPackAdvance: 8, readValueFromPointer: Tn, destructorFunction: function(s) {
      X(s);
    } });
  }, m: function(n, e, t, a, o, i) {
    _n[n] = { name: B(e), rawConstructor: fn(t, a), rawDestructor: fn(o, i), fields: [] };
  }, a: function(n, e, t, a, o, i, l, u, s, c) {
    _n[n].fields.push({ fieldName: B(e), getterReturnType: t, getter: fn(a, o), getterContext: i, setterArgumentType: l, setter: fn(u, s), setterContext: c });
  }, z: function(n, e) {
    $(n, { isVoid: !0, name: e = B(e), argPackAdvance: 0, fromWireType: function() {
    }, toWireType: function(t, a) {
    } });
  }, g: re, u: function(n) {
    return n === 0 ? En(oe()) : (n = (t = Ve[e = n]) === void 0 ? B(e) : t, En(oe()[n]));
    var e, t;
  }, k: function(n) {
    n > 4 && (V[n].refcount += 1);
  }, n: function(n, e, t, a) {
    n = function(i) {
      return i || M("Cannot use deleted val. handle = " + i), V[i].value;
    }(n);
    var o = ie[e];
    return o || (o = function(i) {
      for (var l = "", u = 0; u < i; ++u) l += (u !== 0 ? ", " : "") + "arg" + u;
      var s = "return function emval_allocator_" + i + `(constructor, argTypes, args) {
`;
      for (u = 0; u < i; ++u) s += "var argType" + u + " = requireRegisteredType(Module['HEAP32'][(argTypes >>> 2) + " + u + '], "parameter ' + u + `");
var arg` + u + " = argType" + u + `.readValueFromPointer(args);
args += argType` + u + `['argPackAdvance'];
`;
      return s += "var obj = new constructor(" + l + `);
return __emval_register(obj);
}
`, new Function("requireRegisteredType", "Module", "__emval_register", s)(Ne, r, En);
    }(e), ie[e] = o), o(n, t, a);
  }, h: function() {
    bn();
  }, r: function(n, e, t) {
    E.copyWithin(n, e, e + t);
  }, d: function(n) {
    var e, t, a = E.length, o = 2147483648;
    if ((n >>>= 0) > o) return !1;
    for (var i = 1; i <= 4; i *= 2) {
      var l = a * (1 + 0.2 / i);
      if (l = Math.min(l, n + 100663296), qe(Math.min(o, ((e = Math.max(n, l)) % (t = 65536) > 0 && (e += t - e % t), e)))) return !0;
    }
    return !1;
  }, s: function(n, e) {
    var t = 0;
    return pn().forEach(function(a, o) {
      var i = e + t;
      U[n + 4 * o >> 2] = i, function(l, u, s) {
        for (var c = 0; c < l.length; ++c) G[0 | u++] = l.charCodeAt(c);
        G[0 | u] = 0;
      }(a, i), t += a.length + 1;
    }), 0;
  }, t: function(n, e) {
    var t = pn();
    U[n >> 2] = t.length;
    var a = 0;
    return t.forEach(function(o) {
      a += o.length + 1;
    }), U[e >> 2] = a, 0;
  }, A: function(n) {
    (function(e, t) {
      F || Fe > 0 || (r.onExit && r.onExit(e), k = !0), R(e, new Je(e));
    })(n);
  }, w: function(n) {
    return 0;
  }, o: function(n, e, t, a, o) {
  }, v: function(n, e, t, a) {
    for (var o = 0, i = 0; i < t; i++) {
      for (var l = U[e + 8 * i >> 2], u = U[e + (8 * i + 4) >> 2], s = 0; s < u; s++) kn.printChar(n, E[l + s]);
      o += u;
    }
    return U[a >> 2] = o, 0;
  }, q: function(n) {
  } };
  (function(n) {
    var e = { a: Ge };
    function t(i, l) {
      var u, s = i.exports;
      r.asm = s, Vn((x = r.asm.C).buffer), Q = r.asm.I, u = r.asm.D, qn.unshift(u), function(c) {
        if (an--, r.monitorRunDependencies && r.monitorRunDependencies(an), an == 0 && cn) {
          var m = cn;
          cn = null, m();
        }
      }();
    }
    function a(i) {
      t(i.instance);
    }
    function o(i) {
      return (!I && q && typeof fetch == "function" ? fetch(nn, { credentials: "same-origin" }).then(function(l) {
        if (!l.ok) throw "failed to load wasm binary file at '" + nn + "'";
        return l.arrayBuffer();
      }).catch(function() {
        return Jn(nn);
      }) : Promise.resolve().then(function() {
        return Jn(nn);
      })).then(function(l) {
        return WebAssembly.instantiate(l, e);
      }).then(i, function(l) {
        O("failed to asynchronously prepare wasm: " + l), bn(l);
      });
    }
    if (an++, r.monitorRunDependencies && r.monitorRunDependencies(an), r.instantiateWasm) try {
      return r.instantiateWasm(e, t);
    } catch (i) {
      return O("Module.instantiateWasm callback failed with error: " + i), !1;
    }
    (function(i) {
      return I || typeof WebAssembly.instantiateStreaming != "function" || typeof fetch != "function" ? o(a) : fetch(i, { credentials: "same-origin" }).then(function(l) {
        return WebAssembly.instantiateStreaming(l, e).then(a, function(u) {
          return O("wasm streaming compile failed: " + u), O("falling back to ArrayBuffer instantiation"), o(a);
        });
      });
    })(n).catch(d);
  })(v), r.___wasm_call_ctors = function() {
    return (r.___wasm_call_ctors = r.asm.D).apply(null, arguments);
  };
  var Cn, On = r._malloc = function() {
    return (On = r._malloc = r.asm.E).apply(null, arguments);
  }, X = r._free = function() {
    return (X = r._free = r.asm.F).apply(null, arguments);
  }, se = r.___getTypeName = function() {
    return (se = r.___getTypeName = r.asm.G).apply(null, arguments);
  };
  function Je(n) {
    this.name = "ExitStatus", this.message = "Program terminated with exit(" + n + ")", this.status = n;
  }
  function Bn(n) {
    function e() {
      Cn || (Cn = !0, r.calledRun = !0, k || (Un(qn), h(r), r.onRuntimeInitialized && r.onRuntimeInitialized(), function() {
        if (r.postRun) for (typeof r.postRun == "function" && (r.postRun = [r.postRun]); r.postRun.length; ) t = r.postRun.shift(), Gn.unshift(t);
        var t;
        Un(Gn);
      }()));
    }
    an > 0 || (function() {
      if (r.preRun) for (typeof r.preRun == "function" && (r.preRun = [r.preRun]); r.preRun.length; ) t = r.preRun.shift(), Nn.unshift(t);
      var t;
      Un(Nn);
    }(), an > 0 || (r.setStatus ? (r.setStatus("Running..."), setTimeout(function() {
      setTimeout(function() {
        r.setStatus("");
      }, 1), e();
    }, 1)) : e()));
  }
  if (r.___embind_register_native_and_builtin_types = function() {
    return (r.___embind_register_native_and_builtin_types = r.asm.H).apply(null, arguments);
  }, r.dynCall_jiji = function() {
    return (r.dynCall_jiji = r.asm.J).apply(null, arguments);
  }, cn = function n() {
    Cn || Bn(), Cn || (cn = n);
  }, r.run = Bn, r.preInit) for (typeof r.preInit == "function" && (r.preInit = [r.preInit]); r.preInit.length > 0; ) r.preInit.pop()();
  return Bn(), r.ready;
}), _e = ((r) => (r[r.GRAYSCALE = 1] = "GRAYSCALE", r[r.RGB = 2] = "RGB", r[r.YCbCr = 3] = "YCbCr", r))(_e || {});
const sr = { quality: 75, baseline: !1, arithmetic: !1, progressive: !0, optimize_coding: !0, smoothing: 0, color_space: _e.YCbCr, quant_table: 3, trellis_multipass: !1, trellis_opt_zero: !1, trellis_opt_table: !1, trellis_loops: 1, auto_subsample: !0, chroma_subsample: 2, separate_chroma_quality: !1, chroma_quality: 75 };
let jn;
const Te = async (r) => {
  jn || (jn = await ur({}, be(r)));
}, Ae = (r, v) => jn.encode(r.data, r.width, r.height, v);
let J;
const Ee = typeof TextDecoder < "u" ? new TextDecoder("utf-8", { ignoreBOM: !0, fatal: !0 }) : { decode: () => {
  throw Error("TextDecoder not available");
} };
typeof TextDecoder < "u" && Ee.decode();
let dn = null;
function Mn() {
  return dn !== null && dn.byteLength !== 0 || (dn = new Uint8Array(J.memory.buffer)), dn;
}
let ge = 0, me, vn = null;
function he() {
  return vn !== null && vn.byteLength !== 0 || (vn = new Int32Array(J.memory.buffer)), vn;
}
function lr(r, v, h) {
  try {
    const R = J.__wbindgen_add_to_stack_pointer(-16), q = function(I, D) {
      const O = D(1 * I.length, 1) >>> 0;
      return Mn().set(I, O / 1), ge = I.length, O;
    }(r, J.__wbindgen_malloc), p = ge;
    J.optimize(R, q, p, v, h);
    var d = he()[R / 4 + 0], f = he()[R / 4 + 1], w = (g = d, A = f, g >>>= 0, Mn().subarray(g / 1, g / 1 + A)).slice();
    return J.__wbindgen_free(d, 1 * f, 1), w;
  } finally {
    J.__wbindgen_add_to_stack_pointer(16);
  }
  var g, A;
}
function cr() {
  const r = { wbg: {} };
  return r.wbg.__wbindgen_throw = function(v, h) {
    throw new Error((d = v, f = h, d >>>= 0, Ee.decode(Mn().subarray(d, d + f))));
    var d, f;
  }, r;
}
async function ke(r) {
  if (J !== void 0) return J;
  if (r === void 0) throw new Error("oxipng WASM missing");
  const v = cr();
  (typeof r == "string" || typeof Request == "function" && r instanceof Request || typeof URL == "function" && r instanceof URL) && (r = fetch(r));
  const { instance: h, module: d } = await async function(f, w) {
    if (typeof Response == "function" && f instanceof Response) {
      if (typeof WebAssembly.instantiateStreaming == "function") try {
        return await WebAssembly.instantiateStreaming(f, w);
      } catch (A) {
        if (f.headers.get("Content-Type") == "application/wasm") throw A;
        console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", A);
      }
      const g = await f.arrayBuffer();
      return await WebAssembly.instantiate(g, w);
    }
    {
      const g = await WebAssembly.instantiate(f, w);
      return g instanceof WebAssembly.Instance ? { instance: g, module: f } : g;
    }
  }(await r, v);
  return function(f, w) {
    return J = f.exports, ke.__wbindgen_wasm_module = w, vn = null, dn = null, J;
  }(h, d);
}
const Ce = async (r) => {
  me || (me = await ke(be(r)));
}, We = (r, v) => lr(new Uint8Array(r), (v == null ? void 0 : v.level) ?? 3, (v == null ? void 0 : v.interlace) ?? !1);
var K = ((r) => (r.Complete = "complete", r.Error = "error", r))(K || {});
self.onmessage = async (r) => {
  const { file: v, init: h, options: d } = r.data ?? {};
  if (!v) return;
  const { buffer: f, data: w } = v;
  switch (h.assetType) {
    case Z.Png:
      try {
        if (!f) return void self.postMessage({ type: K.Error, output: "Invalid PNG data" });
        await Ce(h.oxipngWasm);
        const g = We(f, d);
        self.postMessage({ type: K.Complete, output: g });
      } catch (g) {
        self.postMessage({ type: K.Error, output: g });
      }
      break;
    case Z.Jpeg:
      try {
        if (!w) return void self.postMessage({ type: K.Error, output: "Invalid JPG data" });
        await Te(h.mozjpegWasm);
        const g = Ae(w, d);
        self.postMessage({ type: K.Complete, output: g });
      } catch (g) {
        self.postMessage({ type: K.Error, output: g });
      }
      break;
    default:
      console.log("Error: unknown worker command", r.data), self.postMessage({ type: K.Error, output: "Unknown command" });
  }
};
const fr = async (r, v, h, d) => {
  const f = await r.file.arrayBuffer();
  return v && window.Worker ? new Promise((w, g) => {
    const A = ((p) => {
      const I = `import ${JSON.stringify(new URL(p))}`, D = new Blob([I], { type: "application/javascript" }), O = URL.createObjectURL(D), x = new Worker(O, { type: "module", name: "optimize-worker" });
      return x.addEventListener("error", (F) => {
        URL.revokeObjectURL(O);
      }), x;
    })(v);
    A.onmessage = (p) => {
      p.data.type === K.Complete ? w(p.data.output) : g(p.data.output || "Worker failed to optimize");
    };
    const R = { ...d }, q = { init: { ...h, assetType: r.type }, file: { buffer: f, data: r.data }, options: R };
    A.postMessage(q);
  }) : (async (w, g, A) => {
    const { data: R, file: q } = w;
    if (g === Z.Png) {
      const p = new Uint8Array(await q.arrayBuffer());
      return We(p, A);
    }
    if (g == Z.Jpeg) return Ae(R, A);
  })(r, r.type, d);
}, pr = [S("span", { class: "dot" }, null, -1), S("span", { class: "dot" }, null, -1), S("span", { class: "dot" }, null, -1)], Pe = mn({ __name: "Spinner", props: { size: { default: 10 }, color: { default: "#fff" } }, setup(r, { expose: v }) {
  Xe((d) => ({ "2454e84c": d.size + "px", "05e43051": d.color }));
  const h = en();
  return v({ wrapper: h }), (d, f) => (L(), z("div", { ref_key: "wrapper", ref: h, class: "o-spinner" }, pr, 512));
} }), dr = ["id"], vr = ["for"], gr = { class: "o-upload-left" }, mr = S("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 32 32", class: "o-upload-image" }, [S("path", { fill: "currentColor", d: "m6 18l1.41 1.41L15 11.83V30h2V11.83l7.59 7.58L26 18L16 8L6 18zM6 8V4h20v4h2V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4z" })], -1), hr = { class: "o-upload-right" }, yr = { class: "o-upload-title" }, wr = ["innerHTML"], br = { key: 0, class: "o-upload-spinner" }, _r = ["id", "accept", "disabled"], Tr = mn({ __name: "UploadFile", props: { id: { default: "" }, title: { default: void 0 }, subtitle: { default: void 0 }, isDisabled: { type: Boolean, default: !1 }, preview: { default: null }, loading: { type: Boolean, default: !1 }, accept: { default: "image/*" }, width: { default: "100%" }, height: { default: "182px" } }, emits: ["file-select"], setup(r, { emit: v }) {
  const h = v, d = en(!1), f = en(), w = (p) => {
    var I;
    if (p && p.target && p.type === "input") {
      const D = p.target.files;
      D && (f.value = D[0], h("file-select", f.value));
    } else if (p && p.type === "drop") {
      const D = (I = p.dataTransfer) == null ? void 0 : I.files;
      D && (f.value = D[0], h("file-select", f.value));
    }
    d.value = !1;
  }, g = (p) => {
    p.preventDefault(), d.value = !0;
  }, A = (p) => {
    p.preventDefault(), d.value = !1;
  }, R = (p) => {
    p.preventDefault(), w(p);
  }, q = (p) => {
    p && p.target && (p.target.value = "");
  };
  return (p, I) => (L(), z("div", { class: Dn({ "o-upload-wrap": !0, dragging: d.value }), style: ye({ width: p.width, height: p.height }) }, [S("form", { id: p.id, class: "o-upload-form", action: "", enctype: "multipart/form-data", onDrop: R, onDragenter: g, onDragleave: A, onDragend: A, onInput: w }, [S("label", { class: "o-upload-area", for: `image-upload-input${p.id}` }, [Ke(p.$slots, "default", {}, () => [p.loading ? gn("", !0) : (L(), z("div", { key: 0, class: Dn(["o-upload-button", { "has-file": !!p.preview }]) }, [S("div", gr, [mr, p.preview ? (L(), Qe(ar, { key: 0, asset: p.preview, class: "o-upload-background" }, null, 8, ["asset"])) : gn("", !0)]), S("div", hr, [S("div", yr, Pn(p.title), 1), S("div", { class: "o-upload-subtitle", innerHTML: p.subtitle }, null, 8, wr)])], 2))]), p.loading ? (L(), z("div", br, [Rn(Pe, { size: 24, color: "#3a86ff" })])) : gn("", !0)], 8, vr), S("input", { id: `o-upload-input${p.id}`, class: "o-upload", type: "file", accept: p.accept, disabled: p.isDisabled, onClick: q }, null, 8, _r)], 40, dr)], 6));
} }), Ar = ["disabled"], Er = { key: 0, class: "o-animate" }, kr = { key: 1 }, Cr = { key: 2, class: "o-hidden" }, Wr = mn({ __name: "OButton", props: { text: { default: "" }, disabled: { type: Boolean, default: !1 }, animate: { type: Boolean, default: !1 } }, emits: ["click"], setup(r, { emit: v }) {
  const h = v, d = r, { disabled: f } = Hn(d), w = (g) => {
    f.value || h("click", g);
  };
  return (g, A) => (L(), z("button", { class: Dn(["o-button", pe(f) && "disabled"]), disabled: pe(f), onClick: w }, [g.animate ? (L(), z("div", Er, [Rn(Pe, { class: "o-spinner" })])) : (L(), z("div", kr, Pn(g.text), 1)), g.animate ? (L(), z("div", Cr, Pn(g.text), 1)) : gn("", !0)], 10, Ar));
} }), Pr = { class: "optimizer" }, Rr = { class: "opt-wrap" }, Ir = { key: 0, class: "error" }, Ur = we(mn({ __name: "Optimizer", props: { mozjpegWasm: {}, oxipngWasm: {}, workerUrl: {} }, setup(r) {
  const v = en(), h = en(""), d = en(!1), f = en(), w = en({}), g = r, { mozjpegWasm: A, oxipngWasm: R, workerUrl: q } = Hn(g), p = () => ({ mozjpegWasm: A.value, oxipngWasm: R.value }), I = { FILE_TYPE: "Unsupported file type", unknown: "Unknown error occurred" }, D = async (x) => {
    if (x) {
      f.value = void 0, v.value = void 0;
      try {
        const F = await async function(k, C) {
          const W = [], Y = k.types ?? ve, G = C.type, { ext: E, size: rn } = k, tn = rn ?? 0;
          tn && C.size > tn && W.push("FILE_SIZE_BIG");
          const U = C.name.split(".").pop();
          if ((!E || U && E.includes(U)) && Y.includes(G) || W.push("FILE_TYPE"), W.length) throw { fileErrors: W };
          try {
            if ((C.type || "").includes("image")) {
              const j = await ir(C), { minWidth: sn, minHeight: ln, maxWidth: Q, maxHeight: hn } = k, { width: yn = 0, height: wn = 0 } = j ?? {};
              if (sn && yn < sn && W.push("Image width too small"), ln && wn < ln && W.push("Image height too small"), Q && yn > Q && W.push("Image width too large"), hn && wn > hn && W.push("Image height too large"), !W.length) return { file: C, type: G, data: j };
            }
          } catch {
            W.push("FILE_TYPE");
          }
          throw { fileErrors: W || ["unknown"] };
        }({ size: 1e7, types: ve }, x);
        ((k) => {
          const C = new FileReader();
          C.readAsDataURL(k.file), C.onload = () => {
            var W;
            h.value = ((W = C.result) == null ? void 0 : W.toString()) ?? "";
          }, f.value = k;
        })(F), d.value = !0, await ((k) => {
          const { assetType: C, mozjpegWasm: W, oxipngWasm: Y } = k;
          return C === Z.Png ? Ce(Y) : C === Z.Jpeg ? Te(W) : void 0;
        })({ ...p(), assetType: F.type }), w.value = ((k) => k.type === Z.Png ? { level: 3 } : k.type === Z.Jpeg ? { ...sr } : {})(F), d.value = !1;
      } catch (F) {
        console.log(F);
        const k = F.fileErrors[0];
        v.value = k;
      }
    }
  }, O = async () => {
    const x = f.value;
    if (!d.value && !v.value && x) {
      d.value = !0;
      try {
        const F = await fr(x, q.value, p(), w.value);
        F ? ((k, C, W) => {
          const Y = new Blob([C], { type: W }), G = window.navigator;
          if (G.msSaveOrOpenBlob) G.msSaveBlob(Y, k);
          else {
            const E = window.document.createElement("a");
            E.href = window.URL.createObjectURL(Y), E.download = k, document.body.appendChild(E), E.click(), document.body.removeChild(E);
          }
        })(x.file.name || "opt.png", F, x.type) : v.value = "";
      } catch (F) {
        console.log("Optimize error:", F);
      }
      d.value = !1;
    }
  };
  return (x, F) => {
    var C;
    return L(), z("div", Pr, [S("div", Rr, [Rn(Tr, { title: "Upload PNG/JPEG", subtitle: "Drag or click here", accept: "image/png,image/jpeg", preview: h.value, onFileSelect: D }, null, 8, ["preview"])]), v.value ? (L(), z("div", Ir, Pn((k = v.value, I[k] ?? I.unknown)), 1)) : gn("", !0), Rn(Wr, { text: "Optimize", animate: d.value, disabled: !((C = f.value) != null && C.file), onClick: O }, null, 8, ["animate", "disabled"])]);
    var k;
  };
} }), [["__scopeId", "data-v-a851d018"]]);
window.Optimizer = Ur;
export {
  Ur as Optimizer
};
//# sourceMappingURL=image-opt.es.js.map
